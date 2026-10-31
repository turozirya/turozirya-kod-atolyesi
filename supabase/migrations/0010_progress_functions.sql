-- Faz 3: ilerleme takibi RPC'leri (mark_lesson_viewed, complete_lesson,
-- get_resume_target, get_student_courses). evaluate_badges ve rozet/seviye
-- alanları Faz 4'te eklenecek; complete_lesson burada new_badges=[] döner.
--
-- 0006'daki derste öğrenilen kurala uyarak: create function PUBLIC'e execute
-- verir VE Supabase ayrıca anon+authenticated'a ayrı, açık izin verir. Bu
-- dördü de yalnızca authenticated çağırmalı; her birinden hemen sonra public
-- ve anon'dan execute geri alınıyor (authenticated grant'i Supabase'in
-- otomatik izninden geliyor, dokunulmuyor).

create function mark_lesson_viewed(p_lesson_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_module_id uuid;
  v_course_id uuid;
  v_is_published boolean;
begin
  select l.module_id, m.course_id, l.is_published
    into v_module_id, v_course_id, v_is_published
  from lessons l
  join modules m on m.id = l.module_id
  where l.id = p_lesson_id;

  if v_module_id is null or not (is_teacher() or (v_is_published and can_access_course(v_course_id))) then
    raise exception 'LESSON_NOT_FOUND';
  end if;

  insert into lesson_progress (student_id, lesson_id, status)
  values (auth.uid(), p_lesson_id, 'in_progress')
  on conflict (student_id, lesson_id) do update
    set last_viewed_at = now()
    where lesson_progress.status <> 'completed';

  insert into activity_days (student_id, day)
  values (auth.uid(), (now() at time zone 'Europe/Istanbul')::date)
  on conflict do nothing;
end;
$$;

revoke execute on function mark_lesson_viewed(uuid) from public;
revoke execute on function mark_lesson_viewed(uuid) from anon;

create function complete_lesson(p_lesson_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_caller uuid := auth.uid();
  v_role user_role;
  v_module_id uuid;
  v_course_id uuid;
  v_module_sequential boolean;
  v_module_order integer;
  v_lesson_order integer;
  v_points integer;
  v_is_published boolean;
  v_status progress_status;
  v_prev_incomplete boolean;
  v_already_completed boolean := false;
  v_total_points integer;
  v_module_completed boolean := false;
  v_course_completed boolean := false;
  v_next jsonb;
  v_points_earned integer := 0;
begin
  select role into v_role from profiles where id = v_caller;
  if v_role is distinct from 'student' then
    raise exception 'NOT_A_STUDENT';
  end if;

  select l.module_id, m.course_id, m.is_sequential, m.order_index, l.order_index,
         l.points, l.is_published
    into v_module_id, v_course_id, v_module_sequential, v_module_order, v_lesson_order,
         v_points, v_is_published
  from lessons l
  join modules m on m.id = l.module_id
  where l.id = p_lesson_id;

  if v_module_id is null or not v_is_published or not can_access_course(v_course_id) then
    raise exception 'LESSON_NOT_FOUND';
  end if;

  if v_module_sequential then
    select exists (
      select 1
      from lessons prev
      where prev.module_id = v_module_id
        and prev.is_published
        and prev.order_index < v_lesson_order
        and not exists (
          select 1 from lesson_progress lp
          where lp.student_id = v_caller
            and lp.lesson_id = prev.id
            and lp.status = 'completed'
        )
    ) into v_prev_incomplete;

    if v_prev_incomplete then
      raise exception 'LESSON_LOCKED';
    end if;
  end if;

  insert into lesson_progress (student_id, lesson_id, status)
  values (v_caller, p_lesson_id, 'in_progress')
  on conflict (student_id, lesson_id) do nothing;

  select status into v_status
  from lesson_progress
  where student_id = v_caller and lesson_id = p_lesson_id
  for update;

  if v_status = 'completed' then
    v_already_completed := true;
  else
    update lesson_progress
      set status = 'completed', completed_at = now()
      where student_id = v_caller and lesson_id = p_lesson_id;

    insert into point_events (student_id, amount, reason, lesson_id)
    values (v_caller, v_points, 'lesson_completed', p_lesson_id);
    update profiles set total_points = total_points + v_points where id = v_caller;
    v_points_earned := v_points;

    if not exists (
      select 1 from lessons l2
      where l2.module_id = v_module_id and l2.is_published
        and not exists (
          select 1 from lesson_progress lp2
          where lp2.student_id = v_caller and lp2.lesson_id = l2.id and lp2.status = 'completed'
        )
    ) then
      v_module_completed := true;
      insert into point_events (student_id, amount, reason, module_id)
      values (v_caller, 25, 'module_bonus', v_module_id);
      update profiles set total_points = total_points + 25 where id = v_caller;
    end if;

    if not exists (
      select 1
      from lessons l3
      join modules m3 on m3.id = l3.module_id
      where m3.course_id = v_course_id and m3.is_published and l3.is_published
        and not exists (
          select 1 from lesson_progress lp3
          where lp3.student_id = v_caller and lp3.lesson_id = l3.id and lp3.status = 'completed'
        )
    ) then
      v_course_completed := true;
      insert into point_events (student_id, amount, reason, note)
      values (v_caller, 100, 'course_bonus', v_course_id::text);
      update profiles set total_points = total_points + 100 where id = v_caller;
    end if;

    insert into activity_days (student_id, day)
    values (v_caller, (now() at time zone 'Europe/Istanbul')::date)
    on conflict do nothing;
  end if;

  select total_points into v_total_points from profiles where id = v_caller;

  select jsonb_build_object(
      'course_slug', co.slug,
      'module_slug', nm.slug,
      'lesson_slug', nl.slug,
      'title', nl.title
    )
  into v_next
  from lessons nl
  join modules nm on nm.id = nl.module_id
  join courses co on co.id = nm.course_id
  where nm.course_id = v_course_id
    and nl.is_published and nm.is_published
    and (nm.order_index, nl.order_index) > (v_module_order, v_lesson_order)
  order by nm.order_index, nl.order_index
  limit 1;

  return jsonb_build_object(
    'already_completed', v_already_completed,
    'points_earned', v_points_earned,
    'total_points', v_total_points,
    'new_badges', '[]'::jsonb,
    'module_completed', v_module_completed,
    'course_completed', v_course_completed,
    'next_lesson', v_next
  );
end;
$$;

revoke execute on function complete_lesson(uuid) from public;
revoke execute on function complete_lesson(uuid) from anon;

create function get_resume_target(p_course_id uuid default null)
returns jsonb
language plpgsql
security definer
set search_path = public
stable
as $$
declare
  v_caller uuid := auth.uid();
  v_course_id uuid := p_course_id;
  v_total integer;
  v_completed integer;
  v_result jsonb;
begin
  if v_course_id is null then
    select co.id into v_course_id
    from lesson_progress lp
    join lessons l on l.id = lp.lesson_id
    join modules m on m.id = l.module_id
    join courses co on co.id = m.course_id
    where lp.student_id = v_caller and can_access_course(co.id)
    order by lp.last_viewed_at desc
    limit 1;

    if v_course_id is null then
      select co.id into v_course_id
      from courses co
      where co.is_published and can_access_course(co.id)
      order by co.order_index
      limit 1;
    end if;

    if v_course_id is null then
      return null;
    end if;
  elsif not can_access_course(v_course_id) then
    return null;
  end if;

  select count(*) into v_total
  from lessons l join modules m on m.id = l.module_id
  where m.course_id = v_course_id and l.is_published and m.is_published;

  select count(*) into v_completed
  from lessons l
  join modules m on m.id = l.module_id
  join lesson_progress lp on lp.lesson_id = l.id and lp.student_id = v_caller and lp.status = 'completed'
  where m.course_id = v_course_id and l.is_published and m.is_published;

  if v_total > 0 and v_completed >= v_total then
    select jsonb_build_object('all_done', true, 'course_slug', slug, 'course_title', title)
    into v_result
    from courses where id = v_course_id;
    return v_result;
  end if;

  -- 1) devam eden (in_progress) en yeni görüntülenen ders
  select jsonb_build_object(
      'all_done', false,
      'course_slug', co.slug, 'course_title', co.title,
      'module_slug', m.slug, 'lesson_slug', l.slug, 'lesson_title', l.title
    )
  into v_result
  from lesson_progress lp
  join lessons l on l.id = lp.lesson_id
  join modules m on m.id = l.module_id
  join courses co on co.id = m.course_id
  where lp.student_id = v_caller and m.course_id = v_course_id
    and lp.status = 'in_progress' and l.is_published and m.is_published
  order by lp.last_viewed_at desc
  limit 1;

  if v_result is not null then
    return v_result;
  end if;

  -- 2) en son tamamlanan dersten sonraki ilk tamamlanmamış ders
  select jsonb_build_object(
      'all_done', false,
      'course_slug', co.slug, 'course_title', co.title,
      'module_slug', m.slug, 'lesson_slug', l.slug, 'lesson_title', l.title
    )
  into v_result
  from lessons l
  join modules m on m.id = l.module_id
  join courses co on co.id = m.course_id
  where m.course_id = v_course_id and l.is_published and m.is_published
    and not exists (
      select 1 from lesson_progress lp2
      where lp2.student_id = v_caller and lp2.lesson_id = l.id and lp2.status = 'completed'
    )
    and (m.order_index, l.order_index) > (
      select m2.order_index, l2.order_index
      from lesson_progress lp3
      join lessons l2 on l2.id = lp3.lesson_id
      join modules m2 on m2.id = l2.module_id
      where lp3.student_id = v_caller and m2.course_id = v_course_id and lp3.status = 'completed'
      order by lp3.completed_at desc
      limit 1
    )
  order by m.order_index, l.order_index
  limit 1;

  if v_result is not null then
    return v_result;
  end if;

  -- 3) hiç ilerleme yok veya önceki sorgu boş döndü: kurs içindeki ilk tamamlanmamış ders
  select jsonb_build_object(
      'all_done', false,
      'course_slug', co.slug, 'course_title', co.title,
      'module_slug', m.slug, 'lesson_slug', l.slug, 'lesson_title', l.title
    )
  into v_result
  from lessons l
  join modules m on m.id = l.module_id
  join courses co on co.id = m.course_id
  where m.course_id = v_course_id and l.is_published and m.is_published
    and not exists (
      select 1 from lesson_progress lp4
      where lp4.student_id = v_caller and lp4.lesson_id = l.id and lp4.status = 'completed'
    )
  order by m.order_index, l.order_index
  limit 1;

  return v_result;
end;
$$;

revoke execute on function get_resume_target(uuid) from public;
revoke execute on function get_resume_target(uuid) from anon;

create function get_student_courses()
returns jsonb
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(jsonb_agg(
    jsonb_build_object(
      'id', co.id,
      'slug', co.slug,
      'title', co.title,
      'icon', co.icon,
      'color', co.color,
      'total_lessons', counts.total,
      'completed_lessons', counts.completed,
      'percent', case when counts.total = 0 then 0
                      else round(counts.completed * 100.0 / counts.total) end,
      'resume', get_resume_target(co.id)
    )
    order by co.order_index
  ), '[]'::jsonb)
  from courses co
  cross join lateral (
    select
      count(*) as total,
      count(*) filter (
        where exists (
          select 1 from lesson_progress lp
          where lp.student_id = auth.uid() and lp.lesson_id = l.id and lp.status = 'completed'
        )
      ) as completed
    from lessons l
    join modules m on m.id = l.module_id
    where m.course_id = co.id and l.is_published and m.is_published
  ) counts
  where co.is_published and can_access_course(co.id);
$$;

revoke execute on function get_student_courses() from public;
revoke execute on function get_student_courses() from anon;

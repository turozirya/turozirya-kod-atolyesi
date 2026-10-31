-- Faz 4: oyunlaştırma. evaluate_badges (dahili, complete_lesson içinden
-- çağrılır), complete_lesson'ın rozet değerlendirmesi eklenmiş hâli,
-- get_class_leaderboard, mark_badges_seen ve başlangıç rozetleri (seed).
--
-- evaluate_badges tamamen dahili: public+anon+authenticated'dan execute
-- geri alınıyor (security definer fonksiyon içinden yapılan çağrı,
-- çağıranın execute iznine bakmaz). Diğer ikisi 0006/0010'daki kurala uyarak
-- yalnızca public+anon'dan geri alınıyor (authenticated Supabase'in otomatik
-- izninden geliyor).

create function evaluate_badges(p_student uuid)
returns setof badges
language plpgsql
security definer
set search_path = public
as $$
declare
  v_badge badges%rowtype;
  v_total_points integer;
  v_lessons_completed integer;
  v_streak integer := 0;
  v_day date := (now() at time zone 'Europe/Istanbul')::date;
  v_earned boolean;
begin
  select total_points into v_total_points from profiles where id = p_student;

  select count(*) into v_lessons_completed
  from lesson_progress
  where student_id = p_student and status = 'completed';

  while exists (
    select 1 from activity_days where student_id = p_student and day = v_day
  ) loop
    v_streak := v_streak + 1;
    v_day := v_day - 1;
  end loop;

  for v_badge in
    select b.* from badges b
    where not exists (
      select 1 from student_badges sb
      where sb.student_id = p_student and sb.badge_id = b.id
    )
  loop
    v_earned := false;

    case v_badge.criteria
      when 'first_lesson' then
        v_earned := v_lessons_completed >= 1;
      when 'lessons_completed' then
        v_earned := v_lessons_completed >= v_badge.criteria_value;
      when 'points_total' then
        v_earned := v_total_points >= v_badge.criteria_value;
      when 'streak_days' then
        v_earned := v_streak >= v_badge.criteria_value;
      when 'module_completed' then
        v_earned := v_badge.module_id is not null
          and exists (
            select 1 from lessons l where l.module_id = v_badge.module_id and l.is_published
          )
          and not exists (
            select 1 from lessons l
            where l.module_id = v_badge.module_id and l.is_published
              and not exists (
                select 1 from lesson_progress lp
                where lp.student_id = p_student and lp.lesson_id = l.id and lp.status = 'completed'
              )
          );
      when 'course_completed' then
        v_earned := v_badge.course_id is not null
          and exists (
            select 1 from lessons l join modules m on m.id = l.module_id
            where m.course_id = v_badge.course_id and m.is_published and l.is_published
          )
          and not exists (
            select 1 from lessons l join modules m on m.id = l.module_id
            where m.course_id = v_badge.course_id and m.is_published and l.is_published
              and not exists (
                select 1 from lesson_progress lp
                where lp.student_id = p_student and lp.lesson_id = l.id and lp.status = 'completed'
              )
          );
    end case;

    if v_earned then
      insert into student_badges (student_id, badge_id) values (p_student, v_badge.id);
      update profiles set total_points = total_points + v_badge.bonus_points where id = p_student;
      return next v_badge;
    end if;
  end loop;

  return;
end;
$$;

revoke execute on function evaluate_badges(uuid) from public;
revoke execute on function evaluate_badges(uuid) from anon;
revoke execute on function evaluate_badges(uuid) from authenticated;

create or replace function complete_lesson(p_lesson_id uuid)
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
  v_new_badges jsonb := '[]'::jsonb;
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

    select coalesce(jsonb_agg(jsonb_build_object(
        'code', b.code, 'name', b.name, 'icon', b.icon, 'color', b.color
      )), '[]'::jsonb)
    into v_new_badges
    from evaluate_badges(v_caller) b;
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
    'new_badges', v_new_badges,
    'module_completed', v_module_completed,
    'course_completed', v_course_completed,
    'next_lesson', v_next
  );
end;
$$;

revoke execute on function complete_lesson(uuid) from public;
revoke execute on function complete_lesson(uuid) from anon;

create function get_class_leaderboard()
returns table (
  display_name text,
  avatar text,
  total_points integer,
  badge_count bigint,
  is_me boolean
)
language sql
security definer
set search_path = public
stable
as $$
  select
    p.display_name,
    p.avatar,
    p.total_points,
    (select count(*) from student_badges sb where sb.student_id = p.id) as badge_count,
    p.id = auth.uid() as is_me
  from profiles p
  join profiles me on me.id = auth.uid()
  join classes c on c.id = me.class_id
  where p.class_id = me.class_id
    and p.role = 'student'
    and c.leaderboard_enabled = true
  order by p.total_points desc, p.display_name asc;
$$;

revoke execute on function get_class_leaderboard() from public;
revoke execute on function get_class_leaderboard() from anon;

create function mark_badges_seen()
returns void
language sql
security definer
set search_path = public
as $$
  update student_badges set seen = true where student_id = auth.uid() and seen = false;
$$;

revoke execute on function mark_badges_seen() from public;
revoke execute on function mark_badges_seen() from anon;

-- Başlangıç rozetleri (CLAUDE.md §9.3). "muzik-kodcusu" (Ses ve Müzik) ve
-- "python-kasifi" (MicroPython'a Geçiş) bu fazda eklenmedi — ilgili modüller
-- henüz seed edilmemiş (bkz. Faz 2/3 seed içeriği: sadece "tanisma" ve
-- "sensorler" modülleri var). Modüller eklendiğinde ayrı bir migration'la
-- eklenmeli.

insert into badges (code, name, description, icon, color, criteria, criteria_value, order_index, bonus_points)
values
  ('ilk-adim', 'İlk Adım', 'İlk dersini tamamladın!', 'footprints', 'emerald', 'first_lesson', null, 0, 5),
  ('kodlama-caylagi', 'Kodlama Çaylağı', '5 ders tamamladın.', 'graduation-cap', 'sky', 'lessons_completed', 5, 1, 10),
  ('kod-avcisi', 'Kod Avcısı', '15 ders tamamladın.', 'target', 'violet', 'lessons_completed', 15, 2, 15),
  ('yuzluk', 'Yüzlük', '100 puana ulaştın.', 'star', 'amber', 'points_total', 100, 5, 0),
  ('ates-serisi', 'Ateş Serisi', '3 gün üst üste ders çalıştın.', 'flame', 'orange', 'streak_days', 3, 6, 10);

insert into badges (code, name, description, icon, color, criteria, module_id, order_index, bonus_points)
select 'led-sanatcisi', 'LED Sanatçısı', 'micro:bit ile Tanışma modülünü bitirdin.', 'lightbulb', 'pink', 'module_completed', m.id, 3, 10
from modules m join courses c on c.id = m.course_id
where m.slug = 'tanisma' and c.slug = 'microbit';

insert into badges (code, name, description, icon, color, criteria, module_id, order_index, bonus_points)
select 'sensor-uzmani', 'Sensör Uzmanı', 'Sensörler modülünü bitirdin.', 'radio', 'sky', 'module_completed', m.id, 4, 15
from modules m join courses c on c.id = m.course_id
where m.slug = 'sensorler' and c.slug = 'microbit';

insert into badges (code, name, description, icon, color, criteria, course_id, order_index, bonus_points)
select 'microbit-ustasi', 'micro:bit Ustası', 'micro:bit ile Kodlama kursunu bitirdin.', 'trophy', 'violet', 'course_completed', co.id, 7, 25
from courses co where co.slug = 'microbit';

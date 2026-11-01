-- Mini test sorularına tek cümlelik açıklama alanı (docs/icerik-plani.md ders şablonu).
-- get_lesson_quiz'e eklenmez (doğru cevabı önceden sızdırmasın); yalnızca submit_quiz
-- sonucunda, cevap verildikten sonra döner.

alter table lesson_quiz_questions add column explanation text not null default '';

create or replace function submit_quiz(p_lesson_id uuid, p_answers jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_student uuid := auth.uid();
  v_role user_role;
  v_course_id uuid;
  v_is_published boolean;
  v_already boolean := false;
  v_correct_count integer := 0;
  v_total_questions integer := 0;
  v_points_earned integer := 0;
  v_total_points integer;
  v_results jsonb := '[]'::jsonb;
  v_new_badges jsonb := '[]'::jsonb;
  q record;
  v_selected integer;
  v_is_correct boolean;
begin
  select role into v_role from profiles where id = v_student;
  if v_role is distinct from 'student' then
    raise exception 'NOT_A_STUDENT';
  end if;

  select m.course_id, l.is_published
    into v_course_id, v_is_published
  from lessons l
  join modules m on m.id = l.module_id
  where l.id = p_lesson_id;

  if v_course_id is null or not v_is_published or not can_access_course(v_course_id) then
    raise exception 'LESSON_NOT_FOUND';
  end if;

  select exists (
    select 1 from lesson_quiz_attempts
    where student_id = v_student and lesson_id = p_lesson_id
  ) into v_already;

  for q in
    select id, options, correct_index, points, explanation
    from lesson_quiz_questions
    where lesson_id = p_lesson_id
    order by order_index
  loop
    v_total_questions := v_total_questions + 1;

    select (elem->>'selected_index')::integer
      into v_selected
    from jsonb_array_elements(coalesce(p_answers, '[]'::jsonb)) elem
    where (elem->>'question_id')::uuid = q.id
    limit 1;

    v_is_correct := v_selected is not null and v_selected = q.correct_index;
    if v_is_correct then
      v_correct_count := v_correct_count + 1;
      if not v_already then
        v_points_earned := v_points_earned + q.points;
      end if;
    end if;

    v_results := v_results || jsonb_build_object(
      'question_id', q.id,
      'selected_index', v_selected,
      'correct_index', q.correct_index,
      'correct', v_is_correct,
      'explanation', q.explanation
    );
  end loop;

  if v_total_questions = 0 then
    raise exception 'NO_QUESTIONS';
  end if;

  if not v_already then
    if v_points_earned > 0 then
      insert into point_events (student_id, amount, reason, lesson_id)
      values (v_student, v_points_earned, 'quiz_bonus', p_lesson_id);
      update profiles set total_points = total_points + v_points_earned where id = v_student;

      select coalesce(jsonb_agg(jsonb_build_object(
          'code', b.code, 'name', b.name, 'icon', b.icon, 'color', b.color
        )), '[]'::jsonb)
      into v_new_badges
      from evaluate_badges(v_student) b;
    end if;

    insert into lesson_quiz_attempts (student_id, lesson_id, correct_count, total_questions, points_earned)
    values (v_student, p_lesson_id, v_correct_count, v_total_questions, v_points_earned);
  end if;

  select total_points into v_total_points from profiles where id = v_student;

  return jsonb_build_object(
    'already_completed', v_already,
    'points_earned', v_points_earned,
    'total_points', v_total_points,
    'new_badges', v_new_badges,
    'module_completed', false,
    'course_completed', false,
    'next_lesson', null,
    'correct_count', v_correct_count,
    'total_questions', v_total_questions,
    'results', v_results
  );
end;
$$;

revoke execute on function submit_quiz(uuid, jsonb) from public, anon;
grant execute on function submit_quiz(uuid, jsonb) to authenticated;

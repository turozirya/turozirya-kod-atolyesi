-- Faz 5: öğretmen araçları. teacher_add_bonus (öğretmen bonusu),
-- teacher_update_student_class (sınıftan çıkar / başka sınıfa taşı — tek
-- fonksiyon, p_class_id null ise çıkar, dolu ise taşı).
--
-- teaches_student() zaten authenticated'a execute izinli (0002_rls.sql),
-- tekrar grant edilmiyor.

create function teacher_add_bonus(p_student uuid, p_amount int, p_note text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_total_points integer;
begin
  if not is_teacher() then
    raise exception 'NOT_A_TEACHER';
  end if;
  if not teaches_student(p_student) then
    raise exception 'NOT_YOUR_STUDENT';
  end if;
  if p_amount <= 0 then
    raise exception 'INVALID_AMOUNT';
  end if;

  insert into point_events (student_id, amount, reason, note)
  values (p_student, p_amount, 'teacher_bonus', p_note);

  update profiles set total_points = total_points + p_amount
    where id = p_student
    returning total_points into v_total_points;

  return jsonb_build_object('total_points', v_total_points);
end;
$$;

revoke execute on function teacher_add_bonus(uuid, int, text) from public;
revoke execute on function teacher_add_bonus(uuid, int, text) from anon;

create function teacher_update_student_class(p_student uuid, p_class_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_caller uuid := auth.uid();
begin
  if not is_teacher() then
    raise exception 'NOT_A_TEACHER';
  end if;
  if not teaches_student(p_student) then
    raise exception 'NOT_YOUR_STUDENT';
  end if;
  if p_class_id is not null and not exists (
    select 1 from classes where id = p_class_id and teacher_id = v_caller
  ) then
    raise exception 'NOT_YOUR_CLASS';
  end if;

  update profiles set class_id = p_class_id where id = p_student;
end;
$$;

revoke execute on function teacher_update_student_class(uuid, uuid) from public;
revoke execute on function teacher_update_student_class(uuid, uuid) from anon;

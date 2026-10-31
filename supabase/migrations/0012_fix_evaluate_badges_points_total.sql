-- Faz 4 düzeltme: evaluate_badges'teki v_total_points, çağrı başında bir kez
-- okunuyordu — aynı çağrı içinde önceki bir rozetin bonus_points'i puanı
-- points_total eşiğinin üzerine çıkarsa (örn. "yuzluk"), o rozet aynı geçişte
-- değil bir sonraki ders tamamlamasında veriliyordu. Canlı testte gözlendi:
-- 5. dersi tamamlayan öğrenci "kodlama-caylagi" bonusuyla (+10) tam 100 puana
-- ulaştı ama "yuzluk" rozeti o anda verilmedi. Düzeltme: her rozet
-- bonus_points eklendiğinde yerel v_total_points de güncellenir. Ayrıca
-- rozet taranma sırası artık order_index'e göre (önceden tanımsızdı).

create or replace function evaluate_badges(p_student uuid)
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
    order by b.order_index
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
      v_total_points := v_total_points + v_badge.bonus_points;
      return next v_badge;
    end if;
  end loop;

  return;
end;
$$;

revoke execute on function evaluate_badges(uuid) from public;
revoke execute on function evaluate_badges(uuid) from anon;
revoke execute on function evaluate_badges(uuid) from authenticated;

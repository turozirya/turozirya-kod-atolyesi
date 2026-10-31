-- Faz 1 performans düzeltmeleri (Performance Advisor):
-- 1) Eksik FK indeksleri (unindexed_foreign_keys).
-- 2) RLS politikalarında auth.uid()'in her satır için yeniden değerlendirilmesini
--    önlemek için (select auth.uid()) sarmalaması (auth_rls_initplan).
--
-- "multiple_permissive_policies" (select_own + select_teacher ayrı politikaları)
-- bilinçli olarak ERTELENDİ: CLAUDE.md §12 güvenlik kontrol listesi yalnızca
-- Security Advisor'ı hedefliyor; bunu birleştirmek ~11 tabloda politika
-- yeniden yazımı gerektirir ve RLS testlerinden önce gereksiz risk katar.

create index idx_badges_course on badges(course_id);
create index idx_badges_module on badges(module_id);
create index idx_classes_teacher on classes(teacher_id);
create index idx_lesson_progress_lesson on lesson_progress(lesson_id);
create index idx_point_events_lesson on point_events(lesson_id);
create index idx_point_events_module on point_events(module_id);
create index idx_student_badges_badge on student_badges(badge_id);

alter policy profiles_select_own on profiles
  using (id = (select auth.uid()));

alter policy profiles_update_own on profiles
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

alter policy classes_select_student on classes
  using (
    exists (select 1 from profiles p where p.id = (select auth.uid()) and p.class_id = classes.id)
  );

alter policy classes_teacher_all on classes
  using (is_teacher() and teacher_id = (select auth.uid()))
  with check (is_teacher() and teacher_id = (select auth.uid()));

alter policy class_courses_select_student on class_courses
  using (
    exists (select 1 from profiles p where p.id = (select auth.uid()) and p.class_id = class_courses.class_id)
  );

alter policy class_courses_teacher_all on class_courses
  using (
    exists (select 1 from classes c where c.id = class_courses.class_id and c.teacher_id = (select auth.uid()))
  )
  with check (
    exists (select 1 from classes c where c.id = class_courses.class_id and c.teacher_id = (select auth.uid()))
  );

alter policy student_badges_select_own on student_badges
  using (student_id = (select auth.uid()));

alter policy lesson_progress_select_own on lesson_progress
  using (student_id = (select auth.uid()));

alter policy point_events_select_own on point_events
  using (student_id = (select auth.uid()));

alter policy badges_select on badges
  using ((select auth.uid()) is not null);

alter policy activity_days_select_own on activity_days
  using (student_id = (select auth.uid()));

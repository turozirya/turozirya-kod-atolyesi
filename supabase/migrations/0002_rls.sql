-- Faz 1: RLS yardımcı fonksiyonları, satır düzeyi güvenlik ve yetki (grant/revoke) kısıtları.

create function is_teacher()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'teacher'
  );
$$;

create function teaches_student(student uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from profiles student_profile
    join classes c on c.id = student_profile.class_id
    where student_profile.id = student
      and c.teacher_id = auth.uid()
  );
$$;

create function can_access_course(course uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select
    is_teacher()
    or exists (
      select 1
      from courses co
      join class_courses cc on cc.course_id = co.id
      join profiles p on p.class_id = cc.class_id
      where co.id = course
        and co.is_published = true
        and p.id = auth.uid()
    );
$$;

grant execute on function is_teacher() to authenticated;
grant execute on function teaches_student(uuid) to authenticated;
grant execute on function can_access_course(uuid) to authenticated;

alter table classes enable row level security;
alter table courses enable row level security;
alter table class_courses enable row level security;
alter table profiles enable row level security;
alter table modules enable row level security;
alter table lessons enable row level security;
alter table lesson_progress enable row level security;
alter table point_events enable row level security;
alter table badges enable row level security;
alter table student_badges enable row level security;
alter table activity_days enable row level security;

-- anon rolüne (giriş yapmamış ziyaretçi) hiçbir tabloda doğrudan erişim yok.
revoke all on classes, courses, class_courses, profiles, modules, lessons,
  lesson_progress, point_events, badges, student_badges, activity_days
  from anon;

-- profiles: öğrenci yalnızca display_name ve avatar'ını güncelleyebilir.
revoke insert, update, delete on profiles from authenticated;
grant update (display_name, avatar) on profiles to authenticated;

create policy profiles_select_own on profiles
  for select using (id = auth.uid());
create policy profiles_select_teacher on profiles
  for select using (is_teacher() and teaches_student(id));
create policy profiles_update_own on profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

-- classes
create policy classes_select_student on classes
  for select using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.class_id = classes.id)
  );
create policy classes_teacher_all on classes
  for all using (is_teacher() and teacher_id = auth.uid())
  with check (is_teacher() and teacher_id = auth.uid());

-- courses (öğretmen için sahiplik yok, herhangi bir öğretmen tüm kursları yönetir)
create policy courses_select on courses
  for select using (can_access_course(id));
create policy courses_teacher_all on courses
  for all using (is_teacher()) with check (is_teacher());

-- class_courses
create policy class_courses_select_student on class_courses
  for select using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.class_id = class_courses.class_id)
  );
create policy class_courses_teacher_all on class_courses
  for all using (
    exists (select 1 from classes c where c.id = class_courses.class_id and c.teacher_id = auth.uid())
  )
  with check (
    exists (select 1 from classes c where c.id = class_courses.class_id and c.teacher_id = auth.uid())
  );

-- modules
create policy modules_select on modules
  for select using (is_teacher() or (is_published and can_access_course(course_id)));
create policy modules_teacher_all on modules
  for all using (is_teacher()) with check (is_teacher());

-- lessons
create policy lessons_select on lessons
  for select using (
    is_teacher()
    or (
      is_published
      and can_access_course((select course_id from modules where id = lessons.module_id))
    )
  );
create policy lessons_teacher_all on lessons
  for all using (is_teacher()) with check (is_teacher());

-- lesson_progress: doğrudan yazma yok, yalnızca RPC (security definer fonksiyonlar bu revoke'u atlar).
revoke insert, update, delete on lesson_progress from authenticated;
create policy lesson_progress_select_own on lesson_progress
  for select using (student_id = auth.uid());
create policy lesson_progress_select_teacher on lesson_progress
  for select using (is_teacher() and teaches_student(student_id));

-- point_events: doğrudan yazma yok, yalnızca RPC.
revoke insert, update, delete on point_events from authenticated;
create policy point_events_select_own on point_events
  for select using (student_id = auth.uid());
create policy point_events_select_teacher on point_events
  for select using (is_teacher() and teaches_student(student_id));

-- badges: giriş yapmış herkes okuyabilir, yalnızca öğretmen yazabilir.
create policy badges_select on badges
  for select using (auth.uid() is not null);
create policy badges_teacher_all on badges
  for all using (is_teacher()) with check (is_teacher());

-- student_badges: doğrudan yazma yok, yalnızca RPC.
revoke insert, update, delete on student_badges from authenticated;
create policy student_badges_select_own on student_badges
  for select using (student_id = auth.uid());
create policy student_badges_select_teacher on student_badges
  for select using (is_teacher() and teaches_student(student_id));

-- activity_days: doğrudan yazma yok, yalnızca RPC.
revoke insert, update, delete on activity_days from authenticated;
create policy activity_days_select_own on activity_days
  for select using (student_id = auth.uid());
create policy activity_days_select_teacher on activity_days
  for select using (is_teacher() and teaches_student(student_id));

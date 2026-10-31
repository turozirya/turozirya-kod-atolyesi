-- Faz 1: temel şema (enum'lar, tablolar, indeksler, updated_at tetikleyicisi).
-- complete_lesson ve evaluate_badges bu fazda YOK (Faz 3-4).

create extension if not exists pgcrypto;

create type user_role as enum ('student', 'teacher');
create type progress_status as enum ('in_progress', 'completed');
create type badge_criteria as enum (
  'first_lesson',
  'lessons_completed',
  'module_completed',
  'course_completed',
  'points_total',
  'streak_days'
);

create table classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  join_code text not null unique,
  teacher_id uuid not null references auth.users(id) on delete cascade,
  leaderboard_enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  platform text not null default 'microbit',
  default_code_language text not null default 'micropython',
  icon text not null default 'cpu',
  color text not null default 'violet',
  cover_image text,
  order_index integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table class_courses (
  class_id uuid not null references classes(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  primary key (class_id, course_id)
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  display_name text not null,
  avatar text not null default 'robot-1',
  role user_role not null default 'student',
  class_id uuid references classes(id) on delete set null,
  total_points integer not null default 0,
  created_at timestamptz not null default now()
);

create table modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  slug text not null,
  title text not null,
  description text,
  icon text not null default 'cpu',
  color text not null default 'violet',
  order_index integer not null default 0,
  is_sequential boolean not null default true,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course_id, slug)
);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references modules(id) on delete cascade,
  slug text not null,
  title text not null,
  summary text,
  content text not null default '',
  example_code text,
  code_language text not null default 'micropython',
  tool_url text,
  tool_label text,
  materials text[] not null default '{}',
  video_url text,
  estimated_minutes integer not null default 20,
  points integer not null default 10,
  order_index integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (module_id, slug)
);

create table lesson_progress (
  student_id uuid not null references profiles(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  status progress_status not null default 'in_progress',
  started_at timestamptz not null default now(),
  last_viewed_at timestamptz not null default now(),
  completed_at timestamptz,
  primary key (student_id, lesson_id)
);

create table point_events (
  id bigint generated always as identity primary key,
  student_id uuid not null references profiles(id) on delete cascade,
  amount integer not null,
  reason text not null,
  lesson_id uuid references lessons(id) on delete set null,
  module_id uuid references modules(id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

create table badges (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text not null,
  icon text not null,
  color text not null default 'amber',
  criteria badge_criteria not null,
  criteria_value integer,
  module_id uuid references modules(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  bonus_points integer not null default 0,
  order_index integer not null default 0
);

create table student_badges (
  student_id uuid not null references profiles(id) on delete cascade,
  badge_id uuid not null references badges(id) on delete cascade,
  earned_at timestamptz not null default now(),
  seen boolean not null default false,
  primary key (student_id, badge_id)
);

create table activity_days (
  student_id uuid not null references profiles(id) on delete cascade,
  day date not null,
  primary key (student_id, day)
);

create index idx_modules_course_order on modules(course_id, order_index);
create index idx_lessons_module_order on lessons(module_id, order_index);
create index idx_class_courses_course on class_courses(course_id);
create index idx_lesson_progress_student_viewed on lesson_progress(student_id, last_viewed_at desc);
create index idx_point_events_student on point_events(student_id);
create index idx_profiles_class on profiles(class_id);

create function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on courses
  for each row execute function set_updated_at();
create trigger set_updated_at before update on modules
  for each row execute function set_updated_at();
create trigger set_updated_at before update on lessons
  for each row execute function set_updated_at();

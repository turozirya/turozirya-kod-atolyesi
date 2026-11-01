-- Haftalık görevler (sınıf hedefi) ve öğretmen duyuruları.

alter table classes add column weekly_goal integer;

create table announcements (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references classes(id) on delete cascade,
  title text not null,
  content text not null,
  created_at timestamptz not null default now()
);
create index idx_announcements_class_created on announcements(class_id, created_at desc);

alter table announcements enable row level security;
revoke all on announcements from anon;

create policy announcements_select_student on announcements
  for select using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.class_id = announcements.class_id)
  );
create policy announcements_teacher_all on announcements
  for all using (
    exists (select 1 from classes c where c.id = announcements.class_id and c.teacher_id = auth.uid())
  )
  with check (
    exists (select 1 from classes c where c.id = announcements.class_id and c.teacher_id = auth.uid())
  );

-- Öğrencinin kendi sınıfının haftalık ilerlemesini (sınıf arkadaşlarının point_events'i
-- dahil) görebilmesi için security definer bir fonksiyon gerekiyor — point_events_select_own
-- politikası öğrenciye yalnızca kendi satırlarını gösteriyor, get_class_leaderboard ile aynı desen.
create function get_class_weekly_progress()
returns jsonb
language plpgsql
security definer
set search_path = public
stable
as $$
declare
  v_class_id uuid;
  v_goal integer;
  v_completed integer;
  v_week_start timestamptz;
begin
  select class_id into v_class_id from profiles where id = auth.uid();
  if v_class_id is null then
    return null;
  end if;

  select weekly_goal into v_goal from classes where id = v_class_id;
  if v_goal is null then
    return null;
  end if;

  v_week_start := (date_trunc('week', (now() at time zone 'Europe/Istanbul'))) at time zone 'Europe/Istanbul';

  select count(*) into v_completed
  from point_events pe
  join profiles p on p.id = pe.student_id
  where p.class_id = v_class_id
    and pe.reason = 'lesson_completed'
    and pe.created_at >= v_week_start;

  return jsonb_build_object('goal', v_goal, 'completed', v_completed);
end;
$$;

-- Supabase, public şemadaki her fonksiyona anon+authenticated için ayrıca açık bir
-- execute izni veriyor (0005/0006'da keşfedilen davranış) — anon'u elle geri alıyoruz.
revoke execute on function get_class_weekly_progress() from public, anon;
grant execute on function get_class_weekly_progress() to authenticated;

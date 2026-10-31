-- Faz 2: ders görselleri / devre şemaları / kurs kapakları için Storage bucket'ı.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'lesson-media',
  'lesson-media',
  true,
  2097152,
  array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do nothing;

create policy lesson_media_select on storage.objects
  for select using (bucket_id = 'lesson-media');

create policy lesson_media_teacher_insert on storage.objects
  for insert with check (bucket_id = 'lesson-media' and is_teacher());

create policy lesson_media_teacher_update on storage.objects
  for update using (bucket_id = 'lesson-media' and is_teacher())
  with check (bucket_id = 'lesson-media' and is_teacher());

create policy lesson_media_teacher_delete on storage.objects
  for delete using (bucket_id = 'lesson-media' and is_teacher());

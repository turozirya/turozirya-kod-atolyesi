-- Faz 1 seed: yalnızca micro:bit kursu (CLAUDE.md §14). Modüller/dersler Faz 2'de eklenecek.
-- Not: test sınıfı burada oluşturulmuyor — classes.teacher_id auth.users'a referans verir
-- ve bu migration anında henüz bir öğretmen hesabı yok. Sınıf + class_courses ataması,
-- öğretmen hesabı oluşturulduktan sonra ayrı bir SQL ile yapılır.

insert into courses (slug, title, description, platform, default_code_language, icon, color, is_published)
values (
  'microbit',
  'micro:bit ile Kodlama',
  'micro:bit v2 ile blok tabanlı MakeCode''ten başlayıp MicroPython''a geçen giriş kursu.',
  'microbit',
  'micropython',
  'cpu',
  'violet',
  true
);

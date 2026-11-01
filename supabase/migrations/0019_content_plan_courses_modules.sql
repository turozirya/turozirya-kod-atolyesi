-- docs/icerik-plani.md: iki kurslu içerik planının kurs/modül iskeleti.
-- Yalnızca yapı (kurs, modül, bir dersin ebeveyn modülü) — ders içerikleri
-- content:import komutuyla ayrıca eklenir/güncellenir. Hiçbir satır silinmez;
-- mevcut microbit modülleri/dersleri yalnızca yeniden sıralanır veya taşınır,
-- id'leri (ve dolayısıyla rozet/ilerleme referansları) değişmez.

-- 1) Kurs 1 — Robotik Kodlamaya Giriş (yeni, yayında değil)
insert into courses (slug, title, description, platform, default_code_language, icon, color, order_index, is_published)
values (
  'robotik-giris',
  'Robotik Kodlamaya Giriş',
  'Robotik ve kodlamanın temel kavramlarını kâğıt-kalem etkinlikleri, basit devreler ve bir simülatörle öğren.',
  'diger', 'blocks', 'lightbulb', 'violet', 1, false
);

insert into modules (course_id, slug, title, description, icon, color, order_index, is_sequential, is_published)
select c.id, m.slug, m.title, null, m.icon, m.color, m.order_index, true, false
from courses c
cross join (values
  ('robotik-dunyasina-merhaba', 'Robotik Dünyasına Merhaba', 'bot', 'violet', 0),
  ('algila-dusun-harekete-gec', 'Algıla, Düşün, Harekete Geç', 'cog', 'sky', 1),
  ('elektronik-temelleri', 'Elektronik Temelleri', 'zap', 'emerald', 2),
  ('algoritma-dusuncesi', 'Algoritma Düşüncesi', 'puzzle', 'orange', 3),
  ('akis-semalari', 'Akış Şemaları', 'compass', 'pink', 4),
  ('veri-sabit-ve-degisken', 'Veri, Sabit ve Değişken', 'sparkles', 'teal', 5),
  ('karar-yapilari', 'Karar Yapıları', 'target', 'violet', 6),
  ('donguler', 'Döngüler', 'cog', 'sky', 7),
  ('kodlamanin-iki-yolu', 'Kodlamanın İki Yolu', 'rocket', 'emerald', 8)
) as m(slug, title, icon, color, order_index)
where c.slug = 'robotik-giris';

-- 2) Kurs 2 — micro:bit ile Kodlama: course rengi plana göre sky,
-- mevcut modüller yeniden sıralanır (silinmez), yeni boş modüller eklenir.
update courses set color = 'sky' where slug = 'microbit';

update modules set order_index = 3 where course_id = (select id from courses where slug = 'microbit') and slug = 'sensorler';
update modules set order_index = 4 where course_id = (select id from courses where slug = 'microbit') and slug = 'ses-ve-muzik';
update modules set order_index = 5 where course_id = (select id from courses where slug = 'microbit') and slug = 'radyo-ile-haberlesme';
-- Eski "MicroPython'a Geçiş" modülü yeni plandaki Modül 9-12'ye birebir uymuyor
-- (5 ders yerine 15 ders, 4 modüle bölünmüş) — Dalga 4'e kadar sona alınıp olduğu gibi bırakılıyor.
update modules set order_index = 12 where course_id = (select id from courses where slug = 'microbit') and slug = 'micropythona-gecis';

insert into modules (course_id, slug, title, description, icon, color, order_index, is_sequential, is_published)
select c.id, m.slug, m.title, null, m.icon, m.color, m.order_index, true, false
from courses c
cross join (values
  ('butonlar-olaylar-ve-degiskenler', 'Butonlar, Olaylar ve Değişkenler', 'gamepad-2', 'pink', 1),
  ('kararlar-ve-donguler', 'Kararlar ve Döngüler', 'cog', 'teal', 2),
  ('pinler-led-ve-servo', 'Pinler, LED ve Servo', 'circuit-board', 'violet', 6),
  ('blok-donemi-projesi', 'Blok Dönemi Projesi', 'trophy', 'pink', 7),
  ('bloktan-metne-gecis', 'Bloktan Metne Geçiş', 'graduation-cap', 'sky', 8),
  ('microbit-python-temelleri', 'MicroPython Temelleri', 'star', 'teal', 9),
  ('microbit-python-ile-donanim', 'MicroPython ile Donanım', 'wrench', 'emerald', 10),
  ('final-projesi', 'Final Projesi', 'trophy', 'orange', 11)
) as m(slug, title, icon, color, order_index)
where c.slug = 'microbit';

-- 3) "A ve B butonları" dersi yeni planda Modül 2'nin dersi — id/slug/içerik/
-- ilerleme kayıtları aynen kalır, yalnızca ebeveyn modülü ve sıra numarası değişir.
update lessons set
  module_id = (
    select id from modules
    where course_id = (select id from courses where slug = 'microbit')
    and slug = 'butonlar-olaylar-ve-degiskenler'
  ),
  order_index = 0
where slug = 'a-ve-b-butonlari'
and module_id = (
  select id from modules
  where course_id = (select id from courses where slug = 'microbit')
  and slug = 'tanisma'
);

-- "Kendi simgeni çiz" dersi Modül 1 içinde 4. sıraya kayıyor (yeni "LED ekranda
-- yazı, sayı, simge" dersi content:import ile 3. sıraya eklenecek).
update lessons set order_index = 3
where slug = 'kendi-simgeni-ciz'
and module_id = (
  select id from modules
  where course_id = (select id from courses where slug = 'microbit')
  and slug = 'tanisma'
);

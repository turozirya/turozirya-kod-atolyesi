-- Faz 6: "micro:bit ile Kodlama" kursuna CLAUDE.md §14'teki kalan 3 modül
-- (Ses ve Müzik, Radyo ile Haberleşme, MicroPython'a Geçiş) + 2 eksik rozet
-- (muzik-kodcusu, python-kasifi — Faz 4'te modüller yoktu diye atlanmıştı).

insert into modules (course_id, slug, title, description, icon, color, order_index, is_sequential, is_published)
select id, 'ses-ve-muzik', 'Ses ve Müzik',
  'micro:bit''in hoparlörüyle melodiler çal, dokunmatik logoyla ritim tut.',
  'music', 'emerald', 2, true, true
from courses where slug = 'microbit';

insert into modules (course_id, slug, title, description, icon, color, order_index, is_sequential, is_published)
select id, 'radyo-ile-haberlesme', 'Radyo ile Haberleşme',
  'İki micro:bit''i radyo dalgalarıyla konuşturup birlikte oyun oynat.',
  'radio', 'orange', 3, true, true
from courses where slug = 'microbit';

insert into modules (course_id, slug, title, description, icon, color, order_index, is_sequential, is_published)
select id, 'micropythona-gecis', 'MicroPython''a Geçiş',
  'Bloklardan gerçek koda geç: değişkenler, döngüler, koşullar.',
  'graduation-cap', 'teal', 4, true, true
from courses where slug = 'microbit';

-- Modül 3: Ses ve Müzik --------------------------------------------------------------

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'hoparlor-ile-ilk-melodi', 'Hoparlör ile ilk melodi',
  'micro:bit v2''nin yerleşik hoparlöründen ilk sesini çıkar.',
$md$## İlk sesini çıkar

micro:bit v2'nin üzerinde küçük bir hoparlör vardır. **Müzik** kategorisindeki **start melody** bloğuyla hazır melodilerden birini çalabilirsin.

1. **Müzik** kategorisinden **start melody (dadadadum) repeating (once)** bloğunu **on start**'ın içine sürükle.
2. Açılır menüden farklı bir melodi seç (ör. "Entertainer" veya "Birthday").
3. Simülatörde hoparlör ikonuna tıklayıp sesi dinle.

> 💡 Gerçek micro:bit v2'nde ekstra hoparlöre gerek yok — ses doğrudan cihazdan çıkar. Eski v1 kullanıyorsan krokodil kablosuyla bir hoparlör bağlaman gerekir.
$md$,
  null, 'blocks',
  'https://makecode.microbit.org', 'MakeCode''ta Aç',
  array['1 adet micro:bit v2', '1 adet mikro-USB kablosu'],
  15, 10, 0, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'ses-ve-muzik' and c.slug = 'microbit';

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'notalarla-sarki', 'Notalarla şarkı',
  'Kendi notalarını art arda dizip küçük bir şarkı besteler.',
$md$## Kendi şarkını beste

**play tone** bloğu tek bir notayı, istediğin süre boyunca çalmana izin verir. Art arda birkaç tane koyarsan kendi küçük melodini yazmış olursun.

1. **Müzik** kategorisinden **play tone (Middle C) for (1 beat)** bloğunu **on start**'ın içine koy.
2. Aynı bloktan 3-4 tane daha ekle, her birinde farklı bir nota seç (C, D, E, F, G...).
3. Simülatörde sırayla çalan notaları dinle — bir şarkı gibi mi geldi?

> 💡 Aynı notayı art arda iki kez koyup aralarına kısa bir **rest (1/4 beat)** eklersen, şarkına "nefes alma" boşlukları eklemiş olursun.
$md$,
  null, 'blocks',
  'https://makecode.microbit.org', 'MakeCode''ta Aç',
  array['1 adet micro:bit v2', '1 adet mikro-USB kablosu'],
  20, 10, 1, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'ses-ve-muzik' and c.slug = 'microbit';

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'dokunmatik-logo-ile-ritim', 'Dokunmatik logo ile ritim',
  'Önündeki altın logoya her dokunuşta bir ses çıkar.',
$md$## Logoya dokun, ritim tut

micro:bit v2'nin ön yüzündeki altın renkli kalp logosu aslında dokunmatik bir düğmedir. **Girdi** kategorisindeki **on logo pressed** bloğuyla her dokunuşa bir ses bağlayabilirsin.

1. **Girdi** kategorisinden **on logo pressed** bloğunu çalışma alanına sürükle.
2. İçine **Müzik** kategorisinden bir **play tone** bloğu koy.
3. Simülatörde kalp logosuna art arda tıklayıp kendi ritmini çal.

> 💡 Her dokunuşta farklı bir nota çalacak şekilde ayarlarsan, logo küçük bir piyanoya dönüşür!
$md$,
  null, 'blocks',
  'https://makecode.microbit.org', 'MakeCode''ta Aç',
  array['1 adet micro:bit v2 (v2 gerekli, v1''de logo dokunmatik değildir)', '1 adet mikro-USB kablosu'],
  15, 10, 2, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'ses-ve-muzik' and c.slug = 'microbit';

-- Modül 4: Radyo ile Haberleşme --------------------------------------------------------

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'iki-microbit-konusuyor', 'İki micro:bit konuşuyor',
  'Bir micro:bit''ten diğerine radyo dalgasıyla mesaj gönder.',
$md$## Radyoyla konuş

micro:bit'ler, kabloya gerek kalmadan birbirleriyle **radyo** dalgalarıyla haberleşebilir. Önce ikisini de aynı "gruba" ayarlamak gerekir — tıpkı aynı telsiz kanalına ayarlanmak gibi.

1. **Radyo** kategorisinden **radio set group 1** bloğunu her iki micro:bit'in de **on start**'ına ekle (ikisinde de aynı grup numarası olmalı).
2. Birinci micro:bit'e: **on button A pressed** → **radio send string "Merhaba!"**.
3. İkinci micro:bit'e: **on radio received receivedString** → **show string receivedString**.
4. İki programı da ayrı micro:bit'lere aktar, birincide A'ya bas — ikincisinin ekranında "Merhaba!" yazısını gör.

> 💡 İki micro:bit birbirine çok yakınsa (birkaç santimetre) bazen sinyal karışabilir — biraz uzaklaştırmayı dene.
$md$,
  null, 'blocks',
  'https://makecode.microbit.org', 'MakeCode''ta Aç',
  array['2 adet micro:bit v2', '2 adet mikro-USB kablosu'],
  25, 15, 0, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'radyo-ile-haberlesme' and c.slug = 'microbit';

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'tas-kagit-makas', 'Taş-kağıt-makas',
  'Sallama ve radyoyla iki kişilik bir taş-kağıt-makas oyunu kur.',
$md$## Radyolu taş-kağıt-makas

Önceki derste öğrendiğin radyo göndermeyi, sallama hareketiyle birleştirerek klasik bir oyun kuracaksın.

1. Her iki micro:bit'e de aynı **radio set group** numarasını ver.
2. **on shake** bloğunun içine **Matematik → pick random 0 to 2** koy ve bir değişkende (**secim**) sakla.
3. **secim**'e göre (0=taş, 1=kağıt, 2=makas) **show icon** ile farklı bir simge göster, aynı zamanda **radio send number secim** ile karşı tarafa gönder.
4. **on radio received receivedNumber** bloğunda, karşı tarafın seçimini de ekranında küçük bir simgeyle göster.
5. İki arkadaşın aynı anda micro:bit'lerini sallasın, kim kazandığına siz karar verin!

> 💡 İstersen kazanan/kaybeden mantığını da bloklarla (if-else) ekleyip ekranda "Kazandın!" yazdırabilirsin — bu, bir sonraki modülde öğreneceğin **koşullar** konusuna güzel bir giriş olur.
$md$,
  null, 'blocks',
  'https://makecode.microbit.org', 'MakeCode''ta Aç',
  array['2 adet micro:bit v2', '2 adet mikro-USB kablosu'],
  25, 15, 1, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'radyo-ile-haberlesme' and c.slug = 'microbit';

-- Modül 5: MicroPython'a Geçiş ---------------------------------------------------------

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'bloktan-koda', 'Bloktan koda',
  'Şimdiye kadar blokla yaptıklarını gerçek Python koduyla yaz.',
$md$## Artık gerçek kod yazıyorsun

Buraya kadar bloklarla yaptığın her şeyin aslında arkasında gerçek bir programlama dili vardı: **Python**! Şimdi aynı şeyleri yazarak yapmayı öğreneceksin.

1. Aşağıdaki **Python Editöründe Aç** düğmesine tıkla.
2. Örnek koddaki `display.scroll("Merhaba!")` satırını gör — bu, "Merhaba!" yazısını LED ekranda kaydırarak gösterir (tıpkı Faz 1'deki **show string** bloğu gibi!).
3. Tırnakların içindeki yazıyı kendi adınla değiştir, **Download**'a basıp cihazına aktar.

> 💡 Python'da her satırın girinti (boşluk) hizası önemlidir — kopyala-yapıştır yaparken dikkatli ol, aksi halde hata alırsın.
$md$,
$code$from microbit import *

display.scroll("Merhaba!")
$code$,
  'micropython',
  'https://python.microbit.org/v/3', 'Python Editöründe Aç',
  array['1 adet micro:bit v2', '1 adet mikro-USB kablosu'],
  15, 10, 0, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'micropythona-gecis' and c.slug = 'microbit';

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'degiskenler', 'Değişkenler',
  'Bilgileri bir isimle sakla ve tekrar kullan.',
$md$## Bilgiyi bir kutuya koy

Bir **değişken**, bir bilgiyi saklayıp sonra tekrar kullanmana yarayan isimli bir "kutu" gibidir. Python'da bir değişken oluşturmak çok kolay: `isim = değer`.

1. Örnek koddaki `isim = "Ayşe"` satırını kendi adınla değiştir.
2. `yas = 12` satırındaki sayıyı kendi yaşınla değiştir.
3. Kodu çalıştır: önce adını kaydıracak, sonra yaşını ekranda gösterecek.

> 💡 Yazı (metin) değerleri her zaman tırnak içinde yazılır (`"Ayşe"`), sayılar tırnaksız (`12`). Bu ikisini karıştırmak Python'da en sık yapılan hatalardan biridir.
$md$,
$code$from microbit import *

isim = "Ayşe"
yas = 12

display.scroll(isim)
sleep(500)
display.show(str(yas))
$code$,
  'micropython',
  'https://python.microbit.org/v/3', 'Python Editöründe Aç',
  array['1 adet micro:bit v2', '1 adet mikro-USB kablosu'],
  20, 10, 1, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'micropythona-gecis' and c.slug = 'microbit';

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'donguler', 'Döngüler',
  '"while True" ile bir kodu sonsuz kez tekrarla.',
$md$## Sonsuza kadar tekrarla

Blok dünyasındaki **forever** döngüsünün Python'daki karşılığı `while True:` satırıdır. İçine yazdığın her şey, micro:bit kapanana kadar tekrar tekrar çalışır.

1. Örnek koddaki `while True:` satırının altındaki kodun, girintili (içeri kaymış) olduğuna dikkat et — Python'da bir bloğun "içinde" olmak demek, o satırların başına boşluk koymak demektir.
2. Kodu çalıştır, ekranda mutlu ve üzgün yüzün sırayla değiştiğini izle.
3. `sleep(500)` içindeki sayıyı değiştirip hızı ayarla (500 = yarım saniye).

> 💡 `while True:` döngüsü hiç durmaz — bu yüzden micro:bit programları genelde tam olarak böyle, sonsuz bir döngünün içinde "yaşar".
$md$,
$code$from microbit import *

while True:
    display.show(Image.HAPPY)
    sleep(500)
    display.show(Image.SAD)
    sleep(500)
$code$,
  'micropython',
  'https://python.microbit.org/v/3', 'Python Editöründe Aç',
  array['1 adet micro:bit v2', '1 adet mikro-USB kablosu'],
  20, 10, 2, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'micropythona-gecis' and c.slug = 'microbit';

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'kosullar', 'Koşullar',
  '"if" ile micro:bit''e koşula bağlı kararlar aldır.',
$md$## Eğer... o zaman...

**if** (eğer) bir koşul doğruysa bir şey yap, **elif** (değilse ama bu doğruysa) başka bir şey yap demenin Python yoludur. Blok dünyasındaki **if-else** bloğunun karşılığıdır.

1. Örnek kodu çalıştır, A ve B butonlarına basıp farklı simgeler çıktığını gör.
2. `Image.YES` ve `Image.NO` yerine başka hazır simgeler dene (`Image.HEART`, `Image.SURPRISED`...).
3. Kendi `elif` satırını ekleyip üçüncü bir durum (ör. her ikisine birden basılırsa) tanımlamayı dene.

> 💡 `if` satırının sonundaki iki nokta üst üste (`:`) unutulursa Python hata verir — bu da çok yapılan bir hatadır, dikkat et!
$md$,
$code$from microbit import *

while True:
    if button_a.was_pressed():
        display.show(Image.YES)
    elif button_b.was_pressed():
        display.show(Image.NO)
$code$,
  'micropython',
  'https://python.microbit.org/v/3', 'Python Editöründe Aç',
  array['1 adet micro:bit v2', '1 adet mikro-USB kablosu'],
  20, 10, 3, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'micropythona-gecis' and c.slug = 'microbit';

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'sensorleri-python-ile-okuma', 'Sensörleri Python ile okuma',
  'Sıcaklık sensörünü bu kez kodla oku.',
$md$## Sensörü kodla oku

Faz 2'deki **temperature (°C)** bloğunu hatırlıyor musun? Python'da bu, tıpkı blok adıyla aynı isimde bir fonksiyon: `temperature()`.

1. Örnek kodu çalıştır, ekranda sürekli değişen bir sayı (sıcaklık) göreceksin.
2. `temperature()` yerine `compass.heading()` veya `accelerometer.get_x()` yazarak pusula ya da ivmeölçer değerlerini de okuyabilirsin.
3. `str(sicaklik)` satırındaki `str(...)` neden gerekli, merak ettin mi? `display.scroll()` yalnızca yazı kabul eder; `str()` sayıyı yazıya çevirir.

> 💡 Artık Faz 1 ve 2'deki tüm sensör derslerini Python'da tekrar yazabilirsin — hangi sensörü seçersen seç, mantık hep aynı: oku, göster, bekle, tekrarla.
$md$,
$code$from microbit import *

while True:
    sicaklik = temperature()
    display.scroll(str(sicaklik))
    sleep(1000)
$code$,
  'micropython',
  'https://python.microbit.org/v/3', 'Python Editöründe Aç',
  array['1 adet micro:bit v2', '1 adet mikro-USB kablosu'],
  20, 10, 4, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'micropythona-gecis' and c.slug = 'microbit';

-- Eksik rozetler (Faz 4'te modüller henüz yoktu diye atlanmıştı) -----------------------

insert into badges (code, name, description, icon, color, criteria, module_id, order_index, bonus_points)
select 'muzik-kodcusu', 'Müzik Kodcusu', 'Ses ve Müzik modülünü bitirdin.', 'music', 'pink', 'module_completed', m.id, 8, 10
from modules m join courses c on c.id = m.course_id
where m.slug = 'ses-ve-muzik' and c.slug = 'microbit';

insert into badges (code, name, description, icon, color, criteria, module_id, order_index, bonus_points)
select 'python-kasifi', 'Python Kâşifi', 'MicroPython''a Geçiş modülünü bitirdin.', 'graduation-cap', 'violet', 'module_completed', m.id, 9, 20
from modules m join courses c on c.id = m.course_id
where m.slug = 'micropythona-gecis' and c.slug = 'microbit';

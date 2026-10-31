-- Faz 2 seed: "micro:bit ile Kodlama" kursuna ilk 2 modül + her birinde 4 ders
-- (CLAUDE.md §14). Modüller "(blok)" olarak işaretli, bu yüzden code_language='blocks'
-- ve kod bloğu yerine blok adımlarını anlatan içerik var (CLAUDE.md §10.1).

insert into modules (course_id, slug, title, description, icon, color, order_index, is_sequential, is_published)
select id, 'tanisma', 'micro:bit ile Tanışma',
  'micro:bit''i tanı, ilk programını MakeCode''ta blok blok kur.',
  'cpu', 'violet', 0, true, true
from courses where slug = 'microbit';

insert into modules (course_id, slug, title, description, icon, color, order_index, is_sequential, is_published)
select id, 'sensorler', 'Sensörler',
  'micro:bit''in ışık, sıcaklık, ivme ve pusula sensörleriyle dünyayı ölç.',
  'radio', 'sky', 1, true, true
from courses where slug = 'microbit';

-- Modül 1: micro:bit ile Tanışma --------------------------------------------------

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'microbit-nedir', 'micro:bit nedir?',
  'Küçük ama güçlü bir bilgisayarla tanış.',
$md$## micro:bit nedir?

micro:bit, avucunun içine sığan küçük bir bilgisayardır. Üzerinde 25 tane kırmızı LED'den oluşan bir ekran, 2 buton (A ve B), ışık ve sıcaklık sensörleri, bir ivmeölçer (hareket sensörü) ve bir pusula bulunur.

Bu derste micro:bit'ini bilgisayarına bağlayıp MakeCode düzenleyicisini açacaksın. Kod yazmaya hiç gerek yok — bloklar var!

1. USB kablosunu micro:bit'e ve bilgisayarına tak. Arkadaki sarı LED yanıp sönmeye başlar.
2. Aşağıdaki **MakeCode'da Aç** düğmesine tıkla.
3. Sol taraftaki simülatörde micro:bit'in ekranını gör — henüz hiçbir blok yok, o yüzden ekran boş.

> 💡 micro:bit'in arkasındaki pilleri henüz takmana gerek yok, USB kablosu yeterli.
$md$,
  null, 'blocks',
  'https://makecode.microbit.org', 'MakeCode''ta Aç',
  array['1 adet micro:bit v2', '1 adet mikro-USB kablosu', 'Bilgisayar'],
  15, 10, 0, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'tanisma' and c.slug = 'microbit';

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'led-ekraninda-ilk-yazim', 'LED ekranda ilk yazım',
  '"Merhaba!" yazısını micro:bit''in ekranında kaydır.',
$md$## Ekranda yazı yazdıralım

micro:bit'in 25 LED'lik ekranı harfleri sırayla kaydırarak yazı gösterebilir. Bunun için **Temel** kategorisindeki **"show string"** (yazı göster) bloğunu kullanacağız.

1. Sol menüden **Temel** kategorisine tıkla.
2. **show string "Hello!"** bloğunu sürükleyip **on start** bloğunun içine bırak.
3. Tırnakların içindeki yazıyı sil, yerine kendi adını veya "Merhaba!" yaz.
4. Simülatörde yazının LED'lerde kaydığını izle.

> 💡 Yazı çok hızlı mı geçti? **show string** bloğunun yanındaki küçük mavi dişliye tıklayıp hız ayarını bulabilirsin.

Programını micro:bit'ine aktarmak için **Download** düğmesine bas, inen dosyayı micro:bit sürücüsüne sürükle.
$md$,
  null, 'blocks',
  'https://makecode.microbit.org', 'MakeCode''ta Aç',
  array['1 adet micro:bit v2', '1 adet mikro-USB kablosu'],
  20, 10, 1, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'tanisma' and c.slug = 'microbit';

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'kendi-simgeni-ciz', 'Kendi simgeni çiz',
  '25 LED''i tek tek yakıp kendi resmini oluştur.',
$md$## Kendi simgeni tasarla

**show leds** (LED'leri göster) bloğu, 5x5'lik LED ızgarasının tıpkı bir piksel sanatı gibi hangi noktalarının yanacağını seçmene izin verir.

1. **Temel** kategorisinden **show leds** bloğunu **on start**'ın içine sürükle.
2. Açılan 5x5 ızgarada LED karelerine tıklayarak bir kalp, yıldız ya da robot yüzü çiz.
3. İstersen **show icon** bloğuyla hazır simgelerden birini de (kalp, gülen yüz, ok...) deneyebilirsin.

> 💡 İki farklı **show leds** bloğunu art arda koyup aralarına **pause (ms)** eklersen küçük bir animasyon yapmış olursun!
$md$,
  null, 'blocks',
  'https://makecode.microbit.org', 'MakeCode''ta Aç',
  array['1 adet micro:bit v2', '1 adet mikro-USB kablosu'],
  20, 10, 2, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'tanisma' and c.slug = 'microbit';

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'a-ve-b-butonlari', 'A ve B butonları',
  'Butonlara basınca micro:bit''in tepki vermesini sağla.',
$md$## Butonlarla etkileşim

micro:bit'in üstünde **A** ve **B** adında iki buton var. **Girdi** kategorisindeki **on button pressed** bloğuyla bu butonlara basıldığında ne olacağını belirleyebilirsin.

1. **Girdi** kategorisinden **on button A pressed** bloğunu çalışma alanına sürükle.
2. İçine **Temel** kategorisinden bir **show icon** (ör. gülen yüz) bloğu koy.
3. Aynısını **on button B pressed** için de farklı bir simgeyle yap.
4. Simülatörde A ve B tuşlarına tıklayıp ekranın değiştiğini gör.

> 💡 **on button A+B pressed** bloğunu kullanırsan iki butona **aynı anda** basılınca çalışan üçüncü bir davranış da ekleyebilirsin.
$md$,
  null, 'blocks',
  'https://makecode.microbit.org', 'MakeCode''ta Aç',
  array['1 adet micro:bit v2', '1 adet mikro-USB kablosu'],
  20, 10, 3, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'tanisma' and c.slug = 'microbit';

-- Modül 2: Sensörler ----------------------------------------------------------------

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'isik-sensoru', 'Işık sensörü',
  'micro:bit''in LED ekranı aynı zamanda bir ışık sensörüdür.',
$md$## Karanlıkta parla

micro:bit'in LED ekranındaki ışığa duyarlı noktalar, ortamın ne kadar aydınlık olduğunu da ölçebilir. **Girdi** kategorisindeki **light level** bloğu 0 (karanlık) ile 255 (çok parlak) arasında bir sayı verir.

1. **Temel** kategorisinden **show number** bloğunu **forever** döngüsünün içine koy.
2. **Girdi** kategorisinden **light level** bloğunu onun içine yerleştir.
3. Simülatörde güneş ikonunu sürükleyerek ışığı değiştir, sayının değiştiğini izle.
4. Ekstra: **if light level < 50 then show icon (ay)** bloklarıyla karanlıkta otomatik bir "gece lambası" simgesi gösterebilirsin.

> 💡 Gerçek micro:bit'inde elini ekranın üzerine kapatıp sayının düştüğünü görebilirsin.
$md$,
  null, 'blocks',
  'https://makecode.microbit.org', 'MakeCode''ta Aç',
  array['1 adet micro:bit v2', '1 adet mikro-USB kablosu'],
  20, 10, 0, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'sensorler' and c.slug = 'microbit';

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'sicaklik-olcer', 'Sıcaklık ölçer',
  'micro:bit''i basit bir termometreye dönüştür.',
$md$## Sıcaklığı ölç

micro:bit'in işlemcisinin üzerinde, çevredeki sıcaklığı tahmin etmeye yarayan bir sensör var. **Girdi** kategorisindeki **temperature (°C)** bloğuyla bu değeri okuyabilirsin.

1. **forever** döngüsünün içine **show number** bloğu koy.
2. İçine **temperature (°C)** bloğunu yerleştir.
3. Simülatörde termometre ikonunu sürükleyip sıcaklığı değiştir, ekrandaki sayının değiştiğini gör.

> 💡 Bu sensör micro:bit'in **içindeki** devrelerin sıcaklığını ölçer, bu yüzden oda sıcaklığından birkaç derece farklı çıkabilir — tam bir hava istasyonu değil ama eğlenceli bir başlangıç!
$md$,
  null, 'blocks',
  'https://makecode.microbit.org', 'MakeCode''ta Aç',
  array['1 adet micro:bit v2', '1 adet mikro-USB kablosu'],
  15, 10, 1, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'sensorler' and c.slug = 'microbit';

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'ivmeolcer-ile-sallama', 'İvmeölçer ile sallama',
  'micro:bit''i sallayınca zar atan bir oyun yap.',
$md$## Salla ve değiştir

micro:bit'in içinde bir **ivmeölçer** vardır — hareketi ve sarsılmayı algılar. **Girdi** kategorisindeki **on shake** bloğuyla "sallandığında" çalışacak bir davranış tanımlayabiliriz.

1. **Girdi** kategorisinden **on shake** bloğunu çalışma alanına sürükle.
2. İçine **Matematik** kategorisinden **pick random 1 to 6** bloğunu, onu da bir **show number** bloğunun içine yerleştir.
3. Simülatördeki **sallama** düğmesine (veya gerçek cihazında micro:bit'i gerçekten sallayarak) test et — her seferinde farklı bir sayı çıkmalı.

> 💡 Bunu bir arkadaşınla "zar atma" oyununa çevirebilirsin: en yüksek sayıyı çıkaran kazanır!
$md$,
  null, 'blocks',
  'https://makecode.microbit.org', 'MakeCode''ta Aç',
  array['1 adet micro:bit v2', '1 adet mikro-USB kablosu'],
  20, 10, 2, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'sensorler' and c.slug = 'microbit';

insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select m.id, 'pusula', 'Pusula',
  'micro:bit''i gerçek bir pusulaya çevir.',
$md$## Yön bul

micro:bit'in içindeki pusula sensörü, dünyanın manyetik alanını algılayarak hangi yöne baktığını (0–360 derece) söyleyebilir. İlk kullanımda kısa bir **kalibrasyon** (ayarlama) gerekir — micro:bit ekranındaki tüm noktaları yakana kadar cihazı havada döndürürsün.

1. **forever** döngüsünün içine **show number** bloğu koy.
2. İçine **Girdi → daha fazla → compass heading (°)** bloğunu yerleştir.
3. İndirip gerçek cihazında dene: kuzeye döndüğünde sayı 0'a yaklaşmalı.

> 💡 İlk pusula kullanımında ekran otomatik olarak "LED'leri sırayla yak" kalibrasyon oyununu başlatır — bu normal, pusulanın doğru çalışması için gerekli!
$md$,
  null, 'blocks',
  'https://makecode.microbit.org', 'MakeCode''ta Aç',
  array['1 adet micro:bit v2', '1 adet mikro-USB kablosu'],
  20, 10, 3, true
from modules m join courses c on c.id = m.course_id
where m.slug = 'sensorler' and c.slug = 'microbit';

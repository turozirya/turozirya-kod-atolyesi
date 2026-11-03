# İçerik Planı — Robotik Kodlamaya Giriş ve micro:bit

Nov 1, 2026 · @Turgay Özcan

İki kurs, toplam 75 ders. **Robotik Kodlamaya Giriş** (9 modül, 31 ders) temel kavramları ve elektronik temellerini kâğıt, oyun, simülatör ve basit devrelerle öğretir. **micro:bit ile Kodlama** (12 modül, 44 ders) aynı kavramları kartta, önce bloklarla sonra MicroPython ile uygular; krokodil kablo, harici LED ve servo motorla dış dünyaya bağlanır. Her ders bir mini testle biter. Üretim dört dalgada yapılır ve 11 derslik bir pilotla başlar.

## Ders şablonu

Her ders aynı kalıpla yazılır; öğrenci her derste neyle karşılaşacağını bilir, alanlar platformdaki ders formuna birebir oturur.

| Platform alanı | Ne yazılır | Örnek |
| --- | --- | --- |
| Başlık | Kısa, merak uyandıran, en çok 5 kelime | Sensörler: Robotun Duyuları |
| Özet | 1–2 cümle, "Bu derste … öğreneceksin" | Bu derste robotların çevreyi nasıl algıladığını öğreneceksin. |
| Süre | 15–25 dk (proje dersleri 40 dk) | 20 |
| Puan | 10; proje ve final dersleri 20 | 10 |
| İçerik | Aşağıdaki 7 adımlık akış, 300–500 kelime | — |
| Örnek kod + dil | Kurs 1: blok veya sözde kod; Kurs 2: blok, sonra MicroPython | `display.scroll("Merhaba")` |
| Araç linki | MakeCode veya Python Editörü projesi | MakeCode'da Aç |
| Malzemeler | Gerekirse; Kurs 1'de çoğunlukla kâğıt-kalem | 1 micro:bit, USB kablo |
| Video | Konuya uygun @kod\_turozirya videosu; yoksa yeni video listesine eklenir | — |
| Mini test | 3 çoktan seçmeli soru; her biri doğru cevap ve tek cümlelik açıklamayla | Hangisi bir sensördür? (a) Motor (b) Işık sensörü (c) LED |

İçerik alanının akışı:

1. **Merak sorusu:** Günlük hayattan 1–2 cümlelik giriş ("Otomatik kapı seni nasıl görüyor?").
2. **Kavram:** 2–4 kısa paragraf ve bir benzetme (değişken = etiketli kutu).
3. **Örnek:** Görsel, akış şeması ya da kod.
4. **İpucu kutusu:** Sık yapılan bir hata veya kısa yol.
5. **Dene!:** 5–10 dakikalık etkinlik; kâğıtta, simülatörde ya da kartta.
6. **Kendini Yokla:** Platformun mini test özelliğiyle 3 çoktan seçmeli soru. Kurs 1'de kavramı yoklar, Kurs 2'de "bu kod ne yapar?" soruları ağırlıklıdır.
7. **Bugün öğrendiklerin:** 3 maddelik özet.

## Yazım kuralları

Metinler 6. sınıfa giden, 11–12 yaşındaki, ilk kez kod yazan bir öğrencinin tek başına okuyup anlayacağı düzeyde yazılır.

- **"Sen" diliyle** ve kısa cümlelerle; bir cümle en çok 15 kelime.
- **Bir derste tek ana kavram.** İkinci kavram gerekiyorsa ayrı derse bölünür.
- **Terimler ilk geçtiği yerde kalın** yazılır ve tek cümleyle tanımlanır. Yazılım ve Robotik Kodlama dersinin terimleri kullanılır: algoritma, akış şeması, değişken, sabit, karar yapısı, döngü, sözde kod.
- **Günlük hayattan, tanıdık örnekler:** okul kantini, akıllı tahta, trafik lambası, maç skoru.
- **Kod örnekleri en çok 15 satır;** her önemli satırda Türkçe açıklama satırı bulunur.
- **Görseller özgün** (çizim, ekran görüntüsü, akış şeması); telifli karakter kullanılmaz.
- **Kurslar birbirine bağlanır:** micro:bit kursundaki her kavram dersi, Kurs 1'deki karşılığına "Hatırla" notuyla gönderme yapar (örn. "Hatırla: Kurs 1, Modül 7 — Karar Yapıları").

### Doğruluk
- **Mutlak ifadeleri kontrol et.** "Her zaman", "hiç", "asla", "hiç değişmez" ifadelerini yalnızca kesin doğruysa kullan.
- **Günümüz cihazlarını yanlış anlatma.** Bugün sensörü olabilecek bir cihazı (çamaşır makinesi, akıllı saat, basit gece lambası) "algılamayan" ya da "işlemcisi olan" diye örnek verme. Emin olmadığın örneği seçme.
- **Kavramlar dersler arasında tutarlı olsun.** 1.1'deki robot tanımı (algılar, karar verir, hareket eder) sonraki derslerde çiğnenmesin. Robot olmayan bir sistem anlatılıyorsa "robot" değil "akıllı sistem" ya da "otomatik sistem" denir.
- **Bir kelime aynı derste iki farklı anlamda kullanılmasın.** Örneğin "işlem" hem sürecin tamamı hem de ortadaki adım olarak geçmesin.

### Ders akışı
- Girişteki merak sorusu dersin sonunda mutlaka cevaplansın.
- "Dene!" etkinlikleri öğretmen olmadan da yapılabilsin. Gereken nesne, kart ya da tablo listesini metne yaz. Tabloları Markdown tablo olarak ver ve ilk satırı örnek olarak doldur. Sınıfta kullanılacak bir malzeme varsa "malzemeler" alanına ekle.
- Etkinlikler öğrencinin telefonu olduğunu varsaymasın, okulda telefon kullanımı gerektirmesin.
- Tartışmalı örneklerin (otomatik kapı, uzaktan kumandalı araba, dokunmatik ekran gibi) cevabı kısa bir "Tartışmalı örnekler" notuyla verilsin.
- Öğrencinin bildiği bir kurala ters düşen durum ipucu kutusunda açıkça yazılsın (örneğin micro:bit'te y'nin aşağı doğru artması).
- Konum, bağlantı ya da şekil anlatan her derste en az bir görsel olsun (PNG): ızgara, kartın parçaları, editör ekranı, girdi–işlem–çıktı şeması gibi.

### Biçim ve dil
- İpucu kutusu `> 💡` ile başlar.
- `### Dene!` ve `### Bugün öğrendiklerin` başlık olarak yazılır. Özet maddeleri `- ` ile liste yapılır.
- Cümleler en çok 15 kelime olsun. Yeni bir terim ilk geçtiği yerde **kalın** yazılsın.
- Örnek kodu olmayan derste `kod_dili` alanını boş bırak. Kurs 1'de sözde kod yalnızca gerçekten bir örnek varsa kullanılsın.

### MakeCode — İngilizce arayüz
- **MakeCode İngilizce arayüzle kullanılır.** Blok ve menü adları arayüzde göründüğü gibi `kod` biçiminde yazılır. İlk geçtiği yerde Türkçe anlamı parantez içinde verilir: `show string` (yazı göster). Ders metni Türkçedir; yalnızca blok, kategori ve düğme adları İngilizcedir: `Basic`, `Led`, `Download`.
- Kurs 2'de her modülün son dersinin sonunda "Blok sözlüğü" olsun. Bu sözlükte o modülde geçen İngilizce blokların Türkçe anlamları listelenir.
- Emin olmadığın blok adını `[BLOK ADI KONTROL]` diye işaretle. Paylaşılmış bir MakeCode projesi gereken yerde link yoksa araç linki alanına `[MAKECODE LİNKİ]` yaz.

### Mini test
- Yanlış seçenekler, öğrencinin gerçekten düşebileceği yanılgılar olsun. "Ekran patlar", "Ekranın rengi", "Kantini süslemeli" gibi açıkça saçma seçenek kullanma.
- Soru metni seçeneklerle uyumlu olsun. "Kaç?" diye soruyorsan seçenekler sayı olsun.
- Testteki her soru derste anlatılan bir bilgiye dayansın; derste olmayan bir şey sorulmasın.
- En az bir soru dersin ana bağlamından gelsin: Kurs 1'de robot, Kurs 2'de "bu blok ya da kod ne yapar?".
- Doğru cevabın konumu sorudan soruya değişsin. Açıklamalar tek cümle olsun.

## Kurs 1 — Robotik Kodlamaya Giriş

31 ders, 9 modül; 6. sınıf kulüp öğrencileri için. micro:bit kartı gerekmez: örnekler kâğıt-kalem etkinlikleri, MakeCode simülatörü ve Modül 3'te krokodil kablo ile LED'li basit devrelerle yapılır. Öğrenci micro:bit kursuna editörü ve devreyi tanıyarak gelir.

Platform ayarları: slug `robotik-giris` · platform `diger` · varsayılan dil `blocks` · renk violet · sıralı modüller.

MakeCode simülatörü kullanan derslerde (6.2, 7.2, 9.1) de **İngilizce arayüz** kullanılır (bkz. "MakeCode — İngilizce arayüz" kuralları).

### Modül 1 — Robotik Dünyasına Merhaba

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 1.1 Robot nedir? | Robotu sıradan bir makineden ayırt eder: algılar, karar verir, hareket eder | "Robot mu, değil mi?": robot süpürge, çamaşır makinesi, hesap makinesi, otomatik kapı |
| 1.2 Robotlar nerede çalışır? | Sanayi, sağlık, tarım, uzay ve evden örnek verir | Mars gezgini, ameliyat robotu, süt sağma robotu kartları |
| 1.3 Okulumuza bir robot | Bir ihtiyacı robotla çözme fikri üretir | Fikir kartı: "Okulumuzdaki hangi işi bir robot yapabilir?" |

### Modül 2 — Algıla, Düşün, Harekete Geç

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 2.1 Sensörler: robotun duyuları | Sensörü tanımlar, insan duyularıyla eşleştirir | Göz → ışık sensörü, kulak → mikrofon, deri → sıcaklık ve dokunma sensörü |
| 2.2 İşlemci: robotun beyni | Girdi – işlem – çıktı ilişkisini açıklar | Hesap makinesi ve akıllı telefonda girdi-işlem-çıktı bulma |
| 2.3 Eyleyiciler: robotun kasları | Motor, LED, hoparlör, servo gibi eyleyicilere örnek verir | Evdeki cihazlarda eyleyici avcılığı |
| 2.4 Hepsi bir arada | Bir sistemi sensör – işlemci – eyleyici olarak çözümler | Otomatik kapı, akıllı sokak lambası, park sensörü analiz tablosu |

### Modül 3 — Elektronik Temelleri

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 3.1 Elektrik devresi | Devre elemanlarını (pil, kablo, LED, anahtar) tanır, açık ve kapalı devreyi ayırt eder | "LED neden yanmadı?" devre bulmacaları |
| 3.2 İletken ve yalıtkan | Maddeleri iletken ve yalıtkan olarak sınıflandırır | Krokodil kablolu test devresiyle ataş, silgi, kurşun kalem ucu, metal cetvel denemesi |
| 3.3 LED ve direnç | LED'in uzun (+) ve kısa (−) bacağını, direncin koruma görevini açıklar | LED'i ters bağlayınca ne olur? |
| 3.4 Devre şeması ve güvenlik | Devre şeması sembollerini kullanır, güvenli çalışma kurallarını söyler | Sembollerle devre çizme; yalnızca pil ve micro:bit, asla priz |

### Modül 4 — Algoritma Düşüncesi

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 4.1 Algoritma nedir? | Algoritmayı tanımlar, günlük hayattan örnek verir | Diş fırçalama ve tost yapma algoritması |
| 4.2 Sıra önemli! | Adımları doğru sıraya koyar, hatalı adımı bulur (hata ayıklama) | Karışık adımları sıralama; "robot arkadaşını yönet" oyunu |
| 4.3 Algoritma tasarla | Bir problem için adım adım çözüm yazar | Izgara harita üzerinde sınıftan kantine yol algoritması |

### Modül 5 — Akış Şemaları

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 5.1 Akış şeması sembolleri | Başla/bitir, girdi/çıktı, işlem, karar ve ok sembollerini tanır | Sembol – anlam eşleştirme |
| 5.2 İlk akış şemam | Düz bir algoritmayı akış şemasına çevirir | İki sayıyı toplayıp sonucu yazan şema |
| 5.3 Şemayı oku | Verilen bir akış şemasının ne yaptığını ve çıktısını bulur | "Bu şema ne yapar?" bulmacaları |

### Modül 6 — Veri, Sabit ve Değişken

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 6.1 Veri nedir? | Veriyi tanımlar, girdi ve çıktı verisini ayırt eder | Sensör verileri: sıcaklık 24, ışık 180, adım 3500 |
| 6.2 Değişken: etiketli kutu | Değişkeni tanımlar, değerinin değişebildiğini açıklar | Maç skoru; MakeCode simülatöründe "skor" değişkeni |
| 6.3 Sabit: değişmeyen değer | Sabit ile değişkeni ayırt eder | Haftadaki gün sayısı ile günlük sıcaklık |
| 6.4 Veri türleri | Sayı (tam, ondalık), metin ve mantıksal (doğru/yanlış) türlerini ayırt eder | "Hangi tür?": 13, 3.5, "Ayşe", doğru |
| 6.5 Veriyle işlem | Aritmetik (+ − × ÷) ve karşılaştırma (> < =) işlemlerini kullanır | Üç notun ortalaması; "hangisi büyük?" |

### Modül 7 — Karar Yapıları

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 7.1 Eğer… ise | Tek koşullu karar yapısını açıklar, akış şemasında karar sembolünü kullanır | "Eğer yağmur yağıyorsa şemsiye al" |
| 7.2 Eğer… değilse | İki yollu karar yapısını kullanır | Gece lambası: ışık azsa LED yan, değilse söner (simülatör) |
| 7.3 Birden çok koşul | "Değilse eğer" ile çok yollu karar ve ve/veya bağlaçlarını kullanır | Sıcaklığa göre soğuk / ılık / sıcak |

### Modül 8 — Döngüler

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 8.1 Döngü nedir? | Belirli sayıda tekrarı tanımlar | 4 kez "ileri git, sağa dön" ile kare çizen robot |
| 8.2 Koşullu ve sonsuz döngü | "… olduğu sürece" ve "sürekli" tekrarı ayırt eder | "Engel görene kadar ilerle"; robotlar neden hep döngüde çalışır? |
| 8.3 Döngü ve karar birlikte | Döngü içinde karar kullanan akış şeması çizer | Robot süpürgenin akış şeması |

### Modül 9 — Kodlamanın İki Yolu

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 9.1 Blok tabanlı kodlama | Blok tabanlı ortamın özelliklerini açıklar | MakeCode simülatöründe adını kaydıran ilk program |
| 9.2 Metin tabanlı kodlama | Metin tabanlı kodlamanın farkını (sözdizimi, girinti) açıklar | Aynı programın Python hali; bir harf hatası ne yapar? |
| 9.3 Final: Robotunu tasarla | Bir robotu sensör – işlemci – eyleyici tablosu, devre çizimi ve akış şemasıyla tasarlar | Proje kartı: problem, parçalar, akış şeması; sınıfta sunum |

## Kurs 2 — micro:bit ile Kodlama

44 ders, 12 modül. Modül 1–8 blok tabanlı (MakeCode), Modül 9 geçiş, Modül 10–12 MicroPython. Modül 1–6 yalnızca kart ve USB kablo ister; Modül 7'den itibaren krokodil kablo, harici LED ve servo motor kullanılır.

Platform ayarları: slug `microbit` · platform `microbit` · varsayılan dil `blocks` (Modül 9'dan sonra `micropython`) · renk sky · sıralı modüller.

### Modül 1 — micro:bit ile Tanışma (blok)

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 1.1 micro:bit'i tanıyalım | Kartın parçalarını sensör – işlemci – eyleyici olarak sınıflandırır | Kart üzerinde parça avcılığı (Hatırla: Kurs 1, Modül 2) |
| 1.2 MakeCode ve ilk program | Editörü, simülatörü ve karta yükleme adımlarını kullanır (dil ayarı: Settings → Language → English) | "Merhaba!" kaydırma |
| 1.3 LED ekran: yazı, sayı, simge | Yazı, sayı ve hazır simge gösterir | İsim kartı ve kalp atışı animasyonu |
| 1.4 Kendi simgeni çiz | LED'leri x, y koordinatıyla yakar | Piksel sanatı |

### Modül 2 — Butonlar, Olaylar ve Değişkenler (blok)

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 2.1 A ve B butonları | Olay (buton basıldığında) kavramını kullanır | A'ya basınca gülen, B'ye basınca üzgün yüz |
| 2.2 Değişkenle sayaç | Değişken oluşturur, artırır, sıfırlar | Tıklama sayacı (Hatırla: Kurs 1, Modül 6) |
| 2.3 Rastgele sayı: zar | Rastgele sayı ve sallama olayını kullanır | Elektronik zar |

### Modül 3 — Kararlar ve Döngüler (blok)

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 3.1 Eğer–değilse kartta | Koşul bloklarını kullanır | Sayaç tek mi çift mi? (Hatırla: Kurs 1, Modül 7) |
| 3.2 Tekrarla ve süresince | Sayılı ve koşullu döngü bloklarını kullanır | 10'dan 0'a geri sayım (Hatırla: Kurs 1, Modül 8) |
| 3.3 Sürekli ve zamanlama | Sürekli döngüyü ve duraklatmayı kullanır | Trafik lambası animasyonu |
| 3.4 Mini proje: refleks oyunu | Olay, değişken, karar ve döngüyü birleştirir | İki kişi: kim önce basar? |

### Modül 4 — Sensörler (blok)

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 4.1 Işık sensörü | Işık seviyesini okur, eşik değerle karar verir | Otomatik gece lambası |
| 4.2 Sıcaklık sensörü | Sıcaklığı °C olarak okur | Dijital termometre ve soğuk/sıcak simgesi |
| 4.3 İvmeölçer ve hareketler | Eğme, sallama, yüzüstü gibi hareketleri algılar | Su terazisi |
| 4.4 Pusula | Pusulayı kalibre eder, yön okur | K, D, G, B gösteren yön bulucu |
| 4.5 Dokunmatik logo ve pinler | Logo ve P0–P2 dokunmasını algılar | Dokunmatik zil |
| 4.6 Mikrofon | Ses seviyesini ölçer | Sınıf gürültü ölçer |

### Modül 5 — Ses ve Müzik (blok)

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 5.1 Hoparlör ve ilk melodi | Hazır melodileri çalar | Açılış müziği |
| 5.2 Notalarla şarkı | Nota ve vuruş süresiyle melodi yazar | Kısa bir okul şarkısı |
| 5.3 Sensör ve ses | Sensör değerine göre ses üretir | Hareket alarmı |

### Modül 6 — Radyo ile Haberleşme (blok)

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 6.1 İki micro:bit konuşuyor | Radyo grubu kurar, sayı ve metin gönderir | Sınıf içi mesajlaşma |
| 6.2 Taş–kâğıt–makas | Rastgele sayı ve radyoyu birleştirir | İki kişilik oyun |
| 6.3 Sınıf oylaması | Çok sayıda kartın mesajını sayar | Evet / hayır oylaması |

### Modül 7 — Pinler, LED ve Servo (blok)

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 7.1 Pinler ve harici LED | Krokodil kabloyla LED'i P0 ve GND'ye bağlar, dijital yazma ile yakar | Yanıp sönen LED (Hatırla: Kurs 1, Modül 3) |
| 7.2 LED parlaklığı | Analog yazma ile parlaklığı 0–1023 arasında değiştirir | Yavaşça yanıp sönen "nefes alan" LED |
| 7.3 Servo motor | Servoyu bağlar, 0–180° açıya döndürür | Sallanan bayrak |
| 7.4 Sensörle servo | Buton ya da ışık değeriyle servoyu yönetir | Butona basınca açılan otomatik bariyer |

Malzeme alanı: 2–3 krokodil kablo, 1 LED, 1 servo motor. Servo dersleri yayınlanmadan önce sınıftaki servo ve kartla bir kez denenmeli; bazı servolar micro:bit'in 3 V çıkışında zayıf döner.

### Modül 8 — Blok Dönemi Projesi

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 8.1 Proje planlama | Problemi sensör – işlemci – eyleyici tablosu ve akış şemasıyla planlar | Otomatik bariyer, ışığa dönen pano, kapı alarmı, adımsayar |
| 8.2 Proje yapımı ve sunum | Projeyi kodlar, test eder, sunar | Sunum kontrol listesi |

### Modül 9 — Bloktan Metne Geçiş

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 9.1 Blokların arkasındaki kod | MakeCode'da blok ve Python görünümünü karşılaştırır | Zar programının iki hali |
| 9.2 Python Editörü ve ilk satırlar | python.microbit.org'da program yazar ve karta yükler | `from microbit import *` ve `display.scroll()` |
| 9.3 Sözdizimi ve hata mesajları | Girinti, iki nokta ve büyük/küçük harf hatalarını bulur | "Hatayı bul" alıştırmaları |

**Blok → MicroPython karşılık tablosu** (9.1'de kullanılır, 9.2'de MakeCode'un Python görünümü ile python.microbit.org'daki gerçek MicroPython'un aynı adları kullanmadığı açıkça söylenir):

| MakeCode bloğu | MicroPython |
| --- | --- |
| `show string` | `display.scroll("...")` |
| `show number` | `display.scroll(sayi)` |
| `show icon` | `display.show(Image.HEART)` |
| `plot x y` | `display.set_pixel(x, y, 9)` |
| `clear screen` | `display.clear()` |
| `forever` | `while True:` |
| `pause (ms)` | `sleep(ms)` |
| `on button A pressed` | `if button_a.was_pressed():` |
| `if … then … else` | `if … : / else:` |
| `repeat 4 times` | `for i in range(4):` |

### Modül 10 — MicroPython Temelleri

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 10.1 Değişkenler ve veri türleri | int, float, str ve bool türlerini kullanır | Puan sayacı |
| 10.2 if / elif / else | Koşullu ifadeler yazar | Sıcaklık sınıflandırma |
| 10.3 while ve for döngüleri | Koşullu ve sayılı döngü yazar | Geri sayım ve animasyon |
| 10.4 Listeler ve görüntüler | Liste oluşturur, Image ile kare dizer | Kendi animasyonu |
| 10.5 Fonksiyonlar | Tekrar eden kodu fonksiyona çevirir | `goster_yuz()` fonksiyonu |

### Modül 11 — MicroPython ile Donanım

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 11.1 Butonlar ve sensörler | Buton, ışık ve sıcaklık değerlerini Python ile okur | Termometrenin Python sürümü |
| 11.2 Hareketler | İvmeölçer hareketlerini algılar | Python zarı |
| 11.3 Müzik ve mikrofon | music ve microphone modüllerini kullanır | Melodi ve gürültü ölçer |
| 11.4 Radyo | radio modülüyle mesaj gönderir | Python ile mesajlaşma |
| 11.5 Pinler, LED ve servo | `pin0.write_digital()` ve `write_analog()` ile LED ve servoyu yönetir | Otomatik bariyerin Python sürümü |

### Modül 12 — Final Projesi

| Ders | Öğrenci ne yapabilecek | Örnek / etkinlik |
| --- | --- | --- |
| 12.1 Proje tasarımı | Kendi probleminin çözümünü planlar ve kodlamaya başlar | Proje kartı ve akış şeması |
| 12.2 Proje sunumu | Projesini test eder, sunar, başkalarının projesine geri bildirim verir | Yıl sonu proje günü |

## Rozetler

Her kursa 5–6 rozet yeterli: öğrenci yaklaşık 4 haftada bir yeni rozet kazanır. Genel rozetler (İlk Adım, Kodlama Çaylağı, Kod Avcısı, Yüzlük, Ateş Serisi) iki kursta da geçerli kalır.

| Rozet | Kurs | Kazanma koşulu | Bonus puan |
| --- | --- | --- | --- |
| Robot Dedektifi | Kurs 1 | Modül 2 tamamlandı (sensör – işlemci – eyleyici) | 10 |
| Devre Kurucu | Kurs 1 | Modül 3 tamamlandı (elektronik temelleri) | 10 |
| Şema Ustası | Kurs 1 | Modül 5 tamamlandı (akış şemaları) | 10 |
| Karar Verici | Kurs 1 | Modül 7 tamamlandı (karar yapıları) | 10 |
| Döngü Ustası | Kurs 1 | Modül 8 tamamlandı (döngüler) | 10 |
| Robotik Kâşifi | Kurs 1 | Kurs tamamlandı | 25 |
| LED Sanatçısı | Kurs 2 | Modül 1 tamamlandı | 10 |
| Sensör Uzmanı | Kurs 2 | Modül 4 tamamlandı | 15 |
| Müzik Kodcusu | Kurs 2 | Modül 5 tamamlandı | 10 |
| Radyo Operatörü | Kurs 2 | Modül 6 tamamlandı | 10 |
| Hareket Mühendisi | Kurs 2 | Modül 7 tamamlandı (pinler, LED, servo) | 15 |
| Python Kâşifi | Kurs 2 | Modül 10 tamamlandı | 20 |
| micro:bit Ustası | Kurs 2 | Kurs tamamlandı | 25 |

Bu tablo CLAUDE.md §9.3'teki başlangıç rozetlerinin yerini alır; modül adları ve sayıları da §14'teki eski listeden farklıdır.

## Platformda gereken küçük eklemeler

İçerik girmeden önce platformda dört küçük düzenleme gerekiyor; hepsi Claude Code'a tek bir istekle yaptırılabilir.

1. **python.microbit.org izinli araçlara eklenmeli** (`src/lib/tools.ts`). Modül 9–12'deki tüm Python dersleri resmi MicroPython editörüne bağlanıyor; listede yoksa araç butonu reddedilir.
2. **"Sözde kod" dil seçeneği eklenmeli** (`src/lib/code-languages.ts`). Kurs 1'deki algoritma örnekleri Türkçe adımlarla yazılıyor; renklendirme gerekmez, düz metin olarak görünür.
3. **Şemalar görsel olarak yüklenecek.** Depolama alanı SVG kabul etmediği için PNG hazırlanır: Kurs 1'de yaklaşık 12 akış şeması ve 6 devre çizimi, Kurs 2 Modül 7'de 4 bağlantı çizimi (LED ve servonun hangi pine bağlandığı).
4. **İçe aktarma komutu mini testleri de taşımalı.** Dosyadaki `test` alanı, platformdaki mini test tablosunun alan adlarına göre eşlenir.

Kurs sırası kodla zorlanmaz: Kurs 2 sınıfa, Kurs 1 bitince öğretmen panelinden atanır.

## Üretim süreci

İçerik dört dalgada üretilir; ilk dalga 11 derslik bir pilottur ve üslubu sınıfta denemek için yapılır.

| Dalga | Kapsam | Ders sayısı | Ne zamana hazır olmalı |
| --- | --- | --- | --- |
| 1 — Pilot | Kurs 1 Modül 1–2 ve Kurs 2 Modül 1 | 11 | Hemen; sınıfta denenip üslup ayarlanır |
| 2 | Kurs 1 Modül 3–9 | 24 | Kurs 1'in 2. haftası |
| 3 | Kurs 2 Modül 2–8 (blok, pinler ve servo dahil) | 25 | Kurs 2 başlamadan (9. hafta) |
| 4 | Kurs 2 Modül 9–12 (Python) | 15 | İçerik yüklendi, görseller bekleniyor |

**Dosya düzeni.** Dersler platforma tek tek elle girilmez. Her ders projede bir Markdown dosyası olur; Claude Code bir içe aktarma komutu yazar ve dersleri slug'a göre Supabase'e ekler ya da günceller. Böylece 66 ders git'te saklanır, bir yazım hatası dosyada düzeltilip komut yeniden çalıştırılır.

```markdown
---
kurs: robotik-giris
modul: algila-dusun-harekete-gec
slug: sensorler-robotun-duyulari
sira: 1
baslik: "Sensörler: Robotun Duyuları"
ozet: "Bu derste robotların çevreyi nasıl algıladığını öğreneceksin."
sure: 20
puan: 10
kod_dili: blocks
arac_linki: ""
malzemeler: []
video: ""
test:
  - soru: "Hangisi bir sensördür?"
    secenekler: ["Motor", "Işık sensörü", "LED"]
    dogru: 1
    aciklama: "Işık sensörü çevreden bilgi alır; motor ve LED eyleyicidir."
---

Ders içeriği (7 adımlık akış) buraya yazılır.
```

Dosya yolu: `content/<kurs>/<modul>/<ders>.md`.

**Yapılacaklar**

- [x] Açık soruları yanıtla
- [ ] Claude Code: platform eklemeleri (izinli araç, sözde kod, mini testli içe aktarma komutu)
- [ ] Video eşleştirme: mevcut @kod\_turozirya videolarını derslere bağla, eksik konular için yeni video listesi çıkar
- [ ] Servo ve harici LED bağlantısını sınıftaki malzemeyle bir kez dene
- [ ] Dalga 1: 11 dersin metinleri ve mini testleri
- [ ] Dalga 1: akış şeması ve görseller
- [ ] Pilotu sınıfta dene, üslup notlarını yazım kurallarına ekle
- [ ] Dalga 2, 3 ve 4

## Yıllık akış (öneri)

Kurs 1 ilk 8 haftada biter; micro:bit kursu 9. haftada başlar ve 22. haftada bloktan Python'a geçer.

&#91;embedded content: yıllık akış · 28 hafta, 5 dönem\]

Kurs 2, 9. haftada öğretmen panelinden sınıfa atanır. Blok dönemi projesi 21. haftada, final projesi 28. haftada sunulur. Kurs 1'in 31 dersinin 8 haftaya sığması için bir ders saatinde 2 kısa ders işlenir.

## Alınan kararlar

- Kurslar yalnızca kulüpte, 6. sınıf düzeyinde işlenir; yıllık akış 28 haftalık kulüp yılına göredir.
- Her dersin "Kendini Yokla" bölümü platformun mini test özelliğiyle yapılır.
- Krokodil kablo, harici LED ve servo motor var: Kurs 2'ye Modül 7 (Pinler, LED ve Servo) ve Python'da 11.5 dersi eklendi.
- Kurs 1'e Modül 3 (Elektronik Temelleri) eklendi.
- Konuya uygun @kod\_turozirya videoları derslere bağlanır; eksik konular için yeni video çekilir.

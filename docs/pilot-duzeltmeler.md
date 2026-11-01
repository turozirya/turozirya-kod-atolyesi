# Pilot Dalga — Toplu Düzeltme Listesi

Bu dosya, pilot dalgadaki 11 ders için daha önce verilen bütün düzeltme listelerinin yerini alır. Önce A bölümündeki genel kuralları 11 derse uygula, sonra B bölümündeki ders ders düzeltmeleri yap, en son C bölümündeki plan değişikliklerini işle.

İçe aktarmayı (`content:import`) ben onaylamadan çalıştırma. Bitince her ders için yapılan değişiklikleri kısaca listele.

---

## A. Genel kurallar

Bu kuralları `docs/icerik-plani.md` içindeki "Yazım kuralları" bölümüne ekle. Sonraki bütün dalgalar da bunlara göre yazılacak.

### Doğruluk
1. **Mutlak ifadeleri kontrol et.** "Her zaman", "hiç", "asla", "hiç değişmez" ifadelerini yalnızca kesin doğruysa kullan.
2. **Günümüz cihazlarını yanlış anlatma.** Bugün sensörü olabilecek bir cihazı (çamaşır makinesi, akıllı saat, basit gece lambası) "algılamayan" ya da "işlemcisi olan" diye örnek verme. Emin olmadığın örneği seçme.
3. **Kavramlar dersler arasında tutarlı olsun.** 1.1'deki robot tanımı (algılar, karar verir, hareket eder) sonraki derslerde çiğnenmesin. Robot olmayan bir sistem anlatılıyorsa "robot" değil "akıllı sistem" ya da "otomatik sistem" denir.
4. **Bir kelime aynı derste iki farklı anlamda kullanılmasın.** Örneğin "işlem" hem sürecin tamamı hem de ortadaki adım olarak geçmesin.

### Ders akışı
5. Girişteki merak sorusu dersin sonunda mutlaka cevaplansın.
6. "Dene!" etkinlikleri öğretmen olmadan da yapılabilsin. Gereken nesne, kart ya da tablo listesini metne yaz. Tabloları Markdown tablo olarak ver ve ilk satırı örnek olarak doldur. Sınıfta kullanılacak bir malzeme varsa "malzemeler" alanına ekle.
7. Etkinlikler öğrencinin telefonu olduğunu varsaymasın, okulda telefon kullanımı gerektirmesin.
8. Tartışmalı örneklerin (otomatik kapı, uzaktan kumandalı araba, dokunmatik ekran gibi) cevabı kısa bir "Tartışmalı örnekler" notuyla verilsin.
9. Öğrencinin bildiği bir kurala ters düşen durum ipucu kutusunda açıkça yazılsın (örneğin micro:bit'te y'nin aşağı doğru artması).
10. Konum, bağlantı ya da şekil anlatan her derste en az bir görsel olsun (PNG): ızgara, kartın parçaları, editör ekranı, girdi–işlem–çıktı şeması gibi.

### Biçim ve dil
11. İpucu kutusu `> 💡` ile başlar.
12. `### Dene!` ve `### Bugün öğrendiklerin` başlık olarak yazılır. Özet maddeleri `- ` ile liste yapılır.
13. Cümleler en çok 15 kelime olsun. Yeni bir terim ilk geçtiği yerde **kalın** yazılsın.
14. Örnek kodu olmayan derste `kod_dili` alanını boş bırak. Kurs 1'de sözde kod yalnızca gerçekten bir örnek varsa kullanılsın.

### MakeCode — İngilizce arayüz
15. **MakeCode İngilizce arayüzle kullanılır.** Blok ve menü adları arayüzde göründüğü gibi `kod` biçiminde yazılır. İlk geçtiği yerde Türkçe anlamı parantez içinde verilir: `show string` (yazı göster). Ders metni Türkçedir; yalnızca blok, kategori ve düğme adları İngilizcedir: `Basic`, `Led`, `Download`.
16. Kurs 2'de her modülün son dersinin sonunda "Blok sözlüğü" olsun. Bu sözlükte o modülde geçen İngilizce blokların Türkçe anlamları listelenir.
17. Emin olmadığın blok adını `[BLOK ADI KONTROL]` diye işaretle. Paylaşılmış bir MakeCode projesi gereken yerde link yoksa araç linki alanına `[MAKECODE LİNKİ]` yaz.

### Mini test
18. Yanlış seçenekler, öğrencinin gerçekten düşebileceği yanılgılar olsun. "Ekran patlar", "Ekranın rengi", "Kantini süslemeli" gibi açıkça saçma seçenek kullanma.
19. Soru metni seçeneklerle uyumlu olsun. "Kaç?" diye soruyorsan seçenekler sayı olsun.
20. Testteki her soru derste anlatılan bir bilgiye dayansın; derste olmayan bir şey sorulmasın.
21. En az bir soru dersin ana bağlamından gelsin: Kurs 1'de robot, Kurs 2'de "bu blok ya da kod ne yapar?".
22. Doğru cevabın konumu sorudan soruya değişsin. Açıklamalar tek cümle olsun.

---

## B. Ders ders düzeltmeler

Modül 2'nin ortak örneği şudur: 2.1, 2.2 ve 2.3 derslerinde gece lambası yerine **robot süpürge** kullanılacak. Basit gece lambalarında işlemci yoktur, bu yüzden "lambanın işlemcisi" demek yanlış olur. Robot süpürge ise 1.1'den tanıdık ve üç parçanın hepsine sahip:

- **Sensörler:** tampon (çarpma) sensörü, merdiven boşluğunu algılayan sensör
- **İşlemci:** kararları veren çip
- **Eyleyiciler:** tekerlek motorları, fırça motoru, uyarı sesi veren hoparlör

### B1. robot-nedir (Kurs 1 · 1.1)
- Çamaşır makinesi örneğini **el mikseri** ile değiştir. Mikser motorlu ve dönüyor, ama hiçbir şey algılamıyor ve karar vermiyor. Metindeki "hiçbir şeyi algılamadan hep aynı süreyi bekler" cümlesini kaldır.
- Giriş şöyle olsun: "Robot süpürge de el mikseri de motorlu ve dönüyor. Peki hangisi robot?" Bu soruyu dersin sonunda cevapla.
- "Dene!": kart listesini metinde ver. Çamaşır makinesi yerine el mikseri koy, oyuncak araba yerine "uzaktan kumandalı araba" yaz. Malzemeler alanı: "Robot mu? kartları (isteğe bağlı)".
- "Tartışmalı örnekler" notu ekle:
  - **Otomatik kapı:** üç adıma da uyuyor, ama çoğu kişi ona robot değil "otomatik sistem" der.
  - **Uzaktan kumandalı araba:** kararı insan verdiği için robot sayılmaz.
- Robot süpürge örneğindeki 19 kelimelik cümleyi böl. Tanımda "**robot**" kalın yazılsın.
- Mini test 1. soru:
  - Soru: "El mikseri neden robot değildir?"
  - Seçenekler: ["Motoru vardır", "Çevresini algılamaz ve karar vermez", "Elektrikle çalışır", "Döner"]
  - Doğru: 1
  - Açıklama: "Mikser döner ama hiçbir şey algılamaz; ne zaman duracağına sen karar verirsin."
- `kod_dili` alanını boşalt.

### B2. robotlar-nerede-calisir (Kurs 1 · 1.2)
- **Ameliyat robotu ile 1.1 çelişiyor.** Ameliyat robotunu doktor yönetir; robot kendisi karar vermez. Metne şunu ekle: "Ameliyat robotunu doktor yönetir; robot doktorun hareketlerini küçültür ve titremesini azaltır." "Titremeyi yok ederek" ifadesini "titremeyi azaltarak" yap. Bu örneği 1.1'deki "Tartışmalı örnekler" notuna bağla.
- **Test, derste olmayan bir şeyi soruyor.** 2. soru tehlikeli yerleri soruyor, ama metinde bundan söz edilmiyor. Bir paragraf ekle: "Arama-kurtarma robotları deprem enkazında, bomba imha robotları ise tehlikeli paketlerin yanında insanın yerine görev yapar."
- Tarım örneğinde "tarlayı sular" yerine "yabani otları ayıklar" yaz. Sulama genelde otomatik bir sistemdir, robot sayılmaz.
- Girişteki "her zaman insan şeklinde olmak zorunda değil" yerine şunu yaz: "Robot deyince aklına insan şeklinde bir makine mi geliyor?"
- "Dene!": "Öğretmeninin dağıttığı kartlar" yerine "Aşağıdaki robotları doğru alana yerleştir" yaz. Bunu tablo olarak ver: Robot | Alan | İnsandan neyi daha iyi yapıyor? İlk satır dolu olsun.

### B3. okulumuza-bir-robot (Kurs 1 · 1.3)
- Ders genel olarak iyi. Fikir kartını Markdown tablo olarak ver: Sorun | Nasıl algılar? | Hangi kararı verir? | Nasıl harekete geçer? Kütüphane robotu örnek satır olarak dolu olsun.
- "Sırayı algılayan ve yönlendiren robot" ifadesi belirsiz; somutlaştır: "Kantin sırasındaki kişi sayısını sayan ve en kısa sırayı ekranda gösteren robot."
- Mini test 2. soru: seçenekleri yanılgı içerenlerle değiştir. Örneğin ["Sırada bekleyenlere müzik çalmalı", "Sıradaki kişi sayısını algılayıp en kısa sırayı göstermeli", "Kantinin ışıklarını açmalı", "Öğrencilerin sırasını rastgele değiştirmeli"]. Doğru: 1.
- Mini test 3. soru 1. soruyla aynı şeyi soruyor. Yerine şunu koy:
  - Soru: "Kütüphane robotunun raflardaki boş yeri görmesi hangi adımdır?"
  - Seçenekler: ["Karar verme", "Hareket etme", "Algılama", "Taşıma"]
  - Doğru: 2
  - Açıklama: "Boş yeri görmek, çevreden bilgi toplamaktır; yani algılamadır."
- Malzemeler: "Kâğıt ve kalem".

### B4. sensorler-robotun-duyulari (Kurs 1 · 2.1)
- "derin sıcaklığı ve dokunmayı algılar" cümlesi "derin = deep" diye okunabiliyor. "Derimiz sıcaklığı ve dokunmayı algılar" yap.
- Gece lambası örneğini robot süpürge ile değiştir: tampon sensörü duvara çarptığını, merdiven sensörü de basamağı algılar. "(ileride göreceğin bir karar adımıyla)" ifadesini kaldır ve şunu yaz: "Ne yapılacağına sensör değil, bir sonraki derste göreceğin işlemci karar verir."
- "Dene!": eşleştirmeyi kart yerine tablo olarak ver: Duyu | Sensör. Evdeki cihazlar kısmı kalsın.
- Mini test 1. sorunun açıklamasına hoparlörü de ekle: "Motor, LED ve hoparlör eyleyicidir."
- İsteğe bağlı bir son cümle: "Kurs 2'de kullanacağın micro:bit kartında da ışık, sıcaklık ve ses sensörleri var."

### B5. islemci-robotun-beyni (Kurs 1 · 2.2)
- Gece lambası örneğini robot süpürge ile değiştir: tampon sensörü "çarptım" bilgisini gönderir (girdi), işlemci "geri çekil ve sağa dön" kararını verir (işlem), tekerlekler döner (çıktı).
- "Bu süreç her zaman üç adımda ilerler" yerine: "Bilgisayarlar ve robotlar bilgiyi **girdi → işlem → çıktı** sırasıyla işler."
- Özetteki "Her işlem girdi, işlem ve çıktı adımlarından oluşur" yerine: "Bilgi işlenirken üç adım vardır: girdi, işlem, çıktı." (Kural 4)
- Akıllı telefon cümlesi 20 kelime; ikiye böl. Girdi, işlem, çıktı ve işlemci kalın yazılsın.
- Görsel: soldan sağa üç kutu ve oklar (Girdi → İşlem → Çıktı); altında robot süpürge örneği.
- Örnek kod (`kod_dili: sozde_kod`):
  ```
  GİRDİ: tampon sensörünü oku
  İŞLEM: eğer çarptıysan → geri çekil ve sağa dön
  ÇIKTI: tekerlekleri döndür
  ```
- "Dene!" etkinliği telefon gerektiriyor; telefonsuz tabloya çevir. Sütunlar: Cihaz | Girdi | İşlem | Çıktı. Satırlar: hesap makinesi (5 + 3, bu satır dolu gelsin), okul zili, asansör düğmesi, otomatik kapı, robot süpürge.
- "Tartışmalı örnekler" notu: "Dokunmatik ekran hem girdi hem çıktı aygıtıdır: dokunman girdi, ekranda gördüğün çıktıdır."
- Mini test:
  - 1. soru: "Robot süpürge duvara çarptığında 'geri çekil' kararını hangi parça verir?" Seçenekler: ["Tampon sensörü", "İşlemci", "Tekerlek motoru", "Pil"]. Doğru: 1. Açıklama: "Sensör bilgiyi toplar, kararı işlemci verir, motor bu kararı uygular."
  - 2. soru: seçenekleri ["Ekranda görünen sonuç", "İşlemcinin yaptığı hesap", "Sisteme giren bilgi", "Cihazın pili"] yap. Doğru: 2.
  - 3. soru: "Telefonun ekranına dokunman hangi adımdır?" Seçenekler: ["Girdi", "İşlem", "Çıktı", "Kayıt"]. Doğru: 0. Açıklama: "Dokunma telefona giren bilgidir; açılan uygulama ise çıktıdır."
- İsteğe bağlı: "micro:bit kartının arkasındaki küçük çiplerden biri de işlemcidir; Kurs 2'de onu programlayacaksın."

### B6. eyleyiciler-robotun-kaslari (Kurs 1 · 2.3)
- Gece lambası örneğini robot süpürge ile değiştir: tekerlek motorları hareket ettirir, fırça motoru döner, hoparlör "şarjım bitti" uyarısı verir.
- Kavram tutarlılığı (Kural 3) için şu cümleyi ekle: "Eyleyici hareket ya da etki (ışık, ses) üretir. Robottaki 'hareket etme' adımını çoğunlukla motorlar yapar."
- "Dene!" etkinliğinde su ısıtıcısının eyleyicisi ısı üretir. "Motor mu, ışık mı, ses mi?" sorusuna "ısı mı?" seçeneğini ekle. Tabloyu şöyle ver: Cihaz | Eyleyici | Ne üretiyor? İlk satır vantilatör olsun ve dolu gelsin.
- Mini test 3. soru: basit vantilatörde karar veren bir işlemci yoktur, bu yüzden soruyu değiştir:
  - Soru: "Robot süpürgede tekerlekleri döndüren parça hangisidir?"
  - Seçenekler: ["Tampon sensörü", "İşlemci", "Motor (eyleyici)", "Pil"]
  - Doğru: 2
  - Açıklama: "Motor, işlemcinin kararını harekete çeviren eyleyicidir."

### B7. hepsi-bir-arada (Kurs 1 · 2.4)
- **1.1 ile çelişki var.** Metin "Her robot sistemi..." diye başlıyor ama örnekler (otomatik kapı, sokak lambası, park sensörü) robot değil. Şöyle değiştir: "Yalnızca robotlar değil, birçok **akıllı sistem** de bu üç parçayla çalışır." Özetteki ilk maddeyi de buna uydur.
- "Bu sıra hiç değişmez" ve "asla tersine çevrilmez" ifadelerini kaldır (Kural 1).
- İpucu kutusunu daha önemli bir yanılgıyla değiştir:
  > 💡 Sık yapılan hata: Bu üç adımın bir kez çalışıp bittiği sanılır. Oysa otomatik kapı da robot süpürge de algıla – karar ver – harekete geç adımlarını saniyede defalarca tekrarlar.

  Bu not, Modül 8'deki döngüler konusuna da zemin hazırlar.
- "Dene!": analiz tablosunu metinde ver. Sütunlar: Sistem | Sensör ne algılıyor? | İşlemci ne karar veriyor? | Eyleyici ne yapıyor? Otomatik kapı satırı dolu gelsin, sonra sokak lambası, park sensörü ve öğrencinin seçeceği dördüncü bir sistem.
- Mini test:
  - 2. soru: "Park sensöründe bip sesini çıkaran hoparlör hangi parçadır?" Seçenekler: ["Sensör", "İşlemci", "Eyleyici", "Güç kaynağı"]. Doğru: 2.
  - 3. soru: "Hepsi aynı anda rastgele çalışır" seçeneği yerine "Önce LED yanar, sonra ışık sensörü kontrol eder" koy. Açıklamadaki "Sıra her zaman" ifadesini "Sistem önce algılar, sonra karar verir, sonra harekete geçer" yap.
- Örnek kod (`sozde_kod`), otomatik kapı için:
  ```
  GİRDİ: hareket sensörünü oku
  İŞLEM: eğer biri yaklaşıyorsa → kapıyı aç
  ÇIKTI: motoru çalıştır
  ```

### B8. microbit-nedir (Kurs 2 · 1.1)
- **Bilgi yanlışı var.** "Kartın ortasındaki küçük çip işlemcidir" ifadesi hatalı: micro:bit v2'de işlemci kartın **arkasındadır**, ön yüzde LED ekran ve butonlar bulunur. Metni ve 3. test sorusunu düzelt. Arka yüzdeki etiketleri bir v2 kartında kontrol et ve işaretle: `[KONTROL: arka yüz etiketleri]`.
- **Eksik parçalar var.** micro:bit v2'nin parçaları şöyle verilmeli:
  - **Sensörler:** A ve B butonları, dokunmatik logo, mikrofon, ışık sensörü (LED ekran), sıcaklık sensörü, ivmeölçer, pusula
  - **Eyleyiciler:** LED ekran, hoparlör

  İpucu kutusundaki "bir eyleyici (LED ekran)" ifadesini "LED ekran ve hoparlör" yap.
- "Tartışmalı örnekler" notu: "LED ekran hem eyleyici (ışık verir) hem de sensördür (ortamdaki ışığı ölçer)."
- Görsel: kartın ön ve arka yüzü, parçalar etiketli (PNG). Böylece öğrenci "Dene!" etkinliğini kart elinde olmadan da yapabilir.
- "Dene!": USB girişi ne sensör ne eyleyicidir. Üçüncü bir sütun ekle: "Bağlantı / güç". Parça listesine hoparlör, dokunmatik logo ve pil girişini de ekle.
- "Modül 2'de öğrendiğin" ifadesini "Kurs 1, Modül 2'de öğrendiğin" yap.
- `kod_dili` alanını boşalt.
- Mini test:
  - 1. soru seçenekleri: ["Sensör", "Eyleyici", "İşlemci", "Güç kaynağı"]. Doğru: 1.
  - 3. soru: "micro:bit'te kararları veren işlemci kartın neresindedir?" Seçenekler: ["Ön yüzde, LED'lerin ortasında", "Arka yüzde", "USB kablosunun içinde", "A butonunun altında"]. Doğru: 1.

### B9. led-ekraninda-ilk-yazim → MakeCode ve İlk Program (Kurs 2 · 1.2)
- Slug başlıkla uyuşmuyor: `led-ekraninda-ilk-yazim` → `makecode-ilk-program`.
- **İngilizce arayüz adımı ekle (ilk paragraftan sonra):** "MakeCode'u İngilizce kullanacağız. Sağ üstteki ⚙ (Settings) → `Language` → `English`. Bu kelimeleri Python'a geçince tekrar göreceksin."
- Blok ve düğme adları: "Göster dize" → `show string` (yazı göster), "Başlangıç" → `Basic`, "İndir" → `Download`. Yeni projede hazır gelen `on start` (başlangıçta) ve `forever` (sürekli) bloklarını tanıt.
- Yükleme anlatımını güncelle: "Bilgisayarda MICROBIT adlı bir sürücü görünür; indirilen .hex dosyasını oraya sürükle. Chrome veya Edge kullanıyorsan `Connect device` ile kartı bir kez eşleştir; sonra `Download` programı doğrudan karta yükler."
- İpucu kutusuna ikinci bir madde ekle (sınıfta en sık karşılaşılan sorun): "Kart bilgisayarda görünmüyorsa USB kablon yalnızca şarj kablosu olabilir; veri aktaran başka bir kablo dene."
- "Dene!": `show string` bloğunu `on start` içine koymasını söyle. Ardından "`forever` içine koyarsan ne olur?" diye sor ve cevabını ver.
- Görsel: MakeCode ekranında blok paleti, çalışma alanı, simülatör ve `Download` düğmesi etiketli.
- Araç linki: `https://makecode.microbit.org`
- Mini test:
  - 1. soru: "Kart otomatik silinir" seçeneğini "Program kendiliğinden karta yüklenir" ile değiştir (gerçek bir yanılgı).
  - 3. soru seçenekleri: ["Simülatörde ▶'ye basmak", "Dosyayı USB ile micro:bit'e aktarmak", "Projeyi kaydetmek", "Kartı sallamak"]. Doğru: 1. Açıklama: "Simülatör yalnızca ekranda dener; gerçek kart için dosyayı karta aktarman gerekir."
  - Yeni bir soru ekle ya da 2. soruyla değiştir: "`show string "Merhaba"` bloğu `on start` içindeyse kart açılınca ne olur?" Seçenekler: ["Yazı bir kez kayar", "Yazı sürekli tekrar eder", "Hiçbir şey olmaz", "Yazı sabit durur"]. Doğru: 0.

### B10. led-ekranda-yazi-sayi-simge (Kurs 2 · 1.3)
- **Bilgi yanlışı (yön):** "harfler soldan sağa kayarak" ifadesi hatalı. Harfler **sağdan girer, sola doğru kayar**.
- **Bilgi yanlışı (sayılar):** "`show number` ile sayı kaymaz" yalnızca tek basamaklı sayılar için doğru. 12 gibi iki basamaklı bir sayı da kayar. "Dene!"deki "yaşın" örneği de bu yüzden kayacak. Metni düzelt: "Tek basamaklı sayı sabit görünür, daha uzun sayılar kayar."
- **İpucu kutusundaki gerekçe yanlış.** Yerine bunu yaz:
  > 💡 `show string` yazı (metin) içindir, `show number` sayı içindir. Bunlar farklı veri türleridir (Hatırla: Kurs 1, Modül 6). İleride bir değişkendeki sayıyı göstermek için `show number` kullanacaksın.
- **Simge listesi hatalı.** `show icon` listesinde ok ve yıldız yoktur. "kalp, gülen yüz, ok, yıldız" yerine "kalp, gülen yüz, ördek, ev, zürafa" yaz. Ok için ayrı bir `show arrow` bloğu olduğunu bir cümleyle söyle. Özetteki "kalp, yıldız gibi" ifadesini de düzelt.
- Blok adları: "Göster dize" → `show string`, "Göster sayı" → `show number`, "Göster simge" → `show icon`, "bekle" → `pause (ms)`. `pause` için şunu ekle: "ms = milisaniye; 1000 ms = 1 saniye."
- Örnek ve "Dene!" için paylaşılmış bir MakeCode projesi: `[MAKECODE LİNKİ]`.
- Mini test:
  - 1. soru seçenekleri: ["Harfler sağdan sola kayarak geçer", "Sadece ilk harf görünür", "Harfler küçülerek sığdırılır", "Kelime ikiye bölünüp iki satırda görünür"]. Doğru: 0.
  - 2. soru: "`show number 7` ile `show number 25` arasındaki fark nedir?" Seçenekler: ["Hiçbir fark yoktur", "7 sabit görünür, 25 kayar", "25 hiç görünmez", "İkisi de kayar"]. Doğru: 1.
  - 3. soru seçenekleri İngilizce olsun: [`show icon`, `show number`, `show string`, `show leds`]. Doğru: 0.
- Modül 1'in son dersi bu değil, 1.4. Blok sözlüğü 1.4'ün sonuna konacak (Kural 16).

### B11. kendi-simgeni-ciz (Kurs 2 · 1.4)
- **Önemli eksik:** y'nin aşağı doğru arttığı söylenmiyor. İpucu kutusunu şöyle değiştir:
  > 💡 Dikkat: Matematikte y yukarı doğru artar, micro:bit'te **aşağı doğru** artar. Sol üst (0, 0), sol alt (0, 4), sağ alt (4, 4).
- "micro:bit'te sayma her zaman 0'dan başlar" ifadesini hem metinde hem özette "LED ekranda koordinatlar 0'dan başlar" yap.
- **Kolay yolu da göster:** Önce `show leds` bloğunu tanıt; bu blokta noktalara tıklayarak çizim yapılır. Sonra `plot` bloğunun neden öğrenildiğini açıkla: "Koordinatla çizmek, ileride değişkenlerle hareket eden noktalar ve animasyonlar yapmanı sağlar."
- Blok adları: "yak LED" → `plot x … y …` (noktayı yak), "söndür LED" → `unplot x … y …` (noktayı söndür), `clear screen` (ekranı temizle). Hepsi `Led` kategorisindedir.
- Ok örneğinde gövde y = 0'dan 4'e uzasın. Ok başı (1, 1) ve (3, 1) noktalarında kalsın.
- Görseller: köşeleri ve eksenleri etiketli 5×5 koordinat ızgarası; ok örneğinin ızgara üzerindeki hali.
- Araç linki: ok örneğini içeren paylaşılmış MakeCode projesi `[MAKECODE LİNKİ]`.
- Mini test:
  - 1. soru: "Rengi" seçeneğini "Kaçıncı satırda olduğunu" ile değiştir. Doğru: Sol-sağ konumu.
  - 2. soru: "(0, 4) noktası ekranın neresindedir?" Seçenekler: ["Sol üst", "Sol alt", "Sağ üst", "Orta"]. Doğru: 1. Açıklama: "x = 0 en sol sütun, y = 4 en alt satırdır; micro:bit'te y aşağı doğru artar."
  - 3. soru: "`plot x 2 y 0`, `plot x 2 y 1`, `plot x 2 y 2` bloklarından sonra ekranda ne görünür?" Seçenekler: ["Ortada üstten aşağı 3 noktalık dikey çizgi", "Üst satırda 3 noktalık yatay çizgi", "Sol sütunda dikey çizgi", "Tek bir nokta"]. Doğru: 0.
- **Modül 1 Blok sözlüğü** (dersin sonuna):

  | Blok | Anlamı |
  |---|---|
  | `on start` | başlangıçta |
  | `forever` | sürekli |
  | `show string` | yazı göster |
  | `show number` | sayı göster |
  | `show icon` | simge göster |
  | `show leds` | LED'leri göster |
  | `pause (ms)` | bekle |
  | `plot` | noktayı yak |
  | `unplot` | noktayı söndür |
  | `clear screen` | ekranı temizle |

---

## C. Plan dokümanı (`docs/icerik-plani.md`)

1. A bölümündeki 22 kuralı "Yazım kuralları"na ekle.
2. **Kurs 2, Modül 9'a "Blok → MicroPython karşılık tablosu" ekle.** MakeCode'un Python görünümü ile python.microbit.org'daki MicroPython aynı adları kullanmaz. 9.1 dersi bu tabloyu kullansın, 9.2 dersinde bu fark açıkça söylensin. Tablo:

   | MakeCode bloğu | MicroPython |
   |---|---|
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

3. Kurs 1'de MakeCode simülatörü kullanan derslerde (6.2, 7.2, 9.1) de İngilizce arayüz kullanılsın.
4. Kurs 2, 1.2 dersine dil ayarı adımının eklendiğini plana not et.

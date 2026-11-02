---
kurs: microbit
modul: tanisma
slug: makecode-ilk-program
sira: 1
baslik: "MakeCode ve İlk Program"
ozet: "Bu derste MakeCode editörünü, simülatörü ve karta yükleme adımlarını kullanacaksın."
sure: 20
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
test:
  - soru: "MakeCode'da blokları birleştirdiğinde ne olur?"
    secenekler: ["Bir program oluşur", "Program kendiliğinden karta yüklenir", "Sadece resim çizilir", "Hiçbir şey olmaz"]
    dogru: 0
    aciklama: "Bloklar birleşince bir program oluşur, ama karta yüklenmesi için Download'a basman gerekir."
  - soru: "'show string \"Merhaba\"' bloğu 'on start' içindeyse kart açılınca ne olur?"
    secenekler: ["Hiçbir şey olmaz", "Yazı sürekli tekrar eder", "Yazı bir kez kayar", "Yazı sabit durur"]
    dogru: 2
    aciklama: "'on start' içindeki bloklar kart açılınca yalnızca bir kez çalışır."
  - soru: "Programı karta yüklemek için hangi adım gerekir?"
    secenekler: ["Simülatörde ▶'ye basmak", "Dosyayı USB ile micro:bit'e aktarmak", "Projeyi kaydetmek", "Kartı sallamak"]
    dogru: 1
    aciklama: "Simülatör yalnızca ekranda dener; gerçek kart için dosyayı karta aktarman gerekir."
---

micro:bit'in parçalarını tanıdın. Şimdi ona ilk **program**ını yazdıracaksın.

**MakeCode**, micro:bit için program yazdığın blok tabanlı bir **editör**dür. Farklı renklerdeki blokları birbirine bağlayarak bir program oluşturursun; her blok bir komuttur. Editörün yanında bir **simülatör** bulunur — bu, programını gerçek karta yüklemeden önce bilgisayar ekranında denemeni sağlayan sanal bir micro:bit'tir.

MakeCode'u **İngilizce** kullanacağız. Sağ üstteki ⚙ (Settings) → `Language` → `English`. Bu kelimeleri Python'a geçince tekrar göreceksin.

Yeni bir proje açtığında iki blok hazır gelir: `on start` (başlangıçta) kart açılınca bir kez çalışır, `forever` (sürekli) ise programı bitmeden sürekli tekrarlar.

Program hazır olduğunda, onu gerçek karta aktarman gerekir. Bu işleme **yükleme** denir: `Download` düğmesine basınca MakeCode programı bir `.hex` dosyası olarak indirir. Bilgisayarda **MICROBIT** adlı bir sürücü görünür; indirilen dosyayı oraya sürükle. Chrome veya Edge kullanıyorsan `Connect device` ile kartı bir kez eşleştir; sonra `Download` programı doğrudan karta yükler.

**Örnek:** `Basic` kategorisinden `show string` bloğunu `on start` içine koyup içine "Merhaba!" yazarsın. Simülatörde harflerin LED ekranda kaydığını görürsün. Beğenince `Download` düğmesine basar, dosyayı karta yüklersin; gerçek kartın ekranında da aynı yazı kayar.

> 💡 Sık yapılan hata: Program simülatörde çalıştıktan sonra "yükleme" adımı unutulur. Gerçek kartta görmek için dosyayı **mutlaka** karta aktarman gerekir.
> 💡 Kart bilgisayarda görünmüyorsa USB kablon yalnızca şarj kablosu olabilir; veri aktaran başka bir kablo dene.

![makecode-ilk-program-kavram](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/12a1c23d-07dc-4ed5-9104-a814141aafc3.png)

**Dene!** MakeCode'u aç ve `Basic` kategorisindeki `show string` bloğunu `on start` içine koy. İçine kendi adını yaz. Önce simülatörde çalıştığını gör, sonra programı indirip gerçek micro:bit'ine yükle. Sonra şunu dene: aynı bloğu `forever` içine koyarsan ne olur? (Cevap: yazı art arda, aralıksız tekrar tekrar kayar — çünkü `forever` bitmeden sürekli çalışır.)

![makecode-ilk-program-dene](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/bbbea84d-b969-42b0-af0e-db23e664e092.png)

**Bugün öğrendiklerin:**
- MakeCode, blokları birleştirerek program yazdığın bir editördür.
- `on start` bir kez, `forever` sürekli çalışır.
- Program, `Download` ile indirilip USB kablosuyla karta aktarılarak çalışır.

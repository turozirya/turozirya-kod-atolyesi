---
kurs: microbit
modul: tanisma
slug: kendi-simgeni-ciz
sira: 3
baslik: "Kendi Simgeni Çiz"
ozet: "Bu derste LED ekrandaki noktaları x ve y koordinatıyla tek tek yakacaksın."
sure: 20
puan: 10
kod_dili: blocks
arac_linki: "[MAKECODE LİNKİ]"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
test:
  - soru: "micro:bit'in LED ekranında x koordinatı neyi gösterir?"
    secenekler: ["Yukarı-aşağı konumu", "Sol-sağ konumu", "Parlaklığı", "Kaçıncı satırda olduğunu"]
    dogru: 1
    aciklama: "x koordinatı, noktanın soldan sağa kaçıncı sütunda olduğunu gösterir."
  - soru: "(0, 4) noktası ekranın neresindedir?"
    secenekler: ["Sol üst", "Sol alt", "Sağ üst", "Orta"]
    dogru: 1
    aciklama: "x = 0 en sol sütun, y = 4 en alt satırdır; micro:bit'te y aşağı doğru artar."
  - soru: "'plot x 2 y 0', 'plot x 2 y 1', 'plot x 2 y 2' bloklarından sonra ekranda ne görünür?"
    secenekler: ["Ortada üstten aşağı 3 noktalık dikey çizgi", "Üst satırda 3 noktalık yatay çizgi", "Sol sütunda dikey çizgi", "Tek bir nokta"]
    dogru: 0
    aciklama: "Üç nokta da x=2 sütununda, farklı satırlarda; ortada dikey bir çizgi oluşturur."
---

Hazır simgeleri kullandın. Şimdi kendi **özgün** simgeni, LED'leri tek tek yakarak çizeceksin.

LED ekran, 5 sütun ve 5 satırdan oluşan bir **ızgara**dır. Her nokta bir **x** (sütun) ve bir **y** (satır) koordinatıyla bulunur. Koordinatlar 0'dan başlar: en sol üstteki nokta (0, 0)'dır, en sağ üstteki nokta (4, 0)'dır.

> 💡 Dikkat: Matematikte y yukarı doğru artar, micro:bit'te **aşağı doğru** artar. Sol üst (0, 0), sol alt (0, 4), sağ alt (4, 4).

![koordinat-izgara](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/2510a8a2-4c6c-43c0-b4bc-0375bd8d959e.png)

Önce kolay yolu dene: `show leds` bloğunda ızgaradaki noktalara doğrudan tıklayarak çizim yapabilirsin. Peki neden koordinatla da çizmeyi öğreniyoruz? Çünkü koordinatla çizmek, ileride değişkenlerle hareket eden noktalar ve animasyonlar yapmanı sağlar.

`Led` kategorisindeki "plot" bloğu (noktayı yak), verdiğin x ve y koordinatındaki tek bir noktayı yakar. "unplot" bloğu (noktayı söndür) ise aynı şekilde bir noktayı söndürür. "clear screen" bloğu (ekranı temizle) tüm noktaları birden söndürür. Birden fazla "plot" bloğunu art arda kullanarak, istediğin herhangi bir deseni **piksel piksel** çizebilirsin.

**Örnek:** Küçük bir ok çizmek istersen, önce orta sütunun (x=2) tüm satırlarını (y=0,1,2,3,4) yakarak gövdeyi oluşturursun. Sonra iki köşegen noktayı ((1,1) ve (3,1)) ekleyerek ok başını yaparsın.

![koordinat-izgara-ok-ornegi](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/a57ea052-9aa3-4ec3-b22d-075bba6c8d75.png)

**Dene!** Bir kareli kâğıda 5x5'lik bir ızgara çiz ve kendi basit simgeni (bir yıldız, bir ev, kendi baş harfin gibi) karalayarak tasarla. Sonra her karalı noktanın x,y koordinatını bul ve MakeCode'da "plot" bloklarıyla aynı simgeyi oluştur. Simülatörde kontrol et, sonra karta yükle.

**Bugün öğrendiklerin:**
- LED ekranda koordinatlar 0'dan başlar; x sağa, y **aşağı** doğru artar.
- "plot" ve "unplot" blokları tek bir noktayı kontrol eder, "clear screen" hepsini söndürür.
- `show leds` ile tıklayarak, koordinatla "plot" ile de aynı deseni çizebilirsin.

### Modül 1 Blok Sözlüğü

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

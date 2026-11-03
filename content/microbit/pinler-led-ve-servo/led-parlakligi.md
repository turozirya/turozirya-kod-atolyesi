---
kurs: microbit
modul: pinler-led-ve-servo
slug: led-parlakligi
sira: 1
baslik: "LED Parlaklığı"
ozet: "Bu derste analog yazma ile LED'in parlaklığını değiştirecek ve nefes alan bir LED yapacaksın."
sure: 20
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo", "1 LED", "2 krokodil kablo", "Varsa 1 adet 220 Ω direnç"]
video: ""
ornek_kod: ""
test:
  - soru: "`analog write pin P0 to 512` LED'i nasıl yakar?"
    secenekler: ["Yanıp söndürerek", "Yaklaşık yarı parlaklıkta", "Hiç yakmaz", "En parlak hâlde"]
    dogru: 1
    aciklama: "512, 0 ile 1023 arasının yaklaşık ortasıdır."
  - soru: "Analog yazma hangi aralıkta değer alır?"
    secenekler: ["1–100", "0–1", "0–1023", "0–255"]
    dogru: 2
    aciklama: "`analog write` 0 (kapalı) ile 1023 (en parlak) arasında değer alır."
  - soru: "Nefes alan LED programında `change parlaklik by 31` yerine 100 yazılırsa ne olur?"
    secenekler: ["LED hiç yanmaz", "LED daha yavaş parlar", "Program durur", "LED daha hızlı parlar ve söner"]
    dogru: 3
    aciklama: "Her adımda daha çok değiştiği için en parlak hâle daha kısa sürede ulaşır."
---

Bazı cihazların ışığı uyku modunda yavaşça parlayıp söner; sanki nefes alıyormuş gibi. Bunu nasıl yaparız?

Önceki derste LED ya tamamen yanıyordu ya tamamen sönüktü. Ara parlaklıklar için **analog yazma** kullanılır. `Pins` kategorisindeki `analog write pin P0 to 1023` bloğu 0 ile 1023 arasında bir değer alır:

| Değer | LED |
|---|---|
| 0 | Sönük |
| 512 | Yaklaşık yarı parlak |
| 1023 | En parlak |

Peki LED yarı parlak nasıl olur? micro:bit, LED'i saniyede yüzlerce kez çok hızlı açıp kapatır. Gözün bu hızı yakalayamaz ve ışığı daha sönük görür. Değer büyüdükçe LED daha uzun süre açık kalır ve daha parlak görünür.

Devre önceki dersteki gibidir: uzun bacak P0'a, kısa bacak GND'ye.

**Nefes alan LED.** **parlaklik** adlı bir değişken oluştur:

```
forever
    set parlaklik to 0
    while parlaklik < 1023
        analog write pin P0 to parlaklik
        change parlaklik by 31
        pause (ms) 20
    while parlaklik > 0
        analog write pin P0 to parlaklik
        change parlaklik by -31
        pause (ms) 20
```

Birinci döngü parlaklığı 0'dan 1023'e çıkarır. İkinci döngü tekrar 0'a indirir. `forever` bunu durmadan tekrarlar.

![LED Parlaklığı — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/ed4251bc-dff0-46ba-a13f-b245c8d70a8c.png)

> 💡 Sık yapılan hata: `analog write` bloğuna `digital write` gibi 1 yazılır. Analog yazmada 1 çok küçük bir değerdir ve LED neredeyse hiç yanmaz. En parlak için 1023 yazılır.

### Dene!

![LED Parlaklığı — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/196df6e8-96d5-4b1d-993b-c8e85b11bb8b.png)

Önce tek bir `analog write pin P0 to …` bloğuyla farklı değerleri dene. Sonra nefes alan LED'i kur.

| `analog write` değeri | LED nasıl? |
|---|---|
| 0 | Sönük |
| 100 | |
| 512 | |
| 1023 | |

**Meydan okuma:** Ortam karardıkça parlayan bir LED yap: `forever` içine `analog write pin P0 to (1023 − light level × 4)` koy.

Şimdi giriş sorusuna dönelim. Analog yazma ile parlaklığı küçük adımlarla artırıp azaltırız. İki `while` döngüsü bunu sürekli tekrarlayınca LED nefes alıyormuş gibi görünür.

### Bugün öğrendiklerin

- `analog write` 0 ile 1023 arasında değer alır.
- Ara parlaklık, LED'in çok hızlı açılıp kapanmasıyla elde edilir.
- Analog yazmada en parlak değer 1 değil, 1023'tür.

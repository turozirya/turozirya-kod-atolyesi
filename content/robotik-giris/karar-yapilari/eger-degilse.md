---
kurs: robotik-giris
modul: karar-yapilari
slug: eger-degilse
sira: 1
baslik: "Eğer… Değilse"
ozet: "Bu derste iki yollu karar yapısını öğrenecek ve MakeCode simülatöründe bir gece lambası yapacaksın."
sure: 25
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: []
video: ""
ornek_kod: ""
test:
  - soru: "`if … then … else` yapısında koşul yanlışsa ne olur?"
    secenekler: ["Hiçbir şey yapılmaz", "`else` kısmındaki bloklar çalışır", "`then` kısmındaki bloklar çalışır", "Program durur"]
    dogru: 1
    aciklama: "Koşul yanlışsa “değilse” (else) kısmındaki iş yapılır."
  - soru: "Gece lambası programında ışık seviyesi tam 50 ise ekranda ne olur?"
    secenekler: ["Bütün LED'ler yanar", "Program hata verir", "Ekran temizlenir", "LED'lerin yarısı yanar"]
    dogru: 2
    aciklama: "50, 50'den küçük değildir; koşul yanlıştır ve else kısmı çalışır."
  - soru: "Robot süpürge “Eğer pil < 20 ise şarja dön, değilse temizlemeye devam et” kuralını izliyor. Pil 60 ise ne yapar?"
    secenekler: ["Şarja döner", "Durur", "Hem şarja döner hem temizler", "Temizlemeye devam eder"]
    dogru: 3
    aciklama: "60 < 20 yanlıştır; bu yüzden “değilse” kısmı çalışır."
---

Gece lambası karanlıkta yanar. Peki ortam aydınlanınca ne yapmalı?

**Eğer… değilse** yapısı iki yol sunar. Koşul doğruysa birinci iş yapılır. Koşul yanlışsa ikinci iş yapılır. Yani iki işten biri mutlaka yapılır.

Gece lambasının sözde kodu şöyledir:

```
Eğer ışık azsa:
    LED'leri yak
Değilse:
    LED'leri söndür
```

Şimdi bu gece lambasını MakeCode simülatöründe yapalım. Kart gerekmez. micro:bit'in LED ekranı hem ışık verebilir hem de ortamın ışığını ölçebilir.

1. makecode.microbit.org adresinde `New Project` aç.
2. `Logic` kategorisinden `if … then … else` (eğer… ise… değilse) bloğunu `forever` (sürekli) bloğunun içine koy.
3. Yine `Logic` kategorisinden `0 < 0` karşılaştırma bloğunu al ve `if` kısmına yerleştir.
4. Karşılaştırmanın soluna `Input` kategorisinden `light level` (ışık seviyesi) bloğunu koy. Sağına 50 yaz.
5. `then` kısmına `Basic` kategorisinden `show leds` bloğunu koy ve bütün noktaları seç.
6. `else` kısmına `Basic` kategorisinden `clear screen` (ekranı temizle) bloğunu koy.
7. Simülatörde beliren ışık ayarını değiştirerek dene.

[GÖRSEL: Ekran görüntüsü — MakeCode'da forever içinde if light level < 50 then show leds (bütün noktalar seçili) else clear screen blokları. İngilizce arayüz.]

Neden `forever` kullandık? Lamba ışığı bir kez değil, sürekli ölçmeli. Algıla, karar ver ve harekete geç adımları sürekli tekrarlanır (Hatırla: Hepsi Bir Arada dersi).

> 💡 Dikkat: `light level` 0 ile 255 arasında bir sayı verir. Sayı küçükse ortam karanlıktır. 0 en karanlık değerdir.

### Dene!

Işık seviyesini aşağıdaki değerlere getir. Koşulun doğru mu yanlış mı olduğunu ve ekranda ne olduğunu yaz.

| Işık seviyesi | `light level < 50` | Ekranda ne olur? |
|---|---|---|
| 20 | doğru | Bütün LED'ler yanar |
| 49 | | |
| 50 | | |
| 200 | | |

Sonra 50 yerine 100 yaz ve tekrar dene. Lamba artık ne zaman yanıyor?

Şimdi giriş sorusuna dönelim. Ortam aydınlanınca koşul yanlış olur. Bu durumda “değilse” kısmı çalışır ve lamba söner.

### Bugün öğrendiklerin

- “Eğer… değilse” yapısında iki işten biri mutlaka yapılır.
- Koşul doğruysa `then`, yanlışsa `else` kısmındaki bloklar çalışır.
- Sensör sürekli kontrol edilecekse karar yapısı `forever` içine konur.

---
kurs: microbit
modul: pinler-led-ve-servo
slug: pinler-ve-harici-led
sira: 0
baslik: "Pinler ve Harici LED"
ozet: "Bu derste krokodil kablolarla bir LED'i micro:bit'e bağlayacak ve yakıp söndüreceksin."
sure: 25
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo", "1 LED", "2 krokodil kablo", "Varsa 1 adet 220 Ω direnç"]
video: ""
ornek_kod: ""
test:
  - soru: "`digital write pin P0 to 1` ne yapar?"
    secenekler: ["P0'daki değeri okur", "P0'dan elektrik verir ve LED yanar", "P0'ı kapatır", "LED'i ters çevirir"]
    dogru: 1
    aciklama: "1, pini açar; P0'dan elektrik çıkar ve bağlı LED yanar."
  - soru: "LED'in uzun bacağı nereye bağlanmalı?"
    secenekler: ["P0'a", "3V ile GND'ye birlikte", "GND'ye", "Hiçbir yere"]
    dogru: 0
    aciklama: "Uzun bacak artı bacaktır; programla açıp kapattığımız P0'a bağlanır."
  - soru: "Dijital bir pin kaç farklı değer alabilir?"
    secenekler: ["10", "1023", "255", "2 (0 ya da 1)"]
    dogru: 3
    aciklama: "Dijital yalnızca iki durum demektir: kapalı (0) ya da açık (1)."
---

micro:bit'in ekranında 25 LED var. Peki kartın dışındaki bir LED'i de yakabilir miyiz?

Kartın alt kenarındaki altın şeritlere **pin** denir. Pinler, kartı dış dünyadaki parçalara bağlar. Bu derste P0 pinini ve GND pinini kullanacağız. GND, devrenin eksi ucudur.

**Bağlantı** (Hatırla: Robotik Kodlamaya Giriş, Modül 3 — LED ve Direnç):

1. Bir krokodil kabloyla LED'in **uzun bacağını** (+) **P0** pinine bağla.
2. Diğer krokodil kabloyla LED'in **kısa bacağını** (−) **GND** pinine bağla.
3. Varsa LED'in bir bacağıyla kablo arasına 220 Ω'luk bir direnç ekle.

![Pinler ve Harici LED — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/2758c9d5-27f7-42e5-b0ca-129899ce6b88.png)

**Program.** `Pins` kategorisindeki `digital write pin P0 to 1` (P0'a dijital 1 yaz) bloğu pini açar. 1 açık, 0 kapalı demektir. **Dijital**, yalnızca iki durum olması demektir: açık ya da kapalı.

```
forever
    digital write pin P0 to 1
    pause (ms) 500
    digital write pin P0 to 0
    pause (ms) 500
```

LED yarım saniye yanar, yarım saniye söner. `Pins` kategorisini göremiyorsan `Advanced` (gelişmiş) bölümünü aç.

> 💡 Dikkat: Krokodil uçlarının birbirine ya da yandaki pinlere değmemesine dikkat et. 3V ile GND pinini asla doğrudan birleştirme; bu bir kısa devredir.

### Dene!

![Pinler ve Harici LED — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/93e2d26e-1316-4177-9926-490a4a4d1bc5.png)

Devreyi kur ve aşağıdakileri dene.

| Ne yaptın? | LED'e ne oldu? |
|---|---|
| Program çalıştı | Yarım saniyede bir yanıp söndü. |
| `pause` sürelerini 100 yaptım | |
| LED'i ters bağladım | |
| `forever` içine yalnızca `digital write pin P0 to 1` koydum | |

Şimdi giriş sorusuna dönelim. Evet, yakabiliriz. LED'i krokodil kablolarla P0 ve GND pinlerine bağlar, P0'ı programla açıp kapatırız.

### Bugün öğrendiklerin

- Pinler micro:bit'i dış dünyadaki parçalara bağlar.
- LED'in uzun bacağı P0'a, kısa bacağı GND'ye bağlanır.
- `digital write` yalnızca iki değer alır: 0 (kapalı) ya da 1 (açık).

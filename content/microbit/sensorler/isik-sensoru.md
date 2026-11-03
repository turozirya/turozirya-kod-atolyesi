---
kurs: microbit
modul: sensorler
slug: isik-sensoru
sira: 0
baslik: "Işık Sensörü"
ozet: "Bu derste ışık seviyesini ölçecek ve kendi eşik değerinle bir gece lambası yapacaksın."
sure: 20
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: ""
test:
  - soru: "micro:bit'te ışık seviyesini hangi parça ölçer?"
    secenekler: ["A düğmesi", "Pusula", "LED ekran", "Hoparlör"]
    dogru: 2
    aciklama: "Ayrı bir ışık sensörü yoktur; LED ekran ışığı ölçmek için de kullanılır."
  - soru: "`light level` hangi aralıkta değer verir?"
    secenekler: ["0–1023", "0–255", "0–100", "1–10"]
    dogru: 1
    aciklama: "Işık seviyesi 0 (karanlık) ile 255 (çok aydınlık) arasındadır."
  - soru: "Gece lamban sınıfta hiç sönmüyor. En olası neden nedir?"
    secenekler: ["Eşik değeri, sınıfın ışık seviyesinden büyük seçilmiş", "`forever` bloğu yok", "LED ekran bozuk", "Pil bitmiş"]
    dogru: 0
    aciklama: "Sınıfın ışığı eşikten küçükse koşul hep doğru olur ve lamba hiç sönmez."
---

Gece lambanı simülatörde yapmıştın. Gerçek bir sınıfta lambanın ne zaman yanacağına nasıl karar verirsin?

Simülatörde ışık seviyesini kaydırarak değiştirmiştin (Hatırla: Robotik Kodlamaya Giriş, Eğer… Değilse dersi). Gerçek kartta ışık seviyesi ortamdan ölçülür. Bunun için `Input` kategorisindeki `light level` (ışık seviyesi) bloğu kullanılır. Değer 0 ile 255 arasındadır. 0 en karanlık değerdir.

İlginç bir bilgi: micro:bit'te ayrı bir ışık sensörü yoktur. Işığı LED ekranın kendisi ölçer.

**1. Adım — Ölç.** Sınıfının ışığını öğrenmek için şu programı kur:

```
forever
    plot bar graph of light level up to 255
on button A pressed
    show number light level
```

`plot bar graph` (çubuk grafik çiz) bloğu `Led` kategorisindedir. Işık arttıkça ekranda daha çok nokta yanar. A'ya basınca ölçülen sayıyı görürsün.

**2. Adım — Eşik seç.** Kartın üstünü elinle kapatıp ölç. Sonra açıkta ölç. **Eşik değeri**, bu iki sayının arasında bir sayı olmalıdır.

**3. Adım — Gece lambası.** Eşiğini kullanarak programı yaz:

```
forever
    if light level < 40 then
        show leds (bütün noktalar seçili)
    else
        clear screen
```

40 yerine kendi eşik değerini yaz.

![Işık Sensörü — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/4a0e05ce-efeb-4aa2-a5bb-34a6fbd941e3.png)

> 💡 Dikkat: Işığı LED ekran ölçtüğü için ekranın üstünü kapatırsan değer düşer. Kartın arkasını kapatmak işe yaramaz.

### Dene!

![Işık Sensörü — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/31439b47-36c0-4280-a660-6d3f7cf16dd4.png)

Farklı yerlerde ışık seviyesini ölç ve yaz. İlk satırdaki sayı yalnızca bir örnektir; seninki farklı çıkabilir.

| Ortam | `light level` |
|---|---|
| Örnek: Pencere önü | 180 |
| Masanın üstü | |
| Kartın üstü elimle kapalı | |
| Sıranın altı | |

Şimdi giriş sorusuna dönelim. Önce sınıfının ışığını ölçersin, sonra karanlık ile aydınlık arasında bir eşik seçersin. Lamba bu eşiğe göre karar verir.

### Bugün öğrendiklerin

- `light level` 0 ile 255 arasında bir ışık değeri verir.
- micro:bit'te ışığı LED ekran ölçer.
- Eşik değeri, ortamı ölçerek seçilmelidir.

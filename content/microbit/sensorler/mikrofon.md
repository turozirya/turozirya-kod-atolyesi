---
kurs: microbit
modul: sensorler
slug: mikrofon
sira: 5
baslik: "Mikrofon"
ozet: "Bu derste ses seviyesini ölçecek ve sınıf için bir gürültü ölçer yapacaksın."
sure: 25
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: ""
test:
  - soru: "micro:bit'in mikrofonu ne yapar?"
    secenekler: ["Ses çıkarır", "Sesi kaydeder ve saklar", "Sesin ne kadar yüksek olduğunu ölçer", "Konuşulanları yazıya çevirir"]
    dogru: 2
    aciklama: "Mikrofon yalnızca ses seviyesini ölçer; sesi kaydetmez."
  - soru: "`sound level` 200 ise gürültü ölçer programı ne gösterir?"
    secenekler: ["Kızgın yüz", "Hiçbir şey", "Çubuk grafik", "200 sayısı"]
    dogru: 0
    aciklama: "200 > 128 doğrudur; bu yüzden kızgın yüz gösterilir."
  - soru: "Gürültü ölçer, sessiz sınıfta bile kızgın yüz gösteriyor. Ne yapmalısın?"
    secenekler: ["Eşik değerini küçültmek", "Kartı ters çevirmek", "`forever` bloğunu silmek", "Eşik değerini büyütmek"]
    dogru: 3
    aciklama: "Eşik çok küçükse küçük sesler bile eşiği aşar; eşiği büyütmek gerekir."
---

Sınıf ne zaman fazla gürültülü sayılır? Bunu ölçebilir miyiz?

micro:bit v2'nin bir **mikrofonu** vardır. Mikrofon kullanılırken kartın ön yüzünde, logonun yanındaki küçük ışık yanar.

`Input` kategorisindeki `sound level` (ses seviyesi) bloğu, sesin ne kadar yüksek olduğunu 0 ile 255 arasında bir sayıyla verir. 0 sessizliktir.

Önemli: Mikrofon sesi **kaydetmez**. Konuşulanları duymaz ve saklamaz. Yalnızca sesin ne kadar yüksek olduğunu ölçer.

Gürültü ölçer programı. Önce **ses** adlı bir değişken oluştur:

```
forever
    set ses to sound level
    if ses > 128 then
        show icon (kızgın yüz)
    else
        plot bar graph of ses up to 255
```

Ses azken ekranda bir çubuk grafik görünür. Ses arttıkça çubuk uzar. Ses eşiği geçince kızgın yüz çıkar.

Yüksek sesleri bir olay olarak da yakalayabilirsin: `on loud sound` (yüksek ses olunca) bloğu, ani bir alkış ya da bağırma olunca çalışır.

![Mikrofon — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/449b20c5-19b4-4dcf-9c3d-6ffa281d584f.png)

> 💡 Dikkat: Eşik değerini sınıfına göre seç. Önce sessizken, sonra normal konuşurken ölç. Eşik bu iki değerin arasında olmalı.

### Dene!

![Mikrofon — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/f9e74f4c-0fd4-4836-855a-3895ef79cd2e.png)

Farklı seslerde `sound level` değerini ölç. A'ya basınca değeri gösteren bir blok ekleyebilirsin: `on button A pressed` içine `show number sound level`. İlk satır yalnızca bir örnektir.

| Ses | `sound level` |
|---|---|
| Örnek: Sessiz sınıf | 10 |
| Fısıltı | |
| Normal konuşma | |
| Alkış | |

Sonra kendi eşiğini seç ve programında 128 yerine yaz.

Şimdi giriş sorusuna dönelim. Evet, ölçebiliriz. Mikrofon ses seviyesini ölçer. Biz de sınıfa uygun bir eşik seçerek “fazla gürültülü” sınırını belirleriz.

### Bugün öğrendiklerin

- `sound level` ses seviyesini 0 ile 255 arasında verir.
- Mikrofon sesi kaydetmez, yalnızca seviyesini ölçer.
- Eşik değeri ortam ölçülerek seçilmelidir.

### Blok sözlüğü — Modül 4

| Blok | Anlamı |
|---|---|
| `light level` | ışık seviyesi |
| `plot bar graph of … up to …` | çubuk grafik çiz |
| `temperature (°C)` | sıcaklık |
| `on shake` / `on tilt left` | sallanınca / sola yatınca |
| `acceleration (mg) x` | x yönündeki ivme (eğim) |
| `show arrow` | ok göster |
| `compass heading (°)` | pusula yönü |
| `on logo pressed` | logoya dokunulunca |
| `on pin P0 pressed` | P0'a dokunulunca |
| `sound level` | ses seviyesi |
| `on loud sound` | yüksek ses olunca |

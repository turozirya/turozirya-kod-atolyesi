---
kurs: microbit
modul: ses-ve-muzik
slug: hoparlor-ile-ilk-melodi
sira: 0
baslik: "Hoparlör ve İlk Melodi"
ozet: "Bu derste hazır sesleri çalacak ve melodi düzenleyiciyle kendi melodini yazacaksın."
sure: 20
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: ""
test:
  - soru: "micro:bit v2'de ses nereden çıkar?"
    secenekler: ["Kartın arkasındaki hoparlörden", "USB kablosundan", "A düğmesinden", "LED ekrandan"]
    dogru: 0
    aciklama: "micro:bit v2'nin arkasında küçük bir hoparlör vardır."
  - soru: "Sesi kısmak için hangi blok kullanılır?"
    secenekler: ["`pause (ms)`", "`set volume`", "`sound level`", "`clear screen`"]
    dogru: 1
    aciklama: "`set volume` ses düzeyini ayarlar; `sound level` ise mikrofonla ölçülen sestir."
  - soru: "Melodi düzenleyicide ne seçilir?"
    secenekler: ["Radyo grubu", "LED'lerin parlaklığı", "Pusula yönü", "Notalar ve sıraları"]
    dogru: 3
    aciklama: "Düzenleyicide hangi notanın hangi sırada çalacağını seçersin."
---

Oyun açılırken kısa bir müzik çalar. micro:bit'e de bir açılış müziği yaptırabilir miyiz?

micro:bit v2'nin arkasında küçük bir **hoparlör** vardır. Hoparlör bir eyleyicidir; işlemcinin kararını sese çevirir (Hatırla: Robotik Kodlamaya Giriş, Eyleyiciler dersi). Ses blokları `Music` (müzik) kategorisindedir.

**Hazır sesler.** `play sound giggle until done` (kıkırdama sesini çal) bloğu hazır seslerden birini çalar. `giggle` yazısına tıklayarak başka sesler seçebilirsin: `happy` (mutlu), `sad` (üzgün), `mysterious` (gizemli) gibi.

**Kendi melodin.** `play melody … at tempo 120 (bpm)` (melodi çal) bloğundaki melodi kutusuna tıkla. Bir ızgara açılır. Her sütun bir zaman adımıdır, her satır bir notadır. Kutulara tıklayarak notaları seç.

Açılış müziği programı:

```
on start
    set volume 100
    play sound giggle until done
on button A pressed
    play melody (kendi melodin) at tempo 120 (bpm)
```

`set volume` (ses düzeyini ayarla) bloğu 0 ile 255 arasında bir değer alır. Sınıfta herkes aynı anda ses çaldığında sesi kısmak iyi bir fikirdir.

Blok adlarının sonunda MakeCode sürümüne göre `until done` gibi ek kelimeler görebilirsin. Bu, sesin bitmesini bekleyip sonra devam etmek demektir.

![Hoparlör ve İlk Melodi — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/47b8b90e-6e87-49e8-ad12-5788dce2ca00.png)

> 💡 Sık yapılan hata: `set volume` ile `sound level` karıştırılır. `set volume` hoparlörün ses düzeyini ayarlar. `sound level` ise mikrofonun ölçtüğü ortam sesidir.

### Dene!

![Hoparlör ve İlk Melodi — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/cf717713-17bd-4edc-9722-cf03852d3134.png)

Hazır sesleri tek tek dene ve sana ne hissettirdiğini yaz. Sonra kendi melodini yaz.

| Ses ya da melodi | Ne hissettirdi? |
|---|---|
| giggle | Neşeli, komik |
| sad | |
| mysterious | |
| Kendi melodim | |

Şimdi giriş sorusuna dönelim. Evet, yaptırabiliriz. `on start` içindeki bir ses bloğu, kart açılır açılmaz açılış müziğini çalar.

### Bugün öğrendiklerin

- micro:bit v2'nin arkasında bir hoparlör vardır.
- `play sound` hazır sesleri, `play melody` kendi melodini çalar.
- `set volume` ses düzeyini 0 ile 255 arasında ayarlar.

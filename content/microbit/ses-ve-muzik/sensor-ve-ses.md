---
kurs: microbit
modul: ses-ve-muzik
slug: sensor-ve-ses
sira: 2
baslik: "Sensör ve Ses: Hareket Alarmı"
ozet: "Bu derste sallanınca çalan, açılıp kapatılabilen bir hareket alarmı yapacaksın."
sure: 25
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo", "Pil yuvası (isteğe bağlı)"]
video: ""
ornek_kod: ""
test:
  - soru: "Alarm kapalıyken (`alarm = 0`) kart sallanırsa ne olur?"
    secenekler: ["Alarm çalar", "Hiçbir ses çıkmaz", "Program durur", "Alarm kendiliğinden açılır"]
    dogru: 1
    aciklama: "`if alarm = 1` koşulu yanlış olduğu için alarm blokları çalışmaz."
  - soru: "Bu projede eyleyiciler hangileridir?"
    secenekler: ["Işık sensörü ve pusula", "Yalnızca işlemci", "İvmeölçer ve A düğmesi", "Hoparlör ve LED ekran"]
    dogru: 3
    aciklama: "Hoparlör ses, LED ekran ışık üretir; ikisi de eyleyicidir."
  - soru: "Alarm sesinin 3 kez tekrarlanmasını hangi blok sağlar?"
    secenekler: ["`repeat 3 times`", "`pause (ms)`", "`on shake`", "`forever`"]
    dogru: 0
    aciklama: "Tekrar sayısı belli olduğu için sayılı döngü kullanılır."
---

Biri çantana dokunduğunda öten bir alarm yapabilir misin?

Bu projede bir sensör, bir karar ve iki eyleyici birlikte çalışacak (Hatırla: Robotik Kodlamaya Giriş, Hepsi Bir Arada dersi):

- **Sensör:** İvmeölçer, kartın sallandığını algılar.
- **Karar:** Alarm kurulu mu?
- **Eyleyiciler:** Hoparlör alarm sesi çalar, LED ekran kızgın yüz gösterir.

Alarmı açıp kapatmak için **alarm** adlı bir değişken kullanacağız. 1 ise alarm kurulu, 0 ise kapalı.

```
on button A pressed
    set alarm to 1
    show icon (tik işareti)
on button B pressed
    set alarm to 0
    clear screen
on shake
    if alarm = 1 then
        repeat 3 times
            play tone High C for 1/2 beat
            play tone Middle C for 1/2 beat
        show icon (kızgın yüz)
```

A alarmı kurar, B kapatır. Kart sallanınca önce alarmın kurulu olup olmadığı kontrol edilir. Kuruluysa iki nota 3 kez sırayla çalar ve kızgın yüz çıkar.

Robot süpürgenin “şarjım bitti” uyarısı da aynı mantıkla çalışır: Bir sensör ölçer, işlemci karar verir, hoparlör uyarır.

![Sensör ve Ses: Hareket Alarmı — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/87fc1cde-41d6-4a5f-938d-52341df3e219.png)

> 💡 Sık yapılan hata: Alarm kurulmadan sallanınca ses çıkmaz ve programın bozuk olduğu sanılır. Önce A'ya basarak alarmı kurmalısın; yoksa `alarm = 1` koşulu yanlıştır.

### Dene!

![Sensör ve Ses: Hareket Alarmı — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/08575cba-008a-4bea-b8fa-404c8443d62b.png)

Programı karta yükle. Varsa pil yuvasını tak; böylece kartı serbestçe hareket ettirebilirsin.

| Durum | Ne oldu? |
|---|---|
| A'ya bastım, sonra kartı salladım | Alarm çaldı, kızgın yüz çıktı. |
| Kart açıldı, hiçbir şeye basmadan salladım | |
| B'ye bastım, sonra salladım | |
| A'ya bastım, kartı masada hiç kıpırdatmadım | |

**Meydan okuma — Işık theremini:** `forever` içine `play tone (light level + 200) for 1/4 beat` koy. Nota adı yerine bir sayı (frekans) yazabilirsin. Elini ekranın üstünde gezdir; ses nasıl değişiyor?

Şimdi giriş sorusuna dönelim. Evet, yapabilirsin. Kartı çantana koy ve alarmı kur. Biri çantayı oynatınca ivmeölçer bunu algılar ve alarm çalar.

### Bugün öğrendiklerin

- Bir proje sensör, karar ve eyleyiciyi birlikte kullanır.
- 0 ya da 1 olan bir değişken, alarmın açık mı kapalı mı olduğunu tutar.
- `play tone` bloğuna nota adı yerine bir frekans sayısı da yazılabilir.

### Blok sözlüğü — Modül 5

| Blok | Anlamı |
|---|---|
| `play sound … until done` | hazır sesi çal |
| `play melody … at tempo … (bpm)` | melodi çal |
| `play tone … for … beat` | notayı … vuruş çal |
| `set volume` | ses düzeyini ayarla |
| `set tempo to … (bpm)` | tempoyu ayarla |

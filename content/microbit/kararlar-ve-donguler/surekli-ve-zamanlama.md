---
kurs: microbit
modul: kararlar-ve-donguler
slug: surekli-ve-zamanlama
sira: 2
baslik: "Sürekli ve Zamanlama"
ozet: "Bu derste forever ve pause bloklarıyla durmadan çalışan bir trafik lambası yapacaksın."
sure: 20
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: ""
test:
  - soru: "2 saniye beklemek için `pause (ms)` bloğuna ne yazılır?"
    secenekler: ["2000", "20", "2", "200"]
    dogru: 0
    aciklama: "Süre milisaniyedir; 1 saniye 1000 ms olduğundan 2 saniye 2000 ms'dir."
  - soru: "Trafik lambası programını neden `forever` içine koyduk?"
    secenekler: ["Yalnızca bir kez çalışması için", "Durmadan tekrar etmesi için", "Daha az pil harcaması için", "Düğmeye basılınca çalışması için"]
    dogru: 1
    aciklama: "`forever` bir sonsuz döngüdür; trafik lambası da durmadan çalışmalıdır."
  - soru: "`on start` içine konan bloklar ne zaman çalışır?"
    secenekler: ["Sürekli", "Hiçbir zaman", "A düğmesine basılınca", "Kart açılınca bir kez"]
    dogru: 3
    aciklama: "`on start`, kart açıldığında ya da program yüklendiğinde bir kez çalışır."
---

Trafik lambası kimse düğmeye basmadan nasıl sürekli renk değiştirir?

Trafik lambası bir **sonsuz döngüde** çalışır (Hatırla: Robotik Kodlamaya Giriş, Koşullu ve Sonsuz Döngü dersi). MakeCode'daki `forever` (sürekli) bloğu bir sonsuz döngüdür. İçindeki bloklar bitince en baştan tekrar başlar.

`on start` ile farkı şudur: `on start` içindekiler kart açılınca bir kez çalışır. `forever` içindekiler durmadan tekrar eder.

Lambanın her rengi belli bir süre yanar. Bunun için `pause (ms)` (bekle) bloğunu kullanırız. Süre **milisaniye** (ms) cinsindendir: 1000 ms = 1 saniye.

micro:bit'in LED'leri tek renklidir. Bu yüzden renkleri satırlarla göstereceğiz: üst satır kırmızı, orta satır sarı, alt satır yeşil. `show leds` bloğunda noktalara tıklayarak şu desenleri çiz (# yanan nokta, . sönük nokta):

```
Kırmızı      Sarı         Yeşil
# # # # #    . . . . .    . . . . .
. . . . .    . . . . .    . . . . .
. . . . .    # # # # #    . . . . .
. . . . .    . . . . .    . . . . .
. . . . .    . . . . .    # # # # #
```

Program:

```
forever
    show leds (kırmızı deseni)
    pause (ms) 3000
    show leds (yeşil deseni)
    pause (ms) 3000
    show leds (sarı deseni)
    pause (ms) 1000
```

Lamba kırmızıdan yeşile, yeşilden sarıya, sarıdan tekrar kırmızıya geçer. `forever` bunu durmadan tekrarlar.

![Sürekli ve Zamanlama — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/0426c429-3e35-4930-bdfe-2f6207f866a6.png)

> 💡 Sık yapılan hata: `pause` bloğuna saniye yazılır. 3 saniye beklemek için 3 değil, 3000 yazılmalıdır. 3 yazarsan kart yalnızca 3 milisaniye bekler.

### Dene!

![Sürekli ve Zamanlama — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/e7a13c59-0705-42b9-bb38-c377a7e3ffc5.png)

Her ışığın ne kadar süre yanacağına karar ver ve programını buna göre ayarla.

| Işık | Süre (saniye) | `pause` değeri (ms) |
|---|---|---|
| Kırmızı | 3 | 3000 |
| Yeşil | | |
| Sarı | | |

Okul yolundaki bir trafik lambasını gözlemle. Sarı ışık, kırmızı ve yeşilden daha mı kısa yanıyor?

Şimdi giriş sorusuna dönelim. Trafik lambası bir sonsuz döngüde çalışır. Her renk belli bir süre yanar ve sıra durmadan tekrar eder.

### Bugün öğrendiklerin

- `forever` bloğu, içindekileri durmadan tekrarlar.
- `on start` içindekiler yalnızca bir kez çalışır.
- `pause (ms)` süresi milisaniyedir: 1000 ms = 1 saniye.

---
kurs: microbit
modul: sensorler
slug: sicaklik-olcer
sira: 1
baslik: "Sıcaklık Sensörü"
ozet: "Bu derste sıcaklığı ölçecek ve sıcaklığa göre mesaj veren bir termometre yapacaksın."
sure: 20
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo", "Varsa bir termometre (karşılaştırma için)"]
video: ""
ornek_kod: ""
test:
  - soru: "micro:bit'in sıcaklık sensörü nerededir?"
    secenekler: ["USB girişinde", "A düğmesinde", "LED ekranın üstünde ayrı bir parça olarak", "İşlemcinin içinde"]
    dogru: 3
    aciklama: "Sıcaklık, işlemcinin içindeki bir sensörle ölçülür."
  - soru: "Sıcaklık 22 °C ise dersteki termometre programı ne gösterir?"
    secenekler: ["SOGUK", "Gülen yüz", "SICAK", "22"]
    dogru: 1
    aciklama: "22 < 18 yanlış, 22 < 26 doğrudur; ikinci koşulun işi olan gülen yüz gösterilir."
  - soru: "Kart uzun süre çalıştıktan sonra ölçüm odanın sıcaklığından 3 derece yüksek çıktı. Neden?"
    secenekler: ["İşlemci çalışırken ısınır ve sensör onun içindedir", "Pil fazla doludur", "Oda birden ısınmıştır", "Sensör bozulmuştur"]
    dogru: 0
    aciklama: "Sensör işlemcinin içinde olduğu için işlemcinin ısınması ölçümü biraz artırabilir."
---

Sınıf bugün üşütüyor mu, yoksa çok mu sıcak? micro:bit bunu bize söyleyebilir mi?

`Input` kategorisindeki `temperature (°C)` (sıcaklık) bloğu, sıcaklığı santigrat derece olarak verir. Bu sensör ayrı bir parça değildir; **işlemcinin içindedir**.

**1. Adım — Ölç.** Şu programla sıcaklığı her saniye göster:

```
forever
    show number temperature (°C)
    pause (ms) 1000
```

Simülatörde kartın yanında beliren sıcaklık ayarını değiştirerek dene.

**2. Adım — Mesaj ver.** Soğuk, ılık ve sıcak için üç yollu bir karar kur (Hatırla: Robotik Kodlamaya Giriş, Modül 7 — Birden Çok Koşul). Önce **sicaklik** adlı bir değişken oluştur. `if` bloğunun altındaki **+** işaretine basarak `else if` (değilse eğer) kısmı ekleyebilirsin.

```
forever
    set sicaklik to temperature (°C)
    if sicaklik < 18 then
        show string "SOGUK"
    else if sicaklik < 26 then
        show icon (gülen yüz)
    else
        show string "SICAK"
    pause (ms) 1000
```

Koşullar sırayla kontrol edilir. İlk doğru koşulun işi yapılır, gerisi atlanır.

![Sıcaklık Sensörü — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/0cf9ff73-1a9b-4c52-a425-cb1cde85d6d7.png)

> 💡 Dikkat: Sıcaklık sensörü işlemcinin içindedir. Kart uzun süre çalışınca işlemci ısınır. Bu yüzden ölçüm, oda sıcaklığından birkaç derece yüksek çıkabilir.

### Dene!

![Sıcaklık Sensörü — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/f7f7af1c-528a-43da-a7c2-25ed7315362a.png)

Farklı yerlerde sıcaklığı ölç. Bir termometren varsa onunla karşılaştır. İlk satır yalnızca bir örnektir.

| Ortam | micro:bit (°C) | Termometre (°C) |
|---|---|---|
| Örnek: Sınıf, sıranın üstü | 24 | 23 |
| Pencere önü | | |
| Kartı avucumda 1 dakika tuttum | | |
| Kalorifer yanında (dokunmadan) | | |

Ölçümler arasında fark çıktıysa nedenini yaz.

Şimdi giriş sorusuna dönelim. Evet, söyleyebilir. Kart sıcaklığı ölçer ve üç yollu bir kararla “SOGUK”, gülen yüz ya da “SICAK” gösterir.

### Bugün öğrendiklerin

- `temperature (°C)` sıcaklığı santigrat derece olarak verir.
- Sıcaklık sensörü işlemcinin içindedir; ölçüm biraz yüksek çıkabilir.
- `else if` ile üç ya da daha fazla yollu kararlar kurulur.

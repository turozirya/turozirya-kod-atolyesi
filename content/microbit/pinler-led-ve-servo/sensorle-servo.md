---
kurs: microbit
modul: pinler-led-ve-servo
slug: sensorle-servo
sira: 3
baslik: "Sensörle Servo: Otomatik Bariyer"
ozet: "Bu derste butonla ve ışık sensörüyle açılan otomatik bir bariyer yapacaksın."
sure: 25
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo", "1 servo motor", "3 krokodil kablo", "3 erkek-erkek jumper kablo", "1 dondurma çubuğu", "Bant"]
video: ""
ornek_kod: ""
test:
  - soru: "Bariyer sisteminde servo motor hangi parçadır?"
    secenekler: ["Eyleyici", "Güç kaynağı", "Sensör", "İşlemci"]
    dogru: 0
    aciklama: "Servo, işlemcinin kararını harekete çevirir; bu yüzden eyleyicidir."
  - soru: "`light level < 30` koşulu doğru olunca ne olur?"
    secenekler: ["LED yanar", "Hiçbir şey olmaz", "Bariyer açılır, 3 saniye sonra kapanır", "Bariyer kapanır"]
    dogru: 2
    aciklama: "Koşul doğruysa servo 90 dereceye gider, 3 saniye bekler ve 0'a döner."
  - soru: "Bariyer sınıfta sürekli açılıp kapanıyor. En olası neden nedir?"
    secenekler: ["A düğmesi bozuk", "Eşik değeri sınıfın ışık seviyesinden büyük seçilmiş", "Servo ters takılmış", "Bekleme süresi kısa"]
    dogru: 1
    aciklama: "Sınıfın ışığı eşikten küçükse koşul hep doğru olur ve bariyer durmadan açılır."
---

Otoparkların girişindeki bariyer, araba gelince kendiliğinden kalkar. Böyle bir bariyer yapabilir miyiz?

Bu proje bir otomatik sistemdir ve üç parçası vardır (Hatırla: Robotik Kodlamaya Giriş, Hepsi Bir Arada dersi):

- **Sensörler:** A düğmesi ve ışık sensörü (LED ekran).
- **İşlemci:** micro:bit karar verir.
- **Eyleyici:** Servo motor bariyeri kaldırır.

**Düzenek.** Servoyu önceki dersteki gibi bağla. Servo koluna bir dondurma çubuğunu bantla yapıştır; bu senin bariyerin. Kartı, ekranı yukarı bakacak şekilde bariyerin yanına koy.

![Sensörle Servo: Otomatik Bariyer — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/c121780d-02d8-4d8b-a3d7-d406a3bebe04.png)

**Program.** Bariyer iki şekilde açılır: A'ya basınca ya da ekranın üstü kapanınca. Ekranın üstünden geçen bir araba ışığı keser; biz bunu elimizle yapacağız.

```
on start
    servo write pin P0 to 0
on button A pressed
    servo write pin P0 to 90
    pause (ms) 3000
    servo write pin P0 to 0
forever
    if light level < 30 then
        servo write pin P0 to 90
        pause (ms) 3000
        servo write pin P0 to 0
```

0 derece bariyerin kapalı, 90 derece açık olduğu konumdur. Senin düzeneğinde ters olabilir; açıları buna göre değiştir.

> 💡 Dikkat: Eşik değerini sınıfının ışığına göre seç (Hatırla: Işık Sensörü dersi). Önce ekran açıkken ve kapalıyken ışık seviyesini ölç. Eşik bu iki değerin arasında olmalı.

### Dene!

![Sensörle Servo: Otomatik Bariyer — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/b8e73a94-8977-47ff-b2e5-cba37c571ccd.png)

Bariyerini kur ve dene.

| Durum | Bariyere ne oldu? |
|---|---|
| A'ya bastım | Açıldı, 3 saniye sonra kapandı. |
| Elimle ekranın üstünü kapattım | |
| Hiçbir şey yapmadım | |
| Elimi ekranın üstünde 10 saniye tuttum | |

**Meydan okuma:** Bariyer açıkken hoparlörden kısa bir uyarı sesi çalsın.

Şimdi giriş sorusuna dönelim. Evet, yapabiliriz. Işık sensörü ekranın üstünün kapandığını algılar, micro:bit karar verir ve servo bariyeri kaldırır.

### Bugün öğrendiklerin

- Sensör, işlemci ve eyleyici birlikte otomatik bir sistem oluşturur.
- Servo motor, bir sensöre göre hareket ettirilebilir.
- Eşik değeri, ortamın ölçülmesiyle seçilir.

### Blok sözlüğü — Modül 7

| Blok | Anlamı |
|---|---|
| `digital write pin P0 to …` | P0'a dijital değer yaz (0 ya da 1) |
| `analog write pin P0 to …` | P0'a analog değer yaz (0–1023) |
| `servo write pin P0 to …` | P0'daki servoyu … dereceye getir |

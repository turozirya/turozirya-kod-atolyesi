---
kurs: microbit
modul: pinler-led-ve-servo
slug: servo-motor
sira: 2
baslik: "Servo Motor"
ozet: "Bu derste bir servo motoru bağlayacak ve istediğin açıya döndüreceksin."
sure: 25
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo", "1 servo motor", "3 krokodil kablo", "3 erkek-erkek jumper kablo", "Kâğıt açıölçer (isteğe bağlı)"]
video: ""
ornek_kod: ""
test:
  - soru: "`servo write pin P0 to 90` ne yapar?"
    secenekler: ["Servoyu 90 saniye çalıştırır", "Servo kolunu 90 derecelik konuma getirir", "Servoyu durdurur", "Servoyu 90 kez döndürür"]
    dogru: 1
    aciklama: "Servo, verilen açıya gider ve orada durur."
  - soru: "Servonun turuncu (ya da sarı) kablosu nereye bağlanır?"
    secenekler: ["Hiçbir yere", "3V'a", "Sinyal pini olarak P0'a", "GND'ye"]
    dogru: 2
    aciklama: "Turuncu ya da sarı kablo sinyal kablosudur; açı bilgisi bu kablodan gider."
  - soru: "Servo motor ile tekerlek motoru arasındaki fark nedir?"
    secenekler: ["Servo belirli bir açıya gidip durur, tekerlek motoru sürekli döner", "Servo ışık verir", "Servo ses çıkarır", "Aralarında fark yoktur"]
    dogru: 0
    aciklama: "Servo konum kontrolü yapar; tekerlek motoru ise döndükçe döner."
---

Bir robot kol, bir parçayı tam doğru açıda nasıl tutar?

**Servo motor**, kolunu istediğin açıya döndüren bir eyleyicidir (Hatırla: Robotik Kodlamaya Giriş, Eyleyiciler dersi). Çoğu servo 0 ile 180 derece arasında döner. Verdiğin açıya gider ve orada durur.

**Servonun üç kablosu vardır:**

| Kablo rengi | Görevi | micro:bit'te nereye? |
|---|---|---|
| Kahverengi ya da siyah | Eksi (−) | GND |
| Kırmızı | Artı (+), güç | 3V |
| Turuncu ya da sarı | Sinyal (açı bilgisi) | P0 |

Servonun kablo ucu bir fişe takılı olduğu için krokodil kablo doğrudan tutunamaz. Fişin her deliğine birer **erkek-erkek jumper kablo** tak. Krokodilleri bu kabloların uçlarına bağla.

![Servo Motor — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/acb6ad72-fd76-4db1-9e9e-91c735601aaf.png)

**Program.** `Pins` kategorisindeki `servo write pin P0 to 90` (P0'daki servoyu 90 dereceye getir) bloğu kullanılır.

Sallanan bayrak programı:

```
forever
    servo write pin P0 to 45
    pause (ms) 500
    servo write pin P0 to 135
    pause (ms) 500
on button A pressed
    servo write pin P0 to 0
on button B pressed
    servo write pin P0 to 180
```

Servo kolunun ucuna kâğıttan küçük bir bayrak yapıştır.

> 💡 Dikkat: Servo motor sürekli dönen bir motor değildir. Verdiğin açıya gider ve orada durur. Servo zayıf dönüyor ya da titriyorsa öğretmenine haber ver; bazı servolar micro:bit'in 3 voltunda zorlanır.

### Dene!

![Servo Motor — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/748d420b-1e2a-4660-8d41-9f72ead47538.png)

Servonun önüne kâğıttan bir açıölçer koy. `forever` bloğunu geçici olarak kaldır ve açıları tek tek dene.

| Komut | Servo kolunun yeri |
|---|---|
| `servo write pin P0 to 90` | Ortada |
| `servo write pin P0 to 0` | |
| `servo write pin P0 to 180` | |
| `servo write pin P0 to 45` | |

Şimdi giriş sorusuna dönelim. Robot kollarda servo motorlar kullanılır. Program her servoya bir açı söyler, servo o açıya gidip durur.

### Bugün öğrendiklerin

- Servo motor kolunu 0 ile 180 derece arasında istenen açıya döndürür.
- Servonun kabloları GND, 3V ve sinyal (P0) pinlerine bağlanır.
- `servo write` bloğu servoya hangi açıya gideceğini söyler.

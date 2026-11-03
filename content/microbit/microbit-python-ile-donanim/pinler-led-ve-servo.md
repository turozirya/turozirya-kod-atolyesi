---
kurs: microbit
modul: microbit-python-ile-donanim
slug: pinler-led-ve-servo
sira: 4
baslik: "Pinler, LED ve Servo"
ozet: "Bu derste harici LED'i ve servo motoru Python ile yönetecek, otomatik bariyerin Python sürümünü yazacaksın."
sure: 25
puan: 10
kod_dili: micropython
arac_linki: "https://python.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo", "1 LED", "1 servo motor", "3 krokodil kablo", "3 erkek-erkek jumper kablo", "1 dondurma çubuğu ve bant"]
video: ""
ornek_kod: |
  from microbit import *

  # Servo için sinyal aralığı 20 ms olmalı
  pin0.set_analog_period(20)
  # 0–180 dereceyi servonun anlayacağı değere çevir
  def servo_aci(aci):
      pin0.write_analog(26 + aci * 102 // 180)
  # Bariyeri aç, 3 saniye bekle, kapat
  def bariyer_ac():
      servo_aci(90)
      sleep(3000)
      servo_aci(0)

  servo_aci(0)
  while True:
      if button_a.was_pressed() or display.read_light_level() < 30:
          bariyer_ac()
test:
  - soru: "P0'a bağlı LED'i tamamen yakan satır hangisidir?"
    secenekler: ["pin0.write_analog(1)", "pin0.write_digital(0)", "pin0.write_digital(1)", "pin0.is_touched()"]
    dogru: 2
    aciklama: "write_digital(1) pini açar; analog yazmada 1 çok küçük bir değerdir ve LED neredeyse hiç yanmaz."
  - soru: "Örnek kodda `servo_aci(90)` çağrılınca servo kolu ne yapar?"
    secenekler: ["90 derecelik konuma gider ve orada durur", "Durmadan döner", "90 kez döner", "Hiç hareket etmez"]
    dogru: 0
    aciklama: "Fonksiyon 90 dereceyi servonun anlayacağı değere çevirir; servo o açıya gider ve durur."
  - soru: "Örnek kodda bariyer hangi durumda açılır?"
    secenekler: ["Yalnızca A'ya basılınca", "Yalnızca ekranın üstü kapanınca", "Kart sallanınca", "A'ya basılınca ya da ışık seviyesi 30'un altına düşünce"]
    dogru: 3
    aciklama: "İki koşul `or` ile bağlıdır; ikisinden biri doğruysa bariyer açılır."
---

Otomatik bariyeri bloklarla yapmıştın. Python'da servo motora açıyı nasıl söyleriz?

Pinler, kartı dış dünyadaki parçalara bağlar (Hatırla: Modül 7 — Pinler, LED ve Servo). Python'da P0 pinine `pin0` adıyla ulaşırız. Devreler bloklarla yaptığın devrelerin aynısıdır; yalnızca kod değişir.

**LED.** Uzun bacak P0'a, kısa bacak GND'ye bağlıdır. İki komut vardır:

| Python | Blok karşılığı | Ne yapar? |
|---|---|---|
| `pin0.write_digital(1)` | `digital write pin P0 to 1` | Pini açar; LED yanar |
| `pin0.write_digital(0)` | `digital write pin P0 to 0` | Pini kapatır; LED söner |
| `pin0.write_analog(512)` | `analog write pin P0 to 512` | LED yarı parlak yanar (0–1023) |

**Servo.** Kahverengi kablo GND'ye, kırmızı 3V'a, turuncu P0'a bağlıdır.

![Servo Motor — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/acb6ad72-fd76-4db1-9e9e-91c735601aaf.png)

MicroPython'da bloklardaki gibi hazır bir servo komutu yoktur. Servo, pinden gelen kısa sinyallerin uzunluğuna bakarak açısını seçer. Bu yüzden önce `pin0.set_analog_period(20)` yazılır. Sonra `write_analog` ile açıya uygun bir değer gönderilir: yaklaşık 26 → 0 derece, 77 → 90 derece, 128 → 180 derece.

Bu hesabı her seferinde yapmak zordur. Bu yüzden örnek kodda bir fonksiyon yazdık (Hatırla: Fonksiyonlar dersi). `servo_aci(90)` yazınca fonksiyon 90'ı doğru değere çevirir. `//` işareti bölmenin tam sayı kısmını verir.

**Bariyer.** Örnek kod kutusundaki program, otomatik bariyerin Python sürümüdür (Hatırla: Modül 7 — Sensörle Servo: Bariyer). A'ya basınca ya da ekranın üstü kapanınca bariyer 3 saniye açılır. `bariyer_ac` fonksiyonu sayesinde aynı üç satırı iki kez yazmadık.

![Pinler, LED ve Servo — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/a112fafe-96e9-4448-9236-e77c059a29e6.png)

> 💡 Dikkat: Her servo biraz farklıdır. Kol 0 ya da 180 dereceye tam gitmiyorsa fonksiyondaki 26 ve 128 sayılarını biraz değiştir. Servo titriyorsa ya da zorlanıyorsa öğretmenine haber ver.

### Dene!

![Pinler, LED ve Servo — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/80d3375f-757f-46c2-9281-b399e8757b10.png)

**1. Bölüm — LED.** LED'i P0 ile GND arasına bağla. Her satırı `from microbit import *` satırının altına tek başına yazıp dene.

| Kod | LED'e ne oldu? |
|---|---|
| `pin0.write_digital(1)` | Tamamen yandı. |
| `pin0.write_digital(0)` | |
| `pin0.write_analog(100)` | |
| `pin0.write_analog(1023)` | |

**2. Bölüm — Bariyer.** LED'i çıkar, servoyu bağla. Örnek kodu karta yükle ve dene: A'ya bas, sonra ekranın üstünü elinle kapat. Bariyer açılıp kapanıyor mu? Açılar ters çalışıyorsa 0 ile 90'ı değiştir.

**Meydan okuma:** Bariyer açılırken kısa bir uyarı sesi çalsın. İpucu: `import music` ve `music.play(music.BA_DING, pin=None)`. `music.play` normalde P0'a da ses sinyali gönderir. `pin=None` yazınca ses yalnızca hoparlörden çıkar ve servo şaşırmaz.

Şimdi giriş sorusuna dönelim. Python'da servoya açıyı `write_analog` ile bir sayı göndererek söyleriz. `servo_aci` fonksiyonu derece değerini bu sayıya çevirir.

### Bugün öğrendiklerin

- P0 pinine Python'da `pin0` ile ulaşılır; `write_digital` açar-kapatır, `write_analog` parlaklık verir.
- Servo için `set_analog_period(20)` yazılır ve açı `write_analog` ile bir sayıya çevrilerek gönderilir.
- Fonksiyonlar, donanım kodunu kısa ve okunur yapar.

### Kod sözlüğü — Modül 11

| Kod | Anlamı |
|---|---|
| `temperature()` | sıcaklık (°C) |
| `display.read_light_level()` | ışık seviyesi (0–255) |
| `button_a.is_pressed()` | A şu anda basılı mı? |
| `button_a.was_pressed()` | A son kontrolden beri basıldı mı? |
| `pin_logo.is_touched()` | logoya dokunuluyor mu? |
| `accelerometer.was_gesture("shake")` | kart sallandı mı? |
| `accelerometer.get_x()` | sağa-sola eğim |
| `import random` / `random.randint(1, 6)` | rastgele sayı |
| `import music` / `music.play(liste)` | melodi çal |
| `set_volume(120)` | ses düzeyi (0–255) |
| `microphone.sound_level()` | ses seviyesi (0–255) |
| `import radio` / `radio.on()` | radyoyu aç |
| `radio.config(group=7)` | radyo grubunu seç |
| `radio.send("…")` / `radio.receive()` | mesaj gönder / al |
| `pin0.write_digital(1)` | P0'ı aç |
| `pin0.write_analog(512)` | P0'a 0–1023 arası değer yaz |
| `pin0.set_analog_period(20)` | servo için sinyal aralığını ayarla |

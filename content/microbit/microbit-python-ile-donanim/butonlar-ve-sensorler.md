---
kurs: microbit
modul: microbit-python-ile-donanim
slug: butonlar-ve-sensorler
sira: 0
baslik: "Butonlar ve Sensörler"
ozet: "Bu derste butonları, ışık ve sıcaklık sensörünü Python ile okuyacak ve bir ölçüm istasyonu yapacaksın."
sure: 25
puan: 10
kod_dili: micropython
arac_linki: "https://python.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: |
  from microbit import *

  while True:
      # A: sıcaklığı göster
      if button_a.was_pressed():
          display.scroll(str(temperature()) + "C")
      # B: ışık seviyesini göster
      if button_b.was_pressed():
          display.scroll(display.read_light_level())
      # Logoya dokunuluyorsa kalp göster
      if pin_logo.is_touched():
          display.show(Image.HEART)
      else:
          display.clear()
test:
  - soru: "`button_a.is_pressed()` ile `button_a.was_pressed()` arasındaki fark nedir?"
    secenekler: ["İkisi tamamen aynıdır", "is_pressed B düğmesini, was_pressed A düğmesini okur", "is_pressed yalnızca kart açılırken çalışır", "is_pressed şu anda basılı mı diye, was_pressed son kontrolden beri basıldı mı diye bakar"]
    dogru: 3
    aciklama: "was_pressed basışı hatırlar; is_pressed yalnızca o anki duruma bakar."
  - soru: "`display.read_light_level()` hangi aralıkta bir sayı verir?"
    secenekler: ["0–9", "0–255", "0–1023", "-100–100"]
    dogru: 1
    aciklama: "Işık seviyesi MakeCode'daki light level gibi 0 ile 255 arasındadır."
  - soru: "Sıcaklık 23 ise örnek kodda A'ya basınca ekranda ne kayar?"
    secenekler: ["23C", "23", "C23", "Hata verir"]
    dogru: 0
    aciklama: "temperature() 23 verir, str() ile metne çevrilir ve sonuna \"C\" eklenir."
---

Bloklarda sensör değerleri yuvarlak bloklardı. Python'da bu değerleri nasıl okuruz?

Sensörleri Modül 4'te bloklarla kullandın (Hatırla: Modül 4 — Sensörler). Python'da her sensörün bir okuma komutu vardır. Bu komutlar bir değer **geri verir**. Değeri bir değişkende tutabilir, bir koşulda kullanabilir ya da ekranda gösterebilirsin.

| Ne okunur? | Python komutu | Verdiği değer |
|---|---|---|
| Sıcaklık | `temperature()` | santigrat derece, örneğin 23 |
| Işık seviyesi | `display.read_light_level()` | 0–255 |
| A düğmesi | `button_a.is_pressed()` | `True` ya da `False` |
| A düğmesi | `button_a.was_pressed()` | `True` ya da `False` |
| Logo | `pin_logo.is_touched()` | `True` ya da `False` |

Işık seviyesini yine LED ekran ölçer; bu yüzden komut `display` ile başlar (Hatırla: Modül 4 — Işık Sensörü).

**Düğmeyi okumanın iki yolu.** MakeCode'da `on button A pressed` bir olaydı. Python'da düğmeyi döngünün içinde biz kontrol ederiz:

- `button_a.is_pressed()` “Şu anda basılı mı?” diye sorar. Parmağın düğmedeyken `True` olur.
- `button_a.was_pressed()` “Son sorduğumdan beri basıldı mı?” diye sorar. Kısa bir basışı bile hatırlar. Sonra kendini sıfırlar.

Bir kapı ziline benzetebiliriz. `is_pressed` zile o anda basılıyor mu diye bakar. `was_pressed` ise “Ben yokken zil çaldı mı?” diye sorar.

Örnek kod kutusundaki program bir **ölçüm istasyonudur**. A sıcaklığı, B ışık seviyesini gösterir. Logoya dokunduğun sürece kalp görünür.

> 💡 Dikkat: Ekranda yazı kayarken program o satırda bekler. Bu sırada `is_pressed` ile yapılan kontroller basışı kaçırabilir. Bir basışı kaçırmak istemiyorsan `was_pressed` kullan.

### Dene!

**1. Bölüm.** Aşağıdaki iki programı ayrı ayrı dene. A'yı önce basılı tut, sonra kısa kısa bas.

```python
# Program 1
while True:
    if button_a.was_pressed():
        display.show(Image.HAPPY)
        sleep(300)
        display.clear()
```

```python
# Program 2: was_pressed yerine is_pressed
while True:
    if button_a.is_pressed():
        display.show(Image.HAPPY)
        sleep(300)
        display.clear()
```

| Program | A'yı basılı tutunca ne oldu? | A'ya kısa basınca ne oldu? |
|---|---|---|
| Program 1 (`was_pressed`) | Yüz bir kez göründü. | |
| Program 2 (`is_pressed`) | | |

İki programın başına `from microbit import *` yazmayı unutma.

**2. Bölüm.** Gece lambasının Python sürümünü yaz: Işık seviyesi 40'tan azsa bütün LED'ler yansın, değilse ekran temizlensin. İpucu: Bütün LED'lerin yandığı görüntü `Image("99999:99999:99999:99999:99999")` olarak yazılır.

Şimdi giriş sorusuna dönelim. Python'da sensörler birer komutla okunur. `temperature()` ya da `display.read_light_level()` gibi komutlar bir değer geri verir.

### Bugün öğrendiklerin

- Sensör komutları bir değer geri verir; bu değer değişkende ya da koşulda kullanılır.
- `is_pressed` düğmenin şu anki durumuna, `was_pressed` son kontrolden beri basılıp basılmadığına bakar.
- Python'da düğmeler döngünün içinde sürekli kontrol edilir.

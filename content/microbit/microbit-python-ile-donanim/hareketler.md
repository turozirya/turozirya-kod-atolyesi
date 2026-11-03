---
kurs: microbit
modul: microbit-python-ile-donanim
slug: hareketler
sira: 1
baslik: "Hareketler"
ozet: "Bu derste ivmeölçerin algıladığı hareketleri Python ile okuyacak ve bir Python zarı yapacaksın."
sure: 25
puan: 10
kod_dili: micropython
arac_linki: "https://python.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo", "Varsa pil yuvası"]
video: ""
ornek_kod: |
  from microbit import *
  # Rastgele sayı komutları için gerekli
  import random

  while True:
      # Kart sallandıysa zar at
      if accelerometer.was_gesture("shake"):
          zar = random.randint(1, 6)
          display.show(zar)
      # Ekran aşağı bakıyorsa ekranı temizle
      if accelerometer.is_gesture("face down"):
          display.clear()
test:
  - soru: "`random.randint(1, 6)` hangi sayıları verebilir?"
    secenekler: ["Yalnızca 1 ve 6", "1, 2, 3, 4, 5 ve 6", "0'dan 6'ya kadar", "1'den 5'e kadar"]
    dogru: 1
    aciklama: "randint'te iki sınır da dahildir; 1 de 6 da gelebilir."
  - soru: "Kartın sola yatırıldığını hangi satır yakalar?"
    secenekler: ["accelerometer.is_gesture(\"up\")", "accelerometer.is_gesture(\"face up\")", "accelerometer.is_gesture(\"left\")", "button_a.is_pressed()"]
    dogru: 2
    aciklama: "Sola yatma hareketinin adı \"left\"tir; MakeCode'daki tilt left bloğunun karşılığıdır."
  - soru: "Örnek kodun başındaki `import random` satırı silinirse ne olur?"
    secenekler: ["random tanınmaz ve kart sallanınca NameError çıkar", "Zar hep 6 gelir", "Program daha hızlı çalışır", "Kart sallanınca yalnızca ekran temizlenir"]
    dogru: 0
    aciklama: "random kütüphanesi getirilmezse random.randint komutu tanınmaz ve NameError oluşur."
---

Zar programını bloklarla yapmıştın. Python'da kartın sallandığını nasıl anlarız?

Kartın arkasındaki **ivmeölçer** hareketi ve eğimi ölçer (Hatırla: Modül 4 — İvmeölçer ve Hareketler). Python'da ona `accelerometer` adıyla ulaşırız. Bloklarda `on shake` bir olaydı. Python'da hareketi de döngünün içinde kontrol ederiz.

**Hareketlerin adları.** Her hareketin İngilizce bir adı vardır. Ad tırnak içinde yazılır:

| Hareket | Python'daki adı | Blok karşılığı |
|---|---|---|
| Sallama | `"shake"` | `shake` |
| Sola / sağa yatırma | `"left"` / `"right"` | `tilt left` / `tilt right` |
| Logo yukarı / aşağı | `"up"` / `"down"` | `logo up` / `logo down` |
| Ekran yukarı / aşağı | `"face up"` / `"face down"` | `screen up` / `screen down` |

Hareketi okumanın üç yolu vardır:

- `accelerometer.was_gesture("shake")` → Son kontrolden beri kart sallandı mı?
- `accelerometer.is_gesture("face down")` → Kart şu anda ters mi duruyor?
- `accelerometer.current_gesture()` → Şu anki hareketin adını verir.

`was` ve `is` kelimelerini düğmelerden tanıyorsun (Hatırla: Butonlar ve Sensörler dersi). Mantık aynıdır.

**Rastgele sayı.** Python'da rastgele sayı için **random** kütüphanesi kullanılır. Bu kütüphane `from microbit import *` ile gelmez. Programın başına ayrıca `import random` yazılır. Sonra `random.randint(1, 6)` 1 ile 6 arasında bir sayı tutar. MakeCode'daki `pick random 1 to 6` bloğu gibi iki sınır da dahildir.

Örnek kod kutusundaki program Python zarıdır. Kart sallanınca bir sayı gösterir. Kartı ters çevirince ekran temizlenir. `display.show(zar)` tek basamaklı sayıyı kaydırmadan gösterir.

Eğimin sayısal değerini de okuyabilirsin: `accelerometer.get_x()`. Kart düzken 0'a yakındır; sağa yattıkça artar, sola yattıkça eksiye iner.

> 💡 Dikkat: Hareket adları küçük harfle ve tam doğru yazılmalıdır. `"Shake"` ya da `"faceup"` yazarsan Python bu adı tanımaz ve hata verir. Ekran yönleri için arada boşluk vardır: `"face up"`.

### Dene!

Hareketlerin adını kartın kendisine söylet. Şu programı karta yükle:

```python
from microbit import *
while True:
    # Şu anki hareketin adını kaydır
    display.scroll(accelerometer.current_gesture())
```

Kartı aşağıdaki gibi tut ve ekranda kayan adı yaz.

| Kartı nasıl tuttun? | Ekranda kayan ad |
|---|---|
| Masada düz, ekran yukarıda | face up |
| Sola yatırdım | |
| Logo yukarıda olacak şekilde dik tuttum | |
| Ters çevirdim, ekran masaya baktı | |
| Salladım | |

**Meydan okuma:** Zarı 20 yüzlü yap. İki basamaklı sayıları önce `display.show`, sonra `display.scroll` ile göster. Hangisi daha kolay okunuyor?

Şimdi giriş sorusuna dönelim. Python'da kartın sallandığını `accelerometer.was_gesture("shake")` satırıyla anlarız.

### Bugün öğrendiklerin

- İvmeölçere Python'da `accelerometer` adıyla ulaşılır.
- `was_gesture`, `is_gesture` ve `current_gesture` hareketleri okur; hareket adları tırnak içinde yazılır.
- Rastgele sayı için `import random` ve `random.randint(alt, üst)` kullanılır.

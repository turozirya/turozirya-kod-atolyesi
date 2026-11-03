---
kurs: microbit
modul: microbit-python-temelleri
slug: while-ve-for
sira: 2
baslik: "while ve for Döngüleri"
ozet: "Bu derste Python'da koşullu ve sayılı döngü yazacak, geri sayım ve ışık animasyonu yapacaksın."
sure: 25
puan: 10
kod_dili: micropython
arac_linki: "https://python.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: |
  from microbit import *

  # Koşullu döngü: 5'ten geriye say
  sayac = 5
  while sayac > 0:
      display.scroll(sayac)
      sayac = sayac - 1
  display.show(Image.YES)
  sleep(1000)
  display.clear()
  # Sayılı döngü: orta satırı soldan sağa yak
  for x in range(5):
      display.set_pixel(x, 2, 9)
      sleep(200)
test:
  - soru: "`for i in range(4):` döngüsünde i hangi değerleri alır?"
    secenekler: ["1, 2, 3, 4", "0, 1, 2, 3, 4", "0, 1, 2, 3", "4, 3, 2, 1"]
    dogru: 2
    aciklama: "range(4) 0'dan başlar ve 4'e gelmeden durur: 0, 1, 2, 3."
  - soru: "Örnek koddaki while döngüsünden `sayac = sayac - 1` satırı silinirse ne olur?"
    secenekler: ["Ekranda sürekli 5 kayar, döngü hiç bitmez", "5'ten 1'e sayar", "Program hiç çalışmaz", "Ekranda yalnızca tik görünür"]
    dogru: 0
    aciklama: "sayac hep 5 kalır, sayac > 0 koşulu hep doğru olur ve döngü sonsuza kadar sürer."
  - soru: "Örnek kodun son döngüsü bitince ekranda ne görünür?"
    secenekler: ["Tik işareti", "Sol sütundaki 5 LED yanar", "Boş ekran", "Orta satırdaki 5 LED yanar"]
    dogru: 3
    aciklama: "x 0'dan 4'e kadar değişir ve her turda (x, 2) noktası yanar; 2. satır ortadaki satırdır."
---

Roket geri sayımını bloklarla yapmıştın. Python'da bir işi tekrar ettirmek için kaç satır gerekir?

Döngüler iki türlüdür (Hatırla: Robotik Kodlamaya Giriş, Modül 8 — Döngüler; Modül 3 — Tekrarla ve Süresince):

- **while döngüsü:** Koşul doğru olduğu sürece tekrar eder. MakeCode'daki `while` bloğunun karşılığıdır.
- **for döngüsü:** Belli sayıda tekrar eder. MakeCode'daki `repeat` bloğunun karşılığıdır.

`while True:` satırını zaten tanıyorsun. `True` hep doğru olduğu için bu döngü hiç bitmez; `forever` gibidir.

**while ile geri sayım.** Örnek kod kutusunun ilk bölümüne bak. `sayac` 5'ten başlar. Her turda sayı gösterilir ve bir azalır. `sayac` 0 olunca koşul yanlış olur, döngü biter. Ardından girintisiz satırlar çalışır ve tik işareti görünür.

**for ile sayılı döngü.** `for x in range(5):` satırı döngüyü 5 kez çalıştırır. Her turda `x` değişkeni bir sonraki değeri alır: 0, 1, 2, 3, 4. `range(5)` bir sayı dizisi üretir. Dizi 0'dan başlar ve 5'e gelmeden durur.

Örnek kodun ikinci bölümünde `display.set_pixel(x, 2, 9)` kullanıldı. Bu komut (x, y) noktasındaki LED'i yakar. Üçüncü sayı parlaklıktır: 0 sönük, 9 en parlak. Döngü her turda bir sonraki LED'i yakar. Böylece orta satır soldan sağa dolar.

micro:bit ekranında x sağa doğru, y ise **aşağı doğru** artar (Hatırla: Modül 1 — Kendi Simgeni Çiz). Sol üst köşe (0, 0), sağ alt köşe (4, 4) noktasıdır.

`range` başka biçimlerde de yazılabilir. `range(1, 6)` 1'den 5'e kadar sayar. `range(0, 10, 2)` ise 0'dan başlar, ikişer artarak 8'e kadar sayar.

> 💡 Dikkat: `range(5)` içinde 5 yoktur. Dizi 0'dan başlar ve son sayıdan bir önce biter. 5 sayısını da istiyorsan `range(6)` ya da `range(1, 6)` yazmalısın.

### Dene!

Her döngüde değişkenin hangi değerleri aldığını ve döngünün kaç tur döndüğünü yaz. Emin olamazsan döngünün içine `display.scroll(i)` yazıp simülatörde izle.

| Kod | i hangi değerleri alır? | Kaç tur? |
|---|---|---|
| `for i in range(3):` | 0, 1, 2 | 3 |
| `for i in range(5):` | | |
| `for i in range(1, 6):` | | |
| `for i in range(0, 10, 2):` | | |

Sonra örnek kodu değiştir: Orta satır yerine orta sütun yukarıdan aşağı dolsun. İpucu: Bu sefer x sabit kalır, y değişir.

Şimdi giriş sorusuna dönelim. Birkaç satır yeter. `while` geri sayımı, `for` ise ışık animasyonunu tek bir döngüyle yapar.

### Bugün öğrendiklerin

- `while` döngüsü koşul doğru olduğu sürece tekrar eder.
- `for i in range(n):` döngüsü n kez tekrar eder; i 0'dan n−1'e kadar değer alır.
- `display.set_pixel(x, y, 9)` (x, y) noktasındaki LED'i en parlak yakar.

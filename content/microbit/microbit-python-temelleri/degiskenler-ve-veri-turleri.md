---
kurs: microbit
modul: microbit-python-temelleri
slug: degiskenler-ve-veri-turleri
sira: 0
baslik: "Değişkenler ve Veri Türleri"
ozet: "Bu derste Python'da değişken oluşturacak, dört veri türünü tanıyacak ve bir puan sayacı yazacaksın."
sure: 25
puan: 10
kod_dili: micropython
arac_linki: "https://python.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: |
  from microbit import *

  # Değişken: başlangıç değeri 0 (int)
  puan = 0
  while True:
      # A'ya basıldıysa puanı 1 artır ve göster
      if button_a.was_pressed():
          puan = puan + 1
          display.scroll(puan)
      # B'ye basıldıysa yazıyla birlikte göster
      if button_b.was_pressed():
          display.scroll("Puan: " + str(puan))
test:
  - soru: "`puan = puan + 1` satırı ne yapar?"
    secenekler: ["puan değişkenini 1 yapar", "puan ile 1'i karşılaştırır", "puan değişkeninin değerini 1 artırır", "Hata verir, çünkü puan iki kez yazılmış"]
    dogru: 2
    aciklama: "Önce sağ taraf hesaplanır (puan + 1), sonra sonuç yine puan değişkenine yazılır."
  - soru: "`display.scroll(\"7\" + \"2\")` ekranda ne gösterir?"
    secenekler: ["72", "9", "5", "Hata verir"]
    dogru: 0
    aciklama: "Tırnak içindeki 7 ve 2 metindir (str); metinler toplanınca yan yana eklenir."
  - soru: "Örnek kodda B'ye basıldığında neden `str(puan)` yazılmıştır?"
    secenekler: ["Puanı 1 artırmak için", "Puanı sıfırlamak için", "Ekranı temizlemek için", "Sayıyı metne çevirip \"Puan: \" yazısına ekleyebilmek için"]
    dogru: 3
    aciklama: "Python metinle sayıyı doğrudan toplayamaz; str() sayıyı metne çevirir."
---

Bir oyunda her golde skor tabelası değişir. Python bu değişen sayıyı nerede tutar?

Değişkeni etiketli bir kutu olarak öğrenmiştin (Hatırla: Robotik Kodlamaya Giriş, Modül 6 — Değişken: Etiketli Kutu). Python'da değişken oluşturmak çok kolaydır. Bir ad yaz, eşittir koy ve değeri yaz: `puan = 0`. Bu satır “puan adlı kutuya 0 koy” demektir. MakeCode'daki `Make a Variable...` adımına gerek yoktur.

**Değeri değiştirmek.** `puan = puan + 1` satırı önce sağ tarafı hesaplar, sonra sonucu kutuya geri koyar. Yani puan bir artar. Bu, `change puan by 1` bloğunun karşılığıdır.

**Dört veri türü** (Hatırla: Robotik Kodlamaya Giriş, Veri Türleri dersi):

| Tür | Python adı | Örnek |
|---|---|---|
| Tam sayı | `int` | `puan = 12` |
| Ondalıklı sayı | `float` | `ortalama = 3.5` |
| Metin | `str` | `isim = "Ali"` |
| Mantıksal | `bool` | `oyun_bitti = False` |

Metin her zaman tırnak içinde yazılır. Mantıksal değerler yalnızca `True` ve `False` olabilir; ilk harfleri büyüktür. Python'da `7 / 2` işleminin sonucu `3.5` olur, yani bölme sonucu ondalıklıdır.

**Değişken adı kuralları:** Ad boşluk içermez; bunun yerine alt çizgi kullanılır: `en_yuksek_puan`. Rakamla başlamaz. Türkçe harf (ş, ğ, ı) kullanmamak daha güvenlidir. Python büyük ve küçük harfi farklı görür: `Puan` ile `puan` iki ayrı değişkendir.

Örnek kod kutusundaki program bir puan sayacıdır. A'ya basınca puan artar ve gösterilir. B'ye basınca “Puan: 3” gibi bir yazı kayar. `if` satırlarını bir sonraki derste ayrıntılı göreceksin.

> 💡 Sık yapılan hata: `"Puan: " + puan` yazılır ve `TypeError` hatası çıkar. Python metinle sayıyı doğrudan toplayamaz. Sayıyı önce `str(puan)` ile metne çevirmelisin.

### Dene!

Her satırı editörde `display.scroll(...)` içine yazarak dene. Sonucun türünü ve ekranda ne göründüğünü yaz.

| Kod | Sonucun türü | Ekranda ne görünür? |
|---|---|---|
| `display.scroll(12)` | int | 12 |
| `display.scroll(7 + 2)` | | |
| `display.scroll(7 / 2)` | | |
| `display.scroll("7" + "2")` | | |
| `display.scroll(7 > 2)` | | |

Sonra örnek koddaki puan sayacını karta yükle ve dene. **Meydan okuma:** Logoya dokununca puanı sıfırlayan bir bölüm ekle. İpucu: `if pin_logo.is_touched():`

Şimdi giriş sorusuna dönelim. Python değişen sayıyı bir değişkende tutar. `puan = puan + 1` her golde değeri bir artırır.

### Bugün öğrendiklerin

- Python'da değişken `ad = değer` biçiminde oluşturulur.
- Dört temel veri türü vardır: int, float, str ve bool.
- Metinle sayıyı birleştirmek için sayı `str()` ile metne çevrilir.

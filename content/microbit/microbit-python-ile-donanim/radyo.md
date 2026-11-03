---
kurs: microbit
modul: microbit-python-ile-donanim
slug: radyo
sira: 3
baslik: "Radyo ile Mesajlaşma"
ozet: "Bu derste radio kütüphanesiyle iki micro:bit arasında Python ile mesaj gönderip alacaksın."
sure: 25
puan: 10
kod_dili: micropython
arac_linki: "https://python.microbit.org"
malzemeler: ["2 adet micro:bit (arkadaşınla birlikte)", "2 adet USB kablo"]
video: ""
ornek_kod: |
  from microbit import *
  import radio

  # Radyoyu aç ve grubu seç
  radio.on()
  radio.config(group=7)
  while True:
      if button_a.was_pressed():
          radio.send("SELAM")
      # Sayılar metin olarak gönderilir
      if button_b.was_pressed():
          radio.send(str(5))
      # Gelen mesaj varsa göster
      mesaj = radio.receive()
      if mesaj:
          display.scroll(mesaj)
test:
  - soru: "Örnek kodda `radio.on()` satırı silinirse ne olur?"
    secenekler: ["Mesajlar iki kez gider", "Radyo kapalı kalır, mesaj gönderilemez ve alınamaz", "Grup numarası 0 olur", "Yalnızca sayılar gönderilebilir"]
    dogru: 1
    aciklama: "Python'da radyo kendiliğinden açılmaz; radio.on() ile açılması gerekir."
  - soru: "Hiç mesaj gelmemişse `radio.receive()` ne verir?"
    secenekler: ["0", "\"SELAM\"", "Boş bir liste", "None (hiçbir şey)"]
    dogru: 3
    aciklama: "Mesaj yoksa receive() None verir; bu yüzden `if mesaj:` ile kontrol edilir."
  - soru: "Alıcıya \"5\" geldi. Ekranda 6 görmek için hangisi yazılmalı?"
    secenekler: ["display.scroll(int(mesaj) + 1)", "display.scroll(mesaj + 1)", "display.scroll(mesaj + \"1\")", "display.scroll(str(mesaj) + 1)"]
    dogru: 0
    aciklama: "Gelen mesaj metindir; int() ile sayıya çevrilince 1 eklenebilir."
---

İki micro:bit'i bloklarla konuşturmuştun. Python'da telsiz nasıl açılır?

Radyo, kartın içindeki kablosuz haberleşme parçasıdır (Hatırla: Modül 6 — İki micro:bit Konuşuyor). Python'da radyo komutları **radio** kütüphanesindedir. Programın başına `import radio` yazılır.

Haberleşmenin adımları bloklardakiyle aynıdır, ama bir adım fazladır:

1. **Radyoyu aç:** `radio.on()`. Python'da radyo kendiliğinden açılmaz.
2. **Grup seç:** `radio.config(group=7)`. Yalnızca aynı gruptaki kartlar birbirini duyar.
3. **Gönder:** `radio.send("SELAM")`.
4. **Al:** `mesaj = radio.receive()`.

**Mesaj almak.** Bloklarda `on radio received` bir olaydı. Python'da posta kutusuna bakar gibi gelen mesajı biz kontrol ederiz. `radio.receive()` gelen mesajı verir. Mesaj yoksa `None` verir. `None`, “hiçbir şey” demektir. `if mesaj:` satırı “mesaj boş değilse” anlamına gelir. Bu kontrolü döngünün içinde sürekli yaparız.

**Sayı göndermek.** `radio.send` yalnızca metin gönderir. Sayıyı önce `str(5)` ile metne çevirirsin. Alıcıya da metin olarak `"5"` gelir. Gelen değerle hesap yapmak istersen `int(mesaj)` ile tekrar sayıya çevirirsin (Hatırla: Değişkenler ve Veri Türleri dersi).

Örnek kod kutusundaki programı iki karta da yükle. Bir kartta A'ya basınca öbüründe SELAM kayar. B'ye basınca 5 kayar.

> 💡 Dikkat: Sınıfta her ikili farklı bir grup numarası seçmeli. Grup 0 ile 255 arasında bir sayıdır. Herkes aynı grubu seçerse mesajlar birbirine karışır.

### Dene!

Arkadaşınla aynı grup numarasını seçin ve örnek kodu iki karta da yükleyin.

| Ne yaptınız? | Alıcıda ne göründü? |
|---|---|
| Kart 1'de A'ya bastık | SELAM |
| Kart 1'de B'ye bastık | |
| Alıcıdaki `display.scroll(mesaj)` satırını `display.scroll(int(mesaj) + 1)` yaptık, Kart 1'de B'ye bastık | |
| Aynı değişiklikle Kart 1'de A'ya bastık | |
| Kart 2'nin grubunu 8 yaptık, Kart 1'de A'ya bastık | |

Dördüncü satırı açıkla: `int("SELAM")` neden hata verir? Sonra mesajını kendin seç. ş, ğ, ı gibi harfleri kullanma; ekran onları gösteremez.

Şimdi giriş sorusuna dönelim. Python'da telsiz `import radio` ve `radio.on()` ile açılır. Sonra `send` ile gönderir, `receive` ile alırız.

### Bugün öğrendiklerin

- Radyo için `import radio` yazılır ve `radio.on()` ile radyo açılır.
- `radio.receive()` gelen mesajı, mesaj yoksa `None` verir; döngüde sürekli kontrol edilir.
- Radyo yalnızca metin taşır; sayılar `str()` ile gönderilip `int()` ile geri çevrilir.

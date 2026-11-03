---
kurs: microbit
modul: microbit-python-temelleri
slug: if-elif-else
sira: 1
baslik: "if, elif, else"
ozet: "Bu derste Python'da koşullu ifadeler yazacak ve sıcaklığı sınıflandıran bir program yapacaksın."
sure: 25
puan: 10
kod_dili: micropython
arac_linki: "https://python.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: |
  from microbit import *

  while True:
      # Sıcaklığı oku ve değişkende tut
      sicaklik = temperature()
      # Koşullar yukarıdan aşağı kontrol edilir
      if sicaklik < 18:
          display.scroll("SOGUK")
      elif sicaklik < 26:
          display.show(Image.HAPPY)
      else:
          display.scroll("SICAK")
      sleep(1000)
test:
  - soru: "Sıcaklık 30 ise örnek kod ekranda ne gösterir?"
    secenekler: ["SOGUK", "Gülen yüz", "30", "SICAK"]
    dogru: 3
    aciklama: "30 < 18 ve 30 < 26 yanlıştır; hiçbir koşul doğru olmadığı için else kısmı çalışır."
  - soru: "“puan 10'a eşit mi?” sorusu Python'da nasıl yazılır?"
    secenekler: ["if puan = 10:", "if puan == 10:", "if puan === 10:", "if puan equals 10:"]
    dogru: 1
    aciklama: "Eşitlik sorusu çift eşittir (==) ile yazılır; tek eşittir değer vermek içindir."
  - soru: "Şu kod çalışınca ekranda ne görünür? `x = 5` / `if x > 3 and x < 10:` / `display.scroll(\"EVET\")`"
    secenekler: ["EVET", "Hiçbir şey", "5", "Hata verir"]
    dogru: 0
    aciklama: "5 > 3 doğru ve 5 < 10 doğrudur; and ile bağlanan iki koşul da doğru olduğu için EVET kayar."
---

Termometre programını bloklarla yapmıştın. Python'da “eğer” nasıl yazılır?

Karar yapısını iki kursta da kullandın (Hatırla: Robotik Kodlamaya Giriş, Modül 7 — Karar Yapıları; Modül 3 — Eğer… Değilse Kartta). Python'da üç anahtar kelime vardır:

- `if` (eğer): Koşul doğruysa altındaki satırlar çalışır.
- `elif` (değilse eğer): Önceki koşul yanlışsa yeni bir koşul dener.
- `else` (değilse): Hiçbir koşul doğru değilse çalışır.

Her koşul satırı iki noktayla biter. Koşula bağlı satırlar 4 boşluk içeriden yazılır. MakeCode'da blokların içine koyduğun şeyleri Python'da girintiyle gösterirsin.

**Karşılaştırma işaretleri:**

| İşaret | Anlamı | Örnek |
|---|---|---|
| `==` | eşit mi? | `puan == 10` |
| `!=` | eşit değil mi? | `puan != 0` |
| `<` / `>` | küçük mü? / büyük mü? | `sicaklik < 18` |
| `<=` / `>=` | küçük ya da eşit mi? / büyük ya da eşit mi? | `isik >= 100` |

İki koşulu birleştirmek için `and` (ve) ile `or` (veya) kullanılır (Hatırla: Robotik Kodlamaya Giriş, Birden Çok Koşul dersi). `if x > 3 and x < 10:` iki koşul da doğruysa çalışır.

Örnek kod kutusundaki program, termometrenin Python sürümüdür (Hatırla: Modül 4 — Sıcaklık Sensörü). `temperature()` sıcaklığı santigrat derece olarak verir. Koşullar yukarıdan aşağı kontrol edilir. İlk doğru koşulun işi yapılır, gerisi atlanır. Blok sürümünde gördüğün `else if` burada `elif` olarak yazılır.

> 💡 Sık yapılan hata: Koşulda tek eşittir yazılır: `if puan = 10:`. Bu satır `SyntaxError` verir. “Eşit mi?” sorusu her zaman çift eşittirle (`==`) sorulur.

### Dene!

Örnek kodu editöre yaz. Simülatörde kartın yanında beliren sıcaklık ayarını aşağıdaki değerlere getir. İlk doğru koşulu ve ekranda ne göründüğünü yaz.

| Sıcaklık | İlk doğru koşul | Ekranda ne görünür? |
|---|---|---|
| 10 | `sicaklik < 18` | SOGUK |
| 18 | | |
| 25 | | |
| 26 | | |
| 35 | | |

Sonra programa dördüncü bir durum ekle: Sıcaklık 35 ve üstündeyse `Image.SKULL` (kafatası) gösterilsin. Bu koşulu nereye yazman gerekir? Koşulların sırasına dikkat et.

Şimdi giriş sorusuna dönelim. Python'da “eğer” `if` ile yazılır. “Değilse eğer” `elif`, “değilse” ise `else` olur.

### Bugün öğrendiklerin

- `if`, `elif` ve `else` satırları iki noktayla biter; bağlı satırlar girintilidir.
- Koşullar sırayla kontrol edilir; yalnızca ilk doğru koşulun işi yapılır.
- “Eşit mi?” sorusu `==` ile, değer verme tek `=` ile yazılır.

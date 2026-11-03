---
kurs: microbit
modul: bloktan-metne-gecis
slug: bloklarin-arkasindaki-kod
sira: 0
baslik: "Blokların Arkasındaki Kod"
ozet: "Bu derste MakeCode'da bir programın blok ve Python görünümlerini karşılaştıracaksın."
sure: 20
puan: 10
kod_dili: python
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: |
  # MakeCode'un Python görünümü (zar programı)
  zar = 0
  # Kart sallanınca çalışacak iş
  def on_gesture_shake():
      global zar
      # 1 ile 6 arasında rastgele sayı tut
      zar = randint(1, 6)
      basic.show_number(zar)
  # Sallanma olayını bu işe bağla
  input.on_gesture(Gesture.SHAKE, on_gesture_shake)
test:
  - soru: "MakeCode'da blokları Python koduna çevirmek için ne yapılır?"
    secenekler: ["Programı yeniden yazmak gerekir", "Üstteki düğmeden Python görünümü seçilir", "Kart USB'den çıkarılır", "Simülatör kapatılır"]
    dogru: 1
    aciklama: "Editörün üstündeki görünüm düğmesiyle aynı programın Python hali açılır."
  - soru: "MakeCode Python görünümündeki `basic.show_number(zar)` satırı hangi bloğun karşılığıdır?"
    secenekler: ["`show number zar`", "`set zar to 0`", "`on shake`", "`pick random 1 to 6`"]
    dogru: 0
    aciklama: "show_number, sayıyı ekranda gösteren `show number` bloğunun yazılı halidir."
  - soru: "MakeCode'un Python görünümünde gördüğün `basic.show_string(\"A\")` satırını python.microbit.org'a yazarsan ne olur?"
    secenekler: ["Aynen çalışır", "Yazı daha hızlı kayar", "Çalışmaz; orada `display.scroll(\"A\")` yazılır", "Kart kendini kapatır"]
    dogru: 2
    aciklama: "İki editör farklı adlar kullanır; MicroPython'da yazı kaydırma `display.scroll` ile yapılır."
---

Zar programını bloklarla yapmıştın. Peki bu bloklar aslında neye dönüşüyor?

Bloklar bir **programlama dilinin** görsel halidir. Her bloğun arkasında yazılı bir kod vardır (Hatırla: Robotik Kodlamaya Giriş, Blok Tabanlı Kodlama dersi). Bloklar ile yazılı kod aynı programı iki farklı biçimde gösterir. Bir şarkının hem notası hem de sözleri olması gibi.

**Görünümü değiştir.** Zar programını MakeCode'da aç (Hatırla: Modül 2 — Rastgele Sayı: Zar). Editörün üstünde `Blocks` düğmesinin yanında `JavaScript` düğmesi vardır. Yanındaki küçük oka bas ve `Python`ı seç. Bloklar kaybolur ve aynı program yazı olarak görünür. `Blocks` düğmesine basınca bloklara geri dönersin.

[GÖRSEL mb-m9-01: MakeCode ekranının üst kısmı (şematik): Blocks | JavaScript düğmesi ve Python seçeneği. Altta solda zar programının blokları, sağda aynı programın Python görünümü; eşleşen satırlar aynı renkte çizgilerle bağlı.]

Örnek kod kutusundaki program, zar bloklarının Python halidir. Satırları eşleştirelim:

- `on shake` bloğu → `def on_gesture_shake():` ve en alttaki `input.on_gesture(...)` satırı
- `set zar to pick random 1 to 6` → `zar = randint(1, 6)`
- `show number zar` → `basic.show_number(zar)`

`#` ile başlayan satırlar **açıklama satırıdır**. Bilgisayar bu satırları okumaz. Onlar kodu okuyan insanlar içindir.

**Önemli bir fark.** MakeCode'un Python görünümü, MakeCode'a özel adlar kullanır. Bir sonraki dersten itibaren kullanacağımız **MicroPython** ise başka adlar kullanır. Bu yüzden MakeCode'daki kodu kopyalayıp MicroPython editörüne yapıştıramazsın. Aşağıdaki tablo, sık kullandığın blokların MicroPython karşılıklarıdır:

| MakeCode bloğu | MicroPython |
|---|---|
| `show string` | `display.scroll("...")` |
| `show number` | `display.scroll(sayi)` |
| `show icon` | `display.show(Image.HEART)` |
| `plot x y` | `display.set_pixel(x, y, 9)` |
| `clear screen` | `display.clear()` |
| `forever` | `while True:` |
| `pause (ms)` | `sleep(ms)` |
| `on button A pressed` | `if button_a.was_pressed():` |
| `if … then … else` | `if … :` / `else:` |
| `repeat 4 times` | `for i in range(4):` |

> 💡 Dikkat: Python görünümünde bir satırı değiştirirsen bloklar da değişir. Yanlış bir şey yazarsan bloklara geri dönülemeyebilir. Denemeye başlamadan önce projeni kaydet.

### Dene!

MakeCode'da yeni bir proje aç. Aşağıdaki blokları kur, sonra Python görünümüne geç. Her bloğun hangi satıra dönüştüğünü yaz.

| Blok | MakeCode Python görünümünde |
|---|---|
| `show string "SELAM"` (on start içinde) | `basic.show_string("SELAM")` |
| `show icon` (kalp) | |
| `pause (ms) 500` | |
| `clear screen` | |

Sonra tabloya bak: Bu dört bloğun MicroPython karşılığı hangisi olurdu? Satırların yanına yaz.

Şimdi giriş sorusuna dönelim. Bloklar yazılı koda dönüşür. MakeCode bunu sana `Python` görünümünde gösterir.

### Bugün öğrendiklerin

- Bloklar ile yazılı kod aynı programın iki farklı görünümüdür.
- `#` ile başlayan satırlar açıklamadır; bilgisayar onları çalıştırmaz.
- MakeCode'un Python görünümü ile MicroPython farklı adlar kullanır.

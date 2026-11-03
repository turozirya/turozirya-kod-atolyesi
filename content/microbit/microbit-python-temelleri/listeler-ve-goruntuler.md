---
kurs: microbit
modul: microbit-python-temelleri
slug: listeler-ve-goruntuler
sira: 3
baslik: "Listeler ve Görüntüler"
ozet: "Bu derste liste oluşturacak, kendi görüntülerini çizecek ve onları sırayla göstererek animasyon yapacaksın."
sure: 25
puan: 10
kod_dili: micropython
arac_linki: "https://python.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo", "Kareli kâğıt ve kalem"]
video: ""
ornek_kod: |
  from microbit import *

  # Kendi görüntülerin: 5 satır, her satırda 5 rakam
  # 0 sönük, 9 en parlak
  kucuk = Image("00000:09090:09990:00900:00000")
  buyuk = Image("09090:99999:99999:09990:00900")
  # Kareleri bir listede topla
  kareler = [kucuk, buyuk]
  while True:
      # Listedeki kareleri sırayla göster
      display.show(kareler, delay=400)
test:
  - soru: "`isimler = [\"Ali\", \"Ayse\", \"Can\"]` listesinde `isimler[1]` hangisidir?"
    secenekler: ["Ali", "Can", "Hata verir", "Ayse"]
    dogru: 3
    aciklama: "Listelerde sıra 0'dan başlar: isimler[0] Ali, isimler[1] Ayse'dir."
  - soru: "`Image(\"00000:00000:00900:00000:00000\")` ekranda ne gösterir?"
    secenekler: ["Ortada tek bir parlak nokta", "Bütün LED'ler yanar", "Sol üstte tek nokta", "Ortadaki satırın tamamı yanar"]
    dogru: 0
    aciklama: "Üçüncü satırın ortasındaki rakam 9'dur; yalnızca o LED en parlak yanar."
  - soru: "Örnek kodda `delay=400` yerine `delay=100` yazılırsa ne değişir?"
    secenekler: ["Kalp daha büyük görünür", "Animasyon daha hızlı oynar", "Animasyon bir kez oynar ve durur", "Hata verir"]
    dogru: 1
    aciklama: "delay her karenin ekranda kaç milisaniye kalacağıdır; süre kısalınca animasyon hızlanır."
---

Çizgi filmler, arka arkaya gösterilen resimlerden oluşur. micro:bit'e de bir çizgi film yaptırabilir misin?

**Liste**, birden çok değeri sırayla tutan bir değişkendir. Tek bir değişken bir kutu ise liste, numaralı çekmeceleri olan bir dolaptır. Liste köşeli parantezle yazılır, değerler virgülle ayrılır:

```python
isimler = ["Ali", "Ayse", "Can"]
```

Her değerin bir **sıra numarası** vardır. Sıra numarası 0'dan başlar: `isimler[0]` Ali, `isimler[2]` Can'dır. Listelerle ilgili iki işe yarar komut:

- `len(isimler)` listedeki değer sayısını verir: 3.
- `isimler.append("Ece")` listenin sonuna yeni bir değer ekler.

**Kendi görüntünü çiz.** `Image.HEART` gibi hazır simgelerin yanında kendi görüntünü de yapabilirsin. `Image("...")` içine 5 satır yazılır. Satırlar iki nokta üst üste (`:`) ile ayrılır. Her satırda 5 rakam vardır. Rakam o LED'in parlaklığıdır: 0 sönük, 9 en parlak.

![Listeler ve Görüntüler — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/21f6cf62-db9c-49b1-ad3b-1bf434748030.png)

**Animasyon.** Görüntüleri bir listede toplarsın. Sonra `display.show(kareler, delay=400)` listeyi sırayla gösterir. `delay`, her karenin ekranda kaç milisaniye kalacağıdır. Örnek kod kutusundaki program, kalbi büyütüp küçülterek atan bir kalp yapar (Hatırla: Modül 1 — LED Ekranda Yazı, Sayı, Simge).

> 💡 Dikkat: Listede olmayan bir sıra numarası istersen hata çıkar. Üç elemanlı listede son eleman `isimler[2]`dir. `isimler[3]` yazarsan `IndexError` hatası alırsın.

### Dene!

![Listeler ve Görüntüler — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/3d4c635a-8482-4131-bcba-e4cd7647f241.png)

**1. Bölüm — Liste.** Şu listeyle çalış: `isimler = ["Ali", "Ayse", "Can"]`. Her satırı `display.scroll(...)` içine yazıp sonucu yaz.

| Kod | Ekranda ne görünür? |
|---|---|
| `isimler[0]` | Ali |
| `isimler[2]` | |
| `len(isimler)` | |
| `isimler.append("Ece")` satırından sonra `len(isimler)` | |

**2. Bölüm — Animasyon.** Kareli kâğıda 5×5'lik üç ızgara çiz. Hareket eden bir şey tasarla: zıplayan top, yanıp sönen yıldız ya da yürüyen bir çizgi. Her kareyi `Image("...")` yazısına çevir ve üç kareyi bir listeye koy. Sonra animasyonunu simülatörde oynat.

Şimdi giriş sorusuna dönelim. Evet, yapabilirsin. Görüntüleri bir listeye koyup `display.show` ile sırayla gösterince küçük bir çizgi film oluşur.

### Bugün öğrendiklerin

- Liste, birden çok değeri sırayla tutar; sıra numarası 0'dan başlar.
- `Image("...")` ile her LED'in parlaklığını 0–9 arası rakamlarla belirleyerek görüntü çizilir.
- Bir görüntü listesi `display.show(liste, delay=...)` ile animasyon olarak oynatılır.

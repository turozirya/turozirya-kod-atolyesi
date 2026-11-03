---
kurs: microbit
modul: kararlar-ve-donguler
slug: refleks-oyunu
sira: 3
baslik: "Mini Proje: Refleks Oyunu"
ozet: "Bu derste olay, değişken, karar ve döngüyü birleştirerek iki kişilik bir refleks oyunu yapacaksın."
sure: 25
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: ""
test:
  - soru: "Oyundaki `oyun` değişkeni ne işe yarar?"
    secenekler: ["Geri sayımı yapar", "Simge çıkmadan önceki ve kazanandan sonraki basışların sayılmamasını sağlar", "Skoru tutar", "Rastgele süreyi seçer"]
    dogru: 1
    aciklama: "`oyun` 1 değilken basışlar karar bloğundan geçemez ve sayılmaz."
  - soru: "`pause (ms) pick random 1000 to 5000` bloğu ne kadar bekler?"
    secenekler: ["Her seferinde 5 saniye", "3000 saniye", "Her seferinde 1 saniye", "1 ile 5 saniye arasında, her seferinde farklı"]
    dogru: 3
    aciklama: "Bekleme süresi her oyunda 1000 ile 5000 ms arasında rastgele seçilir."
  - soru: "B oyuncusu simge çıkmadan önce basarsa ne olur?"
    secenekler: ["Oyun yeniden başlar", "A kazanır", "Hiçbir şey olmaz; basış sayılmaz", "B kazanır"]
    dogru: 2
    aciklama: "Simge çıkmadan `oyun` 0'dır; `if oyun = 1` koşulu yanlış olduğu için basış sayılmaz."
---

Sınıfta en hızlı tepki veren kim? Haydi iki kişilik bir refleks oyunu yapalım.

Oyunun kuralları şöyle:

1. A ile B'ye birlikte basınca oyun başlar ve kart 3'ten geriye sayar.
2. Kart 1 ile 5 saniye arasında rastgele bir süre bekler.
3. Ekranda kalp çıkar.
4. Kalp çıkınca ilk basan oyuncu kazanır. A oyuncusu A düğmesine, B oyuncusu B düğmesine basar.
5. Kalp çıkmadan basmak sayılmaz.

Bu proje modülde öğrendiğin her şeyi birleştiriyor: olaylar, değişkenler, kararlar, döngüler ve rastgele sayılar.

İki değişken oluştur: **sayac** ve **oyun**. `oyun` değişkeni 1 ise oyun açıktır ve basışlar sayılır. 0 ise basışlar sayılmaz.

```
on button A+B pressed
    set oyun to 0
    set sayac to 3
    while sayac > 0
        show number sayac
        change sayac by -1
        pause (ms) 1000
    clear screen
    pause (ms) pick random 1000 to 5000
    show icon (kalp)
    set oyun to 1

on button A pressed
    if oyun = 1 then
        set oyun to 0
        show string "A"

on button B pressed
    if oyun = 1 then
        set oyun to 0
        show string "B"
```

Kazanan bulunur bulunmaz `oyun` 0 yapılır. Böylece ikinci basan oyuncu kazanan olarak görünmez.

![Mini Proje: Refleks Oyunu — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/5c79c895-dba1-4b33-b650-618580ebd336.png)

> 💡 Sık yapılan hata: Kazananı gösterirken `set oyun to 0` bloğu unutulur. O zaman iki oyuncu da kazanmış gibi görünür.

### Dene!

![Mini Proje: Refleks Oyunu — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/76184047-1d5a-411a-a964-88d67beaccc9.png)

Bir arkadaşınla en az 5 tur oyna ve sonuçları yaz.

| Tur | Kazanan | Not |
|---|---|---|
| 1 | A | B kalp çıkmadan bastı ama sayılmadı. |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |

**Meydan okuma:** İki skor değişkeni ekle: **skorA** ve **skorB**. Kazananın skorunu 1 artır. Oyun bitince skoru göster.

Şimdi giriş sorusuna dönelim. Artık en hızlı tepki vereni kart bulabiliyor. Üstelik kalp çıkmadan basan hileciyi de yakalıyor!

### Bugün öğrendiklerin

- Bir proje; olayları, değişkenleri, kararları ve döngüleri birlikte kullanır.
- 0 ya da 1 olan bir değişken, bir durumun açık mı kapalı mı olduğunu tutabilir.
- Rastgele bekleme süresi, oyunu tahmin edilemez yapar.

### Blok sözlüğü — Modül 3

| Blok | Anlamı |
|---|---|
| `if … then` | eğer … ise |
| `if … then … else` | eğer … ise … değilse |
| `remainder of … ÷ …` | bölümden kalan |
| `repeat … times` | … kez tekrarla |
| `while …` | … olduğu sürece |
| `forever` | sürekli |
| `pause (ms)` | bekle (milisaniye) |
| `show leds` | LED'leri göster |
| `clear screen` | ekranı temizle |

---
kurs: microbit
modul: radyo-ile-haberlesme
slug: sinif-oylamasi
sira: 2
baslik: "Sınıf Oylaması"
ozet: "Bu derste radyo ile oyları toplayan ve her kartın yalnızca bir kez oy vermesini sağlayan bir sistem yapacaksın."
sure: 25
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["Sınıftaki micro:bit kartları", "Öğretmen için 1 adet micro:bit"]
video: ""
ornek_kod: ""
test:
  - soru: "`oyVerdi` değişkeni ne işe yarar?"
    secenekler: ["Bir kartın ikinci kez oy vermesini engeller", "Radyo grubunu seçer", "Sonucu gösterir", "Oyları sayar"]
    dogru: 0
    aciklama: "Oy verilince 1 olur; sonraki basışlarda `if oyVerdi = 0` koşulu yanlış olur."
  - soru: "Sayıcı kart radyodan 0 alırsa ne yapar?"
    secenekler: ["Hiçbir şey yapmaz", "Oylamayı bitirir", "evet'i 1 artırır", "hayir'i 1 artırır"]
    dogru: 3
    aciklama: "0 hayır oyudur; `else` kısmı çalışır ve hayir 1 artar."
  - soru: "Bir öğrenci kartını kapatıp açarak yeniden oy verebiliyor. Neden?"
    secenekler: ["Radyo bozulur", "Logo dokunması sıfırlar", "Kart açılınca `on start` çalışır ve `oyVerdi` yeniden 0 olur", "Grup numarası değişir"]
    dogru: 2
    aciklama: "Değişkenler kart kapanınca silinir; `on start` onları baştan başlatır."
---

“Kulüp gezisi müzeye mi olsun?” Bütün sınıfın oyunu birkaç saniyede nasıl toplarız?

Herkesin kartında aynı program çalışacak. Öğrenciler oy verecek. Öğretmenin kartı ise oy vermeyecek, yalnızca gelen oyları sayacak. Radyo kendi gönderdiği mesajı almadığı için bu düzen işe yarar.

- **A:** Evet oyu gönderir (1).
- **B:** Hayır oyu gönderir (0).
- **Logo:** Sonuçları gösterir.

Üç değişken oluştur: **evet**, **hayir** ve **oyVerdi**.

```
on start
    radio set group 20
    set evet to 0
    set hayir to 0
    set oyVerdi to 0
on button A pressed
    if oyVerdi = 0 then
        radio send number 1
        set oyVerdi to 1
        show icon (tik işareti)
on button B pressed
    if oyVerdi = 0 then
        radio send number 0
        set oyVerdi to 1
        show icon (çarpı işareti)
on radio received receivedNumber
    if receivedNumber = 1 then
        change evet by 1
    else
        change hayir by 1
on logo pressed
    show string "E"
    show number evet
    show string "H"
    show number hayir
```

`oyVerdi` değişkeni, bir kartın ikinci kez oy vermesini engeller. Refleks oyunundaki `oyun` değişkeni gibi çalışır.

**Tartışmalı örnek:** Sistemimiz tamamen hilesiz mi? Hayır. Bir öğrenci kartını kapatıp açarsa `on start` yeniden çalışır ve `oyVerdi` 0 olur. Gerçek oylama sistemleri bu tür hilelere karşı çok daha fazla önlem alır.

![Sınıf Oylaması — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/0481eed9-7a1c-416b-a854-34209f211616.png)

> 💡 Dikkat: Sınıftaki bütün kartlar aynı grup numarasını kullanmalı. Bir kart farklı gruptaysa onun oyu sayılmaz.

### Dene!

![Sınıf Oylaması — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/656d60b2-51ed-4788-a15b-7ccde7b3d15e.png)

Sınıfça bir soru belirleyin ve oylayın. Öğretmen logoya dokunarak sonucu göstersin.

| Ne oldu? | Sayıcı kartta |
|---|---|
| Ayşe A'ya bastı | evet: 1, hayır: 0 |
| Mert B'ye bastı | |
| Ayşe tekrar A'ya bastı | |
| Elif A'ya bastı | |

Şimdi giriş sorusuna dönelim. Her öğrenci kartıyla oyunu gönderir. Öğretmenin kartı gelen oyları sayar ve logoya dokununca sonucu gösterir.

### Bugün öğrendiklerin

- Radyo ile birçok karttan gelen mesajlar tek bir kartta toplanabilir.
- Bir değişken, bir işin yalnızca bir kez yapılmasını sağlayabilir.
- Kart yeniden açılınca değişkenler `on start` ile baştan başlar.

### Blok sözlüğü — Modül 6

| Blok | Anlamı |
|---|---|
| `radio set group …` | radyo grubunu ayarla |
| `radio send number …` | sayı gönder |
| `radio send string …` | metin gönder |
| `on radio received receivedNumber` | radyodan sayı gelince |
| `on radio received receivedString` | radyodan metin gelince |
| `and` / `or` | ve / veya |

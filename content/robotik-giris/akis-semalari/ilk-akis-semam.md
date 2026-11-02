---
kurs: robotik-giris
modul: akis-semalari
slug: ilk-akis-semam
sira: 1
baslik: "İlk Akış Şemam"
ozet: "Bu derste düz bir algoritmayı adım adım akış şemasına çevireceksin."
sure: 20
puan: 10
kod_dili: sozde_kod
arac_linki: ""
malzemeler: ["Kâğıt, kalem ve cetvel"]
video: ""
ornek_kod: |
  1. Başla
  2. A sayısını al
  3. B sayısını al
  4. Toplam = A + B
  5. Toplamı yaz
  6. Bitir
test:
  - soru: "Düz (kararsız) bir akış şemasında hangi şekil bulunmaz?"
    secenekler: ["Oval", "Dikdörtgen", "Eşkenar dörtgen", "Paralelkenar"]
    dogru: 2
    aciklama: "Eşkenar dörtgen karar şeklidir; düz bir algoritmada karar yoktur."
  - soru: "Toplama şemasında A = 4 ve B = 7 girilirse ekrana ne yazılır?"
    secenekler: ["47", "11", "3", "28"]
    dogru: 1
    aciklama: "Toplam = 4 + 7 = 11 olur; sayılar yan yana yazılmaz, toplanır."
  - soru: "“Toplam = A + B” adımı hangi şekille çizilir?"
    secenekler: ["Dikdörtgen", "Paralelkenar", "Oval", "Eşkenar dörtgen"]
    dogru: 0
    aciklama: "Hesaplama bir işlemdir; işlemler dikdörtgenle çizilir."
---

Diş fırçalama algoritmanı yazmıştın. Aynı algoritmayı şekillerle çizebilir misin?

Bazı algoritmalarda hiç karar yoktur. Adımlar tek bir sırada, yukarıdan aşağı ilerler. Bunlara **düz algoritma** diyeceğiz. Düz bir algoritmayı akış şemasına çevirmek için dört adım izle:

1. En üste bir oval çiz ve içine “Başla” yaz.
2. Her adım için doğru şekli seç: girdi ve çıktı için paralelkenar, işlem için dikdörtgen.
3. Şekilleri yukarıdan aşağı oklarla bağla.
4. En alta bir oval çiz ve içine “Bitir” yaz.

Örnek: Örnek kod kutusunda iki sayıyı toplayan algoritma var. Şemaya şöyle dönüşür:

- “Başla” ve “Bitir” oval olur.
- “A sayısını al” ve “B sayısını al” paralelkenar olur, çünkü bunlar girdidir.
- “Toplam = A + B” dikdörtgen olur, çünkü bu bir işlemdir.
- “Toplamı yaz” paralelkenar olur, çünkü bu bir çıktıdır.

![iki-sayiyi-topla-semasi](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/95dc7596-17c6-481b-85bb-c8790bbacc44.png)

Şemanı bitirince bir örnek sayıyla kontrol et. A = 4 ve B = 7 olsun. Okları izleyerek ilerlersen Toplam = 11 bulursun. Şemayı bir örnekle adım adım izlemek, hatayı bulmanın en kolay yoludur.

> 💡 Sık yapılan hata: Oklar ya da “Bitir” şekli unutulur. Ok olmazsa hangi adımın önce geldiği anlaşılmaz. Bitir olmazsa algoritmanın nerede bittiği belli olmaz.

### Dene!

Bir dikdörtgenin alanını hesaplayan akış şemasını kâğıda çiz. Önce tabloyu doldur, sonra şemayı çiz.

| Adım | Şekil |
|---|---|
| Başla | Oval |
| Kısa kenarı al | |
| Uzun kenarı al | |
| Alan = kısa kenar × uzun kenar | |
| Alanı yaz | |
| Bitir | |

Şemanı kısa kenar = 3 ve uzun kenar = 5 ile izle. Sonuç 15 çıkmalı.

Şimdi giriş sorusuna dönelim. Evet; her adıma doğru şekli verip oklarla bağlarsan algoritman bir akış şemasına dönüşür.

### Bugün öğrendiklerin

- Düz bir algoritmada adımlar tek sırada ilerler ve karar yoktur.
- Girdi ve çıktı paralelkenarla, işlem dikdörtgenle çizilir.
- Şemayı bir örnek sayıyla izlemek, hatayı bulmayı kolaylaştırır.

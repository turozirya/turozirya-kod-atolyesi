---
kurs: microbit
modul: kararlar-ve-donguler
slug: eger-degilse-kartta
sira: 0
baslik: "Eğer–Değilse Kartta"
ozet: "Bu derste karar bloklarıyla sayacın eksiye düşmesini engelleyecek ve tek–çift bulacaksın."
sure: 25
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: ""
test:
  - soru: "`if kisi > 0 then change kisi by -1` bloğu, kisi 0 iken ne yapar?"
    secenekler: ["kisi'yi −1 yapar", "kisi'yi değiştirmez", "Programı durdurur", "kisi'yi 1 yapar"]
    dogru: 1
    aciklama: "0 > 0 yanlıştır; koşula bağlı blok çalışmaz ve kisi 0 kalır."
  - soru: "`remainder of 9 ÷ 2` kaçtır?"
    secenekler: ["4.5", "4", "1", "0"]
    dogru: 2
    aciklama: "9'u 2'ye bölünce bölüm 4, kalan 1 olur."
  - soru: "Bir sayının çift olduğunu nasıl anlarız?"
    secenekler: ["2'ye bölümünden kalan 0 ise", "Sayı 2'den büyükse", "2'ye bölümü 0 ise", "Son rakamı 1 ise"]
    dogru: 0
    aciklama: "Çift sayılar 2'ye tam bölünür; kalan 0 olur."
---

Önceki modülde sayacımız 0 iken B'ye basınca −1 göstermişti. Bu hatayı nasıl düzeltiriz?

Çözüm bir **karar** bloğudur (Hatırla: Robotik Kodlamaya Giriş, Modül 7 — Karar Yapıları). MakeCode'da kararlar `Logic` (mantık) kategorisindedir:

- `if … then` (eğer … ise): Koşul doğruysa içindeki bloklar çalışır.
- `if … then … else` (eğer … ise … değilse): Koşul yanlışsa `else` kısmı çalışır.
- `0 < 0` ve `0 > 0` gibi karşılaştırma blokları da buradadır.

Sayaç programında B olayını şöyle değiştir:

```
on button B pressed
    if kisi > 0 then
        change kisi by -1
    show number kisi
```

Artık kisi 0 iken B'ye basılırsa koşul yanlış olur. Azaltma yapılmaz ve sayaç 0'da kalır. `show number` bloğunu `if` bloğunun dışına koyduk. Böylece sayı her durumda gösterilir.

Şimdi bir de **tek mi, çift mi** sorusunu cevaplayalım. Bir sayıyı 2'ye bölünce kalan 0 ise sayı çifttir. Kalan 1 ise tektir. `Math` kategorisindeki `remainder of … ÷ …` (bölümden kalan) bloğu kalanı verir.

A+B olayını şöyle değiştir:

```
on button A+B pressed
    if remainder of kisi ÷ 2 = 0 then
        show string "CIFT"
    else
        show string "TEK"
```

micro:bit ekranı Ç ve İ harflerini gösteremediği için “CIFT” yazdık.

![Eğer–Değilse Kartta — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/aadaf535-45a0-453f-9c3c-b8db7f1280f1.png)

> 💡 Sık yapılan hata: Bir bloğun `if` bloğunun içinde mi dışında mı olduğuna dikkat edilmez. İçindeki bloklar yalnızca koşul doğruysa çalışır. Dışındakiler her zaman çalışır.

### Dene!

![Eğer–Değilse Kartta — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/0d551f99-272d-4637-b51d-ea7800431535.png)

Sayacı farklı değerlere getir ve A ile B'ye birlikte bas.

| kisi | `remainder of kisi ÷ 2` | Ekranda ne yazar? |
|---|---|---|
| 6 | 0 | CIFT |
| 7 | | |
| 0 | | |
| 13 | | |

Kontrol: 7 için kalan 1 ve TEK; 0 için kalan 0 ve CIFT; 13 için kalan 1 ve TEK.

Şimdi giriş sorusuna dönelim. `if kisi > 0 then` bloğu, sayaç 0 iken azaltmayı engeller. Böylece sayaç eksiye düşmez.

### Bugün öğrendiklerin

- `if … then` bloğu, koşul doğruysa içindeki blokları çalıştırır.
- `if` bloğunun dışındaki bloklar her durumda çalışır.
- `remainder of … ÷ 2` sonucu 0 ise sayı çifttir.

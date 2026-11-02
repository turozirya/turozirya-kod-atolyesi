---
kurs: robotik-giris
modul: akis-semalari
slug: semayi-oku
sira: 2
baslik: "Şemayı Oku"
ozet: "Bu derste verilen bir akış şemasının ne yaptığını ve çıktısını bulacaksın."
sure: 20
puan: 10
kod_dili: ""
arac_linki: ""
malzemeler: ["Kâğıt ve kalem"]
video: ""
ornek_kod: ""
test:
  - soru: "Şema 1'de S yerine 4 girilirse çıktı ne olur?"
    secenekler: ["11", "14", "8", "7"]
    dogru: 0
    aciklama: "Önce 4 × 2 = 8, sonra 8 + 3 = 11 olur; sıra önemlidir."
  - soru: "Şema okurken değerleri adım adım yazdığımız tabloya ne denir?"
    secenekler: ["Akış tablosu", "İzleme tablosu", "Sembol tablosu", "Sonuç listesi"]
    dogru: 1
    aciklama: "Değerleri adım adım takip ettiğimiz tabloya izleme tablosu denir."
  - soru: "Bir robot kolunun şemasında art arda üç “Açı = Açı + 30” adımı var. Açı başta 0 ise sonunda kaçtır?"
    secenekler: ["30", "60", "0", "90"]
    dogru: 3
    aciklama: "Her adımda 30 eklenir: 0 → 30 → 60 → 90."
---

Biri sana bir akış şeması verse, onu çalıştırmadan ne yaptığını bulabilir misin?

Bir akış şemasını okumak için şu yolu izle:

1. “Başla” şeklinden başla.
2. Okları tek tek izle.
3. Her şekilde ne yapıldığını oku.
4. Değerleri bir tabloya yaz.

Değerleri adım adım yazdığımız bu tabloya **izleme tablosu** denir. İzleme tablosu, değerleri aklında tutmak zorunda kalmamanı sağlar.

Örnek: Şema 1'i inceleyelim.

![sema-1-s-sayisi](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/b7ff0ec7-a31e-4e76-afbd-192ca4236c56.png)

“S = S × 2” şu anlama gelir: S'nin yeni değeri, eski değerinin iki katıdır. S yerine 5 girelim ve izleme tablosunu dolduralım:

| Adım | S |
|---|---|
| S sayısını al | 5 |
| S = S × 2 | 10 |
| S = S + 3 | 13 |
| S'yi yaz | 13 yazılır |

Şema 1 ne yapıyor? Bir sayıyı önce iki katına çıkarıyor, sonra 3 ekliyor.

> 💡 Sık yapılan hata: Şemayı okurken bir adım atlanır ya da sıra karıştırılır. Her oku tek tek izle ve her değeri tabloya yaz. Aklında tutmaya çalışma.

### Dene!

Şema 2'yi oku. Fiyat olarak 80 gir ve izleme tablosunu doldur. Sonra şemanın ne yaptığını bir cümleyle yaz.

![sema-2-fiyat-indirim](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/51f6d7a1-1b33-45cb-847b-273e6cc2d19f.png)

| Adım | Fiyat | İndirim | Yeni fiyat |
|---|---|---|---|
| Fiyatı al | 80 | – | – |
| İndirim = Fiyat ÷ 4 | | | |
| Yeni fiyat = Fiyat − İndirim | | | |
| Yeni fiyatı yaz | | | |

Kontrol: Yeni fiyat 60 olmalı. Şema 2, bir ürünün fiyatından dörtte birini indiriyor.

Şimdi giriş sorusuna dönelim. Evet; okları izleyip değerleri bir izleme tablosuna yazarsan şemayı çalıştırmadan çıktısını bulursun.

### Bugün öğrendiklerin

- Akış şeması “Başla”dan başlayıp okları izleyerek okunur.
- İzleme tablosu, her adımdaki değerleri yazdığımız tablodur.
- “S = S × 2” gibi bir adım, S'nin eski değerini kullanarak yeni değerini bulur.

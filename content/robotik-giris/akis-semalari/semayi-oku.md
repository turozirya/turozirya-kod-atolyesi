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
    secenekler: ["8", "11", "14", "7"]
    dogru: 1
    aciklama: "Önce 4 × 2 = 8, sonra 8 + 3 = 11 olur; sıra önemlidir."
  - soru: "Şema okurken değerleri adım adım yazdığımız tabloya ne denir?"
    secenekler: ["Akış tablosu", "Sembol tablosu", "İzleme tablosu", "Sonuç listesi"]
    dogru: 2
    aciklama: "Değerleri adım adım takip ettiğimiz tabloya izleme tablosu denir."
  - soru: "Bir robot kolunun şemasında art arda üç “Açı = Açı + 30” adımı var. Açı başta 0 ise sonunda kaçtır?"
    secenekler: ["30", "0", "60", "90"]
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

![Şemayı Oku — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/a0f85a81-0e2d-413b-8442-c3ff580f2e4d.png)

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

![Şemayı Oku — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/44a215ef-29b6-4321-a793-2ffe75143222.png)

Şema 2'yi oku. Fiyat olarak 80 gir ve izleme tablosunu doldur. Sonra şemanın ne yaptığını bir cümleyle yaz.

[GÖRSEL rg-m5-04: Şema 2, yukarıdan aşağı: oval “Başla” → paralelkenar “Fiyatı al” → dikdörtgen “İndirim = Fiyat ÷ 4” → dikdörtgen “Yeni fiyat = Fiyat − İndirim” → paralelkenar “Yeni fiyatı yaz” → oval “Bitir”.]

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

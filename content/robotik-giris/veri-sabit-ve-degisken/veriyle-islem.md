---
kurs: robotik-giris
modul: veri-sabit-ve-degisken
slug: veriyle-islem
sira: 4
baslik: "Veriyle İşlem"
ozet: "Bu derste aritmetik ve karşılaştırma işlemlerini kodda nasıl yazacağını öğreneceksin."
sure: 20
puan: 10
kod_dili: sozde_kod
arac_linki: ""
malzemeler: []
video: ""
ornek_kod: |
  1. Başla
  2. not1, not2 ve not3'ü al
  3. toplam = not1 + not2 + not3
  4. ortalama = toplam / 3
  5. ortalamayı yaz
  6. Bitir
test:
  - soru: "Kodda 6 ile 7'nin çarpımı nasıl yazılır?"
    secenekler: ["6 x 7", "6 * 7", "6 · 7", "6 ÷ 7"]
    dogru: 1
    aciklama: "Kodda çarpma işlemi yıldız (*) ile yazılır."
  - soru: "2 + 3 * 4 işleminin sonucu kaçtır?"
    secenekler: ["20", "24", "14", "9"]
    dogru: 2
    aciklama: "Önce çarpma yapılır: 3 * 4 = 12, sonra 2 + 12 = 14."
  - soru: "Robot süpürgenin pili 15 ise “pil < 20” karşılaştırmasının sonucu nedir?"
    secenekler: ["15", "20", "yanlış", "doğru"]
    dogru: 3
    aciklama: "15, 20'den küçüktür; karşılaştırmanın sonucu mantıksal bir değerdir: doğru."
---

Üç sınav notunun ortalamasını bilgisayar nasıl hesaplar?

Bilgisayar sayılarla dört işlem yapar. Bunlara **aritmetik işlemler** denir. Kodda bazı işaretler farklı yazılır:

| İşlem | Matematikte | Kodda |
|---|---|---|
| Toplama | + | + |
| Çıkarma | − | - |
| Çarpma | × | * |
| Bölme | ÷ | / |

İşlem sırası matematikteki gibidir. Önce parantez içi yapılır. Sonra çarpma ve bölme, en son toplama ve çıkarma yapılır.

Örnek: Örnek kod kutusunda üç notun ortalamasını bulan algoritma var. Notlar 70, 80 ve 90 olsun. Toplam 240 olur. Ortalama 240 / 3 = 80 olur.

Ortalamayı tek satırda yazmak istersen parantez şarttır: (not1 + not2 + not3) / 3. Parantez olmazsa yalnızca not3 üçe bölünür.

Bilgisayar sayıları karşılaştırabilir de. Bunlara **karşılaştırma işlemleri** denir: büyüktür (>), küçüktür (<) ve eşittir (=). Karşılaştırmanın sonucu bir mantıksal değerdir: doğru ya da yanlış (Hatırla: Veri Türleri dersi).

Robot süpürge örneği: Pil 15 ise “pil < 20” karşılaştırmasının sonucu doğrudur. Bir sonraki modülde robot bu sonuca göre karar verecek.

> 💡 Dikkat: Python'da “eşit mi?” sorusu iki eşittir işaretiyle yazılır: ==. Tek eşittir (=) ise bir değişkene değer vermek için kullanılır. MakeCode'un karşılaştırma bloğunda ise tek = görünür.

### Dene!

Her ifadenin sonucunu yaz.

| İfade | Sonuç |
|---|---|
| 8 * 3 | 24 |
| 20 / 4 | |
| 2 + 3 * 4 | |
| (2 + 3) * 4 | |
| 15 > 9 | |
| 7 < 7 | |
| pil = 15 iken pil < 20 | |

Kontrol: 5, 14, 20, doğru, yanlış, doğru.

Şimdi giriş sorusuna dönelim. Bilgisayar önce notları toplar, sonra toplamı 3'e böler: (70 + 80 + 90) / 3 = 80.

### Bugün öğrendiklerin

- Kodda çarpma * ile, bölme / ile yazılır.
- İşlem sırası matematikteki gibidir; parantez önce yapılır.
- Karşılaştırmanın sonucu doğru ya da yanlış olan bir mantıksal değerdir.

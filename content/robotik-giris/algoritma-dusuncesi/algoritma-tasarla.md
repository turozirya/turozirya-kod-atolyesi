---
kurs: robotik-giris
modul: algoritma-dusuncesi
slug: algoritma-tasarla
sira: 2
baslik: "Algoritma Tasarla"
ozet: "Bu derste bir harita üzerinde robotu hedefe götüren algoritmayı kendin tasarlayacaksın."
sure: 25
puan: 10
kod_dili: sozde_kod
arac_linki: ""
malzemeler: ["Kâğıt ve kalem"]
video: ""
ornek_kod: |
  1. Başla
  2. İleri git
  3. Sağa dön
  4. İleri git
  5. İleri git
  6. ...
test:
  - soru: "Algoritma tasarlarken ilk adım nedir?"
    secenekler: ["Problemi anlamak: başlangıç ve hedef nerede?", "Hemen komutları yazmak", "En uzun yolu seçmek", "Arkadaşına cevabı sormak"]
    dogru: 0
    aciklama: "Önce başlangıcı, hedefi ve engelleri anlamak gerekir."
  - soru: "Haritada sağa bakan robot “sağa dön” komutunu alırsa ne olur?"
    secenekler: ["Sola bakar", "Bir kare sağa gider", "Yerinden kıpırdamadan aşağıya bakar", "Bir kare geri gider"]
    dogru: 2
    aciklama: "Dönmek yalnızca yönü değiştirir; robot yerinde kalır ve aşağıya bakar."
  - soru: "Aynı hedefe giden iki algoritmadan biri 9, diğeri 14 adımsa hangisi genelde daha iyidir?"
    secenekler: ["İkisi de aynıdır", "14 adımlı olan, çünkü daha ayrıntılı", "Hangisi önce yazıldıysa", "9 adımlı olan, çünkü daha kısa"]
    dogru: 3
    aciklama: "İkisi de hedefe ulaşıyorsa daha kısa olan genelde daha iyidir."
---

Okula yeni gelen bir arkadaşına sınıftan kantine yolu tarif etmen gerekse ne söylerdin?

Bir algoritma tasarlarken dört adım izlenir:

1. **Problemi anla:** Başlangıç nerede? Hedef nerede? Yolda engel var mı?
2. **Komutları belirle:** Robot hangi komutları anlıyor?
3. **Adımları sırayla yaz:** Komutları doğru sırada art arda diz.
4. **Dene ve düzelt:** Algoritmayı adım adım uygula, hatayı bul.

Aşağıdaki harita okulun bir bölümünü gösteriyor. Robot **S** (sınıf) karesinde başlıyor ve **sağa** bakıyor. Hedef **K** (kantin) karesi. **X** olan kareler duvar; robot oradan geçemez. Boş kareler yürünebilir yoldur.

| | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **1** | S | | X | | |
| **2** | | | X | | |
| **3** | | | | | X |
| **4** | X | | X | | |
| **5** | | | | | K |

Robot yalnızca üç komutu anlar:

- **İleri git:** Baktığı yönde bir kare ilerler.
- **Sağa dön:** Yerinde durarak sağa döner.
- **Sola dön:** Yerinde durarak sola döner.

Örnek: Örnek kod kutusunda algoritmanın ilk adımları var. Robot önce bir kare ilerler. Sonra sağa döner ve aşağıya bakar. Ardından iki kare aşağı iner. Gerisini sen tamamlayacaksın.

Aynı hedefe giden birden fazla algoritma olabilir. İkisi de hedefe ulaşıyorsa daha kısa olan genelde daha iyidir.

![Algoritma Tasarla — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/eacda876-79c6-4b74-8c3c-286663135acb.png)

> 💡 Sık yapılan hata: Dönme komutunun robotu bir kare ilerlettiği sanılır. Dönmek yalnızca yönü değiştirir. İlerlemek için ayrıca “İleri git” gerekir.

### Dene!

![Algoritma Tasarla — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/eb2efdb1-88c1-45a2-9c1f-78cbb83b7a23.png)

Algoritmayı tamamla ve robotu K karesine ulaştır. Her adımdan sonra robotun yerini ve yönünü tabloya yaz. Sonra adımlarını say ve bir arkadaşınınkiyle karşılaştır. Kimin algoritması daha kısa?

| Adım | Komut | Robotun yeri ve yönü |
|---|---|---|
| 1 | Başla | 1. satır, 1. sütun, sağa bakıyor |
| 2 | İleri git | 1. satır, 2. sütun, sağa bakıyor |
| 3 | Sağa dön | 1. satır, 2. sütun, aşağı bakıyor |
| 4 | | |
| 5 | | |
| 6 | | |

Şimdi giriş sorusuna dönelim. Arkadaşına yol tarif ederken aslında bir algoritma tasarlarsın. Başlangıcı, hedefi ve sıralı adımları söylersin.

### Bugün öğrendiklerin

- Algoritma tasarlarken önce problemi anlarız: başlangıç, hedef ve engeller.
- Dönme komutu yalnızca yönü değiştirir, robotu ilerletmez.
- Aynı hedefe giden algoritmalardan kısa olan genelde daha iyidir.

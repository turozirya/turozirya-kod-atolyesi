---
kurs: robotik-giris
modul: akis-semalari
slug: akis-semasi-sembolleri
sira: 0
baslik: "Akış Şeması Sembolleri"
ozet: "Bu derste akış şemasında kullanılan şekilleri ve anlamlarını tanıyacaksın."
sure: 15
puan: 10
kod_dili: ""
arac_linki: ""
malzemeler: ["Kâğıt ve kalem"]
video: ""
ornek_kod: ""
test:
  - soru: "Akış şemasında karar adımı hangi şekille gösterilir?"
    secenekler: ["Dikdörtgen", "Eşkenar dörtgen", "Paralelkenar", "Oval"]
    dogru: 1
    aciklama: "Karar adımı eşkenar dörtgenle (baklava dilimi) gösterilir ve iki çıkışı vardır."
  - soru: "“Kullanıcıdan bir sayı al” adımı hangi şekille çizilir?"
    secenekler: ["Eşkenar dörtgen", "Oval", "Paralelkenar", "Dikdörtgen"]
    dogru: 2
    aciklama: "Bilgi alma bir girdidir; girdi ve çıktı paralelkenarla gösterilir."
  - soru: "Robot süpürgenin “Önünde engel var mı?” sorusu akış şemasında hangi şekle yazılır?"
    secenekler: ["Eşkenar dörtgen", "Paralelkenar", "Dikdörtgen", "Oval"]
    dogru: 0
    aciklama: "Bu bir evet/hayır sorusudur; karar şekline, yani eşkenar dörtgene yazılır."
---

Trafik işaretlerini anlamak için yazı okuman gerekmez. Algoritmalar da şekillerle anlatılabilir mi?

**Akış şeması**, bir algoritmanın şekillerle çizilmiş halidir. Her şeklin bir anlamı vardır. Şekiller oklarla birbirine bağlanır. Oklar hangi adımın sonra geldiğini gösterir.

Akış şemasında beş temel sembol kullanılır:

- **Başla / Bitir — Oval:** Algoritmanın başladığı ve bittiği yeri gösterir.
- **Girdi / Çıktı — Paralelkenar:** Bilgi almayı ya da sonucu göstermeyi anlatır.
- **İşlem — Dikdörtgen:** Bir hesaplama ya da bir iş yapmayı anlatır.
- **Karar — Eşkenar dörtgen:** Cevabı evet ya da hayır olan bir soruyu anlatır.
- **Ok:** Akışın yönünü gösterir.

![Akış Şeması Sembolleri — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/23b65f1d-9820-4ac0-89d4-6cc12248419a.png)

Bu şekilleri daha önce gördüğün bir fikre bağlayabilirsin (Hatırla: Modül 2 — Algıla, Düşün, Harekete Geç). Paralelkenar girdi ve çıktıyı, dikdörtgen işlemi gösterir. Yani akış şeması, girdi–işlem–çıktı düzeninin çizilmiş halidir.

**Tartışmalı örnek:** Bazı kitaplarda çıktı için alt kenarı dalgalı bir “belge” şekli kullanılır. İkisini de görebilirsin. Bu kursta çıktı için paralelkenar kullanacağız.

> 💡 Sık yapılan hata: Karar şeklinden tek ok çıktığı sanılır. Karar şeklinden iki ok çıkar: biri “Evet”, biri “Hayır” yoluna gider.

### Dene!

![Akış Şeması Sembolleri — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/0042857a-68b5-431e-bee5-b578211b6fdb.png)

Her adımın hangi şekille çizileceğini yaz.

| Adım | Hangi şekil? |
|---|---|
| Başla | Oval |
| Kullanıcıdan yaşını al | |
| Yaşı 2 ile çarp | |
| Yaş 12'den büyük mü? | |
| Sonucu ekrana yaz | |
| Bitir | |

Kontrol: Girdi ve çıktı adımları paralelkenar, çarpma işlemi dikdörtgen, soru eşkenar dörtgen, Bitir ovaldir.

Şimdi giriş sorusuna dönelim. Evet; trafik işaretleri gibi akış şeması şekilleri de yazıyı okumadan ne yapıldığını anlatır.

### Bugün öğrendiklerin

- Akış şeması, algoritmanın şekillerle çizilmiş halidir.
- Oval başla ve bitiri, paralelkenar girdi ve çıktıyı, dikdörtgen işlemi gösterir.
- Eşkenar dörtgen bir karardır ve ondan iki ok çıkar.

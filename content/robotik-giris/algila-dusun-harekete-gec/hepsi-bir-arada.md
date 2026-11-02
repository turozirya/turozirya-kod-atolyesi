---
kurs: robotik-giris
modul: algila-dusun-harekete-gec
slug: hepsi-bir-arada
sira: 3
baslik: "Hepsi Bir Arada"
ozet: "Bu derste bir sistemi sensör, işlemci ve eyleyici olarak çözümleyeceksin."
sure: 20
puan: 10
kod_dili: sozde_kod
ornek_kod: |
  GİRDİ: hareket sensörünü oku
  İŞLEM: eğer biri yaklaşıyorsa → kapıyı aç
  ÇIKTI: motoru çalıştır
arac_linki: ""
malzemeler: []
video: ""
test:
  - soru: "Bir otomatik kapıda hareketi algılayan parça hangisidir?"
    secenekler: ["Motor", "Hareket sensörü", "Kapı kolu", "İşlemci"]
    dogru: 1
    aciklama: "Hareket sensörü, yaklaşan kişiyi algılayan parçadır."
  - soru: "Park sensöründe bip sesini çıkaran hoparlör hangi parçadır?"
    secenekler: ["Sensör", "İşlemci", "Eyleyici", "Güç kaynağı"]
    dogru: 2
    aciklama: "Hoparlör, kararı sese çeviren bir eyleyicidir."
  - soru: "Akıllı sokak lambasında sensör-işlemci-eyleyici sırası nasıldır?"
    secenekler: ["Işık sensörü algılar, işlemci karar verir, LED yanar", "LED yanar, sensör algılar, işlemci karar verir", "İşlemci algılar, sensör karar verir", "Önce LED yanar, sonra ışık sensörü kontrol eder"]
    dogru: 0
    aciklama: "Sistem önce algılar, sonra karar verir, sonra harekete geçer."
---

Artık üç parçayı da tanıyorsun: **sensör**, **işlemci**, **eyleyici**. Şimdi bunları bir arada görelim.

Yalnızca robotlar değil, birçok **akıllı sistem** de bu üç parçayla çalışır: önce sensör algılar, sonra işlemci karar verir, son olarak eyleyici hareket eder veya etki üretir. Bir sistemi anlamak için şunu sor: "Burada hangi parça bilgi topluyor, hangi parça karar veriyor, hangi parça etki üretiyor?"

**Örnek — Otomatik kapı:** Hareket sensörü yaklaşan kişiyi algılar (sensör). İşlemci "biri yaklaşıyor, kapıyı aç" kararını verir (işlemci). Motor kapıyı açar (eyleyici).

**Örnek — Akıllı sokak lambası:** Işık sensörü havanın karardığını algılar (sensör). İşlemci "ışık azaldı, lambayı yak" kararını verir (işlemci). LED yanar (eyleyici).

**Örnek — Park sensörü:** Mesafe sensörü arabanın duvara yaklaştığını algılar (sensör). İşlemci "mesafe çok az, uyar" kararını verir (işlemci). Hoparlör bip sesi çıkarır (eyleyici).

![hepsi-bir-arada-kavram](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/2cdfe168-8988-4577-bce4-8ab5256e54bb.png)

> 💡 Sık yapılan hata: Bu üç adımın bir kez çalışıp bittiği sanılır. Oysa otomatik kapı da robot süpürge de algıla – karar ver – harekete geç adımlarını saniyede defalarca tekrarlar.

**Dene!** Aşağıdaki tabloyu tamamla (ilk satır örnek olarak doldurulmuş):

| Sistem | Sensör ne algılıyor? | İşlemci ne karar veriyor? | Eyleyici ne yapıyor? |
|---|---|---|---|
| Otomatik kapı | Yaklaşan kişiyi algılar | "Kapıyı aç" kararı verir | Motor kapıyı açar |
| Akıllı sokak lambası | ? | ? | ? |
| Park sensörü | ? | ? | ? |
| *(senin seçtiğin sistem, örn. otomatik musluk)* | ? | ? | ? |

![hepsi-bir-arada-dene](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/e0e55cef-6686-489f-a478-fc0e87763195.png)

**Bugün öğrendiklerin:**
- Yalnızca robotlar değil, birçok akıllı sistem de algıla, karar ver, hareket et adımlarıyla çalışır.
- Bu üç adım bir kez değil, saniyede defalarca tekrarlanır.
- Bir sistemi anlamak için sensör, işlemci ve eyleyici parçalarını ayrı ayrı bulmak gerekir.

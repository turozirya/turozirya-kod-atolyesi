---
kurs: robotik-giris
modul: kodlamanin-iki-yolu
slug: final-robotunu-tasarla
sira: 2
baslik: "Final: Robotunu Tasarla"
ozet: "Bu derste kurs boyunca öğrendiklerinle kendi robotunu baştan sona tasarlayıp sunacaksın."
sure: 40
puan: 20
kod_dili: sozde_kod
arac_linki: ""
malzemeler: ["Kâğıt, kalem ve cetvel", "Renkli kalemler"]
video: ""
ornek_kod: |
  1. Başla
  2. ESIK = 30   (sabit)
  3. Sürekli tekrarla:
       nem = toprak nemini ölç
       Eğer nem < ESIK ise:
           kırmızı LED'i yak
           uyarı sesi çal
       Değilse:
           yeşil LED'i yak
test:
  - soru: "Akıllı saksı projesinde “nem < ESIK mi?” hangi yapıdır?"
    secenekler: ["Eyleyici", "Karar", "Döngü", "Sabit"]
    dogru: 1
    aciklama: "Cevabı doğru ya da yanlış olan bir koşula göre iş seçilir; bu bir karardır."
  - soru: "Akıllı saksıda ESIK neden sabit olarak tanımlanmıştır?"
    secenekler: ["Metin olduğu için", "Sensörle ölçüldüğü için", "Program çalışırken değişmediği için", "Sensörün adı olduğu için"]
    dogru: 2
    aciklama: "ESIK hep 30 kalır; ölçülen ve değişen değer ise nem değişkenidir."
  - soru: "Akıllı saksıda uyarı sesini çalan hoparlör hangi parçadır?"
    secenekler: ["Eyleyici", "İşlemci", "Sensör", "Değişken"]
    dogru: 0
    aciklama: "Hoparlör, işlemcinin kararını sese çeviren bir eyleyicidir."
---

Bu kursta robotların parçalarını, devreleri, algoritmaları, kararları ve döngüleri öğrendin. Peki şimdi kendi robotunu baştan sona tasarlayabilir misin?

Bu derste bir **proje** yapacaksın. Proje adımları şunlardır:

1. **Sorun seç:** Okulunda ya da evinde küçük, gerçek bir sorun bul (Hatırla: Okulumuza Bir Robot dersi).
2. **Parçaları belirle:** Sensör, işlemci ve eyleyicilerini yaz (Modül 2).
3. **Devreyi çiz:** Eyleyicinin basit devre şemasını sembollerle çiz (Modül 3).
4. **Verileri belirle:** Hangi değişkenleri ve sabitleri kullanacaksın? (Modül 6)
5. **Algoritmayı yaz:** En az bir karar ve bir döngü içeren sözde kod yaz (Modül 7 ve 8).
6. **Akış şemasını çiz:** Sözde kodunu akış şemasına çevir (Modül 5).
7. **Sun:** Projeni sınıfa iki dakikada anlat.

Örnek: **Akıllı Saksı**. Sorun şu: Sınıftaki bitkiler susuz kalıyor. Robot toprağın nemini sürekli ölçer. Nem azsa kırmızı ışık yakar ve uyarı sesi çalar. Nem yeterliyse yeşil ışık yakar. Sözde kodu örnek kod kutusunda.

### Proje kartı

Örnek sütununa bak, sonra kendi projen için doldur.

| Bölüm | Örnek: Akıllı Saksı | Senin projen |
|---|---|---|
| Sorun | Sınıftaki bitkiler susuz kalıyor | |
| Sensör | Toprak nem sensörü | |
| İşlemci | micro:bit | |
| Eyleyiciler | Kırmızı ve yeşil LED, hoparlör | |
| Değişken | nem | |
| Sabit | ESIK = 30 | |
| Karar | nem < ESIK mi? | |
| Döngü | Sürekli tekrarla | |

![Final: Robotunu Tasarla — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/bd825001-79a3-4d2c-aeda-d420ae0dde1f.png)

> 💡 Sık yapılan hata: En karmaşık robotun en iyi proje olduğu sanılır. Küçük ama iyi düşünülmüş ve iyi anlatılan bir fikir daha değerlidir.

### Dene!

![Final: Robotunu Tasarla — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/b0205bad-a7b0-4cec-89f4-a80ffb01390b.png)

Proje kartını doldur. Sonra sözde kodunu, akış şemanı ve devre şemanı kâğıda çiz. Sunumdan önce şu listeyle kendini kontrol et:

- [ ] Sorun gerçek ve küçük mü?
- [ ] Sensör, işlemci ve eyleyicinin üçü de var mı?
- [ ] Devre şeması sembollerle mi çizildi?
- [ ] Sözde kodda en az bir karar ve bir döngü var mı?
- [ ] Akış şeması, sözde kodla aynı adımları mı gösteriyor?
- [ ] Projeni iki dakikada anlatabiliyor musun?

Bu tasarımı micro:bit ile Kodlama kursunda gerçekten yapabilirsin.

Şimdi giriş sorusuna dönelim. Evet, artık bir robotu parçalarından algoritmasına kadar tasarlayabilirsin. Kurs boyunca öğrendiğin her konu bu tasarımın bir parçası oldu.

### Bugün öğrendiklerin

- Bir robot projesi gerçek bir sorunla başlar.
- Tasarım; parçaları, devreyi, verileri, algoritmayı ve akış şemasını kapsar.
- Küçük ama iyi düşünülmüş bir proje, büyük ve belirsiz bir fikirden daha değerlidir.

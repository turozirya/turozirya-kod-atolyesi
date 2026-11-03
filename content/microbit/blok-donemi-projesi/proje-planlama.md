---
kurs: microbit
modul: blok-donemi-projesi
slug: proje-planlama
sira: 0
baslik: "Proje Planlama"
ozet: "Bu derste blok döneminin projesini seçecek ve proje kartı ile akış şemasını hazırlayacaksın."
sure: 40
puan: 20
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["Kâğıt, kalem ve cetvel", "Seçtiğin projeye göre micro:bit, servo, LED ve krokodil kablolar"]
video: ""
ornek_kod: ""
test:
  - soru: "Kapı alarmı projesinde kapının açıldığını hangi sensör algılar?"
    secenekler: ["İvmeölçer (hareket)", "Hoparlör", "LED ekran", "Radyo"]
    dogru: 0
    aciklama: "Kapı açılınca kart hareket eder; bunu ivmeölçer algılar."
  - soru: "Proje planlamaya hangi adımla başlanır?"
    secenekler: ["Kodu yazmakla", "Malzeme toplamakla", "Gerçek bir sorun seçmekle", "Sunumu hazırlamakla"]
    dogru: 2
    aciklama: "Her proje çözülecek bir sorunla başlar."
  - soru: "Kapı alarmında öğretmen masasındaki karta “KAPI” mesajını hangi özellik gönderir?"
    secenekler: ["Pusula", "Mikrofon", "Işık sensörü", "Radyo"]
    dogru: 3
    aciklama: "Radyo, kablosuz mesaj gönderip alır."
---

Blok döneminde sensörleri, sesi, radyoyu, LED'leri ve servoyu öğrendin. Şimdi bunları birleştirerek kendi projeni yapmaya hazır mısın?

Bu ve bir sonraki ders bir **proje** dersidir. Bir arkadaşınla ikili çalışabilirsin. Bu derste planlayacak, bir sonraki derste yapıp sunacaksın.

**Proje fikirleri:**

| Proje | Kullanılan özellikler |
|---|---|
| Kapı alarmı | İvmeölçer, hoparlör, radyo |
| Otomatik bariyer (gelişmiş) | Işık sensörü, servo, hoparlör |
| Işığa dönen pano | Işık sensörü, servo |
| Adımsayar | İvmeölçer, değişken |
| Gürültü trafik ışığı | Mikrofon, harici LED |
| Kendi fikrin | Sen seç! |

**Planlama adımları** (Hatırla: Robotik Kodlamaya Giriş, Final: Robotunu Tasarla):

1. **Sorun:** Hangi gerçek sorunu çözüyorsun?
2. **Parçalar:** Sensör, işlemci ve eyleyiciler neler?
3. **Malzemeler:** Neye ihtiyacın var? Sınıfta var mı?
4. **Veriler:** Hangi değişkenleri kullanacaksın?
5. **Algoritma:** Ne zaman ne olacak? En az bir karar ve bir döngü olsun.
6. **Akış şeması:** Algoritmayı kâğıda çiz.
7. **İş bölümü:** İkili çalışıyorsan kim ne yapacak?

Örnek: **Kapı alarmı**. Kart kapının iç yüzüne bantlanır. Kapı açılınca kart hareket eder. İvmeölçer bunu algılar. Alarm kuruluysa hoparlör öter. Aynı anda radyo, öğretmen masasındaki ikinci karta “KAPI” mesajı gönderir.

### Proje kartı

| Bölüm | Örnek: Kapı alarmı | Senin projen |
|---|---|---|
| Sorun | Kapı açıldığında fark edilmiyor | |
| Sensör | İvmeölçer (`on shake`) | |
| Eyleyiciler | Hoparlör, LED ekran | |
| Ek özellik | Radyo ile ikinci karta mesaj | |
| Değişkenler | alarm (0 ya da 1) | |
| Karar | Alarm kurulu mu? | |
| Döngü | Alarm sesi 3 kez tekrar | |
| Malzemeler | 2 micro:bit, pil yuvası, bant | |

![Proje Planlama — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/a398b679-663e-44a5-b7e3-36050bd09bec.png)

> 💡 Sık yapılan hata: Proje çok büyük seçilir ve bitmez. Önce en basit çalışan hâlini planla. Zamanın kalırsa yeni özellikler eklersin.

### Dene!

![Proje Planlama — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/c193b007-f865-4434-b248-dc27225e7353.png)

Proje kartını doldur ve akış şemanı çiz. Planını öğretmenine göster ve onay al. Kontrol listesi:

- [ ] Sorun gerçek ve küçük mü?
- [ ] En az bir sensör ve bir eyleyici var mı?
- [ ] En az bir karar ve bir döngü var mı?
- [ ] Gereken malzemeler sınıfta var mı?
- [ ] Akış şeması çizildi mi?

Şimdi giriş sorusuna dönelim. Bir projeye hazır olmak, önce iyi bir plan yapmaktır. Proje kartın ve akış şeman hazırsa, kodlamaya hazırsın.

### Bugün öğrendiklerin

- Bir proje gerçek bir sorunla başlar.
- Proje kartı; parçaları, verileri, kararları ve döngüleri önceden planlamayı sağlar.
- Önce en basit çalışan hâl planlanır, sonra özellik eklenir.

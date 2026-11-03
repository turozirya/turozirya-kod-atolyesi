---
kurs: microbit
modul: final-projesi
slug: proje-tasarimi
sira: 0
baslik: "Final: Proje Tasarımı"
ozet: "Bu derste kendi Python projeni planlayacak, fonksiyonlara bölecek ve en basit çalışan hâlini kodlamaya başlayacaksın."
sure: 40
puan: 20
kod_dili: micropython
arac_linki: "https://python.microbit.org"
malzemeler: ["Kâğıt, kalem ve cetvel", "Seçtiğin projeye göre micro:bit, LED, servo ve krokodil kablolar"]
video: ""
ornek_kod: |
  from microbit import *

  # Sabit: gürültü eşiği (büyük harfle yazılır)
  ESIK = 128
  # Özellik 1: sessizken gülen yüz
  def sessiz():
      display.show(Image.HAPPY)
  # Özellik 2: gürültüde uyarı (servo ve radyo sonra eklenecek)
  def gurultulu():
      display.show(Image.ANGRY)

  while True:
      if microphone.sound_level() > ESIK:
          gurultulu()
      else:
          sessiz()
      sleep(200)
test:
  - soru: "Python projesine başlarken en iyi yol hangisidir?"
    secenekler: ["Bütün özellikleri bir kerede yazıp en sonda denemek", "Önce en basit çalışan hâli yazıp sonra özellikleri tek tek eklemek", "Önce sunumu hazırlayıp sonra kodu yazmak", "Kodu bir arkadaşından kopyalamak"]
    dogru: 1
    aciklama: "En basit çalışan hâl hep elinde olur; her yeni özellik eklendikçe denenir."
  - soru: "Örnek kodda ses seviyesi 150 ise ekranda ne görünür?"
    secenekler: ["Kızgın yüz", "Gülen yüz", "150", "Boş ekran"]
    dogru: 0
    aciklama: "150 > 128 doğrudur; gurultulu() fonksiyonu çağrılır ve kızgın yüz görünür."
  - soru: "Örnek kodda `ESIK` neden büyük harfle yazılmıştır?"
    secenekler: ["Python küçük harfli adları kabul etmez", "Ekranda büyük görünsün diye", "Program çalışırken değişmeyen bir sabit olduğunu göstermek için", "Daha hızlı çalışsın diye"]
    dogru: 2
    aciklama: "Python'da sabitler büyük harfle yazılır; bu, değerin programda değişmeyeceğini gösterir."
---

Bir yıl boyunca bloklarla ve Python'la çok şey öğrendin. Şimdi bunlarla kendi icadını yapmaya ne dersin?

Bu ve bir sonraki ders kursun **final projesidir**. Bir arkadaşınla ikili çalışabilirsin. Bu derste planlayacak ve kodlamaya başlayacaksın. Planlama adımlarını blok projesinden tanıyorsun (Hatırla: Modül 8 — Proje Planlama; Robotik Kodlamaya Giriş, Final: Robotunu Tasarla). Bu kez projeni Python'la yazacaksın.

**Proje fikirleri:**

| Proje | Kullanılan özellikler |
|---|---|
| Sessiz kütüphane uyarıcısı | Mikrofon, servo bayrak, radyo |
| Akıllı kapı zili | Logo, müzik, radyo |
| Su terazisi ve eğim ölçer | İvmeölçer, liste, fonksiyon |
| Kendi animasyonlu oyunun | Butonlar, Image listesi, rastgele sayı |
| Kendi fikrin | Sen seç! |

**Projeyi fonksiyonlara böl.** Python'da büyük bir projeyi küçük parçalara ayırmanın yolu fonksiyonlardır (Hatırla: Fonksiyonlar dersi). Projendeki her özelliği bir fonksiyon olarak düşün. Örneğin sessiz kütüphane uyarıcısının özellikleri şunlardır:

- `sessiz()`: Gülen yüz gösterir.
- `gurultulu()`: Kızgın yüz gösterir, servo bayrağı kaldırır, öğretmen kartına radyo mesajı gönderir.

**En basit çalışan hâl.** Örnek kod kutusundaki program, bu projenin ilk hâlidir. Henüz servo ve radyo yok, ama program çalışıyor. Sonraki adımda `gurultulu()` fonksiyonuna önce servoyu, sonra radyoyu eklersin. Her eklemeden sonra denersin.

### Proje kartı

| Bölüm | Örnek: Sessiz kütüphane uyarıcısı | Senin projen |
|---|---|---|
| Sorun | Kütüphanede ses yükselince fark edilmiyor | |
| Sensör | Mikrofon | |
| Eyleyiciler | LED ekran, servo bayrak | |
| Kütüphaneler (`import`) | `microbit`, `radio` | |
| Değişkenler ve sabitler | `ESIK = 128` | |
| Fonksiyonlar | `sessiz()`, `gurultulu()` | |
| Karar | Ses eşiği geçti mi? | |
| Döngü | `while True:` ile sürekli ölçüm | |
| Malzemeler | 2 micro:bit, servo, krokodil kablolar | |

![Final: Proje Tasarımı — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/d34addf8-41aa-41a9-857e-12a09c3e35ca.png)

> 💡 Sık yapılan hata: Proje çok büyük seçilir ve bitmez. Önce en basit çalışan hâli yaz. Zaman kalırsa yeni bir fonksiyon eklersin.

### Dene!

![Final: Proje Tasarımı — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/c2cf5d3d-b824-4c0c-90a2-201f60c2a6b5.png)

Proje kartını doldur. Sonra algoritmanın akış şemasını kâğıda çiz. Planını öğretmenine göster ve onay al. Onay alınca en basit çalışan hâli yazmaya başla ve simülatörde dene. Kontrol listesi:

- [ ] Sorun gerçek ve küçük mü?
- [ ] En az bir sensör ve bir eyleyici var mı?
- [ ] En az bir karar, bir döngü ve bir fonksiyon var mı?
- [ ] Gereken malzemeler sınıfta var mı?
- [ ] Akış şeması çizildi mi?
- [ ] En basit çalışan hâl simülatörde çalışıyor mu?

Şimdi giriş sorusuna dönelim. Bir yıl boyunca öğrendiklerin bir icat için yeterli. Projeni planladın, fonksiyonlara böldün ve ilk çalışan hâlini yazdın.

### Bugün öğrendiklerin

- Büyük bir proje, her özelliği bir fonksiyon olacak şekilde küçük parçalara bölünür.
- Önce en basit çalışan hâl yazılır, özellikler tek tek eklenir ve her adımda denenir.
- Proje kartı; sorunu, parçaları, kütüphaneleri, fonksiyonları ve algoritmayı özetler.

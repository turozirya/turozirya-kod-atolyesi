---
kurs: robotik-giris
modul: algila-dusun-harekete-gec
slug: islemci-robotun-beyni
sira: 1
baslik: "İşlemci: Robotun Beyni"
ozet: "Bu derste robotun karar veren parçasının nasıl çalıştığını öğreneceksin."
sure: 20
puan: 10
kod_dili: sozde_kod
ornek_kod: |
  GİRDİ: tampon sensörünü oku
  İŞLEM: eğer çarptıysan → geri çekil ve sağa dön
  ÇIKTI: tekerlekleri döndür
arac_linki: ""
malzemeler: []
video: ""
test:
  - soru: "Robot süpürge duvara çarptığında 'geri çekil' kararını hangi parça verir?"
    secenekler: ["Tampon sensörü", "İşlemci", "Tekerlek motoru", "Pil"]
    dogru: 1
    aciklama: "Sensör bilgiyi toplar, kararı işlemci verir, motor bu kararı uygular."
  - soru: "Girdi - işlem - çıktı sırasında 'girdi' nedir?"
    secenekler: ["Ekranda görünen sonuç", "İşlemcinin yaptığı hesap", "Sisteme giren bilgi", "Cihazın pili"]
    dogru: 2
    aciklama: "Girdi, sisteme dışarıdan giren ham bilgidir; örneğin tuşlanan sayı."
  - soru: "Telefonun ekranına dokunman hangi adımdır?"
    secenekler: ["Girdi", "İşlem", "Çıktı", "Kayıt"]
    dogru: 0
    aciklama: "Dokunma telefona giren bilgidir; açılan uygulama ise çıktıdır."
---

Sensör bilgiyi topladı. Şimdi bu bilgiyle kim karar veriyor?

Kararı veren parça **işlemci**dir. İşlemci, robotun beynidir; gelen bilgiyi inceler ve ne yapılacağına karar verir. Bilgisayarlar ve robotlar bilgiyi **girdi → işlem → çıktı** sırasıyla işler. Girdi, dışarıdan gelen ham bilgidir. İşlem, bu bilgiyle yapılan hesaplama veya karardır. Çıktı, ortaya çıkan sonuçtur.

Bunu bir hesap makinesinde görebilirsin: "5 + 3" tuşlarsın (girdi), makine bu sayıları toplar (işlem), ekranda "8" yazar (çıktı). Akıllı telefonunda da aynı mantık var. Ekrana dokunursun, bu **girdi**dir. Telefon hangi uygulamanın açılacağına karar verir, bu **işlem**dir. Ekranda uygulama açılır, bu **çıktı**dır.

**Örnek:** Bir robot süpürge, tampon sensörüyle "çarptım" bilgisini gönderir (girdi). **İşlemci**si "geri çekil ve sağa dön" kararını verir (işlem). Tekerlekler döner (çıktı).

[GÖRSEL rg-m2-01: Soldan sağa üç kutu ve oklar: Girdi → İşlem → Çıktı. Altında robot süpürge örneği: tampon sensörü "çarptım" (girdi) → işlemci "geri çekil ve sağa dön" (işlem) → tekerlekler döner (çıktı).]

> 💡 Sık yapılan hata: Girdi ile çıktı birbirine karıştırılır. Girdi her zaman sisteme **giren** bilgi, çıktı ise sistemden **çıkan** sonuçtur.

**Tartışmalı örnek:** Dokunmatik ekran hem girdi hem çıktı aygıtıdır: dokunman girdi, ekranda gördüğün çıktıdır.

**Dene!** Aşağıdaki tabloyu tamamla (ilk satır örnek olarak doldurulmuş):

| Cihaz | Girdi | İşlem | Çıktı |
|---|---|---|---|
| Hesap makinesi | "5 + 3" tuşlanır | Sayılar toplanır | "8" yazısı |
| Okul zili | ? | ? | ? |
| Asansör düğmesi | ? | ? | ? |
| Otomatik kapı | ? | ? | ? |
| Robot süpürge | ? | ? | ? |

Arkadaşınla tablonu karşılaştır.

micro:bit kartının arkasındaki küçük çiplerden biri de işlemcidir; micro:bit ile Kodlama kursunda onu programlayacaksın.

**Bugün öğrendiklerin:**
- İşlemci, robotun karar veren beynidir.
- Bilgi işlenirken üç adım vardır: girdi, işlem, çıktı.
- Girdi dışarıdan gelen bilgi, çıktı ise ortaya çıkan sonuçtur.

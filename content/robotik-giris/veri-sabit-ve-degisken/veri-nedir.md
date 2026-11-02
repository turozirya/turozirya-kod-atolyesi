---
kurs: robotik-giris
modul: veri-sabit-ve-degisken
slug: veri-nedir
sira: 0
baslik: "Veri Nedir?"
ozet: "Bu derste veriyi tanıyacak, girdi verisi ile çıktı verisini ayırt edeceksin."
sure: 15
puan: 10
kod_dili: ""
arac_linki: ""
malzemeler: []
video: ""
ornek_kod: ""
test:
  - soru: "Hangisi bir veridir?"
    secenekler: ["Sensörün ölçtüğü 24 °C", "Sensörün kendisi", "Bir kablo", "Bir motor"]
    dogru: 0
    aciklama: "Veri, ölçülen ya da toplanan bilgidir; sensör, kablo ve motor birer parçadır."
  - soru: "Robot süpürge pilinin %35 dolu olduğunu ölçüyor. Bu ölçüm nedir?"
    secenekler: ["Çıktı verisi", "Girdi verisi", "Bir eyleyici", "Bir karar"]
    dogru: 1
    aciklama: "Ölçülen pil seviyesi robota giren bilgidir; bu bir girdi verisidir."
  - soru: "Kantin kasasının ekranında yazan toplam tutar nedir?"
    secenekler: ["Girdi verisi", "Bir sensör", "Çıktı verisi", "Bir işlemci"]
    dogru: 2
    aciklama: "Toplam tutar, kasanın hesaplayıp gösterdiği sonuçtur; bu bir çıktı verisidir."
---

Bir adımsayar, bugün kaç adım attığını nereden biliyor?

**Veri**, toplanan ve işlenebilen bilgidir. Bir sayı, bir kelime ya da bir ölçüm veri olabilir. Robotlar ve bilgisayarlar veriyle çalışır.

Veriyi iki gruba ayırabiliriz (Hatırla: Robotik Kodlamaya Giriş kursu, Modül 2 — girdi, işlem, çıktı):

- **Girdi verisi:** Sisteme giren veridir. Sensörün ölçtüğü sıcaklık, bir tuşa basılması ya da yazılan bir isim girdi verisidir.
- **Çıktı verisi:** Sistemin ürettiği sonuçtur. Ekranda görünen yazı ya da hesaplanan bir sayı çıktı verisidir.

Örnek: Bir adımsayarın içinde hareket sensörü vardır. Sen yürürken sensör her sallanmayı ölçer. Bu ölçümler girdi verisidir. İşlemci bu verilerden adımlarını sayar. Ekranda yazan “3500 adım” ise çıktı verisidir.

Robot süpürge de sürekli veri toplar. Tamponun çarpıp çarpmadığı bir veridir. Pilin yüzde kaç dolu olduğu da bir veridir.

> 💡 Sık yapılan hata: Verinin yalnızca sayı olduğu sanılır. Bir isim, bir renk ya da “evet” cevabı da veridir.

### Dene!

Her cihaz için bir girdi verisi ve bir çıktı verisi yaz.

| Cihaz | Girdi verisi | Çıktı verisi |
|---|---|---|
| Dijital termometre | Ölçülen sıcaklık: 24 | Ekranda “24 °C” yazısı |
| Adımsayar | | |
| Robot süpürge | | |
| Kantin kasası | | |
| Hesap makinesi | | |

Şimdi giriş sorusuna dönelim. Adımsayar, hareket sensörünün topladığı verileri kullanır. İşlemci bu verilerden adım sayısını hesaplar ve ekrana yazar.

### Bugün öğrendiklerin

- Veri, toplanan ve işlenebilen bilgidir.
- Girdi verisi sisteme giren, çıktı verisi sistemin ürettiği veridir.
- Sayılar kadar kelimeler ve “evet/hayır” cevapları da veridir.

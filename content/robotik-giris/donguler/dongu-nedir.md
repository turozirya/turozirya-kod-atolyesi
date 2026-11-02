---
kurs: robotik-giris
modul: donguler
slug: dongu-nedir
sira: 0
baslik: "Döngü Nedir?"
ozet: "Bu derste aynı adımları belirli sayıda tekrar eden sayılı döngüyü öğreneceksin."
sure: 15
puan: 10
kod_dili: sozde_kod
arac_linki: ""
malzemeler: []
video: ""
ornek_kod: |
  1. Başla
  2. 4 kez tekrarla:
       10 adım ileri git
       90 derece sağa dön
  3. Bitir
test:
  - soru: "“3 kez tekrarla: zıpla, alkışla” algoritmasında kaç kez alkış yapılır?"
    secenekler: ["1", "6", "3", "2"]
    dogru: 2
    aciklama: "Döngü 3 kez çalışır ve her turda bir kez alkışlanır."
  - soru: "Döngünün faydası nedir?"
    secenekler: ["Programı yavaşlatır", "Aynı adımları tekrar tekrar yazmadan tekrarlatır", "Sensörden daha çok veri toplar", "Robotu durdurur"]
    dogru: 1
    aciklama: "Döngü, tekrar eden adımları bir kez yazıp istediğimiz kadar çalıştırmamızı sağlar."
  - soru: "Kare çizen robotun döngüsünde “4 kez” yerine “3 kez” yazılırsa ne olur?"
    secenekler: ["Üçgen çizer", "Daha büyük bir kare çizer", "Hiç çizmez", "Kare tamamlanmaz, bir kenarı eksik kalır"]
    dogru: 3
    aciklama: "Dönüş açısı hâlâ 90 derece olduğu için üçgen oluşmaz; karenin bir kenarı eksik kalır."
---

Bir robota kare çizdirmek istiyorsun. Aynı iki komutu kaç kez yazman gerekir?

Kare çizmek için robot şunları yapar: ileri git, sağa dön. Bunu dört kez tekrarlar. Döngü olmadan algoritma 8 satır olur. Aynı iki satırı dört kez yazman gerekir.

**Döngü**, aynı adımları tekrar tekrar çalıştıran yapıdır. Kaç kez tekrar edileceği belliyse buna **sayılı döngü** denir. “4 kez tekrarla” bir sayılı döngüdür.

Örnek: Örnek kod kutusuna bak. Kare çizme algoritması döngüyle yalnızca birkaç satır oldu. Döngünün içindeki adımlar biraz içeriden yazılır. Böylece hangi adımların tekrar edileceği anlaşılır. Bu içeriden yazma alışkanlığı Python'da çok önemli olacak.

Döngünün üç faydası vardır:

- Algoritma kısalır.
- Aynı satırı tekrar tekrar yazarken hata yapma ihtimali azalır.
- Bir şeyi değiştirmek kolaylaşır. Kenar uzunluğunu tek bir yerden değiştirirsin.

Robotlar döngüyü çok kullanır. Fabrika robotu aynı parçayı takmak için aynı hareketi binlerce kez tekrarlar (Hatırla: Robotlar Nerede Çalışır? dersi).

> 💡 Sık yapılan hata: “4 kez tekrarla” içindeki her adımın toplam 4 kez çalıştığı unutulur. Kare algoritmasında robot 4 kez ilerler ve 4 kez döner. Yani toplam 8 adım çalışır.

### Dene!

Robotun düzgün şekiller çizmesi için kaç kez tekrar etmesi gerektiğini yaz. Dönüş açıları verilmiştir.

| Şekil | Kaç kez tekrar? | Her turdaki dönüş |
|---|---|---|
| Kare | 4 | 90 derece |
| Eşkenar üçgen | | 120 derece |
| Düzgün altıgen | | 60 derece |

Sonra birinin sözde kodunu döngüyle yaz. Bir arkadaşın robot olsun ve kodunu okuyarak yerde şekli yürüsün.

Şimdi giriş sorusuna dönelim. Döngü olmadan iki komutu dört kez, yani 8 satır yazman gerekir. Döngüyle bu iki komutu bir kez yazıp 4 kez tekrarlatırsın.

### Bugün öğrendiklerin

- Döngü, aynı adımları tekrar tekrar çalıştıran yapıdır.
- Kaç kez tekrar edileceği belli olan döngüye sayılı döngü denir.
- Döngünün içindeki adımlar içeriden yazılır.

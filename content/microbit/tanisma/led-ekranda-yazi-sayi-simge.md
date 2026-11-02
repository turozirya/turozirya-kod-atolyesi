---
kurs: microbit
modul: tanisma
slug: led-ekranda-yazi-sayi-simge
sira: 2
baslik: "LED Ekranda Yazı, Sayı, Simge"
ozet: "Bu derste LED ekranda yazı, sayı ve hazır simgeler göstereceksin."
sure: 20
puan: 10
kod_dili: blocks
arac_linki: "[MAKECODE LİNKİ]"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
test:
  - soru: "Uzun bir kelimeyi LED ekranda göstermek istersen ne olur?"
    secenekler: ["Harfler sağdan sola kayarak geçer", "Sadece ilk harf görünür", "Harfler küçülerek sığdırılır", "Kelime ikiye bölünüp iki satırda görünür"]
    dogru: 0
    aciklama: "LED ekran küçük olduğu için uzun yazılar sağdan girip sola doğru kayar."
  - soru: "'show number 7' ile 'show number 25' arasındaki fark nedir?"
    secenekler: ["Hiçbir fark yoktur", "7 sabit görünür, 25 kayar", "25 hiç görünmez", "İkisi de kayar"]
    dogru: 1
    aciklama: "Tek basamaklı sayı (7) sabit görünür; iki basamaklı sayı (25) da yazı gibi kayar."
  - soru: "Hazır bir kalp simgesi göstermek için hangi blok kullanılır?"
    secenekler: ["show icon", "show number", "show string", "show leds"]
    dogru: 0
    aciklama: "'show icon' bloğu, kalp gibi hazır çizimleri doğrudan LED ekranda gösterir."
---

MakeCode ile ilk programını yazdın. Şimdi LED ekranda **yazı**, **sayı** ve **simge** göstermeyi öğreneceksin.

LED ekran sadece 5x5 noktadan oluşur; bu yüzden tek seferde yalnızca kısa bir şey gösterebilir. Uzun bir yazı yazdığında, harfler sağdan girip sola doğru **kayarak** geçer. "show string" bloğu yazı için, "show number" bloğu ise bir rakamı göstermek için kullanılır. Tek basamaklı bir sayı (örneğin 7) sabit görünür; daha uzun bir sayı (örneğin 25) da yazı gibi kayar.

MakeCode'da ayrıca **hazır simgeler** bulunur: kalp, gülen yüz, ördek, ev, zürafa gibi. "show icon" bloğunu seçip listeden istediğin simgeyi seçersin; LED ekran o deseni anında gösterir. Bir ok göstermek istersen, ayrı bir "show arrow" bloğu kullanılır.

**Örnek:** Önce "show string" bloğuna kendi adını yaz. Altına "pause (ms)" bloğu ekle (ms = milisaniye; 1000 ms = 1 saniye). Sonra "show icon" bloğunu ekleyip kalp simgesini seç. Program çalıştığında ekranda önce adın kayar, sonra kalp görünür — bir **isim kartı** oluşturdun.

![led-ekranda-yazi-sayi-simge-kavram](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/00f31874-ce2e-48bd-9640-8167c5e59090.png)

> 💡 "show string" yazı (metin) içindir, "show number" sayı içindir. Bunlar farklı veri türleridir (Hatırla: Robotik Kodlamaya Giriş kursu, Modül 6). İleride bir değişkendeki sayıyı göstermek için "show number" kullanacaksın.

**Dene!** MakeCode'da kendi isim kartını hazırla: adın ("show string"), ardından yaşın ("show number" — tek basamaklıysa sabit, iki basamaklıysa kayarak görünür), ardından sevdiğin bir simge ("show icon"). Bloklar arasına "pause (ms)" blokları ekleyerek her birinin görünme süresini ayarla. Simülatörde dene, beğendiğinde karta yükle.

![led-ekranda-yazi-sayi-simge-dene](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/5611c81b-5a53-46f6-97e5-0ad558273b2a.png)

**Bugün öğrendiklerin:**
- Uzun yazılar ve iki basamaklı sayılar LED ekranda kayarak gösterilir.
- "show number" bloğu tek basamaklı sayıları sabit, uzun sayıları kayarak gösterir.
- "show icon" bloğuyla hazır çizimler (kalp, ördek gibi) gösterilebilir.

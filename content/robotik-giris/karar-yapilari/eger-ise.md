---
kurs: robotik-giris
modul: karar-yapilari
slug: eger-ise
sira: 0
baslik: "Eğer… İse"
ozet: "Bu derste tek koşullu karar yapısını öğrenecek ve akış şemasında göstereceksin."
sure: 20
puan: 10
kod_dili: sozde_kod
arac_linki: ""
malzemeler: []
video: ""
ornek_kod: |
  1. Başla
  2. Hava durumuna bak
  3. Eğer yağmur yağıyorsa:
       şemsiyeni al
  4. Evden çık
  5. Bitir
test:
  - soru: "Hangisi bir koşuldur?"
    secenekler: ["Şemsiyeni al", "Yağmur yağıyor mu?", "Evden çık", "Bitir"]
    dogru: 1
    aciklama: "Koşul, cevabı doğru ya da yanlış olan bir sorudur."
  - soru: "Örnek koddaki algoritmada hava güneşliyse ne olur?"
    secenekler: ["Program durur", "Şemsiye alınır", "Şemsiye alınmadan evden çıkılır", "Hava durumuna tekrar bakılır"]
    dogru: 2
    aciklama: "Koşul yanlış olduğu için 3. adımdaki iş atlanır ve 4. adıma geçilir."
  - soru: "“Eğer tampon çarptıysa: geri çekil” kuralında tampon çarpmazsa robot ne yapar?"
    secenekler: ["Geri çekilmeden çalışmaya devam eder", "Kapanır", "Yine geri çekilir", "Hata verir"]
    dogru: 0
    aciklama: "Koşul yanlışsa “geri çekil” işi atlanır; robot sonraki adımlarla devam eder."
---

Sabah evden çıkmadan önce camdan bakarsın. Şemsiye alıp almayacağına nasıl karar verirsin?

**Karar yapısı**, bir koşula göre ne yapılacağını seçen yapıdır. En basit hali şöyledir: **Eğer** koşul doğruysa, şu işi yap.

**Koşul**, cevabı doğru ya da yanlış olan bir sorudur (Hatırla: Veri Türleri dersi). “Yağmur yağıyor mu?” bir koşuldur. Cevabı ya doğrudur ya yanlıştır.

Örnek: Örnek kod kutusundaki algoritmaya bak. 3. adımda bir koşul var. Yağmur yağıyorsa şemsiye alınır. Yağmur yağmıyorsa bu iş atlanır ve doğrudan 4. adıma geçilir. Koşula bağlı iş biraz içeriden yazılır. Böylece hangi işin koşula bağlı olduğu anlaşılır.

Akış şemasında karar, eşkenar dörtgenle gösterilir. Ondan iki ok çıkar: “Evet” ve “Hayır”.

![semsiye-karar-semasi](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/dd155b3e-033f-4e38-ab41-9dc897b14742.png)

Robotlar da sürekli böyle kararlar verir. Robot süpürgenin kuralı şöyledir: Eğer tampon çarptıysa, geri çekil ve dön (Hatırla: Robotik Kodlamaya Giriş kursu, Modül 2).

> 💡 Sık yapılan hata: Koşul yanlış olunca programın durduğu sanılır. Program durmaz. Yalnızca koşula bağlı işi atlar ve devam eder.

### Dene!

Her durum için koşulu ve koşul doğruysa yapılacak işi yaz. Sonra birini seç ve sözde kodunu yaz.

| Durum | Koşul | Koşul doğruysa ne yapılır? |
|---|---|---|
| Sınıf karardı | Işık az mı? | Lambaları yak |
| Telefonun pili azaldı | | |
| Robot süpürgenin önünde merdiven var | | |
| Su ısıtıcısında su kaynadı | | |

Şimdi giriş sorusuna dönelim. Camdan bakıp “Yağmur yağıyor mu?” koşulunu kontrol edersin. Koşul doğruysa şemsiyeyi alırsın. Bu bir “eğer… ise” kararıdır.

### Bugün öğrendiklerin

- Karar yapısı, bir koşula göre ne yapılacağını seçer.
- Koşul, cevabı doğru ya da yanlış olan bir sorudur.
- Koşul yanlışsa koşula bağlı iş atlanır, program devam eder.

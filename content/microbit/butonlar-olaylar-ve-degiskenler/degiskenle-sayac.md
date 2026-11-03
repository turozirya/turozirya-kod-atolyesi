---
kurs: microbit
modul: butonlar-olaylar-ve-degiskenler
slug: degiskenle-sayac
sira: 1
baslik: "Değişkenle Sayaç"
ozet: "Bu derste değişkeni artıran, azaltan ve sıfırlayan bir kişi sayacı yapacaksın."
sure: 20
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: ""
test:
  - soru: "`change kisi by -1` bloğu ne yapar?"
    secenekler: ["kisi değişkenini siler", "kisi değişkenini 1 azaltır", "kisi değişkeninin değerini −1 yapar", "Ekranda −1 gösterir"]
    dogru: 1
    aciklama: "`change … by` değeri değiştirir; −1 yazınca değer bir azalır."
  - soru: "kisi 4 iken A'ya 2 kez, B'ye 1 kez basılırsa ekranda ne görünür?"
    secenekler: ["7", "6", "3", "5"]
    dogru: 3
    aciklama: "4 + 2 − 1 = 5 olur."
  - soru: "Neden her olayın sonuna `show number kisi` koyduk?"
    secenekler: ["Ekran değişkenin yeni değerini kendiliğinden göstermediği için", "Programı hızlandırmak için", "Değişkeni sıfırlamak için", "Değişkeni kaydetmek için"]
    dogru: 0
    aciklama: "Değişken değişse bile ekran kendiliğinden güncellenmez; göstermek için blok gerekir."
---

Okul kapısından kaç kişinin girdiğini saymak için bir sayaç yapabilir misin?

Değişkeni daha önce simülatörde kullandın (Hatırla: Robotik Kodlamaya Giriş, Modül 6 — Değişken: Etiketli Kutu). Şimdi gerçek kartta, daha gelişmiş bir sayaç yapacağız. Sayacımız artacak, azalacak ve sıfırlanacak.

Önce `Variables` kategorisinde `Make a Variable...` ile **kisi** adlı bir değişken oluştur. Sonra şu programı kur:

```
on start
    set kisi to 0
    show number kisi
on button A pressed
    change kisi by 1
    show number kisi
on button B pressed
    change kisi by -1
    show number kisi
on button A+B pressed
    set kisi to 0
    show number kisi
```

- A, sayacı 1 artırır: biri içeri girdi.
- B, sayacı 1 azaltır: yanlışlıkla basıldıysa düzeltir.
- A ile B birlikte, sayacı sıfırlar.

MakeCode'da ayrı bir “azalt” bloğu yoktur. `change kisi by -1` yazınca değer bir azalır.

Değişken değişince ekran kendiliğinden güncellenmez. Bu yüzden her olayın sonunda `show number kisi` bloğu var. Sayı 10'u geçince iki basamaklı olur ve ekranda kayarak görünür (Hatırla: LED Ekranda Yazı, Sayı, Simge dersi).

![Değişkenle Sayaç — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/afd96315-414b-43fd-8465-48f06c56b4b9.png)

> 💡 Sık yapılan hata: `change kisi by -1` bloğunun değişkeni −1 yaptığı sanılır. Bu blok değeri −1 yapmaz, değeri 1 azaltır. Değeri doğrudan değiştirmek için `set` bloğu kullanılır.

### Dene!

![Değişkenle Sayaç — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/db0cd107-5136-45ae-8a27-78aa30d7042c.png)

Sayacını kur ve aşağıdakileri sırayla dene.

| Ne yaptın? | Ekranda ne gördün? |
|---|---|
| Kart açıldı | 0 |
| A'ya 3 kez bastım | |
| B'ye 1 kez bastım | |
| A ile B'ye birlikte bastım | |
| Sayı 0 iken B'ye bastım | |

Son satıra dikkat et. Sayaç −1 gösterir. Ama kapıdan eksi bir kişi giremez! Bu hatayı bir sonraki modülde bir karar bloğuyla düzelteceksin.

Şimdi giriş sorusuna dönelim. Evet, yapabilirsin. Bir değişken ve üç olay bloğuyla artan, azalan ve sıfırlanan bir kişi sayacı yaptın.

### Bugün öğrendiklerin

- `change … by 1` değeri artırır, `change … by -1` azaltır.
- `set … to 0` değişkeni sıfırlar.
- Değişken değişince ekranı güncellemek için `show number` gerekir.

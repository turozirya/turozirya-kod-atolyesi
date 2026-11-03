---
kurs: microbit
modul: butonlar-olaylar-ve-degiskenler
slug: a-ve-b-butonlari
sira: 0
baslik: "A ve B Butonları"
ozet: "Bu derste olay kavramını öğrenecek ve butonlara basınca çalışan programlar yazacaksın."
sure: 20
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: ""
test:
  - soru: "`on button A pressed` bloğunun içindeki bloklar ne zaman çalışır?"
    secenekler: ["Sürekli, durmadan", "Yalnızca bir kez, en sonda", "Program açılır açılmaz", "A düğmesine her basıldığında"]
    dogru: 3
    aciklama: "Olay bloğu, olay her gerçekleştiğinde çalışır; burada olay A'ya basılmasıdır."
  - soru: "Çalışma alanında `on button B pressed` bloğu, `on button A pressed` bloğunun üstünde duruyor. Ne değişir?"
    secenekler: ["B her zaman önce çalışır", "İki blok aynı anda çalışır", "Hiçbir şey değişmez; hangisinin çalışacağını basılan düğme belirler", "A düğmesi artık çalışmaz"]
    dogru: 2
    aciklama: "Olay bloklarının çalışma alanındaki yeri önemli değildir."
  - soru: "A ve B'ye aynı anda basınca kalp göstermek için hangi blok kullanılır?"
    secenekler: ["`on button A pressed`", "`on button A+B pressed`", "`on shake`", "`forever`"]
    dogru: 1
    aciklama: "`on button A+B pressed` iki düğmeye birlikte basılınca çalışır."
---

Oyun kumandasında bir tuşa basınca karakter hemen zıplar. Program tuşa basıldığını nereden bilir?

**Olay**, programın beklediği bir şeyin gerçekleşmesidir. Bir düğmeye basılması ya da kartın sallanması birer olaydır. Olay gerçekleşince, o olaya bağlı bloklar çalışır.

MakeCode'da olay blokları `on` kelimesiyle başlar. `on start` (başlangıçta) bloğunu tanıyorsun. Bu derste `Input` (girdi) kategorisindeki `on button A pressed` (A'ya basılınca) bloğunu kullanacağız. A ve B butonları birer sensördür (Hatırla: micro:bit'i Tanıyalım dersi).

Şu programı kur:

```
on button A pressed
    show icon (gülen yüz)
on button B pressed
    show icon (üzgün yüz)
```

1. `Input` kategorisinden `on button A pressed` bloğunu çalışma alanına sürükle.
2. `Basic` kategorisinden `show icon` (simge göster) bloğunu içine koy ve gülen yüzü seç.
3. Aynı işi B için yap. Bloğun üzerindeki `A` yazısına tıklayıp `B` seçebilirsin; üzgün yüzü seç.
4. Simülatörde A ve B düğmelerine bas. Sonra programı karta yükle.

Bu program yukarıdan aşağı çalışmaz. Kart bekler. Hangi düğmeye basarsan o olayın blokları çalışır.

İki düğmeye birlikte basılmasını da algılayabilirsin. Bunun için düğme seçiminden `A+B` seçilir: `on button A+B pressed`.

![A ve B Butonları — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/a9ce53f5-36d7-4447-85d0-de2458944ad6.png)

> 💡 Sık yapılan hata: Olay bloklarının yukarıdan aşağı sırayla çalıştığı sanılır. Olay blokları sırayla değil, olay gerçekleştiğinde çalışır. Çalışma alanındaki yerleri önemli değildir.

### Dene!

![A ve B Butonları — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/0db0d9c7-00e9-45bc-b9b7-f86b1ff439b1.png)

Programına `on button A+B pressed` ekle ve içine kalp simgesi koy. Sonra aşağıdakileri dene.

| Ne yaptın? | Ekranda ne gördün? |
|---|---|
| A'ya bastım | Gülen yüz |
| B'ye bastım | |
| A ile B'ye aynı anda bastım | |
| Hiçbir düğmeye basmadım | |

Şimdi giriş sorusuna dönelim. Program tuşa basılmasını bir olay olarak bekler. Olay gerçekleşince, ona bağlı bloklar hemen çalışır.

### Bugün öğrendiklerin

- Olay, programın beklediği bir şeyin gerçekleşmesidir.
- `on button A pressed` bloğu, A'ya her basıldığında çalışır.
- Olay bloklarının çalışma alanındaki yeri önemli değildir.

---
kurs: microbit
modul: ses-ve-muzik
slug: notalarla-sarki
sira: 1
baslik: "Notalarla Şarkı"
ozet: "Bu derste notaları ve vuruş sürelerini kullanarak tanıdık bir ezgiyi çalacaksın."
sure: 25
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: ""
test:
  - soru: "MakeCode'da “Sol” notası hangi harfle gösterilir?"
    secenekler: ["D", "S", "G", "A"]
    dogru: 2
    aciklama: "Do-Re-Mi-Fa-Sol-La-Si, C-D-E-F-G-A-B harflerine karşılık gelir; Sol = G."
  - soru: "`play tone Middle C for 2 beats` bloğu, `for 1 beat` olandan nasıl farklıdır?"
    secenekler: ["İki kez çalar", "İki kat uzun çalar", "Daha tiz çalar", "Daha yüksek sesle çalar"]
    dogru: 1
    aciklama: "Vuruş sayısı notanın ne kadar uzun çalacağını belirler."
  - soru: "Bütün şarkıyı hızlandırmak için ne değiştirilir?"
    secenekler: ["Tempo (bpm)", "Notaların adları", "LED parlaklığı", "Radyo grubu"]
    dogru: 0
    aciklama: "Tempo büyüdükçe vuruşlar kısalır ve şarkı hızlanır."
---

Do, Re, Mi'yi müzik dersinden biliyorsun. micro:bit bu notaları çalabilir mi?

Her **nota** belli bir yükseklikte bir sestir. Türkçede notalara Do, Re, Mi deriz. MakeCode ise İngilizce harfler kullanır:

| Türkçe | Do | Re | Mi | Fa | Sol | La | Si |
|---|---|---|---|---|---|---|---|
| MakeCode | C | D | E | F | G | A | B |

`Music` kategorisindeki `play tone Middle C for 1 beat` (orta Do'yu 1 vuruş çal) bloğu tek bir nota çalar. Nota adına tıklarsan bir piyano klavyesi açılır; istediğin notayı oradan seçebilirsin. `Middle` orta sesleri, `High` daha tiz sesleri, `Low` daha kalın sesleri gösterir.

**Vuruş** (beat), notanın ne kadar uzun çalacağıdır. `1 beat` bir vuruş, `2 beats` iki vuruş, `1/2 beat` yarım vuruştur. **Tempo** ise şarkının hızıdır. `set tempo to 120 (bpm)` bloğuyla ayarlanır; sayı büyüdükçe şarkı hızlanır.

Örnek: “Parla Parla Küçük Yıldız” ezgisinin ilk kısmı:

```
on button A pressed
    play tone Middle C for 1 beat
    play tone Middle C for 1 beat
    play tone Middle G for 1 beat
    play tone Middle G for 1 beat
    play tone Middle A for 1 beat
    play tone Middle A for 1 beat
    play tone Middle G for 2 beats
```

Notalar: Do Do Sol Sol La La Sol. Son nota iki vuruş sürer.

![Notalarla Şarkı — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/ef83b27b-582d-4584-b9e8-04d2ab51fd75.png)

> 💡 Dikkat: Türkçedeki “La” notası MakeCode'da A, “Si” notası ise B harfidir. Harfler alfabedeki gibi A'dan başlamaz; Do = C'den başlar.

### Dene!

![Notalarla Şarkı — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/7b524ce1-1d36-4ac7-bf41-e3b16b7e606d.png)

Ezginin ikinci kısmını sen ekle: Fa Fa Mi Mi Re Re Do. Son nota (Do) iki vuruş sürsün. Önce tabloyu doldur.

| Nota (Türkçe) | MakeCode | Vuruş |
|---|---|---|
| Fa | Middle F | 1 |
| Fa | | |
| Mi | | |
| Mi | | |
| Re | | |
| Re | | |
| Do | | 2 |

Sonra `on start` içine `set tempo to 160 (bpm)` ekle. Şarkı nasıl değişti?

Şimdi giriş sorusuna dönelim. Evet, çalabilir. Her notayı bir `play tone` bloğuyla, doğru harf ve vuruş süresiyle yazarız.

### Bugün öğrendiklerin

- Do Re Mi Fa Sol La Si, MakeCode'da C D E F G A B harfleridir.
- Vuruş notanın süresini, tempo şarkının hızını belirler.
- `play tone` bloğu tek bir nota çalar.

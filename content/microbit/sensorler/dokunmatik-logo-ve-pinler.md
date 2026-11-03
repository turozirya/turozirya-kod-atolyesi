---
kurs: microbit
modul: sensorler
slug: dokunmatik-logo-ve-pinler
sira: 4
baslik: "Dokunmatik Logo ve Pinler"
ozet: "Bu derste logoya ve pinlere dokunmayı algılayan bir dokunmatik zil yapacaksın."
sure: 20
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: ""
test:
  - soru: "P0 pinine dokunma olayının çalışması için ne gerekir?"
    secenekler: ["A düğmesine basmak", "Kartı sallamak", "Diğer elinle GND'ye dokunmak", "Logoya da dokunmak"]
    dogru: 2
    aciklama: "Pinlerde dokunma, vücudun üzerinden GND'ye giden çok küçük bir akımla algılanır."
  - soru: "Logoya dokunmayı hangi blok algılar?"
    secenekler: ["`on pin P0 pressed`", "`on button A pressed`", "`on shake`", "`on logo pressed`"]
    dogru: 3
    aciklama: "`on logo pressed`, ön yüzdeki altın renkli logoya dokunulunca çalışır."
  - soru: "Bir robota kolay bir dokunmatik “durdur” düğmesi eklemek istiyorsun. Hangisi en kolay çözümdür?"
    secenekler: ["Logoya `on logo pressed` ile durdurma görevi vermek", "Hoparlörü kullanmak", "Işık sensörünü kapatmak", "Pusulayı kullanmak"]
    dogru: 0
    aciklama: "Logo tek dokunuşla çalışır; GND'ye dokunmak gerekmez."
---

Telefon ekranına dokununca telefon bunu anlar. micro:bit de dokunmayı algılayabilir mi?

micro:bit'te dokunmayı algılayan iki yer vardır:

- **Logo:** Kartın ön yüzündeki altın renkli logo dokunmaya duyarlıdır. `Input` kategorisindeki `on logo pressed` (logoya dokunulunca) bloğu bunu algılar.
- **Pinler:** Kartın alt kenarındaki büyük delikli altın şeritlere **pin** denir. P0, P1 ve P2 pinleri de dokunmayı algılayabilir. `on pin P0 pressed` (P0'a dokunulunca) bloğu kullanılır.

Aradaki önemli fark şudur: Logoya yalnızca dokunmak yeter. Pinlerde ise bir elinle **GND** pinine, diğer elinle P0'a dokunmalısın. GND, kartın “eksi” ucudur.

![Dokunmatik Logo ve Pinler — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/5fc1a192-333e-48fe-83df-e969ceeea9a3.png)

**Tartışmalı örnek:** Neden fark var? Pinler, vücudunun üzerinden GND'ye giden çok küçük bir akımla dokunmayı anlar. Bu akım hissedilmeyecek kadar küçüktür ve zararsızdır. Logo ise başka bir yöntemle çalışır ve GND'ye ihtiyaç duymaz.

Dokunmatik zil programı:

```
on logo pressed
    show icon (gülen yüz)
    play tone Middle C for 1 beat
on pin P0 pressed
    show number 0
on pin P1 pressed
    show number 1
```

`play tone` (nota çal) bloğu `Music` kategorisindedir. Onu bir sonraki modülde ayrıntılı göreceksin. Blok adının sonunda MakeCode sürümüne göre `until done` gibi ek kelimeler görebilirsin.

> 💡 Dikkat: Pinlere dokunurken bir elinle GND'ye de dokunmalısın. Logo için buna gerek yoktur.

### Dene!

![Dokunmatik Logo ve Pinler — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/27a376aa-426f-499b-8d7c-a9f0b58cca80.png)

Programı karta yükle ve dene. Simülatörde logoya ve pinlere fareyle tıklayabilirsin.

| Dokunduğum yer | GND'ye dokunuyor muyum? | Çalıştı mı? |
|---|---|---|
| Logo | Hayır | Evet |
| P0 | Hayır | |
| P0 | Evet | |
| P1 | Evet | |

Şimdi giriş sorusuna dönelim. Evet, algılayabilir. Logo tek dokunuşla, pinler ise GND ile birlikte dokunulunca çalışır.

### Bugün öğrendiklerin

- `on logo pressed` logoya dokunulunca çalışır.
- `on pin P0 pressed` için bir elinle GND'ye de dokunmalısın.
- Pinlerden geçen dokunma akımı çok küçük ve zararsızdır.

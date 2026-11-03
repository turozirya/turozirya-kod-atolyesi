---
kurs: microbit
modul: butonlar-olaylar-ve-degiskenler
slug: rastgele-sayi-zar
sira: 2
baslik: "Rastgele Sayı: Zar"
ozet: "Bu derste rastgele sayı ve sallama olayıyla bir elektronik zar yapacaksın."
sure: 20
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: ""
test:
  - soru: "`pick random 1 to 6` hangi sayıları verebilir?"
    secenekler: ["0'dan 6'ya kadar", "1, 2, 3, 4, 5 ve 6", "1, 2, 3, 4 ve 5", "Yalnızca 2, 3, 4 ve 5"]
    dogru: 1
    aciklama: "İki sınır da dahildir; 1 de 6 da gelebilir."
  - soru: "Kart sallanınca zarın atılması için hangi olay bloğu kullanılır?"
    secenekler: ["`on button A pressed`", "`on start`", "`on shake`", "`forever`"]
    dogru: 2
    aciklama: "`on shake` bloğu, ivmeölçer kartın sallandığını algılayınca çalışır."
  - soru: "Zarı 10 kez attın ve 6 hiç gelmedi. Bu ne demektir?"
    secenekler: ["Kart bozuktur", "6 bu blokla hiç gelemez", "Program hatalıdır", "Az atışta böyle olabilir; rastgele sayılar kısa sürede eşit dağılmaz"]
    dogru: 3
    aciklama: "Rastgele sonuçlar az denemede dengesiz olabilir; atış arttıkça dengelenir."
---

Gerçek bir zarı attığında hangi sayının geleceğini bilebilir misin? Peki bilgisayar rastgele bir sayı tutabilir mi?

**Rastgele sayı**, önceden tahmin edilemeyen bir sayıdır. Zar atmak, kura çekmek ve oyunlarda sürpriz olaylar rastgele sayılarla yapılır.

MakeCode'da `Math` kategorisindeki `pick random 1 to 6` (1 ile 6 arasında rastgele seç) bloğu bir sayı tutar. İki sınır da dahildir; yani 1 de 6 da gelebilir.

Zarımız kart sallanınca atılsın. Bunun için `Input` kategorisindeki `on shake` (sallanınca) olay bloğunu kullanacağız. Sallanmayı kartın ivmeölçeri algılar (Hatırla: micro:bit'i Tanıyalım dersi).

Önce **zar** adlı bir değişken oluştur. Sonra şu programı kur:

```
on shake
    set zar to pick random 1 to 6
    show number zar
```

Simülatörde `SHAKE` düğmesine basarak dene. Sonra programı karta yükle ve kartı salla.

**Tartışmalı örnek:** Bilgisayarın tuttuğu sayı gerçekten rastgele mi? Aslında sayı bir hesapla üretilir. Ama hesap o kadar karışıktır ki sonucu önceden tahmin edemeyiz. Buna **sözde rastgele** sayı denir.

![Rastgele Sayı: Zar — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/0710131f-3c5b-4102-be26-fc463802f14d.png)

> 💡 Sık yapılan hata: Rastgele sayıların her zaman eşit dağılacağı sanılır. 10 atışta bir sayı hiç gelmeyebilir. Atış sayısı arttıkça sayılar birbirine yaklaşır.

### Dene!

![Rastgele Sayı: Zar — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/d45e7766-d9d3-463c-b17f-ba60a385b755.png)

Zarını 12 kez at ve gelen sayıları yaz. Hangi sayı kaç kez geldi?

| Atış | Gelen sayı |
|---|---|
| 1 | 4 |
| 2 | |
| 3 | |
| 4 | |
| 5 | |
| 6 | |
| 7–12 | |

Sonra zarını değiştir: `pick random 1 to 20` yaparak 20 yüzlü bir zar oluştur.

Şimdi giriş sorusuna dönelim. Gerçek zarda sonucu bilemezsin. Bilgisayar da `pick random` bloğuyla önceden tahmin edemeyeceğimiz bir sayı tutabilir.

### Bugün öğrendiklerin

- `pick random 1 to 6` 1 ile 6 arasında, iki sınır dahil, rastgele bir sayı seçer.
- `on shake` bloğu, kart sallanınca çalışır.
- Rastgele sayılar az denemede eşit dağılmayabilir.

### Blok sözlüğü — Modül 2

| Blok | Anlamı |
|---|---|
| `on button A pressed` | A'ya basılınca |
| `on button A+B pressed` | A ve B'ye birlikte basılınca |
| `on shake` | sallanınca |
| `set … to …` | … değişkenini … yap |
| `change … by …` | … değişkenini … kadar değiştir |
| `pick random … to …` | … ile … arasında rastgele seç |
| `show number` | sayı göster |
| `show icon` | simge göster |

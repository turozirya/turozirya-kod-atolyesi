---
kurs: microbit
modul: sensorler
slug: ivmeolcer-ile-sallama
sira: 2
baslik: "İvmeölçer ve Hareketler"
ozet: "Bu derste kartın eğilmesini ve hareketlerini algılayarak bir su terazisi yapacaksın."
sure: 25
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: ""
test:
  - soru: "Kart sola yatırılınca çalışan olay bloğu hangisidir?"
    secenekler: ["`on tilt left`", "`on shake`", "`on screen up`", "`on logo down`"]
    dogru: 0
    aciklama: "`tilt left` sola yatma hareketidir."
  - soru: "Su terazisi programında kart düz dururken `acceleration (mg) x` yaklaşık kaçtır?"
    secenekler: ["1023", "255", "0'a yakın", "−1023"]
    dogru: 2
    aciklama: "Kart düzken x yönünde neredeyse hiç eğim yoktur; değer 0'a yakındır."
  - soru: "Kart sağa yatıkken su terazisi programı ne gösterir?"
    secenekler: ["Tik işareti", "Hiçbir şey", "Sola ok", "Sağa ok"]
    dogru: 3
    aciklama: "Sağa yatınca x değeri 100'den büyük olur ve sağa ok gösterilir."
---

Bir rafı duvara düz asmak için ustalar su terazisi kullanır. micro:bit bir su terazisine dönüşebilir mi?

micro:bit'in arkasında bir **ivmeölçer** vardır. İvmeölçer kartın hareketini ve ne kadar eğik durduğunu ölçer. Zar dersinde kullandığın `on shake` olayı da ivmeölçerle çalışır.

**Hareket olayları.** `Input` kategorisindeki `on shake` bloğunda `shake` yazısına tıklarsan başka hareketler de seçebilirsin:

- `tilt left` / `tilt right`: sola / sağa yatınca
- `logo up` / `logo down`: logo yukarı / aşağı bakınca
- `screen up` / `screen down`: ekran yukarı / aşağı bakınca

**Eğimi ölçmek.** `acceleration (mg) x` bloğu, kartın sağa sola ne kadar eğik olduğunu bir sayıyla verir. Kart düzken değer 0'a yakındır. Sağa yattıkça artar, sola yattıkça eksi değerlere iner.

Su terazisi programı:

```
forever
    if acceleration (mg) x < -100 then
        show arrow (West — sola ok)
    else if acceleration (mg) x > 100 then
        show arrow (East — sağa ok)
    else
        show icon (tik işareti)
```

`show arrow` (ok göster) bloğu `Basic` kategorisinde, `more` (daha fazla) bölümündedir. Simülatörde fareyi kartın üzerinde gezdirerek kartı eğebilirsin.

![İvmeölçer ve Hareketler — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/0b88b5e1-0138-47a0-968a-2a6a260d0141.png)

> 💡 Dikkat: Kart düz masada dururken x değeri tam 0 olmayabilir; küçük oynamalar normaldir. Bu yüzden 0 yerine −100 ile 100 arasını “düz” kabul ettik.

### Dene!

![İvmeölçer ve Hareketler — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/d1ad0b1e-bd07-4a0a-a823-7a5d2b2cab5d.png)

Programı karta yükle ve kartı farklı biçimlerde tut.

| Kartın durumu | Ekranda ne gördün? |
|---|---|
| Masada düz | Tik işareti |
| Sola eğik | |
| Sağa eğik | |
| Ters çevrilmiş, ekranı masaya bakıyor | |

Son satırı açıkla: Kart ters olsa bile sağa sola eğik değilse x yine 0'a yakındır. Bu yüzden tik görünür.

Şimdi giriş sorusuna dönelim. Evet, dönüşebilir. İvmeölçer eğimi ölçer ve kart düzken tik, eğikken eğimin yönünü gösteren bir ok gösterir.

### Bugün öğrendiklerin

- İvmeölçer kartın hareketini ve eğimini ölçer.
- `on shake` bloğundan sallama, yatma ve çevirme gibi hareketler seçilebilir.
- `acceleration (mg) x` düzken 0'a yakın, sağa eğikken artı, sola eğikken eksi değer verir.

---
kurs: microbit
modul: sensorler
slug: pusula
sira: 3
baslik: "Pusula"
ozet: "Bu derste pusulayı ayarlayacak ve dört ana yönü gösteren bir yön bulucu yapacaksın."
sure: 20
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo", "Pil yuvası (kartı gezdirerek denemek için)"]
video: ""
ornek_kod: ""
test:
  - soru: "`compass heading (°)` 90 ise kartın logo tarafı hangi yöne bakıyor?"
    secenekler: ["Doğu", "Güney", "Kuzey", "Batı"]
    dogru: 0
    aciklama: "Açı saat yönünde artar: 0 kuzey, 90 doğu, 180 güney, 270 batı."
  - soru: "Kuzey için neden `yon < 45 or yon > 315` koşulunu kullandık?"
    secenekler: ["`or` bloğu her programda zorunlu olduğu için", "Kuzey 315 derece olduğu için", "Pusula yalnızca 45'e kadar ölçtüğü için", "Kuzey hem 0'a yakın küçük açıları hem 360'a yakın büyük açıları kapsadığı için"]
    dogru: 3
    aciklama: "10° de 350° de kuzeye yakındır; ikisini birden yakalamak için “veya” gerekir."
  - soru: "Pusula sürekli yanlış yön gösteriyor. Ne yapmak mantıklıdır?"
    secenekler: ["Programı silmek", "Kartı metal ve mıknatıslardan uzaklaştırıp yeniden ayarlamak", "Kartı sallamak", "Sınıfın ışığını kapatmak"]
    dogru: 1
    aciklama: "Metaller ve mıknatıslar pusulayı şaşırtır; uzaklaştırıp yeniden ayarlamak gerekir."
---

Ormanda kaybolsan kuzeyi nasıl bulursun? micro:bit sana yol gösterebilir mi?

micro:bit'in arkasında bir **pusula** sensörü vardır. Pusula, Dünya'nın manyetik alanını algılayarak yönü bulur. Kart düz tutulduğunda yön, kartın logo tarafının baktığı yöndür. `Input` kategorisindeki `compass heading (°)` (pusula yönü) bloğu 0 ile 359 arasında bir açı verir:

| Açı | Yön |
|---|---|
| 0 | Kuzey (K) |
| 90 | Doğu (D) |
| 180 | Güney (G) |
| 270 | Batı (B) |

**Ayarlama.** Pusulayı ilk kullandığında kart ekranda bir yazı kaydırır ve senden ayar ister. Kartı her yöne yavaşça eğerek ekrandaki bütün noktaları yakmalısın. Bu işleme **kalibrasyon** denir. Bitince ekranda bir yüz görünür ve pusula kullanıma hazır olur.

Önce **yon** adlı bir değişken oluştur. Sonra programı kur:

```
forever
    set yon to compass heading (°)
    if yon < 45 or yon > 315 then
        show string "K"
    else if yon < 135 then
        show string "D"
    else if yon < 225 then
        show string "G"
    else
        show string "B"
```

Kuzey için neden “veya” (`or`) kullandık? Çünkü 10° de 350° de kuzeye yakındır (Hatırla: Robotik Kodlamaya Giriş, Birden Çok Koşul dersi). `or` bloğu `Logic` kategorisindedir.

![Pusula — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/008189b6-cde6-4f53-b850-277e1ce45908.png)

> 💡 Dikkat: Metal eşyalar, mıknatıslar ve bilgisayarlar pusulayı şaşırtır. Ölçüm yaparken kartı onlardan uzak ve düz tut.

### Dene!

![Pusula — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/d7b28261-e970-4c34-b903-fc6c3ba1a0c0.png)

Kartını düz tutarak yavaşça kendi etrafında dön. Hangi açıda hangi harfi gördüğünü yaz.

| Kartın logo tarafı nereye bakıyor? | `compass heading` yaklaşık | Ekrandaki harf |
|---|---|---|
| Kuzey | 0 | K |
| Doğu | | |
| Güney | | |
| Batı | | |

Sonra sınıfının tahtasının hangi yöne baktığını bul.

Şimdi giriş sorusuna dönelim. Evet, gösterebilir. Pusula sensörü yönü ölçer, program da açıyı dört ana yönden birine çevirir.

### Bugün öğrendiklerin

- `compass heading` 0 ile 359 arasında bir açı verir; 0 kuzeydir.
- Pusula ilk kullanımda kalibre edilmelidir.
- Metal ve mıknatıslar pusula ölçümünü bozar.

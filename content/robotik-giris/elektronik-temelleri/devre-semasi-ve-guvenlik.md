---
kurs: robotik-giris
modul: elektronik-temelleri
slug: devre-semasi-ve-guvenlik
sira: 3
baslik: "Devre Şeması ve Güvenlik"
ozet: "Bu derste devreleri sembollerle çizecek ve güvenli çalışma kurallarını öğreneceksin."
sure: 20
puan: 10
kod_dili: ""
arac_linki: ""
malzemeler: ["Kâğıt, kalem ve cetvel"]
video: ""
ornek_kod: ""
test:
  - soru: "Devre şemasında pilin artı (+) ucu nasıl gösterilir?"
    secenekler: ["Uzun çizgiyle", "Kısa çizgiyle", "Daireyle", "Okla"]
    dogru: 0
    aciklama: "Pil sembolünde uzun çizgi artı (+), kısa çizgi eksi (−) uçtur."
  - soru: "Pilin artı ve eksi ucunu bir kabloyla doğrudan birleştirmeye ne denir?"
    secenekler: ["Kapalı devre", "Kısa devre", "Açık devre", "Devre şeması"]
    dogru: 1
    aciklama: "Elektrik hiçbir elemana uğramadan pile döner; buna kısa devre denir ve pil ısınır."
  - soru: "Robot yaparken hangisi güvenli bir davranıştır?"
    secenekler: ["Devreyi prize bağlamak", "Islak elle kablolara dokunmak", "Kabloyu dişle soymak", "Isınan bir parça fark edince devreyi açmak"]
    dogru: 3
    aciklama: "Isınan bir parça tehlike işaretidir; devreyi açıp öğretmene haber vermek gerekir."
---

Mühendisler her devreyi fotoğrafla mı anlatır? Bir devreyi herkesin anlayacağı biçimde nasıl çizeriz?

**Devre şeması**, bir devrenin sembollerle çizilmiş halidir. Her elemanın basit bir sembolü vardır. Böylece dünyanın her yerinde aynı şema anlaşılır.

Temel semboller şunlardır:

- **Pil:** Biri uzun, biri kısa iki çizgi. Uzun çizgi artı (+) uçtur.
- **Kablo:** Düz bir çizgi.
- **Anahtar:** Açılı duran bir çizgi. Anahtar kapanınca yol birleşir.
- **LED:** Bir üçgen ve önünde bir çizgi. Yanında dışarı bakan iki küçük ok vardır.
- **Direnç:** Bir dikdörtgen ya da zikzak çizgi.

![devre-semasi-sembolleri](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/4182a95c-3056-4ea6-8c9a-017b7b1789b4.png)

**Tartışmalı örnek:** Kitaplarda direnç bazen dikdörtgen, bazen zikzak çizilir. İkisi de doğrudur. Farklı ülkeler farklı çizim kullanır.

Devrelerle çalışırken şu güvenlik kurallarına uy:

- Yalnızca pil ya da micro:bit ile çalış. Prizdeki elektrik (220 volt) öldürücü olabilir.
- Pilin artı ve eksi ucunu bir kabloyla doğrudan birleştirme. Buna **kısa devre** denir. Pil ve kablo ısınır.
- Islak elle devreye dokunma.
- Kablo soymak için dişini kullanma. Öğretmeninden yardım iste.
- Isınan bir parça fark edersen devreyi hemen aç ve öğretmenine söyle.

> 💡 Sık yapılan hata: Kısa devrenin “kısa bir devre” olduğu sanılır. Aslında elektriğin LED gibi bir elemana uğramadan doğrudan pile dönmesidir.

### Dene!

Bir devre şeması çiz. Devrede bir pil, bir anahtar, bir direnç ve bir LED tek halka oluşturuyor. Sonra şemana bakarak soruları cevapla.

| Soru | Cevabın |
|---|---|
| Anahtar açıkken LED yanar mı? | Hayır, devre açıktır. |
| Anahtar kapanınca LED yanar mı? | |
| Direnci çıkarırsan LED'e ne olabilir? | |
| Pilin iki ucunu LED olmadan birleştirirsen buna ne denir? | |

Şimdi giriş sorusuna dönelim. Mühendisler devreleri fotoğrafla değil, devre şemasıyla anlatır. Semboller sayesinde herkes aynı şemayı okuyabilir.

### Bugün öğrendiklerin

- Devre şeması, bir devrenin sembollerle çizilmiş halidir.
- Pil sembolünde uzun çizgi artı (+) uçtur.
- Yalnızca pille çalışırız; kısa devreden ve ıslak elden uzak dururuz.

---
kurs: microbit
modul: radyo-ile-haberlesme
slug: iki-microbit-konusuyor
sira: 0
baslik: "İki micro:bit Konuşuyor"
ozet: "Bu derste radyo ile iki micro:bit arasında sayı ve metin mesajı gönderip alacaksın."
sure: 25
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["2 adet micro:bit (ikili çalışma)", "USB kablo", "Pil yuvası (isteğe bağlı)"]
video: ""
ornek_kod: ""
test:
  - soru: "İki micro:bit'in birbirinin mesajını alabilmesi için ne gerekir?"
    secenekler: ["Kabloyla bağlanmaları", "Aynı ismi göstermeleri", "Aynı radyo grubunda olmaları", "Aynı renkte olmaları"]
    dogru: 2
    aciklama: "Kartlar yalnızca aynı grup numarasındaki mesajları alır."
  - soru: "`on radio received receivedString` bloğu ne zaman çalışır?"
    secenekler: ["A'ya basılınca", "Başka bir karttan metin mesajı gelince", "Program başlayınca", "Kart sallanınca"]
    dogru: 1
    aciklama: "Bu bir olay bloğudur; olay, radyodan metin gelmesidir."
  - soru: "Sınıfta herkes grup 1'i seçerse ne olur?"
    secenekler: ["Mesajlar karışır; herkes herkesin mesajını alır", "Radyo hiç çalışmaz", "Yalnızca öğretmen mesaj alır", "Mesajlar daha hızlı gider"]
    dogru: 0
    aciklama: "Aynı gruptaki bütün kartlar birbirinin mesajını alır."
---

Telsizle konuşan iki kişi gibi, iki micro:bit de kablosuz haberleşebilir mi?

micro:bit'in içinde bir **radyo** vardır. Radyo hem mesaj gönderir hem de alır. Kablo gerekmez. Radyo blokları `Radio` kategorisindedir.

Haberleşmenin üç adımı vardır:

1. **Grup seç.** `radio set group 7` (radyo grubunu 7 yap) bloğu `on start` içine konur. Grup 0 ile 255 arasında bir sayıdır. Yalnızca aynı gruptaki kartlar birbirini duyar.
2. **Gönder.** `radio send string "SELAM"` metin, `radio send number 5` sayı gönderir.
3. **Al.** `on radio received receivedString` olayı metin gelince, `on radio received receivedNumber` olayı sayı gelince çalışır. Gelen mesaj `receivedString` ya da `receivedNumber` içindedir.

```
on start
    radio set group 7
on button A pressed
    radio send string "SELAM"
on button B pressed
    radio send number 5
on radio received receivedString
    show string receivedString
on radio received receivedNumber
    show number receivedNumber
```

Simülatörde radyo blokları kullanınca ekranda iki micro:bit belirir. Birinde A'ya bas, mesajın öbüründe göründüğünü izle.

Aynı gruptaki herkes mesajlarını görebilir. Bu yüzden mesajlarını kibar ve kısa tut.

![İki micro:bit Konuşuyor — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/5df69e72-133a-4ff7-97c4-869bcd695f7b.png)

> 💡 Dikkat: Sınıfta her ikili farklı bir grup numarası seçmeli. Herkes aynı grubu seçerse mesajlar birbirine karışır.

### Dene!

![İki micro:bit Konuşuyor — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/06f5c24a-d118-4b8f-9ed4-c7c2713183ac.png)

Arkadaşınla aynı grup numarasını seçin ve programı iki karta da yükleyin.

| Gönderen | Ne gönderdi? | Alıcıda ne göründü? |
|---|---|---|
| Kart 1, A düğmesi | "SELAM" | SELAM |
| Kart 1, B düğmesi | 5 | |
| Kart 2, A düğmesi | "SELAM" | |
| Kart 2'nin grubunu 8 yaptık, Kart 1 A'ya bastı | "SELAM" | |

Sonra kendi mesajını yaz. ş, ğ, ı gibi harfleri kullanma; ekran onları gösteremez.

Şimdi giriş sorusuna dönelim. Evet, haberleşebilir. Aynı radyo grubundaki iki kart, kablo olmadan sayı ve metin mesajları gönderip alabilir.

### Bugün öğrendiklerin

- Radyo, micro:bit'lerin kablosuz haberleşmesini sağlar.
- Yalnızca aynı radyo grubundaki kartlar birbirinin mesajını alır.
- `on radio received` olayları, mesaj gelince çalışır.

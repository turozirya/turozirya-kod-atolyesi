---
kurs: robotik-giris
modul: kodlamanin-iki-yolu
slug: blok-tabanli-kodlama
sira: 0
baslik: "Blok Tabanlı Kodlama"
ozet: "Bu derste blok tabanlı kodlamanın özelliklerini öğrenecek ve MakeCode'da adını kaydıran bir program yapacaksın."
sure: 20
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: []
video: ""
ornek_kod: ""
test:
  - soru: "Blok tabanlı kodlamada neden yazım hatası yapılmaz?"
    secenekler: ["Komutlar hazır bloklar olduğu için", "Bilgisayar hataları kendiliğinden siler", "Program hiç çalıştırılmadığı için", "Bloklar yalnızca İngilizce olduğu için"]
    dogru: 0
    aciklama: "Komutları klavyeyle yazmayız; hazır blokları sürükleyip birleştiririz."
  - soru: "`show string` bloğu `forever` içine konursa ne olur?"
    secenekler: ["Yazı bir kez kayar", "Yazı ekranda sabit durur", "Hiçbir şey görünmez", "Yazı sürekli tekrar tekrar kayar"]
    dogru: 3
    aciklama: "`forever` bir sonsuz döngüdür; içindeki blok durmadan tekrar çalışır."
  - soru: "MakeCode'u neden İngilizce kullanıyoruz?"
    secenekler: ["Türkçesi olmadığı için", "Simülatör yalnızca İngilizcede çalıştığı için", "Python'a geçince aynı kelimeleri tanımak için", "Daha hızlı çalıştığı için"]
    dogru: 2
    aciklama: "Blok adları Python'daki komutlara benzer; şimdiden alışmak geçişi kolaylaştırır."
---

Kod yazmak için klavyede çok hızlı yazmak mı gerekir?

**Blok tabanlı kodlamada** komutlar renkli bloklardır. Blokları sürükleyip bırakırsın. Bloklar bir yapboz gibi birbirine takılır. Scratch ve MakeCode blok tabanlı kodlama ortamlarıdır.

Blok tabanlı kodlamanın üç güzel yanı vardır:

- Komutları yazmazsın, bu yüzden yazım hatası olmaz.
- Bloklar yalnızca uydukları yere takılır.
- Bloklar kategorilere ayrılmıştır ve her kategorinin kendi rengi vardır.

Daha önce MakeCode simülatörünü kullandın (Hatırla: Değişken ve Eğer… Değilse dersleri). Bu derste MakeCode'u daha yakından tanıyacağız.

MakeCode'u İngilizce kullanıyoruz. Dili değiştirmek için sağ üstteki ⚙ düğmesine bas. `Language` seçeneğinden `English`i seç. Bu kelimeleri Python'a geçince tekrar göreceksin.

Şimdi adını LED ekranda kaydıralım:

1. makecode.microbit.org adresinde `New Project` aç.
2. `Basic` kategorisinden `show string` (yazı göster) bloğunu `on start` (başlangıçta) bloğunun içine koy.
3. Bloğun içine adını yaz. ş, ğ, ı gibi harfleri kullanma; micro:bit ekranı bu harfleri gösteremez.
4. Simülatörde adının kaydığını izle.

![Blok Tabanlı Kodlama — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/423db364-5b1e-41b0-ac6b-391ec056efa3.png)

Bloklar aslında yazılı koda dönüşür. Editörün üst kısmında `Blocks` düğmesinin yanında yazılı kod görünümüne geçen bir düğme vardır. Ona basarsan aynı programın yazılı halini görürsün.

> 💡 Sık yapılan hata: Blok tabanlı kodlamanın “gerçek kodlama olmadığı” sanılır. Bloklar da gerçek bir programdır. Arka planda yazılı koda dönüşür.

### Dene!

![Blok Tabanlı Kodlama — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/c835a045-d474-45de-b9e9-c253af937169.png)

Programında aşağıdaki değişiklikleri dene ve ne olduğunu yaz.

| Ne değiştirdin? | Ne oldu? |
|---|---|
| `show string` bloğu `on start` içinde | Adım bir kez kaydı. |
| `show string` bloğunu `forever` içine taşıdım | |
| Altına `show icon` (simge göster) ekledim ve kalbi seçtim | |
| Yazılı kod görünümüne geçtim | |

Şimdi giriş sorusuna dönelim. Hayır, gerekmez. Blok tabanlı kodlamada komutları sürükleyip bırakırsın; hızlı yazmana gerek yoktur.

### Bugün öğrendiklerin

- Blok tabanlı kodlamada komutlar sürükle-bırak bloklardır.
- Bloklar yalnızca uydukları yere takıldığı için yazım hatası olmaz.
- Bloklar arka planda yazılı koda dönüşür.

---
kurs: microbit
modul: kararlar-ve-donguler
slug: tekrarla-ve-suresince
sira: 1
baslik: "Tekrarla ve Süresince"
ozet: "Bu derste sayılı ve koşullu döngü bloklarıyla bir geri sayım yapacaksın."
sure: 20
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: ""
test:
  - soru: "Kalbin tam 5 kez yanıp sönmesi için hangi döngü en uygundur?"
    secenekler: ["`on shake`", "`while`", "`repeat 5 times`", "`forever`"]
    dogru: 2
    aciklama: "Tekrar sayısı belli olduğunda sayılı döngü kullanılır."
  - soru: "Geri sayım programında `change sayac by -1` bloğu silinirse ne olur?"
    secenekler: ["Program hata verir", "Ekranda sürekli 10 görünür; döngü bitmez", "Sayaç ters sayar", "Döngü hiç çalışmaz"]
    dogru: 1
    aciklama: "sayac hiç azalmaz, koşul hep doğru kalır ve döngü sonsuza kadar sürer."
  - soru: "sayac 3'ten başlarsa `while sayac > 0` döngüsü ekranda hangi sayıları gösterir?"
    secenekler: ["Yalnızca 0", "2, 1, 0", "3, 2, 1, 0", "3, 2, 1"]
    dogru: 3
    aciklama: "sayac 0 olunca 0 > 0 yanlış olur ve döngü 0'ı göstermeden biter."
---

Roket fırlatılırken 10'dan geriye doğru sayılır. Bunun için 10 tane `show number` bloğu mu yazmalıyız?

Hayır; döngü kullanırız (Hatırla: Robotik Kodlamaya Giriş, Modül 8 — Döngüler). MakeCode'da döngüler `Loops` kategorisindedir:

- `repeat 4 times` (4 kez tekrarla): **Sayılı döngü.** Kaç kez tekrar edileceği bellidir.
- `while … ` (… olduğu sürece): **Koşullu döngü.** Koşul doğru olduğu sürece tekrar eder.

Örnek 1 — Kalp üç kez yanıp sönsün:

```
on button B pressed
    repeat 3 times
        show icon (kalp)
        pause (ms) 300
        clear screen
        pause (ms) 300
```

Örnek 2 — Roket geri sayımı. Önce **sayac** adlı bir değişken oluştur:

```
on button A pressed
    set sayac to 10
    while sayac > 0
        show number sayac
        change sayac by -1
        pause (ms) 500
    show icon (tik işareti)
```

Döngünün her turunda sayı gösterilir ve bir azalır. sayac 0 olunca `sayac > 0` koşulu yanlış olur. Döngü biter ve tik işareti görünür.

Hangisini ne zaman kullanırız? Tekrar sayısı belliyse `repeat`. Bir koşula bağlıysa `while`.

![Tekrarla ve Süresince — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/64eba66c-62dc-425a-a7f9-4d8507f30705.png)

> 💡 Sık yapılan hata: `while` döngüsünde değişkeni değiştirmek unutulur. Değişken hiç değişmezse koşul hep doğru kalır ve döngü sonsuza kadar sürer (Hatırla: Robotik Kodlamaya Giriş, Koşullu ve Sonsuz Döngü dersi).

### Dene!

![Tekrarla ve Süresince — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/e1df822f-1370-4f7b-8e6e-70bd59c4aac2.png)

Geri sayım programında aşağıdaki değişiklikleri tek tek dene. Her denemeden sonra programı eski haline getir.

| Değişiklik | Ne oldu? |
|---|---|
| Hiçbir şey değiştirmedim | 10'dan 1'e saydı, sonra tik çıktı. |
| `change sayac by -1` bloğunu sildim | |
| `set sayac to 10` yerine 5 yazdım | |
| `while sayac > 0` yerine `while sayac > 3` yazdım | |

Kontrol: Blok silinince ekranda sürekli 10 görünür. 5 yazınca 5'ten 1'e sayar. `sayac > 3` yazınca 10'dan 4'e kadar sayar.

Şimdi giriş sorusuna dönelim. 10 tane blok yazmaya gerek yok. Bir `while` döngüsü sayıyı göstermeyi ve azaltmayı 10 kez tekrarlar.

### Bugün öğrendiklerin

- `repeat` sayılı döngüdür; tekrar sayısı bellidir.
- `while` koşullu döngüdür; koşul doğru olduğu sürece tekrar eder.
- `while` döngüsünde koşuldaki değişken mutlaka değişmelidir.

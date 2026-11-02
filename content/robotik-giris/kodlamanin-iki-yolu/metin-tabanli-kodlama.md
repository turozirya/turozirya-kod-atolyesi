---
kurs: robotik-giris
modul: kodlamanin-iki-yolu
slug: metin-tabanli-kodlama
sira: 1
baslik: "Metin Tabanlı Kodlama"
ozet: "Bu derste aynı programı MicroPython ile yazacak ve sözdizimi hatalarını tanıyacaksın."
sure: 25
puan: 10
kod_dili: micropython
arac_linki: "https://python.microbit.org"
malzemeler: []
video: ""
ornek_kod: |
  from microbit import *

  while True:
      display.scroll("Ayse")
      display.show(Image.HEART)
      sleep(1000)
test:
  - soru: "`display.scroll(\"Ayse\")` satırı ne yapar?"
    secenekler: ["Ekrana kalp çizer", "LED ekranda “Ayse” yazısını kaydırır", "Programı durdurur", "Adı hafızaya kaydeder"]
    dogru: 1
    aciklama: "`display` ekran, `scroll` kaydır demektir; yazı LED ekranda kayar."
  - soru: "Python'da `while True:` satırının altındaki satırlar nasıl yazılır?"
    secenekler: ["Hepsi büyük harfle", "Tırnak içinde", "Biraz içeriden (girintili)", "Aynı satırda yan yana"]
    dogru: 2
    aciklama: "Döngünün içindeki satırlar girintili yazılır; böylece hangi satırların tekrar edileceği anlaşılır."
  - soru: "Hangisinde bir sözdizimi hatası vardır?"
    secenekler: ["`display.scroll(\"Ali\"`", "`display.scroll(\"Ali\")`", "`sleep(1000)`", "`from microbit import *`"]
    dogru: 0
    aciklama: "Kapanan parantez eksik; bu bir yazım kuralı (sözdizimi) hatasıdır."
---

Aynı programı bloksuz, yalnızca yazarak yapabilir misin?

**Metin tabanlı kodlamada** komutları klavyeyle yazarsın. Python, metin tabanlı bir programlama dilidir. micro:bit için Python'un küçük bir sürümü kullanılır: **MicroPython**.

Her dilin yazım kuralları vardır. Bu kurallara **sözdizimi** denir. Bir parantezi, tırnağı ya da iki noktayı unutursan program çalışmaz. Komutun adını yanlış yazarsan da program çalışmaz.

Önceki derste adını bloklarla kaydırmıştın. MicroPython'da aynı program iki satırdır:

```python
from microbit import *
display.scroll("Ayse")
```

- 1. satır, micro:bit komutlarını kullanabilmek için gereklidir.
- 2. satır, LED ekranda “Ayse” yazısını kaydırır. `display` ekran, `scroll` kaydır demektir.

Bloklar ile MicroPython karşılaştırması:

| MakeCode bloğu | MicroPython |
|---|---|
| `show string "Ayse"` | `display.scroll("Ayse")` |
| `show icon` (kalp) | `display.show(Image.HEART)` |
| `pause (ms) 1000` | `sleep(1000)` |
| `forever` | `while True:` |

Örnek: Örnek kod kutusundaki program, adını ve bir kalbi sürekli gösterir. `while True:` bir sonsuz döngüdür. Altındaki satırlar dört boşluk içeriden yazılır. Bu içeriden yazmaya **girinti** denir (Hatırla: Döngü Nedir? dersi).

**Tartışmalı örnek:** Blok mu daha iyi, metin mi? İkisi de iyidir. Bloklar öğrenmeyi kolaylaştırır. Metin tabanlı kodlama daha esnektir ve profesyonel programcılar çoğunlukla onu kullanır.

> 💡 Dikkat: Python büyük ve küçük harfi farklı görür. `True` doğrudur, `true` ise hata verir.

### Dene!

python.microbit.org adresini aç. Örnek koddaki programı yaz ve simülatörde çalıştır. Sonra aşağıdaki değişiklikleri tek tek yap. Her denemeden sonra kodu düzeltmeyi unutma.

| Değişiklik | Program çalıştı mı? | Ne gördün? |
|---|---|---|
| Doğru kod | Evet | Adım kaydı, sonra kalp göründü. |
| `scroll` yerine `scrol` yazdım | | |
| Sondaki parantezi sildim | | |
| `while True` sonundaki iki noktayı sildim | | |
| Alt satırların başındaki boşlukları sildim | | |

Şimdi giriş sorusuna dönelim. Evet, yapabilirsin. Aynı program MicroPython'da yalnızca iki satırla yazılır.

### Bugün öğrendiklerin

- Metin tabanlı kodlamada komutlar klavyeyle yazılır.
- Sözdizimi, bir programlama dilinin yazım kurallarıdır.
- Python'da döngünün içindeki satırlar girintili yazılır.

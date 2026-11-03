---
kurs: microbit
modul: microbit-python-temelleri
slug: fonksiyonlar
sira: 4
baslik: "Fonksiyonlar"
ozet: "Bu derste tekrar eden kodu bir fonksiyona çevirecek ve onu farklı değerlerle çağıracaksın."
sure: 25
puan: 10
kod_dili: micropython
arac_linki: "https://python.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: |
  from microbit import *

  # Fonksiyon tanımı: verilen yüzü göster, sonra temizle
  def goster_yuz(yuz):
      display.show(yuz)
      sleep(500)
      display.clear()

  while True:
      # Fonksiyonu farklı yüzlerle çağır
      if button_a.was_pressed():
          goster_yuz(Image.HAPPY)
      if button_b.was_pressed():
          goster_yuz(Image.SAD)
test:
  - soru: "Python'da yeni bir fonksiyon hangi kelimeyle tanımlanır?"
    secenekler: ["for", "def", "if", "import"]
    dogru: 1
    aciklama: "def, “tanımla” anlamına gelir ve fonksiyonun adını, parametrelerini belirler."
  - soru: "Örnek kodda B'ye basılınca ne olur?"
    secenekler: ["Gülen yüz yarım saniye görünür", "Ekran hiç değişmez", "Üzgün yüz yarım saniye görünür, sonra ekran temizlenir", "Üzgün yüz sürekli ekranda kalır"]
    dogru: 2
    aciklama: "goster_yuz fonksiyonu Image.SAD ile çağrılır; yüz 500 ms görünür ve display.clear() ekranı temizler."
  - soru: "`def goster_yuz(yuz):` satırındaki `yuz` nedir?"
    secenekler: ["Parametre: fonksiyon çağrılırken verilen değeri tutar", "Fonksiyonun adı", "Hazır bir simge", "Bir hata mesajı"]
    dogru: 0
    aciklama: "Parametre, fonksiyona dışarıdan gönderilen değeri içeride kullanmaya yarayan bir değişkendir."
---

Her sabah “dişlerini fırçala” deriz; adımları tek tek saymayız. Kodda da uzun bir işe kısa bir ad verebilir miyiz?

**Fonksiyon**, bir işi yapan satırlara verilen addır. Bir kez tanımlarsın, sonra adını yazarak istediğin kadar çalıştırırsın. Yemek tarifine benzer: Tarifin adı “menemen”dir, adımlar tarifin içindedir. Her seferinde adımları yeniden yazmazsın.

**Tanımlama.** Fonksiyon `def` kelimesiyle tanımlanır:

```python
def goster_yuz(yuz):
    display.show(yuz)
    sleep(500)
    display.clear()
```

- `def` “tanımla” demektir.
- `goster_yuz` fonksiyonun adıdır. Değişken adı kuralları burada da geçerlidir.
- Parantez içindeki `yuz` bir **parametredir**. Parametre, fonksiyona gönderilen değeri tutan değişkendir.
- Satır iki noktayla biter; fonksiyonun satırları girintilidir.

**Çağırma.** Tanımlanan fonksiyon kendiliğinden çalışmaz. Onu adıyla **çağırman** gerekir: `goster_yuz(Image.HAPPY)`. Bu satır çalışınca `yuz` parametresi `Image.HAPPY` değerini alır. Sonra fonksiyonun içindeki üç satır çalışır.

Örnek kod kutusundaki programda aynı fonksiyon iki farklı yüzle çağrılıyor. Fonksiyon olmasaydı aynı üç satırı iki kez yazmak gerekirdi. Fonksiyonun üç faydası vardır: Kod kısalır, okunması kolaylaşır ve bir değişikliği tek yerden yaparsın. Örneğin bekleme süresini değiştirmek için yalnızca fonksiyonun içindeki `sleep` satırını düzeltirsin.

`display.scroll` ve `sleep` de birer fonksiyondur. Onları başkaları yazmıştır; sen yalnızca çağırıyorsun.

![Fonksiyonlar — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/7b5814b2-ffec-4b53-90b7-f07a080a82b4.png)

> 💡 Sık yapılan hata: Fonksiyon, tanımlanmadan önce çağrılır ve `NameError` çıkar. Python kodu yukarıdan aşağı okur. Bu yüzden `def` bölümünü programın üst kısmına yaz.

### Dene!

![Fonksiyonlar — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/6662710e-2579-437f-93e3-61711ab8b9c9.png)

Bu fonksiyonun iki parametresi var. Editöre yaz, sonra aşağıdaki çağrıları tek tek dene.

```python
def yanip_son(simge, kac_kez):
    # Simgeyi kac_kez kadar yakıp söndür
    for i in range(kac_kez):
        display.show(simge)
        sleep(300)
        display.clear()
        sleep(300)
```

| Çağrı | Ne oldu? |
|---|---|
| `yanip_son(Image.HEART, 3)` | Kalp 3 kez yanıp söndü. |
| `yanip_son(Image.HAPPY, 1)` | |
| `yanip_son(Image.YES, 5)` | |
| `yanip_son(Image.HEART, 0)` | |

Son satırı açıkla: `range(0)` kaç tur döner? Sonra A'ya basınca kalbi, B'ye basınca tik işaretini 3 kez yakıp söndüren bir program yaz.

Şimdi giriş sorusuna dönelim. Evet, verebiliriz. Uzun bir işi `def` ile bir kez tanımlarız; sonra yalnızca adını yazarak çağırırız.

### Bugün öğrendiklerin

- Fonksiyon, bir işi yapan satırlara verilen addır ve `def` ile tanımlanır.
- Fonksiyon adıyla çağrılınca çalışır; parametreler çağrıdaki değerleri alır.
- Fonksiyonlar kodu kısaltır ve değişikliği tek yerden yapmayı sağlar.

### Kod sözlüğü — Modül 10

| Kod | Anlamı |
|---|---|
| `puan = 0` | puan değişkenine 0 değerini ver |
| `int`, `float`, `str`, `bool` | tam sayı, ondalıklı sayı, metin, mantıksal |
| `str(puan)` | sayıyı metne çevir |
| `if` / `elif` / `else` | eğer / değilse eğer / değilse |
| `==`, `!=`, `<`, `>`, `<=`, `>=` | karşılaştırma işaretleri |
| `and` / `or` | ve / veya |
| `while koşul:` | koşul doğru olduğu sürece tekrarla |
| `for i in range(5):` | 5 kez tekrarla (i: 0–4) |
| `display.set_pixel(x, y, 9)` | (x, y) noktasındaki LED'i yak |
| `[ … ]` | liste |
| `len(liste)` | listedeki değer sayısı |
| `liste.append(…)` | listenin sonuna ekle |
| `Image("…")` | kendi görüntünü çiz |
| `display.show(liste, delay=400)` | görüntüleri sırayla göster |
| `def ad(parametre):` | fonksiyon tanımla |

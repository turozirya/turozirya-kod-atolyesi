---
kurs: microbit
modul: bloktan-metne-gecis
slug: sozdizimi-ve-hata-mesajlari
sira: 2
baslik: "Sözdizimi ve Hata Mesajları"
ozet: "Bu derste hata mesajlarını okuyacak ve kodundaki yazım hatalarını bulup düzelteceksin."
sure: 25
puan: 10
kod_dili: micropython
arac_linki: "https://python.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: |
  from microbit import *

  # Sonsuz döngü: satır sonunda iki nokta var
  while True:
      # Döngünün içi 4 boşluk içeride
      display.show(Image.HEART)
      sleep(500)
      display.show(Image.HEART_SMALL)
      sleep(500)
test:
  - soru: "`while True` satırının sonundaki iki nokta silinirse hangi hata çıkar?"
    secenekler: ["NameError", "SyntaxError", "IndentationError", "Hata çıkmaz"]
    dogru: 1
    aciklama: "İki nokta Python'un yazım kuralıdır; eksik olunca yazım hatası (SyntaxError) çıkar."
  - soru: "Kartta “NameError … line 6” mesajı kaydı. İlk olarak ne yapmalısın?"
    secenekler: ["Kartı yeniden başlatmak", "Bütün kodu silip baştan yazmak", "6. satırda yanlış yazılmış bir ad aramak", "USB kablosunu değiştirmek"]
    dogru: 2
    aciklama: "NameError, Python'un tanımadığı bir ad olduğunu söyler; satır numarası nereye bakacağını gösterir."
  - soru: "Örnek koddaki `display.show(Image.HEART)` satırının başındaki boşluklar silinirse ne olur?"
    secenekler: ["Satır döngünün dışında kalır ve IndentationError çıkar", "Kalp daha büyük görünür", "Kalp yalnızca bir kez görünür ve hata çıkmaz", "Program daha hızlı çalışır"]
    dogru: 0
    aciklama: "İki noktadan sonra gelen satırın girintili olması gerekir; girinti yoksa IndentationError çıkar."
---

Bir harfi yanlış yazdın ve program çalışmadı. Python sana neyin yanlış olduğunu söyleyebilir mi?

Her programlama dilinin yazım kuralları vardır. Bunlara **sözdizimi** denir (Hatırla: Robotik Kodlamaya Giriş, Metin Tabanlı Kodlama dersi). Kurala uymayan bir satır olunca program durur ve bir **hata mesajı** verir. Hata mesajı bir azar değil, bir ipucudur. Doktorun hastalığın adını söylemesi gibi, hatanın türünü ve yerini söyler.

**Hata mesajını oku.** Kodunda hata varsa editör o satırın altını kırmızıyla çizer. Program kartta ya da simülatörde çalışınca da hata mesajı LED ekranda kayar. Mesajda iki bilgi vardır:

- **Satır numarası:** `line 6` → hata 6. satırda ya da hemen üstünde.
- **Hata türü:** Neyin yanlış olduğunu söyler.

**Sık görülen dört hata:**

| Hata türü | Anlamı | Örnek |
|---|---|---|
| `SyntaxError` | Yazım kuralı bozuk | İki nokta, parantez ya da tırnak eksik |
| `IndentationError` | Girinti yanlış | Döngünün içindeki satır içeriden yazılmamış |
| `NameError` | Python bu adı tanımıyor | `true` yazılmış, `True` olmalı |
| `AttributeError` | Komutun adı yanlış | `display.scrol` yazılmış, `display.scroll` olmalı |

**Girinti** önemlidir. İki noktayla biten satırın altındaki satırlar 4 boşluk içeriden yazılır. Böylece Python hangi satırların döngüye ait olduğunu anlar. Örnek kod kutusundaki programda dört satır döngünün içindedir. Kalp sürekli büyüyüp küçülür.

**Hata ayıklama** adımları şunlardır (Hatırla: Robotik Kodlamaya Giriş, Sıra Önemli! dersi):

1. Mesajdaki satır numarasına git.
2. Hata türüne göre o satırı kontrol et.
3. Tek bir şeyi düzelt ve yeniden çalıştır.

![Sözdizimi ve Hata Mesajları — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/3b749a7c-0c75-45f9-a44b-02171fe0f5ff.png)

> 💡 Dikkat: Python bazen hatayı bir alt satırda bildirir. Örneğin bir parantezi kapatmayı unutursan hata sonraki satırda görünebilir. Satırda hata bulamazsan bir üst satıra da bak.

### Dene!

![Sözdizimi ve Hata Mesajları — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/bb46173e-021f-4779-a8dd-2dded203e127.png)

Aşağıdaki satırların her birinde bir hata var. Hata türünü ve satırın doğru halini yaz. Sonra editörde dene ve mesajı kontrol et.

| Hatalı satır | Hata türü | Doğru hali |
|---|---|---|
| `display.scroll("Selam"` | SyntaxError | `display.scroll("Selam")` |
| `while true:` | | |
| `Display.show(Image.HAPPY)` | | |
| `display.scrol("Ali")` | | |
| `display.scroll(Merhaba)` | | |

Son satıra dikkat et: Tırnak olmayınca Python, Merhaba'yı bir yazı değil, bir ad sanar.

Şimdi giriş sorusuna dönelim. Evet, söyleyebilir. Hata mesajı hatanın türünü ve satır numarasını verir; sen de o satıra bakarak düzeltirsin.

### Bugün öğrendiklerin

- Sözdizimi, programlama dilinin yazım kurallarıdır.
- Hata mesajı hatanın türünü ve satır numarasını gösterir.
- İki noktayla biten satırın altındaki satırlar 4 boşluk içeriden yazılır.

### Kod sözlüğü — Modül 9

| Kod | Anlamı |
|---|---|
| `from microbit import *` | micro:bit komutlarını programa getir |
| `display.scroll("…")` | ekranda yazı ya da sayı kaydır |
| `display.show(Image.HEART)` | hazır simge göster |
| `display.clear()` | ekranı temizle |
| `sleep(1000)` | 1000 milisaniye bekle |
| `while True:` | sürekli tekrarla (sonsuz döngü) |
| `# …` | açıklama satırı, çalıştırılmaz |
| `SyntaxError` | yazım hatası |
| `IndentationError` | girinti hatası |
| `NameError` | tanınmayan ad |
| `AttributeError` | yanlış komut adı |

---
kurs: microbit
modul: bloktan-metne-gecis
slug: python-editoru-ilk-satirlar
sira: 1
baslik: "Python Editörü ve İlk Satırlar"
ozet: "Bu derste python.microbit.org'da ilk MicroPython programını yazacak ve karta yükleyeceksin."
sure: 25
puan: 10
kod_dili: micropython
arac_linki: "https://python.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: |
  # micro:bit komutlarını kullanabilmek için gerekli
  from microbit import *

  # Ekranda yazı kaydır
  display.scroll("Merhaba")
  # Gülen yüz göster ve 1 saniye bekle
  display.show(Image.HAPPY)
  sleep(1000)
  # Ekranı temizle
  display.clear()
test:
  - soru: "MicroPython programının ilk satırına neden `from microbit import *` yazılır?"
    secenekler: ["Programı hızlandırmak için", "Kartı internete bağlamak için", "Ekranın parlaklığını artırmak için", "display, Image ve sleep gibi micro:bit komutlarını kullanabilmek için"]
    dogru: 3
    aciklama: "Bu satır microbit kütüphanesindeki bütün komutları programa getirir."
  - soru: "`sleep(2000)` satırı ne yapar?"
    secenekler: ["Programı 2 saniye bekletir", "Kartı 2000 saniye kapatır", "2000 sayısını ekranda gösterir", "Ekranı 2 kez temizler"]
    dogru: 0
    aciklama: "sleep milisaniye cinsinden bekler; 2000 ms 2 saniyedir."
  - soru: "Örnek koddaki program çalışınca ekranda en son ne görünür?"
    secenekler: ["Merhaba yazısı", "Boş ekran", "Gülen yüz", "Kalp"]
    dogru: 1
    aciklama: "Son satır display.clear() olduğu için gülen yüz 1 saniye görünür, sonra ekran temizlenir."
---

Blokları bir kenara bırakıp ilk Python programını yazmaya hazır mısın?

Bu dersten itibaren **MicroPython** kullanacağız. MicroPython, Python dilinin micro:bit gibi küçük kartlar için yapılmış sürümüdür. Kodları **python.microbit.org** adresindeki resmi editörde yazacağız. Bu editör MakeCode'dan farklıdır ve MicroPython adlarını kullanır (Hatırla: Blokların Arkasındaki Kod dersi).

**Editörü tanı.** Ekranda üç bölüm vardır:

- **Kod alanı:** Ortadaki büyük bölüm. Kodu buraya yazarsın.
- **Simülatör:** Sağdaki micro:bit resmi. Kodunu kartsız denersin.
- **Düğmeler:** Altta `Send to micro:bit` (micro:bit'e gönder) ve `Save` (kaydet) düğmeleri.

![Python Editörü ve İlk Satırlar — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/692e648b-7480-46a6-9e73-c674a2d259ef.png)

**İlk satırlar.** Örnek kod kutusundaki programa bak. Program yukarıdan aşağı, satır satır çalışır:

- `from microbit import *` satırı, **microbit kütüphanesini** programa getirir. Kütüphane, hazır komutların toplandığı bir kutudur. Bu satır olmazsa `display` gibi komutlar tanınmaz.
- `display.scroll("Merhaba")` ekranda yazı kaydırır. `display` ekran demektir.
- `display.show(Image.HAPPY)` hazır bir simge gösterir. `Image.HEART` kalp, `Image.SAD` üzgün yüzdür.
- `sleep(1000)` 1000 milisaniye, yani 1 saniye bekler.
- `display.clear()` ekranı temizler.

Komutlardaki nokta (`.`) “içindeki” anlamına gelir. `display.scroll` “ekranın kaydırma komutu” diye okunur.

**Karta yükle.** Kartı USB kabloyla bağla ve `Send to micro:bit` düğmesine bas. İlk seferde editör kartı bağlaman için adım adım yardım eder. Bu düğme çalışmazsa `Save` ile bir `.hex` dosyası indir. Sonra dosyayı bilgisayardaki `MICROBIT` sürücüsüne sürükle (Hatırla: Modül 1 — MakeCode ve İlk Program).

> 💡 Dikkat: MakeCode'daki `show number` için MicroPython'da ayrı bir komut yoktur. Sayıyı da `display.scroll(5)` diye kaydırırsın.

### Dene!

![Python Editörü ve İlk Satırlar — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/180756b5-86dc-4205-a700-7f0c904fbebb.png)

Örnek koddaki programı editöre yaz ve simülatörde çalıştır. Sonra aşağıdaki değişiklikleri tek tek yap ve sonucu yaz.

| Değişiklik | Ekranda ne oldu? |
|---|---|
| Program olduğu gibi | Merhaba kaydı, gülen yüz göründü, ekran temizlendi. |
| "Merhaba" yerine kendi adını yazdım | |
| `Image.HAPPY` yerine `Image.HEART` yazdım | |
| `sleep(1000)` yerine `sleep(3000)` yazdım | |
| `display.clear()` satırını sildim | |

Sonra programı gerçek karta yükle. Ekran ş, ğ, ı gibi harfleri gösteremez. Adında bu harfler varsa onları c, g, i gibi harflerle değiştir.

Şimdi giriş sorusuna dönelim. Evet, hazırsın. İlk Python programın yalnızca birkaç satır ve sen onu karta da yükledin.

### Bugün öğrendiklerin

- MicroPython kodları python.microbit.org editöründe yazılır ve simülatörde denenir.
- `from microbit import *` satırı micro:bit komutlarını programa getirir.
- Program yukarıdan aşağı, satır satır çalışır.

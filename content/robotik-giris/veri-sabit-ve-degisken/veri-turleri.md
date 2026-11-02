---
kurs: robotik-giris
modul: veri-sabit-ve-degisken
slug: veri-turleri
sira: 3
baslik: "Veri Türleri"
ozet: "Bu derste sayı, metin ve mantıksal veri türlerini ayırt edeceksin."
sure: 20
puan: 10
kod_dili: ""
arac_linki: ""
malzemeler: []
video: ""
ornek_kod: ""
test:
  - soru: "Hangisi mantıksal veri türündedir?"
    secenekler: ["\"Evet\"", "doğru", "1", "\"doğru\""]
    dogru: 1
    aciklama: "Mantıksal veri yalnızca doğru ya da yanlış olabilir; tırnak içindeki “doğru” ise metindir."
  - soru: "Kodda üç buçuk nasıl yazılır?"
    secenekler: ["3,5", "\"3,5\"", "3.5", "3½"]
    dogru: 2
    aciklama: "Kodda ondalık ayırıcı olarak virgül değil nokta kullanılır."
  - soru: "Robot süpürgenin “Toz haznesi dolu mu?” sorusunun cevabı hangi türdedir?"
    secenekler: ["Mantıksal", "Metin", "Ondalıklı sayı", "Tam sayı"]
    dogru: 0
    aciklama: "Cevap yalnızca doğru ya da yanlış olabilir; bu mantıksal veridir."
---

Bilgisayar “13” ile 13'ü aynı şey olarak mı görür?

**Veri türü**, bir verinin çeşididir. Bilgisayar her veriyi türüne göre saklar ve kullanır. Üç temel veri türü vardır:

- **Sayı:** Hesap yapılabilen veridir. **Tam sayı** (13, −5) ya da **ondalıklı sayı** (3.5) olabilir.
- **Metin:** Harf, kelime ya da cümledir. Kodda tırnak içinde yazılır: "Ayşe", "Merhaba".
- **Mantıksal:** Yalnızca iki değeri vardır: doğru ya da yanlış. Python'da True ve False diye yazılır.

| Veri | Türü |
|---|---|
| 13 | Sayı (tam sayı) |
| 3.5 | Sayı (ondalıklı) |
| "Ayşe" | Metin |
| "13" | Metin (tırnak içinde!) |
| doğru | Mantıksal |

Örnek: Robot süpürge her türden veri kullanır. Pil yüzdesi (35) bir sayıdır. Temizlediği odanın adı ("Salon") bir metindir. “Toz haznesi dolu mu?” sorusunun cevabı (doğru ya da yanlış) mantıksal bir veridir.

Tırnak işareti önemlidir. "13" tırnak içinde olduğu için metindir. Bilgisayar onunla hesap yapmaz. "13" ile "1" toplanırsa sonuç 14 değil, "131" olur. İki metin yan yana eklenir.

> 💡 Dikkat: Matematikte ondalık sayıyı virgülle yazarsın: 3,5. Kodda ise nokta kullanılır: 3.5. Virgülle yazarsan bilgisayar onu sayı olarak anlamaz.

### Dene!

Her verinin türünü yaz.

| Veri | Türü |
|---|---|
| Mesafe sensöründen gelen 25 | Sayı (tam sayı) |
| 36.6 (vücut sıcaklığı) | |
| "Robotum" | |
| Kapı açık mı? → yanlış | |
| "2026" | |
| −3 (dondurucunun sıcaklığı) | |

Kontrol: 36.6 ondalıklı sayı, "Robotum" metin, yanlış mantıksal, "2026" metin (tırnak içinde), −3 tam sayıdır.

Şimdi giriş sorusuna dönelim. Hayır, aynı şey olarak görmez. Tırnak içindeki “13” bir metindir, tırnaksız 13 ise bir sayıdır.

### Bugün öğrendiklerin

- Üç temel veri türü vardır: sayı, metin ve mantıksal.
- Metin tırnak içinde yazılır; tırnak içindeki sayı da metindir.
- Kodda ondalık sayılar virgülle değil, noktayla yazılır.

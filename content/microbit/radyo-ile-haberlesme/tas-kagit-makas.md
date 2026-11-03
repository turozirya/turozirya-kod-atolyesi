---
kurs: microbit
modul: radyo-ile-haberlesme
slug: tas-kagit-makas
sira: 1
baslik: "Taş–Kâğıt–Makas"
ozet: "Bu derste rastgele sayı, radyo ve “veya” bağlacını kullanarak iki kişilik bir oyun yapacaksın."
sure: 25
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["2 adet micro:bit (ikili çalışma)", "USB kablo", "Pil yuvası (isteğe bağlı)"]
video: ""
ornek_kod: ""
test:
  - soru: "Bu oyunda `radio send number benim` ne işe yarar?"
    secenekler: ["Rakibin seçimini alır", "Kendi seçimini rakibin kartına gönderir", "Skoru sıfırlar", "Sesi açar"]
    dogru: 1
    aciklama: "Rakibin kartı, senin seçimini bu mesajla öğrenir."
  - soru: "benim = 2 (kâğıt), rakip = 1 (taş) ise sonuç ne olur?"
    secenekler: ["KAZANDIN", "BERABERE", "Program hata verir", "KAYBETTIN"]
    dogru: 0
    aciklama: "Kâğıt taşı sarar; kazanma koşullarından biri doğrudur."
  - soru: "Kazanma koşulunda üç durumu birbirine bağlamak için hangi bağlaç kullanıldı?"
    secenekler: ["değil (not)", "ve (and)", "veya (or)", "eşittir (=)"]
    dogru: 2
    aciklama: "Üç durumdan herhangi biri doğruysa kazanırsın; bu yüzden “veya” kullanılır."
---

Taş–kâğıt–makas oynarken kimin kazandığına kart karar verebilir mi?

Seçimleri sayılarla tutacağız: **1 = taş**, **2 = kâğıt**, **3 = makas**. Kurallar: Taş makası kırar, makas kâğıdı keser, kâğıt taşı sarar.

İki değişken oluştur: **benim** (senin seçimin) ve **rakip** (arkadaşının seçimi).

**1. Seçim yap ve gönder.** Kartı sallayınca rastgele bir seçim yapılır, ekranda gösterilir ve rakibe gönderilir:

```
on start
    radio set group 12
on shake
    set benim to pick random 1 to 3
    radio send number benim
    if benim = 1 then
        show icon (küçük kare — taş)
    else if benim = 2 then
        show icon (büyük kare — kâğıt)
    else
        show icon (makas)
```

**2. Rakibin seçimini al:**

```
on radio received receivedNumber
    set rakip to receivedNumber
```

**3. Sonucu göster.** İkiniz de salladıktan sonra A'ya basın:

```
on button A pressed
    if benim = rakip then
        show string "BERABERE"
    else if (benim = 1 and rakip = 3) or (benim = 2 and rakip = 1) or (benim = 3 and rakip = 2) then
        show string "KAZANDIN"
    else
        show string "KAYBETTIN"
```

Kazanmanın üç yolu vardır. Herhangi biri doğruysa kazanırsın; bu yüzden “veya” (`or`) kullandık. Her yolun içinde iki koşul birlikte doğru olmalı; bu yüzden “ve” (`and`) kullandık (Hatırla: Robotik Kodlamaya Giriş, Birden Çok Koşul dersi).

![Taş–Kâğıt–Makas — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/2a6b4c64-7520-4f8a-82a0-4861340c67ba.png)

> 💡 Sık yapılan hata: İki oyuncu da sallamadan A'ya basılır. O zaman rakibin seçimi henüz gelmemiştir ve sonuç yanlış çıkar. Önce ikiniz de sallayın.

### Dene!

![Taş–Kâğıt–Makas — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/eb8144f6-d4f9-40b1-94a2-7e3adbc9792a.png)

Arkadaşınla oynayın ve sonuçları kontrol edin.

| Benim | Rakip | Sonuç |
|---|---|---|
| Taş (1) | Makas (3) | KAZANDIN |
| Kâğıt (2) | Kâğıt (2) | |
| Makas (3) | Taş (1) | |
| Kâğıt (2) | Makas (3) | |

Kontrol: BERABERE; KAYBETTIN (taş makası kırar); KAYBETTIN (makas kâğıdı keser).

Şimdi giriş sorusuna dönelim. Evet, verebilir. Kart iki seçimi karşılaştırır ve “ve”, “veya” bağlaçlarıyla kurulmuş kurala göre sonucu söyler.

### Bugün öğrendiklerin

- Seçimler sayılarla tutulup radyo ile gönderilebilir.
- “Veya” ile bağlanan koşullardan biri doğruysa sonuç doğrudur.
- “Ve” ile bağlanan koşulların hepsi doğru olmalıdır.

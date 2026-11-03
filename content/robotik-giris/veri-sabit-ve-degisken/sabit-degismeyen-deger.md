---
kurs: robotik-giris
modul: veri-sabit-ve-degisken
slug: sabit-degismeyen-deger
sira: 2
baslik: "Sabit: Değişmeyen Değer"
ozet: "Bu derste sabit ile değişkeni ayırt edeceksin."
sure: 15
puan: 10
kod_dili: sozde_kod
arac_linki: ""
malzemeler: []
video: ""
ornek_kod: |
  1. Başla
  2. GUN_SAYISI = 7   (sabit)
  3. hafta sayısını al
  4. toplam_gun = hafta × GUN_SAYISI
  5. toplam_gun'ü yaz
  6. Bitir
test:
  - soru: "Hangisi bir sabittir?"
    secenekler: ["Oyundaki skor", "Bir saatteki dakika sayısı", "Odanın sıcaklığı", "Robot süpürgenin pil yüzdesi"]
    dogru: 1
    aciklama: "Bir saat her zaman 60 dakikadır; diğerleri zamanla değişir."
  - soru: "Örnek koddaki algoritmaya 3 hafta girilirse toplam_gun kaç olur?"
    secenekler: ["21", "3", "7", "10"]
    dogru: 0
    aciklama: "toplam_gun = 3 × 7 = 21 olur."
  - soru: "Okuldaki öğrenci sayısı neden değişken sayılır?"
    secenekler: ["Bir sensörle ölçüldüğü için", "Çok büyük bir sayı olduğu için", "Ondalıklı bir sayı olduğu için", "Yıl içinde öğrenci gelip gidebildiği için"]
    dogru: 3
    aciklama: "Değeri değişebilen her veri değişkendir; büyüklüğü önemli değildir."
---

Haftada kaç gün var? Bu sayı yarın değişir mi?

**Sabit**, program çalıştığı sürece değeri değişmeyen veridir. Haftadaki gün sayısı (7) bir sabittir. Bir saatteki dakika sayısı (60) da bir sabittir.

Değişken ile sabiti karşılaştıralım:

| | Değişken | Sabit |
|---|---|---|
| Değeri değişir mi? | Evet | Hayır |
| Günlük hayattan örnek | Maç skoru, hava sıcaklığı | Haftadaki gün sayısı |
| Robot süpürgeden örnek | Pil yüzdesi | Tekerleğin çapı |

Sabitlere neden ad veririz? Aynı sayıyı programın birçok yerinde kullanırsın. Ona bir ad verirsen kod daha anlaşılır olur. Değer bir gün değişirse tek bir yerden düzeltirsin.

Örnek: Örnek kod kutusunda haftaları güne çeviren bir algoritma var. GUN_SAYISI bir sabittir; değeri hep 7 kalır. hafta ve toplam_gun ise değişkendir; her seferinde farklı olabilir.

Python'da sabitler genellikle BÜYÜK harfle yazılır: GUN_SAYISI. Böylece koda bakan herkes onun değişmeyeceğini anlar.

**Tartışmalı örnek:** Okuldaki öğrenci sayısı sabit mi? Yıl içinde yeni öğrenci gelebilir ya da biri ayrılabilir. Bu yüzden değişkendir. Sabit, yalnızca değişmeyeceğinden emin olduğumuz değerdir.

![Sabit: Değişmeyen Değer — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/74668732-dedf-4444-8460-495b66394671.png)

> 💡 Sık yapılan hata: Sabitin “önemli bir sayı” olduğu sanılır. Bir değer önemli olduğu için değil, değişmediği için sabittir.

### Dene!

![Sabit: Değişmeyen Değer — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/6c6d5072-9676-4382-a91d-d03d0d280351.png)

Her veri için değişken mi, sabit mi olduğunu ve nedenini yaz.

| Veri | Değişken mi, sabit mi? | Neden? |
|---|---|---|
| Termometredeki sıcaklık | Değişken | Gün içinde değişir. |
| Bir dakikadaki saniye sayısı | | |
| Oyundaki kalan can sayısı | | |
| Robot süpürgenin pil yüzdesi | | |
| Bir yıldaki ay sayısı | | |

Şimdi giriş sorusuna dönelim. Haftada 7 gün vardır ve bu sayı yarın da değişmez. Bu yüzden haftadaki gün sayısı bir sabittir.

### Bugün öğrendiklerin

- Sabit, program boyunca değeri değişmeyen veridir.
- Değişkenin değeri değişebilir, sabitin değeri değişmez.
- Python'da sabitler genellikle büyük harfle yazılır.

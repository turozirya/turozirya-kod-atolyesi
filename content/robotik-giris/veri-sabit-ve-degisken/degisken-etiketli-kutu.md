---
kurs: robotik-giris
modul: veri-sabit-ve-degisken
slug: degisken-etiketli-kutu
sira: 1
baslik: "Değişken: Etiketli Kutu"
ozet: "Bu derste değişkenin ne olduğunu öğrenecek ve MakeCode simülatöründe bir skor sayacı yapacaksın."
sure: 25
puan: 10
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: []
video: ""
ornek_kod: ""
test:
  - soru: "Robot süpürge temizlediği oda sayısını aklında tutmak istiyor. Bunun için ne kullanmalı?"
    secenekler: ["Bir sabit", "Bir değişken", "Bir sensör", "Bir eyleyici"]
    dogru: 1
    aciklama: "Oda sayısı her temizlikte değişir; değişen veriyi saklamak için değişken kullanılır."
  - soru: "`set skor to 0` bloğundan sonra 3 kez `change skor by 1` çalışırsa skor kaç olur?"
    secenekler: ["1", "0", "4", "3"]
    dogru: 3
    aciklama: "Skor 0'dan başlar ve her seferinde 1 artar: 1, 2, 3."
  - soru: "Hangisi iyi bir değişken adıdır?"
    secenekler: ["adim sayisi", "x1y2z3", "adim_sayisi", "a"]
    dogru: 2
    aciklama: "Anlamlıdır ve boşluk içermez; boşluklu adlar kullanılamaz."
---

Bir maçta skor tabelası sürekli değişir. Bilgisayar bu değişen sayıyı nerede tutar?

**Değişken**, bir veriyi saklayan ve değeri değişebilen bir kutudur. Her kutunun bir **adı** vardır, yani bir etiketi. Kutunun içinde de bir **değer** bulunur.

Örnek: “skor” adlı bir kutu düşün. Maç başında içinde 0 yazar. Gol olunca değer 1 olur, sonra 2 olur. Kutu aynı kalır, içindeki değer değişir.

Değişkene ad verirken şunlara dikkat et:

- Anlamlı bir ad seç: skor, adim, sicaklik.
- Ada boşluk koyma. İki kelimeyi alt çizgiyle birleştir: adim_sayisi.
- ı, ş, ğ gibi harfler yerine i, s, g kullan. İleride Python'da sorun yaşamazsın.

Şimdi MakeCode simülatöründe bir skor sayacı yapalım. Kart gerekmez. MakeCode'u İngilizce kullanıyoruz; Python'a geçince bu kelimeleri tekrar göreceksin.

1. makecode.microbit.org adresini aç ve `New Project` düğmesine bas.
2. `Variables` (değişkenler) kategorisine gir. `Make a Variable...` düğmesine bas ve adını skor yap.
3. `set skor to 0` (skoru 0 yap) bloğunu `on start` (başlangıçta) bloğunun içine koy.
4. `Input` kategorisinden `on button A pressed` (A'ya basılınca) bloğunu çalışma alanına sürükle.
5. Bu bloğun içine `change skor by 1` (skoru 1 artır) bloğunu koy.
6. Altına `Basic` kategorisinden `show number` (sayı göster) bloğunu ekle. İçine `skor` değişkenini yerleştir.
7. Simülatörde A düğmesine birkaç kez bas.

[GÖRSEL: Ekran görüntüsü — MakeCode'da on start içinde set skor to 0; on button A pressed içinde change skor by 1 ve show number skor blokları. İngilizce arayüz.]

> 💡 Sık yapılan hata: Değişkenin adı ile değeri karıştırılır. “skor” kutunun adıdır; içindeki 3 ise değeridir. `show number` bloğu ekranda adı değil, değeri gösterir.

### Dene!

Programına bir sıfırlama düğmesi ekle. `on button B pressed` bloğunun içine `set skor to 0` ve `show number skor` koy. Sonra aşağıdakileri dene.

| Ne yaptın? | Ekranda ne gördün? |
|---|---|
| A'ya 3 kez bastım | 3 |
| B'ye bastım | |
| A'ya 2 kez daha bastım | |

Şimdi giriş sorusuna dönelim. Bilgisayar değişen skoru “skor” adlı bir değişkende tutar. Gol oldukça değişkenin değeri artar.

### Bugün öğrendiklerin

- Değişken, adı olan ve değeri değişebilen bir veri kutusudur.
- `set` bloğu değişkene değer verir, `change` bloğu değerini artırır.
- Değişken adları anlamlı olmalı ve boşluk içermemelidir.

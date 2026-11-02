---
kurs: microbit
modul: tanisma
slug: microbit-nedir
sira: 0
baslik: "micro:bit'i Tanıyalım"
ozet: "Bu derste micro:bit kartının parçalarını sensör, işlemci ve eyleyici olarak tanıyacaksın."
sure: 20
puan: 10
kod_dili: ""
arac_linki: ""
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
test:
  - soru: "micro:bit'in LED ekranı hangi görevi yapar?"
    secenekler: ["Sensör", "Eyleyici", "İşlemci", "Güç kaynağı"]
    dogru: 1
    aciklama: "LED ekran, kararı ışığa çeviren bir eyleyicidir."
  - soru: "micro:bit'teki ivmeölçer ne iş yapar?"
    secenekler: ["Sallanmayı algılayan bir sensördür", "Ses çıkaran bir eyleyicidir", "Kartı şarj eder", "Kartın rengini belirler"]
    dogru: 0
    aciklama: "İvmeölçer, kartın hareketini ve sallanmasını algılayan bir sensördür."
  - soru: "micro:bit'te kararları veren işlemci kartın neresindedir?"
    secenekler: ["Ön yüzde, LED'lerin ortasında", "Arka yüzde", "USB kablosunun içinde", "A butonunun altında"]
    dogru: 1
    aciklama: "İşlemci kartın arka yüzündedir; ön yüzde LED ekran ve butonlar bulunur."
---

**Hatırla:** Robotik Kodlamaya Giriş kursu, Modül 2'de robotun sensör, işlemci ve eyleyici parçalarını öğrenmiştin. Şimdi bunları gerçek bir kartta göreceksin.

**micro:bit**, avuç içi büyüklüğünde küçük bir bilgisayar kartıdır. Üzerinde sensörler, bir işlemci ve eyleyiciler bulunur — tıpkı önceki derste öğrendiğin robot sistemleri gibi.

Ön yüzde şu parçalar var: **25 LED'lik ekran** eyleyicidir, ışık üretir. **A** ve **B** butonları ile **dokunmatik logo**, basıldığını algılayan sensörlerdir. Kartın **arka yüzünde** ise ses üreten **hoparlör** eyleyicisi; sesi algılayan **mikrofon**, sallanmayı algılayan **ivmeölçer** ve yönü algılayan **pusula** sensörleri; sıcaklığı da ölçebilen ve kararları veren **işlemci** bulunur.

> 💡 Sık yapılan hata: micro:bit'in sadece bir ekran olduğu düşünülür. Oysa kartta birden fazla sensör, bir işlemci ve iki eyleyici (LED ekran ve hoparlör) birlikte çalışır.

**Tartışmalı örnek:** LED ekran hem eyleyicidir (ışık verir) hem de sensördür (ortamdaki ışığı ölçebilir).

**Örnek:** A butonuna bastığında şu sıra çalışır: buton (sensör) basıldığını algılar, işlemci "LED ekranda gülen yüz göster" kararını verir, LED ekran (eyleyici) gülen yüzü gösterir. Bu, Robotik Kodlamaya Giriş kursu, Modül 2'de öğrendiğin algıla-karar ver-hareket et sırasının aynısıdır.

![microbit-nedir-kavram](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/bfc5ee7f-dc7a-4ac2-af1c-11e1fc798f38.png)

**Dene!** Öğretmeninden aldığın micro:bit kartını eline al ve aşağıdaki tabloyu tamamla.

| Parça | Sensör / Eyleyici / Bağlantı-güç |
|---|---|
| LED ekran | Eyleyici |
| A butonu | ? |
| B butonu | ? |
| Hoparlör | ? |
| Dokunmatik logo | ? |
| USB girişi | ? |
| Pil girişi | ? |

Her birini bulduğunda doğru sütuna karar ver ve yanındaki arkadaşınla kontrol et.

![microbit-nedir-dene](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/5249f764-8836-49b9-a957-15bb491fef89.png)

**Bugün öğrendiklerin:**
- micro:bit, sensör, işlemci ve eyleyicileri bir arada barındıran küçük bir kart bilgisayardır.
- LED ekran ve hoparlör eyleyici, buton/dokunmatik logo/mikrofon ise sensördür.
- İşlemci, kartın **arka yüzünde** bulunur ve kararları o verir.

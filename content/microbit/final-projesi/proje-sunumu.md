---
kurs: microbit
modul: final-projesi
slug: proje-sunumu
sira: 1
baslik: "Final: Proje Sunumu"
ozet: "Bu derste projeni test edip hatalarını ayıklayacak, yıl sonu proje gününde sunacak ve arkadaşlarına geri bildirim vereceksin."
sure: 40
puan: 20
kod_dili: micropython
arac_linki: "https://python.microbit.org"
malzemeler: ["Proje kartın ve akış şeman", "Projene göre micro:bit ve malzemeler", "Yedek pil ya da USB kablo"]
video: ""
ornek_kod: |
  from microbit import *

  ESIK = 128
  while True:
      # Ölçülen değeri bir değişkende tut
      ses = microphone.sound_level()
      # Hata ayıklama: A'ya basınca ölçülen değeri göster
      if button_a.was_pressed():
          display.scroll(ses)
      if ses > ESIK:
          display.show(Image.ANGRY)
      else:
          display.show(Image.HAPPY)
      sleep(200)
test:
  - soru: "Projende kızgın yüz hiç görünmüyor. Örnek koddaki gibi A'ya basınca ses değerini gösterdin ve hep 40 civarı çıktı. En olası sorun nedir?"
    secenekler: ["Mikrofon bozuktur", "Eşik değeri sınıfın sesine göre çok yüksektir", "Kart ters takılmıştır", "Image.ANGRY yanlış yazılmıştır"]
    dogru: 1
    aciklama: "Ölçülen değer hiç 128'e ulaşmıyorsa eşik sınıfa göre yüksektir; eşik ölçümlere göre seçilmelidir."
  - soru: "Kodu test ederken en doğru yöntem hangisidir?"
    secenekler: ["Her eklemeden sonra denemek ve sonucu test tablosuna yazmak", "Yalnızca sunumdan önce bir kez denemek", "Simülatörde çalıştıysa kartı hiç denememek", "Hata mesajlarını görmezden gelmek"]
    dogru: 0
    aciklama: "Her adımda denenirse hata hangi eklemeden geldiği bilinir ve kolayca bulunur."
  - soru: "“İki yıldız, bir dilek” geri bildiriminde ne söylenir?"
    secenekler: ["İki hata ve bir öneri", "Projenin puanı", "Yalnızca beğenilen şeyler", "Beğenilen iki şey ve geliştirilebilecek bir şey"]
    dogru: 3
    aciklama: "İki yıldız beğendiğin iki şeydir; dilek ise geliştirilebilecek bir öneridir."
---

Kodun ekranda çalışıyor. Peki bir kalabalığın önünde de sorunsuz çalışacağından nasıl emin olursun?

**Adım adım geliştir.** Planındaki özellikleri tek tek ekle. Her eklemeden sonra önce simülatörde, sonra gerçek kartta dene (Hatırla: Modül 8 — Proje Yapımı ve Sunum). Bir şey bozulursa yalnızca son eklediğin kısma bakarsın.

**Test tablosu tut.** Her denemede ne beklediğini ve ne olduğunu yaz. Hata mesajı çıktıysa onu da yaz (Hatırla: Sözdizimi ve Hata Mesajları dersi).

| Özellik | Beklenen | Olan | Hata mesajı | Düzeltme |
|---|---|---|---|---|
| Gürültüde kızgın yüz | Alkışta kızgın yüz | Hep gülen yüz | Yok | Eşik 128'den 70'e indirildi |
| | | | | |
| | | | | |

**Değeri görerek hata ayıkla.** Bazen program hata vermez ama beklediğin şeyi de yapmaz. O zaman değişkenin değerini ekranda göster. Örnek kod kutusundaki programda A'ya basınca ölçülen ses değeri kayar. Değeri görünce eşiğin doğru olup olmadığını anlarsın. Sorun çözülünce bu satırları silebilirsin.

**Kodunu okunur yap.** Sunumda kodunu başkaları da görecek. Önemli satırlara açıklama ekle. Değişkenlere ve fonksiyonlara anlamlı adlar ver: `x` yerine `ses`, `f1` yerine `gurultulu`.

**Sunumunu hazırla.** İki dakikalık sunum şu sırayla olsun:

1. **Sorun:** Hangi sorunu çözdük?
2. **Çözüm:** Projemiz ne yapıyor?
3. **Nasıl çalışıyor:** Sensör, işlemci, eyleyici ve fonksiyonlarımız neler?
4. **Canlı gösteri:** Projeyi çalıştır.
5. **Zorluk:** En çok hangi hatayla uğraştık, nasıl çözdük?
6. **Gelecek:** Daha fazla zamanımız olsa neyi eklerdik?

**Geri bildirim.** Arkadaşlarının sunumlarına “İki yıldız, bir dilek” yöntemiyle geri bildirim ver. Beğendiğin iki şeyi ve geliştirilebilecek bir şeyi söyle.

![Final: Proje Sunumu — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/ff62ac01-5774-493f-8df6-9abe35f76357.png)

> 💡 Sık yapılan hata: Canlı gösteriden hemen önce kod değiştirilir ve proje çalışmaz. Sunumdan önceki son çalışan hâli kaydet. Gösteride o hâli kullan.

### Dene!

![Final: Proje Sunumu — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/8963c5f1-c6d3-4b1f-9083-5cf2c267e34f.png)

Projeni bitir ve yıl sonu proje gününde sun. Sunumdan önce kontrol et:

- [ ] Proje gerçek kartta çalışıyor mu?
- [ ] Test tablosunda en az üç deneme var mı?
- [ ] Önemli satırlarda açıklama var mı?
- [ ] Sensörü, eyleyiciyi ve fonksiyonlarını söyleyebiliyor musun?
- [ ] Sunum iki dakikaya sığıyor mu?
- [ ] Son çalışan hâl kaydedildi mi; yedek pil ya da kablo hazır mı?

Sunumdan sonra iki arkadaşının projesi için geri bildirimini yaz:

| Proje | İki yıldız | Bir dilek |
|---|---|---|
| Örnek: Akıllı kapı zili | Melodi çok eğlenceli; radyo mesajı hızlı geliyor | Ses düzeyi ayarlanabilsin |
| | | |
| | | |

Şimdi giriş sorusuna dönelim. Adım adım geliştir ve her adımda test et. Son çalışan hâli de kaydedersen projen sunumda sorunsuz çalışır. Tebrikler, micro:bit ile Kodlama kursunu bitirdin!

### Bugün öğrendiklerin

- Özellikler tek tek eklenir, her adım test edilir ve sonuç test tablosuna yazılır.
- Hata vermeyen ama yanlış çalışan programda değişkenin değeri ekranda gösterilerek hata ayıklanır.
- Okunur kod; açıklama satırları ve anlamlı adlarla yazılır.

### Kod sözlüğü — Modül 12

| Kod | Anlamı |
|---|---|
| `ESIK = 128` | sabit (büyük harfle yazılır, değişmez) |
| `display.scroll(ses)` | değişkenin değerini görerek hata ayıkla |
| `# …` | açıklama satırı: kodu okuyanlar için not |
| `def gurultulu():` | bir özelliği fonksiyon olarak yaz |

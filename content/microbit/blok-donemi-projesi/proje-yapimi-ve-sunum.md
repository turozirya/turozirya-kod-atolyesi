---
kurs: microbit
modul: blok-donemi-projesi
slug: proje-yapimi-ve-sunum
sira: 1
baslik: "Proje Yapımı ve Sunum"
ozet: "Bu derste projeni adım adım kodlayıp test edecek ve sınıfa sunacaksın."
sure: 40
puan: 20
kod_dili: blocks
arac_linki: "https://makecode.microbit.org"
malzemeler: ["Proje kartın ve akış şeman", "Projene göre micro:bit ve malzemeler"]
video: ""
ornek_kod: ""
test:
  - soru: "Projeyi kodlamanın en iyi yolu hangisidir?"
    secenekler: ["Simülatörü hiç kullanmamak", "Bir özelliği ekleyip denemek, sonra diğerine geçmek", "Tüm kodu yazıp en sonda bir kez denemek", "Başkasının kodunu kopyalamak"]
    dogru: 1
    aciklama: "Her özellik ayrı denenirse hata hemen bulunur."
  - soru: "“İki yıldız, bir dilek” geri bildiriminde “dilek” nedir?"
    secenekler: ["Geliştirilebilecek bir öneri", "Projenin puanı", "Sunumun süresi", "Projenin beğenilen bir yönü"]
    dogru: 0
    aciklama: "Yıldızlar beğenilen yönler, dilek ise bir geliştirme önerisidir."
  - soru: "Sunumda projenin nasıl çalıştığını anlatırken hangi üç parçayı söylemek gerekir?"
    secenekler: ["Renk, şekil, boyut", "Başla, Bitir, ok", "Pil, kablo, kutu", "Sensör, işlemci, eyleyici"]
    dogru: 3
    aciklama: "Her sistem algılar, karar verir ve harekete geçer."
---

Planın hazır. Şimdi onu çalışan bir projeye nasıl dönüştüreceksin?

**Adım adım kodla.** Bütün kodu bir kerede yazma. Bir özelliği ekle, dene, çalışıyorsa sonrakine geç. Kapı alarmı için sıra şöyle olabilir:

1. A ile alarmı kur, B ile kapat. Ekranda göster. Dene.
2. Sallanınca ses çalsın. Dene.
3. Ses yalnızca alarm kuruluyken çalsın. Dene.
4. Radyo ile ikinci karta mesaj gönder. Dene.

Önce simülatörde, sonra gerçek kartta dene. Simülatörde çalışan bir şey kartta çalışmazsa bağlantıları ve pil durumunu kontrol et.

**Test tablosu tut.** Her denemede ne beklediğini ve ne olduğunu yaz. Fark varsa hata ayıkla (Hatırla: Robotik Kodlamaya Giriş, Sıra Önemli! dersi).

| Özellik | Beklenen | Olan | Düzeltme |
|---|---|---|---|
| Sallanınca alarm | Ses ve kızgın yüz | Ses yok | `alarm` 1 yapılmamış; önce A'ya basılmalı |
| | | | |
| | | | |

**Sunumunu hazırla.** İki dakikalık sunum şu sırayla olsun:

1. **Sorun:** Hangi sorunu çözdük?
2. **Çözüm:** Projemiz ne yapıyor?
3. **Nasıl çalışıyor:** Sensör, işlemci ve eyleyiciler neler?
4. **Canlı gösteri:** Projeyi çalıştır.
5. **Zorluk:** En çok neyde zorlandık, nasıl çözdük?
6. **Gelecek:** Daha fazla zamanımız olsa neyi eklerdik?

**Geri bildirim.** Arkadaşlarının sunumlarına “İki yıldız, bir dilek” yöntemiyle geri bildirim ver: Beğendiğin iki şeyi ve geliştirilebilecek bir şeyi söyle.

![Proje Yapımı ve Sunum — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/70109163-29a2-4c0e-9b9d-7f5f786ddd3c.png)

> 💡 Sık yapılan hata: Her şeyi bir kerede yazıp sonra denemek. Böyle olunca hata nerede bilinmez. Küçük adımlarla ilerle, her adımda dene.

### Dene!

![Proje Yapımı ve Sunum — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/5d0a8b90-85cc-4452-b798-58b14af16d6a.png)

Projeni bitir ve sun. Sunumdan önce kontrol et:

- [ ] Proje gerçek kartta çalışıyor mu?
- [ ] Test tablosunda en az üç deneme var mı?
- [ ] Sensör, işlemci ve eyleyiciyi söyleyebiliyor musun?
- [ ] Sunum iki dakikaya sığıyor mu?
- [ ] Canlı gösteri için yedek pil ya da kablo hazır mı?

Şimdi giriş sorusuna dönelim. Planı küçük adımlarla koda dönüştürür, her adımı test eder ve sonunda projeni sınıfa anlatırsın. Bir sonraki dönemde aynı projeleri MicroPython ile yazacaksın.

### Bugün öğrendiklerin

- Projeler küçük adımlarla kodlanır ve her adım test edilir.
- Test tablosu, hataları bulmayı ve düzeltmeyi kolaylaştırır.
- İyi bir sunum sorunu, çözümü, çalışma biçimini ve canlı gösteriyi içerir.

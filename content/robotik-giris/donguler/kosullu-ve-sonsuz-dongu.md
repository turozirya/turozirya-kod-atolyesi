---
kurs: robotik-giris
modul: donguler
slug: kosullu-ve-sonsuz-dongu
sira: 1
baslik: "Koşullu ve Sonsuz Döngü"
ozet: "Bu derste bir koşul sağlandıkça ya da durmadan tekrar eden döngüleri ayırt edeceksin."
sure: 20
puan: 10
kod_dili: sozde_kod
arac_linki: ""
malzemeler: []
video: ""
ornek_kod: |
  Koşullu döngü:
  1. Başla
  2. Musluğu aç
  3. Bardak dolmadığı sürece tekrarla:
       bekle
  4. Musluğu kapat
  5. Bitir

  Sonsuz döngü:
  1. Başla
  2. Sürekli tekrarla:
       sıcaklığı ölç
       sıcaklığı ekrana yaz
test:
  - soru: "“Bardak dolmadığı sürece bekle” hangi tür döngüdür?"
    secenekler: ["Koşullu döngü", "Sonsuz döngü", "Karar yapısı", "Sayılı döngü"]
    dogru: 0
    aciklama: "Tekrar sayısı belli değil; bir koşul sağlandıkça devam ediyor."
  - soru: "Robotlar neden çoğunlukla sonsuz döngüde çalışır?"
    secenekler: ["Kapatma düğmeleri olmadığı için", "Döngü yazmak kolay olduğu için", "Çevrelerini sürekli algılayıp tepki vermeleri gerektiği için", "Pilleri bitmesin diye"]
    dogru: 2
    aciklama: "Robot, algıla–karar ver–harekete geç adımlarını çalıştığı sürece tekrarlamalıdır."
  - soru: "Musluk hiç açılmadan “Bardak dolmadığı sürece bekle” çalışırsa ne olur?"
    secenekler: ["Döngü bir kez çalışıp biter", "Program kendini düzeltir", "Bardak hemen dolar", "Bardak hiç dolmaz, döngü hiç bitmez"]
    dogru: 3
    aciklama: "Koşul hiçbir zaman yanlış olmaz; döngü istemeden sonsuza kadar sürer."
---

Robot süpürge odayı temizlerken kaç kez döneceğini önceden bilir mi?

Bazen bir işin kaç kez tekrar edileceğini bilemeyiz. Bu durumda iki tür döngü kullanılır.

**Koşullu döngü**, bir koşul doğru olduğu sürece tekrar eder. Koşul yanlış olunca döngü biter. “Bardak dolmadığı sürece bekle” bir koşullu döngüdür. Kaç saniye bekleneceği belli değildir. Bardak dolunca döngü biter.

**Sonsuz döngü**, durmadan tekrar eden döngüdür. Akıllı bir termometre sıcaklığı bir kez değil, sürekli ölçer ve gösterir. Bunun için sonsuz döngü kullanılır.

Örnek: Örnek kod kutusunda iki döngü var. Birincisi koşullu, ikincisi sonsuz döngüdür.

Robotlar ve akıllı sistemler genellikle sonsuz döngüde çalışır. Algıla, karar ver ve harekete geç adımları saniyede defalarca tekrarlanır (Hatırla: Hepsi Bir Arada dersi). MakeCode'daki `forever` bloğu bir sonsuz döngüdür. Gece lambası programında onu kullanmıştın.

**Tartışmalı örnek:** Sonsuz döngü iyi mi, kötü mü? İkisi de olabilir. Robotlarda sonsuz döngü bilerek kullanılır. Ama bazen bir koşul hiç yanlış olmaz ve döngü istemeden sonsuza kadar sürer. Bu bir hatadır. Örneğin musluğu açmayı unutursan bardak hiç dolmaz.

![Koşullu ve Sonsuz Döngü — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/4a153e0a-26d4-4dbc-8925-6c2ab367c8f3.png)

> 💡 Sık yapılan hata: Her döngünün kaç kez çalışacağının önceden bilindiği sanılır. Koşullu döngüde tekrar sayısı, koşul yanlış olana kadar belli değildir.

### Dene!

![Koşullu ve Sonsuz Döngü — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/56c6e0d0-c7c6-4c69-8168-34ce850811bd.png)

Her durumun hangi döngü türüne uyduğunu yaz: sayılı, koşullu ya da sonsuz.

| Durum | Döngü türü | Neden? |
|---|---|---|
| Bir şarkıyı 3 kez çal | Sayılı | Tekrar sayısı belli. |
| Zil çalana kadar ders çalış | | |
| Akıllı termometre sıcaklığı hep göstersin | | |
| Merdivenin 12 basamağını çık | | |
| Robot süpürge pil bitmediği sürece temizlesin | | |

Kontrol: koşullu, sonsuz, sayılı, koşullu.

Şimdi giriş sorusuna dönelim. Robot süpürge kaç kez döneceğini önceden bilmez. Engel gördükçe döner ve çalıştığı sürece bunu tekrarlar.

### Bugün öğrendiklerin

- Koşullu döngü, bir koşul doğru olduğu sürece tekrar eder.
- Sonsuz döngü durmadan tekrar eder; robotlar çoğunlukla böyle çalışır.
- Koşulu hiç yanlış olmayan bir döngü istemeden sonsuza kadar sürer.

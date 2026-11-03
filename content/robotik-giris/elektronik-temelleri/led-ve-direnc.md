---
kurs: robotik-giris
modul: elektronik-temelleri
slug: led-ve-direnc
sira: 2
baslik: "LED ve Direnç"
ozet: "Bu derste LED'i doğru bağlamayı ve direncin LED'i nasıl koruduğunu öğreneceksin."
sure: 20
puan: 10
kod_dili: ""
arac_linki: ""
malzemeler: ["1 LED", "2–3 krokodil kablo", "Pil yuvası", "Varsa 1 adet 220 Ω direnç"]
video: ""
ornek_kod: ""
test:
  - soru: "LED'in uzun bacağı pilin hangi ucuna bağlanır?"
    secenekler: ["Herhangi bir uca", "Hiçbir uca bağlanmaz", "Artı (+) ucuna", "Eksi (−) ucuna"]
    dogru: 2
    aciklama: "Uzun bacak artı (+) bacaktır ve pilin artı ucuna bağlanır."
  - soru: "Direncin devredeki görevi nedir?"
    secenekler: ["Devreyi açıp kapatmak", "Işık üretmek", "Elektriği artırmak", "Elektriğin akışını azaltıp LED'i korumak"]
    dogru: 3
    aciklama: "Direnç elektriğin akışını azaltır; böylece LED fazla akımdan korunur."
  - soru: "Ali LED'i ters taktı ve LED yanmadı. Ne yapmalı?"
    secenekler: ["LED'i atıp yenisini takmalı", "LED'i çevirip uzun bacağı artıya bağlamalı", "Direnci çıkarmalı", "Devreye daha çok pil eklemeli"]
    dogru: 1
    aciklama: "LED tek yönde çalışır; çevirip doğru takınca yanar."
---

LED'i ters takarsan ne olur? Yanar mı, bozulur mu, yoksa hiçbir şey mi olmaz?

**LED**, elektrik geçince ışık veren küçük bir elemandır. Adı İngilizcede “ışık yayan diyot” anlamına gelir.

LED'in iki bacağı vardır. **Uzun bacak artı (+)** bacaktır. **Kısa bacak eksi (−)** bacaktır. LED'in alt kenarında düz bir yer varsa, o taraf eksi bacağın tarafıdır.

LED yalnızca tek yönde çalışır. Uzun bacak pilin artısına, kısa bacak pilin eksisine bağlanmalıdır.

**Direnç**, elektriğin akışını azaltan bir elemandır. Birimi **ohm**'dur ve Ω işaretiyle gösterilir. LED çok fazla elektrik alırsa ısınır ve bozulabilir. Direnç, LED'e giden elektriği azaltır ve onu korur.

Bahçe hortumunu düşün. Ucunu parmağınla biraz sıkarsan su yine akar ama daha az akar. Direnç de devrede aynı işi yapar.

Örnek: Robot süpürgenin üstündeki “şarj oluyor” ışığı bir LED'dir. Bu LED'in devresinde onu koruyan bir direnç bulunur.

![LED ve Direnç — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/5b9e03fd-114d-48bb-b717-4f0d6e90feb2.png)

> 💡 Sık yapılan hata: Ters takılan LED'in bozulduğu sanılır. Pille kurulan basit devrelerde LED genellikle bozulmaz, sadece yanmaz. Çevirip doğru takınca yanar.

### Dene!

![LED ve Direnç — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/3a538fc4-3150-4995-9f3a-fcee20d1b25b.png)

Aşağıdaki durumlarda LED'e ne olacağını tahmin et. Sınıfta öğretmeninle birlikte deneyerek kontrol et.

| Durum | LED ne olur? |
|---|---|
| Uzun bacak artıya, kısa bacak eksiye bağlı | Yanar |
| Uzun bacak eksiye, kısa bacak artıya bağlı | |
| Bacaklardan biri boşta | |
| Devreye bir direnç eklendi | |

Kontrol: Ters bağlanınca LED yanmaz. Bir bacak boştaysa devre açıktır ve LED yanmaz. Direnç eklenince LED yanar ama biraz daha sönük olabilir.

Şimdi giriş sorusuna dönelim. Ters takılan LED genellikle bozulmaz, yalnızca yanmaz. Uzun bacağı artıya gelecek şekilde çevirince yanar.

### Bugün öğrendiklerin

- LED'in uzun bacağı artı (+), kısa bacağı eksi (−) bacaktır.
- LED yalnızca tek yönde çalışır.
- Direnç elektriğin akışını azaltır ve LED'i korur.

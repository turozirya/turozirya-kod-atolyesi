---
kurs: robotik-giris
modul: elektronik-temelleri
slug: elektrik-devresi
sira: 0
baslik: "Elektrik Devresi"
ozet: "Bu derste bir devrenin elemanlarını tanıyacak, açık ve kapalı devreyi ayırt edeceksin."
sure: 20
puan: 10
kod_dili: ""
arac_linki: ""
malzemeler: ["Kâğıt ve kalem", "Krokodil kablo, LED ve pil yuvası (öğretmen gösterimi için)"]
video: ""
ornek_kod: ""
test:
  - soru: "Hangisi kapalı devredir?"
    secenekler: ["Kablosu kopuk olan devre", "Anahtarı açık olan devre", "Yolu tam bir halka olan devre", "Pili çıkarılmış devre"]
    dogru: 2
    aciklama: "Elektrik ancak yol tam bir halka olduğunda akar; buna kapalı devre denir."
  - soru: "El fenerinde düğmenin görevi nedir?"
    secenekler: ["Elektrik üretmek", "Yolu açıp kapatmak", "Işığı renklendirmek", "Pili şarj etmek"]
    dogru: 1
    aciklama: "Düğme bir anahtardır; yolu kapatınca ışık yanar, açınca söner."
  - soru: "Robot süpürgenin şarj ışığı yanmıyor. Önce neyi kontrol etmek mantıklıdır?"
    secenekler: ["Kablolarda kopukluk olup olmadığını", "LED'in renginin doğru olup olmadığını", "Tekerleklerin dönüp dönmediğini", "Odanın sıcaklığını"]
    dogru: 0
    aciklama: "Yol bir yerden kopuksa devre açık kalır ve LED yanmaz."
---

El fenerinin düğmesine basınca ışık yanar. Düğmeyi bırakınca neden söner?

Bir **elektrik devresi**, elektriğin dolaştığı kapalı bir yoldur. Basit bir devrede dört eleman bulunur:

- **Pil:** Devreye enerji veren güç kaynağıdır. Bir ucu artı (+), diğer ucu eksi (−) uçtur.
- **Kablo:** Elektriğin yürüdüğü yoldur.
- **LED:** Elektrik geçince ışık veren küçük bir elemandır.
- **Anahtar:** Yolu açıp kapatan düğmedir.

Elektrik pilin bir ucundan çıkar. Devreyi dolaşır ve pilin öbür ucuna döner. Bu yol hiçbir yerde kesilmemelidir.

Yol tam bir halkaysa buna **kapalı devre** denir. Elektrik akar ve LED yanar. Yol bir yerden kesilmişse buna **açık devre** denir. Elektrik akamaz ve LED yanmaz.

Bunu bir koşu pistine benzet. Pist tam bir halkaysa koşucu turunu tamamlar. Pistin bir yeri kopuksa koşucu ilerleyemez.

![elektrik-devresi-a-d](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/73b5d51f-34d8-4883-86c3-21f58521c33c.png)

> 💡 Sık yapılan hata: Pil ve LED olunca devrenin çalışacağı sanılır. Oysa yol tam bir halka olmazsa LED yanmaz. Önce yolda kopukluk olup olmadığına bak.

### Dene!

Görseldeki dört devreye bak. Her biri için LED'in yanıp yanmayacağını tahmin et. Nedenini de yaz.

| Devre | LED yanar mı? | Neden? |
|---|---|---|
| A | Evet | Yol tam bir halka, devre kapalı. |
| B | | |
| C | | |
| D | | |

Sınıfta öğretmenin bu devreleri krokodil kablo, pil ve LED ile kurup gösterebilir. Tahminlerinizi birlikte kontrol edin.

Şimdi giriş sorusuna dönelim. El fenerinin düğmesi bir anahtardır. Basınca yol kapanır, elektrik akar ve ışık yanar. Bırakınca yol açılır ve ışık söner.

### Bugün öğrendiklerin

- Basit bir devrede pil, kablo, LED ve anahtar bulunur.
- Yol tam bir halkaysa devre kapalıdır ve LED yanar.
- Yol bir yerden kesikse devre açıktır ve LED yanmaz.

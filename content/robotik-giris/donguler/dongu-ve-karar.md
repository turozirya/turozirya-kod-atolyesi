---
kurs: robotik-giris
modul: donguler
slug: dongu-ve-karar
sira: 2
baslik: "Döngü ve Karar Birlikte"
ozet: "Bu derste döngü içinde karar veren bir algoritmanın akış şemasını çizeceksin."
sure: 25
puan: 10
kod_dili: sozde_kod
arac_linki: ""
malzemeler: ["Kâğıt, kalem ve cetvel"]
video: ""
ornek_kod: |
  1. Başla
  2. Sürekli tekrarla:
       Eğer önünde engel varsa:
           sağa dön
       Değilse:
           ileri git
test:
  - soru: "Robot süpürge algoritmasında “Önünde engel var mı?” kararı kaç kez verilir?"
    secenekler: ["Yalnızca engel görünce", "Döngünün her turunda bir kez", "Hiç verilmez", "Yalnızca bir kez"]
    dogru: 1
    aciklama: "Karar döngünün içindedir; her turda yeniden verilir."
  - soru: "Akış şemasında döngü nasıl gösterilir?"
    secenekler: ["Oval bir şekille", "Kırmızı renkle", "İki tane Bitir şekliyle", "Okun geri dönüp önceki bir adıma bağlanmasıyla"]
    dogru: 3
    aciklama: "Döngüde ok geri döner ve aynı adımlar tekrar çalışır."
  - soru: "Algoritmada önünde engel yoksa robot ne yapar?"
    secenekler: ["Durur", "Şarja döner", "İleri gider", "Sağa döner"]
    dogru: 2
    aciklama: "Koşul yanlışsa “değilse” kısmı çalışır: ileri git."
---

Robot süpürge yalnızca tek bir kuralla bütün odayı nasıl dolaşır?

Döngü ve karar birlikte kullanılabilir. Bu durumda döngünün her turunda bir karar verilir. Karar her seferinde yeniden kontrol edilir.

Örnek: Örnek kod kutusunda basit bir robot süpürge algoritması var. Robot sürekli şunu sorar: “Önünde engel var mı?” Engel varsa sağa döner. Engel yoksa ileri gider. Sonra aynı soruyu tekrar sorar.

Akış şemasında döngü, geri dönen bir okla gösterilir. Ok, önceki bir adıma bağlanır ve aynı adımlar tekrar çalışır.

![Döngü ve Karar Birlikte — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/c6624943-fb6e-49ee-81b6-7abab9c7208d.png)

Bu şemada “Bitir” yoktur. Robot çalıştığı sürece döngü devam eder. Akış şemalarında “Bitir” yalnızca biten algoritmalarda bulunur.

**Tartışmalı örnek:** Gerçek robot süpürgeler bundan çok daha karmaşık algoritmalar kullanır. Bazıları odanın haritasını çıkarır. Buradaki algoritma, işin en basit halidir.

> 💡 Sık yapılan hata: Döngünün içindeki kararın yalnızca bir kez verildiği sanılır. Karar döngünün her turunda yeniden verilir.

### Dene!

![Döngü ve Karar Birlikte — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/d864345b-def1-460b-b5aa-da81d4409fe2.png)

Algoritmayı geliştirelim: Robot pil 20'nin altına düşene kadar temizlesin, sonra şarj istasyonuna dönsün. Bu algoritmanın akış şemasını çiz. Önce tabloyu doldur.

| Sıra | Şekil | İçindeki yazı |
|---|---|---|
| 1 | Oval | Başla |
| 2 | Eşkenar dörtgen | Pil 20'den az mı? |
| 3 | | |
| 4 | | |
| 5 | | |
| 6 | | |

Kontrol: Pil 20'den azsa “Evet” oku “Şarja dön” kutusuna, oradan “Bitir”e gider. “Hayır” ise “Önünde engel var mı?” kararına gider. Oradan “Sağa dön” ya da “İleri git” yapılır ve ok tekrar pil sorusuna döner.

Şimdi giriş sorusuna dönelim. Robot süpürge tek bir kuralı sonsuz döngü içinde tekrar tekrar uygular. Engel varsa döner, yoksa ilerler.

### Bugün öğrendiklerin

- Döngünün içindeki karar, her turda yeniden verilir.
- Akış şemasında döngü, geri dönen bir okla gösterilir.
- Sonsuz döngüdeki bir şemada “Bitir” bulunmaz.

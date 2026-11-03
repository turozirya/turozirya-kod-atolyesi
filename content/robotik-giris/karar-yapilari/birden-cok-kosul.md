---
kurs: robotik-giris
modul: karar-yapilari
slug: birden-cok-kosul
sira: 2
baslik: "Birden Çok Koşul"
ozet: "Bu derste üç ya da daha fazla yollu kararları ve “ve”, “veya” bağlaçlarını kullanacaksın."
sure: 20
puan: 10
kod_dili: sozde_kod
arac_linki: ""
malzemeler: []
video: ""
ornek_kod: |
  1. Başla
  2. Sıcaklığı al
  3. Eğer sıcaklık < 10 ise:
       "Mont giy" yaz
     Değilse eğer sıcaklık < 20 ise:
       "Ceket giy" yaz
     Değilse:
       "Tişört giy" yaz
  4. Bitir
test:
  - soru: "Örnek koddaki algoritmada sıcaklık 5 ise ne yazılır?"
    secenekler: ["Hem “Mont giy” hem “Ceket giy”", "Tişört giy", "Mont giy", "Ceket giy"]
    dogru: 2
    aciklama: "İlk koşul (5 < 10) doğrudur; ilk doğru koşulun işi yapılır, gerisi atlanır."
  - soru: "“Hava güneşli VE ödevin bitti” koşulu ne zaman doğrudur?"
    secenekler: ["İkisinden biri doğruysa", "İkisi de doğruysa", "Yalnızca hava güneşliyse", "Hiçbiri doğru değilse"]
    dogru: 1
    aciklama: "“Ve” ile bağlanan koşulda iki koşulun da doğru olması gerekir."
  - soru: "Robot süpürge “Eğer hafta içiyse VEYA saat 10'u geçtiyse: temizliğe başla” kuralını izliyor. Bugün cumartesi ve saat 11. Ne yapar?"
    secenekler: ["Yarım temizlik yapar", "Cumartesi olduğu için başlamaz", "Hata verir", "Temizliğe başlar"]
    dogru: 3
    aciklama: "“Veya” ile koşullardan birinin doğru olması yeter; saat 10'u geçmiştir."
---

Hava soğuksa mont, ılıksa ceket, sıcaksa tişört giyersin. İki yol yetmezse ne yaparız?

Bazen ikiden fazla seçenek vardır. O zaman **değilse eğer** kullanırız. Koşullar yukarıdan aşağı sırayla kontrol edilir. İlk doğru olan koşulun işi yapılır. Geri kalan koşullar atlanır.

Örnek: Örnek kod kutusundaki algoritmayı sıcaklık 15 ile izleyelim:

- 15 < 10 mu? Yanlış. Bir sonraki koşula geç.
- 15 < 20 mi? Doğru. “Ceket giy” yazılır.
- “Değilse” kısmı atlanır.

Bazen bir kararı iki koşula birden bağlarız. Bunun için **ve**, **veya** bağlaçları kullanılır:

- **Ve:** İki koşulun da doğru olması gerekir. “Eğer hava güneşliyse ve ödevin bittiyse parka git.”
- **Veya:** Koşullardan en az birinin doğru olması yeter. “Eğer hafta sonuysa veya tatildeysen geç kalk.”

| Koşul A | Koşul B | A ve B | A veya B |
|---|---|---|---|
| doğru | doğru | doğru | doğru |
| doğru | yanlış | yanlış | doğru |
| yanlış | doğru | yanlış | doğru |
| yanlış | yanlış | yanlış | yanlış |

Robot süpürge de birden çok koşul kullanır. Eğer pil 20'den azsa şarja döner. Değilse eğer toz haznesi doluysa uyarı sesi çalar. Değilse temizlemeye devam eder.

![Birden Çok Koşul — kavram görseli](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/e9cb9c82-7e29-47b7-bc34-f56ce39b5909.png)

> 💡 Dikkat: Günlük dilde “veya” çoğu zaman “ikisinden yalnızca biri” anlamına gelir. Kodda ise “veya”, iki koşul birden doğru olduğunda da doğrudur.

### Dene!

![Birden Çok Koşul — Dene! çalışma kartı](https://jgucnevkknxczcsiqrjf.supabase.co/storage/v1/object/public/lesson-media/4eb33cea-c0a2-4077-8dcb-f6681250d5d1.png)

Bir sınav puanına göre mesaj veren algoritmayı izle:

```
Eğer puan > 84 ise:
    "Harika!" yaz
Değilse eğer puan > 69 ise:
    "İyi" yaz
Değilse:
    "Çalışmaya devam" yaz
```

| Puan | İlk doğru koşul | Ekrana ne yazılır? |
|---|---|---|
| 92 | puan > 84 | Harika! |
| 70 | | |
| 85 | | |
| 45 | | |

Kontrol: 70 için “İyi”, 85 için “Harika!”, 45 için “Çalışmaya devam” yazılır.

Şimdi giriş sorusuna dönelim. İki yol yetmediğinde “değilse eğer” ile üç ya da daha fazla yol kurarız.

### Bugün öğrendiklerin

- “Değilse eğer” ile ikiden fazla yollu kararlar kurulur.
- Koşullar sırayla kontrol edilir; yalnızca ilk doğru koşulun işi yapılır.
- “Ve” için iki koşul da, “veya” için en az biri doğru olmalıdır.

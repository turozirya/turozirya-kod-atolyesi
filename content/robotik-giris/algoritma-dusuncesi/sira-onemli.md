---
kurs: robotik-giris
modul: algoritma-dusuncesi
slug: sira-onemli
sira: 1
baslik: "Sıra Önemli!"
ozet: "Bu derste algoritmadaki yanlış sıralı ve eksik adımları bulup düzelteceksin."
sure: 20
puan: 10
kod_dili: sozde_kod
arac_linki: ""
malzemeler: ["Kâğıt ve kalem", "Bir kalem ya da silgi (hedef nesne)"]
video: ""
ornek_kod: |
  1. Başla
  2. Bitkiye su dök
  3. Sulama kabını musluğun altına koy
  4. Musluğu aç
  5. Kap dolunca musluğu kapat
  6. Bitir
test:
  - soru: "Algoritmadaki bir hatayı bulup düzeltmeye ne denir?"
    secenekler: ["Hata ayıklama", "Algoritma silme", "Kodu kopyalama", "Programı kapatma"]
    dogru: 0
    aciklama: "Hatayı bulup düzeltmeye hata ayıklama denir."
  - soru: "Bitki sulama algoritmasında “Bitkiye su dök” adımı neden hatalıdır?"
    secenekler: ["Bitki iki kez sulanır", "Musluk hiç açılmaz", "Kap henüz boşken su dökülmeye çalışılır", "Algoritma daha hızlı biter"]
    dogru: 2
    aciklama: "Bu adım, kap dolmadan önce geliyor; sıra yanlış."
  - soru: "Robot arkadaşın kalemin bir adım gerisinde durdu. En olası hata nedir?"
    secenekler: ["“Sağa dön” yerine “sola dön” yazılmış", "Bir “1 adım ileri” komutu eksik", "Komutlar çok yavaş okunmuş", "Kalem yanlış renkte"]
    dogru: 1
    aciklama: "Robot yönü doğru ama bir adım eksik gitmiş; algoritmada bir ileri adımı eksik."
---

Çorabını ayakkabından sonra giymeye çalışırsan ne olur?

Bir algoritmada adımların **sırası** önemlidir. Doğru adımlar yanlış sırayla yazılırsa sonuç da yanlış olur.

Algoritmalarda iki sık hata vardır:

- **Yanlış sıra:** Adımlar doğru ama yerleri karışık.
- **Eksik adım:** Gereken bir adım hiç yazılmamış.

Algoritmadaki yanlışa **hata** denir. Programcılar buna İngilizcede “bug” der. Hatayı bulup düzeltmeye **hata ayıklama** denir. Her programcı hata yapar ve hata ayıklar.

Örnek: Örnek kod kutusundaki bitki sulama algoritmasına bak. Hatayı bulabilir misin?

2. adım çok erken geliyor. O anda sulama kabı henüz boş! Bitkiye su dökmek, kap dolduktan sonra gelmelidir. Doğru sırada “Bitkiye su dök” adımı, “Kap dolunca musluğu kapat” adımından sonra yer alır.

Hatayı bulmanın iyi bir yolu, algoritmayı adım adım kendin uygulamaktır. Her adımda “Şu an bu yapılabilir mi?” diye sor.

> 💡 Sık yapılan hata: Hata yapmanın kötü bir şey olduğu sanılır. Oysa her programcı hata yapar. Önemli olan hatayı bulup düzeltmektir.

### Dene!

**Robot arkadaşını yönet** oyunu: Bir arkadaşın robot olur. Robot yalnızca şu komutları anlar: “1 adım ileri”, “sağa dön”, “sola dön”, “kalemi al”. Hedef, robotun masadaki kalemi almasıdır.

Komutlarını önce kâğıda yaz. Sonra tek tek oku. Robot yalnızca okuduğunu yapar. Robot yanlış yere giderse hatayı bul ve algoritmanı düzelt. Evde oynuyorsan bir oyuncağı ya da silgiyi masada aynı komutlarla hareket ettir.

| Deneme | Komutlar | Sonuç | Hata ve düzeltme |
|---|---|---|---|
| 1 | 2 adım ileri, sağa dön, 1 adım ileri, kalemi al | Kalemin bir adım gerisinde kaldı | Bir adım eksik; “1 adım ileri” ekle |
| 2 | | | |
| 3 | | | |

Şimdi giriş sorusuna dönelim. Ayakkabıyı giydikten sonra çorap giyemezsin. Adımlar doğru ama sıra yanlış olduğu için algoritma çalışmaz.

### Bugün öğrendiklerin

- Algoritmada adımların sırası sonucu değiştirir.
- Yanlış sıra ve eksik adım en sık görülen hatalardır.
- Hatayı bulup düzeltmeye hata ayıklama denir.

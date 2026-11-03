---
kurs: microbit
modul: microbit-python-ile-donanim
slug: muzik-ve-mikrofon
sira: 2
baslik: "Müzik ve Mikrofon"
ozet: "Bu derste music kütüphanesiyle melodi çalacak, mikrofonla ses seviyesini ölçen bir program yazacaksın."
sure: 25
puan: 10
kod_dili: micropython
arac_linki: "https://python.microbit.org"
malzemeler: ["1 adet micro:bit", "1 adet USB kablo"]
video: ""
ornek_kod: |
  from microbit import *
  import music

  # Hoparlörün ses düzeyi (0–255)
  set_volume(120)
  # Nota adı + oktav : süre
  melodi = ["C4:4", "C4:4", "G4:4", "G4:4", "A4:4", "A4:4", "G4:8"]
  while True:
      # A: melodiyi çal
      if button_a.was_pressed():
          music.play(melodi)
      # Gürültü ölçer: ses yüksekse kızgın yüz
      if microphone.sound_level() > 128:
          display.show(Image.ANGRY)
      else:
          display.clear()
test:
  - soru: "`\"G4:8\"` notası nasıl çalar?"
    secenekler: ["Sol notası, 1 vuruş", "Sol notası, 2 vuruş", "Sol notası, 8 kez", "La notası, 4 vuruş"]
    dogru: 1
    aciklama: "G Sol notasıdır; :4 bir vuruş olduğu için :8 iki vuruş sürer."
  - soru: "`microphone.sound_level()` ne verir?"
    secenekler: ["Ortam sesinin kaydını", "Hoparlörün ses düzeyini", "Duyulan kelimeleri", "Ses seviyesini 0–255 arasında bir sayıyla"]
    dogru: 3
    aciklama: "Mikrofon sesi kaydetmez; yalnızca ne kadar yüksek olduğunu bir sayıyla verir."
  - soru: "Örnek kodda melodi çalarken sınıfta biri alkışlarsa ne olur?"
    secenekler: ["Melodi bitene kadar kızgın yüz görünmez", "Melodi hemen durur", "Kızgın yüz melodiyle aynı anda görünür", "Melodi baştan başlar"]
    dogru: 0
    aciklama: "music.play melodi bitene kadar programı bekletir; mikrofon kontrolü melodiden sonra yapılır."
---

Notalarla şarkıyı bloklarla çalmıştın. Python'da bir şarkı nasıl yazılır?

**Müzik.** Melodi komutları **music** kütüphanesindedir. Bu kütüphane için programın başına `import music` yazılır (Hatırla: Hareketler dersi — `import random`). Ses, kartın arkasındaki hoparlörden çıkar (Hatırla: Modül 5 — Hoparlör ve İlk Melodi).

Python'da her nota bir metin olarak yazılır. Örneğin `"C4:4"`:

- `C` nota adıdır. Do = C, Re = D, Mi = E, Fa = F, Sol = G, La = A, Si = B (Hatırla: Modül 5 — Notalarla Şarkı).
- `4` oktavdır. 4. oktav, bloklardaki `Middle` (orta) seslerdir. 5 daha tiz, 3 daha kalındır.
- `:4` süredir. `:4` bir vuruş, `:8` iki vuruş, `:2` yarım vuruştur.

Notaları bir listede toplar ve `music.play(melodi)` ile çalarsın (Hatırla: Listeler ve Görüntüler dersi). Örnek kod kutusundaki melodi, “Parla Parla Küçük Yıldız”ın ilk kısmıdır. Başka işe yarar komutlar:

- `music.play(music.BIRTHDAY)`: Hazır bir melodi çalar. `music.NYAN` ve `music.ENTERTAINER` da vardır.
- `music.set_tempo(bpm=160)`: Şarkıyı hızlandırır.
- `set_volume(120)`: Ses düzeyini 0–255 arasında ayarlar.

**Mikrofon.** `microphone.sound_level()` ses seviyesini 0 ile 255 arasında verir (Hatırla: Modül 4 — Mikrofon). Mikrofon sesi kaydetmez, yalnızca ölçer. Örnek koddaki program, ses 128'i geçince kızgın yüz gösterir. 128 yerine sınıfına uygun bir eşik seçebilirsin.

> 💡 Dikkat: `music.play` melodi bitene kadar programı bekletir. Bu sırada döngüdeki diğer satırlar çalışmaz. Örnek kodda mikrofon kontrolü, melodi bitince kaldığı yerden devam eder.

### Dene!

Şarkının ikinci kısmını Python'da yaz: Fa Fa Mi Mi Re Re Do. Son nota iki vuruş sürsün. Önce tabloyu doldur.

| Nota | Python yazımı |
|---|---|
| Fa | `"F4:4"` |
| Fa | |
| Mi | |
| Mi | |
| Re | |
| Re | |
| Do (2 vuruş) | |

Sonra bu notalarla `ikinci` adlı bir liste yap. B'ye basınca bu listeyi çaldır. **Meydan okuma:** Logoya dokununca `music.set_tempo(bpm=200)` çalışsın. Şarkı nasıl değişti?

Şimdi giriş sorusuna dönelim. Python'da şarkı, notaların metin olarak yazıldığı bir listedir. `music.play` bu listeyi sırayla çalar.

### Bugün öğrendiklerin

- Melodi komutları için `import music` yazılır; notalar `"C4:4"` biçiminde yazılır.
- `music.play(liste)` notaları sırayla çalar ve bitene kadar programı bekletir.
- `microphone.sound_level()` ses seviyesini 0–255 arasında verir.

-- Faz 6: taslak Arduino kursunun eksik ikinci dersi (CLAUDE.md §14:
-- "Butonla LED kontrolü") — çok-kurslu yapıyı test etmek için gerekli.
insert into lessons (
  module_id, slug, title, summary, content, example_code, code_language,
  tool_url, tool_label, materials, estimated_minutes, points, order_index, is_published
)
select '2868ed2d-7555-43b3-ab15-4d792984bb5a', 'butonla-led-kontrolu', 'Butonla LED Kontrolü',
  'Bir butona basınca LED''i yak.',
$md$## Butonla kontrol et

Bir buton ekleyip, ona basıldığında LED'in yanmasını sağlayacaksın.

1. Butonu ve LED'i devrene ekle, aşağıdaki Wokwi bağlantısından simülasyonu aç.
2. `digitalRead` ile butonun durumunu oku.
3. Buton basılıysa LED'i yak, değilse söndür.

> 💡 Butonun diğer ucunu GND'ye, bir direnç üzerinden de 5V'a bağlamayı unutma (pull-down direnci).
$md$,
$code$const int buttonPin = 2;
const int ledPin = 13;

void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int buttonState = digitalRead(buttonPin);
  digitalWrite(ledPin, buttonState);
}
$code$,
  'cpp',
  'https://wokwi.com/projects/new/arduino-uno', 'Wokwi''de Dene',
  array['1 adet LED', '1 adet buton', '1 adet 220Ω direnç', '1 adet 10kΩ direnç'],
  20, 10, 1, true;

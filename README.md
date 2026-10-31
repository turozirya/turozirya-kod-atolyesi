# Turozirya Kod Atölyesi

Ortaokul robotik kodlama kulübü için web tabanlı bir öğrenme platformu. Öğrenciler micro:bit (ve ileride Arduino, Raspberry Pi Pico gibi) kurslarını modül modül takip eder, puan ve rozet kazanır; öğretmenler ders/kurs içeriğini ve sınıfları panelden yönetir.

Teknoloji: Next.js (App Router) + React + TypeScript, Tailwind CSS + shadcn/ui (Base UI), Supabase (Postgres, Auth, RLS, Storage), Vercel.

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) açılır.

Diğer komutlar:

```bash
npm run lint    # ESLint
npm run test    # vitest (saf fonksiyonlar)
npm run build   # üretim derlemesi
```

## Ortam değişkenleri

`.env.example` dosyasını `.env.local` olarak kopyalayıp değerleri doldurun:

```bash
NEXT_PUBLIC_SUPABASE_URL=                # Supabase proje URL'i
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=     # Supabase anon/publishable key
SUPABASE_SECRET_KEY=                     # Supabase service_role/secret key — SADECE SUNUCUDA kullanılır, asla tarayıcıya gönderilmez
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STUDENT_EMAIL_DOMAIN=ogrenci.kodlamakulubu.local
```

`.env.local` asla commit edilmez.

## Supabase ayarları (yeni bir proje kurarken)

1. Yeni bir Supabase projesi oluşturun (tercihen Avrupa bölgesi, örn. Frankfurt).
2. `supabase/migrations/` altındaki tüm dosyaları sırayla projeye uygulayın (Supabase CLI veya panel SQL Editor ile).
3. **Authentication → Providers → Email**: "Confirm email" **kapalı**, "Enable email provider" **açık** olmalı (ikisi de varsayılan farklı gelebilir).
4. **Authentication → URL Configuration**: Site URL ve Redirect URL listesine `http://localhost:3000` ve canlı (Vercel) alan adınızı ekleyin.
5. **Storage**: `lesson-media` kovası migration'larla otomatik oluşur (ders görselleri için, herkese açık okuma, yalnızca öğretmen yazabilir).
6. Mümkünse **Authentication → Providers → Email → "Leaked password protection"**'ı açın (bu özellik Supabase Pro plana ihtiyaç duyar; Free planda atlanabilir).
7. Okulda tek bir IP'den çok sayıda öğrenci aynı anda kayıt olacaksa **Authentication → Rate Limits**'i gözden geçirin; bunun yerine öğretmen panelinden **toplu öğrenci oluşturma** kullanılması önerilir (bkz. aşağıda).

## Öğretmen hesabı oluşturma

Kayıt formunda öğretmen seçeneği yoktur — herkes önce normal şekilde (gerçek e-postasıyla) kayıt olur, sonra rolü SQL ile değiştirilir:

```sql
update public.profiles set role = 'teacher' where id = '<auth kullanıcı id>';
```

Kullanıcı id'si Supabase panelinde **Authentication → Users**'tan veya `select id from auth.users where email = '...'` ile bulunur.

## Öğretmenler için: yeni ders veya kurs ekleme

Kod değişikliği gerekmez, her şey `/ogretmen` panelinden yapılır.

**Yeni ders eklemek:**
1. `/ogretmen/kurslar` → ilgili kursa girin → ilgili modülü açın → "Yeni Ders".
2. Başlık, açıklama, içerik (Markdown, canlı önizlemeli), varsa örnek kod, malzeme listesi, varsa video/araç linki doldurun.
3. "Yayında" anahtarını açmadan önce "Öğrenci gibi önizle" ile kontrol edebilirsiniz.
4. Yayınladığınızda ders, dersin bağlı olduğu kursa atanmış sınıflardaki öğrencilere görünür.

**Yeni kurs eklemek (örn. Arduino, Raspberry Pi Pico):**
1. `/ogretmen/kurslar` → "Yeni Kurs": ad, platform, varsayılan kod dili, ikon, renk.
2. Kursa modüller ve dersler ekleyin (yukarıdaki gibi).
3. İsterseniz `/ogretmen/rozetler`'den kursa özel rozetler tanımlayın.
4. Kursu yayınlayın ve `/ogretmen/siniflar` üzerinden ilgili sınıflara atayın — öğrencilerin panelinde kurs kartı otomatik belirir.

**Sınıf ve öğrenci yönetimi** (`/ogretmen/siniflar`): sınıf oluşturma, katılım kodu, sınıfa kurs atama, tek tek veya toplu öğrenci oluşturma (kullanıcı adı/şifre otomatik üretilir, yazdırılabilir kartlar), şifre sıfırlama, bonus puan verme, ilerleme raporları ve CSV dışa aktarma.

## Proje yapısı ve geliştirme kuralları

Ayrıntılı mimari, veritabanı şeması, rota haritası ve faz geçmişi için [`CLAUDE.md`](./CLAUDE.md) dosyasına bakın.

# Turozirya Kod Atölyesi — Proje Planı ve Claude Code Rehberi

> Bu dosya projenin kök dizininde `CLAUDE.md` olarak durur. Claude Code her oturumda bu dosyayı okur.
> Proje **fazlar** halinde geliştirilir. Her faz bitmeden bir sonrakine geçilmez.
> En alttaki **Faz Promptları** bölümündeki metinler sırayla Claude Code'a yapıştırılır.

---

## 0. Faz Durumu (Claude Code her faz sonunda burayı günceller)

- [x] Faz 0 — Proje kurulumu ve temel iskelet
- [x] Faz 1 — Veritabanı, kimlik doğrulama ve roller
- [x] Faz 2 — Ders yönetimi (öğretmen) ve ders görüntüleme (öğrenci)
- [ ] Faz 3 — İlerleme takibi ve "kaldığın yerden devam"
- [ ] Faz 4 — Oyunlaştırma (puan, seviye, rozet, sıralama)
- [ ] Faz 5 — Öğretmen paneli: sınıf yönetimi ve raporlar
- [ ] Faz 6 — Cilalama, erişilebilirlik, örnek içerik ve Vercel yayını

Faz notları (Claude Code doldurur — alınan önemli kararlar, ertelenen işler):

- **Faz 2:**
  - Kod renklendirme: `shiki` seçildi. `CodeBlock` bir Server Component (sunucuda `codeToHtml` ile HTML üretir), yanında yalnızca panoya kopyalama için `"use client"` olan küçük bir `CopyButton` — veri/render sunucuda, etkileşim istemcide kuralına uygun.
  - `0008_storage.sql`: `lesson-media` bucket'ı (public, png/jpeg/webp, 2MB sınırı) + `storage.objects` politikaları (okuma herkese, yazma/silme yalnızca `is_teacher()`). `next.config.ts`'e `images.remotePatterns` Supabase URL'inden türetilerek eklendi (sabit host yazılmadı).
  - Sıralama: sürükle-bırak değil, basit yukarı/aşağı ok butonları (`ReorderButtons`, komşu `order_index` takası, iki ayrı `.update()` — puan sistemi dışında atomiklik gerekmiyor).
  - "Öğrenci gibi önizle": ayrı bir render yolu yazılmadı, gerçek `/dersler/...` URL'sine link (öğretmen RLS'te `is_published` kısıtından zaten muaf).
  - Seed içerik (`0009_seed_microbit_content.sql`): CLAUDE.md §14'ün "(blok)" etiketini esas aldım (Faz 2 prompt metni "örnek MicroPython kodu" diyordu ama bu §14/§10.1 ile çelişiyordu) — "micro:bit ile Tanışma" ve "Sensörler" modülleri, her birinde 4 ders, `code_language='blocks'`, gerçek Türkçe içerik + malzeme listesi.
  - **Kritik RSC hatası ve düzeltmesi:** Server Component sayfalardan Client Component'lere (`ReorderButtons`, `PublishSwitch`, `ConfirmDeleteDialog`) inline ok fonksiyonu (`onReorder={(d) => reorderCourse(course.id, d)}`) geçirilemiyor ("Event handlers cannot be passed to Client Component props"). Çözüm: Server Action'ın kendisini `.bind(null, ...args)` ile bağlamak (`reorderCourse.bind(null, course.id)`). İleride benzer prop geçişlerinde bu kalıp tekrar edecek.
  - `(ogrenci)/layout.tsx`, `requireRole("student")` yerine yeni `requireProfile()` (rol kontrolü yok, sadece oturum) kullanıyor — "Öğrenci gibi önizle" linkine tıklayan öğretmen `/ogretmen`'e geri atılmasın diye. RLS zaten öğretmene her şeyi gösteriyor; CLAUDE.md §5.4 yalnızca öğrenci→öğretmen yönünü yasaklıyor, bu değişiklik güvenlik kontrol listesini ihlal etmiyor.
  - `src/lib/text.ts` yeni dosya: `turkishToAscii` ve `slugify`, `username.ts`'ten taşındı/genelleştirildi (slug üretimi için de gerekiyordu).
  - Test fixture'ları (Faz 2 QA için, saklandı): Arduino kursu + 1 modül + 1 ders, taslak/test amaçlı eklendi — yayında değil, test sınıfına atanmadı, kalıcı olarak DB'de duruyor (Faz 1'deki fixture saklama emsaline uygun).
  - Supabase Security Advisor: yeni/Faz-2-kaynaklı bulgu yok; mevcut uyarılar (anon/authenticated `check_class_code`+yardımcı fonksiyon execute izinleri, leaked password protection kapalı) Faz 1'den beri bilinen ve bilerek ertelenen maddeler (ilki kayıt akışı için gerekli, ikincisi Faz 6 kontrol listesinde).
  - Doğrulama: `npm run lint` (0 hata), `npm test` (31/31), `npm run build` (başarılı, 15 rota doğru static/dynamic) temiz geçti; tarayıcıda öğretmen (kurs/modül/ders CRUD, yayınla/gizle, sıralama, slug üretimi, canlı Markdown önizleme, Shiki kod renklendirme, öğrenci gibi önizleme) ve öğrenci (kurs listesi, tek-kurs otomatik yönlendirme, modül/ders gezinme, malzeme kutusu, ipucu kutuları, kod bloğu+kopyala, araç butonu, önceki/sonraki ders) akışları uçtan uca test edildi; yayından kaldırılan ders öğrenciye 404 veriyor; 375px mobil görünüm hem öğretmen (Sheet menü) hem öğrenci (alt gezinme çubuğu) tarafında kontrol edildi.
- **Faz 1:**
  - Supabase projesi: `turozirya-kod-atolyesi`, `eu-central-1` (Frankfurt), proje ref `jgucnevkknxczcsiqrjf`, org `turozirya`. `create_project` (MCP) maliyet onayı için `get_cost`/`confirm_cost` araçlarını istedi ama o araçlar o an bağlı değildi; proje **kullanıcı tarafından panelden manuel oluşturuldu**, ben ref'i alıp migration'lara devam ettim.
  - Migration'lar `0001_schema` → `0007_performance_fixes` (7 dosya, CLAUDE.md'nin önerdiği 4'ten fazla — bkz. aşağıdaki güvenlik/performans düzeltmeleri). `complete_lesson` ve `evaluate_badges` bilerek yazılmadı (Faz 3-4).
  - **Güvenlik Advisor bulguları düzeltildi (0005, 0006):** (a) `set_updated_at`'in `search_path`'i sabit değildi. (b) Postgres `create function`'da `PUBLIC`'e otomatik `execute` verir **ve ayrıca** Supabase, `public` şemadaki her fonksiyona `anon`+`authenticated` için **ayrı, açık** bir execute izni veriyor — `revoke ... from public` bu ikincisini temizlemiyor, `pg_proc.proacl`'ı sorgulayıp doğrulamak gerekti. `is_teacher/teaches_student/can_access_course` artık yalnızca `authenticated`'a (RLS politikaları bunu gerektiriyor), `handle_new_user` hiçbir role açık değil (yalnızca tetikleyici), `check_class_code` bilerek `anon`+`authenticated`'a açık (kayıt akışı için gerekli).
  - **Performans Advisor bulguları (0007):** eksik FK indeksleri (badges, classes, lesson_progress, point_events, student_badges) eklendi; RLS politikalarındaki `auth.uid()` çağrıları `(select auth.uid())` ile sarmalandı (satır başına yeniden değerlendirmeyi önler). "Multiple permissive policies" (select_own + select_teacher ayrı politikaları, 55 bulgu) **bilinçli olarak ertelendi** — CLAUDE.md §12 yalnızca Security Advisor'ı hedefliyor, birleştirmek ~11 tabloda riskli bir RLS yeniden yazımı gerektirir.
  - `profiles.username` biçimi (`^[a-z0-9_]{3,20}$`) DB'de `CHECK` olarak **değil**, yalnızca istemci tarafında (`username.ts` + zod) zorlanıyor — aksi halde panelden elle eklenen öğretmen hesapları (serbest e-posta biçimi, metadata yok) `handle_new_user`'ın ürettiği `user_<uuid>` varsayılanıyla bile DB kısıtına takılabilirdi.
  - Supabase Auth panelinde CLAUDE.md §13'ün bahsetmediği **ikinci bir anahtar** bulundu: "Enable email provider" varsayılan **kapalı** geliyor (yalnızca "Confirm email"i kapatmak yetmiyor, e-posta sağlayıcısının kendisi de açılmalı) — "Email signups are disabled" hatasıyla ortaya çıktı. Faz 6'daki Supabase ayarları listesine eklenmeli.
  - `react-hook-form`'un `watch()`'u Next 16'nın React Compiler farkında eslint kuralıyla uyumsuz (`react-hooks/incompatible-library`) — yerine `useWatch({ control, name })` kullanıldı. Ayrıca `react-hooks/set-state-in-effect` kuralı, bir effect gövdesinde senkron `setState` çağrısını hata sayıyor (derive edilebilen durum render'da hesaplanmalı, state yalnızca async callback içinde set edilmeli) — `/kayit`'taki debounce'lı sınıf kodu kontrolünde bu kalıba göre yazıldı; ileride benzer debounce/async kontrol yapılan her yerde tekrar edecek.
  - Test fixture'ları (Faz 2+ için saklandı, silinmedi): öğretmen `turgayozcan@hotmail.com` (role=teacher), sınıf "6-A Robotik" (`join_code=MBT6A2`, id `73ad0a47-6296-4092-908c-ba3ee62df03e`) micro:bit kursuna atanmış, test öğrencisi `ayseyilmaz` (şifre `test1234`, sınıf MBT6A2). Kayıt/giriş/çıkış/rol yönlendirmesi ve RLS (rol/puan yükseltme denemesi engelleniyor, başka profil okunamıyor, anon hiçbir tabloyu göremiyor, yalnızca atanmış+yayındaki kurs görünüyor) tarayıcıda ve doğrudan REST çağrılarıyla uçtan uca doğrulandı.
  - Kapsam dışı bırakılanlar: `/` anasayfası giriş yapmış kullanıcıyı rolüne göre yönlendirmiyor (§7'de tarif edilse de Faz 1 görev listesinde yok); `/devam` henüz yok, giriş sonrası herkes `/panel`'e gidiyor (Faz 3'te gerçek "kaldığın yerden devam" mantığıyla değişecek).
- **Faz 0 sonrası:** Proje adı **Turozirya Kod Atölyesi** olarak değiştirildi (paket adı: `turozirya-kod-atolyesi`). Görünen ad ana sayfada, `layout.tsx` metadata'sında (title/description) ve bu dosyanın başlığı + "Proje adı notu" paragrafında güncellendi. `package.json` adı değişti, `package-lock.json` `npm install` ile yenilendi. Klasör adı hâlâ `kodlama_kulubu` (kullanıcı ayrıca değiştirecek); `.env*`, `STUDENT_EMAIL_DOMAIN` ve §11'deki klasör ağacı/Faz Promptları metinleri bilinçli olarak dokunulmadan bırakıldı (kapsam dışı).
- **Faz 0:**
  - Next.js 16.4.3 + React 19.3 kuruldu (Turbopack varsayılan). `middleware.ts` yerine `src/proxy.ts` kullanıldı (Next 16'da middleware → proxy olarak yeniden adlandırıldı; dışa aktarılan fonksiyon adı da `proxy`).
  - create-next-app'ın yeni varsayılanı olan **Cache Components** (`cacheComponents` + `partialPrefetching`) kullanıcı kararıyla **kapatıldı** — her dinamik/`cookies()` okuyan bileşeni `<Suspense>` ile sarma zorunluluğunu projeye getirmemek için. `next.config.ts`'de bu seçenekler yok; geleneksel dinamik render kullanılıyor.
  - shadcn/ui artık **Base UI** (`@base-ui/react`, stil: `base-nova`) üzerine kuruluyor, Radix değil. Polimorfik render için `asChild` yerine `render={<Link ... />}` + (native olmayan elemanlarda) `nativeButton={false}` kullanılıyor (örn. `Button` bir `<Link>` olarak render edilirken). Bu kalıp ileriki fazlarda da (Button'ı Link olarak kullanan her yerde) tekrar edecek.
  - shadcn'in `form` bileşeni bu sürümün registry'sinde boş/kayıtlı değil (react-hook-form + mevcut `label`/`input` birincil bileşenleriyle elle kurulacak, Faz 1'deki kayıt/giriş formlarında).
  - `@supabase/ssr` güncel resmi rehberine göre `getClaims()` kullanıldı (önerilen, `getSession()`/`getUser()` yerine). Env adları CLAUDE.md §4 ile birebir (`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`).
  - `src/lib/supabase/proxy.ts`, Supabase env değişkenleri tanımlı değilken (henüz proje bağlanmadığı için) sessizce no-op oluyor; Faz 1'de gerçek değerler eklenince normal çalışacak.
  - shadcn `Button` dokunma alanı küçük geliyor (varsayılan `lg` = 36px). §10'daki 44px asgari kural gereği, öğrenci tarafı birincil butonlarında `h-12` gibi açık boyut override'ları kullanılmalı (bkz. ana sayfa).
  - Node.js bu makinede kurulu değildi, winget ile kuruldu (v26.13.0).
  - Supabase projesi Faz 1'de MCP ile oluşturulacak (kullanıcı kararı); GitHub uzak deposu Faz 6'ya yakın açılacak (şimdilik yalnızca yerel git).

---

## 1. Proje Özeti

**Kodlama Kulübü**, bir ortaokul robotik kodlama kulübü için web tabanlı bir öğrenme platformudur. İlk kurs micro:bit (6. sınıf, micro:bit v2, önce blok tabanlı MakeCode, sonra MicroPython); ileride Arduino, Raspberry Pi Pico gibi kurslar eklenecek.

**İçerik hiyerarşisi:** `Kurs → Modül → Ders`
- **Kurs**: bir kart/platform üzerine bütün bir program (örn. "micro:bit ile Kodlama", "Arduino ile Robotik", "Raspberry Pi Pico").
- **Modül**: kurs içindeki ünite (örn. "Sensörler").
- **Ders**: tek oturumluk içerik.
Kurslar sınıflara atanır; öğrenci yalnızca sınıfına atanmış kursları görür. Yeni kurs eklemek **kod değişikliği gerektirmez**, öğretmen panelinden yapılır (bkz. §15).

- **Öğretmen**: kurs, modül ve ders ekler/düzenler, sınıf oluşturur, sınıflara kurs atar, öğrencileri ve ilerlemelerini görür.
- **Öğrenci**: kendisine açık kursları ve dersleri modül modül takip eder, dersi bitirince "Tamamlandı" der, puan ve rozet kazanır, tekrar girdiğinde kaldığı yerden devam eder.

**Hedef kitle:** 11–12 yaş, ilk kez kod yazan öğrenciler. Arayüz renkli, sade, büyük dokunma alanlı, telefonda rahat kullanılır olmalı. Tüm arayüz metinleri **Türkçe**.

**Proje adı notu:** Görünen ad "Turozirya Kod Atölyesi". npm paket adı `turozirya-kod-atolyesi` (npm büyük harf ve Türkçe karakter kabul etmediği için kebab-case kullanılır). Klasör adı şu an hâlâ `kodlama_kulubu` — yeniden adlandırma ayrıca yapılacak.

---

## 2. Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| Framework | Next.js (App Router, React, TypeScript) — `create-next-app@latest` ile güncel kararlı sürüm |
| Stil | Tailwind CSS + shadcn/ui |
| Backend / DB / Auth | Supabase (PostgreSQL, Auth, Row Level Security) |
| Supabase istemcisi | `@supabase/supabase-js` + `@supabase/ssr` (çerez tabanlı oturum) |
| Hosting | Vercel |
| Yardımcı paketler | `react-markdown` + `remark-gfm` (ders içeriği), `shiki` veya `prism-react-renderer` (kod renklendirme), `canvas-confetti` (kutlama), `motion` (animasyon), `lucide-react` (ikonlar), `zod` (form doğrulama), `react-hook-form` |
| Test | `vitest` (saf fonksiyonlar: seviye hesabı, devam mantığı, YouTube URL ayrıştırma) |

**Sürüm uyarısı:** Next.js ve Supabase hızlı değişiyor. Kurulumdan önce güncel dokümana bak:
- Next.js'in sürümüne göre oturum yenileme dosyası `middleware.ts` **veya** `proxy.ts` olabilir. Kurulan sürüme uygun olanı kullan.
- Supabase yeni projelerde `publishable` / `secret` anahtarları kullanıyor; eski projelerde `anon` / `service_role`. Hangisi varsa onu kullan, ortam değişkeni adlarını aşağıdaki tabloya göre ayarla.
- Supabase + Next.js SSR kurulumu için güncel resmi rehberi (`@supabase/ssr`) takip et; ezbere eski kalıp yazma.

---

## 3. Claude Code Çalışma Kuralları

1. **Her faza Plan Mode ile başla.** Önce planı göster, onay al, sonra kodla.
2. **Faz dışına çıkma.** Bir sonraki fazın işini erkenden yapma; gerekirse "Faz notları"na not düş.
3. **Kod İngilizce, arayüz Türkçe.** Değişken, fonksiyon, dosya, tablo adları İngilizce; kullanıcının gördüğü her metin Türkçe. URL yolları Türkçe (aşağıdaki rota haritasına bak).
4. **TypeScript strict.** `any` kullanma. Supabase tiplerini `supabase gen types` ile üret (`src/types/database.ts`).
5. **Güvenlik önce:** Her tabloda RLS açık. `SUPABASE_SECRET_KEY` (service role) **yalnızca sunucuda** (Server Action / Route Handler) kullanılır, asla `NEXT_PUBLIC_` ile başlamaz, asla istemci bileşenine girmez.
6. **Puan ve tamamlama istemciden yazılmaz.** Sadece veritabanı fonksiyonları (RPC) üzerinden.
7. **Veritabanı değişiklikleri migration dosyası olarak** `supabase/migrations/` altında tutulur. Canlı veritabanında yıkıcı işlem (DROP, DELETE, TRUNCATE) yapmadan önce bana sor.
8. **Faz bitiş kontrolü:** `npm run lint`, `npm run build` ve (varsa) `npm test` hatasız geçmeli. Sonra bu dosyadaki Faz Durumu kutucuğunu işaretle, kısa not ekle, git commit at (`faz-1: auth ve roller` gibi).
9. `.env.local` asla commit edilmez. `.env.example` güncel tutulur.
10. Bileşenler küçük ve tekrar kullanılabilir olsun. Veri çekme mümkün olduğunca Server Component'lerde; etkileşim gerektirenler `"use client"`.

---

## 4. Ortam Değişkenleri

`.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=   # eski projede anon key
SUPABASE_SECRET_KEY=                    # eski projede service_role key — SADECE SUNUCU
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STUDENT_EMAIL_DOMAIN=ogrenci.kodlamakulubu.local
```

---

## 5. Kimlik Doğrulama Tasarımı (Önemli)

Ortaokul öğrencilerinin çoğunun e-postası yok ve öğrenci e-postası toplamak KVKK açısından da gereksiz. Bu yüzden:

### 5.1 Öğrenci girişi: kullanıcı adı + şifre
- Öğrenci **kullanıcı adı** ve **şifre** ile giriş yapar.
- Arka planda Supabase Auth'a `kullaniciadi@STUDENT_EMAIL_DOMAIN` biçiminde sahte bir e-posta ile kaydedilir. Öğrenci bunu hiç görmez.
- Bu nedenle Supabase panelinde **"Confirm email" kapatılmalı** (Authentication → Providers → Email).
- Eğer Supabase seçilen alan adını geçersiz sayarsa, alan adı `STUDENT_EMAIL_DOMAIN` değişkeninden değiştirilir (tek yerden yönetilir: `src/lib/auth/username.ts`).
- Kullanıcı adı kuralları: 3–20 karakter, küçük harf, rakam, alt çizgi (`^[a-z0-9_]{3,20}$`). Türkçe karakterler kayıt formunda otomatik dönüştürülür (ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u).

### 5.2 Sınıf kodu ile kayıt
- Öğrenci kayıt olurken öğretmenin verdiği **6 haneli sınıf kodunu** girer (örn. `MBT6A2`).
- Kod geçersizse kayıt olmaz. Böylece dışarıdan rastgele kişiler kayıt olamaz.
- Ayrıca öğretmen panelinden **toplu öğrenci oluşturma** da olacak (Faz 5) — okulda aynı IP'den çok sayıda kayıt Supabase hız sınırına takılabileceği için asıl önerilen yol budur.

### 5.3 Öğretmen hesabı
- Öğretmen gerçek e-posta ile giriş yapar.
- Kayıt formunda öğretmen seçeneği **yoktur**. Herkes `student` rolüyle oluşur.
- Öğretmen rolü yalnızca Supabase SQL Editor'den verilir:
  ```sql
  update public.profiles set role = 'teacher' where id = '<auth kullanıcı id>';
  ```
- Giriş formu tek alan kullanır: girilen değerde `@` varsa e-posta, yoksa kullanıcı adı kabul edilir.

### 5.4 Yönlendirme
- Giriş yoksa korumalı sayfalar → `/giris`
- Öğrenci girişte → `/devam` (kaldığı derse yönlendirir)
- Öğretmen girişte → `/ogretmen`
- Öğrenci `/ogretmen/*` yollarına giremez (hem proxy/middleware hem sayfa düzeyinde kontrol).

---

## 6. Veritabanı Şeması

Tüm tablolar `public` şemasında. Migration dosyalarına bölünür (`0001_schema.sql`, `0002_rls.sql`, `0003_functions.sql`, `0004_seed.sql`).

### 6.1 Tablolar (taslak SQL — Claude Code tamamlar ve test eder)

```sql
create type user_role as enum ('student', 'teacher');
create type progress_status as enum ('in_progress', 'completed');
create type badge_criteria as enum (
  'first_lesson',        -- ilk dersi bitirme
  'lessons_completed',   -- toplam N ders
  'module_completed',    -- belirli modülü bitirme
  'course_completed',    -- belirli kursu bitirme
  'points_total',        -- toplam N puan
  'streak_days'          -- art arda N gün aktif
);

create table classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,                         -- "6-A Robotik"
  join_code text not null unique,             -- 6 karakter, büyük harf + rakam
  teacher_id uuid not null references auth.users(id) on delete cascade,
  leaderboard_enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,                  -- 'microbit', 'arduino', 'pico'
  title text not null,                        -- 'micro:bit ile Kodlama'
  description text,
  platform text not null default 'microbit',  -- serbest metin: 'microbit' | 'arduino' | 'pico' | 'diger'
  default_code_language text not null default 'micropython', -- yeni derslerde varsayılan
  icon text not null default 'cpu',
  color text not null default 'violet',
  cover_image text,                           -- Storage yolu (opsiyonel)
  order_index integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table class_courses (                -- hangi sınıf hangi kursu görür
  class_id uuid not null references classes(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  primary key (class_id, course_id)
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  display_name text not null,                 -- sadece ad (soyad tutulmaz)
  avatar text not null default 'robot-1',     -- hazır avatar anahtarı
  role user_role not null default 'student',
  class_id uuid references classes(id) on delete set null,
  total_points integer not null default 0,
  created_at timestamptz not null default now()
);

create table modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  slug text not null,
  title text not null,
  description text,
  icon text not null default 'cpu',           -- lucide ikon adı
  color text not null default 'violet',       -- tema rengi anahtarı
  order_index integer not null default 0,
  is_sequential boolean not null default true,-- dersler sırayla mı açılsın
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course_id, slug)
);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references modules(id) on delete cascade,
  slug text not null,
  title text not null,
  summary text,                               -- kart üzerinde görünen 1-2 cümle
  content text not null default '',           -- Markdown
  example_code text,                          -- örnek kod
  code_language text not null default 'micropython', -- 'blocks' | 'micropython' | 'python' | 'cpp' | 'javascript'
  tool_url text,                              -- simülatör/araç linki: MakeCode, Wokwi, Tinkercad Circuits (opsiyonel)
  tool_label text,                            -- butonda görünen ad: 'MakeCode'da Aç', 'Wokwi'de Dene'
  materials text[] not null default '{}',     -- malzeme listesi: {'1 adet LED','220Ω direnç','breadboard'}
  video_url text,                             -- YouTube linki (opsiyonel)
  estimated_minutes integer not null default 20,
  points integer not null default 10,
  order_index integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (module_id, slug)
);

create table lesson_progress (
  student_id uuid not null references profiles(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  status progress_status not null default 'in_progress',
  started_at timestamptz not null default now(),
  last_viewed_at timestamptz not null default now(),
  completed_at timestamptz,
  primary key (student_id, lesson_id)
);

create table point_events (               -- puan defteri (her puan hareketi)
  id bigint generated always as identity primary key,
  student_id uuid not null references profiles(id) on delete cascade,
  amount integer not null,
  reason text not null,                    -- 'lesson_completed' | 'module_bonus' | 'course_bonus' | 'badge_bonus' | 'teacher_bonus'
  lesson_id uuid references lessons(id) on delete set null,
  module_id uuid references modules(id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

create table badges (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,               -- 'sensor-uzmani'
  name text not null,                      -- 'Sensör Uzmanı'
  description text not null,
  icon text not null,                      -- lucide ikon adı veya emoji
  color text not null default 'amber',
  criteria badge_criteria not null,
  criteria_value integer,                  -- N (ders, puan, gün)
  module_id uuid references modules(id) on delete cascade, -- module_completed için
  course_id uuid references courses(id) on delete cascade, -- course_completed için
  bonus_points integer not null default 0,
  order_index integer not null default 0
);

create table student_badges (
  student_id uuid not null references profiles(id) on delete cascade,
  badge_id uuid not null references badges(id) on delete cascade,
  earned_at timestamptz not null default now(),
  seen boolean not null default false,     -- kutlama gösterildi mi
  primary key (student_id, badge_id)
);

create table activity_days (               -- seri (streak) hesabı için
  student_id uuid not null references profiles(id) on delete cascade,
  day date not null,
  primary key (student_id, day)
);
```

İndeksler: `modules(course_id, order_index)`, `lessons(module_id, order_index)`, `class_courses(course_id)`, `lesson_progress(student_id, last_viewed_at desc)`, `point_events(student_id)`, `profiles(class_id)`.
`updated_at` için tetikleyici ekle.

### 6.2 Yeni kullanıcı tetikleyicisi

`auth.users` tablosuna kayıt eklenince `handle_new_user()` (SECURITY DEFINER) çalışır:
- `raw_user_meta_data` içinden `username`, `display_name`, `class_code` okur.
- `class_code` verilmişse `classes.join_code` ile eşleştirip `class_id` atar; kod verilmiş ama geçersizse **hata fırlatır** (kayıt iptal olur).
- `role` **her zaman** `'student'` olarak yazılır (metadata'daki role değeri yok sayılır).

### 6.3 Satır Düzeyi Güvenlik (RLS)

Yardımcı fonksiyonlar (SECURITY DEFINER, `search_path` sabitlenmiş):
- `is_teacher()` → oturumdaki kullanıcı öğretmen mi
- `teaches_student(student uuid)` → öğrenci, oturumdaki öğretmenin sınıflarından birinde mi
- `can_access_course(course uuid)` → öğretmen ise her zaman true; öğrenci ise kurs yayında ve öğrencinin sınıfına `class_courses` ile atanmış mı

| Tablo | SELECT | INSERT / UPDATE / DELETE |
|---|---|---|
| `profiles` | kendi satırı; öğretmen kendi sınıflarındaki öğrenciler | UPDATE: yalnızca kendi satırı ve yalnızca `display_name`, `avatar` sütunları (sütun düzeyi `grant update (display_name, avatar)`); `role`, `total_points`, `class_id` değiştirilemez |
| `classes` | öğretmen kendi sınıfları; öğrenci kendi sınıfı | yalnızca öğretmen, kendi sınıfları |
| `courses` | öğrenci: `can_access_course(id)`; öğretmen hepsini | yalnızca öğretmen |
| `class_courses` | öğrenci kendi sınıfının satırları; öğretmen kendi sınıfları | yalnızca öğretmen, kendi sınıfları |
| `modules`, `lessons` | öğrenci: kendisi `is_published = true` **ve** bağlı kurs için `can_access_course` true; öğretmen hepsini | yalnızca öğretmen |
| `lesson_progress` | öğrenci kendi kayıtları; öğretmen kendi öğrencileri | **doğrudan yazma yok** — yalnızca RPC |
| `point_events` | öğrenci kendi; öğretmen kendi öğrencileri | yalnızca RPC |
| `badges` | giriş yapmış herkes | yalnızca öğretmen |
| `student_badges` | öğrenci kendi; öğretmen kendi öğrencileri | yalnızca RPC (öğrenci sadece `seen` alanını RPC ile günceller) |
| `activity_days` | öğrenci kendi; öğretmen kendi öğrencileri | yalnızca RPC |

### 6.4 Veritabanı Fonksiyonları (RPC)

Hepsi `security definer`, `set search_path = public`, `auth.uid()` ile çağıranı doğrular. İstemci yalnızca `supabase.rpc(...)` ile çağırır.

**`check_class_code(p_code text) returns text`**
Anonim kullanıcı da çağırabilir. Kod geçerliyse sınıf adını, değilse `null` döner. Kayıt formunda anlık kontrol için.

**`mark_lesson_viewed(p_lesson_id uuid) returns void`**
- Ders yayında değilse veya öğrenci dersin kursuna erişemiyorsa (`can_access_course`) hata (öğretmen için kontrol yok).
- `lesson_progress` yoksa `in_progress` olarak oluşturur, varsa `last_viewed_at = now()` günceller (tamamlanmış dersin durumu değişmez).
- Bugünü (`(now() at time zone 'Europe/Istanbul')::date`) `activity_days`'e ekler (çakışmada yok say).

**`complete_lesson(p_lesson_id uuid) returns jsonb`**
1. Çağıran öğrenci değilse veya dersin kursuna erişemiyorsa hata.
2. Modül `is_sequential` ise ve önceki ders tamamlanmamışsa hata (`'LESSON_LOCKED'`).
3. Ders zaten tamamlanmışsa: puan verme, `{already_completed: true, points_earned: 0, new_badges: [], next_lesson: ...}` dön.
4. Değilse: `lesson_progress` → `completed`, `completed_at = now()`.
5. `point_events`'e ders puanını yaz, `profiles.total_points` artır.
6. Bu dersle modül bittiyse modül bonusu (+25), kurs bittiyse kurs bonusu (+100) yaz.
7. `activity_days`'e bugünü ekle.
8. `evaluate_badges(student)` çağır; yeni rozetlerin bonus puanlarını da ekle.
9. Dön: `{points_earned, total_points, level, new_badges: [{code,name,icon,color}], module_completed: bool, course_completed: bool, next_lesson: {course_slug, module_slug, lesson_slug, title} | null}`. `next_lesson` aynı kurs içinde aranır; kurs bittiyse `null`.
Tüm adımlar tek transaction içinde; aynı derse iki kez hızlı tıklama çift puan üretmemeli (`lesson_progress` satırını `for update` ile kilitle).

**`evaluate_badges(p_student uuid) returns setof badges`** (dahili)
Kriterlere göre henüz kazanılmamış rozetleri kontrol eder, kazanılanları `student_badges`'e ekler ve döner.
- `first_lesson`: ≥1 tamamlanmış ders
- `lessons_completed`: tamamlanan ders sayısı ≥ `criteria_value`
- `module_completed`: `module_id` modülündeki tüm yayındaki dersler tamamlanmış
- `course_completed`: `course_id` kursundaki tüm yayındaki modüllerin tüm yayındaki dersleri tamamlanmış
- `points_total`: `total_points` ≥ `criteria_value`
- `streak_days`: bugünden geriye kesintisiz `activity_days` sayısı ≥ `criteria_value`

**`get_resume_target(p_course_id uuid default null) returns jsonb`** — "kaldığın yerden devam" mantığı (bkz. §8). Kurs verilirse o kurs içinde, verilmezse öğrencinin en son etkinlik gösterdiği kurs içinde çalışır.

**`get_student_courses() returns jsonb`** — öğrencinin erişebildiği kurslar; her biri için toplam/tamamlanan ders sayısı, yüzde ve devam hedefi (panel kartları için tek sorgu).

**`get_class_leaderboard() returns table(...)`**
Öğrencinin kendi sınıfındaki öğrencileri döner: yalnızca `display_name`, `avatar`, `total_points`, seviye, rozet sayısı. Sınıfta `leaderboard_enabled = false` ise boş döner. Kullanıcı adı ve id dönmez.

**`mark_badges_seen() returns void`** — öğrencinin görmediği rozetleri `seen = true` yapar.

**`teacher_add_bonus(p_student uuid, p_amount int, p_note text)`** — (Faz 5) öğretmen kendi öğrencisine ek puan verir.

---

## 7. Rota Haritası

```
/                         → giriş yoksa tanıtım + "Giriş Yap", varsa role göre yönlendir
/giris                    → giriş (kullanıcı adı veya e-posta + şifre)
/kayit                    → öğrenci kaydı (sınıf kodu, ad, kullanıcı adı, şifre, avatar)

(öğrenci)
/devam                    → en son çalışılan kursta kaldığı derse yönlendirir
/devam/[kurs]             → belirli kursta kaldığı derse yönlendirir
/panel                    → öğrenci ana sayfa: selam, seviye çubuğu, kurs kartları (her birinde "Devam Et"), son rozetler
/dersler                  → erişebildiği kurslar (tek kurs varsa doğrudan o kursa yönlendir)
/dersler/[kurs]           → kursun modülleri ve dersleri (ilerleme yüzdeleriyle)
/dersler/[kurs]/[modul]/[ders] → ders sayfası
/rozetler                 → kazanılan + kilitli rozetler
/siralama                 → sınıf sıralaması
/profil                   → avatar ve görünen ad değiştirme, istatistikler

(öğretmen)
/ogretmen                 → özet: sınıf sayısı, öğrenci sayısı, bu hafta tamamlanan ders, en aktifler
/ogretmen/kurslar         → kurs listesi (sırala, yayınla/gizle, ekle, düzenle, sil)
/ogretmen/kurslar/[id]    → kursun modülleri (sırala, yayınla/gizle, ekle, düzenle, sil) + hangi sınıflara atandığı
/ogretmen/moduller/[id]   → modülün dersleri (sırala, ekle)
/ogretmen/dersler/yeni?modul=[id]
/ogretmen/dersler/[id]    → ders düzenleyici (Markdown + canlı önizleme)
/ogretmen/siniflar        → sınıflar, katılım kodları, öğrenci listesi
/ogretmen/siniflar/[id]   → sınıf detayı, sınıfa kurs atama, toplu öğrenci oluşturma, şifre sıfırlama
/ogretmen/ilerleme        → öğrenci × ders ilerleme tablosu (sınıf + kurs + modül seçici)
/ogretmen/rozetler        → rozet tanımları
```

---

## 8. "Kaldığın Yerden Devam" Mantığı

Devam mantığı **her kurs için ayrı** çalışır. Öğrenci micro:bit'te 3. modüldeyken Arduino'da 1. modülde olabilir.

**Hangi kurs?** `/devam` (kurs belirtilmemiş): öğrencinin erişebildiği kurslar içinde `last_viewed_at`'i en yeni olan dersin kursu; hiç ilerleme yoksa sıradaki ilk kurs. Tek kursu varsa doğrudan o kurs. `/devam/[kurs]`: verilen kurs.

**Kurs içinde hangi ders?** `get_resume_target(course)` şu sırayla karar verir (yalnızca o kursun yayındaki modül/dersleri, `order_index` sırasıyla):

1. `status = 'in_progress'` olan, `last_viewed_at`'i en yeni ders varsa → o ders.
2. Yoksa, en son tamamlanan dersten **sonraki** ilk tamamlanmamış ders (aynı modülde, yoksa sonraki modülün ilk tamamlanmamış dersi).
3. Hiç ilerleme yoksa → kursun ilk modülünün ilk dersi.
4. Kursun tüm dersleri tamamlanmışsa → `{all_done: true}` → `/panel`'e "[Kurs adı] kursunu bitirdin! 🎉" mesajıyla gider.

Ayrıca:
- Ders sayfası açılınca `mark_lesson_viewed` çağrılır.
- Ders sayfasında okuma konumu (scroll yüzdesi) `localStorage`'da tutulur (`try/catch` ile), dönüşte "Kaldığın yere git" küçük butonu çıkar.
- Panelde en üstte büyük, dikkat çekici bir **"Devam Et → [Ders adı]"** kartı (en son çalışılan kurs). Altında her kurs için ayrı kart: kurs adı, ilerleme yüzdesi, kendi "Devam Et" butonu.

---

## 9. Oyunlaştırma Kuralları

### 9.1 Puan
| Olay | Puan |
|---|---|
| Ders tamamlama (ilk kez) | `lessons.points` (varsayılan 10) |
| Modül tamamlama bonusu | +25 |
| Kurs tamamlama bonusu | +100 |
| Rozet bonusu | `badges.bonus_points` |
| Öğretmen bonusu (Faz 5) | öğretmenin belirlediği |

Aynı ders ikinci kez puan vermez. **Puan ve seviye tüm kurslarda ortaktır**: micro:bit'te biriken puan Arduino'ya geçince sıfırlanmaz. Kurs bazlı istatistikler (kursta kazanılan puan, ilerleme yüzdesi) ayrıca profilde gösterilir.

### 9.2 Seviyeler (`src/lib/gamification/levels.ts`, saf fonksiyon + vitest testi)
| Seviye | Ad | Gereken puan |
|---|---|---|
| 1 | Kod Çaylağı | 0 |
| 2 | Kod Çırağı | 50 |
| 3 | Devre Kaşifi | 150 |
| 4 | Sensör Avcısı | 300 |
| 5 | Robot Ustası | 500 |
| 6 | micro:bit Kahramanı | 800 |
| 7 | Kodlama Efsanesi | 1200 |

`getLevel(points)` → `{level, name, currentMin, nextMin, progressPercent}`. Seviye çubuğu panelde ve üst menüde görünür.

### 9.3 Başlangıç Rozetleri (seed)
| Kod | Ad | Kriter | Bonus |
|---|---|---|---|
| `ilk-adim` | İlk Adım | first_lesson | 5 |
| `kodlama-caylagi` | Kodlama Çaylağı | lessons_completed = 5 | 10 |
| `kod-avcisi` | Kod Avcısı | lessons_completed = 15 | 15 |
| `led-sanatcisi` | LED Sanatçısı | module_completed (micro:bit ile Tanışma) | 10 |
| `sensor-uzmani` | Sensör Uzmanı | module_completed (Sensörler) | 15 |
| `muzik-kodcusu` | Müzik Kodcusu | module_completed (Ses ve Müzik) | 10 |
| `python-kasifi` | Python Kâşifi | module_completed (MicroPython'a Geçiş) | 20 |
| `yuzluk` | Yüzlük | points_total = 100 | 0 |
| `ates-serisi` | Ateş Serisi | streak_days = 3 | 10 |
| `microbit-ustasi` | micro:bit Ustası | course_completed (micro:bit ile Kodlama) | 25 |

Yeni kurs eklendiğinde öğretmen panelinden o kursa özel rozetler tanımlanır (örn. `arduino-ustasi` — Arduino Ustası, `pico-kasifi` — Pico Kâşifi, `devre-kurucu` — Devre Kurucu). Genel rozetler (İlk Adım, Kodlama Çaylağı, Yüzlük, Ateş Serisi) tüm kursları kapsar.

### 9.4 Kutlama Deneyimi
- "Tamamlandı" sonrası: konfeti (`canvas-confetti`), "+10 puan" uçan animasyonu, seviye atladıysa "Seviye Atladın!" diyaloğu.
- Yeni rozet: ortada büyüyen rozet kartı diyaloğu ("Yeni rozet: Sensör Uzmanı!"), sonra `mark_badges_seen`.
- Diyalogda **"Sonraki Derse Geç →"** butonu (`next_lesson`).
- `prefers-reduced-motion` açıksa konfeti ve animasyonlar kapalı.

### 9.5 Sıralama
- Sadece kendi sınıfı. Görünen ad + avatar + puan + seviye. İlk 3'e 🥇🥈🥉.
- Öğretmen sınıf bazında kapatabilir (`leaderboard_enabled`). Kapalıysa menüde gizlenir.

---

## 10. Arayüz ve Tasarım Rehberi

**Hissiyat:** neşeli, renkli ama karmaşık değil; "oyun haritası" havası. Çocuk kitabı değil, modern bir uygulama.

- **Font:** Türkçe karakterleri iyi destekleyen yuvarlak hatlı bir font — başlıklar için `Baloo 2` veya `Fredoka`, gövde için `Nunito` (`next/font/google`, `subsets: ['latin', 'latin-ext']`).
- **Renk paleti** (Tailwind tema token'ları olarak, shadcn CSS değişkenleriyle):
  - Ana: mor `violet-500`
  - Vurgu: turuncu `orange-400` (Devam Et butonu, puan)
  - Başarı: yeşil `emerald-500` (tamamlandı)
  - Rozet/altın: `amber-400`
  - Modül renkleri: violet, sky, emerald, orange, pink, teal (her modül kendi rengini taşır)
  - Arka plan: çok açık krem/lavanta, kartlar beyaz
- **Şekil:** `rounded-2xl` kartlar, yumuşak gölgeler, kalın kenarlı (2px) oyunsu butonlar, basınca hafif "çökme" efekti.
- **Dokunma alanı:** en az 44×44 px. Ana butonlar büyük.
- **Mobil:** öğrenci tarafında alt sabit gezinme çubuğu (Panel, Dersler, Rozetler, Sıralama, Profil). Masaüstünde üst menü. Öğretmen tarafında masaüstünde sol kenar çubuğu, mobilde açılır menü.
- **Kurs kartları:** büyük, kurs renginde; platform ikonu/kapak görseli, kurs adı, "12/30 ders" ve ilerleme çubuğu, "Devam Et" butonu. Kart tasarımı kursa özel kod içermez; tüm görünüm `courses` tablosundaki renk, ikon ve kapak alanlarından gelir.
- **Ders kartları:** modül renginde şerit, ikon, başlık, süre, puan rozeti, durum (🔒 kilitli / ▶ başla / ⏳ devam ediyor / ✅ tamamlandı).
- **Modül görünümü:** dersler dikey bir "yol/harita" üzerinde düğümler olarak (tamamlananlar dolu, sıradaki parlayan, kilitliler gri).
- **Avatarlar:** 8–12 adet hazır robot/karakter avatarı (SVG, projede yerel; dış görsel yok). Telifli karakter kullanma.
- **Boş durumlar:** dostça mesaj + ikon ("Henüz rozetin yok — ilk dersini bitir, ilk rozetini kap!").
- **Erişilebilirlik:** yeterli kontrast, odak halkaları görünür, tüm ikon butonlarında `aria-label`, renk tek başına anlam taşımaz (ikon + metin).
- **Karanlık mod:** opsiyonel (Faz 6), shadcn tema değişkenleriyle.

### 10.1 Ders Sayfası Düzeni
1. Üstte: kurs › modül (breadcrumb), ders başlığı, süre, puan, ilerleme (ör. "Ders 3 / 8").
2. **Malzemeler** (varsa `materials`): ikonlu, işaretlenebilir küçük liste kutusu ("Bu derste gerekenler"). İşaretler sadece görsel, kaydedilmez.
3. Video (varsa): YouTube linki `youtube-nocookie.com/embed/<id>` biçimine çevrilir, tıklayınca yüklenen hafif önizleme. Yalnızca YouTube kabul edilir.
4. İçerik: Markdown (`react-markdown` + `remark-gfm`). **Ham HTML render edilmez** (`rehype-raw` kullanma). Görseller (devre şemaları Supabase Storage'dan, tıklayınca büyür), tablolar, listeler, ipucu kutuları (`> 💡` alıntıları ipucu kutusuna dönüştür).
5. Örnek kod: renklendirilmiş kod bloğu (dile göre: MicroPython/Python, Arduino C++, JavaScript) + "Kopyala" butonu. `code_language = 'blocks'` ise kod bloğu yerine açıklama gösterilir.
6. Araç butonu (varsa `tool_url`): `tool_label` metniyle yeni sekmede açılan buton (MakeCode, Wokwi, Tinkercad). İzin verilen alan adları tek listede tutulur (`src/lib/tools.ts`: makecode.microbit.org, wokwi.com, tinkercad.com); listede olmayan link kabul edilmez. Yeni araç eklemek listeye bir satır eklemektir.
7. Altta: büyük **"Tamamlandı ✓"** butonu (tamamlanmışsa "Tamamlandı — tekrar göz atıyorsun"), "← Önceki ders" / "Sonraki ders →".

---

## 11. Klasör Yapısı

```
kodlama-kulubu/
├─ CLAUDE.md
├─ .env.example
├─ supabase/
│  └─ migrations/
│     ├─ 0001_schema.sql
│     ├─ 0002_rls.sql
│     ├─ 0003_functions.sql
│     └─ 0004_seed.sql
├─ public/avatars/              # yerel SVG avatarlar
└─ src/
   ├─ app/
   │  ├─ (auth)/giris/page.tsx
   │  ├─ (auth)/kayit/page.tsx
   │  ├─ (ogrenci)/layout.tsx           # öğrenci kabuğu + alt menü + rol kontrolü
   │  ├─ (ogrenci)/devam/page.tsx
   │  ├─ (ogrenci)/devam/[kurs]/page.tsx
   │  ├─ (ogrenci)/panel/page.tsx
   │  ├─ (ogrenci)/dersler/page.tsx
   │  ├─ (ogrenci)/dersler/[kurs]/page.tsx
   │  ├─ (ogrenci)/dersler/[kurs]/[modul]/[ders]/page.tsx
   │  ├─ (ogrenci)/rozetler/page.tsx
   │  ├─ (ogrenci)/siralama/page.tsx
   │  ├─ (ogrenci)/profil/page.tsx
   │  ├─ ogretmen/layout.tsx            # öğretmen kabuğu + rol kontrolü
   │  ├─ ogretmen/...                   # §7'deki öğretmen rotaları
   │  ├─ layout.tsx
   │  └─ page.tsx
   ├─ components/
   │  ├─ ui/                            # shadcn bileşenleri
   │  ├─ lesson/                        # LessonCard, LessonContent, CodeBlock, VideoEmbed, CompleteButton
   │  ├─ gamification/                  # LevelBar, BadgeCard, CelebrationDialog, PointsToast
   │  ├─ layout/                        # StudentNav, TeacherSidebar, Header
   │  └─ teacher/                       # LessonEditor, ModuleList, ProgressMatrix
   ├─ lib/
   │  ├─ supabase/client.ts             # tarayıcı istemcisi
   │  ├─ supabase/server.ts             # sunucu istemcisi (çerezli)
   │  ├─ supabase/admin.ts              # service role istemcisi — import "server-only"
   │  ├─ auth/username.ts               # kullanıcı adı ↔ sahte e-posta, Türkçe karakter dönüşümü
   │  ├─ auth/session.ts                # getCurrentProfile(), requireRole()
   │  ├─ gamification/levels.ts
   │  ├─ youtube.ts                     # URL → video id
   │  ├─ tools.ts                       # izinli simülatör/araç alan adları
   │  ├─ code-languages.ts              # dil listesi: etiket, renklendirici adı, ikon
   │  ├─ storage.ts                     # ders görseli yükleme/URL yardımcıları
   │  └─ validations/                   # zod şemaları
   ├─ actions/                          # Server Actions (auth, lessons, modules, classes, progress)
   ├─ types/database.ts                 # supabase gen types çıktısı
   └─ proxy.ts | middleware.ts          # Next.js sürümüne göre
```

---

## 12. Güvenlik ve Gizlilik Kontrol Listesi

- [ ] Tüm tablolarda RLS açık, her politika test edildi (öğrenci başka öğrencinin ilerlemesini okuyamıyor).
- [ ] Öğrenci `profiles.role` ve `total_points` değerini değiştiremiyor (tarayıcı konsolundan `update` denemesiyle test).
- [ ] Puan/tamamlama yalnızca RPC ile; çift tıklama çift puan vermiyor.
- [ ] Service role anahtarı sadece `src/lib/supabase/admin.ts` içinde, dosyada `import "server-only"` var.
- [ ] Öğretmen Server Action'ları başta `requireRole('teacher')` ile korunuyor (UI'da gizlemek yetmez).
- [ ] Markdown ham HTML render etmiyor; video yalnızca YouTube; araç linkleri yalnızca izinli alan adları.
- [ ] Öğrenci, sınıfına atanmamış kursun modül/derslerini URL ile de göremiyor.
- [ ] Storage `lesson-media` kovasına yalnızca öğretmen yükleyip silebiliyor; dosya türü (png, jpg, webp — svg değil) ve boyut (≤ 2 MB) sınırlı.
- [ ] Öğrenciden e-posta, soyad, telefon, doğum tarihi istenmiyor.
- [ ] Sıralamada kullanıcı adı ve id görünmüyor.
- [ ] Supabase "Security Advisor" uyarısı yok (`get_advisors` / panel).
- [ ] Şifre en az 6 karakter; öğretmen şifre sıfırlayabiliyor.

---

## 13. Supabase ve Vercel Ayarları (manuel adımlar — bana hatırlat)

**Supabase panelinde:**
1. Yeni proje (bölge: Avrupa — örn. Frankfurt).
2. Authentication → Providers → Email → **Confirm email: kapalı**.
3. Authentication → URL Configuration → Site URL ve Redirect URL'lere localhost ve Vercel alan adını ekle.
4. Authentication → Rate Limits: okulda toplu kayıt yapılacaksa kayıt sınırını gözden geçir.
5. Öğretmen hesabını oluşturduktan sonra SQL Editor'den rolünü `teacher` yap.
6. Storage: `lesson-media` kovası (ders görselleri, devre şemaları, kurs kapakları). Okuma herkese açık olabilir (içerik gizli değil); yazma/silme yalnızca öğretmen — politikalar migration ile kurulur.

**Vercel'de:**
1. GitHub reposunu bağla, framework: Next.js.
2. Ortam değişkenlerini (§4) Production ve Preview için ekle.
3. Yayından sonra Supabase Redirect URL listesine Vercel alan adını ekle.

---

## 14. Örnek İçerik (Seed — Faz 6'da genişletilir, Faz 2'de en az 2 modül)

**Kurs: micro:bit ile Kodlama** (`slug: microbit`, `platform: microbit`, yayında, test sınıfına atanmış)

| # | Modül | Örnek dersler |
|---|---|---|
| 1 | micro:bit ile Tanışma (blok) | micro:bit nedir? · LED ekranda ilk yazım · Kendi simgeni çiz · A ve B butonları |
| 2 | Sensörler (blok) | Işık sensörü · Sıcaklık ölçer · İvmeölçer ile sallama · Pusula |
| 3 | Ses ve Müzik (blok) | Hoparlör ile ilk melodi · Notalarla şarkı · Dokunmatik logo ile ritim |
| 4 | Radyo ile Haberleşme (blok) | İki micro:bit konuşuyor · Taş-kağıt-makas |
| 5 | MicroPython'a Geçiş (metin) | Bloktan koda · Değişkenler · Döngüler · Koşullar · Sensörleri Python ile okuma |

Seed dersler kısa ama gerçek içerik taşısın (Türkçe açıklama + örnek MicroPython kodu). Video linkleri boş bırakılabilir.

**Taslak kurs: Arduino ile Robotik** (`slug: arduino`, `platform: arduino`, **yayında değil**) — Faz 6'da, yapının birden fazla kursla çalıştığını doğrulamak için: 1 modül ("Arduino'ya Merhaba"), 2 ders ("LED yakıp söndürme", "Butonla LED kontrolü"), C++ örnek kod, malzeme listesi, Wokwi araç linki alanı.

---

## 15. Yeni Kurs Ekleme (Arduino, Raspberry Pi Pico vb.)

Yapı, yeni bir kursun **kod yazmadan** eklenebileceği şekilde tasarlanmıştır. Öğretmen için akış:

1. `/ogretmen/kurslar` → "Yeni Kurs": ad, slug, platform, varsayılan kod dili (Arduino → `cpp`, Pico → `micropython`), ikon, renk, kapak görseli.
2. Kursa modüller ve dersler eklenir; ders düzenleyicide kod dili kursun varsayılanıyla gelir, malzeme listesi ve araç linki (Wokwi/Tinkercad) doldurulur, devre şemaları görsel olarak yüklenir.
3. `/ogretmen/rozetler` → kursa özel rozetler (`course_completed`, `module_completed`).
4. Kurs yayınlanır ve `/ogretmen/siniflar/[id]` üzerinden ilgili sınıflara atanır. Öğrencilerin panelinde yeni kurs kartı belirir.

Geliştirici için kural: **kurs adına veya platforma göre `if/switch` yazma.** Kursa özgü her şey veritabanındaki alanlardan gelir. Yeni bir dil veya araç gerekirse yalnızca `src/lib/code-languages.ts` veya `src/lib/tools.ts` listelerine bir kayıt eklenir.

---

# FAZ PROMPTLARI

Her fazı yeni bir mesajla başlat. Prompt'u olduğu gibi Claude Code'a yapıştır.

---

## Faz 0 — Proje Kurulumu

**Hedef:** Çalışan, boş ama tasarım temeli atılmış bir Next.js projesi.

**Kabul kriterleri:** `npm run dev` açılıyor; ana sayfada Kodlama Kulübü logosu/başlığı, fontlar ve renk paleti görünüyor; shadcn bileşenleri kurulu; Supabase istemci dosyaları hazır; lint ve build temiz.

```text
CLAUDE.md dosyasını baştan sona oku. Faz 0'ı yapacağız. Önce Plan Mode'da plan çıkar, onayımı al.

Görevler:
1. Bu klasörde Next.js projesi kur (TypeScript, App Router, Tailwind, ESLint, src/ dizini, import alias @/*). Paket adı: kodlama-kulubu.
2. shadcn/ui kur ve şu bileşenleri ekle: button, card, input, label, form, dialog, dropdown-menu, avatar, badge, progress, tabs, table, textarea, select, switch, sonner, skeleton, sheet, tooltip, separator.
3. CLAUDE.md §10'daki fontları (next/font, latin-ext) ve renk paletini tema token'ları olarak tanımla. Modül renkleri için bir renk eşleme yardımcı dosyası oluştur.
4. Gerekli paketleri kur: @supabase/supabase-js, @supabase/ssr, zod, react-hook-form, @hookform/resolvers, react-markdown, remark-gfm, canvas-confetti, motion, lucide-react, server-only; dev: vitest.
5. src/lib/supabase/ altında client.ts, server.ts ve admin.ts dosyalarını güncel @supabase/ssr dokümanına uygun yaz. Kurulan Next.js sürümüne göre middleware.ts veya proxy.ts ile oturum yenilemeyi ekle (henüz rota koruması yok).
6. .env.example oluştur (§4). .gitignore'da .env.local olduğunu doğrula.
7. Geçici bir ana sayfa yap: Kodlama Kulübü başlığı, kısa açıklama, "Giriş Yap" ve "Kayıt Ol" butonları — renkli, mobil uyumlu, §10'daki tasarım diliyle. 8 adet basit, özgün robot avatar SVG'sini public/avatars/ altına oluştur.
8. CLAUDE.md §11'deki klasör yapısını boş klasörler/yer tutucularla hazırla.
9. git init, ilk commit.

Bitince lint ve build çalıştır, CLAUDE.md'deki Faz 0 kutucuğunu işaretle, kısa not ekle.
```

---

## Faz 1 — Veritabanı, Kimlik Doğrulama ve Roller

**Hedef:** Tüm şema, RLS ve fonksiyonlar hazır; öğrenci sınıf koduyla kayıt olup kullanıcı adıyla giriş yapabiliyor; öğretmen e-postayla giriyor; roller doğru yönlendiriliyor.

**Kabul kriterleri:** Geçersiz sınıf koduyla kayıt reddediliyor; öğrenci `/ogretmen`'e giremiyor; öğrenci konsoldan rolünü değiştiremiyor; çıkış yapınca korumalı sayfalar `/giris`'e atıyor.

```text
CLAUDE.md'yi oku. Faz 1'i yapacağız. Önce Plan Mode'da plan çıkar.

Görevler:
1. supabase/migrations altında CLAUDE.md §6'daki şemayı, tetikleyicileri, RLS politikalarını ve yardımcı fonksiyonları (is_teacher, teaches_student, can_access_course, handle_new_user, check_class_code) migration dosyaları olarak yaz (courses ve class_courses tabloları dahil). Bu fazda complete_lesson ve evaluate_badges'i YAZMA (Faz 3-4'te). Sütun düzeyi izinlerle profiles'ta öğrencinin sadece display_name ve avatar güncelleyebilmesini sağla.
2. Migration'ları Supabase projeme uygula (Supabase CLI veya bağlı MCP ile — hangisini kullanacağını önce bana söyle). Sonra TypeScript tiplerini src/types/database.ts'e üret.
3. src/lib/auth/username.ts: Türkçe karakter dönüştürme, kullanıcı adı doğrulama, kullanıcı adı ↔ sahte e-posta (STUDENT_EMAIL_DOMAIN). Vitest testleri yaz.
4. src/lib/auth/session.ts: getCurrentUser(), getCurrentProfile(), requireRole(role) yardımcıları.
5. /kayit sayfası: sınıf kodu (yazarken check_class_code ile anlık kontrol, geçerliyse sınıf adını göster), ad, kullanıcı adı (önizleme), şifre + tekrar, avatar seçici. Server Action ile signUp, metadata: username, display_name, class_code, avatar. Hata mesajları Türkçe ve çocuk dostu (örn. "Bu kullanıcı adı alınmış, başka bir tane dene!").
6. /giris sayfası: tek alan (kullanıcı adı veya e-posta) + şifre. Girişten sonra öğrenci → /devam (bu fazda /panel'e yönlendirsin), öğretmen → /ogretmen.
7. Rota koruması: proxy/middleware'de oturum yoksa korumalı yollardan /giris'e; ayrıca (ogrenci) ve ogretmen layout'larında requireRole ile sunucu tarafı kontrol.
8. Geçici /panel (öğrenci) ve /ogretmen (öğretmen) sayfaları: "Merhaba, [ad]!" ve çıkış butonu. Üst bilgi çubuğunda avatar menüsü (Profil, Çıkış).
9. Öğretmen hesabı oluşturmam ve rolünü teacher yapmam için bana adım adım talimat ver; test için bir sınıf, katılım kodu, "micro:bit ile Kodlama" kursu ve bu kursun sınıfa atanmasını oluşturan SQL de ver.
10. RLS'i test et: öğrenci oturumuyla başka öğrencinin profilini okuma ve kendi rolünü/puanını güncelleme denemelerinin başarısız olduğunu ve sınıfına atanmamış bir kursu göremediğini göster.

Bitince lint, test, build; CLAUDE.md'yi güncelle; commit.
```

---

## Faz 2 — Ders Yönetimi ve Ders Görüntüleme

**Hedef:** Öğretmen kurs/modül/ders ekleyip düzenleyip sıralayabiliyor ve yayınlayabiliyor; öğrenci yayındaki dersleri modül modül görüp ders sayfasını okuyabiliyor.

**Kabul kriterleri:** Yayında olmayan ders öğrenciye görünmüyor (URL ile de açılmıyor); Markdown, kod bloğu ve YouTube videosu doğru görünüyor; telefonda rahat okunuyor.

```text
CLAUDE.md'yi oku. Faz 2'yi yapacağız. Önce Plan Mode'da plan çıkar.

Öğretmen tarafı:
1. Öğretmen kabuğu: masaüstünde sol kenar çubuğu (Özet, Kurslar, Sınıflar, İlerleme, Rozetler), mobilde Sheet menü.
2. /ogretmen/kurslar: kurs kartları listesi; ekle/düzenle (dialog: başlık, slug, açıklama, platform, varsayılan kod dili, ikon, renk, kapak görseli yükleme, yayında mı), sil (onay diyaloğu), sıralama. /ogretmen/kurslar/[id]: kursun modülleri; modül ekle/düzenle (dialog: başlık, slug otomatik üretilsin ama düzenlenebilsin, açıklama, ikon seçici, renk seçici, sıralı mı, yayında mı), sil (onay diyaloğu), yukarı/aşağı ile sıralama.
3. /ogretmen/moduller/[id]: modülün dersleri, sıralama, yayınla/gizle anahtarı, "Yeni Ders".
4. Ders düzenleyici (/ogretmen/dersler/yeni ve /ogretmen/dersler/[id]): başlık, slug, özet, Markdown içerik (sekmeli: Yaz | Önizle; masaüstünde yan yana), örnek kod + dil seçimi (src/lib/code-languages.ts listesinden; varsayılanı kursun default_code_language değeri), malzeme listesi (satır satır ekle/sil), araç linki + buton etiketi (src/lib/tools.ts izinli alan adları; MakeCode/Wokwi/Tinkercad), görsel yükleme (Supabase Storage lesson-media kovası; yüklenen görselin Markdown kodu imlecin olduğu yere eklensin), YouTube linki (geçerlilik kontrolü + küçük önizleme), tahmini süre, puan, yayında. zod ile doğrulama, Server Action ile kaydet, kaydedince toast. "Öğrenci gibi önizle" butonu.
5. Tüm öğretmen Server Action'ları requireRole('teacher') ile başlasın.

Öğrenci tarafı:
6. Öğrenci kabuğu: mobilde alt gezinme çubuğu (Panel, Dersler, Rozetler, Sıralama, Profil), masaüstünde üst menü. Rozetler/Sıralama şimdilik "Yakında" boş durumu göstersin.
7. /dersler: öğrencinin erişebildiği kurs kartları (tek kurs varsa doğrudan o kursa yönlendir). /dersler/[kurs]: kursun yayındaki modülleri, her modül renkli başlık + ders kartları (CLAUDE.md §10). Bu fazda durum göstergeleri yer tutucu olabilir.
8. /dersler/[kurs]/[modul]/[ders]: CLAUDE.md §10.1 düzeni (malzeme kutusu ve araç butonu dahil; tools.ts için de vitest yaz). Markdown güvenli render (ham HTML yok), "> 💡" alıntılarını ipucu kutusuna çevir, kod bloğu renklendirme + Kopyala, YouTube'u youtube-nocookie embed'e çeviren src/lib/youtube.ts (vitest testli), araç butonu. Önceki/Sonraki ders gezinmesi. "Tamamlandı" butonu şimdilik pasif (Faz 3).
9. Yayında olmayan veya öğrencinin sınıfına atanmamış kurs/modül/ders için 404. Yükleme durumları için skeleton, hata için dostça error.tsx.
10. Storage: lesson-media kovası ve politikaları (migration ile; CLAUDE.md §12). Seed migration: "micro:bit ile Kodlama" kursu altında CLAUDE.md §14'ten en az ilk 2 modül ve her birinde 3-4 kısa ama gerçek içerikli ders (Türkçe açıklama, örnek MicroPython kodu).

Bitince lint, test, build; telefon genişliğinde (375px) ders sayfasını kontrol et; CLAUDE.md'yi güncelle; commit.
```

---

## Faz 3 — İlerleme Takibi ve Kaldığın Yerden Devam

**Hedef:** Öğrenci dersi tamamlayabiliyor, ilerlemesi kaydediliyor, tekrar girdiğinde doğru derse yönlendiriliyor.

**Kabul kriterleri:** Çift tıklama çift kayıt üretmiyor; sıralı modülde kilitli derse URL ile girilince kilit ekranı çıkıyor; çıkış-giriş sonrası `/devam` doğru derse götürüyor; ilerleme yüzdeleri doğru.

```text
CLAUDE.md'yi oku. Faz 3'ü yapacağız. Önce Plan Mode'da plan çıkar.

1. Yeni migration: mark_lesson_viewed, complete_lesson (bu fazda puan kısmı dahil, rozet kısmı hariç — evaluate_badges Faz 4'te eklenecek, complete_lesson'da new_badges şimdilik boş dizi dönsün), get_resume_target (kurs bazlı), get_student_courses. CLAUDE.md §6.4 ve §8'deki kurallara birebir uy. Satır kilidiyle çift tamamlamayı engelle. Tipleri yeniden üret.
2. Ders sayfası açıldığında mark_lesson_viewed çağır (sunucu tarafında, sayfa render'ında bir kez).
3. "Tamamlandı ✓" butonu: istemci bileşeni, tıklayınca yükleniyor durumu, complete_lesson RPC, başarıda "+X puan" toast'u ve "Sonraki Derse Geç →" butonu öne çıksın. Zaten tamamlandıysa buton "Tamamlandı ✓" durumunda kalsın.
4. Sıralı modüllerde kilit: önceki ders tamamlanmadıysa ders kartı 🔒, URL ile açılırsa "Önce şu dersi bitir" ekranı ve o derse link.
5. /devam ve /devam/[kurs]: CLAUDE.md §8'e göre kurs seçimi + get_resume_target ile redirect. Girişten sonra öğrenci artık /devam'a gitsin.
6. /panel: "Merhaba, [ad]!", en üstte büyük "Devam Et → [Ders]" kartı (en son çalışılan kurs), altında get_student_courses ile kurs kartları (her birinde yüzde ve kendi "Devam Et" butonu), son tamamlanan 3 ders.
7. /dersler/[kurs] ve ders kartlarında gerçek durumlar: kilitli / başla / devam ediyor / tamamlandı; modül başlığında "3/8 ders" ve ilerleme çubuğu. Modül görünümünü CLAUDE.md §10'daki "yol/harita" düzenine çevir (dikey, düğümler).
8. Ders sayfasında scroll konumunu localStorage'da tut (try/catch), dönüşte "Kaldığın yere git" butonu.
9. Test senaryolarını uygula ve sonucunu bana yaz: (a) hızlı çift tıklama, (b) kilitli ders URL'si, (c) çıkış-giriş sonrası devam, (d) bir kursun tüm dersleri bitince /devam davranışı, (e) iki kursa atanmış öğrencide her kursun kendi devam noktasını koruması (test için geçici ikinci bir kurs oluştur, sonra sil).

Bitince lint, test, build; CLAUDE.md'yi güncelle; commit.
```

---

## Faz 4 — Oyunlaştırma

**Hedef:** Puan, seviye, rozet, seri ve sınıf sıralaması çalışıyor; tamamlama anı kutlamalı.

**Kabul kriterleri:** Rozetler doğru anda bir kez veriliyor; seviye çubuğu doğru; sıralama yalnızca kendi sınıfını ve izin verilen alanları gösteriyor; `prefers-reduced-motion`'da animasyon yok.

```text
CLAUDE.md'yi oku. Faz 4'ü yapacağız. Önce Plan Mode'da plan çıkar.

1. Migration: evaluate_badges, get_class_leaderboard, mark_badges_seen; complete_lesson'ı modül ve kurs bonusu, rozet değerlendirmesi (course_completed dahil) ve rozet bonuslarını içerecek şekilde güncelle (CLAUDE.md §6.4, §9). Seed: §9.3'teki rozetler (module_completed rozetlerini seed modüllerine, microbit-ustasi rozetini micro:bit kursuna bağla; modül yoksa o rozeti şimdilik ekleme ve not düş).
2. src/lib/gamification/levels.ts: §9.2 tablosu, getLevel(points) + vitest testleri (sınır değerleri dahil).
3. LevelBar bileşeni: seviye adı, ikon, sonraki seviyeye kalan puan, animasyonlu çubuk. Panelde büyük, üst çubukta küçük sürümü.
4. Kutlama akışı (CelebrationDialog): tamamlama sonrası konfeti, uçan "+X puan", seviye atladıysa "Seviye Atladın!", yeni rozet varsa rozet kartı (birden fazlaysa sırayla), en altta "Sonraki Derse Geç →". prefers-reduced-motion'a saygı.
5. Panel açılışında görülmemiş rozet varsa (seen=false) kutlamayı göster, sonra mark_badges_seen.
6. /rozetler: kazanılan rozetler renkli, kazanılmayanlar gri + kilit + "Nasıl kazanılır?" açıklaması + ilerleme (örn. "3/5 ders"). Rozet kartına tıklayınca detay dialog'u.
7. Seri göstergesi: panelde "🔥 X günlük seri" (activity_days'ten, Europe/Istanbul gününe göre).
8. /siralama: get_class_leaderboard; ilk 3 madalya, kendi satırı vurgulu, sıralama kapalıysa menüden gizle ve sayfada dostça mesaj.
9. /profil: avatar ve görünen ad değiştirme (sadece bu iki alan), istatistikler (toplam puan, kurs bazlı ilerleme yüzdeleri, seviye, tamamlanan ders, rozet sayısı, en uzun seri), son puan hareketleri listesi (point_events).
10. Uçtan uca test: yeni öğrenciyle ilk dersi bitir → İlk Adım rozeti; 5 ders → Kodlama Çaylağı; bir modülü bitir → modül bonusu + modül rozeti. Aynı dersi tekrar tamamlamaya çalış → puan yok. Sonuçları bana yaz.

Bitince lint, test, build; CLAUDE.md'yi güncelle; commit.
```

---

## Faz 5 — Öğretmen Paneli: Sınıf Yönetimi ve Raporlar

**Hedef:** Öğretmen sınıfları ve öğrencileri yönetebiliyor, kimin nerede olduğunu tek bakışta görebiliyor.

**Kabul kriterleri:** Toplu öğrenci oluşturma çalışıyor ve yazdırılabilir giriş kartları üretiyor; şifre sıfırlama çalışıyor; ilerleme tablosu doğru; tüm işlemler sadece öğretmenin kendi sınıflarına uygulanabiliyor.

```text
CLAUDE.md'yi oku. Faz 5'i yapacağız. Önce Plan Mode'da plan çıkar.

1. /ogretmen/siniflar: sınıf oluştur/düzenle/sil, otomatik 6 karakterlik katılım kodu (karışabilecek 0/O, 1/I harflerini kullanma), "Kodu yenile", "Kodu kopyala", sıralama aç/kapat anahtarı.
2. /ogretmen/siniflar/[id]: sınıfa atanmış kurslar (onay kutularıyla ata/kaldır; kaldırmak ilerleme verisini silmez, sadece erişimi kapatır), öğrenci listesi (avatar, ad, kullanıcı adı, puan, seviye, tamamlanan ders, son aktiflik). İşlemler: şifre sıfırla (yeni şifre üret ve göster), sınıftan çıkar, başka sınıfa taşı, bonus puan ver (teacher_add_bonus RPC + not).
3. Toplu öğrenci oluşturma: öğretmen her satıra bir öğrenci adı yazar → sistem benzersiz kullanıcı adı (ad + sayı, Türkçe karakter dönüşümlü) ve basit şifre (örn. "kedi4729" gibi kelime+4 rakam) üretir → Server Action admin API (service role) ile hesapları oluşturur → sonuç tablosu + yazdırılabilir "giriş kartları" sayfası (her kartta site adresi, kullanıcı adı, şifre; A4'e 8-10 kart, @media print). Şifreler veritabanında açık saklanmaz; sadece o ekranda gösterilir, bunu öğretmene uyarı olarak yaz.
4. Admin işlemlerinin tamamı sunucuda, src/lib/supabase/admin.ts üzerinden, öncesinde requireRole('teacher') ve öğrencinin bu öğretmenin sınıfında olduğu kontrolüyle.
5. /ogretmen/ilerleme: sınıf seçici + kurs seçici (yalnızca sınıfa atanmış kurslar) + modül seçici; satırlar öğrenciler, sütunlar dersler; hücrelerde ✅ / ⏳ / boş. Satır/sütun toplamları. Mobilde yatay kaydırmalı. CSV dışa aktarma butonu (Türkçe karakterler için UTF-8 BOM).
6. /ogretmen (özet): sınıf/öğrenci sayıları, bu hafta tamamlanan ders sayısı, son 7 günün günlük tamamlama grafiği (basit bar grafik, shadcn chart veya hafif kütüphane), en çok takılınan ders (en çok in_progress kalan), 7 gündür girmeyen öğrenciler listesi.
7. /ogretmen/rozetler: rozet tanımlarını listele/ekle/düzenle (kriter türü, değer, modül veya kurs, ikon, renk, bonus). Hangi öğrencinin hangi rozeti aldığını gösteren küçük özet.
8. Güvenlik testi: başka öğretmenin sınıfındaki öğrenciye işlem yapmayı dene (ikinci bir test öğretmeni oluştur), reddedildiğini göster.

Bitince lint, test, build; CLAUDE.md'yi güncelle; commit.
```

---

## Faz 6 — Cilalama, Örnek İçerik ve Yayın

**Hedef:** Uygulama sınıfta kullanılmaya hazır ve Vercel'de canlı.

**Kabul kriterleri:** Lighthouse mobil erişilebilirlik ≥ 90; Supabase Security Advisor temiz; Vercel'de canlı adreste kayıt → ders → tamamlama → rozet akışı çalışıyor.

```text
CLAUDE.md'yi oku. Faz 6'yı yapacağız. Önce Plan Mode'da plan çıkar.

1. CLAUDE.md §12 güvenlik kontrol listesini tek tek doğrula, her maddenin sonucunu bana raporla ve listeyi işaretle. Supabase advisor uyarılarını kontrol et ve düzelt.
2. Seed içeriğini CLAUDE.md §14'teki 5 modülün tamamına genişlet (her modülde 3-5 ders, Türkçe, örnek kodlu). Eksik module_completed rozetlerini ekle. Ayrıca §14'teki taslak Arduino kursunu (yayında değil) ekle; öğretmen hesabıyla test sınıfına atayıp geçici olarak yayınla, öğrenci tarafında iki kursun birlikte doğru çalıştığını doğrula (panel kartları, devam, ilerleme tablosu), sonra yayından kaldır.
3. Tasarım cilası: tüm sayfaları 375px, 768px, 1280px'te gözden geçir; boş durumlar, yükleme iskeletleri, hata sayfaları (not-found ve error, çocuk dostu robot illüstrasyonlu); tutarlı boşluklar; buton durumları; favicon ve uygulama ikonu (özgün robot); metadata ve Open Graph.
4. Karanlık mod (shadcn tema değişkenleriyle, kullanıcı seçimi + sistem tercihi).
5. Erişilebilirlik: klavye ile tüm akış, odak halkaları, aria-label'lar, kontrast; Lighthouse mobil raporu çıkar.
6. Performans: görseller next/image, gereksiz client bileşenlerini azalt, video tıklayınca yüklensin.
7. PWA temelleri: manifest (ana ekrana eklenebilsin), tema rengi.
8. README.md: proje tanıtımı, kurulum, ortam değişkenleri, Supabase ayarları (§13), öğretmen hesabı oluşturma, yeni ders ve yeni kurs ekleme rehberi (öğretmen için sade dille, CLAUDE.md §15).
9. Vercel yayını: adımları benimle birlikte yap (repo bağlama, ortam değişkenleri, Supabase redirect URL'leri). Yayından sonra canlı adreste uçtan uca test et.

Bitince CLAUDE.md'yi güncelle, tüm fazları işaretle; commit ve etiket: v1.0.0.
```

---

## Sonraki Sürüm Fikirleri (şimdilik yapma)

- Ders sonu mini quiz (çoktan seçmeli, ek puan)
- Öğrencinin proje fotoğrafı/videosu yüklemesi ve öğretmen onayı ("Proje Galerisi")
- Haftalık görevler ve sınıf hedefi ("Bu hafta sınıfça 50 ders!")
- Gömülü MicroPython çalıştırıcı / micro:bit simülatörü
- Öğretmen duyuruları
- Kurslar arası ön koşul (örn. micro:bit kursu bitmeden Arduino açılmasın)
- Veliler için salt-okunur ilerleme bağlantısı

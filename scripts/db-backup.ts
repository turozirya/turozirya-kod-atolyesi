// Canlı Supabase veritabanının veri yedeğini backups/<zaman>/ altına JSON olarak alır.
// Şema zaten supabase/migrations/ altında sürüm kontrollü; bu script sadece SATIR verisini yedekler.
//
// Kullanım: npm run db:backup

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../src/types/database";

try {
  process.loadEnvFile(path.join(process.cwd(), ".env.local"));
} catch {
  // .env.local yoksa veya ortam değişkenleri zaten set edilmişse sorun değil.
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SECRET_KEY;
if (!supabaseUrl || !serviceKey) {
  console.error("NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SECRET_KEY gerekli (.env.local).");
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const PUBLIC_TABLES = [
  "classes",
  "courses",
  "class_courses",
  "profiles",
  "modules",
  "lessons",
  "lesson_progress",
  "point_events",
  "badges",
  "student_badges",
  "activity_days",
  "announcements",
  "lesson_quiz_questions",
  "lesson_quiz_attempts",
] as const;

function timestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

async function main() {
  const dir = path.join(process.cwd(), "backups", timestamp());
  fs.mkdirSync(dir, { recursive: true });

  for (const table of PUBLIC_TABLES) {
    const { data, error } = await supabase.from(table).select("*");
    if (error) {
      console.error(`✗ ${table}: ${error.message}`);
      process.exit(1);
    }
    fs.writeFileSync(path.join(dir, `${table}.json`), JSON.stringify(data, null, 2));
    console.log(`✓ ${table}: ${data?.length ?? 0} satır`);
  }

  const { data: users, error: usersError } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  if (usersError) {
    console.error(`✗ auth.users: ${usersError.message}`);
    process.exit(1);
  }
  fs.writeFileSync(path.join(dir, "auth_users.json"), JSON.stringify(users.users, null, 2));
  console.log(`✓ auth.users: ${users.users.length} satır`);

  console.log(`\nYedek tamamlandı: ${dir}`);
}

main();

// Test kullanıcı hesaplarını Supabase admin API ile siler (auth.users → profiles →
// lesson_progress/point_events/student_badges/activity_days/lesson_quiz_attempts
// on delete cascade). classes.teacher_id de auth.users'a cascade bağlı olduğu için
// bir test öğretmeni silinince sahibi olduğu test sınıfı da otomatik silinir.
//
// Kullanım: npm run db:cleanup-users

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

const USERS_TO_DELETE: { username: string; id: string }[] = [
  { username: "testhesabi", id: "2037171b-750a-48b7-a038-55986f345cae" },
  { username: "testogretmen2", id: "f049b175-4bc7-466e-a63c-67f87793f29c" },
  { username: "faz4testfaz4test", id: "82c15792-d5c6-43b4-97a6-231eef4e8541" },
  { username: "faz5ogretmen", id: "a7c7153d-4ff2-4730-a3ac-359483e7d6fc" },
  { username: "denizarslan", id: "50e2665c-a2a7-488e-b8e7-80cb9068c9cd" },
  { username: "zeynepkaya", id: "8f3441be-242d-4732-9d7c-23f0a2d9941c" },
  { username: "canozturk", id: "2c20f612-181a-463f-bcbb-8ef1128ab819" },
  { username: "elifsahin", id: "99ce9bdc-1f0b-4078-bfac-793d819a11d2" },
  { username: "faz6cancelbtn", id: "784ca0fa-a52a-4d7e-8614-769f1b1311dd" },
];

async function main() {
  for (const user of USERS_TO_DELETE) {
    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) {
      console.error(`✗ ${user.username} (${user.id}): ${error.message}`);
      continue;
    }
    console.log(`✓ ${user.username} silindi`);
  }
}

main();

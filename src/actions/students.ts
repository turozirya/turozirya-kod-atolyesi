"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireRoleAction } from "@/lib/auth/session";
import { ensureUniqueUsername, suggestUsername, usernameToEmail } from "@/lib/auth/username";
import { generateSimplePassword } from "@/lib/auth/password";

type ActionResult = { error?: string };

const STUDENT_EMAIL_DOMAIN =
  process.env.STUDENT_EMAIL_DOMAIN ?? "ogrenci.kodlamakulubu.local";

function mapRpcError(error: { message: string } | null): string {
  if (!error) return "Bir şeyler ters gitti, tekrar dene.";
  if (error.message.includes("NOT_YOUR_STUDENT")) {
    return "Bu öğrenci senin sınıfında değil.";
  }
  if (error.message.includes("NOT_YOUR_CLASS")) {
    return "Hedef sınıf senin değil.";
  }
  if (error.message.includes("INVALID_AMOUNT")) {
    return "Puan miktarı pozitif bir sayı olmalı.";
  }
  return "Bir şeyler ters gitti, tekrar dene.";
}

export async function resetStudentPassword(
  studentId: string
): Promise<ActionResult & { password?: string }> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const supabase = await createClient();

  const { data: allowed } = await supabase.rpc("teaches_student", { student: studentId });
  if (!allowed) {
    return { error: "Bu öğrenci senin sınıfında değil." };
  }

  const password = generateSimplePassword();
  const admin = createAdminClient();
  const { error } = await admin.auth.admin.updateUserById(studentId, { password });
  if (error) {
    return { error: "Şifre sıfırlanamadı." };
  }

  return { password };
}

export async function moveStudentClass(
  studentId: string,
  newClassId: string | null
): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const supabase = await createClient();
  // Supabase'in tip üreteci uuid parametresini nullable olarak işaretlemiyor,
  // ama fonksiyon sınıftan çıkarmak için null'ı kabul ediyor (0013 migration).
  const { error } = await supabase.rpc("teacher_update_student_class", {
    p_student: studentId,
    p_class_id: newClassId as unknown as string,
  });
  if (error) {
    return { error: mapRpcError(error) };
  }

  revalidatePath("/ogretmen/siniflar");
  return {};
}

export async function addBonusPoints(
  studentId: string,
  amount: number,
  note: string
): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  if (!Number.isInteger(amount) || amount <= 0) {
    return { error: "Puan miktarı pozitif bir tam sayı olmalı." };
  }

  const supabase = await createClient();
  // bkz. moveStudentClass'taki not: tip üreteci text parametresini nullable
  // işaretlemiyor ama fonksiyon boş not için null'ı kabul ediyor.
  const { error } = await supabase.rpc("teacher_add_bonus", {
    p_student: studentId,
    p_amount: amount,
    p_note: (note.trim() || null) as unknown as string,
  });
  if (error) {
    return { error: mapRpcError(error) };
  }

  revalidatePath("/ogretmen/siniflar");
  return {};
}

type CreatedStudent = { displayName: string; username: string; password: string };

export async function bulkCreateStudents(
  classId: string,
  rawNames: string
): Promise<ActionResult & { created?: CreatedStudent[] }> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const profile = auth;
  const supabase = await createClient();

  const { data: klass } = await supabase
    .from("classes")
    .select("id, join_code")
    .eq("id", classId)
    .eq("teacher_id", profile.id)
    .maybeSingle();
  if (!klass) {
    return { error: "Bu sınıf sana ait değil." };
  }

  const names = rawNames
    .split("\n")
    .map((n) => n.trim())
    .filter(Boolean);
  if (names.length === 0) {
    return { error: "En az bir isim yazmalısın." };
  }
  if (names.length > 60) {
    return { error: "Tek seferde en fazla 60 öğrenci eklenebilir." };
  }

  const { data: existingProfiles } = await supabase.from("profiles").select("username");
  const taken = new Set((existingProfiles ?? []).map((p) => p.username));

  const admin = createAdminClient();
  const created: CreatedStudent[] = [];

  for (const displayName of names) {
    const username = ensureUniqueUsername(suggestUsername(displayName), taken);
    taken.add(username);
    const password = generateSimplePassword();

    const { error } = await admin.auth.admin.createUser({
      email: usernameToEmail(username, STUDENT_EMAIL_DOMAIN),
      password,
      email_confirm: true,
      user_metadata: {
        username,
        display_name: displayName,
        avatar: "robot-1",
        class_code: klass.join_code,
      },
    });

    if (!error) {
      created.push({ displayName, username, password });
    }
  }

  revalidatePath(`/ogretmen/siniflar/${classId}`);
  return { created };
}

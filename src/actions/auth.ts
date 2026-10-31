"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { usernameToEmail } from "@/lib/auth/username";
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from "@/lib/validations/auth";

const STUDENT_EMAIL_DOMAIN =
  process.env.STUDENT_EMAIL_DOMAIN ?? "ogrenci.kodlamakulubu.local";

export async function registerStudent(
  input: RegisterInput
): Promise<{ error?: string }> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Bilgileri kontrol et." };
  }
  const { classCode, displayName, username, password, avatar } = parsed.data;

  const supabase = await createClient();

  const { data: className } = await supabase.rpc("check_class_code", {
    p_code: classCode,
  });
  if (!className) {
    return { error: "Sınıf kodu geçersiz, öğretmenine tekrar sor." };
  }

  const { count } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("username", username);
  if (count && count > 0) {
    return { error: "Bu kullanıcı adı alınmış, başka bir tane dene!" };
  }

  const { error } = await supabase.auth.signUp({
    email: usernameToEmail(username, STUDENT_EMAIL_DOMAIN),
    password,
    options: {
      data: {
        username,
        display_name: displayName,
        avatar,
        class_code: classCode,
      },
    },
  });

  if (error) {
    return { error: "Bir şeyler ters gitti, tekrar dene." };
  }

  redirect("/devam");
}

export async function signIn(input: LoginInput): Promise<{ error?: string }> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Bilgileri kontrol et." };
  }

  const email = parsed.data.identifier.includes("@")
    ? parsed.data.identifier
    : usernameToEmail(parsed.data.identifier, STUDENT_EMAIL_DOMAIN);

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    return { error: "Kullanıcı adı/e-posta veya şifre yanlış." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle();

  redirect(profile?.role === "teacher" ? "/ogretmen" : "/devam");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/giris");
}

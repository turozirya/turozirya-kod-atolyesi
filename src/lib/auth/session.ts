import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  return data?.claims ?? null;
});

export const getCurrentProfile = cache(async (): Promise<Profile | null> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims.sub;
  if (!userId) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  return profile;
});

export async function requireRole(role: Profile["role"]): Promise<Profile> {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/giris");
  }
  if (profile.role !== role) {
    redirect(profile.role === "teacher" ? "/ogretmen" : "/panel");
  }

  return profile;
}

// Server Action'lar için: requireRole gibi rolü doğrular, ama oturum süresi
// dolmuşsa sayfayı sessizce redirect() etmek yerine görünür bir hata döner.
// Aksi halde Next.js, Server Action içindeki redirect()'i istemciyi arka
// planda otomatik yönlendirerek işler — çağıran form hiçbir hata görmez ve
// kaydedilmemiş değişiklikler sessizce kaybolur.
export async function requireRoleAction(
  role: Profile["role"]
): Promise<Profile | { error: string }> {
  const profile = await getCurrentProfile();

  if (!profile || profile.role !== role) {
    return { error: "Oturumun sona erdi. Sayfayı yenileyip tekrar giriş yap." };
  }

  return profile;
}

// Öğrenci sayfaları için: oturum şart ama rol şart değil — öğretmen kendi
// hesabıyla "öğrenci gibi önizle" yapabilsin diye (RLS zaten öğretmene her
// şeyi gösteriyor). Yalnızca öğrencinin /ogretmen/* yollarına giremediği
// yön (CLAUDE.md §5.4) requireRole('teacher') ile ayrıca korunuyor.
export async function requireProfile(): Promise<Profile> {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/giris");
  }

  return profile;
}

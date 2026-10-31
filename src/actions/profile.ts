"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireProfile } from "@/lib/auth/session";
import { profileSchema, type ProfileInput } from "@/lib/validations/profile";

type ActionResult = { error?: string };

export async function updateProfile(input: ProfileInput): Promise<ActionResult> {
  const profile = await requireProfile();
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Bilgileri kontrol et." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: parsed.data.displayName,
      avatar: parsed.data.avatar,
    })
    .eq("id", profile.id);

  if (error) {
    return { error: "Bir şeyler ters gitti, tekrar dene." };
  }

  revalidatePath("/profil");
  revalidatePath("/panel");
  return {};
}

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/session";
import { badgeSchema, type BadgeInput } from "@/lib/validations/badge";

type ActionResult = { error?: string };

function mapError(error: { code?: string } | null): string {
  if (error?.code === "23505") {
    return "Bu kod zaten kullanılıyor, başka bir tane dene.";
  }
  return "Bir şeyler ters gitti, tekrar dene.";
}

export async function createBadge(input: BadgeInput): Promise<ActionResult> {
  await requireRole("teacher");
  const parsed = badgeSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Bilgileri kontrol et." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("badges").insert(parsed.data);
  if (error) {
    return { error: mapError(error) };
  }

  revalidatePath("/ogretmen/rozetler");
  return {};
}

export async function updateBadge(id: string, input: BadgeInput): Promise<ActionResult> {
  await requireRole("teacher");
  const parsed = badgeSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Bilgileri kontrol et." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("badges").update(parsed.data).eq("id", id);
  if (error) {
    return { error: mapError(error) };
  }

  revalidatePath("/ogretmen/rozetler");
  return {};
}

export async function deleteBadge(id: string): Promise<ActionResult> {
  await requireRole("teacher");
  const supabase = await createClient();
  const { error } = await supabase.from("badges").delete().eq("id", id);
  if (error) {
    return { error: "Rozet silinemedi." };
  }

  revalidatePath("/ogretmen/rozetler");
  return {};
}

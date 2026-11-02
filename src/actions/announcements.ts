"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRoleAction } from "@/lib/auth/session";
import { announcementSchema, type AnnouncementInput } from "@/lib/validations/announcement";

type ActionResult = { error?: string };

export async function createAnnouncement(
  classId: string,
  input: AnnouncementInput
): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const parsed = announcementSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Bilgileri kontrol et." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("announcements")
    .insert({ class_id: classId, title: parsed.data.title, content: parsed.data.content });
  if (error) {
    return { error: "Duyuru eklenemedi." };
  }

  revalidatePath(`/ogretmen/siniflar/${classId}`);
  return {};
}

export async function deleteAnnouncement(id: string, classId: string): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const supabase = await createClient();
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) {
    return { error: "Duyuru silinemedi." };
  }

  revalidatePath(`/ogretmen/siniflar/${classId}`);
  return {};
}

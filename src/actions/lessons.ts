"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRoleAction } from "@/lib/auth/session";
import { lessonSchema, type LessonInput } from "@/lib/validations/lesson";

type ActionResult = { error?: string; id?: string };

function mapError(error: { code?: string } | null): string {
  if (error?.code === "23505") {
    return "Bu slug bu modülde zaten kullanılıyor.";
  }
  return "Bir şeyler ters gitti, tekrar dene.";
}

export async function createLesson(input: LessonInput): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const parsed = lessonSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Bilgileri kontrol et." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lessons")
    .insert(parsed.data)
    .select("id")
    .single();
  if (error || !data) {
    return { error: mapError(error) };
  }

  revalidatePath(`/ogretmen/moduller/${parsed.data.module_id}`);
  return { id: data.id };
}

export async function updateLesson(
  id: string,
  input: LessonInput
): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const parsed = lessonSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Bilgileri kontrol et." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("lessons").update(parsed.data).eq("id", id);
  if (error) {
    return { error: mapError(error) };
  }

  revalidatePath(`/ogretmen/moduller/${parsed.data.module_id}`);
  revalidatePath(`/ogretmen/dersler/${id}`);
  return { id };
}

export async function deleteLesson(
  id: string,
  moduleId: string
): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const supabase = await createClient();
  const { error } = await supabase.from("lessons").delete().eq("id", id);
  if (error) {
    return { error: "Ders silinemedi." };
  }

  revalidatePath(`/ogretmen/moduller/${moduleId}`);
  return {};
}

export async function setLessonPublished(
  id: string,
  moduleId: string,
  isPublished: boolean
): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const supabase = await createClient();
  const { error } = await supabase
    .from("lessons")
    .update({ is_published: isPublished })
    .eq("id", id);
  if (error) {
    return { error: "Durum güncellenemedi." };
  }

  revalidatePath(`/ogretmen/moduller/${moduleId}`);
  return {};
}

export async function reorderLesson(
  id: string,
  moduleId: string,
  direction: "up" | "down"
): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const supabase = await createClient();
  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("id, order_index")
    .eq("module_id", moduleId)
    .order("order_index", { ascending: true });

  if (error || !lessons) {
    return { error: "Dersler yüklenemedi." };
  }

  const index = lessons.findIndex((l) => l.id === id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapWith < 0 || swapWith >= lessons.length) {
    return {};
  }

  const current = lessons[index];
  const target = lessons[swapWith];
  await supabase.from("lessons").update({ order_index: target.order_index }).eq("id", current.id);
  await supabase.from("lessons").update({ order_index: current.order_index }).eq("id", target.id);

  revalidatePath(`/ogretmen/moduller/${moduleId}`);
  return {};
}

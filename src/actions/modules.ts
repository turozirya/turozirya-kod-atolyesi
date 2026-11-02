"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRoleAction } from "@/lib/auth/session";
import { moduleSchema, type ModuleInput } from "@/lib/validations/module";

type ActionResult = { error?: string };

function mapError(error: { code?: string } | null): string {
  if (error?.code === "23505") {
    return "Bu slug bu kursta zaten kullanılıyor.";
  }
  return "Bir şeyler ters gitti, tekrar dene.";
}

export async function createModule(input: ModuleInput): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const parsed = moduleSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Bilgileri kontrol et." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("modules").insert(parsed.data);
  if (error) {
    return { error: mapError(error) };
  }

  revalidatePath(`/ogretmen/kurslar/${parsed.data.course_id}`);
  return {};
}

export async function updateModule(
  id: string,
  input: ModuleInput
): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const parsed = moduleSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Bilgileri kontrol et." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("modules").update(parsed.data).eq("id", id);
  if (error) {
    return { error: mapError(error) };
  }

  revalidatePath(`/ogretmen/kurslar/${parsed.data.course_id}`);
  revalidatePath(`/ogretmen/moduller/${id}`);
  return {};
}

export async function deleteModule(
  id: string,
  courseId: string
): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const supabase = await createClient();
  const { error } = await supabase.from("modules").delete().eq("id", id);
  if (error) {
    return { error: "Modül silinemedi." };
  }

  revalidatePath(`/ogretmen/kurslar/${courseId}`);
  return {};
}

export async function setModulePublished(
  id: string,
  courseId: string,
  isPublished: boolean
): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const supabase = await createClient();
  const { error } = await supabase
    .from("modules")
    .update({ is_published: isPublished })
    .eq("id", id);
  if (error) {
    return { error: "Durum güncellenemedi." };
  }

  revalidatePath(`/ogretmen/kurslar/${courseId}`);
  return {};
}

export async function reorderModule(
  id: string,
  courseId: string,
  direction: "up" | "down"
): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const supabase = await createClient();
  const { data: modules, error } = await supabase
    .from("modules")
    .select("id, order_index")
    .eq("course_id", courseId)
    .order("order_index", { ascending: true });

  if (error || !modules) {
    return { error: "Modüller yüklenemedi." };
  }

  const index = modules.findIndex((m) => m.id === id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapWith < 0 || swapWith >= modules.length) {
    return {};
  }

  const current = modules[index];
  const target = modules[swapWith];
  await supabase.from("modules").update({ order_index: target.order_index }).eq("id", current.id);
  await supabase.from("modules").update({ order_index: current.order_index }).eq("id", target.id);

  revalidatePath(`/ogretmen/kurslar/${courseId}`);
  return {};
}

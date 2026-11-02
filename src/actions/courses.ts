"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRoleAction } from "@/lib/auth/session";
import { courseSchema, type CourseInput } from "@/lib/validations/course";

type ActionResult = { error?: string };

function mapError(error: { code?: string } | null): string {
  if (error?.code === "23505") {
    return "Bu slug zaten kullanılıyor, başka bir tane dene.";
  }
  return "Bir şeyler ters gitti, tekrar dene.";
}

export async function createCourse(input: CourseInput): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const parsed = courseSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Bilgileri kontrol et." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("courses").insert(parsed.data);
  if (error) {
    return { error: mapError(error) };
  }

  revalidatePath("/ogretmen/kurslar");
  return {};
}

export async function updateCourse(
  id: string,
  input: CourseInput
): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const parsed = courseSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Bilgileri kontrol et." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("courses").update(parsed.data).eq("id", id);
  if (error) {
    return { error: mapError(error) };
  }

  revalidatePath("/ogretmen/kurslar");
  revalidatePath(`/ogretmen/kurslar/${id}`);
  return {};
}

export async function deleteCourse(id: string): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const supabase = await createClient();
  const { error } = await supabase.from("courses").delete().eq("id", id);
  if (error) {
    return { error: "Kurs silinemedi." };
  }

  revalidatePath("/ogretmen/kurslar");
  return {};
}

export async function setCoursePublished(
  id: string,
  isPublished: boolean
): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const supabase = await createClient();
  const { error } = await supabase
    .from("courses")
    .update({ is_published: isPublished })
    .eq("id", id);
  if (error) {
    return { error: "Durum güncellenemedi." };
  }

  revalidatePath("/ogretmen/kurslar");
  return {};
}

export async function reorderCourse(
  id: string,
  direction: "up" | "down"
): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const supabase = await createClient();
  const { data: courses, error } = await supabase
    .from("courses")
    .select("id, order_index")
    .order("order_index", { ascending: true });

  if (error || !courses) {
    return { error: "Kurslar yüklenemedi." };
  }

  const index = courses.findIndex((c) => c.id === id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapWith < 0 || swapWith >= courses.length) {
    return {};
  }

  const current = courses[index];
  const target = courses[swapWith];
  await supabase.from("courses").update({ order_index: target.order_index }).eq("id", current.id);
  await supabase.from("courses").update({ order_index: current.order_index }).eq("id", target.id);

  revalidatePath("/ogretmen/kurslar");
  return {};
}

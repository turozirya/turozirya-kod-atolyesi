"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/session";
import { generateJoinCode } from "@/lib/auth/class-code";
import { classSchema, type ClassInput } from "@/lib/validations/class";

type ActionResult = { error?: string };

const MAX_JOIN_CODE_ATTEMPTS = 5;

function mapError(error: { code?: string } | null): string {
  if (error?.code === "23505") {
    return "Katılım kodu çakıştı, tekrar dene.";
  }
  return "Bir şeyler ters gitti, tekrar dene.";
}

export async function createClass(
  input: Pick<ClassInput, "name">
): Promise<ActionResult & { id?: string }> {
  const profile = await requireRole("teacher");
  const parsed = classSchema
    .pick({ name: true })
    .safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Bilgileri kontrol et." };
  }

  const supabase = await createClient();
  for (let attempt = 0; attempt < MAX_JOIN_CODE_ATTEMPTS; attempt++) {
    const { data, error } = await supabase
      .from("classes")
      .insert({
        name: parsed.data.name,
        teacher_id: profile.id,
        join_code: generateJoinCode(),
      })
      .select("id")
      .single();

    if (!error) {
      revalidatePath("/ogretmen/siniflar");
      return { id: data.id };
    }
    if (error.code !== "23505") {
      return { error: mapError(error) };
    }
  }

  return { error: "Katılım kodu üretilemedi, tekrar dene." };
}

export async function updateClass(id: string, input: ClassInput): Promise<ActionResult> {
  await requireRole("teacher");
  const parsed = classSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Bilgileri kontrol et." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("classes")
    .update({
      name: parsed.data.name,
      leaderboard_enabled: parsed.data.leaderboard_enabled,
      weekly_goal: parsed.data.weekly_goal,
    })
    .eq("id", id);
  if (error) {
    return { error: mapError(error) };
  }

  revalidatePath("/ogretmen/siniflar");
  revalidatePath(`/ogretmen/siniflar/${id}`);
  return {};
}

export async function setClassLeaderboardEnabled(
  id: string,
  enabled: boolean
): Promise<ActionResult> {
  await requireRole("teacher");
  const supabase = await createClient();
  const { error } = await supabase
    .from("classes")
    .update({ leaderboard_enabled: enabled })
    .eq("id", id);
  if (error) {
    return { error: "Durum güncellenemedi." };
  }

  revalidatePath("/ogretmen/siniflar");
  return {};
}

export async function deleteClass(id: string): Promise<ActionResult> {
  await requireRole("teacher");
  const supabase = await createClient();
  const { error } = await supabase.from("classes").delete().eq("id", id);
  if (error) {
    return { error: "Sınıf silinemedi." };
  }

  revalidatePath("/ogretmen/siniflar");
  return {};
}

export async function regenerateJoinCode(
  id: string
): Promise<ActionResult & { joinCode?: string }> {
  await requireRole("teacher");
  const supabase = await createClient();

  for (let attempt = 0; attempt < MAX_JOIN_CODE_ATTEMPTS; attempt++) {
    const joinCode = generateJoinCode();
    const { error } = await supabase
      .from("classes")
      .update({ join_code: joinCode })
      .eq("id", id);

    if (!error) {
      revalidatePath("/ogretmen/siniflar");
      revalidatePath(`/ogretmen/siniflar/${id}`);
      return { joinCode };
    }
    if (error.code !== "23505") {
      return { error: mapError(error) };
    }
  }

  return { error: "Katılım kodu üretilemedi, tekrar dene." };
}

export async function toggleClassCourse(
  classId: string,
  courseId: string,
  assign: boolean
): Promise<ActionResult> {
  await requireRole("teacher");
  const supabase = await createClient();

  const { error } = assign
    ? await supabase.from("class_courses").insert({ class_id: classId, course_id: courseId })
    : await supabase
        .from("class_courses")
        .delete()
        .eq("class_id", classId)
        .eq("course_id", courseId);

  if (error) {
    return { error: "Kurs ataması güncellenemedi." };
  }

  revalidatePath(`/ogretmen/siniflar/${classId}`);
  return {};
}

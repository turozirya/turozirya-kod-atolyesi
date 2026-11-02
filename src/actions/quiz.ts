"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRoleAction } from "@/lib/auth/session";
import { quizQuestionSchema, type QuizQuestionInput } from "@/lib/validations/quiz";

type ActionResult = { error?: string };

export async function createQuizQuestion(
  lessonId: string,
  input: QuizQuestionInput
): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const parsed = quizQuestionSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Bilgileri kontrol et." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("lesson_quiz_questions")
    .insert({ lesson_id: lessonId, ...parsed.data });
  if (error) {
    return { error: "Soru eklenemedi." };
  }

  revalidatePath(`/ogretmen/dersler/${lessonId}`);
  return {};
}

export async function updateQuizQuestion(
  id: string,
  lessonId: string,
  input: QuizQuestionInput
): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const parsed = quizQuestionSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Bilgileri kontrol et." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("lesson_quiz_questions")
    .update(parsed.data)
    .eq("id", id);
  if (error) {
    return { error: "Soru güncellenemedi." };
  }

  revalidatePath(`/ogretmen/dersler/${lessonId}`);
  return {};
}

export async function deleteQuizQuestion(id: string, lessonId: string): Promise<ActionResult> {
  const auth = await requireRoleAction("teacher");
  if ("error" in auth) return auth;
  const supabase = await createClient();
  const { error } = await supabase.from("lesson_quiz_questions").delete().eq("id", id);
  if (error) {
    return { error: "Soru silinemedi." };
  }

  revalidatePath(`/ogretmen/dersler/${lessonId}`);
  return {};
}

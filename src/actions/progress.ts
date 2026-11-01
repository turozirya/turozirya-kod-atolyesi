"use server";

import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";

export async function completeLesson(
  lessonId: string
): Promise<{ data?: Json; error?: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("complete_lesson", {
    p_lesson_id: lessonId,
  });

  if (error) {
    if (error.message.includes("LESSON_LOCKED")) {
      return { error: "Önce bu modüldeki önceki dersi bitirmelisin." };
    }
    if (error.message.includes("NOT_A_STUDENT")) {
      return { error: "Bu bir önizleme — tamamlama öğrenciler içindir." };
    }
    return { error: "Bir şeyler ters gitti, tekrar dene." };
  }

  return { data };
}

export async function submitQuiz(
  lessonId: string,
  answers: { question_id: string; selected_index: number }[]
): Promise<{ data?: Json; error?: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("submit_quiz", {
    p_lesson_id: lessonId,
    p_answers: answers,
  });

  if (error) {
    if (error.message.includes("NOT_A_STUDENT")) {
      return { error: "Bu bir önizleme — quiz öğrenciler içindir." };
    }
    return { error: "Bir şeyler ters gitti, tekrar dene." };
  }

  return { data };
}

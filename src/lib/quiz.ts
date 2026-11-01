import type { Json } from "@/types/database";
import { parseCompleteLessonResult, type CompleteLessonResult } from "@/lib/gamification/complete-lesson";

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  points: number;
};

export type QuizAnswerResult = {
  question_id: string;
  selected_index: number | null;
  correct_index: number;
  correct: boolean;
};

export type QuizResult = CompleteLessonResult & {
  correct_count: number;
  total_questions: number;
  results: QuizAnswerResult[];
};

export function parseQuizQuestions(value: Json | null): QuizQuestion[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const { id, question, options, points } = item as Record<string, Json | undefined>;
    if (
      typeof id === "string" &&
      typeof question === "string" &&
      Array.isArray(options) &&
      typeof points === "number"
    ) {
      return [{ id, question, options: options.filter((o): o is string => typeof o === "string"), points }];
    }
    return [];
  });
}

function parseAnswerResults(value: Json | undefined): QuizAnswerResult[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const { question_id, selected_index, correct_index, correct } = item as Record<
      string,
      Json | undefined
    >;
    if (
      typeof question_id === "string" &&
      typeof correct_index === "number" &&
      typeof correct === "boolean"
    ) {
      return [
        {
          question_id,
          selected_index: typeof selected_index === "number" ? selected_index : null,
          correct_index,
          correct,
        },
      ];
    }
    return [];
  });
}

export function parseQuizResult(value: Json | undefined): QuizResult | null {
  const base = parseCompleteLessonResult(value);
  if (!base || !value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  const payload = value as Record<string, Json | undefined>;

  return {
    ...base,
    correct_count: typeof payload.correct_count === "number" ? payload.correct_count : 0,
    total_questions: typeof payload.total_questions === "number" ? payload.total_questions : 0,
    results: parseAnswerResults(payload.results),
  };
}

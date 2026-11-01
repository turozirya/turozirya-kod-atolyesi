import { z } from "zod";

export const quizQuestionSchema = z
  .object({
    question: z.string().trim().min(2, "Soru en az 2 karakter olmalı").max(300),
    options: z
      .array(z.string().trim().min(1))
      .min(2, "En az 2 seçenek gerekli")
      .max(6, "En fazla 6 seçenek olabilir"),
    correct_index: z.number().int().min(0),
    points: z.number().int().min(0).max(100),
    order_index: z.number().int().min(0),
  })
  .refine((v) => v.correct_index < v.options.length, {
    message: "Doğru cevap olarak mevcut seçeneklerden birini seç",
    path: ["correct_index"],
  });

export type QuizQuestionInput = z.infer<typeof quizQuestionSchema>;

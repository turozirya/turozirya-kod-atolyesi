import { z } from "zod";

export const BADGE_CRITERIA_VALUES = [
  "first_lesson",
  "lessons_completed",
  "module_completed",
  "course_completed",
  "points_total",
  "streak_days",
] as const;

export const BADGE_COLOR_VALUES = [
  "amber",
  "emerald",
  "sky",
  "violet",
  "pink",
  "orange",
] as const;

export const badgeSchema = z
  .object({
    code: z
      .string()
      .trim()
      .min(2, "Kod en az 2 karakter olmalı")
      .max(40)
      .regex(/^[a-z0-9_-]+$/, "Yalnızca küçük harf, rakam, tire ve alt çizgi kullanabilirsin"),
    name: z.string().trim().min(2, "Ad en az 2 karakter olmalı").max(60),
    description: z.string().trim().min(2, "Açıklama en az 2 karakter olmalı").max(200),
    icon: z.string().min(1, "Bir ikon seç"),
    color: z.enum(BADGE_COLOR_VALUES),
    criteria: z.enum(BADGE_CRITERIA_VALUES),
    criteria_value: z.number().int().positive().nullable(),
    module_id: z.string().uuid().nullable(),
    course_id: z.string().uuid().nullable(),
    bonus_points: z.number().int().min(0),
    order_index: z.number().int().min(0),
  })
  .refine(
    (v) =>
      !["lessons_completed", "points_total", "streak_days"].includes(v.criteria) ||
      v.criteria_value != null,
    { message: "Bu kriter için bir değer girmelisin.", path: ["criteria_value"] }
  )
  .refine((v) => v.criteria !== "module_completed" || v.module_id != null, {
    message: "Bir modül seçmelisin.",
    path: ["module_id"],
  })
  .refine((v) => v.criteria !== "course_completed" || v.course_id != null, {
    message: "Bir kurs seçmelisin.",
    path: ["course_id"],
  });

export type BadgeInput = z.infer<typeof badgeSchema>;

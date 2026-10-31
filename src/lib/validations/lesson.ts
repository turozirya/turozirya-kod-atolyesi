import { z } from "zod";
import { CODE_LANGUAGES } from "@/lib/code-languages";
import { isAllowedToolUrl } from "@/lib/tools";
import { parseYouTubeId } from "@/lib/youtube";

const CODE_LANGUAGE_VALUES = CODE_LANGUAGES.map((lang) => lang.value) as [
  string,
  ...string[],
];

export const lessonSchema = z.object({
  module_id: z.string().uuid(),
  title: z.string().trim().min(2, "Başlık en az 2 karakter olmalı").max(100),
  slug: z
    .string()
    .trim()
    .min(2, "Slug en az 2 karakter olmalı")
    .max(60)
    .regex(/^[a-z0-9-]+$/, "Slug yalnızca küçük harf, rakam ve tire içerebilir"),
  summary: z.string().trim().max(300).optional(),
  content: z.string().trim().min(1, "Ders içeriği boş olamaz"),
  example_code: z.string().optional(),
  code_language: z.enum(CODE_LANGUAGE_VALUES),
  tool_url: z
    .string()
    .trim()
    .optional()
    .refine((url) => !url || isAllowedToolUrl(url), {
      message: "Yalnızca MakeCode, Wokwi veya Tinkercad linklerine izin veriliyor",
    }),
  tool_label: z.string().trim().max(60).optional(),
  materials: z.array(z.string().trim().min(1)),
  video_url: z
    .string()
    .trim()
    .optional()
    .refine((url) => !url || parseYouTubeId(url) !== null, {
      message: "Geçerli bir YouTube linki gir",
    }),
  estimated_minutes: z.number().int().min(1).max(240),
  points: z.number().int().min(0).max(1000),
  is_published: z.boolean(),
});

export type LessonInput = z.infer<typeof lessonSchema>;

import { z } from "zod";
import { CODE_LANGUAGES } from "@/lib/code-languages";

const CODE_LANGUAGE_VALUES = CODE_LANGUAGES.map((lang) => lang.value) as [
  string,
  ...string[],
];

export const courseSchema = z.object({
  title: z.string().trim().min(2, "Başlık en az 2 karakter olmalı").max(100),
  slug: z
    .string()
    .trim()
    .min(2, "Slug en az 2 karakter olmalı")
    .max(60)
    .regex(/^[a-z0-9-]+$/, "Slug yalnızca küçük harf, rakam ve tire içerebilir"),
  description: z.string().trim().max(500).optional(),
  platform: z.string().trim().min(1, "Platform gerekli").max(40),
  default_code_language: z.enum(CODE_LANGUAGE_VALUES),
  icon: z.string().min(1, "Bir ikon seç"),
  color: z.string().min(1, "Bir renk seç"),
  cover_image: z.string().optional(),
  is_published: z.boolean(),
});

export type CourseInput = z.infer<typeof courseSchema>;

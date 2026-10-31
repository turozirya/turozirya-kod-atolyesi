import { z } from "zod";

export const moduleSchema = z.object({
  course_id: z.string().uuid(),
  title: z.string().trim().min(2, "Başlık en az 2 karakter olmalı").max(100),
  slug: z
    .string()
    .trim()
    .min(2, "Slug en az 2 karakter olmalı")
    .max(60)
    .regex(/^[a-z0-9-]+$/, "Slug yalnızca küçük harf, rakam ve tire içerebilir"),
  description: z.string().trim().max(500).optional(),
  icon: z.string().min(1, "Bir ikon seç"),
  color: z.string().min(1, "Bir renk seç"),
  is_sequential: z.boolean(),
  is_published: z.boolean(),
});

export type ModuleInput = z.infer<typeof moduleSchema>;

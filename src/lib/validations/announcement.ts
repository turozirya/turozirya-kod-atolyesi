import { z } from "zod";

export const announcementSchema = z.object({
  title: z.string().trim().min(2, "Başlık en az 2 karakter olmalı").max(100),
  content: z.string().trim().min(2, "İçerik en az 2 karakter olmalı").max(2000),
});

export type AnnouncementInput = z.infer<typeof announcementSchema>;

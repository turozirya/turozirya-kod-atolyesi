import { z } from "zod";

export const profileSchema = z.object({
  displayName: z.string().trim().min(2, "Adını yaz").max(50, "Ad çok uzun"),
  avatar: z.string().min(1, "Bir avatar seç"),
});

export type ProfileInput = z.infer<typeof profileSchema>;

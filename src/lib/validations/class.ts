import { z } from "zod";

export const classSchema = z.object({
  name: z.string().trim().min(2, "Sınıf adı en az 2 karakter olmalı").max(60),
  leaderboard_enabled: z.boolean(),
});

export type ClassInput = z.infer<typeof classSchema>;

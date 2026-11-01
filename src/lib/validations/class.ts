import { z } from "zod";

export const classSchema = z.object({
  name: z.string().trim().min(2, "Sınıf adı en az 2 karakter olmalı").max(60),
  leaderboard_enabled: z.boolean(),
  weekly_goal: z.union([z.number().int().min(1).max(500), z.null()]),
});

export type ClassInput = z.infer<typeof classSchema>;

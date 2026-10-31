import { z } from "zod";
import { isValidUsername } from "@/lib/auth/username";

export const registerSchema = z
  .object({
    classCode: z
      .string()
      .trim()
      .length(6, "Sınıf kodu 6 karakter olmalı"),
    displayName: z
      .string()
      .trim()
      .min(2, "Adını yaz")
      .max(50, "Ad çok uzun"),
    username: z.string().refine(isValidUsername, {
      message:
        "Kullanıcı adı 3-20 karakter olmalı; küçük harf, rakam ve alt çizgi kullanabilirsin",
    }),
    password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
    passwordConfirm: z.string(),
    avatar: z.string().min(1, "Bir avatar seç"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Şifreler eşleşmiyor",
    path: ["passwordConfirm"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, "Kullanıcı adı veya e-posta gerekli"),
  password: z.string().min(1, "Şifre gerekli"),
});

export type LoginInput = z.infer<typeof loginSchema>;

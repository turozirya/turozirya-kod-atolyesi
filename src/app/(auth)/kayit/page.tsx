"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarPicker } from "@/components/avatar-picker";
import { registerStudent } from "@/actions/auth";
import { createClient } from "@/lib/supabase/client";
import { suggestUsername } from "@/lib/auth/username";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";

export default function KayitPage() {
  const [classCodeCheck, setClassCodeCheck] = useState<{
    code: string;
    valid: boolean;
    name?: string;
  } | null>(null);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      classCode: "",
      displayName: "",
      username: "",
      password: "",
      passwordConfirm: "",
      avatar: "robot-1",
    },
  });

  const classCode = useWatch({ control, name: "classCode" });
  const displayName = useWatch({ control, name: "displayName" });
  const avatar = useWatch({ control, name: "avatar" });

  useEffect(() => {
    if (classCode.length !== 6) {
      return;
    }
    let cancelled = false;
    const timeout = setTimeout(async () => {
      const supabase = createClient();
      const { data } = await supabase.rpc("check_class_code", {
        p_code: classCode,
      });
      if (!cancelled) {
        setClassCodeCheck({ code: classCode, valid: Boolean(data), name: data ?? undefined });
      }
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [classCode]);

  const classCodeStatus: { state: "idle" | "checking" | "valid" | "invalid"; name?: string } =
    classCode.length !== 6
      ? { state: "idle" }
      : classCodeCheck?.code === classCode
        ? { state: classCodeCheck.valid ? "valid" : "invalid", name: classCodeCheck.name }
        : { state: "checking" };

  useEffect(() => {
    if (!usernameTouched && displayName) {
      setValue("username", suggestUsername(displayName));
    }
  }, [displayName, usernameTouched, setValue]);

  const onSubmit = async (data: RegisterInput) => {
    setServerError(null);
    setSubmitting(true);
    const result = await registerStudent(data);
    setSubmitting(false);
    if (result?.error) {
      setServerError(result.error);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md rounded-2xl p-6 shadow-sm sm:p-8">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Kayıt Ol
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Öğretmeninin verdiği sınıf koduyla katıl!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="classCode">Sınıf kodu</Label>
            <Input
              id="classCode"
              className="h-12 uppercase"
              maxLength={6}
              placeholder="ÖRN123"
              {...register("classCode")}
            />
            {classCodeStatus.state === "checking" && (
              <p className="text-sm text-muted-foreground">Kontrol ediliyor…</p>
            )}
            {classCodeStatus.state === "valid" && (
              <p className="text-sm font-medium text-success">
                ✓ {classCodeStatus.name}
              </p>
            )}
            {classCodeStatus.state === "invalid" && (
              <p className="text-sm font-medium text-destructive">
                Bu kod bir sınıfla eşleşmiyor
              </p>
            )}
            {errors.classCode && (
              <p className="text-sm font-medium text-destructive">
                {errors.classCode.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="displayName">Adın</Label>
            <Input id="displayName" className="h-12" {...register("displayName")} />
            {errors.displayName && (
              <p className="text-sm font-medium text-destructive">
                {errors.displayName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username">Kullanıcı adın</Label>
            <Input
              id="username"
              className="h-12"
              {...register("username", {
                onChange: () => setUsernameTouched(true),
              })}
            />
            <p className="text-sm text-muted-foreground">
              Girişte bunu kullanacaksın, unutma!
            </p>
            {errors.username && (
              <p className="text-sm font-medium text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Şifre</Label>
            <Input
              id="password"
              type="password"
              className="h-12"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm font-medium text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="passwordConfirm">Şifre (tekrar)</Label>
            <Input
              id="passwordConfirm"
              type="password"
              className="h-12"
              {...register("passwordConfirm")}
            />
            {errors.passwordConfirm && (
              <p className="text-sm font-medium text-destructive">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Avatarını seç</Label>
            <AvatarPicker value={avatar} onChange={(key) => setValue("avatar", key)} />
          </div>

          {serverError && (
            <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
              {serverError}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="h-12 rounded-2xl text-base font-bold shadow-sm"
          >
            {submitting ? "Kaydediliyor…" : "Kayıt Ol"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Zaten hesabın var mı?{" "}
          <Link href="/giris" className="font-medium text-primary underline-offset-4 hover:underline">
            Giriş yap
          </Link>
        </p>
      </Card>
    </div>
  );
}

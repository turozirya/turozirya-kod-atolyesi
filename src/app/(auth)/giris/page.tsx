"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/actions/auth";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

export default function GirisPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = async (data: LoginInput) => {
    setServerError(null);
    setSubmitting(true);
    const result = await signIn(data);
    setSubmitting(false);
    if (result?.error) {
      setServerError(result.error);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md rounded-2xl p-6 shadow-sm sm:p-8">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Giriş Yap
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Öğrenciysen kullanıcı adınla, öğretmensen e-postanla gir.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="identifier">Kullanıcı adı veya e-posta</Label>
            <Input id="identifier" className="h-12" {...register("identifier")} />
            {errors.identifier && (
              <p className="text-sm font-medium text-destructive">
                {errors.identifier.message}
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
            {submitting ? "Giriş yapılıyor…" : "Giriş Yap"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Hesabın yok mu?{" "}
          <Link href="/kayit" className="font-medium text-primary underline-offset-4 hover:underline">
            Kayıt ol
          </Link>
        </p>
      </Card>
    </div>
  );
}

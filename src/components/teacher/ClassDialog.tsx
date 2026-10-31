"use client";

import { useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { classSchema, type ClassInput } from "@/lib/validations/class";
import { createClass, updateClass } from "@/actions/classes";
import type { Tables } from "@/types/database";

type ClassRow = Tables<"classes">;

function defaultsFor(klass?: ClassRow): ClassInput {
  return klass
    ? { name: klass.name, leaderboard_enabled: klass.leaderboard_enabled }
    : { name: "", leaderboard_enabled: true };
}

export function ClassDialog({
  klass,
  trigger,
}: {
  klass?: ClassRow;
  trigger: ReactElement;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ClassInput>({
    resolver: zodResolver(classSchema),
    defaultValues: defaultsFor(klass),
  });

  const leaderboardEnabled = useWatch({ control, name: "leaderboard_enabled" });

  const onSubmit = async (data: ClassInput) => {
    setServerError(null);
    setSubmitting(true);
    const result = klass
      ? await updateClass(klass.id, data)
      : await createClass({ name: data.name });
    setSubmitting(false);
    if (result?.error) {
      setServerError(result.error);
      return;
    }
    toast.success(klass ? "Sınıf güncellendi" : "Sınıf oluşturuldu");
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          setServerError(null);
          reset(defaultsFor(klass));
        }
      }}
    >
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{klass ? "Sınıfı Düzenle" : "Yeni Sınıf"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="class-name">Sınıf adı</Label>
            <Input id="class-name" placeholder="6-A Robotik" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {klass && (
            <div className="flex items-center justify-between rounded-xl border px-3 py-2.5">
              <Label htmlFor="class-leaderboard">Sıralama açık</Label>
              <Switch
                id="class-leaderboard"
                checked={leaderboardEnabled}
                onCheckedChange={(checked) => setValue("leaderboard_enabled", checked)}
              />
            </div>
          )}

          {serverError && (
            <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
              {serverError}
            </p>
          )}

          <Button type="submit" disabled={submitting} className="mt-1 h-11 rounded-xl font-bold">
            {submitting ? "Kaydediliyor…" : "Kaydet"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

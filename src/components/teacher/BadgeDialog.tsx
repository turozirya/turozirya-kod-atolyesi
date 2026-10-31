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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { badgeSchema, BADGE_CRITERIA_VALUES, BADGE_COLOR_VALUES, type BadgeInput } from "@/lib/validations/badge";
import { createBadge, updateBadge } from "@/actions/teacher-badges";
import { ICON_OPTIONS } from "@/lib/icons";
import type { Tables } from "@/types/database";

type BadgeRow = Tables<"badges">;

const CRITERIA_LABELS: Record<(typeof BADGE_CRITERIA_VALUES)[number], string> = {
  first_lesson: "İlk dersi tamamlama",
  lessons_completed: "Toplam ders sayısı",
  module_completed: "Modül tamamlama",
  course_completed: "Kurs tamamlama",
  points_total: "Toplam puan",
  streak_days: "Art arda gün",
};

function defaultsFor(badge?: BadgeRow): BadgeInput {
  return badge
    ? {
        code: badge.code,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        color: badge.color as BadgeInput["color"],
        criteria: badge.criteria,
        criteria_value: badge.criteria_value,
        module_id: badge.module_id,
        course_id: badge.course_id,
        bonus_points: badge.bonus_points,
        order_index: badge.order_index,
      }
    : {
        code: "",
        name: "",
        description: "",
        icon: "star",
        color: "amber",
        criteria: "first_lesson",
        criteria_value: null,
        module_id: null,
        course_id: null,
        bonus_points: 0,
        order_index: 0,
      };
}

export function BadgeDialog({
  badge,
  courses,
  modules,
  trigger,
}: {
  badge?: BadgeRow;
  courses: { id: string; title: string }[];
  modules: { id: string; title: string; course_id: string }[];
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
  } = useForm<BadgeInput>({
    resolver: zodResolver(badgeSchema),
    defaultValues: defaultsFor(badge),
  });

  const criteria = useWatch({ control, name: "criteria" });
  const icon = useWatch({ control, name: "icon" });
  const color = useWatch({ control, name: "color" });
  const moduleId = useWatch({ control, name: "module_id" });
  const courseId = useWatch({ control, name: "course_id" });

  const needsValue = ["lessons_completed", "points_total", "streak_days"].includes(criteria);
  const needsModule = criteria === "module_completed";
  const needsCourse = criteria === "course_completed";

  const onSubmit = async (data: BadgeInput) => {
    setServerError(null);
    setSubmitting(true);
    const result = badge ? await updateBadge(badge.id, data) : await createBadge(data);
    setSubmitting(false);
    if (result?.error) {
      setServerError(result.error);
      return;
    }
    toast.success(badge ? "Rozet güncellendi" : "Rozet oluşturuldu");
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
          reset(defaultsFor(badge));
        }
      }}
    >
      <DialogTrigger render={trigger} />
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{badge ? "Rozeti Düzenle" : "Yeni Rozet"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="badge-code">Kod</Label>
              <Input id="badge-code" placeholder="ilk-adim" {...register("code")} />
              {errors.code && <p className="text-sm text-destructive">{errors.code.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="badge-name">Ad</Label>
              <Input id="badge-name" placeholder="İlk Adım" {...register("name")} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="badge-description">Açıklama</Label>
            <Textarea id="badge-description" rows={2} {...register("description")} />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label>İkon</Label>
              <Select value={icon} onValueChange={(value) => setValue("icon", value ?? "")}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ICON_OPTIONS.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Renk</Label>
              <Select
                value={color}
                onValueChange={(value) => setValue("color", value as BadgeInput["color"])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BADGE_COLOR_VALUES.map((key) => (
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Kriter</Label>
            <Select
              value={criteria}
              onValueChange={(value) => {
                setValue("criteria", value as BadgeInput["criteria"]);
                setValue("criteria_value", null);
                setValue("module_id", null);
                setValue("course_id", null);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  {(value: string | null) =>
                    CRITERIA_LABELS[value as (typeof BADGE_CRITERIA_VALUES)[number]] ?? ""
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {BADGE_CRITERIA_VALUES.map((value) => (
                  <SelectItem key={value} value={value}>
                    {CRITERIA_LABELS[value]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {needsValue && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="badge-criteria-value">Gereken değer</Label>
              <Input
                id="badge-criteria-value"
                type="number"
                min={1}
                {...register("criteria_value", { valueAsNumber: true })}
              />
              {errors.criteria_value && (
                <p className="text-sm text-destructive">{errors.criteria_value.message}</p>
              )}
            </div>
          )}

          {needsModule && (
            <div className="flex flex-col gap-1.5">
              <Label>Modül</Label>
              <Select
                value={moduleId ?? ""}
                onValueChange={(value) => setValue("module_id", value ?? null)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {(value: string | null) =>
                      modules.find((m) => m.id === value)?.title ?? "Modül seç"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {modules.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.module_id && (
                <p className="text-sm text-destructive">{errors.module_id.message}</p>
              )}
            </div>
          )}

          {needsCourse && (
            <div className="flex flex-col gap-1.5">
              <Label>Kurs</Label>
              <Select
                value={courseId ?? ""}
                onValueChange={(value) => setValue("course_id", value ?? null)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {(value: string | null) =>
                      courses.find((c) => c.id === value)?.title ?? "Kurs seç"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.course_id && (
                <p className="text-sm text-destructive">{errors.course_id.message}</p>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="badge-bonus">Bonus puan</Label>
              <Input
                id="badge-bonus"
                type="number"
                min={0}
                {...register("bonus_points", { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="badge-order">Sıra</Label>
              <Input
                id="badge-order"
                type="number"
                min={0}
                {...register("order_index", { valueAsNumber: true })}
              />
            </div>
          </div>

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

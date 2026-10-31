"use client";

import { useEffect, useState, type ReactElement } from "react";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { moduleSchema, type ModuleInput } from "@/lib/validations/module";
import { createModule, updateModule } from "@/actions/modules";
import { ICON_OPTIONS } from "@/lib/icons";
import { MODULE_COLORS } from "@/lib/module-colors";
import { slugify } from "@/lib/text";
import type { Tables } from "@/types/database";

type ModuleRow = Tables<"modules">;

function defaultsFor(courseId: string, module?: ModuleRow): ModuleInput {
  return module
    ? {
        course_id: module.course_id,
        title: module.title,
        slug: module.slug,
        description: module.description ?? "",
        icon: module.icon,
        color: module.color,
        is_sequential: module.is_sequential,
        is_published: module.is_published,
      }
    : {
        course_id: courseId,
        title: "",
        slug: "",
        description: "",
        icon: "cpu",
        color: "violet",
        is_sequential: true,
        is_published: false,
      };
}

export function ModuleDialog({
  courseId,
  module,
  trigger,
}: {
  courseId: string;
  module?: ModuleRow;
  trigger: ReactElement;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(module));
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ModuleInput>({
    resolver: zodResolver(moduleSchema),
    defaultValues: defaultsFor(courseId, module),
  });

  const title = useWatch({ control, name: "title" });
  const isPublished = useWatch({ control, name: "is_published" });
  const isSequential = useWatch({ control, name: "is_sequential" });
  const icon = useWatch({ control, name: "icon" });
  const color = useWatch({ control, name: "color" });

  useEffect(() => {
    if (!slugTouched) {
      setValue("slug", slugify(title || ""));
    }
  }, [title, slugTouched, setValue]);

  const onSubmit = async (data: ModuleInput) => {
    setServerError(null);
    setSubmitting(true);
    const result = module
      ? await updateModule(module.id, data)
      : await createModule(data);
    setSubmitting(false);
    if (result?.error) {
      setServerError(result.error);
      return;
    }
    toast.success(module ? "Modül güncellendi" : "Modül oluşturuldu");
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
          setSlugTouched(Boolean(module));
          reset(defaultsFor(courseId, module));
        }
      }}
    >
      <DialogTrigger render={trigger} />
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{module ? "Modülü Düzenle" : "Yeni Modül"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="module-title">Başlık</Label>
            <Input id="module-title" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="module-slug">Slug</Label>
            <Input
              id="module-slug"
              {...register("slug", { onChange: () => setSlugTouched(true) })}
            />
            {errors.slug && (
              <p className="text-sm text-destructive">{errors.slug.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="module-description">Açıklama</Label>
            <Textarea id="module-description" rows={2} {...register("description")} />
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
              <Select value={color} onValueChange={(value) => setValue("color", value ?? "")}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(MODULE_COLORS).map((key) => (
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border px-3 py-2.5">
            <Label htmlFor="module-sequential">Dersler sırayla açılsın</Label>
            <Switch
              id="module-sequential"
              checked={isSequential}
              onCheckedChange={(checked) => setValue("is_sequential", checked)}
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border px-3 py-2.5">
            <Label htmlFor="module-published">Yayında</Label>
            <Switch
              id="module-published"
              checked={isPublished}
              onCheckedChange={(checked) => setValue("is_published", checked)}
            />
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

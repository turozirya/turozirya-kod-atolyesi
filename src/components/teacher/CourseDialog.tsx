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
import { courseSchema, type CourseInput } from "@/lib/validations/course";
import { createCourse, updateCourse } from "@/actions/courses";
import { CODE_LANGUAGES } from "@/lib/code-languages";
import { ICON_OPTIONS } from "@/lib/icons";
import { MODULE_COLORS } from "@/lib/module-colors";
import { slugify } from "@/lib/text";
import type { Tables } from "@/types/database";

type CourseRow = Tables<"courses">;

function defaultsFor(course?: CourseRow): CourseInput {
  return course
    ? {
        title: course.title,
        slug: course.slug,
        description: course.description ?? "",
        platform: course.platform,
        default_code_language: course.default_code_language,
        icon: course.icon,
        color: course.color,
        cover_image: course.cover_image ?? "",
        is_published: course.is_published,
      }
    : {
        title: "",
        slug: "",
        description: "",
        platform: "microbit",
        default_code_language: "micropython",
        icon: "cpu",
        color: "violet",
        cover_image: "",
        is_published: false,
      };
}

export function CourseDialog({
  course,
  trigger,
}: {
  course?: CourseRow;
  trigger: ReactElement;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(course));
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CourseInput>({
    resolver: zodResolver(courseSchema),
    defaultValues: defaultsFor(course),
  });

  const title = useWatch({ control, name: "title" });
  const isPublished = useWatch({ control, name: "is_published" });
  const defaultCodeLanguage = useWatch({ control, name: "default_code_language" });
  const icon = useWatch({ control, name: "icon" });
  const color = useWatch({ control, name: "color" });

  useEffect(() => {
    if (!slugTouched) {
      setValue("slug", slugify(title || ""));
    }
  }, [title, slugTouched, setValue]);

  const onSubmit = async (data: CourseInput) => {
    setServerError(null);
    setSubmitting(true);
    const result = course
      ? await updateCourse(course.id, data)
      : await createCourse(data);
    setSubmitting(false);
    if (result?.error) {
      setServerError(result.error);
      return;
    }
    toast.success(course ? "Kurs güncellendi" : "Kurs oluşturuldu");
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
          setSlugTouched(Boolean(course));
          reset(defaultsFor(course));
        }
      }}
    >
      <DialogTrigger render={trigger} />
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{course ? "Kursu Düzenle" : "Yeni Kurs"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="course-title">Başlık</Label>
            <Input id="course-title" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="course-slug">Slug</Label>
            <Input
              id="course-slug"
              {...register("slug", { onChange: () => setSlugTouched(true) })}
            />
            {errors.slug && (
              <p className="text-sm text-destructive">{errors.slug.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="course-description">Açıklama</Label>
            <Textarea id="course-description" rows={2} {...register("description")} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="course-platform">Platform</Label>
            <Input
              id="course-platform"
              placeholder="microbit, arduino, pico…"
              {...register("platform")}
            />
            {errors.platform && (
              <p className="text-sm text-destructive">{errors.platform.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Varsayılan kod dili</Label>
            <Select
              value={defaultCodeLanguage}
              onValueChange={(value) =>
                setValue("default_code_language", value as CourseInput["default_code_language"])
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CODE_LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Label htmlFor="course-published">Yayında</Label>
            <Switch
              id="course-published"
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

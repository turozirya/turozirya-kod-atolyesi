"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ImagePlus, Plus, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { LessonContent } from "@/components/lesson/LessonContent";
import { lessonSchema, type LessonInput } from "@/lib/validations/lesson";
import { createLesson, updateLesson } from "@/actions/lessons";
import { CODE_LANGUAGES } from "@/lib/code-languages";
import { createClient } from "@/lib/supabase/client";
import {
  LESSON_MEDIA_BUCKET,
  buildLessonMediaPath,
  isAllowedImageFile,
} from "@/lib/storage";
import { slugify } from "@/lib/text";
import type { Tables } from "@/types/database";

type LessonRow = Tables<"lessons">;

function defaultsFor(moduleId: string, lesson?: LessonRow): LessonInput {
  return lesson
    ? {
        module_id: lesson.module_id,
        title: lesson.title,
        slug: lesson.slug,
        summary: lesson.summary ?? "",
        content: lesson.content,
        example_code: lesson.example_code ?? "",
        code_language: lesson.code_language,
        tool_url: lesson.tool_url ?? "",
        tool_label: lesson.tool_label ?? "",
        materials: lesson.materials,
        video_url: lesson.video_url ?? "",
        estimated_minutes: lesson.estimated_minutes,
        points: lesson.points,
        is_published: lesson.is_published,
      }
    : {
        module_id: moduleId,
        title: "",
        slug: "",
        summary: "",
        content: "",
        example_code: "",
        code_language: "blocks",
        tool_url: "",
        tool_label: "",
        materials: [],
        video_url: "",
        estimated_minutes: 20,
        points: 10,
        is_published: false,
      };
}

export function LessonEditor({
  moduleId,
  lesson,
  previewPath,
}: {
  moduleId: string;
  lesson?: LessonRow;
  previewPath?: string;
}) {
  const router = useRouter();
  const [slugTouched, setSlugTouched] = useState(Boolean(lesson));
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [materialInput, setMaterialInput] = useState("");
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<LessonInput>({
    resolver: zodResolver(lessonSchema),
    defaultValues: defaultsFor(moduleId, lesson),
  });

  const title = useWatch({ control, name: "title" });
  const content = useWatch({ control, name: "content" });
  const codeLanguage = useWatch({ control, name: "code_language" });
  const isPublished = useWatch({ control, name: "is_published" });
  const materials = useWatch({ control, name: "materials" });

  useEffect(() => {
    if (!slugTouched) {
      setValue("slug", slugify(title || ""));
    }
  }, [title, slugTouched, setValue]);

  const insertAtCursor = (text: string) => {
    const el = contentRef.current;
    const current = content ?? "";
    if (!el) {
      setValue("content", `${current}\n${text}\n`);
      return;
    }
    const start = el.selectionStart ?? current.length;
    const end = el.selectionEnd ?? current.length;
    const next = `${current.slice(0, start)}${text}${current.slice(end)}`;
    setValue("content", next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + text.length;
      el.setSelectionRange(pos, pos);
    });
  };

  const handleImageUpload = async (file: File) => {
    if (!isAllowedImageFile(file)) {
      toast.error("Görsel PNG, JPEG veya WEBP olmalı ve 2MB'den küçük olmalı.");
      return;
    }
    setUploading(true);
    const supabase = createClient();
    const path = buildLessonMediaPath(file.name);
    const { error } = await supabase.storage
      .from(LESSON_MEDIA_BUCKET)
      .upload(path, file);
    setUploading(false);
    if (error) {
      toast.error("Görsel yüklenemedi.");
      return;
    }
    const { data } = supabase.storage.from(LESSON_MEDIA_BUCKET).getPublicUrl(path);
    insertAtCursor(`![](${data.publicUrl})`);
    toast.success("Görsel eklendi");
  };

  const addMaterial = () => {
    const value = materialInput.trim();
    if (!value) return;
    setValue("materials", [...materials, value]);
    setMaterialInput("");
  };

  const removeMaterial = (index: number) => {
    setValue(
      "materials",
      materials.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: LessonInput) => {
    setServerError(null);
    setSubmitting(true);
    const result = lesson
      ? await updateLesson(lesson.id, data)
      : await createLesson(data);
    setSubmitting(false);
    if (result?.error) {
      setServerError(result.error);
      return;
    }
    toast.success(lesson ? "Ders güncellendi" : "Ders oluşturuldu");
    if (!lesson && result.id) {
      router.push(`/ogretmen/dersler/${result.id}`);
      return;
    }
    router.refresh();
  };

  const { ref: contentFieldRef, ...contentField } = register("content");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-4 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          {lesson ? "Dersi Düzenle" : "Yeni Ders"}
        </h1>
        {previewPath && (
          <Button
            type="button"
            variant="outline"
            nativeButton={false}
            render={<Link href={previewPath} target="_blank" />}
          >
            Öğrenci gibi önizle
          </Button>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lesson-title">Başlık</Label>
          <Input id="lesson-title" {...register("title")} />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lesson-slug">Slug</Label>
          <Input
            id="lesson-slug"
            {...register("slug", { onChange: () => setSlugTouched(true) })}
          />
          {errors.slug && (
            <p className="text-sm text-destructive">{errors.slug.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="lesson-summary">Özet</Label>
        <Textarea id="lesson-summary" rows={2} {...register("summary")} />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label>Ders içeriği (Markdown)</Label>
          <label className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-primary">
            <ImagePlus className="h-4 w-4" />
            {uploading ? "Yükleniyor…" : "Görsel ekle"}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleImageUpload(file);
                }
                e.target.value = "";
              }}
            />
          </label>
        </div>
        <Tabs defaultValue="yaz">
          <TabsList>
            <TabsTrigger value="yaz">Yaz</TabsTrigger>
            <TabsTrigger value="onizle">Önizle</TabsTrigger>
          </TabsList>
          <TabsContent value="yaz">
            <Textarea
              id="lesson-content"
              rows={14}
              className="font-mono text-sm"
              {...contentField}
              ref={(el) => {
                contentFieldRef(el);
                contentRef.current = el;
              }}
            />
          </TabsContent>
          <TabsContent value="onizle" className="rounded-xl border p-4">
            <LessonContent content={content || "_Henüz içerik yok._"} />
          </TabsContent>
        </Tabs>
        {errors.content && (
          <p className="text-sm text-destructive">{errors.content.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label>Kod dili</Label>
          <Select
            value={codeLanguage}
            onValueChange={(value) =>
              setValue("code_language", value as LessonInput["code_language"])
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
        {codeLanguage !== "blocks" && (
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="lesson-example-code">Örnek kod</Label>
            <Textarea
              id="lesson-example-code"
              rows={6}
              className="font-mono text-sm"
              {...register("example_code")}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Malzemeler</Label>
        <div className="flex flex-col gap-1.5">
          {materials.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input value={item} readOnly className="bg-muted/50" />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => removeMaterial(index)}
                aria-label="Malzemeyi sil"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Input
            value={materialInput}
            onChange={(e) => setMaterialInput(e.target.value)}
            placeholder="Ör. 1 adet LED"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addMaterial();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={addMaterial}
            aria-label="Malzeme ekle"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lesson-tool-url">Araç linki</Label>
          <Input
            id="lesson-tool-url"
            placeholder="https://makecode.microbit.org/…"
            {...register("tool_url")}
          />
          {errors.tool_url && (
            <p className="text-sm text-destructive">{errors.tool_url.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lesson-tool-label">Araç buton etiketi</Label>
          <Input
            id="lesson-tool-label"
            placeholder="MakeCode'ta Aç"
            {...register("tool_label")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="lesson-video">YouTube linki</Label>
        <Input
          id="lesson-video"
          placeholder="https://youtu.be/…"
          {...register("video_url")}
        />
        {errors.video_url && (
          <p className="text-sm text-destructive">{errors.video_url.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lesson-minutes">Tahmini süre (dk)</Label>
          <Input
            id="lesson-minutes"
            type="number"
            min={1}
            {...register("estimated_minutes", { valueAsNumber: true })}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lesson-points">Puan</Label>
          <Input
            id="lesson-points"
            type="number"
            min={0}
            {...register("points", { valueAsNumber: true })}
          />
        </div>
        <div className="flex items-center justify-between rounded-xl border px-3 py-2.5 sm:mt-6">
          <Label htmlFor="lesson-published">Yayında</Label>
          <Switch
            id="lesson-published"
            checked={isPublished}
            onCheckedChange={(checked) => setValue("is_published", checked)}
          />
        </div>
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
        className="h-12 self-start rounded-2xl font-bold"
      >
        {submitting ? "Kaydediliyor…" : "Kaydet"}
      </Button>
    </form>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/lesson/CodeBlock";
import { LessonContent } from "@/components/lesson/LessonContent";
import { MaterialsBox } from "@/components/lesson/MaterialsBox";
import { ToolButton } from "@/components/lesson/ToolButton";
import { VideoEmbed } from "@/components/lesson/VideoEmbed";

export default async function DersPage({
  params,
}: {
  params: Promise<{ kurs: string; modul: string; ders: string }>;
}) {
  const { kurs, modul, ders } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("id, slug, title")
    .eq("slug", kurs)
    .maybeSingle();
  if (!course) {
    notFound();
  }

  const { data: moduleRow } = await supabase
    .from("modules")
    .select("id, slug, title")
    .eq("course_id", course.id)
    .eq("slug", modul)
    .eq("is_published", true)
    .maybeSingle();
  if (!moduleRow) {
    notFound();
  }

  const { data: lesson } = await supabase
    .from("lessons")
    .select("*")
    .eq("module_id", moduleRow.id)
    .eq("slug", ders)
    .eq("is_published", true)
    .maybeSingle();
  if (!lesson) {
    notFound();
  }

  const { data: siblings } = await supabase
    .from("lessons")
    .select("id, slug, title, order_index")
    .eq("module_id", moduleRow.id)
    .eq("is_published", true)
    .order("order_index", { ascending: true });

  const index = (siblings ?? []).findIndex((l) => l.id === lesson.id);
  const prev = index > 0 ? siblings![index - 1] : null;
  const next =
    siblings && index !== -1 && index < siblings.length - 1
      ? siblings[index + 1]
      : null;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 p-4 sm:p-6">
      <nav className="text-sm text-muted-foreground">
        <Link href={`/dersler/${course.slug}`} className="hover:underline">
          {course.title}
        </Link>
        {" › "}
        <span>{moduleRow.title}</span>
      </nav>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{lesson.estimated_minutes} dk</Badge>
        <Badge className="bg-badge text-badge-foreground">
          +{lesson.points} puan
        </Badge>
        {siblings && siblings.length > 0 && (
          <Badge variant="outline">
            Ders {index + 1} / {siblings.length}
          </Badge>
        )}
      </div>

      <h1 className="font-heading text-3xl font-bold text-foreground">
        {lesson.title}
      </h1>

      {lesson.materials.length > 0 && <MaterialsBox materials={lesson.materials} />}
      {lesson.video_url && <VideoEmbed url={lesson.video_url} />}

      <LessonContent content={lesson.content} />

      {lesson.code_language !== "blocks" && lesson.example_code && (
        <CodeBlock code={lesson.example_code} language={lesson.code_language} />
      )}

      {lesson.tool_url && lesson.tool_label && (
        <ToolButton url={lesson.tool_url} label={lesson.tool_label} />
      )}

      <Button
        size="lg"
        disabled
        className="mt-4 h-14 rounded-2xl text-base font-bold"
      >
        Tamamlandı ✓ (yakında)
      </Button>

      <div className="mt-2 flex items-center justify-between text-sm">
        {prev ? (
          <Link
            href={`/dersler/${course.slug}/${moduleRow.slug}/${prev.slug}`}
            className="font-medium text-primary hover:underline"
          >
            ← Önceki ders
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/dersler/${course.slug}/${moduleRow.slug}/${next.slug}`}
            className="font-medium text-primary hover:underline"
          >
            Sonraki ders →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

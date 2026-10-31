import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/lesson/CodeBlock";
import { CompleteButton } from "@/components/lesson/CompleteButton";
import { LessonContent } from "@/components/lesson/LessonContent";
import { LessonLockScreen } from "@/components/lesson/LessonLockScreen";
import { MaterialsBox } from "@/components/lesson/MaterialsBox";
import { ScrollPositionTracker } from "@/components/lesson/ScrollPositionTracker";
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
    .select("id, slug, title, is_sequential")
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

  const profile = await getCurrentProfile();
  const isStudent = profile?.role === "student";

  const progressMap = new Map<string, "in_progress" | "completed">();
  if (isStudent && siblings && siblings.length > 0) {
    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("lesson_id, status")
      .eq("student_id", profile!.id)
      .in(
        "lesson_id",
        siblings.map((s) => s.id)
      );
    for (const row of progress ?? []) {
      progressMap.set(row.lesson_id, row.status);
    }
  }

  const blockingLesson =
    isStudent && moduleRow.is_sequential
      ? (siblings ?? []).find(
          (s) => s.order_index < lesson.order_index && progressMap.get(s.id) !== "completed"
        )
      : undefined;

  if (blockingLesson) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 p-4 sm:p-6">
        <nav className="text-sm text-muted-foreground">
          <Link href={`/dersler/${course.slug}`} className="hover:underline">
            {course.title}
          </Link>
          {" › "}
          <span>{moduleRow.title}</span>
        </nav>
        <LessonLockScreen
          blockingLessonTitle={blockingLesson.title}
          blockingLessonHref={`/dersler/${course.slug}/${moduleRow.slug}/${blockingLesson.slug}`}
        />
      </div>
    );
  }

  if (isStudent) {
    await supabase.rpc("mark_lesson_viewed", { p_lesson_id: lesson.id });
  }

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

      {isStudent ? (
        <CompleteButton
          lessonId={lesson.id}
          initiallyCompleted={progressMap.get(lesson.id) === "completed"}
          initialPoints={profile!.total_points}
        />
      ) : (
        <p className="mt-4 rounded-2xl bg-muted px-4 py-3 text-center text-sm text-muted-foreground">
          Bu bir önizleme — tamamlama öğrenciler içindir.
        </p>
      )}

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

      {isStudent && <ScrollPositionTracker lessonId={lesson.id} />}
    </div>
  );
}

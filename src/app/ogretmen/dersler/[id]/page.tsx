import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LessonEditor } from "@/components/teacher/LessonEditor";
import { QuizEditor } from "@/components/teacher/QuizEditor";

export default async function DersDuzenlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: lesson } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!lesson) {
    notFound();
  }

  const { data: moduleRow } = await supabase
    .from("modules")
    .select("slug, courses(slug)")
    .eq("id", lesson.module_id)
    .maybeSingle();

  const previewPath = moduleRow?.courses
    ? `/dersler/${moduleRow.courses.slug}/${moduleRow.slug}/${lesson.slug}`
    : undefined;

  const { data: quizQuestions } = await supabase
    .from("lesson_quiz_questions")
    .select("*")
    .eq("lesson_id", lesson.id)
    .order("order_index", { ascending: true });

  return (
    <>
      <LessonEditor
        moduleId={lesson.module_id}
        lesson={lesson}
        previewPath={previewPath}
      />
      <div className="p-4 sm:p-6">
        <QuizEditor lessonId={lesson.id} questions={quizQuestions ?? []} />
      </div>
    </>
  );
}

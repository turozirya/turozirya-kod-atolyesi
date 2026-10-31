import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import { Progress } from "@/components/ui/progress";
import { LessonNode, type LessonNodeStatus } from "@/components/lesson/LessonNode";
import { getModuleColorClasses } from "@/lib/module-colors";
import { getIconComponent } from "@/lib/icons";
import { cn } from "@/lib/utils";

export default async function KursPage({
  params,
}: {
  params: Promise<{ kurs: string }>;
}) {
  const { kurs } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("id, slug, title, description")
    .eq("slug", kurs)
    .maybeSingle();

  if (!course) {
    notFound();
  }

  const { data: modules } = await supabase
    .from("modules")
    .select("id, slug, title, description, icon, color, order_index, is_sequential")
    .eq("course_id", course.id)
    .eq("is_published", true)
    .order("order_index", { ascending: true });

  const moduleIds = (modules ?? []).map((m) => m.id);
  const { data: lessons } = moduleIds.length
    ? await supabase
        .from("lessons")
        .select("id, slug, title, module_id, estimated_minutes, points, order_index")
        .in("module_id", moduleIds)
        .eq("is_published", true)
        .order("order_index", { ascending: true })
    : { data: [] as never[] };

  const lessonsByModule = new Map<string, typeof lessons>();
  for (const lesson of lessons ?? []) {
    const list = lessonsByModule.get(lesson.module_id) ?? [];
    list.push(lesson);
    lessonsByModule.set(lesson.module_id, list);
  }

  const profile = await getCurrentProfile();
  const isStudent = profile?.role === "student";

  const progressMap = new Map<string, "in_progress" | "completed">();
  if (isStudent && lessons && lessons.length > 0) {
    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("lesson_id, status")
      .eq("student_id", profile!.id)
      .in("lesson_id", lessons.map((l) => l.id));
    for (const row of progress ?? []) {
      progressMap.set(row.lesson_id, row.status);
    }
  }

  // Haritada parlayacak "sıradaki" ders: kurs sırasına göre ilk tamamlanmamış
  // ders. Sıralı modüllerde ondan önceki her ders zaten tamamlanmış olacağı
  // için bu ders hiçbir zaman kilitli olamaz.
  let highlightLessonId: string | null = null;
  for (const mod of modules ?? []) {
    const modLessons = lessonsByModule.get(mod.id) ?? [];
    const firstIncomplete = modLessons.find(
      (lesson) => progressMap.get(lesson.id) !== "completed"
    );
    if (firstIncomplete) {
      highlightLessonId = firstIncomplete.id;
      break;
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          {course.title}
        </h1>
        {course.description && (
          <p className="mt-1 text-muted-foreground">{course.description}</p>
        )}
      </div>

      {(!modules || modules.length === 0) && (
        <p className="text-muted-foreground">
          Bu kursta henüz yayınlanmış modül yok.
        </p>
      )}

      <div className="flex flex-col gap-8">
        {modules?.map((mod) => {
          const colors = getModuleColorClasses(mod.color);
          const Icon = getIconComponent(mod.icon);
          const modLessons = lessonsByModule.get(mod.id) ?? [];
          const completedCount = modLessons.filter(
            (l) => progressMap.get(l.id) === "completed"
          ).length;

          let priorIncomplete = false;

          return (
            <section key={mod.id} className="flex flex-col gap-3">
              <div
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3",
                  colors.bgSoft
                )}
              >
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl text-white",
                    colors.bg
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <h2 className={cn("font-heading text-base font-bold", colors.text)}>
                    {mod.title}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {completedCount}/{modLessons.length} ders
                  </p>
                </div>
                {modLessons.length > 0 && (
                  <Progress
                    value={(completedCount / modLessons.length) * 100}
                    className="h-2 w-20"
                  />
                )}
              </div>

              <div className="flex flex-col pl-1">
                {modLessons.map((lesson, idx) => {
                  const progressStatus = progressMap.get(lesson.id);
                  let status: LessonNodeStatus;
                  if (progressStatus === "completed") {
                    status = "completed";
                  } else if (isStudent && mod.is_sequential && priorIncomplete) {
                    status = "locked";
                  } else {
                    status = progressStatus === "in_progress" ? "in_progress" : "start";
                  }
                  if (status !== "completed" && mod.is_sequential) {
                    priorIncomplete = true;
                  }

                  return (
                    <LessonNode
                      key={lesson.id}
                      title={lesson.title}
                      href={`/dersler/${course.slug}/${mod.slug}/${lesson.slug}`}
                      status={status}
                      highlighted={lesson.id === highlightLessonId}
                      color={mod.color}
                      durationMinutes={lesson.estimated_minutes}
                      points={lesson.points}
                      isLast={idx === modLessons.length - 1}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
    .select("id, slug, title, description, icon, color, order_index")
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

      <div className="flex flex-col gap-6">
        {modules?.map((module) => {
          const colors = getModuleColorClasses(module.color);
          const Icon = getIconComponent(module.icon);
          const moduleLessons = lessonsByModule.get(module.id) ?? [];
          return (
            <section key={module.id} className="flex flex-col gap-3">
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
                <div>
                  <h2 className={cn("font-heading text-base font-bold", colors.text)}>
                    {module.title}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {moduleLessons.length} ders
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {moduleLessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/dersler/${course.slug}/${module.slug}/${lesson.slug}`}
                  >
                    <Card className="flex flex-row items-center justify-between gap-3 rounded-2xl p-4 shadow-sm transition-transform hover:scale-[1.005]">
                      <span className="font-medium text-foreground">
                        {lesson.title}
                      </span>
                      <div className="flex shrink-0 items-center gap-2">
                        <Badge variant="secondary">{lesson.estimated_minutes} dk</Badge>
                        <Badge className="bg-badge text-badge-foreground">
                          +{lesson.points}
                        </Badge>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import { getCurrentStreak } from "@/lib/gamification/streak";
import { BadgeDetailTrigger } from "@/components/gamification/BadgeDetailDialog";

export default async function RozetlerPage() {
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  const { data: badgesData } = await supabase
    .from("badges")
    .select("*")
    .order("order_index", { ascending: true });
  const badges = badgesData ?? [];

  const earnedMap = new Map<string, string>();
  let totalPoints = 0;
  let completedLessons = 0;
  let currentStreak = 0;

  if (profile) {
    totalPoints = profile.total_points;

    const [{ data: earned }, { count: lessonCount }, { data: days }] = await Promise.all([
      supabase.from("student_badges").select("badge_id, earned_at").eq("student_id", profile.id),
      supabase
        .from("lesson_progress")
        .select("*", { count: "exact", head: true })
        .eq("student_id", profile.id)
        .eq("status", "completed"),
      supabase
        .from("activity_days")
        .select("day")
        .eq("student_id", profile.id)
        .order("day", { ascending: false })
        .limit(400),
    ]);

    for (const row of earned ?? []) earnedMap.set(row.badge_id, row.earned_at);
    completedLessons = lessonCount ?? 0;
    currentStreak = getCurrentStreak((days ?? []).map((d) => d.day));
  }

  const moduleIds = badges
    .filter((b) => b.criteria === "module_completed" && b.module_id)
    .map((b) => b.module_id as string);
  const courseIds = badges
    .filter((b) => b.criteria === "course_completed" && b.course_id)
    .map((b) => b.course_id as string);

  const moduleProgress = new Map<string, { total: number; completed: number }>();
  const courseProgress = new Map<string, { total: number; completed: number }>();

  if (moduleIds.length > 0 || courseIds.length > 0) {
    const { data: lessons } = await supabase
      .from("lessons")
      .select("id, module_id, modules(course_id)")
      .eq("is_published", true);

    const completedLessonIds = new Set<string>();
    if (profile && lessons && lessons.length > 0) {
      const { data: progress } = await supabase
        .from("lesson_progress")
        .select("lesson_id")
        .eq("student_id", profile.id)
        .eq("status", "completed")
        .in(
          "lesson_id",
          lessons.map((l) => l.id)
        );
      for (const p of progress ?? []) completedLessonIds.add(p.lesson_id);
    }

    for (const moduleId of moduleIds) {
      const moduleLessons = (lessons ?? []).filter((l) => l.module_id === moduleId);
      moduleProgress.set(moduleId, {
        total: moduleLessons.length,
        completed: moduleLessons.filter((l) => completedLessonIds.has(l.id)).length,
      });
    }

    for (const courseId of courseIds) {
      const courseLessons = (lessons ?? []).filter((l) => l.modules?.course_id === courseId);
      courseProgress.set(courseId, {
        total: courseLessons.length,
        completed: courseLessons.filter((l) => completedLessonIds.has(l.id)).length,
      });
    }
  }

  function progressLabel(badge: (typeof badges)[number]): string | undefined {
    switch (badge.criteria) {
      case "lessons_completed":
        return `${completedLessons}/${badge.criteria_value} ders`;
      case "points_total":
        return `${totalPoints}/${badge.criteria_value} puan`;
      case "streak_days":
        return `${currentStreak}/${badge.criteria_value} gün`;
      case "module_completed": {
        const progress = badge.module_id ? moduleProgress.get(badge.module_id) : undefined;
        return progress ? `${progress.completed}/${progress.total} ders` : undefined;
      }
      case "course_completed": {
        const progress = badge.course_id ? courseProgress.get(badge.course_id) : undefined;
        return progress ? `${progress.completed}/${progress.total} ders` : undefined;
      }
      default:
        return undefined;
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-bold text-foreground">Rozetlerin</h1>
        <p className="text-muted-foreground">
          {earnedMap.size}/{badges.length} rozet kazandın.
        </p>
      </div>

      {badges.length === 0 ? (
        <p className="text-center text-muted-foreground">Henüz rozet tanımlanmamış.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {badges.map((badge) => {
            const earned = earnedMap.has(badge.id);
            return (
              <BadgeDetailTrigger
                key={badge.id}
                badge={badge}
                earned={earned}
                earnedAt={earnedMap.get(badge.id)}
                progressLabel={earned ? undefined : progressLabel(badge)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

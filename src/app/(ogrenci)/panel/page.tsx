import Link from "next/link";
import { Flame, Megaphone, PartyPopper, Sparkles, Target } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getIconComponent } from "@/lib/icons";
import { getModuleColorClasses } from "@/lib/module-colors";
import { cn } from "@/lib/utils";
import { LevelBar } from "@/components/gamification/LevelBar";
import { UnseenBadgesDialog } from "@/components/gamification/UnseenBadgesDialog";
import { getCurrentStreak } from "@/lib/gamification/streak";
import type { Json } from "@/types/database";

type ResumeTarget =
  | { all_done: true; course_slug: string; course_title: string }
  | {
      all_done: false;
      course_slug: string;
      course_title: string;
      module_slug: string;
      lesson_slug: string;
      lesson_title: string;
    }
  | null;

type StudentCourse = {
  id: string;
  slug: string;
  title: string;
  icon: string;
  color: string;
  total_lessons: number;
  completed_lessons: number;
  percent: number;
  resume: ResumeTarget;
};

function parseResumeTarget(value: Json | undefined): ResumeTarget {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  return value as unknown as ResumeTarget;
}

function parseStudentCourses(value: Json | null): StudentCourse[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value as unknown as StudentCourse[];
}

type WeeklyProgress = { goal: number; completed: number } | null;

function parseWeeklyProgress(value: Json | undefined): WeeklyProgress {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  return value as unknown as WeeklyProgress;
}

export default async function PanelPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const finishedCourseSlug =
    typeof params["kurs-bitti"] === "string" ? params["kurs-bitti"] : null;

  const profile = await getCurrentProfile();
  const supabase = await createClient();

  const { data: resumeData } = await supabase.rpc("get_resume_target");
  const resume = parseResumeTarget(resumeData);

  const { data: coursesData } = await supabase.rpc("get_student_courses");
  const courses = parseStudentCourses(coursesData);

  let weeklyProgress: WeeklyProgress = null;
  let announcements: { id: string; title: string; content: string; created_at: string }[] = [];
  if (profile?.role === "student") {
    const { data: progressData } = await supabase.rpc("get_class_weekly_progress");
    weeklyProgress = parseWeeklyProgress(progressData);

    if (profile.class_id) {
      const { data: announcementRows } = await supabase
        .from("announcements")
        .select("id, title, content, created_at")
        .eq("class_id", profile.class_id)
        .order("created_at", { ascending: false })
        .limit(3);
      announcements = announcementRows ?? [];
    }
  }

  let finishedCourseTitle: string | null = null;
  if (finishedCourseSlug) {
    const { data: finishedCourse } = await supabase
      .from("courses")
      .select("title")
      .eq("slug", finishedCourseSlug)
      .maybeSingle();
    finishedCourseTitle = finishedCourse?.title ?? null;
  }

  const { data: recentLessons } = profile
    ? await supabase
        .from("lesson_progress")
        .select(
          "completed_at, lessons(title, slug, modules(title, slug, courses(title, slug)))"
        )
        .eq("student_id", profile.id)
        .eq("status", "completed")
        .order("completed_at", { ascending: false })
        .limit(3)
    : { data: null };

  let streak = 0;
  let unseenBadges: { code: string; name: string; description: string; icon: string; color: string }[] = [];
  if (profile?.role === "student") {
    const { data: days } = await supabase
      .from("activity_days")
      .select("day")
      .eq("student_id", profile.id)
      .order("day", { ascending: false })
      .limit(400);
    streak = getCurrentStreak((days ?? []).map((d) => d.day));

    const { data: unseen } = await supabase
      .from("student_badges")
      .select("badges(code, name, description, icon, color)")
      .eq("student_id", profile.id)
      .eq("seen", false);
    unseenBadges = (unseen ?? []).flatMap((row) => (row.badges ? [row.badges] : []));
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Merhaba, {profile?.display_name}!
      </h1>

      {announcements.length > 0 && (
        <div className="flex flex-col gap-2">
          {announcements.map((a) => (
            <Card
              key={a.id}
              className="flex flex-col gap-1 rounded-2xl border-2 border-primary bg-primary/10 p-4"
            >
              <span className="flex items-center gap-1.5 font-bold text-foreground">
                <Megaphone className="h-4 w-4" aria-hidden />
                {a.title}
              </span>
              <p className="text-sm text-foreground">{a.content}</p>
              <span className="text-xs text-muted-foreground">
                {new Date(a.created_at).toLocaleDateString("tr-TR")}
              </span>
            </Card>
          ))}
        </div>
      )}

      {profile?.role === "student" && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <LevelBar points={profile.total_points} className="flex-1" />
          {streak > 0 && (
            <Card className="flex items-center gap-2 rounded-2xl border-2 border-orange-300 bg-orange-100 px-4 py-3 text-orange-700">
              <Flame className="h-5 w-5" aria-hidden />
              <span className="font-bold">{streak} günlük seri</span>
            </Card>
          )}
        </div>
      )}

      {weeklyProgress && (
        <Card className="flex flex-col gap-2 rounded-2xl border-2 border-accent bg-accent/10 p-4 text-foreground">
          <span className="flex items-center gap-1.5 font-bold">
            <Target className="h-4 w-4" aria-hidden />
            Bu hafta sınıfça {weeklyProgress.completed}/{weeklyProgress.goal} ders tamamlandı!
          </span>
          <Progress
            value={Math.min(100, (weeklyProgress.completed / weeklyProgress.goal) * 100)}
            className="h-2"
          />
        </Card>
      )}

      {unseenBadges.length > 0 && <UnseenBadgesDialog badges={unseenBadges} />}

      {finishedCourseTitle && (
        <Card className="flex items-center gap-3 rounded-2xl border-2 border-badge bg-badge/10 p-4">
          <PartyPopper className="h-6 w-6 text-foreground" />
          <p className="font-medium text-foreground">
            {finishedCourseTitle} kursunu bitirdin! 🎉
          </p>
        </Card>
      )}

      {resume && !resume.all_done && (
        <Link href={`/dersler/${resume.course_slug}/${resume.module_slug}/${resume.lesson_slug}`}>
          <Card className="flex flex-col gap-2 rounded-2xl border-2 border-accent bg-accent/10 p-6 shadow-sm transition-transform hover:scale-[1.005]">
            <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Sparkles className="h-4 w-4" /> {resume.course_title}
            </span>
            <span className="font-heading text-2xl font-bold text-foreground">
              Devam Et → {resume.lesson_title}
            </span>
          </Card>
        </Link>
      )}

      {!resume && courses.length === 0 && (
        <Card className="rounded-2xl p-6 text-center text-muted-foreground">
          Henüz bir kursun yok — öğretmenin seni bir kursa atadığında burada görünecek.
        </Card>
      )}

      {courses.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const colors = getModuleColorClasses(course.color);
            const Icon = getIconComponent(course.icon);
            const href =
              course.resume && !course.resume.all_done
                ? `/dersler/${course.resume.course_slug}/${course.resume.module_slug}/${course.resume.lesson_slug}`
                : `/dersler/${course.slug}`;
            return (
              <Card
                key={course.id}
                className={cn(
                  "flex flex-col gap-3 rounded-2xl border-2 p-5 shadow-sm",
                  colors.border
                )}
              >
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl text-white",
                    colors.bg
                  )}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="font-heading text-lg font-bold text-foreground">
                  {course.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {course.completed_lessons}/{course.total_lessons} ders
                </p>
                <Progress value={course.percent} className="h-2" />
                <Button
                  nativeButton={false}
                  render={<Link href={href} />}
                  className="h-11 rounded-2xl font-bold"
                >
                  Devam Et
                </Button>
              </Card>
            );
          })}
        </div>
      )}

      {recentLessons && recentLessons.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-lg font-bold text-foreground">
            Son tamamladıkların
          </h2>
          <div className="flex flex-col gap-2">
            {recentLessons.map((entry, i) => {
              const lesson = entry.lessons;
              const lessonModule = lesson?.modules;
              const course = lessonModule?.courses;
              if (!lesson || !lessonModule || !course) return null;
              return (
                <Link
                  key={i}
                  href={`/dersler/${course.slug}/${lessonModule.slug}/${lesson.slug}`}
                >
                  <Card className="flex flex-row items-center justify-between gap-3 rounded-2xl p-3 text-sm shadow-sm">
                    <span className="font-medium text-foreground">{lesson.title}</span>
                    <span className="text-muted-foreground">{course.title}</span>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

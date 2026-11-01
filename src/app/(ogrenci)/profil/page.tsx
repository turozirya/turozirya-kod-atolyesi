import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import { Card } from "@/components/ui/card";
import { LevelBar } from "@/components/gamification/LevelBar";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { longestStreak } from "@/lib/gamification/streak";
import type { Json } from "@/types/database";

const REASON_LABELS: Record<string, string> = {
  lesson_completed: "Ders tamamlama",
  module_bonus: "Modül bonusu",
  course_bonus: "Kurs bonusu",
  badge_bonus: "Rozet bonusu",
  teacher_bonus: "Öğretmen bonusu",
};

type StudentCourse = { title: string; percent: number };

function parseStudentCourses(value: Json | null): StudentCourse[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const { title, percent } = item as Record<string, Json | undefined>;
    if (typeof title === "string" && typeof percent === "number") {
      return [{ title, percent }];
    }
    return [];
  });
}

export default async function ProfilPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/giris");

  const supabase = await createClient();

  const [{ data: coursesData }, { count: lessonCount }, { count: badgeCount }, { data: days }, { data: pointEvents }] =
    await Promise.all([
      supabase.rpc("get_student_courses"),
      supabase
        .from("lesson_progress")
        .select("*", { count: "exact", head: true })
        .eq("student_id", profile.id)
        .eq("status", "completed"),
      supabase
        .from("student_badges")
        .select("*", { count: "exact", head: true })
        .eq("student_id", profile.id),
      supabase.from("activity_days").select("day").eq("student_id", profile.id),
      supabase
        .from("point_events")
        .select("amount, reason, created_at")
        .eq("student_id", profile.id)
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

  const courses = parseStudentCourses(coursesData);
  const longest = longestStreak((days ?? []).map((d) => d.day));

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-4 sm:p-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">Profilin</h1>

      <LevelBar points={profile.total_points} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="flex flex-col items-center gap-1 rounded-2xl p-4 text-center">
          <span className="font-heading text-2xl font-bold text-foreground">
            {lessonCount ?? 0}
          </span>
          <span className="text-xs text-muted-foreground">Tamamlanan ders</span>
        </Card>
        <Card className="flex flex-col items-center gap-1 rounded-2xl p-4 text-center">
          <span className="font-heading text-2xl font-bold text-foreground">
            {badgeCount ?? 0}
          </span>
          <span className="text-xs text-muted-foreground">Rozet</span>
        </Card>
        <Card className="flex flex-col items-center gap-1 rounded-2xl p-4 text-center">
          <span className="font-heading text-2xl font-bold text-foreground">
            {longest}
          </span>
          <span className="text-xs text-muted-foreground">En uzun seri (gün)</span>
        </Card>
        <Card className="flex flex-col items-center gap-1 rounded-2xl p-4 text-center">
          <span className="font-heading text-2xl font-bold text-foreground">
            {profile.total_points}
          </span>
          <span className="text-xs text-muted-foreground">Toplam puan</span>
        </Card>
      </div>

      {courses.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-lg font-bold text-foreground">Kurs ilerlemen</h2>
          {courses.map((course) => (
            <Card key={course.title} className="flex items-center justify-between gap-3 rounded-2xl p-3 text-sm">
              <span className="font-medium text-foreground">{course.title}</span>
              <span className="text-muted-foreground">%{course.percent}</span>
            </Card>
          ))}
        </div>
      )}

      {pointEvents && pointEvents.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-lg font-bold text-foreground">Son puan hareketleri</h2>
          {pointEvents.map((event, i) => (
            <Card key={i} className="flex items-center justify-between gap-3 rounded-2xl p-3 text-sm">
              <span className="text-foreground">{REASON_LABELS[event.reason] ?? event.reason}</span>
              <span className="font-bold text-foreground">+{event.amount}</span>
            </Card>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-bold text-foreground">Ayarlar</h2>
        <ProfileEditForm displayName={profile.display_name} avatar={profile.avatar} />
      </div>
    </div>
  );
}

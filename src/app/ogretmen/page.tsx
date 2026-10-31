import Link from "next/link";
import { BookOpen, Users, CheckCircle2, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/session";
import { Card } from "@/components/ui/card";
import { WeeklyBarChart } from "@/components/teacher/WeeklyBarChart";

const ISTANBUL_DATE_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Istanbul",
});

function istanbulDateString(date: Date): string {
  return ISTANBUL_DATE_FORMATTER.format(date);
}

function startOfIstanbulWeek(now: Date): Date {
  const todayStr = istanbulDateString(now);
  const today = new Date(`${todayStr}T00:00:00+03:00`);
  const dayIndex = (today.getDay() + 6) % 7; // Pazartesi=0
  today.setDate(today.getDate() - dayIndex);
  return today;
}

export default async function OgretmenAnaSayfa() {
  const profile = await requireRole("teacher");
  const supabase = await createClient();

  const { data: classes } = await supabase
    .from("classes")
    .select("id, name")
    .eq("teacher_id", profile.id);
  const classIds = (classes ?? []).map((c) => c.id);

  const { data: studentRows } = await supabase
    .from("profiles")
    .select("id")
    .eq("role", "student")
    .in("class_id", classIds.length > 0 ? classIds : ["00000000-0000-0000-0000-000000000000"]);
  const studentIds = (studentRows ?? []).map((s) => s.id);

  const now = new Date();
  const weekStart = startOfIstanbulWeek(now);
  const sevenDaysAgo = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);

  let completedThisWeek = 0;
  let last7Days: { date: string; count: number }[] = [];
  let mostStuckLesson: { title: string; count: number } | null = null;
  let inactiveStudents: { display_name: string; lastActive: string | null }[] = [];

  if (studentIds.length > 0) {
    const { count } = await supabase
      .from("lesson_progress")
      .select("*", { count: "exact", head: true })
      .in("student_id", studentIds)
      .eq("status", "completed")
      .gte("completed_at", weekStart.toISOString());
    completedThisWeek = count ?? 0;

    const { data: recentCompletions } = await supabase
      .from("lesson_progress")
      .select("completed_at")
      .in("student_id", studentIds)
      .eq("status", "completed")
      .gte("completed_at", new Date(`${istanbulDateString(sevenDaysAgo)}T00:00:00+03:00`).toISOString());

    const countByDay = new Map<string, number>();
    for (const row of recentCompletions ?? []) {
      if (!row.completed_at) continue;
      const day = istanbulDateString(new Date(row.completed_at));
      countByDay.set(day, (countByDay.get(day) ?? 0) + 1);
    }
    last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(sevenDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
      const key = istanbulDateString(d);
      return { date: key, count: countByDay.get(key) ?? 0 };
    });

    const { data: inProgressRows } = await supabase
      .from("lesson_progress")
      .select("lesson_id, lessons(title)")
      .in("student_id", studentIds)
      .eq("status", "in_progress");
    const stuckCounts = new Map<string, { title: string; count: number }>();
    for (const row of inProgressRows ?? []) {
      if (!row.lessons) continue;
      const entry = stuckCounts.get(row.lesson_id) ?? { title: row.lessons.title, count: 0 };
      entry.count++;
      stuckCounts.set(row.lesson_id, entry);
    }
    mostStuckLesson =
      [...stuckCounts.values()].sort((a, b) => b.count - a.count)[0] ?? null;

    const { data: students } = await supabase
      .from("profiles")
      .select("id, display_name")
      .in("id", studentIds);
    const { data: allProgress } = await supabase
      .from("lesson_progress")
      .select("student_id, last_viewed_at")
      .in("student_id", studentIds);
    const lastActiveByStudent = new Map<string, string>();
    for (const row of allProgress ?? []) {
      const current = lastActiveByStudent.get(row.student_id);
      if (!current || row.last_viewed_at > current) {
        lastActiveByStudent.set(row.student_id, row.last_viewed_at);
      }
    }
    const sevenDaysAgoIso = sevenDaysAgo.toISOString();
    inactiveStudents = (students ?? [])
      .map((s) => ({ display_name: s.display_name, lastActive: lastActiveByStudent.get(s.id) ?? null }))
      .filter((s) => !s.lastActive || s.lastActive < sevenDaysAgoIso);
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Merhaba, {profile.display_name}!
      </h1>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="flex flex-col items-center gap-1 rounded-2xl p-4 text-center">
          <Users className="h-5 w-5 text-primary" />
          <span className="font-heading text-2xl font-bold text-foreground">
            {classes?.length ?? 0}
          </span>
          <span className="text-xs text-muted-foreground">Sınıf</span>
        </Card>
        <Card className="flex flex-col items-center gap-1 rounded-2xl p-4 text-center">
          <Users className="h-5 w-5 text-primary" />
          <span className="font-heading text-2xl font-bold text-foreground">
            {studentIds.length}
          </span>
          <span className="text-xs text-muted-foreground">Öğrenci</span>
        </Card>
        <Card className="flex flex-col items-center gap-1 rounded-2xl p-4 text-center">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <span className="font-heading text-2xl font-bold text-foreground">
            {completedThisWeek}
          </span>
          <span className="text-xs text-muted-foreground">Bu hafta tamamlanan ders</span>
        </Card>
        <Card className="flex flex-col items-center gap-1 rounded-2xl p-4 text-center">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          <span className="font-heading text-2xl font-bold text-foreground">
            {inactiveStudents.length}
          </span>
          <span className="text-xs text-muted-foreground">7 gündür girmeyen</span>
        </Card>
      </div>

      <Card className="flex flex-col gap-3 rounded-2xl p-5">
        <h2 className="font-heading text-lg font-bold text-foreground">Son 7 gün</h2>
        {last7Days.length > 0 ? (
          <WeeklyBarChart data={last7Days} />
        ) : (
          <p className="text-sm text-muted-foreground">Henüz veri yok.</p>
        )}
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="flex flex-col gap-2 rounded-2xl p-5">
          <h2 className="flex items-center gap-1.5 font-heading text-lg font-bold text-foreground">
            <BookOpen className="h-5 w-5" /> En çok takılınan ders
          </h2>
          {mostStuckLesson ? (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{mostStuckLesson.title}</span> —{" "}
              {mostStuckLesson.count} öğrenci devam ediyor
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Şu an takılan öğrenci yok.</p>
          )}
        </Card>

        <Card className="flex flex-col gap-2 rounded-2xl p-5">
          <h2 className="font-heading text-lg font-bold text-foreground">7 gündür girmeyenler</h2>
          {inactiveStudents.length === 0 ? (
            <p className="text-sm text-muted-foreground">Herkes aktif! 🎉</p>
          ) : (
            <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
              {inactiveStudents.slice(0, 8).map((s) => (
                <li key={s.display_name}>{s.display_name}</li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {(classes?.length ?? 0) === 0 && (
        <p className="text-muted-foreground">
          Henüz hiç sınıfın yok —{" "}
          <Link href="/ogretmen/siniflar" className="font-medium text-primary hover:underline">
            ilk sınıfını oluştur
          </Link>
          .
        </p>
      )}
    </div>
  );
}

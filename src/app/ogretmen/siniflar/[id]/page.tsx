import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Gift, KeyRound, LogOut, Megaphone, Plus, Target, Trash2, UserPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ClassCourseCheckbox } from "@/components/teacher/ClassCourseCheckbox";
import { ClassDialog } from "@/components/teacher/ClassDialog";
import { ResetPasswordDialog } from "@/components/teacher/ResetPasswordDialog";
import { MoveClassDialog } from "@/components/teacher/MoveClassDialog";
import { BonusPointsDialog } from "@/components/teacher/BonusPointsDialog";
import { AnnouncementDialog } from "@/components/teacher/AnnouncementDialog";
import { ConfirmDeleteDialog } from "@/components/teacher/ConfirmDeleteDialog";
import { moveStudentClass } from "@/actions/students";
import { deleteAnnouncement } from "@/actions/announcements";
import { getLevel } from "@/lib/gamification/levels";
import { getWeekStartIso } from "@/lib/week";

export default async function OgretmenSinifDetayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await requireRole("teacher");
  const supabase = await createClient();

  const { data: klass } = await supabase
    .from("classes")
    .select("*")
    .eq("id", id)
    .eq("teacher_id", profile.id)
    .maybeSingle();
  if (!klass) {
    notFound();
  }

  const [
    { data: courses },
    { data: assignedRows },
    { data: otherClasses },
    { data: students },
    { data: announcements },
  ] = await Promise.all([
    supabase.from("courses").select("id, title").order("order_index", { ascending: true }),
    supabase.from("class_courses").select("course_id").eq("class_id", id),
    supabase
      .from("classes")
      .select("id, name")
      .eq("teacher_id", profile.id)
      .neq("id", id)
      .order("name", { ascending: true }),
    supabase
      .from("profiles")
      .select("id, username, display_name, avatar, total_points")
      .eq("class_id", id)
      .eq("role", "student")
      .order("display_name", { ascending: true }),
    supabase
      .from("announcements")
      .select("id, title, content, created_at")
      .eq("class_id", id)
      .order("created_at", { ascending: false }),
  ]);

  const assignedCourseIds = new Set((assignedRows ?? []).map((r) => r.course_id));
  const studentIds = (students ?? []).map((s) => s.id);

  let completedThisWeek = 0;
  if (klass.weekly_goal && studentIds.length > 0) {
    const { count } = await supabase
      .from("point_events")
      .select("id", { count: "exact", head: true })
      .in("student_id", studentIds)
      .eq("reason", "lesson_completed")
      .gte("created_at", getWeekStartIso());
    completedThisWeek = count ?? 0;
  }

  const { data: progressRows } =
    studentIds.length > 0
      ? await supabase
          .from("lesson_progress")
          .select("student_id, status, last_viewed_at")
          .in("student_id", studentIds)
      : { data: [] };

  const completedByStudent = new Map<string, number>();
  const lastActiveByStudent = new Map<string, string>();
  for (const row of progressRows ?? []) {
    if (row.status === "completed") {
      completedByStudent.set(row.student_id, (completedByStudent.get(row.student_id) ?? 0) + 1);
    }
    const current = lastActiveByStudent.get(row.student_id);
    if (!current || row.last_viewed_at > current) {
      lastActiveByStudent.set(row.student_id, row.last_viewed_at);
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <div>
        <Link href="/ogretmen/siniflar" className="text-sm text-muted-foreground hover:underline">
          ← Sınıflar
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="font-heading text-2xl font-bold text-foreground">{klass.name}</h1>
          <ClassDialog
            klass={klass}
            trigger={
              <Button variant="outline" size="sm">
                Sınıfı Düzenle
              </Button>
            }
          />
        </div>
      </div>

      {klass.weekly_goal && (
        <Card className="flex flex-col gap-2 rounded-2xl border-2 border-accent bg-accent/10 p-4 text-foreground">
          <span className="flex items-center gap-1.5 font-bold">
            <Target className="h-4 w-4" aria-hidden />
            Bu hafta {completedThisWeek}/{klass.weekly_goal} ders tamamlandı
          </span>
          <Progress
            value={Math.min(100, (completedThisWeek / klass.weekly_goal) * 100)}
            className="h-2"
          />
        </Card>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-foreground">Duyurular</h2>
          <AnnouncementDialog
            classId={id}
            trigger={
              <Button size="sm" className="gap-1.5">
                <Megaphone className="h-4 w-4" />
                Yeni Duyuru
              </Button>
            }
          />
        </div>
        {(!announcements || announcements.length === 0) && (
          <p className="text-muted-foreground">Henüz duyuru yok.</p>
        )}
        <div className="flex flex-col gap-2">
          {announcements?.map((a) => (
            <Card key={a.id} className="flex flex-col gap-1 rounded-2xl p-3">
              <div className="flex items-start justify-between gap-2">
                <span className="font-medium text-foreground">{a.title}</span>
                <ConfirmDeleteDialog
                  trigger={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Duyuruyu sil"
                      title="Duyuruyu sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  }
                  title="Duyuru silinsin mi?"
                  description="Bu duyuru öğrencilerin panelinden kaldırılır."
                  onConfirm={deleteAnnouncement.bind(null, a.id, id)}
                />
              </div>
              <p className="text-sm text-muted-foreground">{a.content}</p>
              <span className="text-xs text-muted-foreground">
                {new Date(a.created_at).toLocaleDateString("tr-TR")}
              </span>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-bold text-foreground">Atanmış kurslar</h2>
        <div className="flex flex-wrap gap-2">
          {(courses ?? []).map((course) => (
            <ClassCourseCheckbox
              key={course.id}
              classId={id}
              courseId={course.id}
              courseTitle={course.title}
              assigned={assignedCourseIds.has(course.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-foreground">
            Öğrenciler ({students?.length ?? 0})
          </h2>
          <Button
            nativeButton={false}
            render={<Link href={`/ogretmen/siniflar/${id}/ogrenci-ekle`} />}
            size="sm"
            className="gap-1.5"
          >
            <UserPlus className="h-4 w-4" />
            Toplu Öğrenci Ekle
          </Button>
        </div>

        {(!students || students.length === 0) && (
          <p className="text-muted-foreground">
            Henüz öğrenci yok. Sınıf kodunu paylaş veya toplu öğrenci ekle.
          </p>
        )}

        <div className="flex flex-col gap-2">
          {students?.map((student) => {
            const level = getLevel(student.total_points);
            const lastActive = lastActiveByStudent.get(student.id);
            return (
              <Card
                key={student.id}
                className="flex flex-wrap items-center gap-3 rounded-2xl p-3"
              >
                <Image
                  src={`/avatars/${student.avatar}.svg`}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full bg-secondary"
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-medium text-foreground">
                    {student.display_name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {student.username} · Seviye {level.level}: {level.name} ·{" "}
                    {completedByStudent.get(student.id) ?? 0} ders ·{" "}
                    {student.total_points} puan ·{" "}
                    {lastActive
                      ? `Son aktiflik: ${new Date(lastActive).toLocaleDateString("tr-TR")}`
                      : "Hiç aktif olmadı"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <ResetPasswordDialog
                    studentId={student.id}
                    studentName={student.display_name}
                    trigger={
                      <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label="Şifre sıfırla"
                        title="Şifre sıfırla"
                      >
                        <KeyRound className="h-4 w-4" />
                      </Button>
                    }
                  />
                  <MoveClassDialog
                    studentId={student.id}
                    studentName={student.display_name}
                    otherClasses={otherClasses ?? []}
                    trigger={
                      <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label="Başka sınıfa taşı"
                        title="Başka sınıfa taşı"
                      >
                        <Plus className="h-4 w-4 rotate-45" />
                      </Button>
                    }
                  />
                  <BonusPointsDialog
                    studentId={student.id}
                    studentName={student.display_name}
                    trigger={
                      <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label="Bonus puan ver"
                        title="Bonus puan ver"
                      >
                        <Gift className="h-4 w-4" />
                      </Button>
                    }
                  />
                  <ConfirmDeleteDialog
                    trigger={
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        aria-label="Sınıftan çıkar"
                        title="Sınıftan çıkar"
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    }
                    title={`${student.display_name} sınıftan çıkarılsın mı?`}
                    description="Öğrencinin hesabı ve ilerlemesi silinmez, sadece bu sınıftan çıkar."
                    onConfirm={moveStudentClass.bind(null, student.id, null)}
                  />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

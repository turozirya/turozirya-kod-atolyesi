import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Gift, KeyRound, LogOut, Plus, UserPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ClassCourseCheckbox } from "@/components/teacher/ClassCourseCheckbox";
import { ResetPasswordDialog } from "@/components/teacher/ResetPasswordDialog";
import { MoveClassDialog } from "@/components/teacher/MoveClassDialog";
import { BonusPointsDialog } from "@/components/teacher/BonusPointsDialog";
import { ConfirmDeleteDialog } from "@/components/teacher/ConfirmDeleteDialog";
import { moveStudentClass } from "@/actions/students";
import { getLevel } from "@/lib/gamification/levels";

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

  const [{ data: courses }, { data: assignedRows }, { data: otherClasses }, { data: students }] =
    await Promise.all([
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
    ]);

  const assignedCourseIds = new Set((assignedRows ?? []).map((r) => r.course_id));
  const studentIds = (students ?? []).map((s) => s.id);

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
        <h1 className="font-heading text-2xl font-bold text-foreground">{klass.name}</h1>
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

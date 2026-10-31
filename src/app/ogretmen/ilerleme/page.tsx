import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/session";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProgressFilters } from "@/components/teacher/ProgressFilters";
import { ExportCsvButton } from "@/components/teacher/ExportCsvButton";

export default async function OgretmenIlerlemePage({
  searchParams,
}: {
  searchParams: Promise<{ sinif?: string; kurs?: string; modul?: string }>;
}) {
  const { sinif, kurs, modul } = await searchParams;
  const profile = await requireRole("teacher");
  const supabase = await createClient();

  const { data: classes } = await supabase
    .from("classes")
    .select("id, name")
    .eq("teacher_id", profile.id)
    .order("name", { ascending: true });

  let courses: { id: string; title: string }[] = [];
  if (sinif) {
    const { data } = await supabase
      .from("class_courses")
      .select("courses(id, title)")
      .eq("class_id", sinif);
    courses = (data ?? []).flatMap((row) => (row.courses ? [row.courses] : []));
  }

  let modules: { id: string; title: string }[] = [];
  if (kurs) {
    const { data } = await supabase
      .from("modules")
      .select("id, title")
      .eq("course_id", kurs)
      .order("order_index", { ascending: true });
    modules = data ?? [];
  }

  let lessons: { id: string; title: string }[] = [];
  let students: { id: string; display_name: string }[] = [];
  let progressMap = new Map<string, "in_progress" | "completed">();

  if (modul && sinif) {
    const [{ data: lessonRows }, { data: studentRows }] = await Promise.all([
      supabase
        .from("lessons")
        .select("id, title")
        .eq("module_id", modul)
        .order("order_index", { ascending: true }),
      supabase
        .from("profiles")
        .select("id, display_name")
        .eq("class_id", sinif)
        .eq("role", "student")
        .order("display_name", { ascending: true }),
    ]);
    lessons = lessonRows ?? [];
    students = studentRows ?? [];

    if (lessons.length > 0 && students.length > 0) {
      const { data: progressRows } = await supabase
        .from("lesson_progress")
        .select("student_id, lesson_id, status")
        .in(
          "lesson_id",
          lessons.map((l) => l.id)
        )
        .in(
          "student_id",
          students.map((s) => s.id)
        );
      progressMap = new Map(
        (progressRows ?? []).map((r) => [`${r.student_id}:${r.lesson_id}`, r.status])
      );
    }
  }

  const csvRows: string[][] = [];
  if (lessons.length > 0 && students.length > 0) {
    csvRows.push(["Öğrenci", ...lessons.map((l) => l.title), "Toplam"]);
    for (const student of students) {
      let rowTotal = 0;
      const cells = lessons.map((lesson) => {
        const status = progressMap.get(`${student.id}:${lesson.id}`);
        if (status === "completed") rowTotal++;
        return status === "completed" ? "Tamamlandı" : status === "in_progress" ? "Devam ediyor" : "";
      });
      csvRows.push([student.display_name, ...cells, String(rowTotal)]);
    }
    const columnTotals = lessons.map(
      (lesson) =>
        students.filter((s) => progressMap.get(`${s.id}:${lesson.id}`) === "completed").length
    );
    csvRows.push(["Toplam", ...columnTotals.map(String), ""]);
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">İlerleme</h1>

      <ProgressFilters
        classes={(classes ?? []).map((c) => ({ id: c.id, label: c.name }))}
        courses={courses.map((c) => ({ id: c.id, label: c.title }))}
        modules={modules.map((m) => ({ id: m.id, label: m.title }))}
      />

      {!modul && (
        <p className="text-muted-foreground">
          Matrisi görmek için sınıf, kurs ve modül seç.
        </p>
      )}

      {modul && lessons.length > 0 && students.length > 0 && (
        <>
          <div className="w-fit">
            <ExportCsvButton rows={csvRows} filename="ilerleme.csv" />
          </div>
          <div className="overflow-x-auto rounded-2xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Öğrenci</TableHead>
                  {lessons.map((lesson) => (
                    <TableHead key={lesson.id} className="text-center">
                      {lesson.title}
                    </TableHead>
                  ))}
                  <TableHead className="text-center">Toplam</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => {
                  let rowTotal = 0;
                  return (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.display_name}</TableCell>
                      {lessons.map((lesson) => {
                        const status = progressMap.get(`${student.id}:${lesson.id}`);
                        if (status === "completed") rowTotal++;
                        return (
                          <TableCell key={lesson.id} className="text-center">
                            {status === "completed" ? "✅" : status === "in_progress" ? "⏳" : ""}
                          </TableCell>
                        );
                      })}
                      <TableCell className="text-center font-bold">{rowTotal}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell className="font-bold">Toplam</TableCell>
                  {lessons.map((lesson) => (
                    <TableCell key={lesson.id} className="text-center font-bold">
                      {
                        students.filter(
                          (s) => progressMap.get(`${s.id}:${lesson.id}`) === "completed"
                        ).length
                      }
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {modul && (lessons.length === 0 || students.length === 0) && (
        <p className="text-muted-foreground">Bu modülde ders veya bu sınıfta öğrenci yok.</p>
      )}
    </div>
  );
}

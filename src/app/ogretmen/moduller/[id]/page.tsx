import { notFound } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ConfirmDeleteDialog } from "@/components/teacher/ConfirmDeleteDialog";
import { ReorderButtons } from "@/components/teacher/ReorderButtons";
import { PublishSwitch } from "@/components/teacher/PublishSwitch";
import {
  deleteLesson,
  reorderLesson,
  setLessonPublished,
} from "@/actions/lessons";

export default async function OgretmenModulDetayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: moduleRow } = await supabase
    .from("modules")
    .select("*, courses(id, title)")
    .eq("id", id)
    .maybeSingle();
  if (!moduleRow) {
    notFound();
  }

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("module_id", id)
    .order("order_index", { ascending: true });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <div>
        <Link
          href={`/ogretmen/kurslar/${moduleRow.course_id}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          ← {moduleRow.courses?.title}
        </Link>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          {moduleRow.title}
        </h1>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold text-foreground">Dersler</h2>
        <Button
          className="gap-1.5"
          nativeButton={false}
          render={<Link href={`/ogretmen/dersler/yeni?modul=${id}`} />}
        >
          <Plus className="h-4 w-4" />
          Yeni Ders
        </Button>
      </div>

      {(!lessons || lessons.length === 0) && (
        <p className="text-muted-foreground">Henüz ders yok.</p>
      )}

      <div className="flex flex-col gap-3">
        {lessons?.map((lesson, index) => (
          <Card
            key={lesson.id}
            className="flex flex-row flex-wrap items-center gap-3 rounded-2xl p-4 shadow-sm"
          >
            <ReorderButtons
              disableUp={index === 0}
              disableDown={index === lessons.length - 1}
              onReorder={reorderLesson.bind(null, lesson.id, id)}
            />
            <Link
              href={`/ogretmen/dersler/${lesson.id}`}
              className="flex-1 font-medium text-foreground hover:underline"
            >
              {lesson.title}
            </Link>
            <Badge variant="secondary">{lesson.estimated_minutes} dk</Badge>
            <PublishSwitch
              checked={lesson.is_published}
              onToggle={setLessonPublished.bind(null, lesson.id, id)}
            />
            <ConfirmDeleteDialog
              trigger={
                <Button variant="destructive" size="sm">
                  Sil
                </Button>
              }
              title={`"${lesson.title}" silinsin mi?`}
              description="Bu işlem geri alınamaz."
              onConfirm={deleteLesson.bind(null, lesson.id, id)}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

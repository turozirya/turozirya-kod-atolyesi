import { notFound } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ModuleDialog } from "@/components/teacher/ModuleDialog";
import { ConfirmDeleteDialog } from "@/components/teacher/ConfirmDeleteDialog";
import { ReorderButtons } from "@/components/teacher/ReorderButtons";
import { PublishSwitch } from "@/components/teacher/PublishSwitch";
import {
  deleteModule,
  reorderModule,
  setModulePublished,
} from "@/actions/modules";
import { getIconComponent } from "@/lib/icons";
import { getModuleColorClasses } from "@/lib/module-colors";
import { cn } from "@/lib/utils";

export default async function OgretmenKursDetayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!course) {
    notFound();
  }

  const { data: modules } = await supabase
    .from("modules")
    .select("*")
    .eq("course_id", id)
    .order("order_index", { ascending: true });

  const { data: assignedClasses } = await supabase
    .from("class_courses")
    .select("classes(id, name)")
    .eq("course_id", id);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <div>
        <Link
          href="/ogretmen/kurslar"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Kurslar
        </Link>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          {course.title}
        </h1>
      </div>

      <div className="rounded-2xl border bg-muted/30 p-4">
        <h2 className="mb-1 text-sm font-bold text-foreground">
          Atandığı sınıflar
        </h2>
        {assignedClasses && assignedClasses.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {assignedClasses.map((ac, i) => (
              <span
                key={ac.classes?.id ?? i}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {ac.classes?.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Henüz hiçbir sınıfa atanmadı (Faz 5&apos;te buradan atanacak).
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold text-foreground">
          Modüller
        </h2>
        <ModuleDialog
          courseId={id}
          trigger={
            <Button className="gap-1.5">
              <Plus className="h-4 w-4" />
              Yeni Modül
            </Button>
          }
        />
      </div>

      {(!modules || modules.length === 0) && (
        <p className="text-muted-foreground">Henüz modül yok.</p>
      )}

      <div className="flex flex-col gap-3">
        {modules?.map((moduleRow, index) => {
          const colors = getModuleColorClasses(moduleRow.color);
          const Icon = getIconComponent(moduleRow.icon);
          return (
            <Card
              key={moduleRow.id}
              className={cn(
                "flex flex-row flex-wrap items-center gap-3 rounded-2xl border-2 p-4",
                colors.border
              )}
            >
              <ReorderButtons
                disableUp={index === 0}
                disableDown={index === modules.length - 1}
                onReorder={reorderModule.bind(null, moduleRow.id, id)}
              />
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white",
                  colors.bg
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <Link
                href={`/ogretmen/moduller/${moduleRow.id}`}
                className="flex-1 font-medium text-foreground hover:underline"
              >
                {moduleRow.title}
              </Link>
              <PublishSwitch
                checked={moduleRow.is_published}
                onToggle={setModulePublished.bind(null, moduleRow.id, id)}
              />
              <ModuleDialog
                courseId={id}
                module={moduleRow}
                trigger={
                  <Button variant="outline" size="sm">
                    Düzenle
                  </Button>
                }
              />
              <ConfirmDeleteDialog
                trigger={
                  <Button variant="destructive" size="sm">
                    Sil
                  </Button>
                }
                title={`"${moduleRow.title}" silinsin mi?`}
                description="Bu modülün tüm dersleri de silinecek. Bu işlem geri alınamaz."
                onConfirm={deleteModule.bind(null, moduleRow.id, id)}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

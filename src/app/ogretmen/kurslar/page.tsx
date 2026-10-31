import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CourseDialog } from "@/components/teacher/CourseDialog";
import { ConfirmDeleteDialog } from "@/components/teacher/ConfirmDeleteDialog";
import { ReorderButtons } from "@/components/teacher/ReorderButtons";
import { PublishSwitch } from "@/components/teacher/PublishSwitch";
import {
  deleteCourse,
  reorderCourse,
  setCoursePublished,
} from "@/actions/courses";
import { getIconComponent } from "@/lib/icons";
import { getModuleColorClasses } from "@/lib/module-colors";
import { cn } from "@/lib/utils";

export default async function OgretmenKurslarPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .order("order_index", { ascending: true });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-foreground">Kurslar</h1>
        <CourseDialog
          trigger={
            <Button className="gap-1.5">
              <Plus className="h-4 w-4" />
              Yeni Kurs
            </Button>
          }
        />
      </div>

      {(!courses || courses.length === 0) && (
        <p className="text-muted-foreground">
          Henüz kurs yok. &quot;Yeni Kurs&quot; ile ilk kursu oluştur.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course, index) => {
          const colors = getModuleColorClasses(course.color);
          const Icon = getIconComponent(course.icon);
          return (
            <Card
              key={course.id}
              className={cn(
                "flex flex-col gap-3 rounded-2xl border-2 p-5 shadow-sm",
                colors.border
              )}
            >
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl text-white",
                    colors.bg
                  )}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <ReorderButtons
                  disableUp={index === 0}
                  disableDown={index === courses.length - 1}
                  onReorder={reorderCourse.bind(null, course.id)}
                />
              </div>
              <Link
                href={`/ogretmen/kurslar/${course.id}`}
                className="font-heading text-lg font-bold text-foreground hover:underline"
              >
                {course.title}
              </Link>
              {course.description && (
                <p className="text-sm text-muted-foreground">{course.description}</p>
              )}
              <div className="mt-auto flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <PublishSwitch
                    checked={course.is_published}
                    onToggle={setCoursePublished.bind(null, course.id)}
                  />
                  Yayında
                </div>
                <div className="flex items-center gap-1.5">
                  <CourseDialog
                    course={course}
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
                    title={`"${course.title}" silinsin mi?`}
                    description="Bu kursun tüm modülleri ve dersleri de silinecek. Bu işlem geri alınamaz."
                    onConfirm={deleteCourse.bind(null, course.id)}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

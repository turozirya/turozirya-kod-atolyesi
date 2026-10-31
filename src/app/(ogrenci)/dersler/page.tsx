import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { getModuleColorClasses } from "@/lib/module-colors";
import { getIconComponent } from "@/lib/icons";
import { cn } from "@/lib/utils";

export default async function DerslerPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select("id, slug, title, description, icon, color")
    .order("order_index", { ascending: true });

  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Henüz bir kursun yok
        </h1>
        <p className="text-muted-foreground">
          Öğretmenin seni bir kursa atadığında burada görünecek.
        </p>
      </div>
    );
  }

  if (courses.length === 1) {
    redirect(`/dersler/${courses[0].slug}`);
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Derslerim
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const colors = getModuleColorClasses(course.color);
          const Icon = getIconComponent(course.icon);
          return (
            <Link key={course.id} href={`/dersler/${course.slug}`}>
              <Card
                className={cn(
                  "flex h-full flex-col gap-3 rounded-2xl border-2 p-5 shadow-sm transition-transform hover:scale-[1.01]",
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
                {course.description && (
                  <p className="text-sm text-muted-foreground">
                    {course.description}
                  </p>
                )}
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

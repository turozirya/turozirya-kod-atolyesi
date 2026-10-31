import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";
import { BadgeDialog } from "@/components/teacher/BadgeDialog";
import { ConfirmDeleteDialog } from "@/components/teacher/ConfirmDeleteDialog";
import { BadgeCard } from "@/components/gamification/BadgeCard";
import { deleteBadge } from "@/actions/teacher-badges";

export default async function OgretmenRozetlerPage() {
  await requireRole("teacher");
  const supabase = await createClient();

  const [{ data: badges }, { data: courses }, { data: modules }, { data: earnedRows }] =
    await Promise.all([
      supabase.from("badges").select("*").order("order_index", { ascending: true }),
      supabase.from("courses").select("id, title").order("title", { ascending: true }),
      supabase.from("modules").select("id, title, course_id").order("title", { ascending: true }),
      supabase.from("student_badges").select("badge_id"),
    ]);

  const earnedCounts = new Map<string, number>();
  for (const row of earnedRows ?? []) {
    earnedCounts.set(row.badge_id, (earnedCounts.get(row.badge_id) ?? 0) + 1);
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-foreground">Rozetler</h1>
        <BadgeDialog
          courses={courses ?? []}
          modules={modules ?? []}
          trigger={
            <Button className="gap-1.5">
              <Plus className="h-4 w-4" />
              Yeni Rozet
            </Button>
          }
        />
      </div>

      {(!badges || badges.length === 0) && (
        <p className="text-muted-foreground">Henüz rozet yok. &quot;Yeni Rozet&quot; ile ilk rozeti oluştur.</p>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {badges?.map((badge) => (
          <div key={badge.id} className="flex flex-col gap-2">
            <BadgeCard badge={badge} earned />
            <p className="text-center text-xs text-muted-foreground">
              Senin öğrencilerinden {earnedCounts.get(badge.id) ?? 0} kişi kazandı
            </p>
            <div className="flex items-center justify-center gap-1.5">
              <BadgeDialog
                badge={badge}
                courses={courses ?? []}
                modules={modules ?? []}
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
                title={`"${badge.name}" silinsin mi?`}
                description="Bu rozeti kazanmış öğrencilerin kayıtları da silinir. Bu işlem geri alınamaz."
                onConfirm={deleteBadge.bind(null, badge.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

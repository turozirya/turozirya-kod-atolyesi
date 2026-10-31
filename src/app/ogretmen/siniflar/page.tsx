import Link from "next/link";
import { Plus, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ClassDialog } from "@/components/teacher/ClassDialog";
import { ConfirmDeleteDialog } from "@/components/teacher/ConfirmDeleteDialog";
import { JoinCodeBadge } from "@/components/teacher/JoinCodeBadge";
import { PublishSwitch } from "@/components/teacher/PublishSwitch";
import { deleteClass, setClassLeaderboardEnabled } from "@/actions/classes";

export default async function OgretmenSiniflarPage() {
  const profile = await requireRole("teacher");
  const supabase = await createClient();

  const { data: classes } = await supabase
    .from("classes")
    .select("*")
    .eq("teacher_id", profile.id)
    .order("created_at", { ascending: true });

  const { data: studentCounts } = await supabase
    .from("profiles")
    .select("class_id")
    .eq("role", "student")
    .in("class_id", (classes ?? []).map((c) => c.id));

  const countByClass = new Map<string, number>();
  for (const row of studentCounts ?? []) {
    if (!row.class_id) continue;
    countByClass.set(row.class_id, (countByClass.get(row.class_id) ?? 0) + 1);
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-foreground">Sınıflar</h1>
        <ClassDialog
          trigger={
            <Button className="gap-1.5">
              <Plus className="h-4 w-4" />
              Yeni Sınıf
            </Button>
          }
        />
      </div>

      {(!classes || classes.length === 0) && (
        <p className="text-muted-foreground">
          Henüz sınıf yok. &quot;Yeni Sınıf&quot; ile ilk sınıfını oluştur.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classes?.map((klass) => (
          <Card key={klass.id} className="flex flex-col gap-3 rounded-2xl border-2 p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Users className="h-6 w-6" />
              </span>
              <JoinCodeBadge classId={klass.id} joinCode={klass.join_code} />
            </div>
            <Link
              href={`/ogretmen/siniflar/${klass.id}`}
              className="font-heading text-lg font-bold text-foreground hover:underline"
            >
              {klass.name}
            </Link>
            <p className="text-sm text-muted-foreground">
              {countByClass.get(klass.id) ?? 0} öğrenci
            </p>
            <div className="mt-auto flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PublishSwitch
                  checked={klass.leaderboard_enabled}
                  onToggle={setClassLeaderboardEnabled.bind(null, klass.id)}
                  ariaLabel="Sıralama açık"
                />
                Sıralama
              </div>
              <div className="flex items-center gap-1.5">
                <ClassDialog
                  klass={klass}
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
                  title={`"${klass.name}" silinsin mi?`}
                  description="Öğrenciler sınıfsız kalır, hesapları silinmez. Bu işlem geri alınamaz."
                  onConfirm={deleteClass.bind(null, klass.id)}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

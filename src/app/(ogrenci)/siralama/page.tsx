import Image from "next/image";
import { Medal, Trophy } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import { Card } from "@/components/ui/card";
import { getLevel } from "@/lib/gamification/levels";
import { cn } from "@/lib/utils";

const MEDALS = ["🥇", "🥈", "🥉"];

export default async function SiralamaPage() {
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  let leaderboardEnabled = false;
  if (profile?.class_id) {
    const { data: classRow } = await supabase
      .from("classes")
      .select("leaderboard_enabled")
      .eq("id", profile.class_id)
      .maybeSingle();
    leaderboardEnabled = classRow?.leaderboard_enabled ?? false;
  }

  if (!leaderboardEnabled) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
        <Trophy className="h-12 w-12 text-muted-foreground" aria-hidden />
        <h1 className="font-heading text-2xl font-bold text-foreground">Sıralama kapalı</h1>
        <p className="text-muted-foreground">
          Öğretmenin sınıf sıralamasını şu an kapalı tutuyor.
        </p>
      </div>
    );
  }

  const { data: rows } = await supabase.rpc("get_class_leaderboard");
  const leaderboard = rows ?? [];

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-bold text-foreground">Sınıf Sıralaması</h1>
        <p className="text-muted-foreground">Sadece kendi sınıfın görünür.</p>
      </div>

      {leaderboard.length === 0 ? (
        <Card className="rounded-2xl p-6 text-center text-muted-foreground">
          Sıralamada henüz kimse yok.
        </Card>
      ) : (
        <div className="flex flex-col gap-2">
          {leaderboard.map((row, i) => {
            const level = getLevel(row.total_points);
            return (
              <Card
                key={`${row.display_name}-${i}`}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border-2 p-4",
                  row.is_me ? "border-primary bg-primary/5" : "border-transparent"
                )}
              >
                <span className="flex h-8 w-8 items-center justify-center text-lg font-bold text-muted-foreground">
                  {i < 3 ? MEDALS[i] : i + 1}
                </span>
                <Image
                  src={`/avatars/${row.avatar}.svg`}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full bg-secondary"
                />
                <div className="flex flex-1 flex-col">
                  <span className="font-medium text-foreground">{row.display_name}</span>
                  <span className="text-xs text-muted-foreground">
                    Seviye {level.level}: {level.name} · {row.badge_count} rozet
                  </span>
                </div>
                <span className="flex items-center gap-1 font-heading text-lg font-bold text-accent-foreground">
                  <Medal className="h-4 w-4" aria-hidden /> {row.total_points}
                </span>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

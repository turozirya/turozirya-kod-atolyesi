import { requireProfile } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/Header";
import { StudentNav } from "@/components/layout/StudentNav";

export default async function OgrenciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireProfile();

  let leaderboardEnabled = false;
  if (profile.class_id) {
    const supabase = await createClient();
    const { data: classRow } = await supabase
      .from("classes")
      .select("leaderboard_enabled")
      .eq("id", profile.class_id)
      .maybeSingle();
    leaderboardEnabled = classRow?.leaderboard_enabled ?? false;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header
        displayName={profile.display_name}
        avatar={profile.avatar}
        points={profile.role === "student" ? profile.total_points : undefined}
      />
      <StudentNav leaderboardEnabled={leaderboardEnabled} />
      <main className="flex flex-1 flex-col pb-16 sm:pb-0">{children}</main>
    </div>
  );
}

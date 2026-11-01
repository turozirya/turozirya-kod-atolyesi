import Link from "next/link";
import { Megaphone } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import { Card } from "@/components/ui/card";

export default async function DuyurularPage() {
  const profile = await getCurrentProfile();

  let announcements: { id: string; title: string; content: string; created_at: string }[] = [];
  if (profile?.class_id) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("announcements")
      .select("id, title, content, created_at")
      .eq("class_id", profile.class_id)
      .order("created_at", { ascending: false });
    announcements = data ?? [];
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <div>
        <Link href="/panel" className="text-sm text-muted-foreground hover:underline">
          ← Panel
        </Link>
        <h1 className="font-heading text-2xl font-bold text-foreground">Duyurular</h1>
      </div>

      {announcements.length === 0 && (
        <Card className="flex flex-col items-center gap-2 rounded-2xl p-8 text-center text-muted-foreground">
          <Megaphone className="h-8 w-8" aria-hidden />
          Henüz duyuru yok.
        </Card>
      )}

      <div className="flex flex-col gap-2">
        {announcements.map((a) => (
          <Card
            key={a.id}
            className="flex flex-col gap-1 rounded-2xl border-2 border-secondary bg-secondary p-4 text-secondary-foreground"
          >
            <span className="flex items-center gap-1.5 font-bold">
              <Megaphone className="h-4 w-4" aria-hidden />
              {a.title}
            </span>
            <p className="text-sm">{a.content}</p>
            <span className="text-xs text-secondary-foreground/70">
              {new Date(a.created_at).toLocaleDateString("tr-TR")}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}

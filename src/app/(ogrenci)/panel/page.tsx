import { getCurrentProfile } from "@/lib/auth/session";

export default async function PanelPage() {
  const profile = await getCurrentProfile();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
      <h1 className="font-heading text-3xl font-bold text-foreground">
        Merhaba, {profile?.display_name}!
      </h1>
      <p className="text-muted-foreground">
        Panelin yakında burada olacak (dersler, puan, rozetler).
      </p>
    </div>
  );
}

import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const profile = await getCurrentProfile();
  const href = profile?.role === "teacher" ? "/ogretmen" : profile ? "/devam" : "/giris";
  const label =
    profile?.role === "teacher"
      ? "Öğretmen paneline dön"
      : profile
        ? "Derslerime dön"
        : "Giriş yap";

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
      <span className="text-5xl" aria-hidden>
        🤖
      </span>
      <h1 className="font-heading text-2xl font-bold text-foreground">Sayfa bulunamadı</h1>
      <p className="text-muted-foreground">
        Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.
      </p>
      <Button
        nativeButton={false}
        render={<Link href={href} />}
        className="h-11 rounded-2xl font-bold"
      >
        {label}
      </Button>
    </div>
  );
}

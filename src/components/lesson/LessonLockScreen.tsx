import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function LessonLockScreen({
  blockingLessonTitle,
  blockingLessonHref,
}: {
  blockingLessonTitle: string;
  blockingLessonHref: string;
}) {
  return (
    <Card className="flex flex-col items-center gap-3 rounded-2xl p-8 text-center shadow-sm">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Lock className="h-6 w-6" />
      </span>
      <h2 className="font-heading text-xl font-bold text-foreground">
        Bu ders henüz kilitli
      </h2>
      <p className="text-muted-foreground">
        Buraya geçmeden önce &ldquo;{blockingLessonTitle}&rdquo; dersini bitirmelisin.
      </p>
      <Button
        size="lg"
        nativeButton={false}
        render={<Link href={blockingLessonHref} />}
        className="mt-2 h-12 rounded-2xl text-base font-bold"
      >
        Önce şu dersi bitir
      </Button>
    </Card>
  );
}

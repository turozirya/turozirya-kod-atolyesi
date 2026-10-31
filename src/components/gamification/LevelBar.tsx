import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress, ProgressIndicator, ProgressTrack } from "@/components/ui/progress";
import { getLevel } from "@/lib/gamification/levels";
import { cn } from "@/lib/utils";

export function LevelBar({
  points,
  variant = "large",
  className,
}: {
  points: number;
  variant?: "large" | "compact";
  className?: string;
}) {
  const level = getLevel(points);

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Sparkles className="h-4 w-4 shrink-0 text-accent" aria-hidden />
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-semibold text-foreground">{level.name}</span>
          <Progress value={level.progressPercent} className="w-20">
            <ProgressTrack className="h-1.5">
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </div>
      </div>
    );
  }

  return (
    <Card
      className={cn(
        "flex flex-col gap-3 rounded-2xl border-2 border-primary/30 bg-primary/5 p-5",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Sparkles className="h-5 w-5" aria-hidden />
        </span>
        <div className="flex flex-col">
          <span className="font-heading text-lg font-bold text-foreground">
            Seviye {level.level}: {level.name}
          </span>
          <span className="text-sm text-muted-foreground">{points} puan</span>
        </div>
      </div>
      <Progress value={level.progressPercent}>
        <ProgressTrack className="h-3">
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
      <p className="text-sm text-muted-foreground">
        {level.nextMin !== null
          ? `Sonraki seviyeye ${level.nextMin - points} puan`
          : "En yüksek seviyedesin! 🎉"}
      </p>
    </Card>
  );
}

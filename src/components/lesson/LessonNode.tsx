import Link from "next/link";
import { Check, Lock, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getModuleColorClasses } from "@/lib/module-colors";
import { cn } from "@/lib/utils";

export type LessonNodeStatus = "completed" | "in_progress" | "locked" | "start";

export function LessonNode({
  title,
  href,
  status,
  highlighted,
  color,
  durationMinutes,
  points,
  isLast,
}: {
  title: string;
  href: string;
  status: LessonNodeStatus;
  highlighted: boolean;
  color: string;
  durationMinutes: number;
  points: number;
  isLast: boolean;
}) {
  const colors = getModuleColorClasses(color);
  const locked = status === "locked";

  const circle = (
    <span
      className={cn(
        "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
        locked && "bg-muted text-muted-foreground",
        status === "completed" && cn(colors.bg, "text-white"),
        (status === "in_progress" || status === "start") &&
          (highlighted ? cn(colors.bg, "text-white ring-4 ring-offset-2", colors.ring) : cn(colors.bgSoft, colors.text))
      )}
    >
      {status === "completed" ? (
        <Check className="h-5 w-5" />
      ) : locked ? (
        <Lock className="h-4 w-4" />
      ) : (
        <Play className="h-4 w-4" />
      )}
    </span>
  );

  const content = (
    <Card
      className={cn(
        "flex flex-1 flex-row items-center justify-between gap-3 rounded-2xl p-4 shadow-sm",
        !locked && "transition-transform hover:scale-[1.01]",
        locked && "opacity-60",
        highlighted && cn("border-2", colors.border)
      )}
    >
      <span className={cn("font-medium", locked ? "text-muted-foreground" : "text-foreground")}>
        {title}
      </span>
      <div className="flex shrink-0 items-center gap-2">
        <Badge variant="secondary">{durationMinutes} dk</Badge>
        <Badge className="bg-badge text-badge-foreground">+{points}</Badge>
      </div>
    </Card>
  );

  return (
    <div className="relative flex gap-3 pb-4 last:pb-0">
      {!isLast && (
        <span className="absolute left-5 top-10 bottom-0 w-0.5 -translate-x-1/2 bg-border" />
      )}
      {circle}
      {locked ? content : <Link href={href} className="flex-1">{content}</Link>}
    </div>
  );
}

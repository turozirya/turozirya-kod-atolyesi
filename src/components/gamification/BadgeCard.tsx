import { createElement } from "react";
import { Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getBadgeColorClasses } from "@/lib/gamification/badge-colors";
import { getIconComponent } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type BadgeSummary = {
  code: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
};

export function BadgeCard({
  badge,
  earned,
  progressLabel,
  size = "sm",
  onClick,
}: {
  badge: BadgeSummary;
  earned: boolean;
  progressLabel?: string;
  size?: "sm" | "lg";
  onClick?: () => void;
}) {
  const colors = getBadgeColorClasses(badge.color);
  const isLarge = size === "lg";

  return (
    <Card
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
      className={cn(
        "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center shadow-sm",
        isLarge && "p-6",
        earned ? colors.border : "border-border",
        onClick && "cursor-pointer transition-transform hover:scale-[1.02]"
      )}
    >
      <span
        className={cn(
          "relative flex items-center justify-center rounded-2xl text-white",
          isLarge ? "h-20 w-20" : "h-14 w-14",
          earned ? colors.bg : "bg-muted"
        )}
      >
        {createElement(getIconComponent(badge.icon), {
          className: cn(isLarge ? "h-10 w-10" : "h-7 w-7", !earned && "text-muted-foreground"),
        })}
        {!earned && (
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-background ring-2 ring-border">
            <Lock className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
          </span>
        )}
      </span>
      <span
        className={cn(
          "font-heading font-bold",
          isLarge ? "text-lg" : "text-sm",
          earned ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {badge.name}
      </span>
      {!earned && (progressLabel ?? badge.description) && (
        <p className="text-xs text-muted-foreground">
          {progressLabel ?? badge.description}
        </p>
      )}
    </Card>
  );
}

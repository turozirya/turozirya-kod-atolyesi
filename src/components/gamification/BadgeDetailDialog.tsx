"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BadgeCard, type BadgeSummary } from "@/components/gamification/BadgeCard";

export function BadgeDetailTrigger({
  badge,
  earned,
  earnedAt,
  progressLabel,
}: {
  badge: BadgeSummary;
  earned: boolean;
  earnedAt?: string | null;
  progressLabel?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <BadgeCard
        badge={badge}
        earned={earned}
        progressLabel={progressLabel}
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{badge.name}</DialogTitle>
            <DialogDescription>{badge.description}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-3 py-2">
            <BadgeCard badge={badge} earned={earned} size="lg" />
            {earned && earnedAt ? (
              <p className="text-sm text-muted-foreground">
                Kazanıldı:{" "}
                {new Date(earnedAt).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {progressLabel ?? "Henüz kazanılmadı."}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

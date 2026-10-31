"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useReducedMotion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BadgeCard, type BadgeSummary } from "@/components/gamification/BadgeCard";
import { markBadgesSeen } from "@/actions/badges";

export function UnseenBadgesDialog({ badges }: { badges: BadgeSummary[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(badges.length > 0);
  const badge = badges[index];
  const isLast = index === badges.length - 1;

  useEffect(() => {
    if (!open || prefersReducedMotion) return;
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  }, [open, index, prefersReducedMotion]);

  if (!open || !badge) return null;

  const close = () => {
    setOpen(false);
    markBadgesSeen();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) close();
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Yeni Rozet!</DialogTitle>
          <DialogDescription>{badge.description ?? badge.name}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-3 py-4">
          <BadgeCard badge={badge} earned size="lg" />
        </div>
        <Button
          onClick={() => (isLast ? close() : setIndex((i) => i + 1))}
          className="h-12 rounded-2xl font-bold"
        >
          {isLast ? "Tamam" : "Devam"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

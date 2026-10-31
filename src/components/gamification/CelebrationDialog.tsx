"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Sparkles, TrendingUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BadgeCard } from "@/components/gamification/BadgeCard";
import { getLevel } from "@/lib/gamification/levels";
import type { CompleteLessonResult } from "@/lib/gamification/complete-lesson";

type Step = { kind: "points" } | { kind: "level-up" } | { kind: "badge"; index: number };

export function CelebrationDialog({
  result,
  prevPoints,
  onClose,
  onMarkSeen,
}: {
  result: CompleteLessonResult;
  prevPoints: number;
  onClose: () => void;
  onMarkSeen: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const newLevel = getLevel(result.total_points);
  const leveledUp = newLevel.level > getLevel(prevPoints).level;

  const steps = useMemo<Step[]>(() => {
    const list: Step[] = [{ kind: "points" }];
    if (leveledUp) list.push({ kind: "level-up" });
    result.new_badges.forEach((_, index) => list.push({ kind: "badge", index }));
    return list;
  }, [leveledUp, result.new_badges]);

  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (step.kind === "points" || step.kind === "badge") {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  }, [step, prefersReducedMotion]);

  const finish = () => {
    if (result.new_badges.length > 0) onMarkSeen();
    onClose();
  };

  const next = () => {
    if (isLast) {
      finish();
      return;
    }
    setStepIndex((i) => i + 1);
  };

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) finish();
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {step.kind === "points" && "Harika iş!"}
            {step.kind === "level-up" && "Seviye Atladın!"}
            {step.kind === "badge" && "Yeni Rozet!"}
          </DialogTitle>
          <DialogDescription>
            {step.kind === "points" && "Dersi tamamladın."}
            {step.kind === "level-up" && `Artık ${newLevel.name} oldun.`}
            {step.kind === "badge" && result.new_badges[step.index].name}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3 py-4">
          <AnimatePresence mode="wait">
            {step.kind === "points" && (
              <motion.div
                key="points"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/15">
                  <Sparkles className="h-10 w-10 text-accent" aria-hidden />
                </span>
                <span className="font-heading text-3xl font-bold text-foreground">
                  +{result.points_earned} puan
                </span>
                {result.module_completed && (
                  <span className="text-sm text-muted-foreground">
                    + 25 puan modül bonusu 🎉
                  </span>
                )}
                {result.course_completed && (
                  <span className="text-sm text-muted-foreground">
                    + 100 puan kurs bonusu 🏆
                  </span>
                )}
              </motion.div>
            )}

            {step.kind === "level-up" && (
              <motion.div
                key="level-up"
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <TrendingUp className="h-10 w-10" aria-hidden />
                </span>
                <span className="font-heading text-2xl font-bold text-foreground">
                  Seviye {newLevel.level}: {newLevel.name}
                </span>
              </motion.div>
            )}

            {step.kind === "badge" && (
              <motion.div
                key={`badge-${step.index}`}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.7, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
              >
                <BadgeCard badge={result.new_badges[step.index]} earned size="lg" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={next} className="h-12 rounded-2xl font-bold">
            {isLast ? "Tamam" : "Devam"}
          </Button>
          {isLast && result.next_lesson && (
            <Button
              nativeButton={false}
              render={
                <Link
                  href={`/dersler/${result.next_lesson.course_slug}/${result.next_lesson.module_slug}/${result.next_lesson.lesson_slug}`}
                />
              }
              onClick={finish}
              className="h-12 rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Sonraki Derse Geç →
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

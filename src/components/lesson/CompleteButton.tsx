"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { completeLesson } from "@/actions/progress";
import { markBadgesSeen } from "@/actions/badges";
import { CelebrationDialog } from "@/components/gamification/CelebrationDialog";
import {
  parseCompleteLessonResult,
  type CompleteLessonResult,
  type NextLesson,
} from "@/lib/gamification/complete-lesson";

export function CompleteButton({
  lessonId,
  initiallyCompleted,
  initialPoints,
}: {
  lessonId: string;
  initiallyCompleted: boolean;
  initialPoints: number;
}) {
  const [completed, setCompleted] = useState(initiallyCompleted);
  const [submitting, setSubmitting] = useState(false);
  const [nextLesson, setNextLesson] = useState<NextLesson | null>(null);
  const [celebration, setCelebration] = useState<CompleteLessonResult | null>(null);

  const onClick = async () => {
    setSubmitting(true);
    const response = await completeLesson(lessonId);
    setSubmitting(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    const result = parseCompleteLessonResult(response.data);
    if (!result) return;

    setCompleted(true);
    setNextLesson(result.next_lesson);

    if (!result.already_completed && (result.points_earned > 0 || result.new_badges.length > 0)) {
      setCelebration(result);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-3">
      <Button
        size="lg"
        disabled={completed || submitting}
        onClick={onClick}
        className="h-14 rounded-2xl text-base font-bold"
      >
        {completed ? "Tamamlandı — tekrar göz atıyorsun" : submitting ? "Kaydediliyor…" : "Tamamlandı ✓"}
      </Button>

      {completed && nextLesson && !celebration && (
        <Button
          size="lg"
          nativeButton={false}
          render={
            <Link
              href={`/dersler/${nextLesson.course_slug}/${nextLesson.module_slug}/${nextLesson.lesson_slug}`}
            />
          }
          className="h-14 rounded-2xl bg-accent text-base font-bold text-accent-foreground hover:bg-accent/90"
        >
          Sonraki Derse Geç → {nextLesson.title}
        </Button>
      )}

      {celebration && (
        <CelebrationDialog
          result={celebration}
          prevPoints={initialPoints}
          onClose={() => setCelebration(null)}
          onMarkSeen={() => markBadgesSeen()}
        />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { completeLesson } from "@/actions/progress";
import type { Json } from "@/types/database";

type NextLesson = {
  course_slug: string;
  module_slug: string;
  lesson_slug: string;
  title: string;
};

function parseNextLesson(value: Json | undefined): NextLesson | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  const { course_slug, module_slug, lesson_slug, title } = value as Record<
    string,
    Json | undefined
  >;
  if (
    typeof course_slug === "string" &&
    typeof module_slug === "string" &&
    typeof lesson_slug === "string" &&
    typeof title === "string"
  ) {
    return { course_slug, module_slug, lesson_slug, title };
  }
  return null;
}

export function CompleteButton({
  lessonId,
  initiallyCompleted,
}: {
  lessonId: string;
  initiallyCompleted: boolean;
}) {
  const [completed, setCompleted] = useState(initiallyCompleted);
  const [submitting, setSubmitting] = useState(false);
  const [nextLesson, setNextLesson] = useState<NextLesson | null>(null);

  const onClick = async () => {
    setSubmitting(true);
    const result = await completeLesson(lessonId);
    setSubmitting(false);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    const payload = result.data as Record<string, Json | undefined> | undefined;
    setCompleted(true);
    setNextLesson(parseNextLesson(payload?.next_lesson));

    const pointsEarned = typeof payload?.points_earned === "number" ? payload.points_earned : 0;
    if (pointsEarned > 0) {
      toast.success(`+${pointsEarned} puan!`);
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

      {completed && nextLesson && (
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
    </div>
  );
}

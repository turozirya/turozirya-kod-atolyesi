"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { markBadgesSeen } from "@/actions/badges";
import { submitQuiz } from "@/actions/progress";
import { CelebrationDialog } from "@/components/gamification/CelebrationDialog";
import { parseQuizResult, type QuizQuestion, type QuizResult } from "@/lib/quiz";
import { cn } from "@/lib/utils";

export function QuizSection({
  lessonId,
  questions,
  initialAttempt,
  initialPoints,
}: {
  lessonId: string;
  questions: QuizQuestion[];
  initialAttempt: { correct_count: number; total_questions: number } | null;
  initialPoints: number;
}) {
  const [practicing, setPracticing] = useState(!initialAttempt);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [celebration, setCelebration] = useState<QuizResult | null>(null);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const onSubmit = async () => {
    setSubmitting(true);
    const response = await submitQuiz(
      lessonId,
      questions.map((q) => ({ question_id: q.id, selected_index: answers[q.id] }))
    );
    setSubmitting(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    const parsed = parseQuizResult(response.data);
    if (!parsed) return;

    setResult(parsed);
    setPracticing(false);
    if (!parsed.already_completed && parsed.points_earned > 0) {
      setCelebration(parsed);
    }
  };

  const resultByQuestion = new Map(result?.results.map((r) => [r.question_id, r]) ?? []);

  const view = !practicing ? (
    <Card className="mt-4 flex flex-col gap-3 rounded-2xl p-4">
      <span className="flex items-center gap-1.5 font-bold text-foreground">
        <HelpCircle className="h-4 w-4" aria-hidden />
        Mini Quiz sonucun: {(result ?? initialAttempt)!.correct_count}/
        {(result ?? initialAttempt)!.total_questions} doğru
      </span>
      {result && (
        <div className="flex flex-col gap-2">
          {questions.map((q, index) => {
            const r = resultByQuestion.get(q.id);
            return (
              <div key={q.id} className="text-sm">
                <p className="font-medium text-foreground">
                  {index + 1}. {q.question}
                </p>
                <p className={r?.correct ? "text-success" : "text-destructive"}>
                  {r?.correct ? "✓ Doğru" : `✗ Doğru cevap: ${q.options[r?.correct_index ?? 0]}`}
                </p>
              </div>
            );
          })}
        </div>
      )}
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setAnswers({});
          setResult(null);
          setPracticing(true);
        }}
        className="w-fit"
      >
        Tekrar Dene
      </Button>
    </Card>
  ) : (
    <Card className="mt-4 flex flex-col gap-4 rounded-2xl p-4">
      <span className="flex items-center gap-1.5 font-bold text-foreground">
        <HelpCircle className="h-4 w-4" aria-hidden />
        Mini Quiz — ek puan kazan!
      </span>
      {questions.map((q, index) => (
        <div key={q.id} className="flex flex-col gap-2">
          <p className="font-medium text-foreground">
            {index + 1}. {q.question}
          </p>
          <div className="flex flex-col gap-1.5">
            {q.options.map((option, i) => {
              const selected = answers[q.id] === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAnswers((state) => ({ ...state, [q.id]: i }))}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-left text-sm transition-colors",
                    selected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                      selected ? "border-primary bg-primary" : "border-muted-foreground/30"
                    )}
                  >
                    {selected && <Check className="h-3 w-3 text-primary-foreground" />}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <Button
        type="button"
        disabled={!allAnswered || submitting}
        onClick={onSubmit}
        className="h-12 w-fit rounded-2xl font-bold"
      >
        {submitting ? "Kontrol ediliyor…" : "Kontrol Et"}
      </Button>
    </Card>
  );

  return (
    <>
      {view}
      {celebration && (
        <CelebrationDialog
          result={celebration}
          prevPoints={initialPoints}
          onClose={() => setCelebration(null)}
          onMarkSeen={() => markBadgesSeen()}
        />
      )}
    </>
  );
}

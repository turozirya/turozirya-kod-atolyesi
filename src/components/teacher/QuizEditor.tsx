"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConfirmDeleteDialog } from "@/components/teacher/ConfirmDeleteDialog";
import { QuizQuestionDialog } from "@/components/teacher/QuizQuestionDialog";
import { deleteQuizQuestion } from "@/actions/quiz";
import type { Tables } from "@/types/database";

type QuestionRow = Tables<"lesson_quiz_questions">;

export function QuizEditor({
  lessonId,
  questions,
}: {
  lessonId: string;
  questions: QuestionRow[];
}) {
  return (
    <div className="flex flex-col gap-3 border-t pt-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold text-foreground">Mini Quiz</h2>
        <QuizQuestionDialog
          lessonId={lessonId}
          nextOrderIndex={questions.length}
          trigger={
            <Button type="button" size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Yeni Soru
            </Button>
          }
        />
      </div>

      {questions.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Henüz soru yok. Quiz eklersen öğrenciler ders sayfasında çözebilir ve ek puan
          kazanabilir.
        </p>
      )}

      <div className="flex flex-col gap-2">
        {questions.map((q, index) => (
          <Card key={q.id} className="flex items-start justify-between gap-3 rounded-2xl p-3">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="font-medium text-foreground">
                {index + 1}. {q.question}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {q.options.map((opt, i) => (
                  <Badge
                    key={i}
                    variant={i === q.correct_index ? "default" : "outline"}
                    className={i === q.correct_index ? "bg-success text-success-foreground" : ""}
                  >
                    {opt}
                  </Badge>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">+{q.points} puan</span>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <QuizQuestionDialog
                lessonId={lessonId}
                question={q}
                nextOrderIndex={questions.length}
                trigger={
                  <Button variant="outline" size="sm">
                    Düzenle
                  </Button>
                }
              />
              <ConfirmDeleteDialog
                trigger={
                  <Button variant="ghost" size="icon-sm" aria-label="Soruyu sil">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                }
                title="Soru silinsin mi?"
                description="Bu soru quizden kaldırılır."
                onConfirm={deleteQuizQuestion.bind(null, q.id, lessonId)}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

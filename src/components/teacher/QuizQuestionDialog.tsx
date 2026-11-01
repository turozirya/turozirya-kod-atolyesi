"use client";

import { useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Check, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { quizQuestionSchema, type QuizQuestionInput } from "@/lib/validations/quiz";
import { createQuizQuestion, updateQuizQuestion } from "@/actions/quiz";
import type { Tables } from "@/types/database";

type QuestionRow = Tables<"lesson_quiz_questions">;

function defaultsFor(nextOrderIndex: number, question?: QuestionRow): QuizQuestionInput {
  return question
    ? {
        question: question.question,
        options: question.options,
        correct_index: question.correct_index,
        explanation: question.explanation,
        points: question.points,
        order_index: question.order_index,
      }
    : {
        question: "",
        options: [],
        correct_index: 0,
        explanation: "",
        points: 5,
        order_index: nextOrderIndex,
      };
}

export function QuizQuestionDialog({
  lessonId,
  question,
  nextOrderIndex,
  trigger,
}: {
  lessonId: string;
  question?: QuestionRow;
  nextOrderIndex: number;
  trigger: ReactElement;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [optionInput, setOptionInput] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<QuizQuestionInput>({
    resolver: zodResolver(quizQuestionSchema),
    defaultValues: defaultsFor(nextOrderIndex, question),
  });

  const options = useWatch({ control, name: "options" });
  const correctIndex = useWatch({ control, name: "correct_index" });

  const addOption = () => {
    const value = optionInput.trim();
    if (!value) return;
    setValue("options", [...options, value]);
    setOptionInput("");
  };

  const removeOption = (index: number) => {
    const next = options.filter((_, i) => i !== index);
    setValue("options", next);
    if (correctIndex === index) {
      setValue("correct_index", 0);
    } else if (correctIndex > index) {
      setValue("correct_index", correctIndex - 1);
    }
  };

  const onSubmit = async (data: QuizQuestionInput) => {
    setServerError(null);
    setSubmitting(true);
    const result = question
      ? await updateQuizQuestion(question.id, lessonId, data)
      : await createQuizQuestion(lessonId, data);
    setSubmitting(false);
    if (result?.error) {
      setServerError(result.error);
      return;
    }
    toast.success(question ? "Soru güncellendi" : "Soru eklendi");
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          setServerError(null);
          reset(defaultsFor(nextOrderIndex, question));
        }
      }}
    >
      <DialogTrigger render={trigger} />
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{question ? "Soruyu Düzenle" : "Yeni Soru"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="quiz-question">Soru</Label>
            <Textarea id="quiz-question" rows={2} {...register("question")} />
            {errors.question && (
              <p className="text-sm text-destructive">{errors.question.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Seçenekler (doğru cevabı işaretle)</Label>
            <div className="flex flex-col gap-1.5">
              {options.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setValue("correct_index", index)}
                    aria-label={
                      correctIndex === index
                        ? "Doğru cevap (seçili)"
                        : "Bu seçeneği doğru cevap yap"
                    }
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-muted-foreground/30",
                      correctIndex === index && "border-success bg-success"
                    )}
                  >
                    {correctIndex === index && (
                      <Check className="h-4 w-4 text-success-foreground" />
                    )}
                  </button>
                  <Input value={item} readOnly className="bg-muted/50" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeOption(index)}
                    aria-label="Seçeneği sil"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Input
                value={optionInput}
                onChange={(e) => setOptionInput(e.target.value)}
                placeholder="Ör. A) 5 saniye"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addOption();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addOption}>
                Ekle
              </Button>
            </div>
            {errors.options && (
              <p className="text-sm text-destructive">{errors.options.message}</p>
            )}
            {errors.correct_index && (
              <p className="text-sm text-destructive">{errors.correct_index.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="quiz-explanation">Açıklama (doğru cevaptan sonra gösterilir)</Label>
            <Textarea id="quiz-explanation" rows={2} {...register("explanation")} />
            {errors.explanation && (
              <p className="text-sm text-destructive">{errors.explanation.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="quiz-points">Puan</Label>
            <Input
              id="quiz-points"
              type="number"
              min={0}
              {...register("points", { valueAsNumber: true })}
            />
          </div>

          {serverError && (
            <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
              {serverError}
            </p>
          )}

          <Button type="submit" disabled={submitting} className="mt-1 h-11 rounded-xl font-bold">
            {submitting ? "Kaydediliyor…" : "Kaydet"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

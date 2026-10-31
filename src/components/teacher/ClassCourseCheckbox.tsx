"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { toggleClassCourse } from "@/actions/classes";

export function ClassCourseCheckbox({
  classId,
  courseId,
  courseTitle,
  assigned,
}: {
  classId: string;
  courseId: string;
  courseTitle: string;
  assigned: boolean;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(assigned);
  const [pending, setPending] = useState(false);

  const toggle = async () => {
    const next = !checked;
    setChecked(next);
    setPending(true);
    const result = await toggleClassCourse(classId, courseId, next);
    setPending(false);
    if (result.error) {
      setChecked(!next);
      toast.error(result.error);
      return;
    }
    router.refresh();
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={pending}
      onClick={toggle}
      className={cn(
        "flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50",
        checked
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:text-foreground"
      )}
    >
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2",
          checked ? "border-primary bg-primary text-primary-foreground" : "border-border"
        )}
      >
        {checked && <Check className="h-3.5 w-3.5" />}
      </span>
      {courseTitle}
    </button>
  );
}

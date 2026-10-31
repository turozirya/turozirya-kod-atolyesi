import type { Json } from "@/types/database";

export type NextLesson = {
  course_slug: string;
  module_slug: string;
  lesson_slug: string;
  title: string;
};

export type NewBadge = {
  code: string;
  name: string;
  icon: string;
  color: string;
};

export type CompleteLessonResult = {
  already_completed: boolean;
  points_earned: number;
  total_points: number;
  new_badges: NewBadge[];
  module_completed: boolean;
  course_completed: boolean;
  next_lesson: NextLesson | null;
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

function parseNewBadges(value: Json | undefined): NewBadge[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const { code, name, icon, color } = item as Record<string, Json | undefined>;
    if (
      typeof code === "string" &&
      typeof name === "string" &&
      typeof icon === "string" &&
      typeof color === "string"
    ) {
      return [{ code, name, icon, color }];
    }
    return [];
  });
}

export function parseCompleteLessonResult(value: Json | undefined): CompleteLessonResult | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  const payload = value as Record<string, Json | undefined>;

  return {
    already_completed: payload.already_completed === true,
    points_earned: typeof payload.points_earned === "number" ? payload.points_earned : 0,
    total_points: typeof payload.total_points === "number" ? payload.total_points : 0,
    new_badges: parseNewBadges(payload.new_badges),
    module_completed: payload.module_completed === true,
    course_completed: payload.course_completed === true,
    next_lesson: parseNextLesson(payload.next_lesson),
  };
}

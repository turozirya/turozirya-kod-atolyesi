import { redirect } from "next/navigation";
import type { Json } from "@/types/database";

export function redirectToResumeTarget(data: Json): never {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    redirect("/dersler");
  }

  const target = data as Record<string, Json | undefined>;

  if (target.all_done === true && typeof target.course_slug === "string") {
    redirect(`/panel?kurs-bitti=${encodeURIComponent(target.course_slug)}`);
  }

  if (
    typeof target.course_slug === "string" &&
    typeof target.module_slug === "string" &&
    typeof target.lesson_slug === "string"
  ) {
    redirect(`/dersler/${target.course_slug}/${target.module_slug}/${target.lesson_slug}`);
  }

  redirect("/dersler");
}

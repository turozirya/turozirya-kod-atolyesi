import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LessonEditor } from "@/components/teacher/LessonEditor";

export default async function YeniDersPage({
  searchParams,
}: {
  searchParams: Promise<{ modul?: string }>;
}) {
  const { modul } = await searchParams;
  if (!modul) {
    notFound();
  }

  const supabase = await createClient();
  const { data: moduleRow } = await supabase
    .from("modules")
    .select("id")
    .eq("id", modul)
    .maybeSingle();
  if (!moduleRow) {
    notFound();
  }

  return <LessonEditor moduleId={modul} />;
}

import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { redirectToResumeTarget } from "@/lib/resume";

export default async function DevamKursPage({
  params,
}: {
  params: Promise<{ kurs: string }>;
}) {
  const { kurs } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", kurs)
    .maybeSingle();
  if (!course) {
    notFound();
  }

  const { data } = await supabase.rpc("get_resume_target", {
    p_course_id: course.id,
  });
  redirectToResumeTarget(data);
}

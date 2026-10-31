import { createClient } from "@/lib/supabase/server";
import { redirectToResumeTarget } from "@/lib/resume";

export default async function DevamPage() {
  const supabase = await createClient();
  const { data } = await supabase.rpc("get_resume_target");
  redirectToResumeTarget(data);
}

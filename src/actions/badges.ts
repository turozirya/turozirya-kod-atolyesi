"use server";

import { createClient } from "@/lib/supabase/server";

export async function markBadgesSeen(): Promise<void> {
  const supabase = await createClient();
  await supabase.rpc("mark_badges_seen");
}

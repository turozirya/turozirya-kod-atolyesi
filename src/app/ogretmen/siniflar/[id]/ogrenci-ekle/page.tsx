import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/session";
import { BulkCreateStudents } from "@/components/teacher/BulkCreateStudents";

export default async function OgrenciEklePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await requireRole("teacher");
  const supabase = await createClient();

  const { data: klass } = await supabase
    .from("classes")
    .select("id, name")
    .eq("id", id)
    .eq("teacher_id", profile.id)
    .maybeSingle();
  if (!klass) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 p-4 sm:p-6">
      <div>
        <Link
          href={`/ogretmen/siniflar/${id}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          ← {klass.name}
        </Link>
        <h1 className="font-heading text-2xl font-bold text-foreground">Toplu Öğrenci Ekle</h1>
      </div>

      <BulkCreateStudents classId={klass.id} className={klass.name} />
    </div>
  );
}

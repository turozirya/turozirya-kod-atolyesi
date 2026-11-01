"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { bulkCreateStudents } from "@/actions/students";

type CreatedStudent = { displayName: string; username: string; password: string };

export function BulkCreateStudents({
  classId,
  className,
}: {
  classId: string;
  className: string;
}) {
  const [rawNames, setRawNames] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState<CreatedStudent[] | null>(null);
  const [printMode, setPrintMode] = useState(false);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, "") ??
    "turozirya.vercel.app";

  const onSubmit = async () => {
    setSubmitting(true);
    const result = await bulkCreateStudents(classId, rawNames);
    setSubmitting(false);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    setCreated(result.created ?? []);
    toast.success(`${result.created?.length ?? 0} öğrenci oluşturuldu`);
  };

  if (printMode && created) {
    return (
      <div className="fixed inset-0 z-50 overflow-auto bg-white p-4 text-black print:p-0">
        <div className="mb-4 flex gap-2 print:hidden">
          <Button onClick={() => window.print()}>Yazdır</Button>
          <Button variant="outline" onClick={() => setPrintMode(false)}>
            Kapat
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 print:grid-cols-2 print:gap-2">
          {created.map((s) => (
            <div
              key={s.username}
              className="flex break-inside-avoid flex-col gap-1 rounded-xl border p-4 print:border-black"
            >
              <p className="text-xs text-gray-500">{siteUrl}</p>
              <p className="font-bold">{s.displayName}</p>
              <p className="text-sm">
                Kullanıcı adı: <span className="font-mono">{s.username}</span>
              </p>
              <p className="text-sm">
                Şifre: <span className="font-mono">{s.password}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (created) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          {created.length} öğrenci oluşturuldu. Şifreler yalnızca burada görünüyor — şimdi not
          al veya yazdır, sayfadan ayrılınca bir daha gösterilmeyecek.
        </p>
        <div className="flex flex-col gap-2">
          {created.map((s) => (
            <Card
              key={s.username}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl p-3 text-sm"
            >
              <span className="font-medium text-foreground">{s.displayName}</span>
              <span className="text-muted-foreground">
                {s.username} · <span className="font-mono">{s.password}</span>
              </span>
            </Card>
          ))}
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setPrintMode(true)}>Yazdırılabilir kartları göster</Button>
          <Button
            variant="outline"
            onClick={() => {
              setCreated(null);
              setRawNames("");
            }}
          >
            Yeni öğrenci ekle
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        Her satıra bir öğrenci adı yaz. {className} sınıfına eklenecekler.
      </p>
      <Textarea
        rows={10}
        placeholder={"Ayşe Yılmaz\nMehmet Demir\n..."}
        value={rawNames}
        onChange={(e) => setRawNames(e.target.value)}
      />
      <Button
        disabled={submitting || rawNames.trim().length === 0}
        onClick={onSubmit}
        className="h-11 w-fit rounded-xl font-bold"
      >
        {submitting ? "Oluşturuluyor…" : "Öğrencileri Oluştur"}
      </Button>
    </div>
  );
}

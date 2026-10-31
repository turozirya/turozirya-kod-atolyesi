"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = { id: string; label: string };

function labelFor(options: Option[], placeholder: string) {
  return (value: string | null) => options.find((o) => o.id === value)?.label ?? placeholder;
}

export function ProgressFilters({
  classes,
  courses,
  modules,
}: {
  classes: Option[];
  courses: Option[];
  modules: Option[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sinif = searchParams.get("sinif") ?? "";
  const kurs = searchParams.get("kurs") ?? "";
  const modul = searchParams.get("modul") ?? "";

  function navigate(next: { sinif?: string; kurs?: string; modul?: string }) {
    const params = new URLSearchParams();
    if (next.sinif) params.set("sinif", next.sinif);
    if (next.kurs) params.set("kurs", next.kurs);
    if (next.modul) params.set("modul", next.modul);
    router.push(`/ogretmen/ilerleme?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Select value={sinif} onValueChange={(value) => navigate({ sinif: value ?? undefined })}>
        <SelectTrigger className="w-48">
          <SelectValue>{labelFor(classes, "Sınıf seç")}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {classes.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={kurs}
        disabled={!sinif}
        onValueChange={(value) => navigate({ sinif, kurs: value ?? undefined })}
      >
        <SelectTrigger className="w-48">
          <SelectValue>{labelFor(courses, "Kurs seç")}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {courses.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={modul}
        disabled={!kurs}
        onValueChange={(value) => navigate({ sinif, kurs, modul: value ?? undefined })}
      >
        <SelectTrigger className="w-48">
          <SelectValue>{labelFor(modules, "Modül seç")}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {modules.map((m) => (
            <SelectItem key={m.id} value={m.id}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

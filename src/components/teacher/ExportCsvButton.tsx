"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

function csvEscape(value: string): string {
  if (/[;"\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function ExportCsvButton({ rows, filename }: { rows: string[][]; filename: string }) {
  const download = () => {
    const content =
      "﻿" + rows.map((row) => row.map(csvEscape).join(";")).join("\r\n");
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="outline" size="sm" onClick={download} className="gap-1.5">
      <Download className="h-4 w-4" />
      CSV İndir
    </Button>
  );
}

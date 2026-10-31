"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { regenerateJoinCode } from "@/actions/classes";

export function JoinCodeBadge({ classId, joinCode }: { classId: string; joinCode: string }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(joinCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Kopyalanamadı, kodu elle seçip kopyala.");
    }
  };

  const regenerate = async () => {
    setRegenerating(true);
    const result = await regenerateJoinCode(classId);
    setRegenerating(false);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Yeni katılım kodu üretildi");
    router.refresh();
  };

  return (
    <div className="flex items-center gap-1.5">
      <span className="rounded-lg bg-secondary px-2.5 py-1 font-mono text-sm font-bold tracking-wider text-secondary-foreground">
        {joinCode}
      </span>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={copy}
        aria-label="Kodu kopyala"
        title="Kodu kopyala"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={regenerate}
        disabled={regenerating}
        aria-label="Kodu yenile"
        title="Kodu yenile"
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
}

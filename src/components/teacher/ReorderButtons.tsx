"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReorderButtons({
  disableUp,
  disableDown,
  onReorder,
}: {
  disableUp?: boolean;
  disableDown?: boolean;
  onReorder: (direction: "up" | "down") => Promise<{ error?: string } | void>;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const handle = async (direction: "up" | "down") => {
    setPending(true);
    await onReorder(direction);
    setPending(false);
    router.refresh();
  };

  return (
    <div className="flex flex-col">
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        disabled={pending || disableUp}
        onClick={() => handle("up")}
        aria-label="Yukarı taşı"
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        disabled={pending || disableDown}
        onClick={() => handle("down")}
        aria-label="Aşağı taşı"
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
}

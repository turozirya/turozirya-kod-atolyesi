"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

export function PublishSwitch({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: (next: boolean) => Promise<{ error?: string } | void>;
}) {
  const router = useRouter();
  const [value, setValue] = useState(checked);
  const [pending, setPending] = useState(false);

  return (
    <Switch
      checked={value}
      disabled={pending}
      aria-label="Yayında"
      onCheckedChange={async (next) => {
        setValue(next);
        setPending(true);
        const result = await onToggle(next);
        setPending(false);
        if (result?.error) {
          setValue(!next);
          return;
        }
        router.refresh();
      }}
    />
  );
}

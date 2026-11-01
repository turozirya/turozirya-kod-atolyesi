"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { isEmbeddableToolUrl } from "@/lib/tools";

export function EmbeddedSimulator({ url, label }: { url: string; label: string }) {
  const [loaded, setLoaded] = useState(false);

  if (!isEmbeddableToolUrl(url)) {
    return null;
  }

  return (
    <div className="my-2 flex flex-col gap-2">
      {loaded ? (
        <iframe
          src={url}
          title={label}
          className="h-[600px] w-full rounded-2xl border"
          allow="clipboard-write"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="inline-flex h-11 w-fit items-center gap-2 rounded-2xl border-2 border-primary bg-primary/10 px-4 text-sm font-bold text-primary transition-colors hover:bg-primary/20"
        >
          <Play className="h-4 w-4" />
          Simülatörü Burada Aç
        </button>
      )}
    </div>
  );
}

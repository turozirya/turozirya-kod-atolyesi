"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

function storageKey(lessonId: string) {
  return `ders-konum:${lessonId}`;
}

export function ScrollPositionTracker({ lessonId }: { lessonId: string }) {
  const [savedPercent, setSavedPercent] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        const raw = localStorage.getItem(storageKey(lessonId));
        const percent = raw ? Number(raw) : NaN;
        if (!Number.isNaN(percent) && percent > 5) {
          setSavedPercent(percent);
        }
      } catch {
        // localStorage erişilemiyor (gizli sekme vb.) — sessizce yok say.
      }
    }, 0);

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - doc.clientHeight;
        const percent = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
        try {
          localStorage.setItem(storageKey(lessonId), String(Math.round(percent)));
        } catch {
          // localStorage erişilemiyor — sessizce yok say.
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [lessonId]);

  if (savedPercent === null || dismissed) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => {
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - doc.clientHeight;
        window.scrollTo({ top: (savedPercent / 100) * scrollable, behavior: "smooth" });
        setDismissed(true);
      }}
      className="fixed bottom-20 right-4 z-40 flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-lg sm:bottom-6"
    >
      <ArrowDown className="h-4 w-4" />
      Kaldığın yere git
    </button>
  );
}

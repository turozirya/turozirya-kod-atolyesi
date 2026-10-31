"use client";

import { Button } from "@/components/ui/button";

export default function OgrenciError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
      <span className="text-5xl" aria-hidden>
        🤖
      </span>
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Bir şeyler ters gitti
      </h1>
      <p className="text-muted-foreground">
        Sayfa yüklenirken bir sorun oldu. Tekrar dener misin?
      </p>
      <Button onClick={() => reset()} className="rounded-2xl">
        Tekrar dene
      </Button>
    </div>
  );
}

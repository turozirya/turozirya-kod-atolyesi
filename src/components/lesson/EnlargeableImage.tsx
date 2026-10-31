"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function EnlargeableImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger render={<button type="button" className="block" />}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt ?? ""}
          className="my-4 max-h-96 w-auto cursor-zoom-in rounded-xl border"
        />
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-2 sm:max-w-3xl">
        <DialogTitle className="sr-only">{alt || "Görsel"}</DialogTitle>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt ?? ""} className="w-full rounded-xl" />
      </DialogContent>
    </Dialog>
  );
}

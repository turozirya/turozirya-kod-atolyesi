"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { parseYouTubeId, toYouTubeNoCookieEmbedUrl } from "@/lib/youtube";

export function VideoEmbed({ url }: { url: string }) {
  const [loaded, setLoaded] = useState(false);
  const videoId = parseYouTubeId(url);
  const embedUrl = toYouTubeNoCookieEmbedUrl(url);

  if (!videoId || !embedUrl) {
    return null;
  }

  return (
    <div className="my-4 aspect-video w-full overflow-hidden rounded-2xl border bg-black">
      {loaded ? (
        <iframe
          src={`${embedUrl}?autoplay=1`}
          title="Ders videosu"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group relative h-full w-full"
          aria-label="Videoyu oynat"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
              <Play className="h-8 w-8 fill-foreground text-foreground" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

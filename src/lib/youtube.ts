const VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{6,20}$/;

export function parseYouTubeId(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\.|^m\./, "");
  let id: string | null = null;

  if (host === "youtu.be") {
    id = parsed.pathname.slice(1).split("/")[0] || null;
  } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (parsed.pathname === "/watch") {
      id = parsed.searchParams.get("v");
    } else {
      const match = parsed.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/);
      id = match ? match[1] : null;
    }
  }

  return id && VIDEO_ID_PATTERN.test(id) ? id : null;
}

export function toYouTubeNoCookieEmbedUrl(url: string): string | null {
  const id = parseYouTubeId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}

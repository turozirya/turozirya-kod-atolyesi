import { ExternalLink } from "lucide-react";
import { isAllowedToolUrl } from "@/lib/tools";

export function ToolButton({ url, label }: { url: string; label: string }) {
  if (!isAllowedToolUrl(url)) {
    return null;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-11 items-center gap-2 rounded-2xl border-2 border-primary bg-primary/10 px-4 text-sm font-bold text-primary transition-colors hover:bg-primary/20"
    >
      {label}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}

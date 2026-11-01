export const ALLOWED_TOOL_DOMAINS = [
  "makecode.microbit.org",
  "python.microbit.org",
  "wokwi.com",
  "tinkercad.com",
] as const;

// tinkercad.com X-Frame-Options: SAMEORIGIN gönderiyor, iframe'e gömülemez —
// diğerlerinde bu başlık yok, gömülebilirler (doğrulandı: curl -I ile kontrol edildi).
const EMBEDDABLE_TOOL_DOMAINS = [
  "makecode.microbit.org",
  "python.microbit.org",
  "wokwi.com",
] as const;

function matchesDomain(hostname: string, domains: readonly string[]): boolean {
  return domains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
}

export function isAllowedToolUrl(url: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:") {
    return false;
  }
  return matchesDomain(parsed.hostname, ALLOWED_TOOL_DOMAINS);
}

export function isEmbeddableToolUrl(url: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:") {
    return false;
  }
  return matchesDomain(parsed.hostname, EMBEDDABLE_TOOL_DOMAINS);
}

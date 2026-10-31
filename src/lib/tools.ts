export const ALLOWED_TOOL_DOMAINS = [
  "makecode.microbit.org",
  "python.microbit.org",
  "wokwi.com",
  "tinkercad.com",
] as const;

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
  return ALLOWED_TOOL_DOMAINS.some(
    (domain) => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
  );
}

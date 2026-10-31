const TURKISH_CHAR_MAP: Record<string, string> = {
  ç: "c",
  Ç: "c",
  ğ: "g",
  Ğ: "g",
  ı: "i",
  I: "i",
  İ: "i",
  ö: "o",
  Ö: "o",
  ş: "s",
  Ş: "s",
  ü: "u",
  Ü: "u",
};

export function turkishToAscii(input: string): string {
  return Array.from(input)
    .map((char) => TURKISH_CHAR_MAP[char] ?? char)
    .join("")
    .toLowerCase();
}

export function slugify(input: string): string {
  return turkishToAscii(input)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

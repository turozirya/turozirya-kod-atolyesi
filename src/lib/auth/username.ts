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

const USERNAME_PATTERN = /^[a-z0-9_]{3,20}$/;

export function isValidUsername(username: string): boolean {
  return USERNAME_PATTERN.test(username);
}

export function suggestUsername(displayName: string): string {
  const base = turkishToAscii(displayName)
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 20);
  return base.length >= 3 ? base : base.padEnd(3, "0");
}

export function usernameToEmail(username: string, domain: string): string {
  return `${username}@${domain}`;
}

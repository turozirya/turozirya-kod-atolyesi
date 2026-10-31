import { turkishToAscii } from "@/lib/text";

export { turkishToAscii };

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

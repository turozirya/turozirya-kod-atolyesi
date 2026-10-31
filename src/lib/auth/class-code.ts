const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // 0, O, 1, I hariç

export function generateJoinCode(): string {
  return Array.from(
    { length: 6 },
    () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  ).join("");
}

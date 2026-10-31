const SIMPLE_WORDS = [
  "kedi",
  "kopek",
  "aslan",
  "kaplan",
  "tavsan",
  "ayi",
  "kartal",
  "balina",
  "yunus",
  "ejder",
  "sahin",
  "baykus",
  "panda",
  "zurafa",
  "fil",
  "maymun",
  "penguen",
  "tilki",
  "kurt",
  "geyik",
];

export function generateSimplePassword(): string {
  const word = SIMPLE_WORDS[Math.floor(Math.random() * SIMPLE_WORDS.length)];
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `${word}${digits}`;
}

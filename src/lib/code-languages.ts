export const CODE_LANGUAGES = [
  { value: "blocks", label: "Bloklar (MakeCode)", shikiLang: null },
  { value: "sozde_kod", label: "Sözde Kod", shikiLang: null },
  { value: "micropython", label: "MicroPython", shikiLang: "python" },
  { value: "python", label: "Python", shikiLang: "python" },
  { value: "cpp", label: "C++ (Arduino)", shikiLang: "cpp" },
  { value: "javascript", label: "JavaScript", shikiLang: "javascript" },
] as const;

export type CodeLanguageValue = (typeof CODE_LANGUAGES)[number]["value"];

export function getShikiLang(value: string): string | null {
  return CODE_LANGUAGES.find((lang) => lang.value === value)?.shikiLang ?? null;
}

export function getCodeLanguageLabel(value: string): string {
  return CODE_LANGUAGES.find((lang) => lang.value === value)?.label ?? value;
}

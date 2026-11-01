const ISTANBUL_OFFSET_MS = 3 * 60 * 60 * 1000; // Türkiye 2016'dan beri sabit UTC+3, DST yok

/** İstanbul saatiyle içinde bulunulan haftanın Pazartesi 00:00'ının UTC ISO karşılığı. */
export function getWeekStartIso(now: Date = new Date()): string {
  const istanbul = new Date(now.getTime() + ISTANBUL_OFFSET_MS);
  const dayIndex = (istanbul.getUTCDay() + 6) % 7; // Pzt=0 ... Paz=6
  const monday = new Date(
    Date.UTC(istanbul.getUTCFullYear(), istanbul.getUTCMonth(), istanbul.getUTCDate() - dayIndex)
  );
  return new Date(monday.getTime() - ISTANBUL_OFFSET_MS).toISOString();
}

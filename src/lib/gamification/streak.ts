function toDayCount(day: string): number {
  return Math.floor(new Date(`${day}T00:00:00Z`).getTime() / 86_400_000);
}

/**
 * `days`: activity_days.day değerleri (YYYY-MM-DD, sırasız olabilir).
 * `today`: Europe/Istanbul gününün YYYY-MM-DD'si (varsayılan: gerçek bugün).
 */
export function getCurrentStreak(days: string[], today: string = todayIso()): number {
  const daySet = new Set(days.map(toDayCount));
  const todayCount = toDayCount(today);

  let streak = 0;
  let cursor = todayCount;
  while (daySet.has(cursor)) {
    streak += 1;
    cursor -= 1;
  }
  return streak;
}

export function longestStreak(days: string[]): number {
  if (days.length === 0) return 0;

  const sorted = [...new Set(days.map(toDayCount))].sort((a, b) => a - b);

  let longest = 1;
  let current = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1] + 1) {
      current += 1;
    } else {
      current = 1;
    }
    longest = Math.max(longest, current);
  }
  return longest;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

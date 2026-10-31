export type Level = {
  level: number;
  name: string;
  currentMin: number;
  nextMin: number | null;
  progressPercent: number;
};

const LEVELS = [
  { level: 1, name: "Kod Çaylağı", min: 0 },
  { level: 2, name: "Kod Çırağı", min: 50 },
  { level: 3, name: "Devre Kaşifi", min: 150 },
  { level: 4, name: "Sensör Avcısı", min: 300 },
  { level: 5, name: "Robot Ustası", min: 500 },
  { level: 6, name: "micro:bit Kahramanı", min: 800 },
  { level: 7, name: "Kodlama Efsanesi", min: 1200 },
] as const;

export function getLevel(points: number): Level {
  const safePoints = Math.max(0, points);

  let currentIndex = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (safePoints >= LEVELS[i].min) {
      currentIndex = i;
    }
  }

  const current = LEVELS[currentIndex];
  const next = LEVELS[currentIndex + 1] ?? null;
  const progressPercent = next
    ? Math.min(
        100,
        Math.round(((safePoints - current.min) / (next.min - current.min)) * 100)
      )
    : 100;

  return {
    level: current.level,
    name: current.name,
    currentMin: current.min,
    nextMin: next ? next.min : null,
    progressPercent,
  };
}

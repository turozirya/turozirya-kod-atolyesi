const DAY_LABELS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

export function WeeklyBarChart({ data }: { data: { date: string; count: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));

  return (
    <div className="flex h-32 items-end gap-2">
      {data.map((d) => {
        const date = new Date(`${d.date}T00:00:00`);
        const dayIndex = (date.getDay() + 6) % 7; // Pazartesi=0
        return (
          <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-xs font-medium text-muted-foreground">{d.count}</span>
            <div
              className="w-full rounded-t-md bg-primary"
              style={{ height: `${Math.max(4, (d.count / max) * 80)}px` }}
            />
            <span className="text-xs text-muted-foreground">{DAY_LABELS[dayIndex]}</span>
          </div>
        );
      })}
    </div>
  );
}

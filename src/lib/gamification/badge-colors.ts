export const BADGE_COLORS = {
  amber: {
    bg: "bg-amber-400",
    bgSoft: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-300",
  },
  emerald: {
    bg: "bg-emerald-500",
    bgSoft: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-300",
  },
  sky: {
    bg: "bg-sky-500",
    bgSoft: "bg-sky-100",
    text: "text-sky-700",
    border: "border-sky-300",
  },
  violet: {
    bg: "bg-violet-500",
    bgSoft: "bg-violet-100",
    text: "text-violet-700",
    border: "border-violet-300",
  },
  pink: {
    bg: "bg-pink-500",
    bgSoft: "bg-pink-100",
    text: "text-pink-700",
    border: "border-pink-300",
  },
  orange: {
    bg: "bg-orange-500",
    bgSoft: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-300",
  },
} as const;

export type BadgeColorKey = keyof typeof BADGE_COLORS;

const DEFAULT_BADGE_COLOR: BadgeColorKey = "amber";

export function getBadgeColorClasses(color: string) {
  return BADGE_COLORS[color as BadgeColorKey] ?? BADGE_COLORS[DEFAULT_BADGE_COLOR];
}

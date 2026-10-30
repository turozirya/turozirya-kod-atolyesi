export const MODULE_COLORS = {
  violet: {
    bg: "bg-violet-500",
    bgSoft: "bg-violet-100",
    text: "text-violet-700",
    border: "border-violet-300",
    ring: "ring-violet-400",
  },
  sky: {
    bg: "bg-sky-500",
    bgSoft: "bg-sky-100",
    text: "text-sky-700",
    border: "border-sky-300",
    ring: "ring-sky-400",
  },
  emerald: {
    bg: "bg-emerald-500",
    bgSoft: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-300",
    ring: "ring-emerald-400",
  },
  orange: {
    bg: "bg-orange-500",
    bgSoft: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-300",
    ring: "ring-orange-400",
  },
  pink: {
    bg: "bg-pink-500",
    bgSoft: "bg-pink-100",
    text: "text-pink-700",
    border: "border-pink-300",
    ring: "ring-pink-400",
  },
  teal: {
    bg: "bg-teal-500",
    bgSoft: "bg-teal-100",
    text: "text-teal-700",
    border: "border-teal-300",
    ring: "ring-teal-400",
  },
} as const;

export type ModuleColorKey = keyof typeof MODULE_COLORS;

const DEFAULT_MODULE_COLOR: ModuleColorKey = "violet";

export function getModuleColorClasses(color: string) {
  return MODULE_COLORS[color as ModuleColorKey] ?? MODULE_COLORS[DEFAULT_MODULE_COLOR];
}

import {
  Battery,
  Bluetooth,
  Bot,
  Camera,
  CircuitBoard,
  Cog,
  Compass,
  Cpu,
  Gamepad2,
  Lightbulb,
  Music,
  Puzzle,
  Radio,
  Rocket,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const ICON_REGISTRY: Record<string, LucideIcon> = {
  cpu: Cpu,
  cog: Cog,
  zap: Zap,
  lightbulb: Lightbulb,
  radio: Radio,
  music: Music,
  "gamepad-2": Gamepad2,
  rocket: Rocket,
  wrench: Wrench,
  bluetooth: Bluetooth,
  battery: Battery,
  camera: Camera,
  compass: Compass,
  sparkles: Sparkles,
  bot: Bot,
  "circuit-board": CircuitBoard,
  puzzle: Puzzle,
};

export const ICON_OPTIONS = Object.keys(ICON_REGISTRY) as (keyof typeof ICON_REGISTRY)[];

export function getIconComponent(name: string): LucideIcon {
  return ICON_REGISTRY[name] ?? Cpu;
}

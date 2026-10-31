"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export const AVATAR_KEYS = [
  "robot-1",
  "robot-2",
  "robot-3",
  "robot-4",
  "robot-5",
  "robot-6",
  "robot-7",
  "robot-8",
] as const;

export function AvatarPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (avatar: string) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Avatar seç"
      className="grid grid-cols-4 gap-3 sm:grid-cols-8"
    >
      {AVATAR_KEYS.map((key) => (
        <button
          key={key}
          type="button"
          role="radio"
          aria-checked={value === key}
          aria-label={`${key} avatarı`}
          onClick={() => onChange(key)}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full border-2 bg-card p-1 transition-transform hover:scale-105",
            value === key
              ? "border-primary ring-2 ring-primary/50"
              : "border-border"
          )}
        >
          <Image
            src={`/avatars/${key}.svg`}
            alt=""
            width={48}
            height={48}
            className="h-full w-full"
          />
        </button>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function MaterialsBox({ materials }: { materials: string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  if (materials.length === 0) {
    return null;
  }

  return (
    <div className="my-4 rounded-2xl border-2 border-violet-200 bg-violet-50 p-4">
      <h3 className="mb-2 font-heading text-sm font-bold text-violet-900">
        Bu derste gerekenler
      </h3>
      <ul className="flex flex-col gap-1">
        {materials.map((item, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() =>
                setChecked((state) => ({ ...state, [index]: !state[index] }))
              }
              className="flex w-full items-center gap-2 rounded-lg px-1 py-1.5 text-left text-sm text-violet-900 hover:bg-violet-100"
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-violet-400",
                  checked[index] && "border-violet-500 bg-violet-500"
                )}
              >
                {checked[index] && <Check className="h-3.5 w-3.5 text-white" />}
              </span>
              <span className={cn(checked[index] && "opacity-60 line-through")}>
                {item}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

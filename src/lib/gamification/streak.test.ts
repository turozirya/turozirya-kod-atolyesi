import { describe, expect, it } from "vitest";
import { getCurrentStreak, longestStreak } from "./streak";

describe("getCurrentStreak", () => {
  it("returns 0 for an empty list", () => {
    expect(getCurrentStreak([], "2026-10-31")).toBe(0);
  });

  it("returns 1 when only today is active", () => {
    expect(getCurrentStreak(["2026-10-31"], "2026-10-31")).toBe(1);
  });

  it("returns 0 when the streak broke before today", () => {
    expect(getCurrentStreak(["2026-10-29"], "2026-10-31")).toBe(0);
  });

  it("counts consecutive days ending today", () => {
    const days = ["2026-10-31", "2026-10-30", "2026-10-29", "2026-10-28", "2026-10-27"];
    expect(getCurrentStreak(days, "2026-10-31")).toBe(5);
  });

  it("stops at the first gap", () => {
    const days = ["2026-10-31", "2026-10-30", "2026-10-28"];
    expect(getCurrentStreak(days, "2026-10-31")).toBe(2);
  });

  it("ignores duplicate entries", () => {
    const days = ["2026-10-31", "2026-10-31", "2026-10-30"];
    expect(getCurrentStreak(days, "2026-10-31")).toBe(2);
  });
});

describe("longestStreak", () => {
  it("returns 0 for an empty list", () => {
    expect(longestStreak([])).toBe(0);
  });

  it("returns 1 for a single day", () => {
    expect(longestStreak(["2026-10-31"])).toBe(1);
  });

  it("finds the longest run among gaps", () => {
    const days = [
      "2026-10-01",
      "2026-10-02",
      "2026-10-05",
      "2026-10-06",
      "2026-10-07",
      "2026-10-08",
    ];
    expect(longestStreak(days)).toBe(4);
  });

  it("is unaffected by input order", () => {
    const days = ["2026-10-08", "2026-10-06", "2026-10-07"];
    expect(longestStreak(days)).toBe(3);
  });
});

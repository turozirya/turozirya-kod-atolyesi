import { describe, expect, it } from "vitest";
import { getLevel } from "./levels";

describe("getLevel", () => {
  it("returns level 1 for 0 points", () => {
    const level = getLevel(0);
    expect(level.level).toBe(1);
    expect(level.name).toBe("Kod Çaylağı");
    expect(level.nextMin).toBe(50);
  });

  it("stays at level 1 just below the level 2 threshold", () => {
    expect(getLevel(49).level).toBe(1);
  });

  it("reaches level 2 exactly at its threshold", () => {
    const level = getLevel(50);
    expect(level.level).toBe(2);
    expect(level.name).toBe("Kod Çırağı");
  });

  it("stays at level 6 just below the top threshold", () => {
    expect(getLevel(1199).level).toBe(6);
  });

  it("reaches the top level at its threshold with full progress", () => {
    const level = getLevel(1200);
    expect(level.level).toBe(7);
    expect(level.name).toBe("Kodlama Efsanesi");
    expect(level.nextMin).toBeNull();
    expect(level.progressPercent).toBe(100);
  });

  it("does not overflow past the top level", () => {
    expect(getLevel(5000).level).toBe(7);
  });

  it("treats negative points as zero", () => {
    const level = getLevel(-10);
    expect(level.level).toBe(1);
    expect(level.currentMin).toBe(0);
  });

  it("computes progress toward the next level", () => {
    const level = getLevel(100);
    expect(level.level).toBe(2);
    expect(level.currentMin).toBe(50);
    expect(level.nextMin).toBe(150);
    expect(level.progressPercent).toBe(50);
  });
});

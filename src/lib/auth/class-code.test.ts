import { describe, expect, it } from "vitest";
import { generateJoinCode } from "./class-code";

describe("generateJoinCode", () => {
  it("returns a 6 character code", () => {
    expect(generateJoinCode()).toHaveLength(6);
  });

  it("only uses the allowed alphabet", () => {
    for (let i = 0; i < 50; i++) {
      expect(generateJoinCode()).toMatch(/^[A-HJ-NP-Z2-9]{6}$/);
    }
  });

  it("never contains confusing characters", () => {
    for (let i = 0; i < 50; i++) {
      expect(generateJoinCode()).not.toMatch(/[01OI]/);
    }
  });
});

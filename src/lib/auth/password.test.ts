import { describe, expect, it } from "vitest";
import { generateSimplePassword } from "./password";

describe("generateSimplePassword", () => {
  it("matches the word+4digit format", () => {
    for (let i = 0; i < 50; i++) {
      expect(generateSimplePassword()).toMatch(/^[a-z]+[0-9]{4}$/);
    }
  });

  it("is at least 7 characters long (shortest word + 4 digits)", () => {
    for (let i = 0; i < 50; i++) {
      expect(generateSimplePassword().length).toBeGreaterThanOrEqual(7);
    }
  });
});

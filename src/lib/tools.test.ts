import { describe, expect, it } from "vitest";
import { isAllowedToolUrl } from "./tools";

describe("isAllowedToolUrl", () => {
  it("accepts an allowed domain", () => {
    expect(isAllowedToolUrl("https://makecode.microbit.org/_abc123")).toBe(true);
  });

  it("accepts an allowed subdomain", () => {
    expect(isAllowedToolUrl("https://preview.wokwi.com/projects/123")).toBe(true);
  });

  it("rejects a domain not on the list", () => {
    expect(isAllowedToolUrl("https://evil.example.com")).toBe(false);
  });

  it("rejects a lookalike domain", () => {
    expect(isAllowedToolUrl("https://wokwi.com.evil.com")).toBe(false);
  });

  it("rejects non-https urls", () => {
    expect(isAllowedToolUrl("http://wokwi.com")).toBe(false);
  });

  it("rejects invalid urls", () => {
    expect(isAllowedToolUrl("not a url")).toBe(false);
  });
});

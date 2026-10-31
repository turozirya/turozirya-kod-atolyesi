import { describe, expect, it } from "vitest";
import { slugify, turkishToAscii } from "./text";

describe("slugify", () => {
  it("converts Turkish titles into url-safe slugs", () => {
    expect(slugify("micro:bit ile Tanışma")).toBe("micro-bit-ile-tanisma");
  });

  it("collapses repeated separators and trims edges", () => {
    expect(slugify("  Işık Sensörü!!  ")).toBe("isik-sensoru");
  });

  it("keeps numbers", () => {
    expect(slugify("A ve B Butonları (2)")).toBe("a-ve-b-butonlari-2");
  });
});

describe("turkishToAscii", () => {
  it("still handles the dotted/dotless I edge case", () => {
    expect(turkishToAscii("İvmeölçer")).toBe("ivmeolcer");
  });
});

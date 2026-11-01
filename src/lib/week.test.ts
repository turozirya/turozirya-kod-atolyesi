import { describe, expect, it } from "vitest";
import { getWeekStartIso } from "./week";

describe("getWeekStartIso", () => {
  it("Pazartesi sabahı (İstanbul) için aynı günün başlangıcını döner", () => {
    // 2024-01-01T00:00:00Z = 2024-01-01T03:00 İstanbul (Pazartesi)
    expect(getWeekStartIso(new Date("2024-01-01T00:00:00Z"))).toBe(
      "2023-12-31T21:00:00.000Z"
    );
  });

  it("Pazar gecesi (İstanbul'da hâlâ Pazar) için önceki Pazartesi'yi döner", () => {
    // 2024-01-07T20:59:59Z = 2024-01-07T23:59:59 İstanbul (hâlâ Pazar)
    expect(getWeekStartIso(new Date("2024-01-07T20:59:59Z"))).toBe(
      "2023-12-31T21:00:00.000Z"
    );
  });

  it("Pazar gece yarısını geçince (İstanbul'da Pazartesi) yeni haftayı döner", () => {
    // 2024-01-07T21:00:00Z = 2024-01-08T00:00:00 İstanbul (Pazartesi başlangıcı)
    expect(getWeekStartIso(new Date("2024-01-07T21:00:00Z"))).toBe(
      "2024-01-07T21:00:00.000Z"
    );
  });

  it("hafta ortasında (Çarşamba) o haftanın Pazartesi'sini döner", () => {
    expect(getWeekStartIso(new Date("2024-01-03T12:00:00Z"))).toBe(
      "2023-12-31T21:00:00.000Z"
    );
  });

  it("parametre verilmezse geçerli bir ISO zaman damgası döner", () => {
    expect(() => new Date(getWeekStartIso())).not.toThrow();
    expect(getWeekStartIso().endsWith("Z")).toBe(true);
  });
});

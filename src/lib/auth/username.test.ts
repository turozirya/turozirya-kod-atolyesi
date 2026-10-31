import { describe, expect, it } from "vitest";
import {
  isValidUsername,
  suggestUsername,
  turkishToAscii,
  usernameToEmail,
} from "./username";

describe("turkishToAscii", () => {
  it("converts lowercase Turkish characters", () => {
    expect(turkishToAscii("çğıöşü")).toBe("cgiosu");
  });

  it("converts uppercase Turkish characters", () => {
    expect(turkishToAscii("ÇĞİÖŞÜ")).toBe("cgiosu");
  });

  it("handles the dotless/dotted I edge case correctly", () => {
    // JS'in yerel ayardan bağımsız toLowerCase()'i "İ" harfini "i̇" (iki
    // karakter) yapar; bu özel eşleme olmadan bu test kırılır.
    expect(turkishToAscii("İstanbul")).toBe("istanbul");
    expect(turkishToAscii("Işık")).toBe("isik");
  });

  it("leaves plain ascii untouched besides casing", () => {
    expect(turkishToAscii("Ahmet123")).toBe("ahmet123");
  });
});

describe("isValidUsername", () => {
  it("accepts a valid username", () => {
    expect(isValidUsername("ahmet_01")).toBe(true);
  });

  it("rejects usernames shorter than 3 characters", () => {
    expect(isValidUsername("ab")).toBe(false);
  });

  it("rejects usernames longer than 20 characters", () => {
    expect(isValidUsername("a".repeat(21))).toBe(false);
  });

  it("rejects uppercase letters and symbols", () => {
    expect(isValidUsername("Ahmet!")).toBe(false);
  });
});

describe("suggestUsername", () => {
  it("strips Turkish characters, spaces and symbols", () => {
    expect(suggestUsername("Çağrı Öztürk")).toBe("cagriozturk");
  });

  it("pads usernames shorter than 3 characters", () => {
    expect(suggestUsername("Al")).toBe("al0");
  });
});

describe("usernameToEmail", () => {
  it("builds the fake student email", () => {
    expect(usernameToEmail("ahmet_01", "ogrenci.kodlamakulubu.local")).toBe(
      "ahmet_01@ogrenci.kodlamakulubu.local"
    );
  });
});

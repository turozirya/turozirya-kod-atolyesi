import { describe, expect, it } from "vitest";
import { parseYouTubeId, toYouTubeNoCookieEmbedUrl } from "./youtube";

describe("parseYouTubeId", () => {
  it("parses a standard watch url", () => {
    expect(parseYouTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(
      "dQw4w9WgXcQ"
    );
  });

  it("parses a watch url with extra query params", () => {
    expect(
      parseYouTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10s&si=abc")
    ).toBe("dQw4w9WgXcQ");
  });

  it("parses a short youtu.be url", () => {
    expect(parseYouTubeId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("parses an embed url", () => {
    expect(parseYouTubeId("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe(
      "dQw4w9WgXcQ"
    );
  });

  it("parses a youtube-nocookie embed url", () => {
    expect(
      parseYouTubeId("https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ")
    ).toBe("dQw4w9WgXcQ");
  });

  it("parses a shorts url", () => {
    expect(parseYouTubeId("https://www.youtube.com/shorts/dQw4w9WgXcQ")).toBe(
      "dQw4w9WgXcQ"
    );
  });

  it("returns null for a non-YouTube url", () => {
    expect(parseYouTubeId("https://vimeo.com/12345")).toBeNull();
  });

  it("returns null for an invalid url", () => {
    expect(parseYouTubeId("not a url")).toBeNull();
  });
});

describe("toYouTubeNoCookieEmbedUrl", () => {
  it("builds a privacy-friendly embed url", () => {
    expect(
      toYouTubeNoCookieEmbedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    ).toBe("https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
  });

  it("returns null when the input isn't a YouTube url", () => {
    expect(toYouTubeNoCookieEmbedUrl("https://example.com")).toBeNull();
  });
});

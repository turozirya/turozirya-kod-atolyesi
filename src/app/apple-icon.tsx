import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#8B5CF6",
          borderRadius: 44,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            background: "#FAF8FF",
            borderRadius: 24,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#211A33",
            }}
          />
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#211A33",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}

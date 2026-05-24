import { ImageResponse } from "next/og";

export const alt = "Mbwira — Speak to me. A companion for young Rwandans.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered with ImageResponse's built-in face (not Fraunces) on purpose:
// no external font fetch means the OG card can never fail a build or a
// request. The palette carries the brand even without the serif.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          backgroundColor: "#F7F4EE",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#6B6357",
          }}
        >
          A first door · Kigali
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", marginTop: 28 }}>
          <div style={{ fontSize: 150, color: "#1F1B16", lineHeight: 1 }}>
            Mbwira
          </div>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 24,
              backgroundColor: "#C8553D",
              marginLeft: 22,
              marginTop: 18,
            }}
          />
        </div>
        <div style={{ fontSize: 42, color: "#1F1B16", marginTop: 28 }}>
          Speak to me.
        </div>
        <div style={{ fontSize: 30, color: "#6B6357", marginTop: 14 }}>
          An anonymous mental-health companion for young Rwandans.
        </div>
      </div>
    ),
    { ...size }
  );
}

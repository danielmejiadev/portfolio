import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const dynamic = "force-static";
export const alt = "Daniel Mejía — Senior / Lead Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#090c14",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(109,139,255,0.35), transparent 55%), radial-gradient(circle at 85% 85%, rgba(63,217,199,0.28), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: 20,
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.16)",
            color: "#3fd9c7",
            fontSize: 30,
            fontWeight: 700,
            marginBottom: 44,
          }}
        >
          DM
        </div>

        <div style={{ display: "flex", color: "#eef1f8", fontSize: 72, fontWeight: 700, letterSpacing: "-0.02em" }}>
          {profile.name}
        </div>

        <div style={{ display: "flex", color: "#a6adc0", fontSize: 32, marginTop: 20, maxWidth: 900 }}>
          {profile.role}
        </div>

        <div style={{ display: "flex", color: "#3fd9c7", fontSize: 24, marginTop: 28, letterSpacing: "0.02em" }}>
          {profile.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}

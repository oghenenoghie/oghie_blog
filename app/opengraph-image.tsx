import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Oghie Blog — Affiliate Marketing Guides";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0F172A",
          padding: "80px",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Gold top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            backgroundColor: "#EF9F27",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "4px",
            marginBottom: "32px",
          }}
        >
          <span style={{ fontSize: "48px", fontWeight: 900, color: "#fff" }}>
            Oghie
          </span>
          <span style={{ fontSize: "48px", fontWeight: 900, color: "#EF9F27" }}>
            Blog
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "56px",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.15,
            margin: "0 0 24px",
            maxWidth: "800px",
          }}
        >
          Affiliate Marketing Guides That Actually Help You Qualify
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "28px",
            color: "#94A3B8",
            lineHeight: 1.5,
            maxWidth: "680px",
            margin: 0,
          }}
        >
          Honest guides to finding affiliate programs, getting approved, and earning commissions.
        </p>

        {/* Bottom row */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            right: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "20px", color: "#64748B" }}>
            oghieblog.com
          </span>
          <span
            style={{
              fontSize: "18px",
              color: "#0F172A",
              backgroundColor: "#EF9F27",
              padding: "8px 20px",
              borderRadius: "6px",
              fontWeight: 700,
            }}
          >
            Subscribe Free →
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}

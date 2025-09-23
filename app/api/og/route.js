// app/api/og/route.js
export const runtime = "edge";

import { ImageResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 120) || "NinePlans";

  // Optional: load your logo
  const logoUrl = new URL("/logo.svg", request.url).toString();

  return new ImageResponse(
    (
      <div
        style={{
          height: "630px",
          width: "1200px",
          display: "flex",
          background: "black",
          color: "white",
          padding: "60px",
          justifyContent: "space-between",
          alignItems: "stretch",
          fontSize: 42,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "70%" }}>
          <div style={{ fontSize: 54, fontWeight: 700, lineHeight: 1.2, whiteSpace: "pre-wrap" }}>
            {title}
          </div>
          <div style={{ fontSize: 24, opacity: 0.9 }}>
            Write anything — real name or alias
          </div>
          <div style={{ fontSize: 20, opacity: 0.7 }}>nineplans.com</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {/* logo */}
          {/* Using img ensures SVG renders */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            alt=""
            height={96}
            width={96}
            style={{ borderRadius: 12, background: "white", padding: 12 }}
          />
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

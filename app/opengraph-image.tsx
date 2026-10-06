import { ImageResponse } from "next/og"
export const alt = "The Code Lawyers — Software Engineering & AI Automation"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px", background: "#08080b", color: "#f5f4ff", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", fontSize: 27, color: "#b5a5ef", letterSpacing: 4 }}>THE CODE LAWYERS</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 74, fontWeight: 700, lineHeight: 1.1 }}>Software. AI. Real impact.</div>
        <div style={{ fontSize: 28, color: "#bbb6cf" }}>Custom software · AI agents · Workflow automation</div>
      </div>
      <div style={{ display: "flex", fontSize: 23, color: "#b5a5ef" }}>thecodelawyers.com</div>
    </div>, size)
}

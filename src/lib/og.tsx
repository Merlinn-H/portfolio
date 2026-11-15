import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Carton de générique 1200×630 : sur-titre, grand titre, signature. Généré au build. */
export function ogImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  const font = fs.readFileSync(path.join(process.cwd(), "node_modules/@fontsource/gloock/files/gloock-latin-400-normal.woff"));
  // Ajuste la taille pour tenir sur ~2 lignes (les capitales de Gloock sont larges).
  const caps = title === title.toUpperCase();
  const longest = Math.max(...title.split(" ").map((w) => w.length));
  const size = Math.round(Math.min(156, 1040 / (longest * (caps ? 0.78 : 0.56)), title.length > 24 ? 104 : 156));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e0c0a",
          color: "#ede6d9",
          padding: "64px 72px",
          borderTop: "36px solid #080706",
          borderBottom: "36px solid #080706",
          fontFamily: "Gloock",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: "#ef4130" }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", fontSize: size, lineHeight: 0.95, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", fontSize: 30, color: "#a39d93" }}>{footer}</div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Gloock", data: font, weight: 400, style: "normal" }] },
  );
}

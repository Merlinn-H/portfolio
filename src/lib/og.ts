import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";

/** Carton de générique 1200×630 (sur-titre, grand titre, signature), généré au build en PNG. */
export async function ogPng({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  const font = fs.readFileSync(path.join(process.cwd(), "src/fonts/og-fraunces.ttf"));
  // Ajuste la taille pour tenir sur ~2 lignes (les capitales sont larges).
  const caps = title === title.toUpperCase();
  const longest = Math.max(...title.split(" ").map((w) => w.length));
  const size = Math.round(Math.min(156, 1040 / (longest * (caps ? 0.74 : 0.54)), title.length > 24 ? 104 : 156));
  const el = (style: Record<string, unknown>, children: unknown) => ({
    type: "div",
    props: { style: { display: "flex", ...style }, children },
  });
  const tree = el(
    {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      background: "#0b0a09",
      color: "#f2ebdf",
      padding: "64px 72px",
      borderTop: "36px solid #060505",
      borderBottom: "36px solid #060505",
      fontFamily: "Fraunces",
    },
    [
      el({ fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: "#d9b26a" }, eyebrow),
      el({ fontSize: size, lineHeight: 0.95, maxWidth: 1000 }, title),
      el({ fontSize: 30, color: "#c2baae" }, footer),
    ],
  );
  // @ts-expect-error — satori accepte des objets « élément » sans JSX.
  const svg = await satori(tree, {
    width: 1200,
    height: 630,
    fonts: [{ name: "Fraunces", data: font, weight: 400, style: "normal" }],
  });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
}

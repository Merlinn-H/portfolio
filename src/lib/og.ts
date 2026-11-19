import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";

/** Carton de générique 1200×630 (sur-titre, grand titre, signature), généré au build en PNG. */
export async function ogPng({
  eyebrow,
  title,
  footer,
  image,
}: {
  eyebrow: string;
  title: string;
  footer: string;
  /** Chemin d'une image du projet (ex. "/src/assets/images/…") : utilisée en fond, assombrie. */
  image?: string | null;
}) {
  let backdrop: string | null = null;
  if (image && fs.existsSync(path.join(process.cwd(), image))) {
    const buf = await sharp(path.join(process.cwd(), image))
      .resize(1200, 630, { fit: "cover" })
      .modulate({ brightness: 0.36, saturation: 0.8 })
      .jpeg({ quality: 78 })
      .toBuffer();
    backdrop = `data:image/jpeg;base64,${buf.toString("base64")}`;
  }
  const font = fs.readFileSync(path.join(process.cwd(), "src/fonts/og-open-sans-700.woff"));
  // Ajuste la taille pour tenir sur ~2 lignes (les capitales sont larges).
  const caps = title === title.toUpperCase();
  const longest = Math.max(...title.split(" ").map((w) => w.length));
  const size = Math.round(Math.min(140, 1040 / (longest * (caps ? 0.72 : 0.6)), title.length > 24 ? 96 : 140));
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
      background: "#121212",
      ...(backdrop ? { backgroundImage: `url(${backdrop})`, backgroundSize: "1200px 630px" } : {}),
      color: "#f2f0ec",
      padding: "64px 72px",
      borderTop: "16px solid #c91517",
      borderBottom: "16px solid #0a0a0a",
      fontFamily: "Open Sans",
    },
    [
      el({ fontSize: 24, letterSpacing: 9, textTransform: "uppercase", color: "#f0544b" }, eyebrow),
      el({ fontSize: size, lineHeight: 1, letterSpacing: -2, maxWidth: 1000 }, title),
      el({ fontSize: 28, color: "#bcb8b2" }, footer),
    ],
  );
  // @ts-expect-error — satori accepte des objets « élément » sans JSX.
  const svg = await satori(tree, {
    width: 1200,
    height: 630,
    fonts: [{ name: "Open Sans", data: font, weight: 700, style: "normal" }],
  });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
}

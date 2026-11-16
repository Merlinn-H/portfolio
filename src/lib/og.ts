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
      ...(backdrop ? { backgroundImage: `url(${backdrop})`, backgroundSize: "1200px 630px" } : {}),
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

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { t } from "@/lib/i18n";

// Social share card, generated at build time. Same ink as the hero: dark
// ground, grayscale portrait, red label. Fonts are read from disk because
// next/font only serves the browser.

export const alt = "Hugo Pezzo, producteur audiovisuel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const root = process.cwd();
const [regular, bold, photo] = await Promise.all([
  readFile(join(root, "src/assets/fonts/OpenSans-Regular.ttf")),
  readFile(join(root, "src/assets/fonts/OpenSans-Bold.ttf")),
  readFile(join(root, "src/assets/og-photo.jpg"), "base64"),
]);
const photoSrc = `data:image/jpeg;base64,${photo}`;

export default function Image() {
  const { label, tagline } = t.fr.hero;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#080808",
          fontFamily: "Open Sans",
          position: "relative",
        }}
      >
        {/* Portrait, right; its dark left edge fades into the ground */}
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only */}
        <img
          alt=""
          src={photoSrc}
          width={630}
          height={630}
          style={{ position: "absolute", right: 0, top: 0 }}
        />
        <div
          style={{
            position: "absolute",
            left: 570,
            top: 0,
            width: 260,
            height: 630,
            background: "linear-gradient(to right, #080808, rgba(8,8,8,0))",
          }}
        />

        {/* Text block */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 0,
            width: 560,
            height: 630,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#d30000",
              lineHeight: 1.6,
            }}
          >
            {/* break at the ampersand: two balanced lines instead of an orphan */}
            {label.split(" & ").map((part, i) => (
              <span key={part}>{i === 0 ? `${part} &` : part}</span>
            ))}
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: "#f5f5f0",
              lineHeight: 1.15,
              marginTop: 8,
            }}
          >
            Hugo Pezzo
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(245,245,240,0.6)",
              lineHeight: 1.4,
              marginTop: 14,
            }}
          >
            {tagline}
          </div>
          <div
            style={{ width: 48, height: 2, background: "#d30000", marginTop: 36 }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Open Sans", data: regular, weight: 400, style: "normal" },
        { name: "Open Sans", data: bold, weight: 700, style: "normal" },
      ],
    }
  );
}

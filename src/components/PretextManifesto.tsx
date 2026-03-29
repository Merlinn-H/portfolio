"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

// ASCII dragon — brightness field → character lookup → canvas render
// Inspired by @chenglou/pretext variable-typographic-ascii demo

const FONT_STR = "bold 13px 'Courier New', Courier, monospace";
const CELL_H = 17;
const FIELD_DECAY = 0.82;
const DRAGON_SEGMENTS = 32;
const RAMP = " ·.:;+*=o0#@%";

// Splat a soft radial gradient of brightness onto the field
function splat(
  field: Float32Array,
  cols: number,
  rows: number,
  cellW: number,
  cx: number,
  cy: number,
  r: number,
  strength: number
) {
  const cCol = cx / cellW;
  const cRow = cy / CELL_H;
  const rC = r / cellW;
  const rR = r / CELL_H;
  const c0 = Math.max(0, Math.floor(cCol - rC));
  const c1 = Math.min(cols - 1, Math.ceil(cCol + rC));
  const r0 = Math.max(0, Math.floor(cRow - rR));
  const r1 = Math.min(rows - 1, Math.ceil(cRow + rR));
  for (let row = r0; row <= r1; row++) {
    for (let col = c0; col <= c1; col++) {
      const dx = (col + 0.5 - cCol) / rC;
      const dy = (row + 0.5 - cRow) / rR;
      const d2 = dx * dx + dy * dy;
      if (d2 < 1) {
        const idx = row * cols + col;
        field[idx] = Math.min(1, field[idx]! + strength * (1 - d2));
      }
    }
  }
}

export default function PretextManifesto() {
  const { text } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let aborted = false;

    const dpr = window.devicePixelRatio || 1;
    const W = container.clientWidth;
    const H = 370;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.font = FONT_STR;

    const cellW = ctx.measureText("M").width;
    const cols = Math.floor(W / cellW);
    const rows = Math.floor(H / CELL_H);
    const field = new Float32Array(cols * rows);

    const draw = (ts: number) => {
      if (aborted) return;
      const t = ts * 0.001;

      ctx.clearRect(0, 0, W, H);

      // Decay field
      for (let i = 0; i < field.length; i++) field[i] = field[i]! * FIELD_DECAY;

      // ── Dragon spine ─────────────────────────────────────────────────────
      // Each segment lags the previous in time → sinusoidal body
      for (let s = 0; s < DRAGON_SEGMENTS; s++) {
        const tLocal = t - s * 0.022; // tail lags head
        const phase = s * 0.21; // phase offset along body

        const x =
          W / 2 + W * 0.37 * Math.sin(tLocal * 1.1 + phase);
        const y =
          H / 2 + H * 0.28 * Math.cos(tLocal * 0.68 + phase * 0.62);

        const isHead = s <= 2;
        const ratio = 1 - s / DRAGON_SEGMENTS;
        const r = ((isHead ? 32 : 22) * ratio + 7) * (W / 1100);
        const strength = isHead ? 1.0 : Math.max(0.22, ratio * 0.75 + 0.22);

        splat(field, cols, rows, cellW, x, y, r, strength);

        // Claw protrusions at body joints
        if (s === 7 || s === 14 || s === 21) {
          const perpX = Math.cos(t * 0.9 + s) * 26 * (W / 1100);
          const perpY = Math.sin(t * 0.6 + s) * 18 * (W / 1100);
          splat(field, cols, rows, cellW, x + perpX, y + perpY, 9 * (W / 1100), 0.42);
          splat(field, cols, rows, cellW, x - perpX, y - perpY, 9 * (W / 1100), 0.42);
        }
      }

      // Pearl the dragon chases (runs just ahead of the head)
      const pearlX = W / 2 + W * 0.37 * Math.sin(t * 1.1 - 0.45);
      const pearlY = H / 2 + H * 0.28 * Math.cos(t * 0.68 - 0.28);
      splat(field, cols, rows, cellW, pearlX, pearlY, 13 * (W / 1100), 1.35);

      // ── Render ASCII ─────────────────────────────────────────────────────
      ctx.font = FONT_STR;
      ctx.textBaseline = "top";

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const b = field[row * cols + col]!;
          if (b < 0.04) continue;

          const ch = RAMP[Math.min(RAMP.length - 1, (b * RAMP.length) | 0)]!;
          if (ch === " ") continue;

          const alpha = Math.min(1, b * 2.2);

          // Color gradient: faint red → amber → bright gold
          if (b > 0.72) {
            ctx.fillStyle = `rgba(255,215,80,${alpha})`;
          } else if (b > 0.42) {
            ctx.fillStyle = `rgba(232,137,12,${alpha})`;
          } else if (b > 0.18) {
            ctx.fillStyle = `rgba(211,55,0,${alpha})`;
          } else {
            ctx.fillStyle = `rgba(170,15,0,${alpha * 0.75})`;
          }

          ctx.fillText(ch, col * cellW, row * CELL_H);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      aborted = true;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <section className="relative py-20" id="philosophy">
      {/* Section label */}
      <div className="max-w-6xl mx-auto px-8 mb-10">
        <div className="flex items-center gap-4">
          <span className="text-xs tracking-widest uppercase text-[#d30000]">
            {text.philosophy.label}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#d30000]/30 to-transparent" />
        </div>
      </div>

      {/* Dragon canvas */}
      <div className="relative max-w-6xl mx-auto">
        <div ref={containerRef} className="relative w-full">
          <canvas ref={canvasRef} className="block" />

          {/* Watermark 龍 */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            style={{
              fontSize: "clamp(120px, 18vw, 220px)",
              fontWeight: 900,
              color: "rgba(232,137,12,0.035)",
              letterSpacing: "-0.02em",
            }}
          >
            龍
          </div>

          {/* Edge fades */}
          <div
            className="absolute inset-x-0 top-0 h-10 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #080808, transparent)" }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
            style={{ background: "linear-gradient(to top, #080808, transparent)" }}
          />

          {/* Credit */}
          <p className="absolute bottom-8 right-4 text-[9px] tracking-widest uppercase pointer-events-none select-none text-[#f5f5f0]/15">
            @chenglou/pretext ascii demo
          </p>
        </div>
      </div>
    </section>
  );
}

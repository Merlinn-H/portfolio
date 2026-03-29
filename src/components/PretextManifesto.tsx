"use client";

import { useEffect, useRef } from "react";
import type { LayoutCursor } from "@chenglou/pretext";
import { useLanguage } from "@/context/LanguageContext";

const FONT_SIZE = 22;
const LINE_HEIGHT = 38;
const PAD_X = 64;
const PAD_Y = 52;
const ORB_R = 115;
const CANVAS_H = 500;
const FONT_STR = `300 ${FONT_SIZE}px 'Open Sans'`;

export default function PretextManifesto() {
  const { text } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1, y: -1, active: false });
  const animRef = useRef<number | null>(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let aborted = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const run = async () => {
      const { prepareWithSegments, layoutNextLine } = await import(
        "@chenglou/pretext"
      );
      if (aborted) return;

      await document.fonts.ready;
      if (aborted) return;

      const dpr = window.devicePixelRatio || 1;
      const W = container.clientWidth;
      const H = CANVAS_H;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      const ctx = canvas.getContext("2d")!;
      ctx.scale(dpr, dpr);

      const prepared = prepareWithSegments(text.philosophy.text, FONT_STR);

      const draw = () => {
        if (aborted) return;
        tRef.current += 0.006;
        const t = tRef.current;

        ctx.clearRect(0, 0, W, H);

        // Orb: follow mouse smoothly or animate in lemniscate
        const orbX = mouseRef.current.active
          ? mouseRef.current.x
          : W / 2 + Math.sin(t) * W * 0.3;
        const orbY = mouseRef.current.active
          ? mouseRef.current.y
          : H / 2 + Math.cos(t * 0.63) * H * 0.27;

        // ── Text layout ──────────────────────────────────────────────────────
        ctx.font = FONT_STR;
        ctx.textBaseline = "alphabetic";

        const fullW = W - PAD_X * 2;
        const lineRight = PAD_X + fullW;
        let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
        let y = PAD_Y + FONT_SIZE;

        while (y < H + LINE_HEIGHT) {
          const midY = y - FONT_SIZE * 0.33;

          let startX = PAD_X;
          let maxW = fullW;

          // Orb intersection with this line
          const dy = midY - orbY;
          if (Math.abs(dy) < ORB_R) {
            const xSpan = Math.sqrt(ORB_R * ORB_R - dy * dy);
            const oLeft = orbX - xSpan - 16;
            const oRight = orbX + xSpan + 16;
            const lineMid = PAD_X + fullW / 2;

            if (oLeft > lineMid) {
              // Orb on the right → trim right edge
              maxW = Math.max(80, oLeft - PAD_X);
            } else if (oRight < lineMid) {
              // Orb on the left → push start right
              const ns = Math.min(oRight, lineRight - 80);
              maxW = Math.max(80, lineRight - ns);
              startX = ns;
            } else {
              // Orb straddles center → go to the wider side
              const leftSpace = oLeft - PAD_X;
              const rightSpace = lineRight - oRight;
              if (rightSpace >= leftSpace) {
                const ns = Math.min(oRight, lineRight - 80);
                maxW = Math.max(80, lineRight - ns);
                startX = ns;
              } else {
                maxW = Math.max(80, oLeft - PAD_X);
              }
            }
          }

          const line = layoutNextLine(prepared, cursor, maxW);
          if (line === null) break;

          // Dim text closer to the orb
          const dist = Math.hypot(
            startX + line.width / 2 - orbX,
            midY - orbY
          );
          ctx.globalAlpha = Math.min(
            1,
            0.15 + 0.85 * Math.min(1, dist / (ORB_R * 1.9))
          );

          ctx.fillStyle = "#f5f5f0";
          ctx.fillText(line.text, startX, y);
          cursor = line.end;
          y += LINE_HEIGHT;
        }

        ctx.globalAlpha = 1;

        // ── Orb ──────────────────────────────────────────────────────────────
        const gOuter = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, ORB_R);
        gOuter.addColorStop(0, "rgba(211,0,0,0.40)");
        gOuter.addColorStop(0.45, "rgba(211,0,0,0.10)");
        gOuter.addColorStop(1, "rgba(211,0,0,0)");
        ctx.fillStyle = gOuter;
        ctx.beginPath();
        ctx.arc(orbX, orbY, ORB_R, 0, Math.PI * 2);
        ctx.fill();

        const gInner = ctx.createRadialGradient(
          orbX,
          orbY,
          0,
          orbX,
          orbY,
          ORB_R * 0.3
        );
        gInner.addColorStop(0, "rgba(255,65,65,0.60)");
        gInner.addColorStop(1, "rgba(211,0,0,0)");
        ctx.fillStyle = gInner;
        ctx.beginPath();
        ctx.arc(orbX, orbY, ORB_R * 0.3, 0, Math.PI * 2);
        ctx.fill();

        animRef.current = requestAnimationFrame(draw);
      };

      animRef.current = requestAnimationFrame(draw);
    };

    run();

    return () => {
      aborted = true;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [text]);

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

      {/* Canvas */}
      <div className="relative max-w-6xl mx-auto">
        <div ref={containerRef} className="relative w-full">
          <canvas ref={canvasRef} className="cursor-none block" />

          {/* Bottom fade to page bg */}
          <div
            className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #080808)",
            }}
          />

          {/* Hint + credit */}
          <p className="absolute bottom-10 right-8 text-[9px] tracking-widest uppercase pointer-events-none select-none text-[#f5f5f0]/20">
            {text.philosophy.hint} · @chenglou/pretext
          </p>
        </div>
      </div>
    </section>
  );
}

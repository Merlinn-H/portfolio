"use client";

const SEGMENT = "影像 · 製作 · 故事 · 創意 · 導演 · 視覺 · 聲音 · 藝術 · 光影 · 方向 · ";

export default function HKTicker() {
  const content = SEGMENT.repeat(6);

  return (
    <div
      className="overflow-hidden border-y border-white/[0.06] py-3"
      style={{ background: "rgba(232, 137, 12, 0.02)" }}
    >
      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{ animation: "ticker-scroll 28s linear infinite" }}
      >
        <span className="text-xs tracking-[0.5em] pr-4" style={{ color: "rgba(232, 137, 12, 0.4)" }}>
          {content}
        </span>
        <span className="text-xs tracking-[0.5em] pr-4" style={{ color: "rgba(232, 137, 12, 0.4)" }}>
          {content}
        </span>
      </div>
    </div>
  );
}

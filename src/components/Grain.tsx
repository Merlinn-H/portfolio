"use client";
import { useEffect, useRef } from "react";

export default function Grain({ opacity = 0.09 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let lastTime = 0;
    const interval = 1000 / 12; // ~12fps, film-like

    function resize() {
      // Half resolution for performance, CSS scales it up
      canvas!.width = Math.floor(window.innerWidth / 2);
      canvas!.height = Math.floor(window.innerHeight / 2);
    }

    function draw(timestamp: number) {
      animId = requestAnimationFrame(draw);
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      const w = canvas!.width;
      const h = canvas!.height;
      const imageData = ctx!.createImageData(w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = (Math.random() * 40) | 0;
      }

      ctx!.putImageData(imageData, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity, zIndex: 9999, width: "100%", height: "100%" }}
    />
  );
}

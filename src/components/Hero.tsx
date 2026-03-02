"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { text } = useLanguage();
  const [rainDrops, setRainDrops] = useState<
    { left: string; duration: string; delay: string; height: string; opacity: number }[]
  >([]);

  useEffect(() => {
    setRainDrops(
      Array.from({ length: 20 }, (_, i) => ({
        left: `${((i * 17 + 3) * 5.1) % 100}%`,
        duration: `${0.8 + ((i * 7) % 10) / 10}s`,
        delay: `${((i * 13) % 20) / 10}s`,
        height: `${50 + (i * 11) % 70}px`,
        opacity: 0.03 + (i % 5) * 0.01,
      }))
    );
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-8">

      {/* Idée 4 — Pluie ambrée */}
      {rainDrops.map((drop, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: drop.left,
            top: "-120px",
            width: "1px",
            height: drop.height,
            opacity: drop.opacity,
            background: "linear-gradient(to bottom, transparent, rgba(232, 137, 12, 0.6), transparent)",
            animation: `rain-fall ${drop.duration} linear ${drop.delay} infinite`,
          }}
        />
      ))}

      {/* Idée 1 — Caractères chinois gauche */}
      <div className="absolute left-3 md:left-8 top-0 bottom-0 flex flex-col justify-center gap-2 md:gap-3 pointer-events-none select-none z-0">
        {"影像製作故事視覺創".split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 + i * 0.08, duration: 1 }}
            className="text-lg md:text-2xl font-bold"
            style={{ color: "rgba(232, 137, 12, 0.1)" }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Idée 1 — Caractères chinois droite */}
      <div className="absolute right-3 md:right-8 top-0 bottom-0 flex flex-col justify-center gap-2 md:gap-3 pointer-events-none select-none z-0">
        {"意導演光影製作".split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 + i * 0.08, duration: 1 }}
            className="text-lg md:text-2xl font-bold"
            style={{ color: "rgba(232, 137, 12, 0.07)" }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-16 max-w-5xl w-full">

        {/* Texte */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-4 text-xs tracking-[0.4em] uppercase text-[#d30000]"
          >
            {text.hero.label}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f0] mb-6"
          >
            Hugo Pezzo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xl text-[#f5f5f0]/60 max-w-md leading-relaxed mb-3 italic"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            {text.hero.tagline}
          </motion.p>

          {/* Idée 3 — Citation Wong Kar-wai */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="text-xs italic tracking-widest mb-8"
            style={{ color: "rgba(232, 137, 12, 0.45)" }}
          >
            "All I want is a chance to start over." — A Better Tomorrow (英雄本色), John Woo, 1986
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex gap-4 justify-center md:justify-start flex-wrap"
          >
            <a
              href="#projets"
              className="px-8 py-3 bg-[#d30000] text-white text-sm font-semibold tracking-wide uppercase hover:bg-[#ff1a1a] transition-colors duration-300"
            >
              {text.hero.cta_projects}
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-[#f5f5f0]/20 text-[#f5f5f0]/70 text-sm font-semibold tracking-wide uppercase hover:border-[#d30000] hover:text-[#d30000] transition-colors duration-300"
            >
              {text.hero.cta_contact}
            </a>
          </motion.div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative shrink-0"
        >
          <div className="w-56 h-56 md:w-72 md:h-72 relative">
            <Image
              src="/photo.jpg"
              alt="Hugo Pezzo"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
            {/* Cadre décoratif */}
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#d30000]/40 pointer-events-none" />
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-[#f5f5f0]/30">
          {text.hero.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-10 bg-gradient-to-b from-[#d30000] to-transparent"
        />
      </motion.div>
    </section>
  );
}

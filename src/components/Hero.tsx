"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { text } = useLanguage();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-8">
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
            className="text-xl text-[#f5f5f0]/60 max-w-md leading-relaxed mb-10 italic"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {text.hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
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

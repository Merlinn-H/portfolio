"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const services = [
  {
    number: "01",
    title: "Réalisation",
    description: "Courts-métrages, clips musicaux, documentaires. Conception et réalisation de vos projets de A à Z.",
  },
  {
    number: "02",
    title: "Production",
    description: "Production audiovisuelle et podcasts. Gestion complète du projet, du budget au rendu final.",
  },
  {
    number: "03",
    title: "Conseil",
    description: "Accompagnement et conseil en production audiovisuelle. On vous guide à chaque étape de votre projet.",
  },
];

function FilmStrip({ side }: { side: "left" | "right" }) {
  return (
    <div className={`absolute top-0 bottom-0 ${side === "left" ? "left-0" : "right-0"} w-7 flex flex-col justify-around py-2 opacity-15 pointer-events-none`}>
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="w-4 h-3 border border-white/50 mx-auto rounded-[2px]" />
      ))}
    </div>
  );
}

export default function ProductionsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: "#0d0000" }}>
      <Navbar />

      {/* Film grain */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.09,
        }}
      />

      {/* Red ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(211,0,0,0.15) 0%, transparent 70%)" }}
      />

      {/* Film strips */}
      <FilmStrip side="left" />
      <FilmStrip side="right" />

      {/* Logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="relative w-[70vw] max-w-3xl opacity-[0.04]">
          <Image src="/logo-489.png" alt="" width={1200} height={600} className="w-full h-auto object-contain select-none" aria-hidden />
        </div>
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-8 pt-36 pb-24">

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Link href="/#projets" className="text-xs tracking-widest uppercase text-white/40 hover:text-[#d30000] transition-colors duration-300 flex items-center gap-2">
            ← Retour au portfolio
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p className="text-xs tracking-[0.6em] uppercase text-[#d30000] mb-8">
            Production audiovisuelle
          </p>
          <div className="flex justify-center mb-8">
            <Image src="/logo-489.png" alt="489Productions" width={320} height={160} className="h-20 w-auto object-contain" />
          </div>
          <p
            className="text-2xl md:text-3xl text-white/60 tracking-widest"
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
          >
            Vision. Production. Action!
          </p>
          <div className="w-12 h-px bg-[#d30000] mx-auto mt-10" />
        </motion.div>

        {/* About */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-white/50 max-w-2xl mx-auto mb-24 leading-relaxed"
        >
          Studio de production audiovisuelle basé à Montpellier. Nous accompagnons artistes, marques et porteurs de projets de la première idée jusqu'à la livraison finale.
        </motion.p>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
              className="border border-white/10 p-8 relative group hover:border-[#d30000]/50 transition-colors duration-500"
            >
              <span className="text-5xl font-bold text-[#d30000]/25 mb-4 block" style={{ fontFamily: "var(--font-cormorant)" }}>
                {service.number}
              </span>
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{service.description}</p>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-[#d30000] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-white/30 mb-8 text-sm tracking-widest uppercase">
            Vous avez un projet ? Parlons-en.
          </p>
          <a
            href="mailto:hugopezzo@outlook.com"
            className="inline-block px-12 py-4 bg-[#d30000] text-white text-sm font-semibold tracking-widest uppercase hover:bg-[#ff1a1a] transition-colors duration-300"
          >
            Nous contacter
          </a>
        </motion.div>

      </div>
    </main>
  );
}

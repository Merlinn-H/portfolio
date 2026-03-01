"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center max-w-4xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-4 text-xs tracking-[0.4em] uppercase text-[#d4a853]"
        >
          Producteur Audiovisuel &amp; Chargé de Projets Culturels
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold tracking-tight text-[#f5f5f0] mb-6"
        >
          Hugo Pezzo
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-lg text-[#f5f5f0]/50 max-w-xl mx-auto leading-relaxed"
        >
          Chaque projet est une histoire. Je suis là pour la raconter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-10 flex gap-4 justify-center flex-wrap"
        >
          <a
            href="#projets"
            className="px-8 py-3 bg-[#d4a853] text-[#080808] text-sm font-semibold tracking-wide uppercase hover:bg-[#e0b96a] transition-colors duration-300"
          >
            Voir mes projets
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-[#f5f5f0]/20 text-[#f5f5f0]/70 text-sm font-semibold tracking-wide uppercase hover:border-[#d4a853] hover:text-[#d4a853] transition-colors duration-300"
          >
            Me contacter
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-[#f5f5f0]/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-10 bg-gradient-to-b from-[#d4a853] to-transparent"
        />
      </motion.div>
    </section>
  );
}

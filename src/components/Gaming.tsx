"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Gaming() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { text } = useLanguage();

  return (
    <section id="gaming" className="py-32 px-8 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-[#d30000] mb-4">
          {text.gaming.label}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f0]">
          {text.gaming.title}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {text.gaming.games.map((game, index) => (
          <motion.div
            key={game.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
            className="group border border-[#f5f5f0]/10 p-6 hover:border-[#d30000]/50 transition-colors duration-500 relative overflow-hidden"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[#d30000] mb-4 block">
              {game.genre}
            </span>
            <h3 className="text-xl font-semibold text-[#f5f5f0] mb-3 group-hover:text-[#d30000] transition-colors duration-300">
              {game.title}
            </h3>
            <p className="text-sm text-[#f5f5f0]/50 leading-relaxed">
              {game.description}
            </p>
            <div className="absolute bottom-0 left-0 h-px w-0 bg-[#d30000] group-hover:w-full transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { text } = useLanguage();

  return (
    <section id="projets" className="py-32 px-8 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-[#d30000] mb-4">
          {text.projects.label}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f0] mb-3">
          {text.projects.title}
        </h2>
        <p className="text-xs tracking-widest text-[#f5f5f0]/20">{text.projects.explore}</p>
      </motion.div>

      <div className="flex flex-col gap-4">

        {/* 489Productions */}
        <motion.a
          href="/489productions"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="group relative border border-[#d30000]/30 p-8 overflow-hidden cursor-pointer hover:border-[#d30000]/70 transition-colors duration-500 flex flex-col md:flex-row md:items-center gap-6 md:gap-8"
          style={{ background: "rgba(13,0,0,0.6)" }}
        >
          <div className="flex-1 min-w-0">
            <span className="text-xs tracking-[0.3em] uppercase text-[#d30000] block mb-4">
              {text.projects.productions.label}
            </span>
            <h3
              className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#d30000] transition-colors duration-300"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              489 Productions
            </h3>
            <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
              {text.projects.productions.desc}
            </p>
          </div>
          <div className="shrink-0 w-28 md:w-44 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            <Image src="/logo-489.png" alt="489Productions" width={400} height={200} className="w-full h-auto object-contain" />
          </div>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-[#d30000] group-hover:w-full transition-all duration-700" />
        </motion.a>

        {/* POSTMERIDIAN */}
        <motion.a
          href="https://www.postmeridian.co"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="group relative border border-[#f5f5f0]/10 p-8 overflow-hidden hover:border-[#d30000]/50 transition-colors duration-500 flex flex-col md:flex-row md:items-center gap-6 md:gap-8"
        >
          <div className="flex-1 min-w-0">
            <span className="text-xs tracking-[0.3em] uppercase text-[#d30000] block mb-4">{text.projects.postmeridian.label}</span>
            <h3 className="text-2xl md:text-3xl font-bold text-[#f5f5f0] mb-3 group-hover:text-[#d30000] transition-colors duration-300">
              Postmeridian
            </h3>
            <p className="text-sm text-[#f5f5f0]/50 leading-relaxed line-clamp-3">
              {text.projects.postmeridian.desc}
            </p>
          </div>
          <div className="shrink-0 w-28 md:w-44 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            <Image src="/postmeridian.png" alt="POSTMERIDIAN" width={400} height={200} className="w-full h-auto object-contain" />
          </div>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-[#d30000] group-hover:w-full transition-all duration-500" />
        </motion.a>

        {/* Courts-métrages */}
        <motion.a
          href="/films"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="group relative border border-[#f5f5f0]/10 p-8 overflow-hidden hover:border-[#d30000]/50 transition-colors duration-500"
        >
          <div className="flex items-start justify-between mb-4">
            <span className="text-xs tracking-[0.3em] uppercase text-[#d30000]">{text.projects.films.label}</span>
            <span className="text-xs text-[#f5f5f0]/30 tracking-wider">{text.projects.films_count}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#f5f5f0] mb-3 group-hover:text-[#d30000] transition-colors duration-300">
            {text.projects.films.title}
          </h3>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-[#d30000] group-hover:w-full transition-all duration-500" />
        </motion.a>

      </div>

    </section>
  );
}

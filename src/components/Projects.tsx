"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projets" className="py-32 px-8 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-sm tracking-[0.4em] uppercase text-[#d30000] mb-4">
          Portfolio
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f0]">
          Mes Projets
        </h2>
      </motion.div>

      <div className="flex flex-col gap-4">

        {/* 489Productions */}
        <motion.a
          href="/489productions"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="group relative border border-[#d30000]/30 p-8 overflow-hidden cursor-pointer hover:border-[#d30000]/70 transition-colors duration-500 flex items-center justify-between gap-8"
          style={{ background: "rgba(13,0,0,0.6)" }}
        >
          <div className="flex-1 min-w-0">
            <span className="text-xs tracking-[0.3em] uppercase text-[#d30000] block mb-4">
              Production audiovisuelle
            </span>
            <h3
              className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#d30000] transition-colors duration-300"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              489Productions
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Réalisation, production audiovisuelle et conseil. Courts-métrages, clips, documentaires et podcasts.
            </p>
          </div>
          <div className="shrink-0 w-32 md:w-44 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            <Image src="/logo-489.png" alt="489Productions" width={400} height={200} className="w-full h-auto object-contain" />
          </div>
          <span className="text-xs text-[#f5f5f0]/30 tracking-wider shrink-0 self-center">→ Voir la page complète</span>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-[#d30000] group-hover:w-full transition-all duration-700" />
        </motion.a>

        {/* POSTMERIDIAN */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="group relative border border-[#f5f5f0]/10 p-8 overflow-hidden hover:border-[#d30000]/50 transition-colors duration-500"
        >
          <div className="flex items-start justify-between mb-4">
            <span className="text-xs tracking-[0.3em] uppercase text-[#d30000]">Studio de jeux vidéo</span>
            <span className="text-xs text-[#f5f5f0]/30">2024 — Actuellement</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#f5f5f0] mb-3 group-hover:text-[#d30000] transition-colors duration-300">
            POSTMERIDIAN
          </h3>
          <p className="text-sm text-[#f5f5f0]/50 leading-relaxed max-w-2xl">
            Fondation et direction d'un studio indépendant de développement de jeux vidéo sur PC (Unreal Engine). Supervision complète : artistique, budgétaire, logistique et coordination d'une équipe créative pluridisciplinaire.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {["Production", "Direction", "Unreal Engine", "Gestion d'équipe"].map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 border border-[#f5f5f0]/10 text-[#f5f5f0]/40">
                {tag}
              </span>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-[#d30000] group-hover:w-full transition-all duration-500" />
        </motion.div>

        {/* Courts-métrages */}
        <motion.a
          href="/films"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="group relative border border-[#f5f5f0]/10 p-8 overflow-hidden hover:border-[#d30000]/50 transition-colors duration-500"
        >
          <div className="flex items-start justify-between mb-4">
            <span className="text-xs tracking-[0.3em] uppercase text-[#d30000]">Fiction</span>
            <span className="text-xs text-[#f5f5f0]/30 tracking-wider">→ 3 films</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#f5f5f0] mb-3 group-hover:text-[#d30000] transition-colors duration-300">
            Courts-métrages
          </h3>
          <p className="text-sm text-[#f5f5f0]/50 leading-relaxed max-w-2xl">
            Pineapple Pie, Au Cœur de l'Aliénation, Résonance — trois courts-métrages en tant qu'acteur, assistant réalisateur et chargé de production.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {["2019 — 2023", "Assistant Réalisateur", "Chargé de Production", "Acteur"].map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 border border-[#f5f5f0]/10 text-[#f5f5f0]/40">
                {tag}
              </span>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-[#d30000] group-hover:w-full transition-all duration-500" />
        </motion.a>

      </div>

    </section>
  );
}

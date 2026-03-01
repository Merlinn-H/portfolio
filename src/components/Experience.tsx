"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    title: "Fondateur & Producteur",
    company: "POSTMERIDIAN — Montpellier",
    period: "Mai 2024 — Actuellement",
    description:
      "Création et gestion d'un studio de développement de jeux vidéo (PC / Unreal Engine). Supervision artistique, budgétaire et logistique, coordination d'une équipe créative (graphistes, développeurs, compositeurs).",
  },
  {
    title: "Chargé de Production & Communication",
    company: "489Productions — Montpellier",
    period: "Avril 2023 — Actuellement",
    description:
      "Organisation et gestion de tournages (fiction, publicité, documentaire). Production de contenus digitaux. Suivi administratif : rédaction de contrats, suivi de factures, coordination avec les partenaires.",
  },
  {
    title: "Chargé / Directeur de Production",
    company: "JRCinéma · Productions Uriel Rosen · QUIDAM STUDIOS LTD. — Laissac",
    period: "Juin 2017 — Septembre 2023",
    description:
      "Coordination d'équipes, gestion des plannings et budgets, logistique de tournage. Aide à la conception de dossiers de financement (régions / CNC). Production de 4 courts-métrages dont 2 sélectionnés en festivals régionaux et nationaux.",
  },
  {
    title: "Chargé de Communication Digitale",
    company: "CarFT — Lyon",
    period: "Oct. 2022 — Mars 2023",
    description:
      "Développement et exécution de la stratégie de contenus. Production de +15 vidéos courtes et 2 formats longs. Gestion d'un calendrier éditorial pour une audience organique : 100K vues, 300K impressions.",
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="parcours" className="py-32 px-8 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-[#d30000] mb-4">
          Parcours
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f0]">
          Expériences
        </h2>
      </motion.div>

      <div className="relative max-w-2xl">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-[#f5f5f0]/10" />
        <div className="space-y-12 pl-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title + exp.period}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -left-10 top-1.5 w-2 h-2 rounded-full bg-[#d30000]" />
              <div className="flex items-start justify-between mb-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#f5f5f0]">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-[#d30000]">{exp.company}</p>
                </div>
                <span className="text-xs text-[#f5f5f0]/30 whitespace-nowrap">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm text-[#f5f5f0]/50 leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

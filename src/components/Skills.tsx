"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    category: "Production & Logistique",
    skills: [
      "Planification de tournages",
      "Réservation logements & transports",
      "Gestion de budget",
      "Organisation plateau",
    ],
  },
  {
    category: "Coordination d'équipes",
    skills: [
      "Fédération de talents",
      "Gestion des deadlines",
      "Communication avec les artistes",
      "Suivi de projet",
    ],
  },
  {
    category: "Polyvalence & Leadership",
    skills: [
      "Adaptabilité",
      "Respect des deadlines",
      "Prise d'initiative",
      "Travail sous pression",
    ],
  },
  {
    category: "Outils & Langues",
    skills: [
      "Anglais professionnel",
      "Espagnol technique",
      "Suite Adobe (Ps, Ai, Pr, Lr)",
      "DaVinci Resolve",
      "Canva · Google / Office",
      "Unreal Engine",
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="competences" className="py-32 px-8 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-[#d30000] mb-4">
          Expertise
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f0]">
          Compétences
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {skillCategories.map((cat, catIndex) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + catIndex * 0.15, duration: 0.6 }}
          >
            <h3 className="text-xs tracking-[0.3em] uppercase text-[#d30000] mb-6">
              {cat.category}
            </h3>
            <ul className="space-y-3">
              {cat.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-3 text-sm text-[#f5f5f0]/70"
                >
                  <div className="w-1 h-1 rounded-full bg-[#d30000] shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "POSTMERIDIAN",
    category: "Studio de jeux vidéo",
    year: "2024 — Actuellement",
    description:
      "Fondation et direction d'un studio indépendant de développement de jeux vidéo sur PC (Unreal Engine). Supervision complète : artistique, budgétaire, logistique et coordination d'une équipe créative pluridisciplinaire.",
    tags: ["Production", "Direction", "Unreal Engine", "Gestion d'équipe"],
  },
  {
    title: "CarFT",
    category: "Série YouTube",
    year: "2022 — 2023",
    description:
      "Production de +15 vidéos courtes et 2 formats longs pour un studio de jeux vidéo. Gestion d'un calendrier éditorial complet avec une stratégie de contenu organique ayant généré 100K vues et 300K impressions.",
    tags: ["Production", "Contenu YouTube", "Stratégie éditoriale"],
  },
  {
    title: "Pineapple Pie",
    category: "Fiction",
    year: "2023",
    description:
      "Court-métrage de fiction tourné avec un budget très limité. En tant qu'assistant réalisateur et chargé de production, j'ai notamment sourcé une voiture spécifique pour le tournage et veillé au bon déroulement de chaque journée sur le plateau.",
    tags: ["Assistant Réalisateur", "Chargé de Production"],
  },
];

function ProjectCard({
  project,
  index,
  parentInView,
}: {
  project: (typeof projects)[0];
  index: number;
  parentInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
      className="group relative border border-[#f5f5f0]/10 p-8 hover:border-[#d4a853]/50 transition-colors duration-500 cursor-pointer overflow-hidden"
    >
      <div className="flex items-start justify-between mb-6">
        <span className="text-xs tracking-[0.3em] uppercase text-[#d4a853]">
          {project.category}
        </span>
        <span className="text-xs text-[#f5f5f0]/30">{project.year}</span>
      </div>

      <h3 className="text-2xl font-semibold text-[#f5f5f0] mb-3 group-hover:text-[#d4a853] transition-colors duration-300">
        {project.title}
      </h3>

      <p className="text-sm text-[#f5f5f0]/50 leading-relaxed mb-6">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 border border-[#f5f5f0]/10 text-[#f5f5f0]/40"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 h-px w-0 bg-[#d4a853] group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}

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
        <p className="text-xs tracking-[0.4em] uppercase text-[#d4a853] mb-4">
          Portfolio
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f0]">
          Mes Projets
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            parentInView={inView}
          />
        ))}
      </div>
    </section>
  );
}

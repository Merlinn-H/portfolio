"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    title: "POSTMERIDIAN",
    category: "Studio de jeux vidéo",
    year: "2024 — Actuellement",
    description:
      "Fondation et direction d'un studio indépendant de développement de jeux vidéo sur PC (Unreal Engine). Supervision complète : artistique, budgétaire, logistique et coordination d'une équipe créative pluridisciplinaire.",
    tags: ["Production", "Direction", "Unreal Engine", "Gestion d'équipe"],
    youtubeId: null,
  },
  {
    title: "CarFT",
    category: "Série YouTube",
    year: "2022 — 2023",
    description:
      "Production de +15 vidéos courtes et 2 formats longs pour un studio de jeux vidéo. Gestion d'un calendrier éditorial complet avec une stratégie de contenu organique ayant généré 100K vues et 300K impressions.",
    tags: ["Production", "Contenu YouTube", "Stratégie éditoriale"],
    youtubeId: null,
  },
  {
    title: "Pineapple Pie",
    category: "Fiction",
    year: "2023",
    description:
      "Court-métrage de fiction tourné avec un budget très limité. En tant qu'assistant réalisateur et chargé de production, j'ai notamment sourcé une voiture spécifique pour le tournage et veillé au bon déroulement de chaque journée sur le plateau.",
    tags: ["Assistant Réalisateur", "Chargé de Production"],
    youtubeId: "jvVDXyiLuFI",
  },
];

function VideoModal({ youtubeId, onClose }: { youtubeId: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-xs tracking-widest uppercase text-[#f5f5f0]/50 hover:text-[#d30000] transition-colors duration-300"
        >
          Fermer ✕
        </button>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title="Pineapple Pie"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  parentInView,
  onPlay,
}: {
  project: (typeof projects)[0];
  index: number;
  parentInView: boolean;
  onPlay: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
      onClick={project.youtubeId ? onPlay : undefined}
      className={`group relative border border-[#f5f5f0]/10 p-8 hover:border-[#d30000]/50 transition-colors duration-500 overflow-hidden ${project.youtubeId ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-start justify-between mb-6">
        <span className="text-xs tracking-[0.3em] uppercase text-[#d30000]">
          {project.category}
        </span>
        <div className="flex items-center gap-3">
          {project.youtubeId && (
            <span className="text-xs text-[#f5f5f0]/30 tracking-wider">▶ Voir le film</span>
          )}
          <span className="text-xs text-[#f5f5f0]/30">{project.year}</span>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-[#f5f5f0] mb-3 group-hover:text-[#d30000] transition-colors duration-300">
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

      <div className="absolute bottom-0 left-0 h-px w-0 bg-[#d30000] group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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
            onPlay={() => project.youtubeId && setActiveVideo(project.youtubeId)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeVideo && (
          <VideoModal
            youtubeId={activeVideo}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

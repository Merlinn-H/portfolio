"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

function VideoModal({ youtubeId, title, onClose, closeLabel }: { youtubeId: string; title: string; onClose: () => void; closeLabel: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
      style={{ background: "rgba(0,0,0,0.95)" }}
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
          {closeLabel}
        </button>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Films() {
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);
  const { text } = useLanguage();
  const p = text.films_page;

  return (
    <main className="bg-[#080808] min-h-screen">
      <Navbar />

      {/* Film grain */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.035,
        }}
      />

      <div className="max-w-4xl mx-auto px-8 pt-36 pb-24">

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Link
            href="/#projets"
            className="text-xs tracking-widest uppercase text-[#f5f5f0]/40 hover:text-[#d30000] transition-colors duration-300 flex items-center gap-2"
          >
            {p.back}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-[#d30000] mb-4">
            Hugo Pezzo
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-[#f5f5f0]">
            {p.title}
          </h1>
        </motion.div>

        {/* Films list */}
        <div className="flex flex-col gap-px border-t border-[#f5f5f0]/10">
          {p.films.map((film, index) => (
            <motion.div
              key={film.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              onClick={() => setActiveVideo({ id: film.youtubeId, title: film.title })}
              className="group relative border-b border-[#f5f5f0]/10 py-10 cursor-pointer hover:pl-4 transition-all duration-500"
            >
              {/* Red left accent on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#d30000] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

              <div className="flex items-start justify-between mb-5 gap-4">
                <span className="text-xs tracking-[0.3em] uppercase text-[#d30000]">
                  {film.year}
                </span>
                <span className="text-xs text-[#f5f5f0]/30 tracking-wider shrink-0">
                  {p.watch}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-[#f5f5f0] mb-5 group-hover:text-[#d30000] transition-colors duration-300">
                {film.title}
              </h2>

              <div className="flex flex-wrap gap-2 mb-6">
                {film.roles.map((role) => (
                  <span
                    key={role}
                    className="text-xs px-3 py-1 border border-[#f5f5f0]/10 text-[#f5f5f0]/40"
                  >
                    {role}
                  </span>
                ))}
              </div>

              <div className="space-y-3 max-w-2xl">
                {film.description.map((para, i) => (
                  <p key={i} className="text-sm text-[#f5f5f0]/50 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <AnimatePresence>
        {activeVideo && (
          <VideoModal
            youtubeId={activeVideo.id}
            title={activeVideo.title}
            onClose={() => setActiveVideo(null)}
            closeLabel={p.close}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

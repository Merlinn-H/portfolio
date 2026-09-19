"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

function VideoModal({ youtubeId, title, onClose, closeLabel }: { youtubeId: string; title: string; onClose: () => void; closeLabel: string }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

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
          {p.films.map((film, index) => {
            const open = () => setActiveVideo({ id: film.youtubeId, title: film.title });
            return (
              <motion.div
                key={film.title}
                role="button"
                tabIndex={0}
                aria-label={`${p.watch} ${film.title}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
                onClick={open}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    open();
                  }
                }}
                className="group relative border-b border-[#f5f5f0]/10 py-10 cursor-pointer hover:pl-4 focus-visible:pl-4 outline-none transition-all duration-500"
              >
                {/* Red left accent on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#d30000] scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100 transition-transform duration-500 origin-top" />

                <div className="grid gap-8 md:grid-cols-[1fr_18rem] md:items-start">

                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden border border-[#f5f5f0]/10 md:order-last">
                    <Image
                      src={`https://img.youtube.com/vi/${film.youtubeId}/maxresdefault.jpg`}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 18rem, 100vw"
                      className="object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:opacity-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        aria-hidden
                        className="w-14 h-14 flex items-center justify-center border border-[#f5f5f0]/60 bg-[#080808]/60 text-[#f5f5f0] text-sm pl-1 group-hover:border-[#d30000] group-hover:bg-[#d30000] group-focus-visible:border-[#d30000] group-focus-visible:bg-[#d30000] transition-colors duration-300"
                      >
                        ▶
                      </span>
                    </div>
                  </div>

                  {/* Text */}
                  <div>
                    <div className="flex items-start justify-between mb-5 gap-4">
                      <span className="text-xs tracking-[0.3em] uppercase text-[#d30000]">
                        {film.year}
                      </span>
                      <span className="text-xs text-[#f5f5f0]/40 tracking-wider shrink-0 group-hover:text-[#d30000] transition-colors duration-300">
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

                    <div className="space-y-3">
                      {film.description.map((para, i) => (
                        <p key={i} className="text-sm text-[#f5f5f0]/50 leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      <Footer />

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

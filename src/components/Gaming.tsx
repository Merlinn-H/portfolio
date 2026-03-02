"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type Tab = "games" | "films";

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 160 : -160, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35 } },
  exit: (d: number) => ({ x: d > 0 ? -160 : 160, opacity: 0, transition: { duration: 0.25 } }),
};

export default function Gaming() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { text } = useLanguage();

  const [tab, setTab] = useState<Tab>("films");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const itemCount = tab === "games" ? text.gaming.games.length : text.gaming.films.length;
  const safeIndex = Math.min(index, itemCount - 1);
  const game = tab === "games" ? text.gaming.games[safeIndex] : null;
  const film = tab === "films" ? text.gaming.films[safeIndex] : null;

  const switchTab = (t: Tab) => {
    setDirection(1);
    setTab(t);
    setIndex(0);
  };

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex(i => (i + dir + itemCount) % itemCount);
  };

  const goTo = (i: number) => {
    setDirection(i > safeIndex ? 1 : -1);
    setIndex(i);
  };

  return (
    <section id="gaming" className="py-32 px-8 max-w-6xl mx-auto">

      {/* Header */}
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-[#d30000] mb-4">
          {text.gaming.label}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f0]">
          {text.gaming.title}
        </h2>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex border-b border-white/10 mb-12 gap-8"
      >
        {(["films", "games"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => switchTab(t)}
            className={`pb-3 text-sm tracking-widest uppercase transition-colors duration-300 relative ${
              tab === t ? "text-[#f5f5f0]" : "text-[#f5f5f0]/30 hover:text-[#f5f5f0]/60"
            }`}
          >
            {t === "games" ? text.gaming.tabs.games : text.gaming.tabs.films}
            {tab === t && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-px bg-[#d30000]"
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative flex items-center gap-3 md:gap-6"
      >
        {/* Prev */}
        <button
          onClick={() => go(-1)}
          className="shrink-0 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center border border-white/10 text-white/40 hover:border-[#d30000] hover:text-[#d30000] transition-all duration-300"
          aria-label="Précédent"
        >←</button>

        {/* Card */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.a
              key={`${tab}-${safeIndex}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              href={game ? game.url : film!.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col md:flex-row overflow-hidden relative group border transition-colors duration-500 cursor-pointer h-[320px] md:h-[260px]"
              style={{
                borderColor: game ? `${game.accent}40` : "rgba(255,255,255,0.1)",
              }}
            >

              {/* ── GAME CARD ── */}
              {game && (
                <>
                  {/* Corner glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 80% 100%, ${game.accent}30 0%, transparent 60%)` }}
                  />

                  {/* Mobile: title on top */}
                  <div className="md:hidden px-5 pt-5 pb-3 relative z-10 shrink-0">
                    <h3 className="text-xl font-bold text-[#f5f5f0] leading-tight">
                      {game.title}
                    </h3>
                  </div>

                  {/* Mobile: full logo centered */}
                  <div className="md:hidden flex-1 flex items-center justify-center relative">
                    <div
                      className="absolute inset-0"
                      style={{ background: `radial-gradient(ellipse at center, ${game.accent}30 0%, transparent 70%)` }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={game.logo}
                      alt={game.title}
                      className="relative z-10 max-h-[160px] max-w-[70%] object-contain opacity-85 drop-shadow-lg"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>

                  {/* Desktop: text content */}
                  <div className="hidden md:flex flex-1 p-10 relative z-10 flex-col justify-center min-w-0">
                    <span className="text-xs tracking-[0.3em] uppercase text-[#d30000] mb-4 block">
                      {game.genre}
                    </span>
                    <h3 className="text-3xl font-bold text-[#f5f5f0] mb-4 leading-tight">
                      {game.title}
                    </h3>
                    <p className="text-sm text-[#f5f5f0]/50 leading-relaxed line-clamp-3">
                      {game.description}
                    </p>
                  </div>

                  {/* Desktop: logo panel */}
                  <div className="hidden md:flex w-44 shrink-0 relative overflow-hidden border-l border-white/5 items-center justify-center">
                    <div
                      className="absolute inset-0"
                      style={{ background: `radial-gradient(ellipse at center, ${game.accent}40 0%, transparent 70%)` }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={game.logo}
                      alt={game.title}
                      className="relative z-10 w-28 h-28 object-contain opacity-85 drop-shadow-lg"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>

                  {/* Hover accent line */}
                  <div
                    className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: game.accent }}
                  />
                </>
              )}

              {/* ── FILM CARD ── */}
              {film && (
                <>
                  {/* Mobile: title on top */}
                  <div className="md:hidden px-5 pt-5 pb-3 shrink-0">
                    <h3 className="text-xl font-bold text-[#f5f5f0] leading-tight">
                      {film.title}
                    </h3>
                  </div>

                  {/* Mobile: full poster */}
                  <div className="md:hidden flex-1 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={film.poster}
                      alt={film.title}
                      className="h-full w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>

                  {/* Desktop: text content */}
                  <div className="hidden md:flex flex-1 p-10 flex-col justify-center min-w-0">
                    <span className="text-xs tracking-[0.3em] uppercase text-[#d30000] mb-4 block">
                      {film.genre}
                    </span>
                    <h3 className="text-3xl font-bold text-[#f5f5f0] mb-2 leading-tight">
                      {film.title}
                    </h3>
                    <p className="text-xs text-[#f5f5f0]/30 mb-4 tracking-wider">
                      {film.director} · {film.year}
                    </p>
                    <p className="text-sm text-[#f5f5f0]/50 leading-relaxed line-clamp-3">
                      {film.description}
                    </p>
                  </div>

                  {/* Desktop: poster */}
                  <div className="hidden md:block w-44 shrink-0 relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={film.poster}
                      alt={film.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-500"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Hover line */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#d30000] group-hover:w-full transition-all duration-500" />
                </>
              )}

            </motion.a>
          </AnimatePresence>
        </div>

        {/* Next */}
        <button
          onClick={() => go(1)}
          className="shrink-0 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center border border-white/10 text-white/40 hover:border-[#d30000] hover:text-[#d30000] transition-all duration-300"
          aria-label="Suivant"
        >→</button>
      </motion.div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: itemCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === safeIndex ? "bg-[#d30000] w-5" : "bg-white/20 hover:bg-white/40 w-1.5"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
}

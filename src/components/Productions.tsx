"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import FilmStrip from "@/components/FilmStrip";
import StaticGrain from "@/components/StaticGrain";
import { useLanguage } from "@/context/LanguageContext";

export default function Productions() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { text } = useLanguage();
  const p = text.productions_page;

  return (
    <section
      id="489productions"
      className="relative py-32 overflow-hidden"
      style={{ background: "#0d0000" }}
    >
      <StaticGrain />

      {/* Red ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(211,0,0,0.12) 0%, transparent 70%)",
        }}
      />

      <FilmStrip side="left" />
      <FilmStrip side="right" />

      {/* Logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="relative w-[70vw] max-w-3xl opacity-[0.045]">
          <Image
            src="/alternate-logo.png"
            alt=""
            width={1200}
            height={600}
            className="w-full h-auto object-contain select-none"
            aria-hidden
          />
        </div>
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-20 px-8 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p className="text-xs tracking-[0.6em] uppercase text-[#d30000] mb-6">
            {p.label}
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            489Productions
          </h2>
          <p
            className="text-2xl md:text-3xl text-white/60 tracking-widest mt-4"
            style={{ fontFamily: "var(--font-open-sans)", fontStyle: "italic" }}
          >
            Vision. Production. Action!
          </p>
          <div className="w-12 h-px bg-[#d30000] mx-auto mt-10" />
        </motion.div>

        {/* About */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-white/50 max-w-2xl mx-auto mb-20 leading-relaxed"
        >
          {p.about}
        </motion.p>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {p.services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
              className="border border-white/10 p-8 relative group hover:border-[#d30000]/50 transition-colors duration-500"
            >
              <span
                className="text-5xl font-bold text-[#d30000]/25 mb-4 block"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                {service.number}
              </span>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {service.description}
              </p>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-[#d30000] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-white/30 mb-8 text-sm tracking-widest uppercase">
            {p.cta_label}
          </p>
          <a
            href="mailto:hugopezzo@outlook.com"
            className="inline-block px-12 py-4 bg-[#d30000] text-white text-sm font-semibold tracking-widest uppercase hover:bg-[#ff1a1a] transition-colors duration-300"
          >
            {p.cta_button}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

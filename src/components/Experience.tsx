"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { text } = useLanguage();

  return (
    <section id="parcours" className="py-32 px-8 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-sm tracking-[0.4em] uppercase text-[#d30000] mb-4">
          {text.experience.label}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f0] mb-8">
          {text.experience.title}
        </h2>
        <p
          className="text-lg text-[#f5f5f0]/50 max-w-2xl leading-relaxed italic"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {text.experience.summary}
        </p>
      </motion.div>

      <div className="relative max-w-2xl">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-[#f5f5f0]/10" />
        <div className="space-y-12 pl-10">
          {text.experience.items.map((exp, index) => (
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

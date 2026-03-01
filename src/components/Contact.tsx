"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { text } = useLanguage();

  return (
    <section id="contact" className="py-32 px-8 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-sm tracking-[0.4em] uppercase text-[#d30000] mb-4">
          {text.contact.label}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f0] mb-6">
          {text.contact.title}
        </h2>
        <p className="text-[#f5f5f0]/50 max-w-md mx-auto mb-12 leading-relaxed">
          {text.contact.desc}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.a
            href="mailto:hugopezzo@outlook.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-10 py-4 bg-[#d30000] text-white text-sm font-semibold tracking-widest uppercase hover:bg-[#ff1a1a] transition-colors duration-300"
          >
            hugopezzo@outlook.com
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/hugo-pezzo"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-10 py-4 border border-[#f5f5f0]/20 text-[#f5f5f0]/70 text-sm font-semibold tracking-widest uppercase hover:border-[#d30000] hover:text-[#d30000] transition-colors duration-300"
          >
            LinkedIn
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

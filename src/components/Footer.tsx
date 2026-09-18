"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { text } = useLanguage();

  return (
    <footer className="relative z-20 py-8 text-center text-xs text-[#f5f5f0]/20 tracking-widest uppercase border-t border-[#f5f5f0]/5">
      © {new Date().getFullYear()} {text.footer}
    </footer>
  );
}

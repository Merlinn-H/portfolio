"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const is489 = pathname === "/489productions";
  const isMain = pathname === "/" || pathname === "/films";
  const [activeSection, setActiveSection] = useState<string>("");
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { locale, setLocale, text } = useLanguage();

  const links = [
    { href: "/#projets", id: "projets", label: text.nav.projects },
    { href: "/#competences", id: "competences", label: text.nav.skills },
    { href: "/#parcours", id: "parcours", label: text.nav.experience },
    { href: "/#gaming", id: "gaming", label: text.nav.gaming },
    { href: "/#contact", id: "contact", label: text.nav.contact },
  ];

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  // Close desktop lang dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const otherLocale = locale === "fr" ? "en" : "fr";

  return (
    <>
      {/* ── DESKTOP NAV ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center px-8 py-5"
        style={{
          backdropFilter: "blur(16px)",
          background: "rgba(8,8,8,0.88)",
          borderBottom: "1px solid rgba(211,0,0,0.25)",
          boxShadow: "0 1px 30px rgba(211,0,0,0.06)",
        }}
      >
        {/* 489 logo */}
        <a
          href="/489productions"
          className={`group flex items-center mr-6 shrink-0 transition-all duration-300 p-1 ${
            is489
              ? "opacity-100 border border-[#d30000]"
              : "opacity-70 hover:opacity-100 border border-transparent"
          }`}
        >
          <Image
            src="/alternate-logo.png"
            alt="489Productions"
            width={120}
            height={40}
            className="h-7 w-auto object-contain"
          />
        </a>

        {/* Separator */}
        <div className="w-px h-4 bg-white/15 mr-6" />

        {/* Name — centered */}
        <a
          href="/"
          className={`absolute left-1/2 -translate-x-1/2 px-2 py-1 transition-all duration-300 border ${
            isMain
              ? "border-[#d30000] text-[#f5f5f0]"
              : "border-transparent text-[#f5f5f0]/50 hover:text-[#f5f5f0]"
          }`}
          style={{ fontFamily: "var(--font-open-sans)", fontWeight: 700 }}
        >
          <span className="text-sm tracking-widest uppercase">Hugo Pezzo</span>
        </a>

        {/* Nav links */}
        <ul className="flex gap-7 mr-8 ml-auto">
          {links.map((link) => {
            const isActive = pathname === "/" && activeSection === link.id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-xs tracking-widest uppercase relative group transition-colors duration-300 ${
                    isActive
                      ? "text-[#d30000]"
                      : "text-[#f5f5f0]/40 hover:text-[#d30000]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#d30000] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop language switcher */}
        <div ref={langRef} className="relative">
          <button
            onClick={() => setLangOpen((v) => !v)}
            className="text-xs tracking-widest uppercase text-[#f5f5f0]/40 hover:text-[#d30000] transition-colors duration-300 flex items-center gap-1.5 border border-[#f5f5f0]/10 hover:border-[#d30000]/40 px-3 py-1.5"
          >
            {locale.toUpperCase()}
            <motion.span
              animate={{ rotate: langOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-[10px]"
            >
              ▾
            </motion.span>
          </button>

          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 border border-[#f5f5f0]/10 bg-[#080808]"
              >
                <button
                  onClick={() => {
                    setLocale(otherLocale);
                    setLangOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-xs tracking-widest uppercase text-[#f5f5f0]/40 hover:text-[#d30000] hover:bg-[#d30000]/5 transition-colors duration-200 whitespace-nowrap"
                >
                  {otherLocale.toUpperCase()}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* ── MOBILE HAMBURGER BUTTON ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        onClick={() => setMobileOpen(true)}
        className="fixed top-5 left-5 z-50 md:hidden w-11 h-11 flex flex-col items-center justify-center gap-[5px]"
        style={{
          backdropFilter: "blur(12px)",
          background: "rgba(8,8,8,0.88)",
          border: "1px solid rgba(211,0,0,0.25)",
        }}
        aria-label="Menu"
      >
        <span className="w-5 h-px bg-[#f5f5f0]/70 block" />
        <span className="w-5 h-px bg-[#f5f5f0]/70 block" />
        <span className="w-5 h-px bg-[#f5f5f0]/70 block" />
      </motion.button>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/70 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="fixed top-0 left-0 bottom-0 z-[70] w-72 md:hidden flex flex-col"
              style={{
                backdropFilter: "blur(20px)",
                background: "rgba(8,8,8,0.97)",
                borderRight: "1px solid rgba(211,0,0,0.2)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#f5f5f0]/10">
                <a href="/" onClick={() => setMobileOpen(false)}>
                  <Image
                    src="/alternate-logo.png"
                    alt="489Productions"
                    width={100}
                    height={34}
                    className="h-6 w-auto object-contain opacity-70"
                  />
                </a>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-[#f5f5f0]/40 hover:text-[#d30000] transition-colors duration-200 text-base leading-none"
                  aria-label="Fermer"
                >
                  ✕
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col px-6 py-8 gap-7 flex-1">
                {links.map((link, i) => {
                  const isActive = pathname === "/" && activeSection === link.id;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + i * 0.055 }}
                      onClick={() => setMobileOpen(false)}
                      className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
                        isActive ? "text-[#d30000]" : "text-[#f5f5f0]/60 hover:text-[#d30000]"
                      }`}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Language switcher */}
              <div className="px-6 pb-8 pt-6 border-t border-[#f5f5f0]/10">
                <div className="flex gap-3">
                  {(["fr", "en"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLocale(l);
                        setMobileOpen(false);
                      }}
                      className={`flex-1 py-2 text-xs tracking-widest uppercase border transition-colors duration-200 ${
                        locale === l
                          ? "border-[#d30000] text-[#d30000]"
                          : "border-[#f5f5f0]/10 text-[#f5f5f0]/40 hover:border-[#d30000]/40"
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

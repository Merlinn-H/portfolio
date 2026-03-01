"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/#projets", id: "projets", label: "Projets" },
  { href: "/#competences", id: "competences", label: "Compétences" },
  { href: "/#parcours", id: "parcours", label: "Parcours" },
  { href: "/#gaming", id: "gaming", label: "Gaming" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const is489 = pathname === "/489productions";
  const isMain = pathname === "/" || pathname === "/films";
  const [activeSection, setActiveSection] = useState<string>("");

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

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center px-8 py-5"
      style={{
        backdropFilter: "blur(16px)",
        background: "rgba(8,8,8,0.88)",
        borderBottom: "1px solid rgba(211,0,0,0.25)",
        boxShadow: "0 1px 30px rgba(211,0,0,0.06)",
      }}
    >
      {/* 489 logo — highlighted on /489productions */}
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
      <div className="w-px h-4 bg-white/15 mr-6 hidden md:block" />

      {/* Name — highlighted on main page & /films */}
      <a
        href="/"
        className={`mr-auto px-2 py-1 transition-all duration-300 border ${
          isMain
            ? "border-[#d30000] text-[#f5f5f0]"
            : "border-transparent text-[#f5f5f0]/50 hover:text-[#f5f5f0]"
        }`}
        style={{ fontFamily: "var(--font-open-sans)", fontWeight: 700 }}
      >
        <span className="text-xs tracking-widest uppercase">Hugo Pezzo</span>
      </a>

      {/* Nav links with active section indicator */}
      <ul className="hidden md:flex gap-7">
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
    </motion.nav>
  );
}

"use client";
import { motion } from "framer-motion";

const links = [
  { href: "#projets", label: "Projets" },
  { href: "#competences", label: "Compétences" },
  { href: "#parcours", label: "Parcours" },
  { href: "#gaming", label: "Gaming" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
      style={{ backdropFilter: "blur(12px)", background: "rgba(8,8,8,0.8)" }}
    >
      <span className="text-sm font-medium tracking-widest uppercase text-[#d4a853]">
        Hugo Pezzo
      </span>
      <ul className="hidden md:flex gap-8">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm tracking-wide text-[#f5f5f0]/60 hover:text-[#d4a853] transition-colors duration-300"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

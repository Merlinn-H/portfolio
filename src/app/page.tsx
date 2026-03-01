import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Gaming from "@/components/Gaming";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-[#080808] min-h-screen">
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Gaming />
      <Contact />
      <footer className="py-8 text-center text-xs text-[#f5f5f0]/20 tracking-widest uppercase border-t border-[#f5f5f0]/5">
        © 2025 Hugo Pezzo — Tous droits réservés
      </footer>
    </main>
  );
}

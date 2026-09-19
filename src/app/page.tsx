"use client";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Gaming from "@/components/Gaming";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#080808] min-h-screen">
      <ProgressBar />
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Gaming />
      <Contact />
      <Footer />
    </main>
  );
}

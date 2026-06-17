"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import { useThemeState } from "@/hooks/use-theme-state";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, mounted } = useThemeState();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = ["home", "about", "services", "projects", "testimonials", "process", "contact"];
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: "#about", label: "Nosotros" },
    { href: "#services", label: "Servicios" },
    { href: "/precios", label: "Precios" },
    { href: "#projects", label: "Proyectos" },
    { href: "#process", label: "Proceso" },
    { href: "/blog", label: "Blog" },
  ];

  const getLinkClass = (section: string) => {
    const sectionId = section.replace("#", "");
    const isActive = activeSection === sectionId;
    return `text-sm transition-all duration-300 px-4 py-2 rounded-full ${
      isActive
        ? "bg-black/5 dark:bg-white/5 text-brand font-semibold"
        : "text-foreground/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground font-medium"
    }`;
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center w-full pointer-events-none transition-all duration-500 ${isScrolled ? "pt-4 md:pt-6 px-4" : "pt-0 px-0"}`}>
      <header
        className={`pointer-events-auto transition-all duration-500 w-full relative overflow-hidden ${
          isScrolled
            ? "max-w-5xl bg-slate-50/70 dark:bg-[#050505]/70 backdrop-blur-[24px] border border-black/10 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-full py-3"
            : "max-w-full bg-gradient-to-b from-slate-50/80 via-slate-50/40 to-transparent dark:from-[#050505]/80 dark:via-[#050505]/40 dark:to-transparent backdrop-blur-[8px] py-6"
        }`}
      >
        <div className={`mx-auto ${isScrolled ? "px-6 sm:px-8" : "container px-4 sm:px-6 lg:px-8"}`}>
          <div className="flex items-center justify-between relative z-10">
          {/* Logo — clean, no glow */}
          <Link href="/" className="relative opacity-90 hover:opacity-100 transition-opacity duration-200 mr-2 shrink-0">
            <Image
              src={theme === "light" ? "/logo_ico/final - LOGO 2-01.png" : "/logo_ico/final - LOGO 2-02.png"}
              alt="Árkos Logo"
              width={250}
              height={100}
              className="w-auto h-10 md:h-12 lg:h-14 object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation — no staggered animations */}
          <nav className="hidden md:flex items-center space-x-8 translate-y-[0.5px]">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={getLinkClass(link.href)}>
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
            <Button asChild size="sm">
              <Link href="#contact">Contáctanos</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              className="focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
            className="md:hidden fixed top-24 left-4 right-4 bg-slate-50/95 dark:bg-[#050505]/95 backdrop-blur-[24px] border border-black/10 dark:border-white/10 shadow-2xl rounded-3xl pointer-events-auto z-40 overflow-hidden"
          >
            <nav className="p-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium transition-all duration-300 p-3 rounded-2xl ${
                    activeSection === link.href.replace("#", "")
                      ? "bg-black/5 dark:bg-white/5 text-brand"
                      : "text-foreground/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
                  }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="w-full h-12 rounded-xl text-base mt-4" onClick={closeMenu}>
                <Link href="#contact">Contáctanos</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

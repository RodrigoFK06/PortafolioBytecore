"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ["home", "about", "services", "projects", "testimonials", "contact"];

      for (const section of sections.reverse()) {
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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.05,  // Pequeña escala al hacer hover
              filter: "drop-shadow(0px 0px 10px rgba(0, 170, 255, 0.6))", // Efecto de brillo azul
            }}
            className="relative flex items-center"
          >
            <Link href="/" className="relative">
              {/* Brillo dinámico con glassmorfismo */}
              <motion.div
                className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full opacity-0 transition-opacity duration-300"
                whileHover={{ opacity: 0.5 }} // Se activa con hover
              />

              {/* Logo ByteCore, cambia según el tema */}
              <Image
                src={theme === "light" ? "/logonegro.webp" : "/logoblanco.webp"}
                alt="ByteCore Logo"
                width={250}
                height={100}
                className="w-auto h-10 md:h-12 lg:h-14 object-contain transition-transform duration-300"
                priority
              />
            </Link>
          </motion.div>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link
                href="#about"
                className={`text-sm transition-colors hover:text-brand ${activeSection === "about" ? "font-black" : theme === "light" ? "text-gray-800 font-bold" : "text-white font-bold"}`}
              >
                Nosotros
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="#services"
                className={`text-sm transition-colors hover:text-brand ${activeSection === "services" ? "font-black" : theme === "light" ? "text-gray-800 font-bold" : "text-white font-bold"}`}
              >
                Servicios
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="#projects"
                className={`text-sm transition-colors hover:text-brand ${activeSection === "projects" ? "font-black" : theme === "light" ? "text-gray-800 font-bold" : "text-white font-bold"}`}
              >
                Proyectos
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="#testimonials"
                className={`text-sm transition-colors hover:text-brand ${activeSection === "testimonials" ? "font-black" : theme === "light" ? "text-gray-800 font-bold" : "text-white font-bold"}`}
              >
                Testimonios
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                href="#contact"
                className={`text-sm transition-colors hover:text-brand ${activeSection === "contact" ? "font-black" : theme === "light" ? "text-gray-800 font-bold" : "text-white font-bold"}`}
              >
                Contacto
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <ThemeToggle />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild>
                <Link href="#contact">Contáctanos</Link>
              </Button>
            </motion.div>
          </nav>


          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button className="focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-md"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              <Link
                href="#about"
                className={`text-foreground text-sm hover:text-brand transition-colors py-2 ${activeSection === "about" ? "text-brand font-medium" : ""
                  }`}
                onClick={closeMenu}
              >
                Nosotros
              </Link>
              <Link
                href="#services"
                className={`text-foreground text-sm hover:text-brand transition-colors py-2 ${activeSection === "services" ? "text-brand font-medium" : ""
                  }`}
                onClick={closeMenu}
              >
                Servicios
              </Link>
              <Link
                href="#projects"
                className={`text-foreground text-sm hover:text-brand transition-colors py-2 ${activeSection === "projects" ? "text-brand font-medium" : ""
                  }`}
                onClick={closeMenu}
              >
                Proyectos
              </Link>
              <Link
                href="#testimonials"
                className={`text-foreground text-sm hover:text-brand transition-colors py-2 ${activeSection === "testimonials" ? "text-brand font-medium" : ""
                  }`}
                onClick={closeMenu}
              >
                Testimonios
              </Link>
              <Link
                href="#contact"
                className={`text-foreground text-sm hover:text-brand transition-colors py-2 ${activeSection === "contact" ? "text-brand font-medium" : ""
                  }`}
                onClick={closeMenu}
              >
                Contacto
              </Link>
              <Button asChild className="w-full" onClick={closeMenu}>
                <Link href="#contact">Contáctanos</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

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

      const sections = ["home", "about", "services", "projects", "testimonials", "contact"];
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
    { href: "#projects", label: "Proyectos" },
    { href: "#testimonials", label: "Testimonios" },
    { href: "#contact", label: "Contacto" },
  ];

  const getLinkClass = (section: string) => {
    const sectionId = section.replace("#", "");
    const isActive = activeSection === sectionId;
    return `text-sm transition-colors duration-200 ${
      isActive
        ? "text-brand font-semibold"
        : "text-foreground/70 hover:text-foreground font-medium"
    }`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo — clean, no glow */}
          <Link href="/" className="relative opacity-90 hover:opacity-100 transition-opacity duration-200">
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
          <nav className="hidden md:flex items-center space-x-8">
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-foreground text-sm hover:text-brand transition-colors py-2 ${
                    activeSection === link.href.replace("#", "")
                      ? "text-brand font-medium"
                      : ""
                  }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
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

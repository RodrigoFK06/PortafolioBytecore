"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

// ── Navbar "Light 2026" ─────────────────────────────────────────
// Barra fija full-width con hairline inferior — precisión, no vidrio.

const NAV_LINKS = [
  { href: "#about", label: "Nosotros" },
  { href: "#services", label: "Servicios" },
  { href: "/precios", label: "Precios" },
  { href: "#projects", label: "Proyectos" },
  { href: "#process", label: "Proceso" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = ["home", "about", "services", "technologies", "projects", "fundador", "testimonials", "process", "contact"];
      const activationLine = window.innerHeight * 0.4;
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= activationLine) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const linkClass = (href: string) => {
    const isActive = activeSection === href.replace("#", "");
    return `text-sm font-medium transition-colors ${
      isActive ? "text-brand" : "text-muted-foreground hover:text-foreground"
    }`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b transition-[border-color,background-color] duration-300 ${
        isScrolled ? "border-border" : "border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="relative shrink-0 opacity-90 hover:opacity-100 transition-opacity">
            <Image
              src="/logo_ico/final - LOGO 2-01.png"
              alt="Árkos Logo"
              width={250}
              height={100}
              className="w-auto h-9 md:h-11 object-contain"
              priority
            />
          </Link>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="inline-flex items-center px-5 py-2.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
            >
              Contáctanos
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 -mr-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-3 border-b border-border/60 last:border-0 ${linkClass(link.href)}`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={closeMenu}
              className="mt-4 inline-flex items-center justify-center px-5 py-3 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
            >
              Contáctanos
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

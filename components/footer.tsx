"use client";

import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Github, Linkedin } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"
import { useThemeState } from "@/hooks/use-theme-state";
import { BrochureDownloadButton } from "@/components/brochure/BrochureDownloadButton";

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { theme, mounted } = useThemeState();

  return (
    <footer className="bg-slate-50 dark:bg-[#050505] py-16 border-t border-black/5 dark:border-white/10 relative overflow-hidden transition-colors duration-500">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-[0.06] dark:opacity-[0.04] bg-noise" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12">
        {/* Brochure Download CTA */}
        <div className="mb-16 flex flex-col md:flex-row items-center justify-between bg-black/5 dark:bg-white/5 rounded-3xl p-8 border border-black/5 dark:border-white/10 shadow-sm">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2 text-foreground">Descubre todo lo que podemos hacer por ti</h3>
            <p className="text-foreground/70 max-w-xl">Descarga nuestro brochure corporativo y conoce en detalle nuestros servicios de ERP, CRM, automatización, IA y desarrollo de software a medida.</p>
          </div>
          <div className="flex-shrink-0">
            <BrochureDownloadButton />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
          <Link href="/">
              <Image
                src={theme === "light" ? "/logo_ico/final - LOGO 2-01.png" : "/logo_ico/final - LOGO 2-02.png"}
                alt="Árkos Logo"
                width={250}  
                height={100}
                className="w-auto h-10 md:h-12 lg:h-14 object-contain"
                priority
              />
            </Link>
            <p className="text-foreground/60 max-w-md mt-6 mb-8 leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="flex space-x-4">
              <Link
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-foreground hover:bg-black/10 dark:hover:bg-white/10 hover:text-brand transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-foreground hover:bg-black/10 dark:hover:bg-white/10 hover:text-brand transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-foreground hover:bg-black/10 dark:hover:bg-white/10 hover:text-brand transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-6 text-foreground">Navegación</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#about" className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Testimonios
                </Link>
              </li>
              <li>
                <Link href="#process" className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Proceso
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-6 text-foreground">Servicios</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#services" className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Desarrollo Web
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Diseño UI/UX
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  E-Commerce
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Software a Medida
                </Link>
              </li>
            </ul>

            <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-4 mt-8 text-foreground">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                <span>{SITE_CONFIG.contact.address}</span>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="flex items-start gap-2 text-foreground/70 hover:text-brand transition-colors break-all"
                >
                  <Mail className="h-4 w-4 mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                  <span>{SITE_CONFIG.contact.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/5 dark:border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/50 text-sm font-medium">
            &copy; {currentYear} Árkos. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 mr-12 md:mr-24 lg:mr-28">
            <Link href="/politicadeprivacidad" className="text-foreground/50 hover:text-brand transition-colors text-sm font-medium">
              Privacidad
            </Link>
            <Link href="/terminosycondiciones" className="text-foreground/50 hover:text-brand transition-colors text-sm font-medium">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


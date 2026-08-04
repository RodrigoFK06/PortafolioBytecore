"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Mail, MapPin, Github, Linkedin } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"
import { BrochureDownloadButton } from "@/components/brochure/BrochureDownloadButton";

export function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  // Las anclas solo existen en el home: desde subpáginas navegan a /#ancla.
  const toHref = (href: string) => (href.startsWith("#") && pathname !== "/" ? `/${href}` : href)

  return (
    <footer className="bg-background py-16 border-t border-border relative">
      {/* Noise Texture Overlay */}
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12">
        {/* Brochure Download CTA */}
        <div className="mb-16 flex flex-col md:flex-row items-center justify-between bg-secondary rounded-lg p-8 shadow-hairline">
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
                src="/logo_ico/final - LOGO 2-01.png"
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
                className="w-10 h-10 rounded-md shadow-hairline flex items-center justify-center text-muted-foreground hover:text-brand hover:shadow-hairline-md transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md shadow-hairline flex items-center justify-center text-muted-foreground hover:text-brand hover:shadow-hairline-md transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="w-10 h-10 rounded-md shadow-hairline flex items-center justify-center text-muted-foreground hover:text-brand hover:shadow-hairline-md transition-all duration-300"
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
                <Link href={toHref("#about")} className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href={toHref("#services")} className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href={toHref("#projects")} className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href={toHref("#testimonials")} className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Testimonios
                </Link>
              </li>
              <li>
                <Link href={toHref("#process")} className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Proceso
                </Link>
              </li>
              <li>
                <Link href={toHref("#contact")} className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-6 text-foreground">Servicios</h3>
            {/* Cada enlace apunta a su subpágina real. Antes los cuatro
                apuntaban a /services: cuatro enlaces, un solo destino. */}
            <ul className="space-y-4">
              <li>
                <Link href="/services/desarrollo-web" className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Desarrollo Web
                </Link>
              </li>
              <li>
                <Link href="/services/diseno-ux-ui" className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Diseño UI/UX
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce" className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  E-Commerce
                </Link>
              </li>
              <li>
                <Link href="/services/software-a-medida" className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Software a Medida
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-foreground/70 hover:text-brand transition-colors font-medium">
                  Ver todos los servicios
                </Link>
              </li>
            </ul>

            <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-4 mt-8 text-foreground">Cobertura</h3>
            {/* Google reportaba "página de referencia: no se ha detectado
                ninguna" en varias URLs. Un enlace global desde el footer es la
                forma más barata de que la página de Lima tenga referencias. */}
            <p className="text-sm text-foreground/70 leading-relaxed mb-6">
              <Link href="/desarrollo-de-software-lima" className="text-foreground hover:text-brand transition-colors font-medium">
                Lima
              </Link>
              {" · Trujillo · Todo el Perú"}
            </p>

            <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-4 text-foreground">Contacto</h3>
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

        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/50 text-sm font-medium">
            &copy; {currentYear} Árkos. Todos los derechos reservados.{" "}
            <a
              href="https://xn--rkos-4na.com"
              target="_blank"
              rel="noopener"
              className="hover:text-brand transition-colors"
            >
              Desarrollado por Árkos
            </a>
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


"use client";

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Mail, MapPin, Github, Linkedin, ChevronDown } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"
import { BrochureDownloadButton } from "@/components/brochure/BrochureDownloadButton";

const linkClass = "text-foreground/70 hover:text-brand transition-colors font-medium"

/**
 * Grupo de enlaces del pie. En escritorio se ve como siempre (título + lista);
 * en móvil (< 768 px) el título es un botón que abre y cierra la lista. Antes
 * el pie medía ~2,500 px en un celular: siete listas apiladas una tras otra.
 * Los enlaces siguen en el HTML aunque estén plegados: el pie es el único
 * bloque que sale en todas las páginas y su enlazado interno importa.
 */
function FooterGroup({ id, title, children, className = "" }: { id: string; title: string; children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false)
  const panelId = `pie-${id}`
  return (
    <div className={`border-b border-border md:border-0 ${className}`}>
      <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden w-full flex items-center justify-between gap-4 py-4 text-left uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
        >
          {title}
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
        <span className="hidden md:block mb-5">{title}</span>
      </h3>
      <div id={panelId} className={`${open ? "block" : "hidden"} md:block pb-5 md:pb-0`}>
        {children}
      </div>
    </div>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  // Las anclas solo existen en el home: desde subpáginas navegan a /#ancla.
  const toHref = (href: string) => (href.startsWith("#") && pathname !== "/" ? `/${href}` : href)

  return (
    <footer className="bg-background py-12 md:py-16 border-t border-border relative">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12">
        {/* Descarga del brochure */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-secondary rounded-lg p-6 md:p-8 shadow-hairline">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground">Árkos en un PDF</h3>
            <p className="text-foreground/70 max-w-xl text-sm md:text-base leading-relaxed">
              Servicios, precios «desde» y casos, en un archivo para pasárselo a quien decide en
              tu empresa.
            </p>
          </div>
          <div className="flex-shrink-0">
            <BrochureDownloadButton />
          </div>
        </div>

        {/* En tablet (768–1023 px) la marca ocupa su fila y los enlaces van en
            dos columnas: con cuatro, cada una quedaba de ~120 px y el correo
            se partía a media palabra. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-x-12 md:gap-y-10 lg:gap-12">
          <div className="md:col-span-2 pb-8 md:pb-0 border-b border-border md:border-0">
            <Link href="/" className="inline-block">
              <Image
                src="/logo_ico/final - LOGO 2-01.png"
                alt="Árkos Logo"
                width={250}
                height={100}
                className="w-auto h-10 md:h-12 lg:h-14 object-contain"
                priority
              />
            </Link>
            <p className="text-foreground/60 max-w-md mt-5 mb-6 md:mt-6 md:mb-8 leading-relaxed">
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
                <Github className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md shadow-hairline flex items-center justify-center text-muted-foreground hover:text-brand hover:shadow-hairline-md transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="w-10 h-10 rounded-md shadow-hairline flex items-center justify-center text-muted-foreground hover:text-brand hover:shadow-hairline-md transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="md:space-y-8">
            <FooterGroup id="navegacion" title="Navegación">
              <ul className="space-y-4">
                <li>
                  <Link href={toHref("#about")} className={linkClass}>
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link href={toHref("#services")} className={linkClass}>
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link href="/taller" className={linkClass}>
                    Taller de adopción
                  </Link>
                </li>
                <li>
                  <Link href="/diagnostico" className={linkClass}>
                    Diagnóstico
                  </Link>
                </li>
                <li>
                  <Link href={toHref("#projects")} className={linkClass}>
                    Proyectos
                  </Link>
                </li>
                <li>
                  <Link href={toHref("#testimonials")} className={linkClass}>
                    Testimonios
                  </Link>
                </li>
                <li>
                  <Link href={toHref("#process")} className={linkClass}>
                    Proceso
                  </Link>
                </li>
                <li>
                  <Link href={toHref("#contact")} className={linkClass}>
                    Contacto
                  </Link>
                </li>
              </ul>
            </FooterGroup>

            {/* Search Console reporta 0 enlaces internos y los 34 externos
                apuntan todos al home: es la única puerta que Google usa. Todo
                lo que importe tiene que estar a UN clic de aquí, y el footer
                es lo único que sale en todas las páginas. */}
            <FooterGroup id="herramientas" title="Herramientas">
              <ul className="space-y-4">
                <li>
                  <Link href="/necesitas-un-sistema" className={linkClass}>
                    ¿Necesitas un sistema?
                  </Link>
                </li>
                <li>
                  <Link href="/costo-del-excel" className={linkClass}>
                    Calculadora: el costo del Excel
                  </Link>
                </li>
                <li>
                  <Link href="/cumplimiento-sunat" className={linkClass}>
                    Evaluación de cumplimiento SUNAT
                  </Link>
                </li>
                <li>
                  <Link href="/precios" className={linkClass}>
                    Precios
                  </Link>
                </li>
              </ul>
            </FooterGroup>
          </div>

          <div className="md:space-y-8">
            {/* /facturarkos recibia enlace desde 2 de las 36 URLs del sitemap
                (el home y la pagina de Lima). Es la unica pagina de producto
                del sitio y la que los asistentes de IA no encuentran como
                entidad: el cuello de botella no es contenido, es senal
                interna. Va en su propio grupo, no dentro de Servicios, porque
                FacturArkos es un producto, no un servicio a medida. */}
            <FooterGroup id="producto" title="Producto">
              <ul className="space-y-4">
                <li>
                  <Link href="/facturarkos" className={linkClass}>
                    FacturArkos: facturación electrónica SUNAT y POS
                  </Link>
                </li>
              </ul>
            </FooterGroup>

            {/* Cada enlace apunta a su subpágina real. Antes los cuatro
                apuntaban a /services: cuatro enlaces, un solo destino. */}
            <FooterGroup id="servicios" title="Servicios">
              <ul className="space-y-4">
                <li>
                  <Link href="/services/desarrollo-web" className={linkClass}>
                    Desarrollo web
                  </Link>
                </li>
                <li>
                  <Link href="/services/diseno-ux-ui" className={linkClass}>
                    Diseño UX/UI
                  </Link>
                </li>
                <li>
                  <Link href="/services/ecommerce" className={linkClass}>
                    E-commerce
                  </Link>
                </li>
                <li>
                  <Link href="/services/software-a-medida" className={linkClass}>
                    Software a medida
                  </Link>
                </li>
                <li>
                  <Link href="/services/apps-moviles" className={linkClass}>
                    Apps móviles
                  </Link>
                </li>
                <li>
                  <Link href="/services/integracion-ia" className={linkClass}>
                    Automatización e IA
                  </Link>
                </li>
                <li>
                  <Link href="/services" className={linkClass}>
                    Ver todos los servicios
                  </Link>
                </li>
              </ul>
            </FooterGroup>

            {/* Google reportaba "página de referencia: no se ha detectado
                ninguna" en varias URLs. Un enlace global desde el footer es la
                forma más barata de que la página de Lima tenga referencias. */}
            <FooterGroup id="cobertura" title="Cobertura">
              <p className="text-sm text-foreground/70 leading-relaxed">
                <Link href="/desarrollo-de-software-lima" className="text-foreground hover:text-brand transition-colors font-medium">
                  Lima
                </Link>
                {" · Trujillo · Todo el Perú"}
                <br />
                <Link href="/automatizacion-de-procesos-lima" className="text-foreground/70 hover:text-brand transition-colors">
                  Automatización de procesos en Lima
                </Link>
              </p>
            </FooterGroup>

            <FooterGroup id="contacto" title="Contacto">
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
            </FooterGroup>

            {/* Reciprocidad de entidad: el `sameAs` del Organization declara
                estos perfiles, pero hasta ahora ninguno tenía un enlace
                visible en el HTML servido. Sin nofollow a propósito: la
                asociación de entidad es justo la señal que se busca. */}
            <FooterGroup id="en-la-web" title="Árkos en la web">
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="https://x.com/ArkosPeru" target="_blank" rel="noopener" className={linkClass}>
                    Árkos en X (@ArkosPeru)
                  </a>
                </li>
                <li>
                  <a href="https://github.com/arkosdevs" target="_blank" rel="noopener" className={linkClass}>
                    Árkos en GitHub (arkosdevs)
                  </a>
                </li>
                <li>
                  <a href="https://clutch.co/profile/rkos" target="_blank" rel="noopener" className={linkClass}>
                    Árkos en Clutch
                  </a>
                </li>
              </ul>
            </FooterGroup>
          </div>
        </div>

        <div className="md:border-t border-border md:mt-16 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
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
            {/* Razón social y RUC visibles: respaldan el `taxID` del schema con
                texto real de la página y acreditan a Árkos como empresa formal
                ante un cliente peruano que necesita facturar. El RUC va en mono
                porque es un identificador, no prosa — misma lógica que los
                encabezados del pie. */}
            <p className="text-foreground/40 text-xs mt-2">
              {SITE_CONFIG.legal.name} &middot;{" "}
              <span className="font-mono tracking-wide">RUC {SITE_CONFIG.legal.ruc}</span>
            </p>
          </div>
          <div className="flex space-x-6 mr-14 md:mr-24 lg:mr-28">
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

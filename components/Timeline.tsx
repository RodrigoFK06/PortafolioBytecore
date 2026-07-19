"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { StaggerGroup } from "@/components/motion/stagger-group";

type TimelineEventType = {
  year: string;
  title: string;
  description: string;
};

// Lista de eventos
const timelineEvents: TimelineEventType[] = [
  { year: "2020", title: "Inicio de Árkos", description: "Fundamos Árkos con una visión clara: construir software a medida con la calidad y el diseño de una agencia premium, pero con la cercanía de un equipo boutique." },
  { year: "2021", title: "Primeros sistemas a medida", description: "Entregamos nuestros primeros proyectos web para hotelería y pequeñas empresas peruanas (Casaroma Hostels, entre otros), sentando las bases de nuestro stack y nuestro proceso." },
  { year: "2022", title: "Madurez técnica y stack moderno", description: "Consolidamos un stack moderno con React, Next.js y Tailwind, y empezamos a entregar productos web con foco en performance, accesibilidad y diseño premium." },
  { year: "2023", title: "Operación con procesos ágiles", description: "Estandarizamos un método de trabajo ágil con clientes —discovery, sprints cortos y entregables visibles— que hoy es la columna vertebral de cada proyecto." },
  { year: "2024", title: "Salto a SaaS y B2B", description: "Damos el salto a sistemas B2B críticos: lanzamos un PMS para alquileres vacacionales (VR PMS), un CRM ligero (Solutec System) y nuestros primeros sistemas integrales para restaurantes." },
  { year: "2025", title: "Sistemas críticos en producción", description: "Pusimos en producción plataformas exigentes: el CRM/ERP a medida de Solutec DHA para operar su servicio técnico de electrodomésticos, el ERP RestHUB para restaurantes y Rapiditos, nuestra primera app móvil publicada en App Store y Google Play tras un desarrollo nativo con Flutter sobre backend Spring Boot." },
  { year: "2026", title: "PMS hotelero y expansión regional", description: "Estrenamos OrquestadorADM, nuestro PMS + RMS con revenue management avanzado para hoteles de lujo, lanzamos la landing pública de servicios de Solutec DHA y empezamos a operar fuera del Perú con proyectos en Venezuela y Argentina." },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Línea de progreso ligada al scroll: el sistema se completa a medida
  // que recorres la historia.
  useGSAP(
    () => {
      if (!containerRef.current || !lineRef.current) return;
      if (prefersReducedMotion()) {
        gsap.set(lineRef.current, { scaleY: 1 });
        return;
      }
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div className="relative py-4" ref={containerRef}>
      <div className="relative max-w-2xl">
        {/* Riel */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />
        {/* Progreso */}
        <div
          ref={lineRef}
          className="absolute left-[7px] top-2 bottom-2 w-px bg-brand origin-top"
          style={{ transform: "scaleY(0)" }}
          aria-hidden="true"
        />

        <StaggerGroup className="relative space-y-10" stagger={0.06}>
          {timelineEvents.map((event) => (
            <div key={event.year} className="relative pl-10">
              {/* Nodo */}
              <span
                className="absolute left-[7px] top-[7px] w-[9px] h-[9px] -translate-x-1/2 rotate-45 bg-background border border-brand"
                aria-hidden="true"
              />
              <p className="spec-label mb-1.5">
                <span className="tabular">{event.year}</span>
              </p>
              <h3 className="font-display text-lg font-bold text-foreground mb-1.5">{event.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </div>
  );
}

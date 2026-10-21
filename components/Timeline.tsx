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
  { year: "2020", title: "Inicio de Árkos", description: "Empezamos como un equipo pequeño haciendo software a medida para pymes peruanas que se habían quedado cortas con Excel." },
  { year: "2021", title: "Primeros sistemas a medida", description: "Entregamos nuestros primeros proyectos web para hotelería y pequeñas empresas peruanas (Casaroma Hostels, entre otros), sentando las bases de nuestro stack y nuestro proceso." },
  { year: "2022", title: "Nueve personas y un stack fijo", description: "Llegamos a nueve personas y adoptamos React, Next.js y Tailwind como stack de base para todo lo web." },
  { year: "2023", title: "Procesos ágiles e IA en el trabajo diario", description: "Fijamos un método con los clientes —entrevistas al inicio, sprints cortos y entregas que se pueden revisar— y empezamos a usar IA en nuestro propio trabajo: prompts, contexto y sistemas RAG pasaron a ser parte del día a día del equipo." },
  { year: "2024", title: "Sistemas B2B y adopción de IA con clientes", description: "Pasamos a sistemas de los que depende la operación de un negocio: un PMS para alquileres vacacionales (VR PMS), un CRM ligero (Solutec System) y los primeros sistemas completos para restaurantes. Empezamos a acompañar a clientes a usar IA en su trabajo diario." },
  { year: "2025", title: "Sistemas críticos en producción", description: "Pusimos en producción el CRM/ERP de Solutec DHA, con el que opera su servicio técnico de electrodomésticos; el ERP RestHUB para restaurantes, y Rapiditos, nuestra primera app móvil publicada en Google Play, hecha en Flutter sobre un backend Spring Boot." },
  { year: "2026", title: "Empresa constituida, PMS hotelero y expansión", description: "Nos constituimos como Árkos Soluciones Informáticas S.A.C.S. Estrenamos OrquestadorADM, nuestro PMS + RMS con revenue management para hoteles, lanzamos la landing de Solutec DHA y un asistente RAG para sus técnicos de campo, RestHUB superó el primer filtro de COFIDE Launchpad, y operamos fuera del Perú con proyectos en Venezuela y Argentina." },
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

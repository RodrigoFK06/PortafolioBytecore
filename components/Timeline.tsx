"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

type TimelineEventType = {
  year: string;
  title: string;
  description: string;
};

// Lista de eventos
const timelineEvents: TimelineEventType[] = [
  { year: "2020", title: "Inicio de Árkos", description: "Fundamos Árkos con una visión de innovación tecnológica y disrupción." },
  { year: "2021", title: "Primer Gran Proyecto", description: "Desarrollamos nuestra primera plataforma móvil a medida para una empresa transnacional." },
  { year: "2022", title: "Crecimiento de habilidades", description: "Dedicamos horas núcleo a la investigación y el desarrollo para lograr una calidad premium." },
  { year: "2023", title: "Gestión con clientes", description: "Establecimos métodos de gestión ágil que hoy son la columna vertebral de nuestro éxito." },
  { year: "2024", title: "Nuevos Servicios SaaS", description: "Incorporamos soluciones avanzadas con IA y lanzamos nuestro propio SaaS CRM-ERP." },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  return (
    <div className="relative py-8">
      <motion.div ref={containerRef} className="relative max-w-2xl mx-auto md:ml-0 md:mr-auto">
        {/* Línea asimétrica (off-center to the left) */}
        <div className="absolute left-6 md:left-[10%] top-4 bottom-0 w-[1px] bg-black/10 dark:bg-white/10 transition-colors" />
        
        {/* Línea animada de progreso */}
        <motion.div
          className="absolute left-6 md:left-[10%] top-4 w-[1px] bg-brand origin-top shadow-[0_0_10px_#4FF8D2]"
          style={{ height: lineHeight }}
        />

        {/* Contenedor de eventos */}
        <div className="relative space-y-12">
          {timelineEvents.map((event, index) => (
            <TimelineEvent key={event.year} event={event} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function TimelineEvent({ event, index }: { event: TimelineEventType; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isClient) return;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };

  return (
    <div className="relative pl-16 md:pl-[25%]" ref={ref}>
      {/* Punto en la línea asimétrica */}
      <div className="absolute left-6 md:left-[10%] top-6 w-3 h-3 border border-brand bg-slate-50 dark:bg-[#050505] rounded-none transform -translate-x-1/2 z-10 rotate-45 transition-all duration-300 group-hover:scale-150 group-hover:bg-brand" />

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
        className="relative"
      >
        <div
          className="relative group cursor-crosshair"
          onMouseMove={handleMouseMove}
        >
          {/* Tarjeta de Glassmorfismo Chiseled */}
          <div className="relative bg-black/[0.04] dark:bg-white/[0.01] backdrop-blur-[12px] p-6 rounded-xl border border-black/10 dark:border-white/5 transition-all duration-500 overflow-hidden">
             
            {/* Brillo interactivo (Linterna / Flashlight) */}
            {isClient && (
               <motion.div
                 className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                 style={{
                   background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--brand) / 0.15), transparent 40%)`,
                 }}
               />
            )}

            <div className="font-mono text-brand text-xs uppercase tracking-[0.2em] mb-2 font-semibold flex items-center relative z-10">
              <span className="opacity-50 mr-2">[ARCHIVE]</span>{event.year}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand transition-colors relative z-10">{event.title}</h3>
            <p className="text-foreground/70 text-sm leading-relaxed relative z-10">{event.description}</p>
            
            {/* Chiseled Light border on hover */}
            <div className="absolute inset-0 border border-black/0 dark:border-white/0 group-hover:border-black/10 dark:group-hover:border-white/10 rounded-xl transition-colors pointer-events-none opacity-0 group-hover:opacity-100 z-20" style={{ background: "linear-gradient(135deg, rgba(150,150,150,0.15) 0%, rgba(150,150,150,0) 100%)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "1px"}} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Define el tipo de evento
type TimelineEventType = {
  year: string;
  title: string;
  description: string;
};

// Lista de eventos en zig-zag
const timelineEvents: TimelineEventType[] = [
  { year: "2018", title: "Inicio de ByteCore", description: "Fundamos ByteCore con una visión de innovación tecnológica." },
  { year: "2020", title: "Primer Gran Proyecto", description: "Desarrollamos nuestra primera plataforma SaaS para empresas." },
  { year: "2021", title: "Expansión", description: "Crecimos y ampliamos nuestro equipo con más talento especializado." },
  { year: "2023", title: "Reconocimiento Internacional", description: "Fuimos reconocidos como una de las startups más innovadoras." },
  { year: "2024", title: "Lanzamiento de Nuevos Servicios", description: "Incorporamos soluciones avanzadas con IA y blockchain." },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  return (
    <div className="relative py-16 bg-gradient-to-b from-gray-900 to-gray-990 rounded-3xl">
      <motion.div ref={containerRef} className="relative max-w-4xl mx-auto px-6">
        {/* Línea central estática */}
        <div className="absolute left-1/2 top-10 bottom-10 w-1 bg-gray-700 transform -translate-x-1/2 rounded-lg" />
        
        {/* Línea animada de progreso */}
        <motion.div
          className="absolute left-1/2 top-10 w-1 bg-blue-500 transform -translate-x-1/2 origin-top rounded-lg"
          style={{ height: lineHeight }}
        />

        {/* Contenedor de eventos */}
        <div className="relative space-y-16">
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
  const isLeft = index % 2 === 0;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Manejar la posición del mouse para efectos dinámicos
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - left - width / 2,
      y: e.clientY - top - height / 2,
    });
  };

  return (
    <div className="relative" ref={ref}>
      {/* Punto en la línea central */}
      <div className="absolute left-1/2 top-7 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 z-10">
        <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`grid grid-cols-1 md:grid-cols-2 items-start`}
      >
        {/* Tarjeta del evento - alternando posición */}
        <div
          className={`${isLeft ? "md:col-start-1 md:pr-10" : "md:col-start-2 md:pl-10"} col-span-1 relative`}
          onMouseMove={handleMouseMove}
        >
          {/* Brillo interactivo */}
          <motion.div
            className="absolute inset-0 bg-white/10 rounded-lg blur-2xl opacity-0 pointer-events-none"
            style={{
              x: mousePos.x,
              y: mousePos.y,
              opacity: 0.5,
            }}
          />

          {/* Tarjeta de Glassmorfismo */}
          <div className="relative bg-gray-800/60 backdrop-blur-md p-5 rounded-xl border border-blue-500/20 shadow-lg transition-all duration-300 hover:shadow-blue-500/40">
            <span className="text-blue-400 font-bold block text-sm">{event.year}</span>
            <h3 className="text-lg font-semibold text-white">{event.title}</h3>
            <p className="text-gray-300 text-sm mt-1">{event.description}</p>
          </div>
        </div>

        {/* Espacio vacío para alternar */}
        <div className={`${isLeft ? "md:col-start-2" : "md:col-start-1"} col-span-1`} />
      </motion.div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useThemeState } from "@/hooks/use-theme-state";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme, mounted } = useThemeState();

  useEffect(() => {
    // Simulamos un tiempo de carga mínimo para que la animación fluya elegantemente
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background pointer-events-auto"
        >
          {/* Logo animado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative w-48 h-16 md:w-64 md:h-20 overflow-hidden">
              <Image
                src="/logo_ico/final - LOGO 2-01.png"
                alt="Árkos Logo Loading (Light)"
                fill
                className="object-contain dark:hidden"
                priority
              />
              <Image
                src="/logo_ico/final - LOGO 2-02.png"
                alt="Árkos Logo Loading (Dark)"
                fill
                className="object-contain hidden dark:block"
                priority
              />
            </div>
            
            {/* Barra de progreso minimalista */}
            <div className="w-32 h-[2px] bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-brand"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>
            
            {/* Texto de estado IA sutil */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[10px] uppercase font-mono tracking-widest text-foreground/40"
            >
              Inicializando Entorno...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

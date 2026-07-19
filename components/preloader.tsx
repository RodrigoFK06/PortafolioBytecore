"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background pointer-events-auto"
          aria-hidden="true"
        >
          <div className="relative w-32 h-12 md:w-40 md:h-14">
            <Image
              src="/logo_ico/final - LOGO 2-01.png"
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Velo breve de carga — CSS puro, sin librerías de animación.
export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 250);
    const removeTimer = setTimeout(() => setIsLoading(false), 500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-background pointer-events-auto transition-opacity duration-200 ease-out ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
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
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Download } from 'lucide-react';

const PDFDownloadWrapper = dynamic(
  () => import('./PDFDownloadWrapper'),
  { ssr: false }
);

export function BrochureDownloadButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button 
        disabled
        className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-white bg-brand rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_40px_rgba(14,165,233,0.3)] hover:shadow-[0_0_60px_rgba(14,165,233,0.5)] hover:-translate-y-1"
      >
        <span className="relative z-10 flex items-center gap-2">
          Cargando Brochure... <Download className="w-5 h-5 animate-pulse" />
        </span>
      </button>
    );
  }

  return <PDFDownloadWrapper />;
}

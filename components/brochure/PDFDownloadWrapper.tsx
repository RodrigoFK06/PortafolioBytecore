"use client";

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ArkosBrochurePDF } from './ArkosBrochurePDF';
import { Download } from 'lucide-react';

export default function PDFDownloadWrapper() {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <PDFDownloadLink
      document={<ArkosBrochurePDF baseUrl={baseUrl} />}
      fileName="Brochure_Corporativo_Arkos.pdf"
      className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-white bg-brand rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_40px_rgba(14,165,233,0.3)] hover:shadow-[0_0_60px_rgba(14,165,233,0.5)] hover:-translate-y-1"
      style={{ textDecoration: 'none' }}
    >
      {({ loading }) => (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-arkos-600 to-arkos-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 flex items-center gap-2">
            {loading ? 'Generando PDF...' : 'Descargar Brochure Corporativo'}
            <Download className={`w-5 h-5 ${loading ? 'animate-bounce' : 'group-hover:animate-bounce'}`} />
          </span>
        </>
      )}
    </PDFDownloadLink>
  );
}


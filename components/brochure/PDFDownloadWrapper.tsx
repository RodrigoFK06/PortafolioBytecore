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
      className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-brand-foreground bg-brand rounded-full overflow-hidden transition-all duration-300 hover:bg-brand/90 hover:-translate-y-0.5"
      style={{ textDecoration: 'none' }}
    >
      {({ loading }) => (
        <>
          <span className="relative z-10 flex items-center gap-2">
            {loading ? 'Generando PDF...' : 'Descargar Brochure Corporativo'}
            <Download className={`w-5 h-5 transition-transform ${loading ? 'animate-pulse' : 'group-hover:translate-y-0.5'}`} />
          </span>
        </>
      )}
    </PDFDownloadLink>
  );
}


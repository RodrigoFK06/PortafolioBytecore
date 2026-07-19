"use client";

import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";

// ── Descarga del brochure bajo demanda ──────────────────────────
// @react-pdf/renderer pesa ~670KB (trae su propio reconciler React,
// zlib y motor PDF) y antes se cargaba y renderizaba en el mount del
// footer de TODAS las páginas. Ahora el motor se importa y el PDF se
// genera recién cuando alguien hace click — un solo click, cero
// costo para quien no descarga.

export function BrochureDownloadButton() {
  const [state, setState] = useState<"idle" | "generating" | "error">("idle");

  const handleDownload = async () => {
    if (state === "generating") return;
    setState("generating");
    try {
      const [{ pdf }, { ArkosBrochurePDF }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./ArkosBrochurePDF"),
      ]);
      const baseUrl = window.location.origin;
      const blob = await pdf(<ArkosBrochurePDF baseUrl={baseUrl} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Brochure_Corporativo_Arkos.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setState("idle");
    } catch (err) {
      console.error("Error generando el brochure:", err);
      setState("error");
    }
  };

  return (
    <div className="flex flex-col items-center md:items-end gap-2">
      <button
        type="button"
        onClick={handleDownload}
        disabled={state === "generating"}
        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors disabled:opacity-70 disabled:cursor-wait"
      >
        {state === "generating" ? (
          <>
            Generando PDF…
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          </>
        ) : (
          <>
            Descargar Brochure Corporativo
            <Download className="w-4 h-4" aria-hidden="true" />
          </>
        )}
      </button>
      {state === "error" && (
        <p className="text-xs text-destructive">
          No se pudo generar el PDF. Inténtalo de nuevo o escríbenos.
        </p>
      )}
    </div>
  );
}

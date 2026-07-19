import localFont from "next/font/local"

// ── Sistema tipográfico "Light 2026" (ruta 100% gratuita) ───────
// Display: Cabinet Grotesk variable (Fontshare) — grotesca expresiva.
// Cuerpo/UI: Switzer variable (Fontshare, licencia libre comercial).
// Cifras: JetBrains Mono (OFL) con números tabulares nativos.
// Si algún día se compra una display de pago (p.ej. PP Neue Montreal),
// basta reemplazar el src de fontDisplay: la clase `font-display` y la
// var --font-display no cambian.

export const fontSans = localFont({
  src: "./fonts/Switzer-Variable.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-sans",
})

export const fontMono = localFont({
  src: [
    { path: "./fonts/JetBrainsMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/JetBrainsMono-Medium.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-mono",
})

export const fontDisplay = localFont({
  src: "./fonts/CabinetGrotesk-Variable.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-display",
})

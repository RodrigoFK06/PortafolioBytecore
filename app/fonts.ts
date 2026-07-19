import localFont from "next/font/local"

// ── Sistema tipográfico "Light 2026" ────────────────────────────
// Cuerpo/UI: Switzer variable (Fontshare, licencia libre comercial).
// Cifras: JetBrains Mono (OFL) con números tabulares nativos.
// Display: PP Neue Montreal (licencia web de pago) — se añade cuando
// lleguen los .woff2; mientras tanto `font-display` cae a --font-sans
// vía el fallback declarado en tailwind.config (var(--font-display,
// var(--font-sans))). Al llegar: descomentar el bloque fontDisplay y
// añadir su .variable al <body> en app/layout.tsx. Nada más cambia.

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

// export const fontDisplay = localFont({
//   src: [
//     { path: "./fonts/PPNeueMontreal-Book.woff2", weight: "400", style: "normal" },
//     { path: "./fonts/PPNeueMontreal-Medium.woff2", weight: "500", style: "normal" },
//     { path: "./fonts/PPNeueMontreal-Bold.woff2", weight: "700", style: "normal" },
//   ],
//   display: "swap",
//   variable: "--font-display",
// })

// ─────────────────────────────────────────────────────────────
// Árkos — Tokens de marca del brochure corporativo.
// FUENTE ÚNICA DE COLOR. Ninguna página debe usar hex sueltos:
// todo color sale de aquí. Sistema "Light 2026": fondo claro,
// near-black y acento ÚNICO cobalto — el mismo lenguaje del sitio.
// ─────────────────────────────────────────────────────────────
export const theme = {
  bg:       '#FFFFFF', // fondo base (todas las páginas) — blanco
  surface:  '#F7F7F8', // superficie / tarjetas (secondary del sitio)
  border:   '#E6E6E6', // hairline
  accent:   '#0A33FF', // acento ÚNICO — cobalto eléctrico
  text:     '#171717', // texto principal — near-black
  muted:    '#616161', // texto secundario / muted
  onAccent: '#FFFFFF', // texto/íconos SOBRE el cobalto
} as const;

export type Theme = typeof theme;

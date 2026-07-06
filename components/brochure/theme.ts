// ─────────────────────────────────────────────────────────────
// Árkos — Tokens de marca del brochure corporativo.
// FUENTE ÚNICA DE COLOR. Ninguna página debe usar hex sueltos:
// todo color sale de aquí. Acento ÚNICO = turquesa (#52D2D7).
// ─────────────────────────────────────────────────────────────
export const theme = {
  bg:       '#200E3A', // fondo base (todas las páginas) — indigo profundo
  surface:  '#2A1A4A', // superficie / tarjetas
  border:   '#3A2A5C', // borde sutil
  accent:   '#52D2D7', // acento ÚNICO — turquesa
  text:     '#F3F8FF', // texto principal
  muted:    '#B9B2CC', // texto secundario / muted
  onAccent: '#200E3A', // texto/íconos SOBRE el turquesa (usa el fondo para máximo contraste)
} as const;

export type Theme = typeof theme;

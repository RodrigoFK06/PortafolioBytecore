import { Button } from "arkos-portfolio"

// Copy is Spanish because the product is: every surface Árkos ships is in
// Spanish (Perú), and the design agent imitates these cards.

export const Variantes = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button>Agenda un diagnóstico</Button>
    <Button variant="secondary">Ver casos</Button>
    <Button variant="outline">Descargar brochure</Button>
    <Button variant="ghost">Cancelar</Button>
    <Button variant="link">Leer el caso completo</Button>
    <Button variant="destructive">Eliminar cotización</Button>
  </div>
)

export const Tamanos = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="sm">Pequeño</Button>
    <Button size="default">Por defecto</Button>
    <Button size="lg">Grande</Button>
    <Button size="icon" aria-label="Buscar">
      {/* `icon` is a 40×40 square — a bare glyph shows the real proportions. */}
      <span aria-hidden="true">→</span>
    </Button>
  </div>
)

export const Deshabilitado = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button disabled>Enviando…</Button>
    <Button variant="outline" disabled>
      No disponible
    </Button>
  </div>
)

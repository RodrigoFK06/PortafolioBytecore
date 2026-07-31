import { Toggle } from "arkos-portfolio"

export const Estados = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Toggle aria-label="Negrita">
      <span className="font-bold">B</span>
    </Toggle>
    <Toggle defaultPressed aria-label="Cursiva">
      <span className="italic">I</span>
    </Toggle>
    <Toggle disabled aria-label="Subrayado">
      <span className="underline">U</span>
    </Toggle>
  </div>
)

export const Variantes = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Toggle>Por defecto</Toggle>
    <Toggle variant="outline">Contorno</Toggle>
    <Toggle variant="outline" defaultPressed>
      Contorno activo
    </Toggle>
  </div>
)

// `outline` on purpose: the default variant is transparent when unpressed, so
// the three sizes render as bare text and look identical. The border is what
// makes the h-9 / h-10 / h-11 step visible.
export const Tamanos = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Toggle variant="outline" size="sm">
      Pequeño
    </Toggle>
    <Toggle variant="outline" size="default">
      Por defecto
    </Toggle>
    <Toggle variant="outline" size="lg">
      Grande
    </Toggle>
  </div>
)

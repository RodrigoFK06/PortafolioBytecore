import { Checkbox, Label } from "arkos-portfolio"

// Checkbox is a 16px Radix indicator — alone in a card it reads as empty.
// Pairing it with its Label is the only composition that shows anything.

export const ConEtiqueta = () => (
  <div className="flex items-center gap-2">
    <Checkbox id="terminos" />
    <Label htmlFor="terminos">Acepto los términos y condiciones</Label>
  </div>
)

export const Estados = () => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <Checkbox id="c1" />
      <Label htmlFor="c1">Sin marcar</Label>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="c2" defaultChecked />
      <Label htmlFor="c2">Marcado</Label>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="c3" disabled />
      <Label htmlFor="c3">Deshabilitado</Label>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="c4" defaultChecked disabled />
      <Label htmlFor="c4">Marcado y deshabilitado</Label>
    </div>
  </div>
)

export const ListaDeServicios = () => (
  <div className="space-y-3">
    {["Página web", "Sistema a medida", "App móvil", "Integración con SUNAT"].map((s, i) => (
      <div key={s} className="flex items-center gap-2">
        <Checkbox id={`s-${i}`} defaultChecked={i < 2} />
        <Label htmlFor={`s-${i}`}>{s}</Label>
      </div>
    ))}
  </div>
)

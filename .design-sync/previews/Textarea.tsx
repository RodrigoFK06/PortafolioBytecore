import { Label, Textarea } from "arkos-portfolio"

export const ConEtiqueta = () => (
  <div className="max-w-md space-y-2">
    <Label htmlFor="detalle">Contanos qué necesitás</Label>
    <Textarea
      id="detalle"
      rows={4}
      placeholder="Ej.: facturamos en Excel y perdemos horas cuadrando inventario cada cierre de mes."
    />
  </div>
)

export const ConValor = () => (
  <div className="max-w-md space-y-2">
    <Label htmlFor="detalle-lleno">Contanos qué necesitás</Label>
    <Textarea
      id="detalle-lleno"
      rows={4}
      defaultValue="Operamos 3 sucursales y cada una lleva su propio Excel. Al cierre de mes tardamos 2 días en consolidar y siempre hay diferencias de inventario."
    />
  </div>
)

export const Deshabilitado = () => (
  <div className="max-w-md space-y-2">
    <Label htmlFor="detalle-off">Notas internas</Label>
    <Textarea id="detalle-off" rows={3} defaultValue="Solo lectura." disabled />
  </div>
)

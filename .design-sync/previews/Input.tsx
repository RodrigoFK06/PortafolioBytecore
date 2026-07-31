import { Input, Label } from "arkos-portfolio"

export const ConEtiqueta = () => (
  <div className="max-w-sm space-y-2">
    <Label htmlFor="empresa">Empresa</Label>
    <Input id="empresa" placeholder="Nombre comercial o razón social" />
  </div>
)

export const Estados = () => (
  <div className="max-w-sm space-y-4">
    <div className="space-y-2">
      <Label htmlFor="ruc">RUC</Label>
      <Input id="ruc" defaultValue="20548112345" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="correo">Correo</Label>
      <Input id="correo" type="email" placeholder="hola@empresa.pe" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="bloqueado">Plan actual</Label>
      <Input id="bloqueado" defaultValue="Diagnóstico — S/ 950" disabled />
    </div>
  </div>
)

export const TiposDeArchivo = () => (
  <div className="max-w-sm space-y-2">
    <Label htmlFor="adjunto">Adjuntar requerimiento</Label>
    <Input id="adjunto" type="file" />
  </div>
)

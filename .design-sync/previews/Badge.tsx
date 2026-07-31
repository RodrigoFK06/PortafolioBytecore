import { Badge } from "arkos-portfolio"

export const Variantes = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge>Nuevo</Badge>
    <Badge variant="secondary">En curso</Badge>
    <Badge variant="outline">Archivado</Badge>
    <Badge variant="destructive">Vencido</Badge>
  </div>
)

export const ComoEtiquetaDeStack = () => (
  <div className="flex flex-wrap items-center gap-1.5">
    {["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"].map((t) => (
      <Badge key={t} variant="secondary">
        {t}
      </Badge>
    ))}
  </div>
)

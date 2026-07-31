import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "arkos-portfolio"

// TableCaption is a bare <td>/<th>/<caption> wrapper — outside a Table it has
// no box at all. The full table is the only render that shows its borders,
// padding and the muted header colour.

const FILAS = [
  { proyecto: "RestHUB", tipo: "Sistema web", ano: "2025", estado: "En producción" },
  { proyecto: "OrquestadorADM", tipo: "Sistema web", ano: "2026", estado: "En producción" },
  { proyecto: "Rapiditos", tipo: "App móvil", ano: "2025", estado: "Publicada" },
  { proyecto: "ATELIER Clinic", tipo: "Sistema web", ano: "2025", estado: "En producción" },
]

export const ConCabecera = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Proyecto</TableHead>
        <TableHead>Tipo</TableHead>
        <TableHead>Año</TableHead>
        <TableHead className="text-right">Estado</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {FILAS.map((f) => (
        <TableRow key={f.proyecto}>
          <TableCell className="font-medium">{f.proyecto}</TableCell>
          <TableCell className="text-muted-foreground">{f.tipo}</TableCell>
          <TableCell className="font-mono tabular-nums">{f.ano}</TableCell>
          <TableCell className="text-right text-muted-foreground">{f.estado}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export const ConLeyenda = () => (
  <Table>
    <TableCaption>Proyectos entregados en los últimos 24 meses.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Proyecto</TableHead>
        <TableHead className="text-right">Año</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {FILAS.slice(0, 3).map((f) => (
        <TableRow key={f.proyecto}>
          <TableCell className="font-medium">{f.proyecto}</TableCell>
          <TableCell className="text-right font-mono tabular-nums">{f.ano}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

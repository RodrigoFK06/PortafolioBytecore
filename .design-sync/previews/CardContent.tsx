import { Card, CardContent, CardHeader, CardTitle } from "arkos-portfolio"

// CardContent is the padded body slot (`p-6 pt-0`) — no border, no background
// of its own. Shown inside Card, which is where the padding reads.

export const EnCard = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Qué incluye el diagnóstico</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="text-sm text-muted-foreground space-y-2">
        <li>Mapa de procesos donde se pierde tiempo</li>
        <li>Hallazgos priorizados por impacto</li>
        <li>Estimación de esfuerzo por cada uno</li>
      </ul>
    </CardContent>
  </Card>
)

export const SinCabecera = () => (
  <Card className="max-w-sm">
    <CardContent className="pt-6">
      {/* Without a CardHeader above it, `pt-6` restores the top padding that
          CardContent drops by default. Copy stays realistic — the design
          agent imitates these cards. */}
      <p className="text-sm text-muted-foreground">
        Trabajamos con empresas peruanas que ya facturan y necesitan dejar de
        depender de hojas de cálculo para operar.
      </p>
    </CardContent>
  </Card>
)

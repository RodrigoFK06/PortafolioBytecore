import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "arkos-portfolio"

// Card is a hairline-bordered surface, not a shadowed block: the DS separates
// surfaces with `shadow-hairline` + whitespace. The full compound is the
// canonical story — Card alone renders an empty box.

export const Completa = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Diagnóstico de operación</CardTitle>
      <CardDescription>
        Una sesión de 60 minutos para mapear dónde se pierde tiempo en tus procesos.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">
        Salís con un documento de hallazgos priorizados y una estimación de esfuerzo por cada
        uno. Sin compromiso de contratación.
      </p>
    </CardContent>
    <CardFooter className="flex gap-2">
      <Button>Agendar</Button>
      <Button variant="ghost">Más detalles</Button>
    </CardFooter>
  </Card>
)

export const SoloContenido = () => (
  <Card className="max-w-sm">
    <CardContent className="pt-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
        FIG. 03 — MÉTRICA
      </p>
      <p className="font-mono tabular-nums text-3xl font-medium text-foreground">S/ 950</p>
      <p className="text-sm text-muted-foreground mt-1">Costo del diagnóstico inicial.</p>
    </CardContent>
  </Card>
)

export const EnRejilla = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {[
      { t: "Páginas web", d: "Sitios que cargan rápido y convierten." },
      { t: "Sistemas web", d: "ERP, CRM y paneles a medida." },
      { t: "Apps", d: "Móvil nativo y multiplataforma." },
    ].map((s) => (
      <Card key={s.t}>
        <CardHeader>
          <CardTitle className="text-base">{s.t}</CardTitle>
          <CardDescription>{s.d}</CardDescription>
        </CardHeader>
      </Card>
    ))}
  </div>
)

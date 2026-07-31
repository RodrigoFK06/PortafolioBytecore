import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "arkos-portfolio"

// CardFooter is a flex row in the card's padding box — invisible on its own.

export const ConAcciones = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Propuesta enviada</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">
        Vence el 15 de agosto. Después de esa fecha se recotiza.
      </p>
    </CardContent>
    <CardFooter className="flex gap-2">
      <Button>Aceptar</Button>
      <Button variant="outline">Pedir cambios</Button>
    </CardFooter>
  </Card>
)

export const AccionesSeparadas = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Plan Diagnóstico</CardTitle>
    </CardHeader>
    <CardFooter className="flex items-center justify-between">
      <span className="font-mono tabular-nums text-lg font-medium">S/ 950</span>
      <Button size="sm">Agendar</Button>
    </CardFooter>
  </Card>
)

import { Card, CardDescription, CardHeader, CardTitle } from "arkos-portfolio"

// CardHeader is a padded flex column with no visual of its own — rendered
// alone it is an empty box. Its parent Card is the only honest render.

export const EnCard = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Cumplimiento SUNAT</CardTitle>
      <CardDescription>
        Facturación electrónica conectada a tu operación, sin dobles cargas.
      </CardDescription>
    </CardHeader>
  </Card>
)

export const SoloTitulo = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Sin descripción</CardTitle>
    </CardHeader>
  </Card>
)

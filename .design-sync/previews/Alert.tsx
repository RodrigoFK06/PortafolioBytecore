import { Alert, AlertDescription, AlertTitle } from "arkos-portfolio"

export const PorDefecto = () => (
  <Alert className="max-w-lg">
    <AlertTitle>Cotización enviada</AlertTitle>
    <AlertDescription>
      Te llegará una copia al correo. Respondemos en menos de 24 horas hábiles.
    </AlertDescription>
  </Alert>
)

export const Destructiva = () => (
  <Alert variant="destructive" className="max-w-lg">
    <AlertTitle>No pudimos procesar el formulario</AlertTitle>
    <AlertDescription>
      Revisá que el RUC tenga 11 dígitos y volvé a intentar.
    </AlertDescription>
  </Alert>
)

export const SoloTitulo = () => (
  <Alert className="max-w-lg">
    <AlertTitle>Modo de solo lectura</AlertTitle>
  </Alert>
)

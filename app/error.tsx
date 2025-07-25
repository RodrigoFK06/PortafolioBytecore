"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Registrar el error en un servicio de logging
    console.error("Error capturado por Error Boundary:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">
          ¡Algo salió mal!
        </h2>
        <p className="text-muted-foreground max-w-md">
          Ocurrió un error inesperado. Por favor, intenta nuevamente o contacta con soporte si el problema persiste.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={reset}
            variant="default"
          >
            Intentar de nuevo
          </Button>
          <Button
            onClick={() => window.location.href = "/"}
            variant="outline"
          >
            Ir al inicio
          </Button>
        </div>
      </div>
    </div>
  )
}

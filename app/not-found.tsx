import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Página no encontrada (404) | Árkos",
  description: "La página que buscas no existe o se movió.",
}

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 pt-24 pb-16">
      <div className="text-center max-w-md">
        <p className="font-mono text-sm uppercase tracking-widest text-brand mb-4">Error 404</p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Esta página no existe</h1>
        <p className="text-foreground/70 leading-relaxed mb-8">
          El enlace que seguiste puede estar roto o la página se movió. Volvamos a algo que sí
          funciona.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/portfolio">Ver proyectos</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

import { projects } from "@/data/projects"

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams?.q || "").toLowerCase().trim()
  const results = q
    ? projects.filter((p) => [p.title, p.description, ...(p.tags || [])].some((v) => v?.toLowerCase().includes(q)))
    : []

  return (
    <main className="pt-24 pb-16 container mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
        Buscar <span className="text-brand">Proyectos</span>
      </h1>
      <p className="text-muted-foreground mb-8">Resultados para: “{q || "…"}”</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map((p) => (
          <div key={p.id} className="bg-card border rounded-lg p-6">
            <h2 className="font-semibold mb-2">{p.title}</h2>
            <p className="text-muted-foreground text-sm">{p.description}</p>
          </div>
        ))}
        {!q && <p className="text-muted-foreground">Ingresa un término en ?q= para buscar.</p>}
        {q && results.length === 0 && <p className="text-muted-foreground">Sin resultados.</p>}
      </div>
    </main>
  )
}

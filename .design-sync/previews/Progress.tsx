import { Progress } from "arkos-portfolio"

export const Valores = () => (
  <div className="max-w-md space-y-6">
    <div className="space-y-2">
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
        Descubrimiento
      </p>
      <Progress value={100} />
    </div>
    <div className="space-y-2">
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
        Construcción
      </p>
      <Progress value={62} />
    </div>
    <div className="space-y-2">
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
        Puesta en marcha
      </p>
      <Progress value={0} />
    </div>
  </div>
)

export const Escala = () => (
  <div className="max-w-md space-y-3">
    {[0, 25, 50, 75, 100].map((v) => (
      <Progress key={v} value={v} />
    ))}
  </div>
)

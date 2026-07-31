import { Avatar, AvatarFallback, AvatarImage } from "arkos-portfolio"

// AvatarImage needs a real src to paint; the bundle ships no images, so an
// inline data URI keeps the loaded state honest. The fallback is what shows
// when the image 404s — both states matter to the design agent.
const FACE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
       <rect width="80" height="80" fill="#1f45ff"/>
       <circle cx="40" cy="30" r="14" fill="#ffffff"/>
       <path d="M12 80c0-18 12-28 28-28s28 10 28 28z" fill="#ffffff"/>
     </svg>`,
  )

export const ConImagen = () => (
  <Avatar>
    <AvatarImage src={FACE} alt="Rodrigo Torres" />
    <AvatarFallback>RT</AvatarFallback>
  </Avatar>
)

export const ConIniciales = () => (
  <div className="flex items-center gap-3">
    <Avatar>
      <AvatarFallback>RT</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>MC</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>JP</AvatarFallback>
    </Avatar>
  </div>
)

export const EnTestimonio = () => (
  <div className="flex items-start gap-3 max-w-md">
    <Avatar>
      <AvatarImage src={FACE} alt="" />
      <AvatarFallback>HV</AvatarFallback>
    </Avatar>
    <div>
      <p className="text-sm text-foreground leading-relaxed">
        “Dejamos de cuadrar inventario a mano. El cierre de mes pasó de dos días a una tarde.”
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground mt-2">
        Helen Vergaray — Operaciones
      </p>
    </div>
  </div>
)

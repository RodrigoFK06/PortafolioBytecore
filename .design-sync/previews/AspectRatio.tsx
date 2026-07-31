import { AspectRatio } from "arkos-portfolio"

// AspectRatio only reserves a box — with no child it paints nothing, which is
// why the unauthored card came up thin. Every cell needs visible content.
const SHOT =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450">
       <rect width="800" height="450" fill="#f2f2f2"/>
       <rect x="0" y="0" width="800" height="52" fill="#ffffff"/>
       <rect x="24" y="20" width="140" height="12" rx="6" fill="#e2e2e2"/>
       <rect x="48" y="120" width="360" height="26" rx="4" fill="#1f45ff"/>
       <rect x="48" y="170" width="520" height="12" rx="6" fill="#e0e0e0"/>
       <rect x="48" y="194" width="460" height="12" rx="6" fill="#e8e8e8"/>
     </svg>`,
  )

export const Dieciseis9 = () => (
  <div className="max-w-md">
    <AspectRatio ratio={16 / 9}>
      <img src={SHOT} alt="" className="h-full w-full rounded-md object-cover" />
    </AspectRatio>
  </div>
)

export const Cuadrado = () => (
  <div className="max-w-xs">
    <AspectRatio ratio={1}>
      <div className="h-full w-full rounded-md bg-secondary flex items-center justify-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
          1 : 1
        </span>
      </div>
    </AspectRatio>
  </div>
)

export const Comparacion = () => (
  // items-start, or the grid stretches every cell to equal height and the
  // three ratios render identically — defeating the whole point of the cell.
  <div className="grid grid-cols-3 gap-4 items-start">
    {[
      { r: 16 / 9, l: "16 : 9" },
      { r: 4 / 3, l: "4 : 3" },
      { r: 1, l: "1 : 1" },
    ].map((a) => (
      <AspectRatio key={a.l} ratio={a.r}>
        <div className="h-full w-full rounded-md shadow-hairline flex items-center justify-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            {a.l}
          </span>
        </div>
      </AspectRatio>
    ))}
  </div>
)

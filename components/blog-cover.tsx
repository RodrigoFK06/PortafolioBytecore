// ── Portada de las tarjetas del blog ────────────────────────────
// Las portadas /blog-cover-*.png son imágenes de texto generadas para redes
// (og:image): llevan el título del artículo escrito encima. En la tarjeta del
// índice el mismo título va justo debajo, así que se leía dos veces seguidas.
// Para esas portadas, la tarjeta muestra las dos primeras etiquetas del
// artículo sobre la retícula y la etiqueta técnica del sitio; las capturas
// reales de proyectos (/vr-pms.png, /nawi.png…) se quedan como están.

/** true si la imagen es una portada de texto generada y no una captura real. */
export const isTextCover = (src?: string) => !!src && /^\/blog-cover-/.test(src)

interface BlogCategoryCoverProps {
  /** Las dos primeras etiquetas del artículo: tema y subtema. */
  tags: string[]
  /** Número del artículo en el índice (el más reciente es el más alto). */
  index: number
}

export function BlogCategoryCover({ tags, index }: BlogCategoryCoverProps) {
  const [main, second] = tags
  return (
    <div className="absolute inset-0 bg-secondary" aria-hidden="true">
      <div className="absolute inset-0 blueprint-grid [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      <div className="relative h-full flex flex-col justify-between p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="spec-label flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-[hsl(var(--border-strong))]" />
            Artículo {String(index).padStart(2, "0")}
          </p>
          <img src="/logo_ico/final - LOGO 2-071.svg" alt="" width={28} height={28} className="w-7 h-7 opacity-80" />
        </div>
        <p className="font-display font-bold tracking-tight leading-[1.05] text-3xl text-foreground">
          {main}
          {second && (
            <>
              <br />
              <span className="text-brand">{second}</span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

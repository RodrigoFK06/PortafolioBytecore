// design-sync shim for `next/image`.
// next/image needs the Next image optimizer endpoint (/_next/image) which
// doesn't exist in a preview card or in a rendered design, so real images
// 404 and cards show broken-image icons. A plain <img> with the same
// layout-affecting props renders the actual asset.
import * as React from "react"

type ImgProps = {
  src?: string | { src?: string }
  alt?: string
  width?: number | string
  height?: number | string
  fill?: boolean
  priority?: boolean
  quality?: number
  sizes?: string
  placeholder?: string
  blurDataURL?: string
  loader?: unknown
  unoptimized?: boolean
  style?: React.CSSProperties
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height" | "style">

const Image = React.forwardRef<HTMLImageElement, ImgProps>(function Image(
  { src, alt = "", width, height, fill, priority, quality, sizes, placeholder, blurDataURL, loader, unoptimized, style, ...rest },
  ref,
) {
  const url = typeof src === "string" ? src : src?.src ?? ""
  // `fill` makes the image absolutely cover its positioned parent — the same
  // box model Next applies, so surrounding layout keeps working.
  const fillStyle: React.CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
    : {}
  return (
    <img
      ref={ref}
      src={url}
      alt={alt}
      width={fill ? undefined : (width as number | undefined)}
      height={fill ? undefined : (height as number | undefined)}
      sizes={sizes}
      style={{ ...fillStyle, ...style }}
      {...rest}
    />
  )
})

export default Image

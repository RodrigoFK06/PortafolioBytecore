// design-sync shim for `next/link`.
// The real next/link reads the App Router context and throws
// ("invariant expected app router to be mounted") outside a Next runtime,
// which would blank every preview card that renders a link.
// Anchors are the honest static equivalent: same DOM element Next emits.
import * as React from "react"

type LinkProps = {
  href?: string | { pathname?: string }
  children?: React.ReactNode
  prefetch?: boolean
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
  locale?: string | false
  legacyBehavior?: boolean
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, children, prefetch, replace, scroll, shallow, locale, legacyBehavior, ...rest },
  ref,
) {
  const to = typeof href === "string" ? href : href?.pathname ?? "#"
  return (
    <a ref={ref} href={to} {...rest}>
      {children}
    </a>
  )
})

export default Link

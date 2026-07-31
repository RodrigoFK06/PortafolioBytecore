// design-sync shim for `next/navigation`.
// Every hook here throws outside a Next App Router runtime. Inert versions
// keep the component mounted; navigation is a no-op in a preview card and in
// a rendered design, which is the correct static behaviour.
import * as React from "react"

const noop = () => {}

export function useRouter() {
  return React.useMemo(
    () => ({
      push: noop,
      replace: noop,
      refresh: noop,
      back: noop,
      forward: noop,
      prefetch: noop,
    }),
    [],
  )
}

export function usePathname(): string {
  return "/"
}

export function useSearchParams(): URLSearchParams {
  return React.useMemo(() => new URLSearchParams(), [])
}

export function useParams(): Record<string, string | string[]> {
  return {}
}

export function useSelectedLayoutSegment(): string | null {
  return null
}

export function useSelectedLayoutSegments(): string[] {
  return []
}

export function redirect(): never {
  throw new Error("[design-sync] redirect() is a no-op outside Next")
}

export function notFound(): never {
  throw new Error("[design-sync] notFound() is a no-op outside Next")
}

export const permanentRedirect = redirect
export const RedirectType = { push: "push", replace: "replace" } as const

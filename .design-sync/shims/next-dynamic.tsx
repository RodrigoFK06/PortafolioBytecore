// design-sync shim for `next/dynamic`.
// Reproduces the real contract with React.lazy + Suspense so the loaded
// component actually renders in a preview instead of sitting on the loading
// state forever. `ssr: false` is meaningless here — everything is client.
import * as React from "react"

type Loader<P> = () => Promise<{ default: React.ComponentType<P> } | React.ComponentType<P>>
type DynamicOptions<P> = { loading?: React.ComponentType<any>; ssr?: boolean } & Record<string, unknown>

export default function dynamic<P extends object>(loader: Loader<P>, options: DynamicOptions<P> = {}) {
  const Lazy = React.lazy(async () => {
    const mod = await loader()
    return "default" in (mod as any) ? (mod as { default: React.ComponentType<P> }) : { default: mod as React.ComponentType<P> }
  })
  const Loading = options.loading
  return function DynamicComponent(props: P) {
    return (
      <React.Suspense fallback={Loading ? <Loading /> : null}>
        <Lazy {...(props as any)} />
      </React.Suspense>
    )
  }
}

import { ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut } from "arkos-portfolio"

// A context menu cannot be opened without a real right-click, and its content
// lives behind a Radix Portal that unmounts while closed — `forceMount` does
// not help because the Portal itself is presence-controlled. So there is no
// way to render ContextMenuLabel inside a genuinely open ContextMenu here.
//
// What IS real: the components below are the DS's own exports, rendered on a
// container carrying the same surface classes ContextMenuContent applies
// (rounded-md, hairline border, popover background, p-1). The label, separator
// and shortcut are the shipped components — only the surface is composition glue.

const Superficie = ({ children }: { children: React.ReactNode }) => (
  <div className="w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-hairline-md">
    {children}
  </div>
)

export const SobreLaSuperficieDelMenu = () => (
  <Superficie>
    <ContextMenuLabel>Proyecto</ContextMenuLabel>
    <ContextMenuSeparator />
    <div className="px-2 py-1.5 text-sm">Ver caso</div>
    <div className="px-2 py-1.5 text-sm flex items-center justify-between">
      Duplicar
      <ContextMenuShortcut>⌘D</ContextMenuShortcut>
    </div>
  </Superficie>
)

export const VariasSecciones = () => (
  <Superficie>
    <ContextMenuLabel>Cotización</ContextMenuLabel>
    <div className="px-2 py-1.5 text-sm">Exportar a PDF</div>
    <ContextMenuSeparator />
    <ContextMenuLabel>Peligro</ContextMenuLabel>
    <div className="px-2 py-1.5 text-sm">Archivar</div>
  </Superficie>
)

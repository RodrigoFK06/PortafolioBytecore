import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "arkos-portfolio"

// DropdownMenuLabel only exists inside open menu content. `defaultOpen` forces
// the open state; cardMode/viewport overrides in .design-sync/config.json keep
// the portalled content inside the card.

export const MenuAbierto = () => (
  <DropdownMenu defaultOpen modal={false}>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">Acciones</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuLabel>Proyecto</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        Ver caso <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>Duplicar cotización</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuLabel>Peligro</DropdownMenuLabel>
      <DropdownMenuItem>Archivar</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

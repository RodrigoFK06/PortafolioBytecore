import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "arkos-portfolio"

// MenubarLabel is a non-interactive heading inside an OPEN menu — it does not
// exist in the DOM until the menu opens. `Menubar value=` forces one open so
// the card can render it. Paired with cardMode/viewport overrides in
// .design-sync/config.json so the portalled content stays inside the card.

export const MenuAbierto = () => (
  <Menubar value="archivo">
    <MenubarMenu value="archivo">
      <MenubarTrigger>Archivo</MenubarTrigger>
      <MenubarContent>
        <MenubarLabel>Cotización</MenubarLabel>
        <MenubarSeparator />
        <MenubarItem>
          Nueva <MenubarShortcut>⌘N</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          Duplicar <MenubarShortcut>⌘D</MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Exportar a PDF</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Editar</MenubarTrigger>
    </MenubarMenu>
  </Menubar>
)

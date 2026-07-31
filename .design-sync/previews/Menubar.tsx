import { Menubar, MenubarMenu, MenubarTrigger } from "arkos-portfolio"

// The closed bar renders statically; the dropdown content only exists while a
// menu is open (see MenubarLabel for the open state).

export const Barra = () => (
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>Archivo</MenubarTrigger>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Editar</MenubarTrigger>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Ver</MenubarTrigger>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Ayuda</MenubarTrigger>
    </MenubarMenu>
  </Menubar>
)

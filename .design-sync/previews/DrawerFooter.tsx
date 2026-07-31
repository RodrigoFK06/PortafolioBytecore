import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "arkos-portfolio"

// DrawerFooter is the `mt-auto` action block of an open drawer — it has no
// standalone box. Same forced-open + card override approach as DrawerHeader.

export const AccionesDelCajon = () => (
  <Drawer open modal={false}>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Confirmar propuesta</DrawerTitle>
        <DrawerDescription>
          Se enviará una copia al correo registrado de la empresa.
        </DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button>Aceptar y firmar</Button>
        <Button variant="ghost">Pedir cambios</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
)

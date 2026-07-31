import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "arkos-portfolio"

// DrawerHeader is a padded heading block that only exists while the drawer is
// open. `open` forces it; cardMode/viewport overrides in
// .design-sync/config.json keep the fixed-position panel inside the card.

export const CajonAbierto = () => (
  <Drawer open modal={false}>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Agendar diagnóstico</DrawerTitle>
        <DrawerDescription>
          60 minutos por videollamada. Salís con hallazgos priorizados y una estimación.
        </DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button>Confirmar horario</Button>
        <Button variant="outline">Cancelar</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
)

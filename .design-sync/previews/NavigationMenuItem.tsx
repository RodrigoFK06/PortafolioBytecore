import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "arkos-portfolio"

// NavigationMenuItem is a bare <li>. The closed menu bar renders statically —
// the dropdown content only exists while open, so it is not shown here.
//
// NavigationMenuLink ships UNSTYLED (it is Radix's Link primitive). Without
// navigationMenuTriggerStyle() the items render as run-together plain text.
// That helper is exported by the DS for exactly this purpose — use it on every
// link that should look like a nav item.

export const BarraDeNavegacion = () => (
  <NavigationMenu>
    <NavigationMenuList>
      {[
        { href: "/services", label: "Servicios" },
        { href: "/portfolio", label: "Portafolio" },
        { href: "/precios", label: "Precios" },
        { href: "/blog", label: "Blog" },
      ].map((i) => (
        <NavigationMenuItem key={i.href}>
          <NavigationMenuLink href={i.href} className={navigationMenuTriggerStyle()}>
            {i.label}
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
)

export const ConDesplegable = () => (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="/portfolio" className={navigationMenuTriggerStyle()}>
          Portafolio
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
)

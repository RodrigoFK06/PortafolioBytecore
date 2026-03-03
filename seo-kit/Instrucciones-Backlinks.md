# Kit de Backlinks SEO para Árkos

Este kit contiene todo lo necesario para agregar enlaces retroactivos (backlinks) de alta calidad desde tus otros proyectos Next.js hacia el dominio principal de Árkos (`xn--rkos-4na.com`).

## Archivos Incluidos en esta Carpeta (`/seo-kit`)
- `arkos-logo-light.svg` / `arkos-logo-dark.svg`: Isotipos en alta calidad (Modo claro y oscuro).
- `arkos-full-light.png` / `arkos-full-dark.png`: Logos completos para fondos claros y oscuros.
- `arkos-favicon-light.ico` / `arkos-favicon-dark.ico`: Iconos de pestaña.

---

## 1. El Componente React "Creado Por" (Recomendado para Footers)

Si tus otros proyectos están en Next.js (con TailwindCSS), copia y pega este micro-componente en sus Footers. Tiene el código ultra-optimizado para pasar Link Juice SEO.

Copia este código en tus otros proyectos:

```tsx
import Link from 'next/link';
import Image from 'next/image';

export function ArkosCredit() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <span>Diseñado y desarrollado por</span>
      <Link 
        href="https://xn--rkos-4na.com" 
        target="_blank" 
        rel="noopener noreferrer"
        title="Árkos - Agencia de Desarrollo Web y Diseño UX/UI"
        className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
      >
        <Image 
          src="/arkos-logo-light.svg" // Asegúrate de copiar el SVG a la carpeta /public de tu otro proyecto
          alt="Árkos Logo" 
          width={16} 
          height={16} 
          className="dark:hidden"
        />
        <Image 
          src="/arkos-logo-dark.svg" 
          alt="Árkos Logo" 
          width={16} 
          height={16} 
          className="hidden dark:block"
        />
        Árkos
      </Link>
    </div>
  );
}
```

---

## 2. Enlace en Texto Plano HTML (Para Markdown o CMS)

Si una de tus webs usa un CMS clásico o sólo puedes inyectar HTML plano:

```html
<p>
  🚀 Mejoramos tus procesos. Conoce más en 
  <a href="https://xn--rkos-4na.com" title="Árkos - Desarrollo de Software a medida en Perú" target="_blank" rel="noopener noreferrer" style="font-weight: bold; color: #0284c7; text-decoration: none;">
    Árkos Agencia Digital
  </a>.
</p>
```

## ⚠️ Regla Técnica (Punycode):
**NUNCA** pongas `href="https://árkos.com"` en el código. Siempre debes poner `href="https://xn--rkos-4na.com"`. Visualmente para el usuario puedes escribir la palabra con tilde, pero el robot de Google necesita leer el link en formato *Punycode*.

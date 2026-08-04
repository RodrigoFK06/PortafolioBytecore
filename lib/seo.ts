export const BASE_URL = "https://xn--rkos-4na.com"

/**
 * Devuelve el objeto `alternates` completo (canónica + hreflang) de una página.
 *
 * Next.js hace *shallow merge* de la metadata: si una página declara
 * `alternates: { canonical: "/x" }`, ese objeto SUSTITUYE al del layout raíz y
 * la página se queda sin `languages`. Y las páginas que no declaraban
 * `alternates` heredaban las del raíz, donde `es-PE` y `x-default` apuntaban
 * al home. Resultado: ninguna página tenía un hreflang correcto.
 *
 * Usa siempre este helper en lugar de escribir `alternates` a mano.
 */
export function alternates(path: string) {
  const p = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`
  return {
    canonical: p,
    languages: { "es-PE": p, "x-default": p },
  }
}

/**
 * URL absoluta de una ruta interna, para JSON-LD (que exige absolutas).
 *
 * El home se devuelve SIN barra final a propósito: es la forma que Next emite
 * en el `<link rel="canonical">` del home, y el sitemap declaraba la variante
 * con barra. Dos formas de la misma URL es exactamente el problema que había
 * que cerrar, así que todo el sitio usa esta.
 */
export function absUrl(path: string) {
  const clean = path.replace(/^\/+|\/+$/g, "")
  return clean === "" ? BASE_URL : `${BASE_URL}/${clean}`
}

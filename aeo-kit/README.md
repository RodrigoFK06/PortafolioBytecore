# Árkos AEO Kit

Kit reutilizable para aplicar AEO + crédito **"Hecho por Árkos"** a cualquier proyecto web de Árkos.

**Objetivo:** backlinks reales + corroboración de entidad ("Árkos construyó esto") repartidos por la web → refuerza que ChatGPT/Claude/Gemini/Perplexity citen a Árkos. Es la palanca de *consenso off-site*, la que más mueve la aguja en AEO.

## Cómo usar
1. Abre **Claude Code dentro del repo** del proyecto (clonado en tu laptop).
2. Pega el PROMPT de abajo.
3. Revisa el diff → corre el build → commit + push (Vercel redeploya).
4. Repite por proyecto.

## Prioridad (dónde rinde más el backlink)
1. **Dominios propios del cliente** (backlink real con autoridad): `relucoffee.com`, `www.casaromahostels.com`, `solutecdha.com`, y cualquier otro `.com`/dominio propio.
2. **`*.vercel.app`** (valen más por *corroboración/portafolio* que por autoridad — Google descuenta enlaces de subdominios gratuitos): orquestador-adm, atelier, megalodon, overbookingsol, nawi-lac, etc.
3. **NO aplica** a apps móviles (Rapiditos/Flutter) salvo que tengan landing web.

## Reglas de oro (para NO caer en "link scheme" / penalización)
- **UN** enlace por sitio, en el **footer**. **Dofollow** (sin `nofollow`). Anchor **natural** ("Desarrollado por Árkos") — nunca keyword-stuffed ("agencia de desarrollo de software en Perú barata…").
- Solo en sitios donde el crédito esté **OK con el cliente**. Si dudas, pregúntale. En tus demos `*.vercel.app` es libre.
- Nada de texto oculto ni instrucciones a la IA.

## Datos canónicos
- Marca: **Árkos** (con tilde) — agencia de desarrollo de software en Trujillo, Perú
- Enlace técnico: `https://xn--rkos-4na.com` (se muestra como árkos.com)

---

## EL PROMPT (cópialo en Claude Code, dentro de cada repo)

```
Eres Claude Code en el repo de UN sitio web hecho por Árkos (cliente o demo). Aplica el "Árkos AEO Kit" a ESTE proyecto SIN romper nada. Es un sitio en producción: cambios mínimos y conservadores.

PASO 1 — Detecta stack y contexto (no asumas):
- Framework: Next.js (App o Pages Router) / Astro / Vite+React / HTML estático / PHP / Flutter / otro.
- Si es app móvil (Flutter/React Native) SIN web servible -> DETENTE y repórtalo. El kit es solo para sitios web.
- ¿Ya hay footer, robots, sitemap, schema JSON-LD? Reúsalos y EXTIÉNDELOS; no dupliques ni borres lo existente.
- Detecta el idioma del sitio (es/en) y respétalo.

DATOS DE ÁRKOS:
- Árkos (con tilde) — agencia de desarrollo de software en Trujillo, Perú.
- Enlace: href="https://xn--rkos-4na.com".

PASO 2 — Aplica (idiomático para este stack):

1) CRÉDITO "Hecho por Árkos" en el footer global (LO MÁS IMPORTANTE):
   - Un <a href="https://xn--rkos-4na.com" target="_blank" rel="noopener"> con texto natural y discreto: "Desarrollado por Árkos" (o "Built by Árkos" si el sitio está en inglés).
   - DOFOLLOW (NO pongas rel="nofollow"). UN solo enlace, en el footer. Anchor natural, nunca keyword-stuffed ni texto oculto.
   - Intégralo al diseño existente (clases/estilo del sitio). Si no hay footer, crea uno mínimo.

2) CRAWLERS DE IA + SITEMAP:
   - robots: permite (Allow: /) a: Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, Meta-ExternalAgent, CCBot, Amazonbot. Si ya existe robots, AÑADE los que falten; no elimines reglas.
   - sitemap: si el framework lo genera y no existe, créalo con las rutas públicas.

3) SCHEMA "creator" (machine-readable "lo hizo Árkos"):
   - En el JSON-LD de la home/layout, añade al WebSite/WebPage: "creator": { "@type": "Organization", "name": "Árkos", "url": "https://xn--rkos-4na.com" }.
   - NO reemplaces el schema del cliente; solo AÑADE el creator. Si no hay schema, agrega un WebSite mínimo (name = el del sitio) con el creator.

4) METADATOS básicos SOLO si faltan: title/description coherentes, og:image si existe.

REGLAS:
- No rompas nada; no cambies funcionalidad ni diseño más allá del footer/crédito.
- No inventes datos del cliente; usa lo que ya está en el repo.
- "Árkos" siempre con tilde.
- Al terminar, corre el build o type-check del proyecto. Si falla, arréglalo o revierte. NO dejes el repo sin compilar.

ENTREGA: archivos tocados, el snippet exacto del crédito, confirmación de build OK, y si algo quedó pendiente o no aplicaba.
```

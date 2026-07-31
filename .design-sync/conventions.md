# Árkos — Light 2026

A light-only system with **one** accent (cobalt `--brand`, ~7:1 on white). Surfaces are
separated by **hairlines and whitespace**, never by coloured blocks, glassmorphism or drop
shadows. Product copy is **Spanish (Perú)** — write UI text in Spanish.

There is no dark mode and no theme switcher. Do not add one.

## Setup

**No provider is required.** Components render correctly as-is; just load `styles.css`.
Three exceptions, each scoped to its own family:

- `TooltipProvider` — wrap anything using `Tooltip`.
- `ToastProvider` + `ToastViewport` — required by `Toast`; or render `<Toaster />` once.
- `LenisProvider` — only for smooth-scroll pages. Purely optional.

```jsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><Button variant="ghost">?</Button></TooltipTrigger>
    <TooltipContent>Se factura por adelantado</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Styling idiom: Tailwind utilities over CSS variables

Style with **Tailwind utility classes**. Colours are HSL-triplet custom properties, so always
go through the semantic utility — never a raw hex, and never `text-blue-600`.

| Purpose | Classes |
|---|---|
| Page / text | `bg-background` `text-foreground` |
| Accent (the only one) | `bg-brand` `text-brand` `border-brand` + `bg-brand/10` for tints |
| Surfaces | `bg-card` `bg-surface-1` `bg-surface-2` `bg-surface-3` |
| Secondary text | `text-muted-foreground` |
| Semantic | `bg-primary` `bg-secondary` `bg-accent` `bg-destructive` `bg-popover` (+ `-foreground`) |
| Borders | `border-border` `border-strong` `border-input` `ring-ring` |
| Elevation | `shadow-hairline` `shadow-hairline-md` — **this system's substitute for shadows** |
| Radii | `rounded-sm` `rounded-md` `rounded-lg` (all derive from `--radius`) |
| Motion | `animate-fade-in` `animate-slide-up` `animate-accordion-down` `animate-accordion-up` |

**Typography** — three families, all wired to `--font-*`:

- `font-display` — Cabinet Grotesk. Headings only.
- `font-sans` — Switzer. Body and UI. This is the default; you rarely write it.
- `font-mono` — JetBrains Mono. Numbers, labels, technical metadata.

**Signature classes** (`app/globals.css`, `@layer components`) — these carry the brand's
engineering-blueprint character; prefer them over inventing equivalents:

- `spec-label` — the mono, uppercase, wide-tracked eyebrow label (`FIG. 03 — MÉTRICA`).
- `tabular` — mono with tabular numerals. Use for **every** figure, price or metric.
- `blueprint-grid` — the faint technical grid background. Decorative; never under dense text.

**Style helpers** for primitives that ship unstyled or need variant classes elsewhere:
`buttonVariants`, `badgeVariants`, `toggleVariants`, `navigationMenuTriggerStyle`.
`NavigationMenuLink` in particular renders as bare text without
`className={navigationMenuTriggerStyle()}`.

## Where the truth lives

- `_ds/<folder>/styles.css` and its `@import` closure (`_ds_bundle.css` holds every compiled
  utility and token). Read it before inventing a class — if it is not there, it will not style.
- `components/<group>/<Name>/<Name>.prompt.md` — per-component usage.
- `components/<group>/<Name>/<Name>.d.ts` — the prop contract (`<Name>Props`).

Groups: `general` (primitives + Árkos pieces), `sections` (whole page sections), `motion`
(scroll/animation wrappers).

## Idiomatic example

```jsx
<Card className="max-w-sm">
  <CardHeader>
    <CardTitle>Diagnóstico de operación</CardTitle>
    <CardDescription>60 minutos para mapear dónde se pierde tiempo.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="spec-label mb-2">FIG. 01 — INVERSIÓN</p>
    <p className="tabular text-3xl font-medium text-foreground">S/ 950</p>
  </CardContent>
  <CardFooter className="flex items-center justify-between">
    <span className="text-sm text-muted-foreground">Sin compromiso</span>
    <Button>Agendar</Button>
  </CardFooter>
</Card>
```

Library components for the controls; Tailwind utilities from the table above for your own
layout glue. Reach for `shadow-hairline` + spacing to separate things — not borders-plus-shadows,
and not a second accent colour.

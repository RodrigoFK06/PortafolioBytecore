# design-sync notes — Árkos → claude.ai/design

Project: **Árkos Design System** (`22bff5ad-7bf3-4e64-b3cd-0d6dfebb623f`)
First sync: 2026-07-31. Shape: `package` (there is no Storybook).

## Why this repo needs extra scaffolding

This is a **Next.js app, not a published package** — no `dist/`, no library build, and
`node_modules/arkos-portfolio` does not exist. Three consequences drive the whole setup:

- The converter locates the package root by walking up from `--entry`. Without an `entry`
  it looks for `node_modules/arkos-portfolio` and dies. So `cfg.entry` points at a
  **generated** entry file.
- Passing `entry` disables the converter's synth-from-src discovery, so the component list
  must be explicit → `cfg.componentSrcMap` is **generated**, never hand-edited.
- Tailwind only exists after a Next build, so the bundle stylesheet is **pre-compiled**.

`cfg.buildCmd` runs both generators. Always run it before `package-build.mjs`:

```
node .design-sync/build-css.mjs && node .design-sync/gen-entry.mjs
```

To include or exclude a component, edit `EXCLUDE_PATHS` / `EXCLUDE_NAMES` in
`.design-sync/gen-entry.mjs` and re-run it — **do not edit `componentSrcMap` by hand**, it is
overwritten on every run.

## Gotchas that cost real debugging time

- **Never put a `"//"` key in `.design-sync/tsconfig.paths.json`.** The converter strips
  comments with a regex that also eats a `"//"` JSON key; the file then fails to parse,
  `tsconfigPathsPlugin` silently returns `null`, and the Next shims stop applying. Symptom:
  `ReferenceError: process is not defined` on all 255 previews, with real Next router code
  in `_ds_bundle.js`. Use a `/* */` block comment instead.
- **`next/*` must be shimmed.** `.design-sync/shims/` replaces `next/link`, `next/image`,
  `next/navigation` and `next/dynamic`. The real ones throw outside a Next runtime
  ("invariant expected app router to be mounted") or point at `/_next/image`, which 404s in
  a preview card and in every rendered design. Wired via `cfg.tsconfig` paths.
- **Default exports need `default as Name`.** `gen-entry.mjs` recovers the declared name of
  a default export, but re-exporting it as `{ Name }` yields `undefined` on
  `window.ArkosDS` → `[BUNDLE_EXPORT]` for 12 components (sections, FloatingDock, …).
- **The Tailwind safelist is load-bearing, not a nicety.** Compiling only from the app's own
  markup omitted `grid-cols-3`, `max-w-sm` and `max-w-xs` — utilities the design agent
  certainly emits. A missing utility silently breaks the layout of every design that uses
  it. `.design-sync/safelist.js` therefore carries both the DS token vocabulary (explicit)
  and the generic layout families (regex patterns + `sm/md/lg` variants). CSS: 151 KB → 253 KB.
  **If you trim it, trim deliberately.**
- **camelCase `cva` helpers are real API.** `buttonVariants`, `badgeVariants`,
  `toggleVariants`, `navigationMenuTriggerStyle` are in `STYLE_HELPERS` in `gen-entry.mjs`
  so they reach the bundle. `NavigationMenuLink` renders as run-together bare text without
  `navigationMenuTriggerStyle()`.
- **Scoped `package-capture.mjs --components X` prunes `_screenshots/review/`** down to the
  named components. Re-run it unscoped to regenerate every sheet before a review pass.
- **`cfg.overrides.<C>.skip` takes an array of story names, not `true`.** A boolean crashes
  the build (`boolean true is not iterable`).
- ESM ignores `NODE_PATH`. `.design-sync/node_modules` is a junction to `.ds-sync/node_modules`
  so the generators can `import` ts-morph. Recreate per clone (gitignored):
  `New-Item -ItemType Junction -Path .design-sync\node_modules -Target .ds-sync\node_modules`
- playwright **1.61.1** matches the chromium build already cached on this machine (1228).
  1.62.x pins 1234 and fails with `Executable doesn't exist`.

## Deliberate exclusions

Set in `gen-entry.mjs` → `EXCLUDE_PATHS`:

- `components/ui/sidebar.tsx` — **23 exports dropped.** Styled entirely with
  `bg-sidebar-*` / `text-sidebar-foreground` / `border-sidebar-border` / `ring-sidebar-ring`,
  none of which are defined in `tailwind.config.js` **or** `app/globals.css`. Those classes
  compile to nothing, and the component is used nowhere in the app. Shipping it would give
  the design agent 23 components that render unstyled in every design. **To re-include:** add
  a `sidebar` colour scale to `tailwind.config.js` + the `--sidebar-*` vars to `globals.css`,
  then delete the exclusion line.
- `components/brochure/` — `@react-pdf/renderer` primitives; PDF, not web UI.
- `SunatTest`, `SystemTest`, `ExcelCostCalculator`, `fine-dining-survey`, `assessment-quiz`,
  `sw-cleanup`, `ui/use-toast` — app plumbing and page controllers, not reusable UI.

## Known render warns (expected — do not chase)

- `[TOKENS_MISSING]` for `--sidebar-width`, `--sidebar-width-icon`, `--sidebar-border`,
  `--sidebar-accent`, `--skeleton-width`: Tailwind's content globs still scan
  `components/ui/sidebar.tsx`, so its arbitrary-value classes emit CSS referencing vars that
  do not exist. Harmless — the component itself is not synced.
- `[TOKENS_MISSING]` for `--radix-accordion-content-height` and
  `--radix-navigation-menu-viewport-*`: Radix sets these at runtime. Expected.
- `[DOCS_UNMAPPED]` for all components: the repo has no per-component docs. `.prompt.md` is
  synthesized from the `.d.ts` + authored previews. `cfg.docsDir` is unset on purpose.

## Preview decisions

- 33 authored previews in `.design-sync/previews/`; the rest ship the typographic floor card
  (fully importable, just no rich card). Authoring more is a pure win on any re-sync.
- Images are **inline data-URI SVGs**. The bundle ships no images, so a repo path like
  `/resthub.webp` 404s in a card and in every rendered design.
- Forced-open overlays: `DropdownMenu defaultOpen modal={false}`, `Menubar value="…"`,
  `Drawer open modal={false}`, each with `cardMode: "single"` + a `viewport` override so the
  portalled content stays inside the card.
- `ContextMenuLabel` is the one component with no genuine open state: a context menu needs a
  real right-click and its Radix Portal unmounts while closed (`forceMount` does not help —
  the Portal itself is presence-controlled). Its preview renders the real label/separator/
  shortcut components on a container carrying `ContextMenuContent`'s own surface classes.
- `cardMode: "column"` on `Card`, `ProjectCard`, `PaginationItem`, `PaginationLink`,
  `PaginationEllipsis` — their multi-column stories overflow a grid cell.

## Repo findings worth fixing (not blockers)

- `Pagination` ships hardcoded **English** labels ("Previous" / "Next") in a Spanish product
  (`components/ui/pagination.tsx`).
- The Sidebar token gap above is a genuine repo defect, not a sync artifact.

## Re-sync risks — what can go stale

- **`safelist.js` is a guess about the design agent's vocabulary.** If designs come back with
  broken spacing or grids, the missing utility family belongs here. It is the first place to look.
- **The Next shims are frozen against Next 15.1.** If the app upgrades and components start
  using a new `next/*` entry point (`next/form`, etc.), add a shim + a `cfg.tsconfig` path or
  real Next runtime code lands back in the bundle. Grep the build for `__NEXT_` to check.
- **`build-css.mjs` appends the `--font-*` mapping by hand**, duplicating what
  `app/fonts.ts` declares via `next/font/local`. If a font family is swapped there, update
  `build-css.mjs` **and** `.design-sync/fonts.css` or the bundle silently falls back.
- **Authored previews hardcode copy from `data/projects.ts`.** If a project is renamed or
  dropped, the preview still shows the old copy — it is a snapshot, not a live read.
- Grades in `.design-sync/.cache/` are gitignored; cross-machine carry-forward comes from the
  uploaded `_ds_sync.json`.

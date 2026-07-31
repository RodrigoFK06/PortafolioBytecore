// design-sync entry generator (part of cfg.buildCmd). Run from the repo root.
//
// Why this exists: this repo is an app, not a published package. The converter
// needs an --entry to locate the package root, and passing one disables its
// synth-from-src discovery — so the component list has to be explicit. This
// script derives BOTH deterministically from the source tree:
//
//   .design-sync/build/ds-entry.ts     → the bundle entry (re-exports)
//   .design-sync/build/components.json → {Name: srcPath} for cfg.componentSrcMap
//
// Rerun it whenever components are added, renamed, or moved.

import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { Node, Project, ts } from "ts-morph"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const SRC = join(ROOT, "components")
const OUTDIR = join(ROOT, ".design-sync", "build")

// Excluded from the design system. These are app plumbing or page controllers,
// not reusable UI — syncing them would hand the design agent components it can
// never sensibly place in a new design.
const EXCLUDE_PATHS = [
  "components/brochure/", // @react-pdf/renderer — PDF primitives, not web UI
  "components/ui/use-toast.tsx", // hook module, no component
  "components/sw-cleanup.tsx", // service-worker teardown side effect
  "components/SunatTest.tsx", // app-specific API test harness
  "components/SystemTest.tsx", // app-specific API test harness
  "components/ExcelCostCalculator.tsx", // app-specific calculator wired to app state
  "components/fine-dining-survey.tsx", // private survey page, wired to an API route
  "components/assessment-quiz.tsx", // app-specific quiz flow
  // Dead shadcn scaffolding: 23 exports styled entirely with `bg-sidebar-*`,
  // `text-sidebar-foreground`, `border-sidebar-border` and `ring-sidebar-ring`.
  // Those colors are defined in NEITHER tailwind.config.js NOR app/globals.css,
  // so the classes compile to nothing — and the component is used nowhere in
  // the app. Syncing it would give the design agent 23 components that render
  // unstyled in every design. Re-include by adding the sidebar color scale to
  // tailwind.config.js + the --sidebar-* vars to globals.css, then dropping
  // this line. See NOTES.md.
  "components/ui/sidebar.tsx",
]

// camelCase `cva` helpers: not components, but part of the shipped API.
const STYLE_HELPERS = new Set([
  "buttonVariants",
  "badgeVariants",
  "toggleVariants",
  "navigationMenuTriggerStyle",
])

const slash = (p) => p.split("\\").join("/")

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name)
    if (e.isDirectory()) walk(full, out)
    else if (/\.(tsx|jsx)$/.test(e.name) && !/\.(stories|test|spec)\./.test(e.name)) out.push(full)
  }
  return out
}

const files = walk(SRC)
  .map(slash)
  .filter((p) => {
    const rel = slash(relative(ROOT, p))
    return !EXCLUDE_PATHS.some((x) => (x.endsWith("/") ? rel.startsWith(x) : rel === x))
  })
  .sort()

const project = new Project({
  skipAddingFilesFromTsConfig: true,
  compilerOptions: { jsx: ts.JsxEmit.Preserve, allowJs: true, skipLibCheck: true },
})

/** @type {Record<string, string>} */
const componentSrcMap = {}
/** @type {{ file: string, specs: string[] }[]} */
const entries = []
const collisions = []

for (const file of files) {
  const sf = project.addSourceFileAtPathIfExists(file)
  if (!sf) continue
  const specs = []
  for (const [name, decls] of sf.getExportedDeclarations()) {
    // A default export carries its declared name on the function/class node,
    // but it is NOT a named export — re-exporting it as `{ Name }` yields
    // undefined on window.<global> ([BUNDLE_EXPORT]). Emit `default as Name`.
    const isDefault = name === "default"
    const real = isDefault ? decls.map((d) => d.getName?.()).find((n) => n && n !== "default") : name
    if (!real) continue
    // Style helpers are camelCase and not components, but they ARE real API:
    // some primitives ship unstyled and need them (NavigationMenuLink renders
    // as bare text without navigationMenuTriggerStyle()). Put them in the
    // bundle so previews and the design agent can call them — but never in
    // componentSrcMap, so they get no card and no .d.ts.
    if (STYLE_HELPERS.has(real)) {
      specs.push(real)
      continue
    }
    if (!/^[A-Z][A-Za-z0-9]*$/.test(real)) continue
    if (
      !decls.some(
        (d) =>
          Node.isVariableDeclaration(d) || Node.isFunctionDeclaration(d) || Node.isClassDeclaration(d),
      )
    )
      continue
    const rel = slash(relative(ROOT, file))
    if (componentSrcMap[real]) {
      collisions.push(`${real}: kept ${componentSrcMap[real]}, skipped ${rel}`)
      continue
    }
    componentSrcMap[real] = rel
    specs.push(isDefault ? `default as ${real}` : real)
  }
  if (specs.length) {
    entries.push({
      file: slash(relative(OUTDIR, file)).replace(/\.(tsx|jsx)$/, ""),
      specs,
    })
  }
}

mkdirSync(OUTDIR, { recursive: true })

const header = `// GENERATED by .design-sync/gen-entry.mjs — do not edit.
// Bundle entry for design-sync: every component the Árkos design system
// exposes to claude.ai/design, re-exported from its real source module.
`
const body = entries
  .map((e) => `export { ${e.specs.join(", ")} } from ${JSON.stringify(e.file)};`)
  .join("\n")

writeFileSync(join(OUTDIR, "ds-entry.ts"), `${header}\n${body}\n`)
writeFileSync(join(OUTDIR, "components.json"), JSON.stringify(componentSrcMap, null, 2) + "\n")

// Write the map straight into config.json. cfg.componentSrcMap is what makes
// these components discoverable at all (passing --entry disables the
// converter's synth-from-src discovery), so it must never be hand-edited —
// to include or exclude something, change EXCLUDE_PATHS / EXCLUDE_NAMES above
// and re-run. Every other config key is preserved verbatim.
const CONFIG = join(ROOT, ".design-sync", "config.json")
const cfg = JSON.parse(readFileSync(CONFIG, "utf8"))
cfg.componentSrcMap = componentSrcMap
writeFileSync(CONFIG, JSON.stringify(cfg, null, 2) + "\n")

console.error(
  `  design-sync entry: ${Object.keys(componentSrcMap).length} components from ${entries.length} modules`,
)
if (collisions.length) {
  console.error("  ! duplicate export names (first wins):")
  for (const c of collisions) console.error(`      ${c}`)
}

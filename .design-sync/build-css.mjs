// design-sync CSS pre-build (cfg.buildCmd). Run from the repo root.
//
// This repo is a Next.js app: its Tailwind stylesheet only exists after a
// Next build, and app/globals.css on its own is just @tailwind directives.
// The converter needs a STATIC stylesheet for cfg.cssEntry, so we compile one
// here with the repo's own tailwind.config.js (same content globs, same
// plugins, same token layer) and then append the --font-* mapping that
// next/font injects at runtime in the real app.
//
// Output: .design-sync/build/tailwind.css  (gitignored — regenerated)

import { execFileSync } from "node:child_process"
import { appendFileSync, mkdirSync, statSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const OUT = join(ROOT, ".design-sync", "build", "tailwind.css")

mkdirSync(dirname(OUT), { recursive: true })

// The repo pins tailwindcss 3.4.x in devDependencies; call its binary
// directly so this never depends on npx's network fallback.
const bin = join(ROOT, "node_modules", "tailwindcss", "lib", "cli.js")

execFileSync(
  process.execPath,
  [
    bin,
    "-c", join(ROOT, ".design-sync", "tailwind.config.cjs"),
    "-i", join(ROOT, "app", "globals.css"),
    "-o", OUT,
  ],
  { cwd: ROOT, stdio: ["ignore", "inherit", "inherit"] },
)

// next/font/local defines these three custom properties on <html> in the real
// app (app/fonts.ts + app/layout.tsx). Nothing in globals.css declares them,
// so without this block every `font-sans` / `font-display` / `font-mono`
// utility silently falls back to system-ui in the bundle and in every design
// built from it. Family names match .design-sync/fonts.css.
appendFileSync(
  OUT,
  `
/* ── design-sync: font variables (next/font equivalent) ──────────────── */
:root {
  --font-sans: "Switzer", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-display: "Cabinet Grotesk", "Switzer", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}
`,
)

console.error(`  design-sync css: ${OUT} (${(statSync(OUT).size / 1024).toFixed(0)} KB)`)

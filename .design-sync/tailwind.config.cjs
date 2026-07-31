// design-sync Tailwind config. Wraps the repo's own tailwind.config.js
// unchanged and adds the safelist source, so the compiled bundle stylesheet
// carries the full design-system vocabulary — not just the subset this
// particular app happens to use today. Nothing here changes the theme.
//
// Content globs stay verbatim: Tailwind resolves them against the CWD, and
// build-css.mjs always runs the CLI from the repo root.
const base = require("../tailwind.config.js")
const { CLASSES, PATTERNS } = require("./safelist.js")

module.exports = {
  ...base,
  content: [...base.content, "./.design-sync/safelist.js"],
  safelist: [...CLASSES, ...PATTERNS],
}

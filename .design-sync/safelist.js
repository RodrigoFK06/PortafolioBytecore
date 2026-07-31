// design-sync safelist source.
//
// Tailwind only emits classes it finds in the content globs. The repo's own
// source is the app, so a token alias the app never happens to use (e.g.
// `bg-surface-1`) compiles to nothing — and the design agent, which is told
// this vocabulary exists by the conventions header, would emit dead classes.
//
// This file is added to the content globs by .design-sync/tailwind.config.cjs.
// It is scanned as plain text, so the class names just need to appear in it.
//
// TWO groups, for two different reasons:
//
//  CLASSES  — the DESIGN-SYSTEM vocabulary (colors, type, radii, shadows,
//             motion). Enumerated explicitly because the conventions header
//             names these to the design agent; a token alias the app happens
//             not to use (e.g. bg-surface-1) must still compile.
//
//  PATTERNS — generic LAYOUT utilities. The assumption that "the app's own
//             markup already covers these" is false: `grid-cols-3`,
//             `max-w-sm` and `max-w-xs` were all absent from the first
//             compile. The design agent composes new layouts, so it emits
//             utilities this particular app never happened to use, and a
//             missing one silently breaks the layout of every design that
//             uses it. Patterns keep that surface complete without listing
//             hundreds of names by hand.

const COLORS = [
  "background", "foreground", "text",
  "brand", "brand-foreground",
  "primary", "primary-foreground",
  "secondary", "secondary-foreground",
  "destructive", "destructive-foreground",
  "muted", "muted-foreground",
  "accent", "accent-foreground",
  "popover", "popover-foreground",
  "card", "card-foreground",
  "surface-1", "surface-2", "surface-3",
  "border", "input", "ring",
]

// Emitted so Tailwind's scanner sees each literal class string.
const CLASSES = [
  ...COLORS.flatMap((c) => [
    `bg-${c}`, `text-${c}`, `border-${c}`, `ring-${c}`, `fill-${c}`, `stroke-${c}`,
    `hover:bg-${c}`, `hover:text-${c}`, `hover:border-${c}`,
    `focus-visible:ring-${c}`,
  ]),
  // Alpha variants — the hairline/tint idiom this DS leans on.
  ...["brand", "foreground", "border", "destructive", "primary"].flatMap((c) =>
    ["5", "10", "20", "30", "50", "80", "90"].flatMap((a) => [`bg-${c}/${a}`, `text-${c}/${a}`, `border-${c}/${a}`]),
  ),
  // Typography families (next/font vars).
  "font-sans", "font-display", "font-mono",
  // Radii bound to --radius.
  "rounded-sm", "rounded-md", "rounded-lg",
  // Hairline elevation — this DS separates surfaces with these, not shadows.
  "shadow-hairline", "shadow-hairline-md",
  "border-strong",
  // Keyframes declared in tailwind.config.js.
  "animate-fade-in", "animate-slide-up", "animate-accordion-down", "animate-accordion-up",
  // Structural signature classes from globals.css @layer components.
  "blueprint-grid", "spec-label", "tabular",
]

// Layout utilities the design agent will compose with. Responsive variants are
// attached to the families where breakpoint changes actually matter.
const RESPONSIVE = ["sm", "md", "lg"]

const PATTERNS = [
  // Sizing / measure
  { pattern: /^max-w-(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|full|none|prose|screen-sm|screen-md|screen-lg)$/ },
  { pattern: /^w-(0|px|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|56|64|72|80|96|auto|full|screen|min|max|fit|1\/2|1\/3|2\/3|1\/4|3\/4)$/, variants: RESPONSIVE },
  { pattern: /^h-(0|px|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|56|64|72|80|96|auto|full|screen|min|max|fit)$/ },
  { pattern: /^(min|max)-h-(0|full|screen|fit)$/ },

  // Display / flow
  { pattern: /^(block|inline-block|inline|flex|inline-flex|grid|inline-grid|contents|hidden)$/, variants: RESPONSIVE },
  { pattern: /^flex-(row|row-reverse|col|col-reverse|wrap|wrap-reverse|nowrap|1|auto|initial|none|grow|shrink)$/, variants: RESPONSIVE },
  { pattern: /^(grow|shrink)(-0)?$/ },
  { pattern: /^grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12|none)$/, variants: RESPONSIVE },
  { pattern: /^grid-rows-(1|2|3|4|5|6|none)$/ },
  { pattern: /^col-span-(1|2|3|4|5|6|7|8|9|10|11|12|full)$/, variants: RESPONSIVE },
  { pattern: /^row-span-(1|2|3|4|5|6|full)$/ },
  { pattern: /^items-(start|end|center|baseline|stretch)$/, variants: RESPONSIVE },
  { pattern: /^justify-(start|end|center|between|around|evenly|stretch)$/, variants: RESPONSIVE },
  { pattern: /^self-(auto|start|end|center|stretch|baseline)$/ },
  { pattern: /^order-(first|last|none|1|2|3|4|5|6)$/ },

  // Spacing
  { pattern: /^gap(-x|-y)?-(0|px|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|10|12|14|16|20|24)$/, variants: RESPONSIVE },
  { pattern: /^(p|px|py|pt|pr|pb|pl)-(0|px|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|10|12|14|16|20|24|32)$/, variants: RESPONSIVE },
  { pattern: /^(m|mx|my|mt|mr|mb|ml)-(0|px|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|10|12|14|16|20|24|32|auto)$/, variants: RESPONSIVE },
  { pattern: /^space-(x|y)-(0|px|1|1\.5|2|2\.5|3|4|5|6|8|10|12|16)$/ },

  // Typography
  { pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/, variants: RESPONSIVE },
  { pattern: /^text-(left|center|right|justify)$/, variants: RESPONSIVE },
  { pattern: /^font-(thin|light|normal|medium|semibold|bold|extrabold|black)$/ },
  { pattern: /^(italic|not-italic|uppercase|lowercase|capitalize|normal-case|underline|line-through|no-underline|truncate|antialiased)$/ },
  { pattern: /^tracking-(tighter|tight|normal|wide|wider|widest)$/ },
  { pattern: /^leading-(none|tight|snug|normal|relaxed|loose|3|4|5|6|7|8|9|10)$/ },
  { pattern: /^line-clamp-(1|2|3|4|5|6|none)$/ },
  { pattern: /^whitespace-(normal|nowrap|pre|pre-line|pre-wrap)$/ },
  { pattern: /^break-(normal|words|all|keep)$/ },

  // Borders / corners / elevation
  { pattern: /^rounded(-none|-sm|-md|-lg|-xl|-2xl|-3xl|-full)?$/ },
  { pattern: /^rounded-(t|r|b|l|tl|tr|br|bl)(-none|-sm|-md|-lg|-xl|-2xl|-3xl|-full)?$/ },
  { pattern: /^border(-0|-2|-4|-8)?$/ },
  { pattern: /^border-(t|r|b|l|x|y)(-0|-2|-4|-8)?$/ },
  { pattern: /^shadow(-sm|-md|-lg|-xl|-2xl|-inner|-none)?$/ },
  { pattern: /^ring(-0|-1|-2|-4|-8)?$/ },

  // Position / layering / overflow
  { pattern: /^(static|fixed|absolute|relative|sticky)$/ },
  { pattern: /^(inset|inset-x|inset-y|top|right|bottom|left)-(0|px|1|2|3|4|6|8|auto|full|1\/2)$/ },
  { pattern: /^z-(0|10|20|30|40|50|auto)$/ },
  { pattern: /^overflow(-x|-y)?-(auto|hidden|clip|visible|scroll)$/ },
  { pattern: /^object-(contain|cover|fill|none|scale-down|center|top|bottom|left|right)$/ },

  // Effects / motion
  { pattern: /^opacity-(0|5|10|20|25|30|40|50|60|70|75|80|90|95|100)$/ },
  { pattern: /^transition(-none|-all|-colors|-opacity|-shadow|-transform)?$/ },
  { pattern: /^duration-(75|100|150|200|300|500|700|1000)$/ },
  { pattern: /^ease-(linear|in|out|in-out)$/ },
  { pattern: /^(cursor-pointer|cursor-default|cursor-not-allowed|select-none|pointer-events-none|pointer-events-auto)$/ },
  { pattern: /^(backdrop-blur|backdrop-blur-sm|backdrop-blur-md|backdrop-blur-lg|blur|blur-sm|blur-md|blur-lg)$/ },
]

module.exports = { CLASSES, PATTERNS }

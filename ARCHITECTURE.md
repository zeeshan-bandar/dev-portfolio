# Architecture

Tour of the codebase, written for someone who knows React but is new to Next.js. Read this when something looks weird and you want to know "where does this live and why?".

> If you're brand new to Next.js: it's React + a build system + a router + a server. The pieces below explain how those extras show up in this repo.

---

## 1. The big picture

Next.js does three things plain React doesn't:

1. **File-system routing.** A folder under `src/app/` becomes a URL. Drop a `page.tsx` in it and that path renders. No React Router config.
2. **Server components by default.** Every component you write under `src/app/` runs on the server unless you opt in to the browser with `"use client"` at the top of the file. Server components can fetch data without `useEffect`, never ship to the browser, and keep the bundle small.
3. **A real Node server.** `npm run dev` and `npm run start` both run an HTTP server, not a static file watcher. That means you can write API routes, set headers, do server-side rendering, etc. — without standing up Express.

The "App Router" (the `src/app/` directory) is the modern way of organizing all of that. The older "Pages Router" (`src/pages/`) still works but we don't use it.

---

## 2. Where things live

### `src/app/` — routes & layouts

Every folder is a URL segment. Inside each folder, special filenames have meanings:

| File           | Purpose                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------- |
| `page.tsx`     | The page rendered for this route. Required for the URL to exist.                              |
| `layout.tsx`   | A wrapper around `page.tsx` (and any nested routes). Persists across navigation.              |
| `loading.tsx`  | Shown while `page.tsx` is suspending (data fetch, etc).                                       |
| `error.tsx`    | Shown if `page.tsx` throws.                                                                   |
| `not-found.tsx`| Shown for 404s in this segment.                                                               |
| `route.ts`     | A backend route handler (replaces what Express controllers do). Returns `Response` objects.   |

Currently we only have:

- `src/app/layout.tsx` — root layout. Wraps every page in `<html>` + `<body>`. Sets up Geist fonts + page metadata.
- `src/app/page.tsx` — `/` route. Currently a "system check" panel for step 1 verification.
- `src/app/globals.css` — global styles, including our Mission Control color tokens.
- `src/app/fonts/` — self-hosted Geist Sans + Geist Mono `.woff` files.

When we add `/about`, it becomes `src/app/about/page.tsx`. When we add `/missions/mood-42`, it becomes `src/app/missions/mood-42/page.tsx`. Nothing else needed — Next.js wires the routing.

### `src/components/` — your own components

Plain React components. We'll build out `src/components/hero/`, `src/components/mission-card/`, etc. as the build progresses. Naming convention is kebab-case folders, PascalCase exports.

### `src/components/ui/` — shadcn/ui components

When you run `npx shadcn@latest add <thing>`, it writes the component source here. You **own** these files — they're not in `node_modules`, you can edit them freely.

### `src/lib/` — non-React utilities

Pure functions, helpers, type definitions. Currently just `utils.ts` with the `cn()` Tailwind class-merging helper.

### `public/` — static assets

Anything in here is served from `/`. So `public/favicon.ico` → `https://yoursite.com/favicon.ico`. Use this for images, icons, downloadable PDFs.

### Config files (root)

| File                   | What it does                                                                                                |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| `package.json`         | Standard npm metadata + scripts. The scripts are what `npm run dev` etc. dispatch to.                       |
| `tsconfig.json`        | TypeScript config. Strict mode is on.                                                                       |
| `next.config.mjs`      | Next.js settings. We set `output: "standalone"` so Docker can ship a small image.                           |
| `tailwind.config.ts`   | Tailwind theme. Color tokens (defined as CSS vars in `globals.css`) are mapped to Tailwind utility classes. |
| `postcss.config.mjs`   | PostCSS — Tailwind runs through this. You won't normally touch it.                                          |
| `components.json`      | shadcn/ui's "where do I put things and what's the alias for `@/`?" config.                                  |
| `.eslintrc.json`       | ESLint extends Next.js's recommended set + the TypeScript ruleset.                                          |
| `.prettierrc.json`     | Prettier with the Tailwind class-sorting plugin.                                                            |
| `mise.toml`            | Pins Node version + defines task shortcuts.                                                                 |
| `Dockerfile`           | Multi-stage production build.                                                                               |
| `.dockerignore`        | Files Docker should not copy into the build context.                                                        |
| `.gitignore`           | Files git should not track.                                                                                 |

---

## 3. Color tokens (where the design system lives)

Two files own the design tokens; they're kept in sync by hand.

1. **`src/app/globals.css`** declares CSS custom properties under `:root` (e.g. `--bg-base`, `--accent`). These are the source of truth — they match the design brief §4.

2. **`tailwind.config.ts`** maps each variable to a Tailwind utility name (e.g. `--accent` → the `accent` color, usable as `bg-accent`, `text-accent`, `border-accent`).

So `text-accent` in JSX produces `color: var(--accent)` which is `#5dcaa5`. If you want to add a new token: declare it in `globals.css`, expose it in `tailwind.config.ts`, done.

We use shadcn/ui's flat naming convention (`background`, `foreground`, `border`, `accent`) so any shadcn components added later just work without restyling.

---

## 4. Fonts

Loaded via [`next/font/local`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) in `src/app/layout.tsx`. The `.woff` files in `src/app/fonts/` ship with the app — there's no Google Fonts request, no FOIT.

Each font becomes a CSS variable (`--font-geist-sans`, `--font-geist-mono`). Tailwind's `font-sans` / `font-mono` utilities are mapped to those variables in `tailwind.config.ts`, so you write `font-mono` in JSX and Geist Mono renders.

---

## 5. Server vs client components (the one Next.js gotcha)

By default every component is a **server component**: runs on the server, never ships to the browser. Server components can:

- Fetch data with `await fetch(...)` directly
- Read files / hit databases
- Stay completely out of the JS bundle

But they cannot:

- Use hooks (`useState`, `useEffect`, etc.)
- Use browser-only APIs (`window`, `localStorage`)
- Receive event handlers as props (`onClick`, etc.)

When you need any of those, opt the component into being a **client component** by putting `"use client";` as the first line of the file. From that point down (including children), the code is a normal React tree that ships to the browser.

Practical rule of thumb for this project:

- Layout, page shells, static content → server component (default).
- Anything with motion (Framer Motion), interactivity (hover state, dropdown), or browser APIs → client component (`"use client"` at top).

The verification `page.tsx` is a server component — it has no interactivity, no hooks. Once we add the topology graph animation and tilt cards, those specific components will be client components, but the surrounding page can stay server.

---

## 6. The build pipeline

```
src/**  →  next build  →  .next/standalone (server bundle) + .next/static (assets)
                              │
                              └─→  Docker COPYs both into a slim node:20-alpine image
```

`output: "standalone"` (in `next.config.mjs`) tells Next.js to trace the dependency graph and emit only what's actually used. The Dockerfile then copies just the standalone output and the static folder — no `node_modules`, no source.

For Vercel deploys, the standalone output is irrelevant — Vercel uses its own pipeline. The Dockerfile is for portability (deploy to Fly.io, Railway, your own VPS, etc).

---

## 7. Where the styling actually flows

```
PORTFOLIO_BRIEF.md §4
        ↓ (manual translation, one-time)
src/app/globals.css           — CSS variables on :root
        ↓ (mapped by)
tailwind.config.ts            — Tailwind theme.colors
        ↓ (used as)
className="bg-background"     — JSX
        ↓ (compiled by Tailwind into)
.bg-background { background: var(--bg-base); }
```

If colors look wrong on screen, walk this chain top to bottom and find the broken link.

---

## 8. Typography conventions

Two voices, used purposefully. Don't mix them within a single role.

| Voice | Font (Tailwind class) | Case | Used for |
| ----- | --------------------- | ---- | -------- |
| **System / chrome** | `font-mono` | `UPPERCASE` + `tracking-wider` | Status labels, section kickers (`// ACTIVE MISSIONS // 03`), metric labels, tech tags, mission status badges (`SHIPPED`, `IN ORBIT`, `ACTIVE`) |
| **Shell prompts** | `font-mono` | `lowercase` | CTAs (`$ launch ./tour`), nav links (`missions`, `log`, `eva`), affordances (`$ view case study →`), shell paths (`~/zeeshan`) |
| **Project handles** | `font-mono` | as-branded | `knot` (lowercase CLI tool), `Mood 42` (title case product), `CS Soch` (caps + space brand). Each follows the actual brand. |
| **Human voice — titles** | sans (default) | `Title Case`, `font-medium`, `tracking-tight` | Hero headline, section titles (`Active Missions`, `Recent Telemetry`), Comms CTA |
| **Human voice — body** | sans (default) | sentence case, regular weight | Subheadlines, section descriptions, card body, log descriptions |

**Hard rules:**
- Section titles use Title Case: `Active Missions`, `Recent Telemetry` (NOT `Active missions`).
- CTAs and questions use sentence case: `Ready to ship something?`.
- Mono kicker labels are `UPPERCASE + tracking-wider`. Sans titles below them are Title Case.
- No italic. No bold (medium = 500 is the heaviest used). Restraint is on-brand.
- Project / brand names follow the actual brand — don't auto-lowercase a real brand like `CS Soch` to fit the dashboard mono pattern.

The kicker → title → description pattern is encoded in `<SectionHeader>` (`src/components/sections/section-header.tsx`) — pass `label`, `title?`, `description?` and styling stays consistent.

---

## 9. SVG defs, gradients, and the userSpaceOnUse gotcha

`src/components/hero/topology-graph.tsx` and `src/components/hero/astronaut.tsx` rely on inline SVG `<defs>` for gradients and filters. Two patterns worth knowing:

**Pattern 1: shared defs at the top of an SVG.**
The topology graph defines `nodeFill` (radial), `haloGlow` (radial), `softGlow` (Gaussian blur filter), and per-line gradients in one `<defs>` block. Anything below references them via `fill="url(#nodeFill)"` or `filter="url(#softGlow)"`. Defs are scoped to that SVG — they don't pollute the page.

**Pattern 2: `gradientUnits="userSpaceOnUse"` for non-square shapes.**
SVG gradients default to `gradientUnits="objectBoundingBox"`, where gradient coords (0%–100%) map to the *target shape's* bounding box. This silently breaks for vertical lines:

```svg
<line x1="160" y1="88" x2="160" y2="42" stroke="url(#someHorizontalGradient)" />
```

A vertical line has zero width → the horizontal gradient collapses to invisible. The line renders blank. The 4 diagonal lines in the topology rendered fine, but the vertical line to the AI node disappeared until I switched to per-line gradients in `userSpaceOnUse` (which uses absolute SVG coords, not bbox-relative ones):

```tsx
// One <linearGradient> per line, defined with the line's actual endpoints
<linearGradient
  id={`lineFlow-${l.id}`}
  gradientUnits="userSpaceOnUse"
  x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
>
  <stop offset="0%"   stopColor="#5dcaa5" stopOpacity="0.85" />
  <stop offset="100%" stopColor="#5dcaa5" stopOpacity="0.25" />
</linearGradient>
```

Rule of thumb: any gradient on a line, polyline, or other thin shape should use `userSpaceOnUse` with explicit coordinates.

**Animation in SVG:**
- **Framer Motion** for entry stagger, halo pulses, rotating elements, floating astronaut. Components that use it must be `"use client"`.
- **CSS keyframes** (in `globals.css`) for continuous effects that don't need React: `mc-grid-breathe` (page backdrop), `mc-line-flow` (dash flow on the topology lines).
- **SMIL `<animate>`** for tiny embedded SVG-only animations (the astronaut helmet light blink + chest panel status lights). Lets `astronaut.tsx` stay a server component without a JS dependency for trivial effects.

All three respect `prefers-reduced-motion: reduce` — keyframes freeze, Framer can be gated in step 8 (a11y polish).

---

## 10. What's NOT here yet

This document grows as the project grows. Things we'll add later, with sections explaining how they work when introduced:

- Dynamic routes (`/missions/[slug]/page.tsx`) — for case-study pages.
- Route handlers (`/api/contact/route.ts`) — for the contact form.
- MDX — for case-study content as Markdown.
- Framer Motion patterns — page transitions, scroll-triggered reveals.
- 3D scenes — React Three Fiber or Spline embed for the astronaut.
- CI — GitHub Actions for lint + build + Docker push.

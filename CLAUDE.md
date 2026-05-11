# CLAUDE.md — Mission Control portfolio

> Read this first. It's the high-signal context for this project so you don't waste tokens re-discovering things.

---

## What this is

Zeeshan Bandar's personal portfolio. **Goal: full-time job hunt + freelance lead generation.** Themed as a "Mission Control" production dashboard (dark canvas, cyan/teal accent, friendly Pixar astronaut, dashboard-style telemetry). The theme is the differentiator from generic dev portfolios.

**Owner is new to Next.js.** Strong React + Python + Flask + Firestore background; comfortable in Go and shell. Frame Next-specific concepts in plain-React terms when explaining. Write thorough in-repo docs as a deliverable, not an afterthought (this overrides the default "no comments / no README" guidance).

---

## Source of truth

- **`local-reference/PORTFOLIO_BRIEF.md`** — the locked design + content brief. Read sections referenced as "§N" throughout this file. **§16 lists locked decisions — do not re-litigate.** _(Local-only; the `local-reference/` folder is gitignored.)_
- **`local-reference/mockup_*.html`** — visual reference for the hero, *not* a literal blueprint. Mockups are scaled-down preview frames; the actual site is full-bleed.
- **`ARCHITECTURE.md`** — codebase tour written for someone new to Next.js (App Router, server vs client components, where things live).
- **`README.md`** — how to run the project (commands, Docker, scripts).

---

## Stack (locked)

| Concern       | Choice                                                                          |
| ------------- | ------------------------------------------------------------------------------- |
| Framework     | Next.js 14 (App Router) + React 18 + TypeScript strict                          |
| Styling       | Tailwind CSS + shadcn/ui (when components are added)                            |
| Motion        | Framer Motion (general) + react-parallax-tilt (mission card tilt)               |
| Icons         | lucide-react                                                                    |
| Toolchain     | mise (`mise.toml` pins Node 20.19.6)                                            |
| Production    | Docker (multi-stage, `output: "standalone"` in next.config.mjs)                 |
| Hosting       | Vercel (intended)                                                               |
| Format / Lint | Prettier (with `prettier-plugin-tailwindcss`) + ESLint (next + typescript)      |
| Backend       | **None.** No Flask, no FastAPI, no CMS. Owner reconfirmed after pushback.       |

**Do not** propose a backend, CMS (Strapi, etc.), or non-Vercel hosting unless the owner explicitly asks again. If a feature seems to need server compute (contact form, GitHub last-commit badge), use a Next.js route handler or a server component fetch — not a separate service.

---

## Theme (locked: Cyan Ops)

Five palette options were rendered with a toggle for comparison; owner picked **Cyan Ops** (the brief default). Tokens live in `src/app/globals.css` under `:root` and are mapped to Tailwind utilities in `tailwind.config.ts` using shadcn/ui's flat naming convention (`background`, `foreground`, `border`, `accent`, etc).

**Don't re-add the toggle or alternative theme blocks** — they were stripped intentionally. If the owner asks for theme variants again, regenerate from scratch rather than restoring deleted code.

---

## File conventions

```
src/
├── app/                          # Next.js App Router (every folder = a URL)
│   ├── layout.tsx                # Root layout + grid backdrop + fonts + metadata
│   ├── page.tsx                  # / (home — full-bleed dashboard)
│   ├── globals.css               # Color tokens (CSS vars) + breathing grid utility
│   └── fonts/                    # Self-hosted Geist Sans + Geist Mono
├── components/
│   ├── site/                     # Site chrome (top-nav, status-bar, metrics-strip)
│   ├── hero/                     # Hero section (hero, topology-graph, astronaut)
│   ├── missions/                 # Mission card + Active Missions section
│   └── sections/                 # All other home-page sections + shared:
│       ├── section-container.tsx #   max-w-7xl + horizontal padding wrapper
│       ├── section-header.tsx    #   "// LABEL · 03" + title + description
│       ├── eva-strip.tsx
│       ├── mission-log-preview.tsx
│       └── comms-cta.tsx
└── lib/
    └── utils.ts                  # cn() helper (clsx + tailwind-merge)
```

**Conventions:**
- Use `<SectionContainer>` for any new section so spacing stays uniform.
- Use `<SectionHeader>` for the "// LABEL" + title pattern.
- Server components by default. Add `"use client"` only when you need hooks, browser APIs, or pointer events (Framer Motion, react-parallax-tilt).
- Color tokens: write `text-accent`, `bg-card`, `border-border-medium` — never hard-code hex outside `globals.css`.
- Microcopy: ~30% themed (per brief §6). Don't pun every sentence.

---

## How to run

```bash
mise install                    # one-time — installs pinned Node
mise exec -- npm ci             # install deps
mise exec -- npm run dev        # http://localhost:3000

# Or, if mise is activated in your shell:
npm run dev
npm run lint
npm run format
npx tsc --noEmit                # typecheck

# Production parity:
docker build -t portfolio .
docker run --rm -p 3000:3000 portfolio
```

**There is normally a `npm run dev` background process running on port 3000 during sessions** — check before starting a new one. To verify: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/`.

---

## Build status

Build order is `PORTFOLIO_BRIEF.md §13`. Current state:

- ✅ Step 1 — Scaffold (Next.js, Tailwind, shadcn deps, Framer Motion, color tokens)
- ✅ Step 2 — Hero (copy + animated topology graph + placeholder astronaut + metrics + status bar)
- ✅ Step 3 — Active Missions (3 cards with hover tilt)
- ✅ Layout refactored to full-bleed (was cramped in a max-w-5xl panel; owner flagged it)
- ✅ Bonus: EVA strip, Mission Log preview, Comms CTA scaffolded so home reads as a full site
- ✅ Topology + astronaut polish — detailed Pixar SVG astronaut (helmet glass gradient, visor reflections, chest panel with blinking SMIL lights, backpack, gloves, antenna), gradient nodes, glow filter, flowing-dash data lines, multi-layer pulsing halo, slow-rotating outer ring, gentle astronaut float
- ✅ Per-line gradient fix — vertical line to AI was invisible; switched to per-line `userSpaceOnUse` gradients (see ARCHITECTURE §9)
- ✅ Typography pass — voice rules locked (mono = chrome, sans = human), Title Case for section names, sentence case for prose. See ARCHITECTURE §8 for the full table.
- ⏳ Step 4 — Mission Log (full /about timeline)
- ⏳ Step 5 — Mission Profile (/about long-form bio + interactive skills)
- ⏳ Step 6 — Project case-study pages (/missions/[slug])
- ⏳ Step 7 — Comms route (replace `mailto:` with proper /comms page)
- ⏳ Step 8 — Polish pass (loading state, 404, motion tuning, a11y audit including reduced-motion gating for the topology animation)
- ⏳ Step 9 — 3D astronaut (swap placeholder SVG for Spline / R3F)
- ⏳ Step 10 — Deploy

---

## Outstanding owner inputs (placeholder-then-swap)

- Email address (`mailto:hello@zeeshan.dev` is a placeholder)
- Mood 42 stack details + public link / screenshots
- Resume PDF (yes/no on download button)
- Real metric values (currently `4 yrs / 200+ / 12 / ~12ms`)
- 3D astronaut model (`.glb` or Spline scene URL)
- Custom domain
- Whether the GitHub `last commit` badge should fetch live (currently static)

---

## Behaviour rules

- **Don't auto-commit.** The owner drives git operations. Working directory may have a `.git/` initialized by `create-next-app`; that's fine — leave it alone unless asked.
- **Don't add a backend / CMS / second framework.** Owner pushed back once already; don't re-suggest unless asked.
- **Don't re-add the theme toggle** or alternative palette blocks in `globals.css`.
- **Don't auto-lowercase brand names.** `CS Soch` (caps + space), `Mood 42` (title case + space), `knot` (lowercase CLI tool) are owner-confirmed brand spellings — don't "normalize" them to fit a mono-lowercase pattern. Only `knot` is lowercase because the CLI command is.
- **Do** use the typography rules in ARCHITECTURE §8 — mono for chrome, sans for human voice, Title Case for section titles, sentence case for prose / questions / CTAs. New components should match.
- **Do** use `<SectionContainer>` and `<SectionHeader>` for any new home-page section — they encode the spacing + kicker/title/description pattern.
- **Do** keep `ARCHITECTURE.md` updated when introducing a new Next.js concept (dynamic routes, route handlers, MDX, etc.) — owner is learning Next.js from this codebase.
- **Do** use `mise exec --` prefix when running commands (or assume mise is activated in the shell). Don't run host `npx` directly.
- **Do** use the existing dev server on :3000 before starting a new one.
- **Watch out for SVG gradients on lines** — default `objectBoundingBox` collapses on vertical/horizontal lines. Use `gradientUnits="userSpaceOnUse"` with explicit coords. Documented in ARCHITECTURE §9.

---

## Known small things to flag in step 8

- Topology graph entry animation only runs when JS loads — no-JS users see static dust + ellipse + halo + astronaut, but skill nodes / connecting lines stay invisible (initial state from Framer variants). Fix during a11y polish: gate via `prefers-reduced-motion` and use `initial={false}` to render in final state if motion is reduced.
- `last commit · 2h ago` in the status bar is hard-coded — wire to `https://api.github.com/users/zeeshan-bandar/events/public` from a server component with `next: { revalidate: 300 }`.
- CTA `mailto:hello@zeeshan.dev` placeholder needs a real address.
- `/about` and `/missions/[slug]` routes don't exist yet — anchor links from Mission Log preview and mission cards 404.

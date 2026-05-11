# Mission Control — Portfolio

Zeeshan Bandar's personal portfolio. Themed as a production observability dashboard ("Mission Control").

For an under-the-hood tour of how the codebase is laid out and the Next.js concepts it uses, read [`ARCHITECTURE.md`](ARCHITECTURE.md).

---

## Stack

| Concern       | Choice                                  |
| ------------- | --------------------------------------- |
| Framework     | Next.js 14 (App Router) + React 18      |
| Language      | TypeScript (strict)                     |
| Styling       | Tailwind CSS + shadcn/ui (when needed)  |
| Motion        | Framer Motion                           |
| Icons         | Lucide React                            |
| Toolchain     | mise (Node version pin)                 |
| Production    | Docker (multi-stage, standalone output) |
| Hosting       | Vercel (intended)                       |
| Format / Lint | Prettier + ESLint (Next + TypeScript)   |

---

## Prerequisites

You need [`mise`](https://mise.jdx.dev) installed once on your machine:

```bash
brew install mise
```

`mise` reads [`mise.toml`](mise.toml) at the project root and pins the Node version. You don't manage Node yourself — `mise` does.

For the production image you also need [`docker`](https://docker.com).

---

## First-time setup

```bash
mise install         # downloads the pinned Node (one-time)
mise exec -- npm ci  # installs JS dependencies from package-lock.json
```

After this, you can either:

- Activate mise in your shell once (`eval "$(mise activate zsh)"` — already done in your `~/.zshrc` if you've used mise before) and just run `npm run dev`.
- Or prefix every command with `mise exec --`, e.g. `mise exec -- npm run dev`.

The README assumes mise is activated and uses bare commands.

---

## Daily commands

```bash
npm run dev          # start dev server with hot reload   → http://localhost:3000
npm run build        # production build                   → .next/
npm run start        # serve the production build locally → http://localhost:3000
npm run lint         # ESLint
npm run lint:fix     # ESLint with --fix
npm run format       # Prettier write
npm run format:check # Prettier check (CI-friendly)
```

Equivalent `mise` task shortcuts (see [`mise.toml`](mise.toml)):

```bash
mise run dev
mise run build
mise run lint
mise run format
```

---

## Docker (production parity)

The `Dockerfile` is a three-stage build (`deps` → `builder` → `runner`) using Next.js's [standalone output](https://nextjs.org/docs/app/api-reference/next-config-js/output#automatically-copying-traced-files). The final image runs as a non-root user and only ships the standalone server + static assets — no `node_modules`, no source.

```bash
docker build -t portfolio .
docker run --rm -p 3000:3000 portfolio
# → http://localhost:3000
```

This is what production looks like — use it to catch issues that don't surface in `npm run dev` (e.g. missing env vars, broken image optimization config).

---

## Project layout (high level)

```
.
├── public/                 # Static assets served from /
├── src/
│   ├── app/                # Routes — every folder here is a URL segment
│   │   ├── layout.tsx      # Root layout (wraps every page)
│   │   ├── page.tsx        # / (home — currently a "system check" page)
│   │   ├── globals.css     # Color tokens + Tailwind base
│   │   └── fonts/          # Self-hosted Geist Sans + Geist Mono
│   ├── components/         # Custom React components (created as needed)
│   └── lib/
│       └── utils.ts        # `cn()` helper (Tailwind class merger)
├── components.json         # shadcn/ui config (used when adding components)
├── tailwind.config.ts      # Tailwind theme — color tokens mapped to utilities
├── next.config.mjs         # Next.js config (output: "standalone" for Docker)
├── tsconfig.json           # TypeScript (strict mode on)
├── Dockerfile              # Production image build
└── mise.toml               # Node version + dev tasks
```

For a deeper explanation of what each piece does and how the Next.js App Router thinks about routing/layouts/server components, see [`ARCHITECTURE.md`](ARCHITECTURE.md).

---

## Adding a shadcn/ui component

`shadcn/ui` doesn't install components into `node_modules` — it generates the source files into `src/components/ui/` so you own them. The config is already wired in [`components.json`](components.json).

Add a button (for example):

```bash
npx shadcn@latest add button
```

The component lands in `src/components/ui/button.tsx`. Edit it, restyle it — it's yours.

---

## Status

**Step 3 of 10 complete** (per the design brief §13). The `/` route now renders the full home page on a full-bleed dashboard layout with the breathing grid backdrop (§2):

- Sticky top nav (status badge + section links)
- Hero with detailed Pixar-style SVG astronaut at center of an animated topology graph (gradient nodes, glow filter, flowing-dash data lines, multi-layer pulsing halo, slow-rotating outer ring, gentle astronaut float)
- Metrics strip (Mission Time / Deploys / Payloads / P95 Latency)
- Active Missions — 3 cards (Mood 42, CS Soch, knot) with hover tilt
- EVA / side missions
- Mission Log preview (3 most recent timeline items)
- Comms CTA (email + GitHub + LinkedIn)
- Footer status bar (ONLINE · v1.0.0 · last commit)

**Typography pass complete** — every text element has a defined voice (mono = system / chrome, sans = human voice; Title Case for section names, sentence case for prose, UPPERCASE + tracking for labels). Rules + table in [`ARCHITECTURE.md` § Typography](ARCHITECTURE.md).

Next: full timeline + interactive skills topology on a `/about` route (step 5).

For session-loaded project instructions, see [`CLAUDE.md`](CLAUDE.md).

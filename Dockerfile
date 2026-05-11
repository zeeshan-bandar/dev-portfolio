# syntax=docker/dockerfile:1.7
#
# Multi-stage Dockerfile for the Mission Control portfolio.
#
# Strategy: Next.js `output: "standalone"` (set in next.config.mjs) emits a
# self-contained server bundle into .next/standalone. The final image only
# needs that bundle plus the static assets — no node_modules, no source.
# Result is a small (~150 MB) image that boots fast.
#
# Build:   docker build -t portfolio .
# Run:     docker run --rm -p 3000:3000 portfolio
# Visit:   http://localhost:3000

# ---------- 1. deps ---------------------------------------------------------
# Install production + dev dependencies into a cached layer. Only re-runs
# when package.json or package-lock.json change.
FROM node:20-alpine AS deps
WORKDIR /app

# libc6-compat is needed by some native deps on Alpine.
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci

# ---------- 2. builder ------------------------------------------------------
# Compile Next.js into the standalone output.
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---------- 3. runner -------------------------------------------------------
# Minimal runtime image. Runs as a non-root user.
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser  --system --uid 1001 nextjs

# Static assets and standalone server.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# server.js is created by Next.js inside .next/standalone/.
CMD ["node", "server.js"]

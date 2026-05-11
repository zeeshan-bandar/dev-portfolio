"use client";

/**
 * TopologyGraph — animated SVG showing the astronaut at center with
 * skill nodes orbiting (React, AI, Python, PG, AWS — see brief §7).
 *
 * Visual treatment:
 *   - SVG <defs> hold radial gradients (node fills, halo, glove sheen),
 *     a linear gradient for line strokes, and a Gaussian blur filter
 *     used as the glow effect on accent elements.
 *   - Connecting lines start on the halo edge and end on the node edge
 *     (computed from the angle) so they never visually clip into the
 *     astronaut or the node circles.
 *   - Lines have a flowing dashed pattern (CSS animation in
 *     globals.css → `mc-line-flow`) to suggest data travelling inward.
 *   - The astronaut sits inside a multi-layer pulsing halo and bobs
 *     gently up/down via Framer Motion.
 *   - A subtle outer ring rotates slowly with a single bright marker —
 *     adds dynamism without being noisy.
 *
 * Marked "use client" because Framer Motion's <motion.*> components
 * use hooks under the hood.
 */

import { motion } from "framer-motion";
import { Astronaut } from "./astronaut";

const CENTER = { x: 160, y: 130 } as const;
const HALO_INNER_R = 42;
const HALO_OUTER_R = 50;

type SkillNode = {
  id: string;
  x: number;
  y: number;
  label: string;
  /** Smaller radius — used for the optional 5th node (AI) at top center. */
  small?: boolean;
};

const NODE_R = 24;
const NODE_R_SMALL = 18;

const NODES: readonly SkillNode[] = [
  { id: "react", x: 46, y: 56, label: "React" },
  { id: "ai", x: 160, y: 22, label: "AI", small: true },
  { id: "python", x: 274, y: 56, label: "Python" },
  { id: "pg", x: 46, y: 204, label: "PG" },
  { id: "aws", x: 274, y: 204, label: "AWS" },
];

const radiusFor = (n: SkillNode) => (n.small ? NODE_R_SMALL : NODE_R);

/** Compute line endpoints so they touch halo edge → node edge, not centers. */
function computeLine(node: SkillNode) {
  const dx = node.x - CENTER.x;
  const dy = node.y - CENTER.y;
  const dist = Math.hypot(dx, dy);
  const ux = dx / dist;
  const uy = dy / dist;
  const nodeR = radiusFor(node) + 1;
  return {
    x1: CENTER.x + ux * HALO_INNER_R,
    y1: CENTER.y + uy * HALO_INNER_R,
    x2: node.x - ux * nodeR,
    y2: node.y - uy * nodeR,
  };
}

/** Precomputed line geometry — used both to render lines and to define
 * each line's own gradient (in userSpaceOnUse coords) so vertical lines
 * actually show a gradient instead of collapsing. */
const LINES = NODES.map((n) => ({ id: n.id, ...computeLine(n) }));

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const lineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const labelVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function TopologyGraph() {
  return (
    <motion.svg
      viewBox="0 0 320 260"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Skill topology: astronaut at center, surrounded by React, AI, Python, Postgres, and AWS nodes"
      className="h-auto w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <defs>
        {/* Radial gradient for node fills — subtle inner cyan glow */}
        <radialGradient id="nodeFill" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="60%" stopColor="rgba(93,202,165,0.04)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
        </radialGradient>

        {/* Soft accent glow for halos and node aura */}
        <radialGradient id="haloGlow">
          <stop offset="0%" stopColor="rgba(93,202,165,0.32)" />
          <stop offset="55%" stopColor="rgba(93,202,165,0.08)" />
          <stop offset="100%" stopColor="rgba(93,202,165,0)" />
        </radialGradient>

        {/*
         * One linear gradient PER LINE, defined in userSpaceOnUse
         * coordinates (absolute SVG coords, not the line's bounding
         * box). This is the only way a gradient renders on a vertical
         * line — with the default objectBoundingBox a vertical line
         * has zero width and the horizontal gradient collapses to
         * invisible. Each gradient is bright (0.85) at the center end
         * and fades (0.25) at the node end.
         */}
        {LINES.map((l) => (
          <linearGradient
            key={`grad-${l.id}`}
            id={`lineFlow-${l.id}`}
            gradientUnits="userSpaceOnUse"
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
          >
            <stop offset="0%" stopColor="#5dcaa5" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#5dcaa5" stopOpacity="0.25" />
          </linearGradient>
        ))}

        {/* Soft glow filter applied to accent elements */}
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ---------- Background dust / stars ---------- */}
      <g opacity="0.6">
        <circle cx="40" cy="30" r="0.8" fill="#ffffff" />
        <circle cx="280" cy="40" r="1" fill="#ffffff" />
        <circle cx="20" cy="130" r="0.6" fill="#ffffff" />
        <circle cx="300" cy="180" r="0.8" fill="#ffffff" />
        <circle cx="260" cy="240" r="0.6" fill="#ffffff" />
        <circle cx="60" cy="220" r="0.8" fill="#ffffff" />
        <circle cx="180" cy="245" r="0.5" fill="#ffffff" />
        <circle cx="100" cy="35" r="0.5" fill="#ffffff" />
        <circle cx="240" cy="100" r="0.4" fill="#ffffff" />
      </g>

      {/* ---------- Slowly rotating outer ring with marker ---------- */}
      <g transform={`translate(${CENTER.x} ${CENTER.y})`}>
        <ellipse
          cx="0"
          cy="0"
          rx="110"
          ry="68"
          fill="none"
          stroke="rgba(93,202,165,0.12)"
          strokeWidth="0.5"
          strokeDasharray="2 5"
        />
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="0"
            cy="0"
            r="78"
            fill="none"
            stroke="rgba(93,202,165,0.18)"
            strokeWidth="0.4"
            strokeDasharray="1 4"
          />
          <circle
            cx="78"
            cy="0"
            r="1.6"
            fill="#5dcaa5"
            filter="url(#softGlow)"
          />
        </motion.g>
      </g>

      {/* ---------- Connecting lines (halo edge → node edge) ---------- */}
      {LINES.map((l) => (
        <motion.line
          key={`line-${l.id}`}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke={`url(#lineFlow-${l.id})`}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="3 5"
          className="mc-line-flow"
          variants={lineVariants}
        />
      ))}

      {/* ---------- Skill nodes ---------- */}
      {NODES.map((n) => {
        const r = radiusFor(n);
        return (
          <motion.g
            key={`node-${n.id}`}
            variants={nodeVariants}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            {/* Outer glow halo */}
            <circle
              cx={n.x}
              cy={n.y}
              r={r + 8}
              fill="url(#haloGlow)"
              opacity="0.7"
            />
            {/* Main filled circle */}
            <circle
              cx={n.x}
              cy={n.y}
              r={r}
              fill="url(#nodeFill)"
              stroke="rgba(93,202,165,0.45)"
              strokeWidth="1"
            />
            {/* Inner top-left highlight (suggests 3D) */}
            <ellipse
              cx={n.x - r * 0.35}
              cy={n.y - r * 0.4}
              rx={r * 0.45}
              ry={r * 0.25}
              fill="rgba(255,255,255,0.07)"
            />
            {/* Label */}
            <text
              x={n.x}
              y={n.y + 4}
              className="font-mono"
              fontSize="11"
              fill="#f5f7fa"
              textAnchor="middle"
              fontWeight="500"
            >
              {n.label}
            </text>
          </motion.g>
        );
      })}

      {/* ---------- Astronaut: pulsing halos + floating figure ---------- */}
      {/* Outer halo (slowest pulse) */}
      <motion.circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={HALO_OUTER_R}
        fill="url(#haloGlow)"
        animate={{
          r: [HALO_OUTER_R, HALO_OUTER_R + 6, HALO_OUTER_R],
          opacity: [0.55, 0.9, 0.55],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Inner halo (faster, offset phase) */}
      <motion.circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={HALO_INNER_R}
        fill="rgba(93,202,165,0.06)"
        stroke="rgba(93,202,165,0.4)"
        strokeWidth="0.6"
        animate={{
          r: [HALO_INNER_R, HALO_INNER_R + 3, HALO_INNER_R],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />

      {/* Astronaut — wrapped in a floating motion.g */}
      <g transform={`translate(${CENTER.x} ${CENTER.y})`}>
        <motion.g
          animate={{ y: [-2.5, 2.5, -2.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Astronaut />
        </motion.g>
      </g>

      {/* CMDR label below astronaut */}
      <motion.text
        x={CENTER.x}
        y={CENTER.y + HALO_OUTER_R + 16}
        className="font-mono"
        fontSize="10"
        fill="#5dcaa5"
        textAnchor="middle"
        letterSpacing="1.5"
        fontWeight="500"
        variants={labelVariants}
        filter="url(#softGlow)"
      >
        CMDR · ZEESHAN
      </motion.text>
    </motion.svg>
  );
}

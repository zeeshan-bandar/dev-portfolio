/**
 * Astronaut — detailed Pixar-style placeholder figure.
 *
 * Returns an SVG <g> group rooted at (0, 0). Caller positions it via
 * a parent <g transform="translate(...)">. Renders ~70px tall at
 * scale=1.
 *
 * Design — per PORTFOLIO_BRIEF.md §12:
 *   - Friendly / round / Pixar (NOT sleek, NOT low-poly)
 *   - Light suit (off-white) with cyan accents
 *   - Big helmet relative to body (cute proportions)
 *
 * Built up from primitives with radial/linear gradients (defined inline
 * so the component is self-contained) and a couple of small inline
 * SMIL <animate> elements for the helmet light blink and chest panel
 * status lights. Stays a server component this way — no React hooks.
 *
 * Step 9 of the build order swaps this for a real 3D model (Spline or
 * R3F + .glb). Until then this is the high-fidelity SVG stand-in.
 */

export function Astronaut({ scale = 1 }: { scale?: number } = {}) {
  return (
    <g transform={scale !== 1 ? `scale(${scale})` : undefined}>
      <defs>
        {/* Helmet glass: subtle blue-black gradient suggesting a curved dome */}
        <radialGradient id="helmetGlass" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0%" stopColor="#2a3550" />
          <stop offset="55%" stopColor="#11192a" />
          <stop offset="100%" stopColor="#040712" />
        </radialGradient>

        {/* Suit: off-white with subtle shading */}
        <linearGradient id="suit" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#eef1f7" />
          <stop offset="100%" stopColor="#c9d0db" />
        </linearGradient>

        {/* Glove: matches suit but slightly cooler */}
        <radialGradient id="glove" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#b8c0cc" />
        </radialGradient>

        {/* Backpack: neutral grey */}
        <linearGradient id="pack" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#aab1c0" />
          <stop offset="100%" stopColor="#737a8a" />
        </linearGradient>
      </defs>

      {/* ---------- Backpack (sits behind shoulders) ---------- */}
      <rect
        x="-16"
        y="-2"
        width="32"
        height="20"
        rx="4"
        fill="url(#pack)"
        stroke="rgba(93,202,165,0.5)"
        strokeWidth="0.5"
      />
      {/* Backpack vent strip */}
      <rect x="-13" y="2" width="26" height="3" rx="1" fill="#1a2030" />
      {/* Vent lights */}
      <circle cx="-9" cy="3.5" r="0.6" fill="#5dcaa5" />
      <circle cx="-5" cy="3.5" r="0.6" fill="#5dcaa5" opacity="0.55" />
      <circle cx="9" cy="3.5" r="0.6" fill="#efbf75" />

      {/* ---------- Body / suit ---------- */}
      <path
        d="M -13 -1
           Q -14 -2 -13 -3
           L 13 -3
           Q 14 -2 13 -1
           L 13 22
           Q 13 27 8 27
           L -8 27
           Q -13 27 -13 22 Z"
        fill="url(#suit)"
        stroke="#5dcaa5"
        strokeWidth="0.8"
      />

      {/* Suit shoulder seams (left + right slight curves) */}
      <path
        d="M -13 -1 Q -10 1 -10 5"
        stroke="rgba(93,202,165,0.4)"
        strokeWidth="0.4"
        fill="none"
      />
      <path
        d="M 13 -1 Q 10 1 10 5"
        stroke="rgba(93,202,165,0.4)"
        strokeWidth="0.4"
        fill="none"
      />

      {/* Belt — full-width cyan band */}
      <rect x="-13" y="14" width="26" height="3" fill="#5dcaa5" />
      <rect
        x="-13"
        y="14"
        width="26"
        height="0.6"
        fill="rgba(255,255,255,0.5)"
      />

      {/* Belt buckle */}
      <rect
        x="-2"
        y="13.5"
        width="4"
        height="4"
        rx="0.6"
        fill="#9fe1cb"
        stroke="#0a0e1a"
        strokeWidth="0.4"
      />

      {/* Chest control panel */}
      <rect x="-7" y="2" width="14" height="8" rx="1.2" fill="#0a1020" />
      <rect x="-7" y="2" width="14" height="2" fill="rgba(93,202,165,0.18)" />
      {/* Status lights (blinking) */}
      <circle cx="-3.5" cy="6.5" r="0.9" fill="#5dcaa5">
        <animate
          attributeName="opacity"
          values="1;0.25;1"
          dur="2.4s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="0" cy="6.5" r="0.9" fill="#9fe1cb">
        <animate
          attributeName="opacity"
          values="1;0.25;1"
          dur="2.4s"
          begin="0.4s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="3.5" cy="6.5" r="0.9" fill="#efbf75">
        <animate
          attributeName="opacity"
          values="1;0.25;1"
          dur="2.4s"
          begin="0.8s"
          repeatCount="indefinite"
        />
      </circle>

      {/* ---------- Arms + gloves ---------- */}
      {/* Left arm */}
      <rect
        x="-21"
        y="-1"
        width="7"
        height="14"
        rx="3.5"
        fill="url(#suit)"
        stroke="rgba(93,202,165,0.4)"
        strokeWidth="0.5"
      />
      {/* Left glove */}
      <circle
        cx="-17.5"
        cy="15"
        r="3.6"
        fill="url(#glove)"
        stroke="#5dcaa5"
        strokeWidth="0.6"
      />
      {/* Glove cuff */}
      <rect x="-21" y="11" width="7" height="1.4" fill="#5dcaa5" />

      {/* Right arm */}
      <rect
        x="14"
        y="-1"
        width="7"
        height="14"
        rx="3.5"
        fill="url(#suit)"
        stroke="rgba(93,202,165,0.4)"
        strokeWidth="0.5"
      />
      {/* Right glove */}
      <circle
        cx="17.5"
        cy="15"
        r="3.6"
        fill="url(#glove)"
        stroke="#5dcaa5"
        strokeWidth="0.6"
      />
      {/* Glove cuff */}
      <rect x="14" y="11" width="7" height="1.4" fill="#5dcaa5" />

      {/* ---------- Helmet ---------- */}
      {/* Outer helmet ring (silver collar) */}
      <ellipse
        cx="0"
        cy="-2"
        rx="14"
        ry="3.5"
        fill="#d6dbe5"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="0.4"
      />

      {/* Helmet glass dome */}
      <circle
        cx="0"
        cy="-13"
        r="17"
        fill="url(#helmetGlass)"
        stroke="#e8edf5"
        strokeWidth="1.5"
      />

      {/* Visor accent rim — cyan */}
      <ellipse
        cx="0"
        cy="-13"
        rx="13"
        ry="11"
        fill="none"
        stroke="rgba(93,202,165,0.35)"
        strokeWidth="0.6"
        strokeDasharray="3 2"
      />

      {/* Visor reflections — large curved highlight */}
      <path
        d="M -11 -16 Q -13 -8 -3 -2"
        stroke="rgba(93,202,165,0.7)"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M -8 -19 Q -10 -14 -6 -10"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      {/* Bright reflection spots */}
      <ellipse
        cx="-5"
        cy="-15"
        rx="2.4"
        ry="1.6"
        fill="rgba(255,255,255,0.85)"
      />
      <circle cx="-1" cy="-18" r="1" fill="rgba(255,255,255,0.95)" />

      {/* ---------- Helmet top: rim, light, antenna ---------- */}
      {/* Rim band */}
      <path
        d="M -10 -27 Q 0 -32 10 -27"
        stroke="#5dcaa5"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Forward-facing light housing */}
      <rect
        x="-3.5"
        y="-31"
        width="7"
        height="2.4"
        rx="0.8"
        fill="#d6dbe5"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="0.3"
      />
      {/* Blinking light */}
      <circle cx="0" cy="-32" r="1.6" fill="#9fe1cb">
        <animate
          attributeName="opacity"
          values="1;0.35;1"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="1.6;2;1.6"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Antenna */}
      <line
        x1="0"
        y1="-32"
        x2="0"
        y2="-35"
        stroke="#e8edf5"
        strokeWidth="0.8"
      />
      <circle cx="0" cy="-35" r="0.9" fill="#5dcaa5" />
    </g>
  );
}

import type { Config } from "tailwindcss";

/**
 * Tailwind config for the Mission Control portfolio.
 *
 * Color tokens are defined as CSS variables in src/app/globals.css and
 * mapped here so Tailwind utilities (`bg-background`, `text-accent`, ...)
 * stay in sync with the design system. We follow shadcn/ui's flat naming
 * convention (background, foreground, border, accent, ...) so any shadcn
 * components added later drop in cleanly.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      colors: {
        // Page surfaces
        background: "var(--bg-base)",
        "background-deep": "var(--bg-deep)",
        card: "var(--bg-card)",
        "card-hover": "var(--bg-card-hover)",

        // Borders (overrides the default Tailwind border color too — anything
        // using bare `border` will pick this up).
        border: "var(--border-soft)",
        "border-medium": "var(--border-medium)",

        // Text
        foreground: "var(--text-primary)",
        "foreground-secondary": "var(--text-secondary)",
        "foreground-muted": "var(--text-muted)",

        // Accent — cyan/teal
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
          bg: "var(--accent-bg)",
        },

        // Status indicators (active / warning / archived)
        status: {
          active: "var(--status-active)",
          warning: "var(--status-warning)",
          archived: "var(--status-archived)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

"use client";

/**
 * MissionCard — individual project card in the Active Missions row.
 *
 * Wrapped in <Tilt> from react-parallax-tilt for a subtle 3D tilt on
 * hover (4° max, gentle, brand-appropriate — not the full Apple-Vision
 * exaggeration). Marked "use client" because Tilt uses pointer events.
 *
 * Card content per PORTFOLIO_BRIEF.md §10:
 *   - Type · year header
 *   - Status indicator + label (ACTIVE / SHIPPED / IN ORBIT)
 *   - Title (project name, mono)
 *   - One-line description
 *   - Tech tags (mono pills)
 *   - Affordance: "$ view case study →" or "$ open repo →" for external
 */

import Tilt from "react-parallax-tilt";

export type MissionStatus =
  | "active"
  | "shipped"
  | "in-orbit"
  | "launching"
  | "decommissioned";

const STATUS_LABEL: Record<MissionStatus, string> = {
  active: "ACTIVE",
  shipped: "SHIPPED",
  "in-orbit": "IN ORBIT",
  launching: "LAUNCHING",
  decommissioned: "DECOMMISSIONED",
};

type MissionCardProps = {
  status: MissionStatus;
  type: string;
  year: string;
  title: string;
  description: string;
  tech: readonly string[];
  href: string;
  external?: boolean;
};

export function MissionCard({
  status,
  type,
  year,
  title,
  description,
  tech,
  href,
  external = false,
}: MissionCardProps) {
  const isArchived = status === "decommissioned";

  return (
    <Tilt
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      glareEnable={false}
      transitionSpeed={1500}
      tiltReverse
      className="block h-full"
    >
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex h-full flex-col gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-border-medium hover:bg-card-hover"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
              {type} · {year}
            </div>
            <h3 className="font-mono text-base font-medium text-foreground">
              {title}
            </h3>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <span
              className={
                "inline-block h-1.5 w-1.5 rounded-full " +
                (isArchived ? "bg-status-archived" : "bg-status-active")
              }
              aria-hidden
            />
            <span
              className={
                "font-mono text-[10px] tracking-wider " +
                (isArchived ? "text-foreground-muted" : "text-accent-soft")
              }
            >
              {STATUS_LABEL[status]}
            </span>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-foreground-secondary">
          {description}
        </p>

        <ul className="mt-auto flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <li
              key={t}
              className="rounded bg-accent-bg px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-soft"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="border-border-medium/40 border-t pt-3 font-mono text-[11px] text-foreground-muted transition-colors group-hover:text-accent">
          {external ? "$ open repo →" : "$ view case study →"}
        </div>
      </a>
    </Tilt>
  );
}

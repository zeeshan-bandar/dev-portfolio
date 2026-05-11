/**
 * MissionLogPreview — vertical timeline of the 3 most recent log
 * entries (per PORTFOLIO_BRIEF.md §9).
 *
 * Full timeline lives at /about (built in step 5). The "$ cat
 * ./mission-log-full →" link points there.
 *
 * Server component. Static data — promotion dates and titles are
 * historical fact and don't change often.
 */

import { SectionContainer } from "./section-container";
import { SectionHeader } from "./section-header";

const LOG_ITEMS = [
  {
    period: "2024 — present",
    title: "Branched out",
    description:
      "Built knot (Go TUI). Shipped Mood 42 (AI agent freelance). Open to next mission.",
  },
  {
    period: "Jul 2025",
    title: "Senior Software Developer · Sarvaha",
    description: "Promoted from Software Developer.",
  },
  {
    period: "Jul 2022",
    title: "Software Developer · Sarvaha",
    description: "Lead engineer on the CSSoch platform.",
  },
] as const;

export function MissionLogPreview() {
  return (
    <SectionContainer id="mission-log">
      <SectionHeader
        label="MISSION LOG"
        title="Recent Telemetry"
        description="Three most recent entries. Full timeline lives on the Mission Profile."
      />

      <ol className="relative ml-1 border-l border-border-medium">
        {LOG_ITEMS.map((item, i) => (
          <li
            key={item.title}
            className={
              "relative pl-6 " +
              (i < LOG_ITEMS.length - 1 ? "pb-7 sm:pb-8" : "")
            }
          >
            <span
              className="absolute -left-[5px] top-1.5 inline-block h-2.5 w-2.5 rounded-full border border-accent bg-background"
              aria-hidden
            />
            <div className="mb-1 font-mono text-[11px] tracking-wider text-accent">
              {item.period}
            </div>
            <div className="mb-1 font-mono text-sm text-foreground">
              {item.title}
            </div>
            <p className="text-sm text-foreground-secondary">
              {item.description}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-7">
        <a
          href="/about"
          className="font-mono text-[11px] text-foreground-muted transition-colors hover:text-accent"
        >
          $ cat ./mission-log-full →
        </a>
      </div>
    </SectionContainer>
  );
}

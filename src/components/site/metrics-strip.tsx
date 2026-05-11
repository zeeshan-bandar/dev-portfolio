/**
 * MetricsStrip — 4 dashboard-style cells under the hero.
 *
 * Per PORTFOLIO_BRIEF.md §7: Mission Time · Deploys · Payloads · P95 Latency.
 * Values are intentional fudges that read "production telemetry" — owner
 * can edit METRICS once they have real numbers.
 *
 * Wrapped in SectionContainer for consistent padding/max-width with
 * the rest of the page sections.
 */

import { SectionContainer } from "../sections/section-container";

const METRICS = [
  { label: "MISSION TIME", value: "4 yrs" },
  { label: "DEPLOYS", value: "200+" },
  { label: "PAYLOADS", value: "12" },
  { label: "P95 LATENCY", value: "~12ms" },
] as const;

export function MetricsStrip() {
  return (
    <SectionContainer
      id="metrics"
      unpadded
      className="border-border-medium/40 border-y py-6 sm:py-7"
    >
      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {METRICS.map((m) => (
          <li
            key={m.label}
            className="rounded-md border border-border bg-card px-3 py-2.5"
          >
            <div className="mb-1 font-mono text-[11px] tracking-wider text-foreground-muted">
              {m.label}
            </div>
            <div className="font-mono text-[15px] font-medium text-foreground">
              {m.value}
            </div>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}

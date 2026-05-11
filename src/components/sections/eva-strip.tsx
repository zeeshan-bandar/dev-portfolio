/**
 * EvaStrip — "Extra-Vehicular Activity" / side missions.
 *
 * Quick row of side-project areas (ML notebooks, data science, web
 * sandbox). Lighter touch than Active Missions — these are
 * exploratory, not portfolio-grade case studies.
 *
 * Per PORTFOLIO_BRIEF.md §5 + §10. Replace items as the user surfaces
 * specific notebooks / repos worth highlighting.
 */

import { SectionContainer } from "./section-container";
import { SectionHeader } from "./section-header";

const EVA_ITEMS = [
  {
    name: "ML notebooks",
    description: "Jupyter experiments — model training, evals.",
  },
  {
    name: "Data science",
    description: "Exploratory analysis, viz, small dataset work.",
  },
  {
    name: "Web sandbox",
    description: "Pattern + library experiments outside client work.",
  },
] as const;

export function EvaStrip() {
  return (
    <SectionContainer id="eva">
      <SectionHeader
        label="EVA · SIDE MISSIONS"
        count={EVA_ITEMS.length}
        description="Extra-vehicular activity. Where I poke at things outside the main payload."
      />
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {EVA_ITEMS.map((item) => (
          <li
            key={item.name}
            className="rounded-md border border-border bg-card px-4 py-3 transition-colors hover:bg-card-hover"
          >
            <div className="mb-1 font-mono text-sm text-foreground">
              {item.name}
            </div>
            <div className="text-xs leading-relaxed text-foreground-muted">
              {item.description}
            </div>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}

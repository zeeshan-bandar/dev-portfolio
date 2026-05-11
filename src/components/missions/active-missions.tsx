/**
 * ActiveMissions — section listing the three live projects per
 * PORTFOLIO_BRIEF.md §10.
 *
 * Server component. The card itself is a client component (tilt
 * needs pointer events) but composing the list happens server-side
 * so the card content lives in the initial HTML.
 *
 * `case-study` hrefs go to in-page anchors for now (`#mood-42` etc).
 * They become real /missions/[slug] routes in step 6 of the build.
 */

import { MissionCard, type MissionStatus } from "./mission-card";
import { SectionContainer } from "../sections/section-container";
import { SectionHeader } from "../sections/section-header";

type Mission = {
  status: MissionStatus;
  type: string;
  year: string;
  title: string;
  description: string;
  tech: readonly string[];
  href: string;
  external?: boolean;
};

const MISSIONS: readonly Mission[] = [
  {
    status: "shipped",
    type: "FREELANCE",
    year: "2024",
    title: "Mood 42",
    description:
      "AI marketing agent. Users describe a product via chatbot; the agent generates banners, ads, and social-ready creatives end-to-end.",
    tech: ["react", "llm", "image-gen"],
    href: "#mood-42",
  },
  {
    status: "in-orbit",
    type: "SARVAHA",
    year: "2022 — present",
    title: "CS Soch",
    description:
      "EdTech platform teaching kids to code. Built teacher analytics dashboards, custom Blockly blocks, and 5+ educational games end-to-end.",
    tech: ["react", "flask", "firestore", "blockly", "p5"],
    href: "#cssoch",
  },
  {
    status: "active",
    type: "PERSONAL",
    year: "2024 — 25",
    title: "knot",
    description:
      "Friendly Go TUI replacing the awkward `lsof | grep | kill` flow. Browse network connections, kill processes from the keyboard.",
    tech: ["go", "bubbletea"],
    href: "https://github.com/zeeshan-bandar/knot",
    external: true,
  },
];

export function ActiveMissions() {
  return (
    <SectionContainer id="missions">
      <SectionHeader
        label="ACTIVE MISSIONS"
        count={MISSIONS.length}
        title="Active Missions"
        description="Three live deployments — each owned end-to-end from architecture through deploy."
      />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {MISSIONS.map((m) => (
          <li key={m.title}>
            <MissionCard {...m} />
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}

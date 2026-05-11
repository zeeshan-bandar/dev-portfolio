/**
 * `/` — Mission Control home.
 *
 * Full-bleed dashboard layout. The page is a vertical stack of
 * sections, each one constrained to max-w-7xl internally via
 * <SectionContainer>, sitting on the dark `bg-background-deep` canvas
 * with the breathing grid (rendered in layout.tsx) behind everything.
 *
 * Order matches the brief's site map (§5):
 *   - Sticky top nav
 *   - Hero (copy + animated topology + astronaut)
 *   - Metrics strip
 *   - Active Missions (Mood 42 / CSSoch / knot)
 *   - EVA · side missions
 *   - Mission Log preview (timeline · 3 most recent)
 *   - Comms CTA
 *   - Footer status bar
 *
 * Future routes (/about, /missions/[slug], /comms, /404) come in
 * later steps — see PORTFOLIO_BRIEF.md §13 build order.
 */

import { Hero } from "@/components/hero/hero";
import { ActiveMissions } from "@/components/missions/active-missions";
import { CommsCta } from "@/components/sections/comms-cta";
import { EvaStrip } from "@/components/sections/eva-strip";
import { MissionLogPreview } from "@/components/sections/mission-log-preview";
import { MetricsStrip } from "@/components/site/metrics-strip";
import { StatusBar } from "@/components/site/status-bar";
import { TopNav } from "@/components/site/top-nav";

export default function Home() {
  return (
    <>
      <header className="bg-background-deep/80 sticky top-0 z-30 border-b border-border backdrop-blur-md">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <TopNav />
        </div>
      </header>

      <main>
        <Hero />
        <MetricsStrip />
        <ActiveMissions />
        <EvaStrip />
        <MissionLogPreview />
        <CommsCta />
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatusBar />
        </div>
      </footer>
    </>
  );
}

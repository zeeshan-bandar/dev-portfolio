/**
 * Hero — main top-of-page section.
 *
 * Layout (full-bleed page):
 *   Left  — section comment, headline, subheadline, two CTA "shell prompts"
 *   Right — animated TopologyGraph (astronaut + skill nodes)
 *
 * Server component. The only client island is <TopologyGraph /> below,
 * which carries its own "use client" boundary. Everything else is plain
 * server-rendered JSX so the hero text appears in the initial HTML.
 *
 * Copy per PORTFOLIO_BRIEF.md §7. CTAs are anchor links — `#missions`
 * scrolls to the Active Missions section; `mailto:` will be swapped
 * for a Comms route in step 7.
 */

import { SectionContainer } from "../sections/section-container";
import { TopologyGraph } from "./topology-graph";

export function Hero() {
  return (
    <SectionContainer
      id="hero"
      aria-labelledby="hero-headline"
      className="pb-10 pt-10 sm:pb-16 sm:pt-14"
      unpadded
    >
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_1.05fr] md:gap-12">
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-wider text-accent">
            {"// mission.profile"}
          </p>

          <h1
            id="hero-headline"
            className="mb-4 text-3xl font-medium leading-[1.15] text-foreground sm:text-4xl md:text-[44px]"
          >
            Senior full-stack engineer
            <br />
            shipping production systems.
          </h1>

          <p className="mb-6 max-w-xl text-sm leading-[1.65] text-foreground-secondary sm:text-base">
            Operating between frontend orbit and backend deep space. Four years
            owning systems end-to-end.
          </p>

          <div className="flex flex-wrap gap-2">
            <a
              href="#missions"
              className="border-accent/30 hover:bg-accent-bg/80 rounded border bg-accent-bg px-4 py-2 font-mono text-xs text-accent-soft transition-colors"
            >
              $ launch ./tour
            </a>
            <a
              href="#comms"
              className="rounded border border-border bg-card px-4 py-2 font-mono text-xs text-foreground-secondary transition-colors hover:bg-card-hover hover:text-foreground"
            >
              $ ping me
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg md:max-w-none">
          <TopologyGraph />
        </div>
      </div>
    </SectionContainer>
  );
}

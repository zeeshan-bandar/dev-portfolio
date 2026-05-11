/**
 * CommsCta — bottom-of-page call-to-action ("Comms" per the brief's
 * naming convention, §6 microcopy palette).
 *
 * Three pathways: email (primary), GitHub, LinkedIn. Email placeholder
 * is `hello@zeeshan.dev` and should be swapped once the user picks a
 * real address (PORTFOLIO_BRIEF.md §14 outstanding inputs).
 */

import { SectionContainer } from "./section-container";

export function CommsCta() {
  return (
    <SectionContainer id="comms" className="border-t border-border-medium">
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-xl flex-col gap-3">
          <p className="font-mono text-[11px] tracking-wider text-accent">
            {"// COMMS"}
          </p>
          <h2 className="text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
            Ready to ship something?
          </h2>
          <p className="text-sm leading-relaxed text-foreground-secondary">
            Open to senior full-stack roles and selective freelance work. Best
            way to reach me is email — or jump straight to GitHub if you want to
            read code first.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:flex-col md:items-end">
          <a
            href="mailto:hello@zeeshan.dev"
            className="border-accent/40 hover:bg-accent-bg/70 rounded border bg-accent-bg px-4 py-2 font-mono text-xs text-accent-soft transition-colors"
          >
            $ ping me
          </a>
          <a
            href="https://github.com/zeeshan-bandar"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-border bg-card px-4 py-2 font-mono text-xs text-foreground-secondary transition-colors hover:bg-card-hover hover:text-foreground"
          >
            $ github →
          </a>
          <a
            href="https://www.linkedin.com/in/zeeshan-bandar-803297178"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-border bg-card px-4 py-2 font-mono text-xs text-foreground-secondary transition-colors hover:bg-card-hover hover:text-foreground"
          >
            $ linkedin →
          </a>
        </div>
      </div>
    </SectionContainer>
  );
}

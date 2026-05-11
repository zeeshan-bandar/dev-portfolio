/**
 * SectionContainer — shared layout wrapper for every page section.
 *
 * Centralizes the max-width and horizontal padding so spacing stays
 * uniform across Hero, Metrics, Active Missions, EVA, etc. Use this
 * for any new section instead of redoing the wrapper styles.
 *
 * Renders as a <section> element; pass `id` via ...rest for in-page
 * anchor navigation (e.g. <SectionContainer id="missions">).
 */

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionContainerProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  /** Skip default vertical padding (use when the caller wants its own). */
  unpadded?: boolean;
};

export function SectionContainer({
  children,
  unpadded = false,
  className,
  ...rest
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        !unpadded && "py-12 sm:py-16",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}

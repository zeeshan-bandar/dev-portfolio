import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * `cn` — class-name helper used throughout the codebase (and required by
 * shadcn/ui components). Combines `clsx` (conditional class joining) with
 * `tailwind-merge` (de-duplicates conflicting Tailwind classes so the last
 * one wins, e.g. `cn("p-2", "p-4")` → `"p-4"`).
 *
 * Usage:
 *   <div className={cn("rounded-md p-2", isActive && "bg-accent-bg")} />
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

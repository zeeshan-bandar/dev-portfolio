/**
 * TopNav — primary site navigation.
 *
 * Lives inside the sticky <header> in src/app/page.tsx, which provides
 * the max-width and horizontal padding. This component only handles
 * vertical padding + content layout.
 *
 * Links currently point to in-page anchors that exist on the home
 * route. `about` will switch to `/about` once that route is built
 * (step 5 of PORTFOLIO_BRIEF.md §13).
 */

const NAV_LINKS = [
  { href: "#missions", label: "missions" },
  { href: "#mission-log", label: "log" },
  { href: "#eva", label: "eva" },
  { href: "#comms", label: "contact" },
] as const;

export function TopNav() {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <a href="#hero" className="flex items-center gap-2 font-mono text-[13px]">
        <span className="font-medium text-accent">~/</span>
        <span className="font-medium text-foreground">zeeshan</span>
        <span
          className="ml-1.5 inline-block h-[7px] w-[7px] rounded-full bg-status-active"
          aria-hidden
        />
        <span className="text-[11px] tracking-wider text-foreground-muted">
          SHIPPING
        </span>
      </a>

      <nav
        aria-label="Primary"
        className="flex items-center gap-3 font-mono text-xs sm:gap-5"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-foreground-secondary transition-colors hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

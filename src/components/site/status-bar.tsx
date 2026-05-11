/**
 * StatusBar — site footer (the dashboard's bottom telemetry strip).
 *
 * Wrapped by <footer> in src/app/page.tsx which provides the
 * max-width + horizontal padding.
 *
 * Right side: "last commit · {time ago}" placeholder. Per
 * PORTFOLIO_BRIEF.md §7 this should auto-pull from the GitHub API.
 * Wiring deferred to a polish step — for now it's a static string.
 */

export function StatusBar() {
  return (
    <div className="flex items-center justify-between py-3 font-mono text-[11px] text-foreground-muted">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-status-active">
          <span
            className="inline-block h-[7px] w-[7px] rounded-full bg-status-active"
            aria-hidden
          />
          ONLINE
        </span>
        <span>v1.0.0</span>
      </div>
      <div>last commit · 2h ago</div>
    </div>
  );
}

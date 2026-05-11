/**
 * SectionHeader — themed header used at the top of each section.
 *
 * Layout:
 *   [● dot]  // SECTION LABEL · 03         <- mono accent kicker
 *   Section title                          <- larger heading
 *   Optional one-line description.         <- foreground-secondary
 *
 * Keeps section heads consistent so the dashboard feels coherent.
 */

type SectionHeaderProps = {
  /** Short uppercase label, e.g. "ACTIVE MISSIONS" */
  label: string;
  /** Optional count, displayed as zero-padded "// 03". */
  count?: number;
  /** Optional larger title (sentence-case). */
  title?: string;
  /** Optional one-line description under the title. */
  description?: string;
};

export function SectionHeader({
  label,
  count,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-2 sm:mb-8">
      <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-foreground-muted">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full bg-status-active"
          aria-hidden
        />
        <span className="text-accent">{label}</span>
        {count !== undefined && (
          <span className="text-foreground-muted/70">
            {`// ${String(count).padStart(2, "0")}`}
          </span>
        )}
      </div>
      {title && (
        <h2 className="text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-[28px]">
          {title}
        </h2>
      )}
      {description && (
        <p className="max-w-2xl text-[13px] leading-relaxed text-foreground-secondary sm:text-sm">
          {description}
        </p>
      )}
    </header>
  );
}

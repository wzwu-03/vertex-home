export default function AnalyticsChartCard({ title, subtitle, children }) {
  return (
    <article className="border-glow rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <header className="border-b border-[var(--border)] px-5 py-4">
        <h3 className="text-[0.82rem] font-semibold text-[var(--text-primary)]">{title}</h3>
        {subtitle ? <p className="mt-0.5 text-[0.72rem] text-[var(--text-muted)]">{subtitle}</p> : null}
      </header>
      <div className="h-72 p-4">{children}</div>
    </article>
  )
}

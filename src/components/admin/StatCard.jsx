export default function StatCard({ label, value, hint }) {
  return (
    <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--text-primary)]">{value}</p>
      {hint ? <p className="mt-2 text-sm text-[var(--text-secondary)]">{hint}</p> : null}
    </article>
  )
}

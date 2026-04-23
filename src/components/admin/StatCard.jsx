export default function StatCard({ label, value, hint, icon: Icon }) {
  return (
    <article className="border-glow rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="mb-3 flex items-start justify-between gap-2">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">{label}</p>
        {Icon && (
          <div className="rounded-lg bg-[var(--surface-2)] p-1.5">
            <Icon size={13} strokeWidth={1.8} style={{ color: 'var(--text-muted)' }} />
          </div>
        )}
      </div>
      <p className="text-[2rem] font-bold leading-none tracking-[-0.03em] text-[var(--text-primary)]">{value}</p>
      {hint ? <p className="mt-2 text-[0.72rem] text-[var(--text-muted)]">{hint}</p> : null}
    </article>
  )
}

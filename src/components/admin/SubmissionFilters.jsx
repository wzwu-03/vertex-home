const inputCls = 'w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-[0.82rem] text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)]'
const selectCls = `${inputCls} appearance-none pr-9`
const labelCls = 'grid gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]'

export default function SubmissionFilters({
  search, status, industry, sort,
  statusOptions, industryOptions,
  onSearchChange, onStatusChange, onIndustryChange, onSortChange,
}) {
  return (
    <section className="border-glow rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <label className={labelCls}>
          Search
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Name, email, company…"
            className={inputCls}
          />
        </label>

        <label className={labelCls}>
          Status
          <div className="relative">
            <select value={status} onChange={(e) => onStatusChange(e.target.value)} className={selectCls}>
              <option value="all">All statuses</option>
              {statusOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-[0.65rem] text-[var(--text-muted)]" aria-hidden="true">
              ▾
            </span>
          </div>
        </label>

        <label className={labelCls}>
          Industry
          <div className="relative">
            <select value={industry} onChange={(e) => onIndustryChange(e.target.value)} className={selectCls}>
              <option value="all">All industries</option>
              {industryOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-[0.65rem] text-[var(--text-muted)]" aria-hidden="true">
              ▾
            </span>
          </div>
        </label>

        <label className={labelCls}>
          Sort by
          <div className="relative">
            <select value={sort} onChange={(e) => onSortChange(e.target.value)} className={selectCls}>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">Name A–Z</option>
              <option value="priority">Priority score</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-[0.65rem] text-[var(--text-muted)]" aria-hidden="true">
              ▾
            </span>
          </div>
        </label>
      </div>
    </section>
  )
}

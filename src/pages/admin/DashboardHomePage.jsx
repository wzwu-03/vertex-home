import StatCard from '../../components/admin/StatCard'
import { useSubmissions } from '../../hooks/useSubmissions'

function computeOverview(submissions) {
  const total = submissions.length
  const newCount = submissions.filter((item) => !item.review?.status || item.review?.status === 'new').length
  const qualified = submissions.filter((item) => item.review?.status === 'qualified').length
  const avgPriority =
    submissions.reduce((sum, item) => sum + Number(item.review?.priority_score || 0), 0) /
    Math.max(1, submissions.filter((item) => item.review?.priority_score != null).length)

  return {
    total,
    newCount,
    qualified,
    avgPriority: Number.isFinite(avgPriority) ? avgPriority.toFixed(1) : '--',
  }
}

export default function DashboardHomePage() {
  const submissionsQuery = useSubmissions()
  const rows = submissionsQuery.data ?? []
  const overview = computeOverview(rows)

  return (
    <section>
      <header className="mb-5">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Admin Overview</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Snapshot of intake volume and triage signals.</p>
      </header>

      {submissionsQuery.isError ? (
        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">{submissionsQuery.error?.message || 'Unable to load submissions.'}</div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total submissions" value={submissionsQuery.isLoading ? '--' : overview.total} />
        <StatCard label="New / unreviewed" value={submissionsQuery.isLoading ? '--' : overview.newCount} />
        <StatCard label="Qualified" value={submissionsQuery.isLoading ? '--' : overview.qualified} />
        <StatCard label="Avg. priority" value={submissionsQuery.isLoading ? '--' : overview.avgPriority} hint="Based on scored reviews" />
      </div>
    </section>
  )
}

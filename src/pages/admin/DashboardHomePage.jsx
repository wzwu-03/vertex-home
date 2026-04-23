import { BadgeCheck, FileText, Inbox, TrendingUp } from 'lucide-react'
import StatCard from '../../components/admin/StatCard'
import { useSubmissions } from '../../hooks/useSubmissions'

function computeOverview(submissions) {
  const total = submissions.length
  const newCount = submissions.filter((item) => !item.review?.status || item.review?.status === 'new').length
  const qualified = submissions.filter((item) => item.review?.status === 'qualified').length
  const scored = submissions.filter((item) => item.review?.priority_score != null)
  const avgPriority =
    scored.reduce((sum, item) => sum + Number(item.review.priority_score), 0) / Math.max(1, scored.length)

  return {
    total,
    newCount,
    qualified,
    avgPriority: Number.isFinite(avgPriority) && scored.length > 0 ? avgPriority.toFixed(1) : '--',
  }
}

export default function DashboardHomePage() {
  const submissionsQuery = useSubmissions()
  const rows = submissionsQuery.data ?? []
  const overview = computeOverview(rows)
  const loading = submissionsQuery.isLoading
  const dash = (v) => (loading ? '--' : v)

  return (
    <section>
      <header className="mb-6">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Admin</p>
        <h1 className="mt-1 text-[1.4rem] font-bold tracking-[-0.02em] text-[var(--text-primary)]">Overview</h1>
        <p className="mt-1 text-[0.82rem] text-[var(--text-secondary)]">Snapshot of intake volume and triage signals.</p>
      </header>

      {submissionsQuery.isError ? (
        <div className="mb-5 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-[0.82rem] text-rose-200">
          {submissionsQuery.error?.message || 'Unable to load submissions.'}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total submissions"
          value={dash(overview.total)}
          icon={FileText}
        />
        <StatCard
          label="New / unreviewed"
          value={dash(overview.newCount)}
          hint="Awaiting first review"
          icon={Inbox}
        />
        <StatCard
          label="Qualified"
          value={dash(overview.qualified)}
          hint="Passed triage criteria"
          icon={BadgeCheck}
        />
        <StatCard
          label="Avg. priority"
          value={dash(overview.avgPriority)}
          hint="Across scored reviews"
          icon={TrendingUp}
        />
      </div>
    </section>
  )
}

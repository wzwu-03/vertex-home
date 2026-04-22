import { Link } from 'react-router-dom'
import SubmissionStatusBadge from './SubmissionStatusBadge'

function dateCell(value) {
  if (!value) return '--'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '--'
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function SubmissionTable({ rows, loading }) {
  if (loading) {
    return <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-secondary)]">Loading submissions...</div>
  }

  if (rows.length === 0) {
    return <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-secondary)]">No matching submissions found.</div>
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-[var(--surface-2)] text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
          <tr>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Industry</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-[var(--border)] text-[var(--text-secondary)]">
              <td className="px-4 py-3 text-[var(--text-primary)]">{dateCell(row.created_at)}</td>
              <td className="px-4 py-3">
                <p className="font-medium text-[var(--text-primary)]">{row.full_name}</p>
                <p className="text-xs text-[var(--text-muted)]">{row.email}</p>
              </td>
              <td className="px-4 py-3">{row.company_name || '--'}</td>
              <td className="px-4 py-3">{row.industry || '--'}</td>
              <td className="px-4 py-3">
                <SubmissionStatusBadge status={row.review?.status} />
              </td>
              <td className="px-4 py-3">{row.review?.priority_score ?? '--'}</td>
              <td className="px-4 py-3">
                <Link
                  to={`/admin/submissions/${row.id}`}
                  className="inline-flex items-center rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent)]"
                >
                  Open
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

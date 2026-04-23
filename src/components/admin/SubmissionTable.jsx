import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SubmissionStatusBadge from './SubmissionStatusBadge'

function dateCell(value) {
  if (!value) return '--'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '--'
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

const thCls = 'px-4 py-3 text-left text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]'
const tdCls = 'px-4 py-3.5'

function Placeholder({ children }) {
  return (
    <div className="border-glow rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-10 text-center">
      <p className="text-[0.85rem] text-[var(--text-muted)]">{children}</p>
    </div>
  )
}

export default function SubmissionTable({ rows, loading }) {
  if (loading) return <Placeholder>Loading submissions…</Placeholder>
  if (rows.length === 0) return <Placeholder>No matching submissions found.</Placeholder>

  return (
    <div className="border-glow overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <table className="min-w-full text-left text-[0.82rem]">
        <thead className="border-b border-[var(--border)] bg-[var(--surface-2)]">
          <tr>
            <th className={thCls}>Date</th>
            <th className={thCls}>Contact</th>
            <th className={thCls}>Company</th>
            <th className={thCls}>Industry</th>
            <th className={thCls}>Status</th>
            <th className={thCls}>Priority</th>
            <th className={thCls} />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id}
              className={`group transition-colors duration-100 hover:bg-[var(--surface-2)] ${i > 0 ? 'border-t border-[var(--border)]' : ''}`}
            >
              <td className={`${tdCls} whitespace-nowrap text-[var(--text-muted)]`}>{dateCell(row.created_at)}</td>
              <td className={tdCls}>
                <p className="font-medium text-[var(--text-primary)]">{row.full_name}</p>
                <p className="text-[0.72rem] text-[var(--text-muted)]">{row.email}</p>
              </td>
              <td className={`${tdCls} text-[var(--text-secondary)]`}>{row.company_name || <span className="text-[var(--text-muted)]">—</span>}</td>
              <td className={`${tdCls} text-[var(--text-secondary)]`}>{row.industry || <span className="text-[var(--text-muted)]">—</span>}</td>
              <td className={tdCls}>
                <SubmissionStatusBadge status={row.review?.status} />
              </td>
              <td className={tdCls}>
                {row.review?.priority_score != null
                  ? <span className="font-semibold text-[var(--text-primary)]">{row.review.priority_score}</span>
                  : <span className="text-[var(--text-muted)]">—</span>}
              </td>
              <td className={tdCls}>
                <Link
                  to={`/admin/submissions/${row.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-[0.75rem] font-semibold text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
                >
                  Open
                  <ArrowRight size={12} strokeWidth={2} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

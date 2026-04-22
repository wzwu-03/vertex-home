import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SubmissionNotesPanel from '../../components/admin/SubmissionNotesPanel'
import SubmissionStatusBadge from '../../components/admin/SubmissionStatusBadge'
import { useSubmission, useUpsertSubmissionReview } from '../../hooks/useSubmission'

const statusOptions = ['new', 'in_review', 'contact_pending', 'contacted', 'qualified', 'closed']
const followUpOptions = ['not_started', 'scheduled', 'contacted', 'waiting_response', 'closed']

function prettyDate(value) {
  if (!value) return '--'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '--'
  return date.toLocaleString()
}

export default function SubmissionDetailPage() {
  const { id } = useParams()
  const submissionQuery = useSubmission(id)
  const upsertReview = useUpsertSubmissionReview(id)

  const submission = submissionQuery.data?.submission
  const review = submissionQuery.data?.review
  const tags = submissionQuery.data?.tags ?? []
  const activity = submissionQuery.data?.activity ?? []

  const [draft, setDraft] = useState({})

  const mergedDraft = {
    status: draft.status ?? review?.status ?? 'new',
    priority_score: draft.priority_score ?? (review?.priority_score ?? ''),
    pain_category: draft.pain_category ?? review?.pain_category ?? '',
    impact_type: draft.impact_type ?? review?.impact_type ?? '',
    workflow_maturity: draft.workflow_maturity ?? review?.workflow_maturity ?? '',
    follow_up_status: draft.follow_up_status ?? review?.follow_up_status ?? '',
    follow_up_owner: draft.follow_up_owner ?? review?.follow_up_owner ?? '',
    internal_notes: draft.internal_notes ?? review?.internal_notes ?? '',
    last_contacted_at:
      draft.last_contacted_at ??
      (review?.last_contacted_at ? review.last_contacted_at.slice(0, 16) : ''),
  }

  const title = useMemo(() => {
    if (!submission) return 'Submission'
    return `${submission.full_name} (${submission.company_name || 'No company'})`
  }, [submission])

  const saveReview = async () => {
    const payload = {
      status: mergedDraft.status || 'new',
      priority_score: mergedDraft.priority_score === '' ? null : Number(mergedDraft.priority_score),
      pain_category: mergedDraft.pain_category || null,
      impact_type: mergedDraft.impact_type || null,
      workflow_maturity: mergedDraft.workflow_maturity || null,
      follow_up_status: mergedDraft.follow_up_status || null,
      follow_up_owner: mergedDraft.follow_up_owner || null,
      internal_notes: mergedDraft.internal_notes || null,
      last_contacted_at: mergedDraft.last_contacted_at || null,
    }

    await upsertReview.mutateAsync(payload)
  }

  if (submissionQuery.isLoading) {
    return <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-secondary)]">Loading submission...</div>
  }

  if (submissionQuery.isError || !submission) {
    return (
      <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-6 text-sm text-rose-200">
        {submissionQuery.error?.message || 'Unable to load this submission.'}
      </div>
    )
  }

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/admin/submissions" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
            ← Back to submissions
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-[var(--text-primary)]">{title}</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Submitted {prettyDate(submission.created_at)}</p>
        </div>
        <SubmissionStatusBadge status={mergedDraft.status || 'new'} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">Original submission</h2>
          <dl className="mt-4 grid gap-3 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Full name</dt>
              <dd className="mt-1 text-[var(--text-primary)]">{submission.full_name}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Email</dt>
              <dd className="mt-1 text-[var(--text-primary)]">{submission.email}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Phone</dt>
              <dd className="mt-1">{submission.phone || '--'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Company</dt>
              <dd className="mt-1">{submission.company_name || '--'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Industry</dt>
              <dd className="mt-1">{submission.industry || '--'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Business size</dt>
              <dd className="mt-1">{submission.business_size || '--'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Frequency</dt>
              <dd className="mt-1">{submission.frequency || '--'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Preferred follow-up</dt>
              <dd className="mt-1">{submission.preferred_follow_up || '--'}</dd>
            </div>
          </dl>

          <div className="mt-5 space-y-4">
            <div>
              <h3 className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Pain point</h3>
              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{submission.pain_point}</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Current solution</h3>
              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{submission.current_solution}</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Additional notes</h3>
              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{submission.additional_notes || '--'}</p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">Review metadata</h2>

          <div className="mt-4 grid gap-3">
            <label className="grid gap-1 text-sm text-[var(--text-secondary)]">
              Status
              <select
                value={mergedDraft.status}
                onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value }))}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1 text-sm text-[var(--text-secondary)]">
              Priority score
              <input
                type="number"
                min="0"
                max="100"
                value={mergedDraft.priority_score}
                onChange={(event) => setDraft((current) => ({ ...current, priority_score: event.target.value }))}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
              />
            </label>

            <label className="grid gap-1 text-sm text-[var(--text-secondary)]">
              Pain category
              <input
                value={mergedDraft.pain_category}
                onChange={(event) => setDraft((current) => ({ ...current, pain_category: event.target.value }))}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
              />
            </label>

            <label className="grid gap-1 text-sm text-[var(--text-secondary)]">
              Impact type
              <input
                value={mergedDraft.impact_type}
                onChange={(event) => setDraft((current) => ({ ...current, impact_type: event.target.value }))}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
              />
            </label>

            <label className="grid gap-1 text-sm text-[var(--text-secondary)]">
              Workflow maturity
              <input
                value={mergedDraft.workflow_maturity}
                onChange={(event) => setDraft((current) => ({ ...current, workflow_maturity: event.target.value }))}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
              />
            </label>

            <label className="grid gap-1 text-sm text-[var(--text-secondary)]">
              Follow-up status
              <select
                value={mergedDraft.follow_up_status}
                onChange={(event) => setDraft((current) => ({ ...current, follow_up_status: event.target.value }))}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
              >
                <option value="">Unspecified</option>
                {followUpOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1 text-sm text-[var(--text-secondary)]">
              Follow-up owner
              <input
                value={mergedDraft.follow_up_owner}
                onChange={(event) => setDraft((current) => ({ ...current, follow_up_owner: event.target.value }))}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
              />
            </label>

            <label className="grid gap-1 text-sm text-[var(--text-secondary)]">
              Last contacted at
              <input
                type="datetime-local"
                value={mergedDraft.last_contacted_at}
                onChange={(event) => setDraft((current) => ({ ...current, last_contacted_at: event.target.value }))}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
              />
            </label>

            <SubmissionNotesPanel
              value={mergedDraft.internal_notes}
              onChange={(value) => setDraft((current) => ({ ...current, internal_notes: value }))}
              saving={upsertReview.isPending}
            />

            <button
              type="button"
              onClick={saveReview}
              disabled={upsertReview.isPending}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-[var(--accent)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {upsertReview.isPending ? 'Saving...' : 'Save review'}
            </button>

            {upsertReview.isError ? <p className="text-sm text-rose-400">{upsertReview.error?.message || 'Unable to save review.'}</p> : null}
            {upsertReview.isSuccess ? <p className="text-sm text-emerald-400">Review saved.</p> : null}
          </div>

          <div className="mt-6 border-t border-[var(--border)] pt-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Tags</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.length === 0 ? <span className="text-xs text-[var(--text-muted)]">No tags</span> : null}
              {tags.map((tagRow) => (
                <span key={tagRow.id} className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--text-secondary)]">
                  {tagRow.tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>

      <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="text-base font-semibold text-[var(--text-primary)]">Activity log</h2>
        {activity.length === 0 ? <p className="mt-3 text-sm text-[var(--text-muted)]">No activity entries yet.</p> : null}
        <ul className="mt-3 grid gap-2">
          {activity.map((item) => (
            <li key={item.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text-secondary)]">
              <p className="font-medium text-[var(--text-primary)]">{item.action}</p>
              <p className="text-xs text-[var(--text-muted)]">{prettyDate(item.created_at)}</p>
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}

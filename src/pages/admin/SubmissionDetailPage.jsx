import { ChevronLeft } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SubmissionNotesPanel from '../../components/admin/SubmissionNotesPanel'
import SubmissionStatusBadge from '../../components/admin/SubmissionStatusBadge'
import { useDeleteSubmission, useSubmission, useUpsertSubmissionReview } from '../../hooks/useSubmission'

const statusOptions = ['new', 'in_review', 'contact_pending', 'contacted', 'qualified', 'closed']
const followUpOptions = ['not_started', 'scheduled', 'contacted', 'waiting_response', 'closed']

const labelCls = 'text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]'
const inputCls =
  'w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-[0.82rem] text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)]'

function prettyDate(value) {
  if (!value) return '--'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '--'
  return date.toLocaleString()
}

function FieldGroup({ title, children }) {
  return (
    <div>
      <p className={`${labelCls} mb-3`}>{title}</p>
      <div className="grid gap-3">{children}</div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <dt className={labelCls}>{label}</dt>
      <dd className="mt-1 text-[0.82rem] text-[var(--text-primary)]">{children || <span className="text-[var(--text-muted)]">—</span>}</dd>
    </div>
  )
}

function Prose({ label, text }) {
  return (
    <div>
      <p className={labelCls}>{label}</p>
      <p className="mt-1.5 text-[0.82rem] leading-relaxed text-[var(--text-secondary)]">
        {text || <span className="text-[var(--text-muted)]">—</span>}
      </p>
    </div>
  )
}

export default function SubmissionDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const submissionQuery = useSubmission(id)
  const upsertReview = useUpsertSubmissionReview(id)
  const deleteSubmission = useDeleteSubmission(id)

  const submission = submissionQuery.data?.submission
  const review = submissionQuery.data?.review
  const tags = submissionQuery.data?.tags ?? []
  const activity = submissionQuery.data?.activity ?? []

  const [draft, setDraft] = useState({})

  const merged = {
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

  const set = (key) => (e) => setDraft((prev) => ({ ...prev, [key]: e.target.value }))

  const title = useMemo(() => {
    if (!submission) return 'Submission'
    return submission.company_name
      ? `${submission.full_name} · ${submission.company_name}`
      : submission.full_name
  }, [submission])

  const saveReview = async () => {
    await upsertReview.mutateAsync({
      status: merged.status || 'new',
      priority_score: merged.priority_score === '' ? null : Number(merged.priority_score),
      pain_category: merged.pain_category || null,
      impact_type: merged.impact_type || null,
      workflow_maturity: merged.workflow_maturity || null,
      follow_up_status: merged.follow_up_status || null,
      follow_up_owner: merged.follow_up_owner || null,
      internal_notes: merged.internal_notes || null,
      last_contacted_at: merged.last_contacted_at || null,
    })
  }

  const onDeleteSubmission = async () => {
    if (!submission) return

    const isConfirmed = window.confirm(
      `Delete submission from ${submission.full_name}? This will also remove related review, tags, and activity records.`,
    )

    if (!isConfirmed) return

    await deleteSubmission.mutateAsync()
    navigate('/admin/submissions', { replace: true })
  }

  if (submissionQuery.isLoading) {
    return (
      <div className="border-glow rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-[0.82rem] text-[var(--text-secondary)]">
        Loading submission…
      </div>
    )
  }

  if (submissionQuery.isError || !submission) {
    return (
      <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-6 text-[0.82rem] text-rose-200">
        {submissionQuery.error?.message || 'Unable to load this submission.'}
      </div>
    )
  }

  return (
    <section className="grid gap-5">
      {/* Breadcrumb + header */}
      <div>
        <Link
          to="/admin/submissions"
          className="inline-flex items-center gap-1 text-[0.75rem] text-[var(--text-muted)] transition hover:text-[var(--text-secondary)]"
        >
          <ChevronLeft size={13} strokeWidth={2} />
          Submissions
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="flex-1 text-[1.2rem] font-bold tracking-[-0.02em] text-[var(--text-primary)]">{title}</h1>
          <button
            type="button"
            onClick={onDeleteSubmission}
            disabled={deleteSubmission.isPending}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-rose-500/40 px-3 text-[0.75rem] font-semibold text-rose-300 transition hover:bg-rose-500/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleteSubmission.isPending ? 'Deleting…' : 'Delete submission'}
          </button>
          <SubmissionStatusBadge status={merged.status} />
        </div>
        <p className="mt-1 text-[0.75rem] text-[var(--text-muted)]">Submitted {prettyDate(submission.created_at)}</p>
        {deleteSubmission.isError ? (
          <p className="mt-2 text-[0.75rem] text-rose-400">
            {deleteSubmission.error?.message || 'Unable to delete this submission.'}
          </p>
        ) : null}
      </div>

      {/* Main two-col grid */}
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">

        {/* Left — original submission */}
        <article className="border-glow rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className={`${labelCls} mb-4`}>Original submission</p>

          <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            <Field label="Full name">{submission.full_name}</Field>
            <Field label="Email">{submission.email}</Field>
            <Field label="Phone">{submission.phone}</Field>
            <Field label="Company">{submission.company_name}</Field>
            <Field label="Industry">{submission.industry}</Field>
            <Field label="Business size">{submission.business_size}</Field>
            <Field label="Frequency">{submission.frequency}</Field>
            <Field label="Preferred follow-up">{submission.preferred_follow_up}</Field>
          </dl>

          <div className="mt-6 grid gap-5 border-t border-[var(--border)] pt-5">
            <Prose label="Pain point" text={submission.pain_point} />
            <Prose label="Current solution" text={submission.current_solution} />
            {submission.additional_notes ? (
              <Prose label="Additional notes" text={submission.additional_notes} />
            ) : null}
          </div>
        </article>

        {/* Right — review metadata */}
        <article className="border-glow rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className={`${labelCls} mb-4`}>Review metadata</p>

          <div className="grid gap-5">
            {/* Triage */}
            <FieldGroup title="Triage">
              <label className="grid gap-1.5">
                <span className={labelCls}>Status</span>
                <select value={merged.status} onChange={set('status')} className={inputCls}>
                  {statusOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </label>

              <label className="grid gap-1.5">
                <span className={labelCls}>Priority score</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={merged.priority_score}
                  onChange={set('priority_score')}
                  className={inputCls}
                />
              </label>

              <label className="grid gap-1.5">
                <span className={labelCls}>Pain category</span>
                <input value={merged.pain_category} onChange={set('pain_category')} className={inputCls} />
              </label>

              <label className="grid gap-1.5">
                <span className={labelCls}>Impact type</span>
                <input value={merged.impact_type} onChange={set('impact_type')} className={inputCls} />
              </label>

              <label className="grid gap-1.5">
                <span className={labelCls}>Workflow maturity</span>
                <input value={merged.workflow_maturity} onChange={set('workflow_maturity')} className={inputCls} />
              </label>
            </FieldGroup>

            {/* Follow-up */}
            <div className="border-t border-[var(--border)] pt-5">
              <FieldGroup title="Follow-up">
                <label className="grid gap-1.5">
                  <span className={labelCls}>Follow-up status</span>
                  <select value={merged.follow_up_status} onChange={set('follow_up_status')} className={inputCls}>
                    <option value="">Unspecified</option>
                    {followUpOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>

                <label className="grid gap-1.5">
                  <span className={labelCls}>Follow-up owner</span>
                  <input value={merged.follow_up_owner} onChange={set('follow_up_owner')} placeholder="e.g. jane@verex.io" className={inputCls} />
                </label>

                <label className="grid gap-1.5">
                  <span className={labelCls}>Last contacted</span>
                  <input type="datetime-local" value={merged.last_contacted_at} onChange={set('last_contacted_at')} className={inputCls} />
                </label>
              </FieldGroup>
            </div>

            {/* Notes */}
            <div className="border-t border-[var(--border)] pt-5">
              <SubmissionNotesPanel
                value={merged.internal_notes}
                onChange={(value) => setDraft((prev) => ({ ...prev, internal_notes: value }))}
                saving={upsertReview.isPending}
              />
            </div>

            {/* Save */}
            <div className="flex flex-col gap-2 border-t border-[var(--border)] pt-4">
              {upsertReview.isError ? (
                <p className="text-[0.75rem] text-rose-400">{upsertReview.error?.message || 'Unable to save review.'}</p>
              ) : null}
              {upsertReview.isSuccess ? (
                <p className="text-[0.75rem] text-emerald-400">Review saved.</p>
              ) : null}
              <button
                type="button"
                onClick={saveReview}
                disabled={upsertReview.isPending}
                className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-[var(--accent)] px-4 text-[0.82rem] font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {upsertReview.isPending ? 'Saving…' : 'Save review'}
              </button>
            </div>

            {/* Tags */}
            {tags.length > 0 ? (
              <div className="border-t border-[var(--border)] pt-4">
                <p className={`${labelCls} mb-2`}>Tags</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tagRow) => (
                    <span
                      key={tagRow.id}
                      className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[0.72rem] text-[var(--text-secondary)]"
                    >
                      {tagRow.tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </article>
      </div>

      {/* Activity log */}
      {activity.length > 0 ? (
        <article className="border-glow rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className={`${labelCls} mb-4`}>Activity log</p>
          <ul className="grid gap-2">
            {activity.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5"
              >
                <p className="text-[0.82rem] text-[var(--text-secondary)]">{item.action}</p>
                <p className="shrink-0 text-[0.72rem] text-[var(--text-muted)]">{prettyDate(item.created_at)}</p>
              </li>
            ))}
          </ul>
        </article>
      ) : null}
    </section>
  )
}

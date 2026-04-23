const labelCls = 'text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]'

export default function SubmissionNotesPanel({ value, onChange, saving }) {
  return (
    <label className="grid gap-1.5">
      <span className={labelCls}>Internal Notes</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Capture context from calls, concerns, next actions, and escalations."
        rows={5}
        className="w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-[0.82rem] leading-relaxed text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)] disabled:opacity-50"
        disabled={saving}
      />
    </label>
  )
}

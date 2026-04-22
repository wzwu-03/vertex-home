export default function SubmissionNotesPanel({ value, onChange, saving }) {
  return (
    <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
      Internal Notes
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Capture context from calls, concerns, next actions, and escalations."
        className="min-h-36 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
        disabled={saving}
      />
    </label>
  )
}

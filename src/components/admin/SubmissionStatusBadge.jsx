const statusClasses = {
  new: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  in_review: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  contact_pending: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  contacted: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  qualified: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  closed: 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30',
}

function toLabel(status) {
  return (status || 'new')
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export default function SubmissionStatusBadge({ status }) {
  const normalized = status || 'new'

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusClasses[normalized] ?? statusClasses.new}`}>
      {toLabel(normalized)}
    </span>
  )
}

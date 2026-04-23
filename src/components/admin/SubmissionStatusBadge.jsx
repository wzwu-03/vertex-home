const statusConfig = {
  new:             { cls: 'bg-sky-500/12 text-sky-300 border-sky-500/25',     dot: '#7dd3fc' },
  in_review:       { cls: 'bg-amber-500/12 text-amber-300 border-amber-500/25',   dot: '#fcd34d' },
  contact_pending: { cls: 'bg-purple-500/12 text-purple-300 border-purple-500/25', dot: '#d8b4fe' },
  contacted:       { cls: 'bg-indigo-500/12 text-indigo-300 border-indigo-500/25', dot: '#a5b4fc' },
  qualified:       { cls: 'bg-emerald-500/12 text-emerald-300 border-emerald-500/25', dot: '#6ee7b7' },
  closed:          { cls: 'bg-zinc-500/12 text-zinc-400 border-zinc-500/25',    dot: '#a1a1aa' },
}

function toLabel(status) {
  return (status || 'new')
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export default function SubmissionStatusBadge({ status }) {
  const normalized = status || 'new'
  const config = statusConfig[normalized] ?? statusConfig.new

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.7rem] font-medium ${config.cls}`}>
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: config.dot }}
        aria-hidden="true"
      />
      {toLabel(normalized)}
    </span>
  )
}

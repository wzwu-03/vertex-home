import { Bell, Shield, Users } from 'lucide-react'

const items = [
  {
    icon: Users,
    title: 'Team management',
    description: 'Invite team members, assign roles, and manage access levels for the admin dashboard.',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Configure email alerts for new submissions, status changes, and priority thresholds.',
  },
  {
    icon: Shield,
    title: 'Security & audit',
    description: 'Review login activity, API key rotation, and manage two-factor authentication.',
  },
]

export default function SettingsPage() {
  return (
    <section>
      <header className="mb-6">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Admin</p>
        <h1 className="mt-1 text-[1.4rem] font-bold tracking-[-0.02em] text-[var(--text-primary)]">Settings</h1>
        <p className="mt-1 text-[0.82rem] text-[var(--text-secondary)]">
          Team, notification, and workflow controls — available in the next iteration.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((item) => {
          const ItemIcon = item.icon

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 opacity-50"
            >
              <div className="mb-3 inline-flex rounded-lg bg-[var(--surface-2)] p-2">
                <ItemIcon size={14} strokeWidth={1.8} style={{ color: 'var(--text-muted)' }} />
              </div>
              <h3 className="text-[0.82rem] font-semibold text-[var(--text-primary)]">{item.title}</h3>
              <p className="mt-1.5 text-[0.75rem] leading-relaxed text-[var(--text-muted)]">{item.description}</p>
            </div>
          )
        })}
      </div>

      <p className="mt-6 text-center text-[0.72rem] text-[var(--text-muted)]">
        These features are planned for a future release.
      </p>
    </section>
  )
}

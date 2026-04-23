import { BarChart3, FileText, LayoutDashboard, LogOut, Settings } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
  { to: '/admin',             label: 'Overview',    icon: LayoutDashboard, end: true },
  { to: '/admin/submissions', label: 'Submissions', icon: FileText },
  { to: '/admin/analytics',   label: 'Analytics',   icon: BarChart3 },
  { to: '/admin/settings',    label: 'Settings',    icon: Settings },
]

function navClass({ isActive }) {
  return [
    'flex items-center gap-2.5 rounded-xl px-3 py-2 text-[0.82rem] font-medium transition-all duration-150',
    isActive
      ? 'bg-[var(--accent-subtle)] text-[var(--text-primary)]'
      : 'text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]',
  ].join(' ')
}

export default function AdminLayout() {
  const { user, signOut } = useAuth()
  const initials = user?.email?.charAt(0)?.toUpperCase() ?? '?'

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="mx-auto grid max-w-[1280px] gap-5 px-4 py-5 md:grid-cols-[220px_minmax(0,1fr)] md:px-6">

        {/* ── Sidebar ─────────────────────────────────────────── */}
        <aside className="border-glow flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 md:sticky md:top-5 md:max-h-[calc(100vh-2.5rem)]">

          {/* Brand */}
          <div className="mb-5 flex items-center gap-2 px-1">
            <span className="text-[0.875rem] font-bold tracking-[0.08em] text-[var(--text-primary)]">VEREX</span>
            <span
              className="rounded-md px-1.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.18em]"
              style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}
            >
              Admin
            </span>
          </div>

          {/* Nav */}
          <nav className="grid flex-1 content-start gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
                  <Icon size={15} strokeWidth={1.8} />
                  {item.label}
                </NavLink>
              )
            })}
          </nav>

          {/* User section */}
          <div className="mt-auto border-t border-[var(--border)] pt-4">
            <div className="mb-3 flex items-center gap-2.5">
              <div
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.65rem] font-bold"
                style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}
                aria-hidden="true"
              >
                {initials}
              </div>
              <p className="min-w-0 flex-1 truncate text-[0.72rem] text-[var(--text-muted)]">{user?.email}</p>
            </div>
            <button
              type="button"
              onClick={() => signOut()}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[0.75rem] font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text-secondary)]"
            >
              <LogOut size={13} strokeWidth={1.8} />
              Sign out
            </button>
          </div>
        </aside>

        {/* ── Main ────────────────────────────────────────────── */}
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

import { BarChart3, FileText, Home, LogOut, Settings } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
  { to: '/admin', label: 'Overview', icon: Home, end: true },
  { to: '/admin/submissions', label: 'Submissions', icon: FileText },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

function navClass({ isActive }) {
  return `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-[var(--accent-subtle)] text-[var(--text-primary)]'
      : 'text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]'
  }`
}

export default function AdminLayout() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="mx-auto grid max-w-[1240px] gap-6 px-4 py-6 md:grid-cols-[240px_minmax(0,1fr)] md:px-6">
        <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 md:sticky md:top-6 md:h-fit">
          <p className="mb-5 text-sm font-bold tracking-[0.12em] text-[var(--text-primary)]">VEREX ADMIN</p>

          <nav className="grid gap-1">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
                  <Icon size={16} />
                  {item.label}
                </NavLink>
              )
            })}
          </nav>

          <div className="mt-6 border-t border-[var(--border)] pt-4">
            <p className="truncate text-xs text-[var(--text-muted)]">{user?.email}</p>
            <button
              type="button"
              onClick={() => signOut()}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

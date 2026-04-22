import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedAdminRoute() {
  const { user, loadingAuth } = useAuth()

  if (loadingAuth) {
    return <div className="grid min-h-screen place-items-center bg-[var(--bg)] text-sm text-[var(--text-secondary)]">Checking admin session...</div>
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}

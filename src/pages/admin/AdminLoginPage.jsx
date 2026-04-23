import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const inputCls =
  'w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5 text-[0.85rem] text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)]'
const labelCls = 'grid gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]'

export default function AdminLoginPage() {
  const { user, signIn, isSupabaseConfigured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (user) return <Navigate to="/admin" replace />

  const from = location.state?.from?.pathname || '/admin'

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    const { error } = await signIn({ email, password })
    if (error) {
      setErrorMessage(error.message)
      setIsSubmitting(false)
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="grid min-h-screen place-items-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-sm">
        {/* Brand mark */}
        <div className="mb-8 flex items-center gap-2">
          <span className="text-[0.95rem] font-bold tracking-[0.1em] text-[var(--text-primary)]">VEREX</span>
          <span
            className="rounded-md px-1.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.18em]"
            style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}
          >
            Admin
          </span>
        </div>

        <div className="border-glow rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7">
          <h1 className="text-[1.2rem] font-bold tracking-[-0.02em] text-[var(--text-primary)]">Sign in</h1>
          <p className="mt-1.5 text-[0.78rem] text-[var(--text-muted)]">
            Use a Supabase Auth account authorized for internal review.
          </p>

          {!isSupabaseConfigured ? (
            <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2.5 text-[0.78rem] text-amber-200">
              Missing Supabase env vars — set <code className="font-mono">VITE_SUPABASE_URL</code> and{' '}
              <code className="font-mono">VITE_SUPABASE_ANON_KEY</code>.
            </div>
          ) : null}

          <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
            <label className={labelCls}>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className={inputCls}
              />
            </label>

            <label className={labelCls}>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className={inputCls}
              />
            </label>

            {errorMessage ? (
              <p className="rounded-lg bg-rose-500/10 px-3 py-2 text-[0.78rem] text-rose-400">{errorMessage}</p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting || !isSupabaseConfigured}
              className="mt-1 inline-flex h-11 items-center justify-center rounded-xl bg-[var(--accent)] px-5 text-[0.85rem] font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

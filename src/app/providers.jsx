import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from './auth-context'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
})

export function AppProviders({ children }) {
  const [session, setSession] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return
    }

    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session ?? null)
        setLoadingAuth(false)
      }
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null)
      setLoadingAuth(false)
    })

    return () => {
      mounted = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  const authValue = useMemo(() => {
    const user = session?.user ?? null

    return {
      session,
      user,
      loadingAuth,
      isSupabaseConfigured,
      async signIn({ email, password }) {
        if (!supabase) {
          return { error: new Error('Supabase is not configured.') }
        }
        return supabase.auth.signInWithPassword({ email, password })
      },
      async signOut() {
        if (!supabase) return { error: null }
        return supabase.auth.signOut()
      },
    }
  }, [loadingAuth, session])

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
    </QueryClientProvider>
  )
}

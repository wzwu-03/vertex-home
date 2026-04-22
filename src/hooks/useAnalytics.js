import { useQuery } from '@tanstack/react-query'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

function toMonth(isoDate) {
  const d = new Date(isoDate)
  if (Number.isNaN(d.getTime())) return 'Unknown'
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
}

function groupCount(items, fallback = 'Unknown') {
  const map = new Map()

  for (const item of items) {
    const key = item || fallback
    map.set(key, (map.get(key) ?? 0) + 1)
  }

  return Array.from(map.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
}

function orderMonthSeries(series) {
  return [...series].sort((a, b) => new Date(a.label) - new Date(b.label))
}

async function fetchAnalytics() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
  }

  const { data: submissions, error } = await supabase
    .from('submissions')
    .select('id, created_at, industry, business_size, frequency, preferred_follow_up')

  if (error) {
    throw error
  }

  const ids = (submissions ?? []).map((row) => row.id)

  let painCategories = []
  if (ids.length > 0) {
    const reviewRes = await supabase.from('submission_reviews').select('submission_id, pain_category').in('submission_id', ids)
    if (!reviewRes.error) {
      painCategories = (reviewRes.data ?? []).map((row) => row.pain_category)
    }
  }

  const total = submissions?.length ?? 0

  const monthly = orderMonthSeries(groupCount((submissions ?? []).map((row) => toMonth(row.created_at))))

  return {
    total,
    monthly,
    byIndustry: groupCount((submissions ?? []).map((row) => row.industry)),
    byBusinessSize: groupCount((submissions ?? []).map((row) => row.business_size)),
    byFrequency: groupCount((submissions ?? []).map((row) => row.frequency)),
    byFollowUp: groupCount((submissions ?? []).map((row) => row.preferred_follow_up)),
    byPainCategory: groupCount(painCategories).filter((item) => item.label !== 'Unknown'),
  }
}

export function useAnalytics() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics,
  })
}

import { useQuery } from '@tanstack/react-query'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

function normalizeSubmission(submission) {
  const review = Array.isArray(submission.submission_reviews)
    ? submission.submission_reviews[0] ?? null
    : submission.submission_reviews ?? null

  const tags = Array.isArray(submission.submission_tags)
    ? submission.submission_tags.map((item) => item.tag).filter(Boolean)
    : []

  return {
    ...submission,
    review,
    tags,
  }
}

async function fetchSubmissions() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
  }

  const joinedQuery = await supabase
    .from('submissions')
    .select(
      `
      id,
      created_at,
      full_name,
      email,
      phone,
      company_name,
      industry,
      role,
      customer_type,
      business_size,
      pain_point,
      current_solution,
      frequency,
      preferred_follow_up,
      location,
      additional_notes,
      consent,
      source,
      submission_reviews(status, priority_score, pain_category, follow_up_status, updated_at),
      submission_tags(tag)
    `,
    )
    .order('created_at', { ascending: false })

  if (!joinedQuery.error) {
    return (joinedQuery.data ?? []).map(normalizeSubmission)
  }

  const base = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (base.error) {
    throw base.error
  }

  const ids = (base.data ?? []).map((row) => row.id)

  const [reviews, tags] = await Promise.all([
    ids.length
      ? supabase
          .from('submission_reviews')
          .select('submission_id, status, priority_score, pain_category, follow_up_status, updated_at')
          .in('submission_id', ids)
      : Promise.resolve({ data: [], error: null }),
    ids.length
      ? supabase.from('submission_tags').select('submission_id, tag').in('submission_id', ids)
      : Promise.resolve({ data: [], error: null }),
  ])

  if (reviews.error && reviews.error.code !== '42P01') {
    throw reviews.error
  }
  if (tags.error && tags.error.code !== '42P01') {
    throw tags.error
  }

  const reviewsById = new Map((reviews.data ?? []).map((row) => [row.submission_id, row]))
  const tagsById = new Map()

  for (const row of tags.data ?? []) {
    const next = tagsById.get(row.submission_id) ?? []
    next.push(row.tag)
    tagsById.set(row.submission_id, next)
  }

  return (base.data ?? []).map((row) => ({
    ...row,
    review: reviewsById.get(row.id) ?? null,
    tags: tagsById.get(row.id) ?? [],
  }))
}

export function useSubmissions() {
  return useQuery({
    queryKey: ['submissions'],
    queryFn: fetchSubmissions,
  })
}

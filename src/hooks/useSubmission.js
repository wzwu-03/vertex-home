import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

async function fetchSubmissionById(id) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
  }

  const { data: submission, error: submissionError } = await supabase
    .from('submissions')
    .select('*')
    .eq('id', id)
    .single()

  if (submissionError) {
    throw submissionError
  }

  const [reviewRes, tagsRes, activityRes] = await Promise.all([
    supabase.from('submission_reviews').select('*').eq('submission_id', id).maybeSingle(),
    supabase.from('submission_tags').select('*').eq('submission_id', id),
    supabase.from('activity_log').select('*').eq('submission_id', id).order('created_at', { ascending: false }),
  ])

  if (reviewRes.error && reviewRes.error.code !== '42P01') {
    throw reviewRes.error
  }
  if (tagsRes.error && tagsRes.error.code !== '42P01') {
    throw tagsRes.error
  }
  if (activityRes.error && activityRes.error.code !== '42P01') {
    throw activityRes.error
  }

  return {
    submission,
    review: reviewRes.data ?? null,
    tags: tagsRes.data ?? [],
    activity: activityRes.data ?? [],
  }
}

export function useSubmission(id) {
  return useQuery({
    queryKey: ['submission', id],
    queryFn: () => fetchSubmissionById(id),
    enabled: Boolean(id),
  })
}

export function useUpsertSubmissionReview(id) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (reviewInput) => {
      if (!supabase) {
        throw new Error('Supabase is not configured.')
      }

      const payload = {
        submission_id: id,
        ...reviewInput,
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from('submission_reviews')
        .upsert(payload, { onConflict: 'submission_id' })
        .select('*')
        .single()

      if (error) {
        throw error
      }

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submission', id] })
      queryClient.invalidateQueries({ queryKey: ['submissions'] })
      queryClient.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}

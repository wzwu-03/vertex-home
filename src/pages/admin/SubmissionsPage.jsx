import { useMemo, useState } from 'react'
import SubmissionFilters from '../../components/admin/SubmissionFilters'
import SubmissionTable from '../../components/admin/SubmissionTable'
import { useSubmissions } from '../../hooks/useSubmissions'

const EMPTY_ROWS = []

function matchesSearch(row, search) {
  if (!search) return true
  const needle = search.toLowerCase()
  return [row.full_name, row.email, row.company_name, row.pain_point].some((value) => (value || '').toLowerCase().includes(needle))
}

function sortRows(rows, sort) {
  const copy = [...rows]

  if (sort === 'oldest') {
    return copy.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
  }

  if (sort === 'name') {
    return copy.sort((a, b) => (a.full_name || '').localeCompare(b.full_name || ''))
  }

  if (sort === 'priority') {
    return copy.sort((a, b) => Number(b.review?.priority_score || -1) - Number(a.review?.priority_score || -1))
  }

  return copy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
}

export default function SubmissionsPage() {
  const submissionsQuery = useSubmissions()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [industry, setIndustry] = useState('all')
  const [sort, setSort] = useState('newest')

  const rows = submissionsQuery.data ?? EMPTY_ROWS

  const statusOptions = useMemo(() => {
    return Array.from(new Set(rows.map((row) => row.review?.status || 'new')))
  }, [rows])

  const industryOptions = useMemo(() => {
    return Array.from(new Set(rows.map((row) => row.industry).filter(Boolean))).sort((a, b) => a.localeCompare(b))
  }, [rows])

  const filteredRows = useMemo(() => {
    const filtered = rows.filter((row) => {
      const statusValue = row.review?.status || 'new'
      const matchesStatus = status === 'all' || statusValue === status
      const matchesIndustry = industry === 'all' || row.industry === industry
      return matchesStatus && matchesIndustry && matchesSearch(row, search)
    })

    return sortRows(filtered, sort)
  }, [industry, rows, search, sort, status])

  return (
    <section>
      <header className="mb-5">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Submissions</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Search, filter, and prioritize incoming intake submissions.</p>
      </header>

      {submissionsQuery.isError ? (
        <div className="mb-4 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">{submissionsQuery.error?.message || 'Unable to load submissions.'}</div>
      ) : null}

      <div className="grid gap-4">
        <SubmissionFilters
          search={search}
          status={status}
          industry={industry}
          sort={sort}
          statusOptions={statusOptions}
          industryOptions={industryOptions}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onIndustryChange={setIndustry}
          onSortChange={setSort}
        />

        <SubmissionTable rows={filteredRows} loading={submissionsQuery.isLoading} />
      </div>
    </section>
  )
}

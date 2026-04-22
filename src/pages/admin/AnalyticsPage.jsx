import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import AnalyticsChartCard from '../../components/admin/AnalyticsChartCard'
import { useAnalytics } from '../../hooks/useAnalytics'

const palette = ['#48a6ff', '#00c7b8', '#f4b740', '#d971ff', '#5de079', '#ff7a7a', '#99a5b5']

function colorFor(index) {
  return palette[index % palette.length]
}

export default function AnalyticsPage() {
  const analyticsQuery = useAnalytics()
  const data = analyticsQuery.data

  return (
    <section>
      <header className="mb-5">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Analytics</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Trend and distribution views for intake analysis.</p>
      </header>

      {analyticsQuery.isError ? (
        <div className="mb-4 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">{analyticsQuery.error?.message || 'Unable to load analytics.'}</div>
      ) : null}

      {analyticsQuery.isLoading ? <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-secondary)]">Loading analytics...</div> : null}

      {!analyticsQuery.isLoading && data ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <AnalyticsChartCard title="Submissions over time" subtitle={`Total submissions: ${data.total}`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthly}>
                <CartesianGrid stroke="#2c3642" strokeDasharray="3 3" />
                <XAxis dataKey="label" stroke="#8c9aaa" />
                <YAxis stroke="#8c9aaa" allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#48a6ff" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </AnalyticsChartCard>

          <AnalyticsChartCard title="By industry" subtitle="Top segments by count">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.byIndustry} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid stroke="#2c3642" strokeDasharray="3 3" />
                <XAxis type="number" stroke="#8c9aaa" allowDecimals={false} />
                <YAxis type="category" dataKey="label" width={120} stroke="#8c9aaa" />
                <Tooltip />
                <Bar dataKey="value" fill="#00c7b8" radius={6} />
              </BarChart>
            </ResponsiveContainer>
          </AnalyticsChartCard>

          <AnalyticsChartCard title="By business size">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.byBusinessSize} dataKey="value" nameKey="label" outerRadius={95} innerRadius={45}>
                  {data.byBusinessSize.map((entry, index) => (
                    <Cell key={entry.label} fill={colorFor(index)} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </AnalyticsChartCard>

          <AnalyticsChartCard title="By issue frequency">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.byFrequency}>
                <CartesianGrid stroke="#2c3642" strokeDasharray="3 3" />
                <XAxis dataKey="label" stroke="#8c9aaa" />
                <YAxis stroke="#8c9aaa" allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#f4b740" radius={6} />
              </BarChart>
            </ResponsiveContainer>
          </AnalyticsChartCard>

          <AnalyticsChartCard title="By follow-up preference">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.byFollowUp}>
                <CartesianGrid stroke="#2c3642" strokeDasharray="3 3" />
                <XAxis dataKey="label" stroke="#8c9aaa" />
                <YAxis stroke="#8c9aaa" allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#d971ff" radius={6} />
              </BarChart>
            </ResponsiveContainer>
          </AnalyticsChartCard>

          <AnalyticsChartCard title="By pain category" subtitle="From submission reviews">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.byPainCategory} dataKey="value" nameKey="label" outerRadius={95} innerRadius={45}>
                  {data.byPainCategory.map((entry, index) => (
                    <Cell key={entry.label} fill={colorFor(index)} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </AnalyticsChartCard>
        </div>
      ) : null}
    </section>
  )
}

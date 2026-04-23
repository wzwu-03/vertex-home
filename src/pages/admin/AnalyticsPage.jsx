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

// Aligned with the OKLCH design system palette
const palette = ['#48a6ff', '#2ecdc0', '#f4b740', '#b17dff', '#5de079', '#ff8080', '#8da3b8']

// Recharts SVG colors — approximate CSS variable values as hex
const GRID = '#1e2c3a'         // --border oklch(18% 0.016 222)
const AXIS = '#5e7080'         // --text-muted oklch(40% 0.018 222)
const TOOLTIP_BG = '#0f1c26'   // --surface oklch(8.5% 0.014 222)

function colorFor(index) {
  return palette[index % palette.length]
}

const tooltipStyle = {
  backgroundColor: TOOLTIP_BG,
  border: `1px solid ${GRID}`,
  borderRadius: '10px',
  fontSize: '0.78rem',
  color: '#cbd5e1',
}

const axisProps = {
  tick: { fill: AXIS, fontSize: 11 },
  axisLine: { stroke: GRID },
  tickLine: { stroke: GRID },
}

export default function AnalyticsPage() {
  const analyticsQuery = useAnalytics()
  const data = analyticsQuery.data

  return (
    <section>
      <header className="mb-6">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Admin</p>
        <h1 className="mt-1 text-[1.4rem] font-bold tracking-[-0.02em] text-[var(--text-primary)]">Analytics</h1>
        <p className="mt-1 text-[0.82rem] text-[var(--text-secondary)]">Trend and distribution views for intake analysis.</p>
      </header>

      {analyticsQuery.isError ? (
        <div className="mb-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-[0.82rem] text-rose-200">
          {analyticsQuery.error?.message || 'Unable to load analytics.'}
        </div>
      ) : null}

      {analyticsQuery.isLoading ? (
        <div className="border-glow rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-[0.82rem] text-[var(--text-secondary)]">
          Loading analytics…
        </div>
      ) : null}

      {!analyticsQuery.isLoading && data ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <AnalyticsChartCard title="Submissions over time" subtitle={`${data.total} total submissions`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthly}>
                <CartesianGrid stroke={GRID} strokeDasharray="3 3" />
                <XAxis dataKey="label" {...axisProps} />
                <YAxis {...axisProps} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="value" stroke="#48a6ff" strokeWidth={2} dot={{ r: 3, fill: '#48a6ff' }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </AnalyticsChartCard>

          <AnalyticsChartCard title="By industry" subtitle="Top segments by count">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.byIndustry} layout="vertical" margin={{ left: 16 }}>
                <CartesianGrid stroke={GRID} strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" {...axisProps} allowDecimals={false} />
                <YAxis type="category" dataKey="label" width={120} {...axisProps} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill="#2ecdc0" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </AnalyticsChartCard>

          <AnalyticsChartCard title="By business size">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.byBusinessSize} dataKey="value" nameKey="label" outerRadius={95} innerRadius={50}>
                  {data.byBusinessSize.map((entry, index) => (
                    <Cell key={entry.label} fill={colorFor(index)} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '0.72rem', color: AXIS }} />
              </PieChart>
            </ResponsiveContainer>
          </AnalyticsChartCard>

          <AnalyticsChartCard title="By issue frequency">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.byFrequency}>
                <CartesianGrid stroke={GRID} strokeDasharray="3 3" />
                <XAxis dataKey="label" {...axisProps} />
                <YAxis {...axisProps} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill="#f4b740" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </AnalyticsChartCard>

          <AnalyticsChartCard title="By follow-up preference">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.byFollowUp}>
                <CartesianGrid stroke={GRID} strokeDasharray="3 3" />
                <XAxis dataKey="label" {...axisProps} />
                <YAxis {...axisProps} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill="#b17dff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </AnalyticsChartCard>

          <AnalyticsChartCard title="By pain category" subtitle="From submission reviews">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.byPainCategory} dataKey="value" nameKey="label" outerRadius={95} innerRadius={50}>
                  {data.byPainCategory.map((entry, index) => (
                    <Cell key={entry.label} fill={colorFor(index)} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '0.72rem', color: AXIS }} />
              </PieChart>
            </ResponsiveContainer>
          </AnalyticsChartCard>
        </div>
      ) : null}
    </section>
  )
}

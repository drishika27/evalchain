import React, { useEffect, useState } from 'react'
import { Users, Building2, Layers, Activity } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts'
import DashboardLayout from '../components/DashboardLayout.jsx'
import StatCard from '../components/StatCard.jsx'
import { Card, CardHeader } from '../components/Card.jsx'
import ChartCard from '../components/ChartCard.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getAdminStats, getInstitutions, getGradeDistribution, getStatusBreakdown } from '../services/mockApi.js'

const PIE_COLORS = ['#2F6F5E', '#C9A227', '#B4433A', '#6B7484']

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [institutions, setInstitutions] = useState([])
  const [grades, setGrades] = useState([])
  const [breakdown, setBreakdown] = useState([])

  useEffect(() => {
    Promise.all([getAdminStats(), getInstitutions(), getGradeDistribution(), getStatusBreakdown()]).then(
      ([s, i, g, b] ) => { setStats(s); setInstitutions(i); setGrades(g); setBreakdown(b) }
    )
  }, [])

  return (
    <DashboardLayout role="administrator" title="System overview" subtitle={`Signed in as ${user?.name} · ${user?.institution}`}>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total users" value={stats?.totalUsers ?? 0} icon={Users} accent="ink" />
        <StatCard label="Institutions onboarded" value={stats?.institutionsOnboarded ?? 0} icon={Building2} accent="seal" />
        <StatCard label="Records on-chain" value={stats?.recordsOnChain ?? 0} icon={Layers} accent="gold" />
        <StatCard label="System uptime" value={stats?.systemUptime ?? 0} suffix="%" decimals={2} icon={Activity} accent="seal" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Grade distribution" subtitle="Across all institutions, this term">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={grades} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-ink-100 dark:text-ink-700" />
              <XAxis dataKey="grade" tick={{ fontSize: 12 }} stroke="currentColor" className="text-ink-400" />
              <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="text-ink-400" />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E7EAF0', fontSize: 13 }} />
              <Bar dataKey="count" fill="#2F6F5E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Record status breakdown" subtitle="Registry-wide">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={breakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                {breakdown.map((entry, index) => (
                  <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E7EAF0', fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <Card className="mt-6">
        <CardHeader title="Institutions" subtitle="Onboarded organizations issuing results on VeriChain." />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400 dark:border-ink-600 dark:text-ink-200">
                <th className="px-5 py-3 font-medium">Institution</th>
                <th className="px-5 py-3 font-medium">Records</th>
                <th className="px-5 py-3 font-medium">Onboarded</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {institutions.map((inst) => (
                <tr key={inst.id} className="border-b border-ink-50 last:border-0 dark:border-ink-700">
                  <td className="px-5 py-3.5 font-medium text-ink-900 dark:text-white">{inst.name}</td>
                  <td className="px-5 py-3.5 text-ink-600 dark:text-ink-100">{inst.records.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-ink-400 dark:text-ink-200">{inst.onboarded}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={inst.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  )
}

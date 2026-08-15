import React, { useEffect, useState } from 'react'
import { FileCheck2, Clock, AlertTriangle, Timer } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import DashboardLayout from '../components/DashboardLayout.jsx'
import StatCard from '../components/StatCard.jsx'
import { Card, CardHeader } from '../components/Card.jsx'
import ChartCard from '../components/ChartCard.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getExaminerStats, getPendingSubmissions, getVerificationTrend } from '../services/mockApi.js'

export default function ExaminerDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [queue, setQueue] = useState([])
  const [trend, setTrend] = useState([])

  useEffect(() => {
    Promise.all([getExaminerStats(user?.id), getPendingSubmissions(), getVerificationTrend()]).then(
      ([s, q, t]) => { setStats(s); setQueue(q); setTrend(t) }
    )
  }, [user])

  return (
    <DashboardLayout role="examiner" title={`Examiner console`} subtitle={`Signed in as ${user?.name} · ${user?.institution}`}>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Results issued" value={stats?.resultsIssued ?? 0} icon={FileCheck2} accent="seal" />
        <StatCard label="Pending review" value={stats?.pendingReview ?? 0} icon={Clock} accent="gold" />
        <StatCard label="Open disputes" value={stats?.disputesOpen ?? 0} icon={AlertTriangle} accent="ink" />
        <StatCard label="Avg. issue time" value={stats?.avgIssueTimeHours ?? 0} suffix="h" decimals={1} icon={Timer} accent="seal" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title="Submission queue" subtitle="Results awaiting institutional confirmation before being sealed." />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400 dark:border-ink-600 dark:text-ink-200">
                    <th className="px-5 py-3 font-medium">Student</th>
                    <th className="px-5 py-3 font-medium">Course</th>
                    <th className="px-5 py-3 font-medium">Submitted</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium sr-only">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map((item) => (
                    <tr key={item.id} className="border-b border-ink-50 last:border-0 dark:border-ink-700">
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-ink-900 dark:text-white">{item.student}</p>
                        <p className="text-xs text-ink-400 dark:text-ink-200">{item.studentId}</p>
                      </td>
                      <td className="px-5 py-3.5 text-ink-600 dark:text-ink-100">{item.course}</td>
                      <td className="px-5 py-3.5 text-ink-400 dark:text-ink-200">{item.submittedOn}</td>
                      <td className="px-5 py-3.5"><StatusBadge status={item.status} pulse={item.status === 'pending'} /></td>
                      <td className="px-5 py-3.5 text-right"><Button variant="outline" size="sm">Review</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <ChartCard title="Verification volume" subtitle="Last 6 months" height={260}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-ink-100 dark:text-ink-700" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="currentColor" className="text-ink-400" />
              <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="text-ink-400" />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E7EAF0', fontSize: 13 }} />
              <Line type="monotone" dataKey="verifications" stroke="#2F6F5E" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </DashboardLayout>
  )
}

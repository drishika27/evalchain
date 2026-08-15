import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileCheck2, Clock, Share2, Layers } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout.jsx'
import StatCard from '../components/StatCard.jsx'
import { Card, CardHeader } from '../components/Card.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getStudentStats, getResultsForStudent } from '../services/mockApi.js'

export default function StudentDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getStudentStats(user?.id), getResultsForStudent(user?.id)]).then(([s, r]) => {
      setStats(s)
      setResults(r)
      setLoading(false)
    })
  }, [user])

  return (
    <DashboardLayout
      role="student"
      title={`Welcome back, ${user?.name?.split(' ')[0] ?? 'Student'}`}
      subtitle="Here's the current status of your academic records."
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total results" value={stats?.totalResults ?? 0} icon={Layers} accent="ink" />
        <StatCard label="Verified" value={stats?.verifiedResults ?? 0} icon={FileCheck2} accent="seal" />
        <StatCard label="Pending" value={stats?.pendingResults ?? 0} icon={Clock} accent="gold" />
        <StatCard label="Shared certificates" value={stats?.sharedCertificates ?? 0} icon={Share2} accent="seal" />
      </div>

      <Card className="mt-6">
        <CardHeader title="Your results" subtitle="Verified results are permanently sealed on-chain." />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400 dark:border-ink-600 dark:text-ink-200">
                <th className="px-5 py-3 font-medium">Course</th>
                <th className="px-5 py-3 font-medium">Grade</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Issued</th>
                <th className="px-5 py-3 font-medium sr-only">View</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={5} className="px-5 py-6 text-center text-ink-400 dark:text-ink-200">Loading results…</td></tr>
              )}
              {!loading && results.map((r) => (
                <tr key={r.id} className="border-b border-ink-50 last:border-0 dark:border-ink-700">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-ink-900 dark:text-white">{r.course}</p>
                    <p className="text-xs text-ink-400 dark:text-ink-200">{r.semester}</p>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-ink-900 dark:text-white">{r.grade}{r.score ? ` · ${r.score}%` : ''}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={r.status} /></td>
                  <td className="px-5 py-3.5 text-ink-400 dark:text-ink-200">{r.issuedOn ?? '—'}</td>
                  <td className="px-5 py-3.5 text-right">
                    <Link to={`/certificate/${r.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  )
}

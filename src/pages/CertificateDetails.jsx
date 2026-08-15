import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, Share2, Copy } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Card, CardHeader } from '../components/Card.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import TransactionTimeline from '../components/TransactionTimeline.jsx'
import Button from '../components/Button.jsx'
import { getResultById, getTransactionTimeline } from '../services/mockApi.js'

export default function CertificateDetails() {
  const { id } = useParams()
  const [record, setRecord] = useState(null)
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    Promise.all([getResultById(id), getTransactionTimeline(id)]).then(([r, t]) => {
      setRecord(r)
      setTimeline(t)
    })
  }, [id])

  return (
    <div className="flex min-h-screen flex-col bg-ink-50 dark:bg-ink-900">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-400 hover:text-ink-900 dark:text-ink-200 dark:hover:text-white">
            <ArrowLeft size={15} aria-hidden="true" /> Back
          </Link>

          {record && (
            <div className="mt-4 grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader
                    title={record.course}
                    subtitle={`${record.semester} · ${record.id}`}
                    action={<StatusBadge status={record.status} />}
                  />
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 p-5 text-sm sm:grid-cols-3">
                    <div><p className="text-ink-400 dark:text-ink-200">Student</p><p className="mt-0.5 font-medium text-ink-900 dark:text-white">{record.studentName}</p></div>
                    <div><p className="text-ink-400 dark:text-ink-200">Student ID</p><p className="mt-0.5 font-medium text-ink-900 dark:text-white">{record.studentId}</p></div>
                    <div><p className="text-ink-400 dark:text-ink-200">Grade</p><p className="mt-0.5 font-medium text-ink-900 dark:text-white">{record.grade} · {record.score}%</p></div>
                    <div><p className="text-ink-400 dark:text-ink-200">Institution</p><p className="mt-0.5 font-medium text-ink-900 dark:text-white">{record.institution}</p></div>
                    <div><p className="text-ink-400 dark:text-ink-200">Examiner</p><p className="mt-0.5 font-medium text-ink-900 dark:text-white">{record.examiner}</p></div>
                    <div><p className="text-ink-400 dark:text-ink-200">Issued on</p><p className="mt-0.5 font-medium text-ink-900 dark:text-white">{record.issuedOn}</p></div>
                  </div>
                  <div className="flex flex-wrap gap-3 border-t border-ink-100 p-5 dark:border-ink-600">
                    <Button icon={Download} variant="secondary" size="sm">Download PDF</Button>
                    <Button icon={Share2} variant="outline" size="sm">Share verification link</Button>
                  </div>
                </Card>

                <Card className="mt-6">
                  <CardHeader title="Blockchain transaction timeline" subtitle="Every step this record passed through before being sealed." />
                  <div className="p-5">
                    <TransactionTimeline entries={timeline} />
                  </div>
                </Card>
              </div>

              <div>
                <Card className="p-5">
                  <h3 className="font-display text-sm font-semibold text-ink-900 dark:text-white">On-chain reference</h3>
                  <dl className="mt-3 space-y-3 text-xs">
                    <div>
                      <dt className="text-ink-400 dark:text-ink-200">Transaction hash</dt>
                      <dd className="mt-1 flex items-center justify-between gap-2 rounded-lg bg-ink-50 px-2.5 py-2 font-mono text-seal-700 dark:bg-ink-700 dark:text-seal-300">
                        <span className="truncate">{record.txHash}</span>
                        <Copy size={12} className="flex-none" aria-hidden="true" />
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink-400 dark:text-ink-200">Block number</dt>
                      <dd className="mt-1 font-mono text-ink-900 dark:text-white">{record.blockNumber}</dd>
                    </div>
                    <div>
                      <dt className="text-ink-400 dark:text-ink-200">Contract address</dt>
                      <dd className="mt-1 font-mono text-ink-900 dark:text-white">{record.contractAddress}</dd>
                    </div>
                    <div>
                      <dt className="text-ink-400 dark:text-ink-200">IPFS hash</dt>
                      <dd className="mt-1 break-all font-mono text-ink-900 dark:text-white">{record.ipfsHash}</dd>
                    </div>
                  </dl>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

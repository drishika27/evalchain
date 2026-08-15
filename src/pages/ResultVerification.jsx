import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, QrCode, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Button from '../components/Button.jsx'
import { Card } from '../components/Card.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { verifyCertificate } from '../services/mockApi.js'

export default function ResultVerification() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [touched, setTouched] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched(true)
    setLoading(true)
    const res = await verifyCertificate(query)
    setResult(res)
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-ink-50 dark:bg-ink-900">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-seal-600 text-white">
            <Search size={20} aria-hidden="true" />
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold text-ink-900 dark:text-white">Verify a result</h1>
          <p className="mt-2 text-ink-400 dark:text-ink-200">
            Enter a certificate ID or transaction hash to check its status directly against the on-chain registry.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label htmlFor="query" className="sr-only">Certificate ID or transaction hash</label>
            <input
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. RES-88213 or 0x71c9f0...4ab2"
              className="flex-1 rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-seal-500 dark:border-ink-600 dark:bg-ink-800 dark:text-white"
            />
            <Button type="submit" icon={ArrowRight} iconPosition="right" loading={loading}>
              Verify
            </Button>
          </form>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink-400 dark:text-ink-200">
            <QrCode size={14} aria-hidden="true" /> You can also scan a QR code printed on a physical transcript.
          </p>
        </section>

        {touched && !loading && result && (
          <section className="mx-auto max-w-xl px-4 pb-16 sm:px-6 lg:px-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">Verification result</h2>
                <StatusBadge status={result.status} pulse={result.status === 'pending'} />
              </div>
              {result.status === 'not_found' ? (
                <p className="mt-4 text-sm text-ink-400 dark:text-ink-200">{result.message}</p>
              ) : (
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between"><dt className="text-ink-400 dark:text-ink-200">Student</dt><dd className="font-medium text-ink-900 dark:text-white">{result.studentName}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-400 dark:text-ink-200">Course</dt><dd className="font-medium text-ink-900 dark:text-white">{result.course}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-400 dark:text-ink-200">Institution</dt><dd className="font-medium text-ink-900 dark:text-white">{result.institution}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-400 dark:text-ink-200">Issued</dt><dd className="font-medium text-ink-900 dark:text-white">{result.issuedOn}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-400 dark:text-ink-200">Transaction</dt><dd className="font-mono text-xs text-seal-700 dark:text-seal-300">{result.txHash}</dd></div>
                </dl>
              )}
              {result.status !== 'not_found' && (
                <Link to={`/certificate/RES-88213`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-seal-600 dark:text-seal-300">
                  View full certificate & timeline <ArrowRight size={14} aria-hidden="true" />
                </Link>
              )}
            </Card>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

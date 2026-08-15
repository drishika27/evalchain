import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, ScanLine, Layers, Users2, ArrowRight, Fingerprint } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import StatCard from '../components/StatCard.jsx'
import { getPlatformStats } from '../services/mockApi.js'

const AUDIENCES = [
  { icon: Users2, title: 'Students', copy: 'Hold verified, shareable proof of every result — no more waiting on transcript requests.' },
  { icon: ScanLine, title: 'Examiners', copy: 'Issue results directly to the chain and track every submission through to confirmation.' },
  { icon: Layers, title: 'Administrators', copy: 'Onboard institutions, monitor system health, and audit the full verification ledger.' },
]

export default function Landing() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    getPlatformStats().then(setStats)
  }, [])

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-900">
      <Navbar />

      <section className="relative overflow-hidden border-b border-ink-100 dark:border-ink-600">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-seal-300 bg-seal-50 px-3 py-1 text-xs font-medium text-seal-700 dark:border-seal-500/40 dark:bg-seal-700/15 dark:text-seal-200">
              <Fingerprint size={13} aria-hidden="true" />
              Tamper-evident academic records
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] text-ink-900 sm:text-5xl dark:text-white">
              A result, once sealed on the chain, stays true.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-400 dark:text-ink-200">
              VeriChain lets institutions issue academic results as verifiable on-chain
              records, so students, employers and examiners can confirm authenticity in
              seconds — without a phone call to the registrar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/verify" className="inline-flex items-center gap-2 rounded-xl bg-seal-600 px-5 py-3 text-sm font-medium text-white hover:bg-seal-700">
                Verify a result <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/login" className="inline-flex items-center gap-2 rounded-xl border border-ink-200 px-5 py-3 text-sm font-medium text-ink-900 hover:bg-ink-50 dark:border-ink-600 dark:text-white dark:hover:bg-ink-700">
                Log in to your dashboard
              </Link>
            </div>
          </div>

          <div className="relative rounded-3xl border border-ink-100 bg-white p-6 shadow-seal dark:border-ink-600 dark:bg-ink-800">
            <div className="flex items-center justify-between border-b border-ink-100 pb-4 dark:border-ink-600">
              <div className="flex items-center gap-2 font-display font-semibold text-ink-900 dark:text-white">
                <ShieldCheck size={18} className="text-seal-600 dark:text-seal-300" aria-hidden="true" />
                Result Seal
              </div>
              <span className="rounded-full bg-seal-50 px-2.5 py-1 text-xs font-medium text-seal-700 dark:bg-seal-700/20 dark:text-seal-200">Verified</span>
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-ink-400 dark:text-ink-200">Student</dt><dd className="font-medium text-ink-900 dark:text-white">Ananya Rao</dd></div>
              <div className="flex justify-between"><dt className="text-ink-400 dark:text-ink-200">Course</dt><dd className="font-medium text-ink-900 dark:text-white">B.Tech Computer Science</dd></div>
              <div className="flex justify-between"><dt className="text-ink-400 dark:text-ink-200">Grade</dt><dd className="font-medium text-ink-900 dark:text-white">A · 91%</dd></div>
              <div className="flex justify-between"><dt className="text-ink-400 dark:text-ink-200">Tx hash</dt><dd className="font-mono text-xs text-seal-700 dark:text-seal-300">0x71c9f0...4ab2</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white">Platform activity</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Records on-chain" value={stats?.totalRecords ?? 0} icon={Layers} accent="seal" />
          <StatCard label="Verified today" value={stats?.verifiedToday ?? 0} icon={ShieldCheck} accent="gold" />
          <StatCard label="Active institutions" value={stats?.activeInstitutions ?? 0} icon={Users2} accent="ink" />
          <StatCard label="Avg. verification time" value={stats?.avgVerificationSeconds ?? 0} suffix="s" decimals={1} icon={ScanLine} accent="seal" />
        </div>
      </section>

      <section className="border-t border-ink-100 bg-white py-14 dark:border-ink-600 dark:bg-ink-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white">Built for three roles</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {AUDIENCES.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-2xl border border-ink-100 p-5 dark:border-ink-600">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-seal-50 text-seal-600 dark:bg-seal-700/20 dark:text-seal-300">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h3 className="mt-3 font-display font-semibold text-ink-900 dark:text-white">{title}</h3>
                <p className="mt-1 text-sm text-ink-400 dark:text-ink-200">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

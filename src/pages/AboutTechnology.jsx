import React from 'react'
import { Link2, Database, Lock, ScanEye, Layers3, Cpu } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Card } from '../components/Card.jsx'

const STEPS = [
  { icon: Database, title: 'Result submitted', copy: 'An examiner enters a result. It is structured and hashed, but not yet public.' },
  { icon: Lock, title: 'Institution signs', copy: 'The issuing institution cryptographically signs the record, attesting to its authenticity.' },
  { icon: Link2, title: 'Anchored on-chain', copy: 'The signed hash is written to the ledger and pinned to distributed storage (IPFS).' },
  { icon: ScanEye, title: 'Open for verification', copy: 'Anyone with the certificate ID can confirm the record matches what was sealed on-chain.' },
]

const PRINCIPLES = [
  { icon: Layers3, title: 'Tamper-evident, not tamper-hidden', copy: 'Once sealed, a record cannot be silently edited — any change produces a new, distinguishable hash.' },
  { icon: Cpu, title: 'Verification without intermediaries', copy: 'Employers and institutions check authenticity directly against the chain, without contacting the registrar.' },
  { icon: Lock, title: 'Institutions keep control', copy: 'Only authorised examiners and registrars can issue results; VeriChain never originates academic data itself.' },
]

export default function AboutTechnology() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-50 dark:bg-ink-900">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-white">How the seal is made</h1>
          <p className="mt-3 text-ink-400 dark:text-ink-200">
            VeriChain doesn't store grades in a database that anyone can quietly edit. It records a
            cryptographic fingerprint of each result on a distributed ledger, so authenticity can be
            checked independently of the institution that issued it.
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6 lg:px-8">
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, copy }, idx) => (
              <li key={title} className="rounded-2xl border border-ink-100 bg-white p-5 dark:border-ink-600 dark:bg-ink-800">
                <span className="font-mono text-xs text-ink-400 dark:text-ink-200">Step {idx + 1}</span>
                <span className="mt-2 grid h-10 w-10 place-items-center rounded-xl bg-seal-50 text-seal-600 dark:bg-seal-700/20 dark:text-seal-300">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h3 className="mt-3 font-display font-semibold text-ink-900 dark:text-white">{title}</h3>
                <p className="mt-1 text-sm text-ink-400 dark:text-ink-200">{copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-ink-100 bg-white py-14 dark:border-ink-600 dark:bg-ink-800">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white">Design principles</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {PRINCIPLES.map(({ icon: Icon, title, copy }) => (
                <Card key={title} className="p-5">
                  <Icon size={18} className="text-seal-600 dark:text-seal-300" aria-hidden="true" />
                  <h3 className="mt-3 font-display font-semibold text-ink-900 dark:text-white">{title}</h3>
                  <p className="mt-1 text-sm text-ink-400 dark:text-ink-200">{copy}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

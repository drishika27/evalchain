import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-white dark:border-ink-600 dark:bg-ink-900">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 text-sm text-ink-400 sm:flex-row sm:justify-between sm:px-6 lg:px-8 dark:text-ink-200">
        <div className="flex items-center gap-2 font-display text-ink-900 dark:text-white">
          <ShieldCheck size={16} aria-hidden="true" />
          VeriChain
        </div>
        <p>Academic records, anchored to the chain. Not a substitute for official transcripts.</p>
        <div className="flex gap-4">
          <Link to="/technology" className="hover:text-ink-900 dark:hover:text-white">Technology</Link>
          <Link to="/verify" className="hover:text-ink-900 dark:hover:text-white">Verify</Link>
        </div>
      </div>
    </footer>
  )
}

import React from 'react'
import { Link2, CheckCircle2, Loader2 } from 'lucide-react'

function formatTimestamp(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString(undefined, {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

/**
 * Ledger-style timeline of on-chain events for a single academic record.
 * Expects entries shaped like services/mockApi.js -> getTransactionTimeline().
 */
export default function TransactionTimeline({ entries = [] }) {
  return (
    <ol className="relative space-y-6 text-ink-900 dark:text-ink-100">
      {entries.map((entry, idx) => (
        <li key={entry.id} className="chain-link relative flex gap-4">
          <span
            className={`relative z-10 mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-full ${
              entry.status === 'complete'
                ? 'bg-seal-600 text-white'
                : 'bg-ink-100 text-ink-400 dark:bg-ink-700 dark:text-ink-200'
            }`}
          >
            {entry.status === 'complete' ? (
              <CheckCircle2 size={16} aria-hidden="true" />
            ) : (
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            )}
          </span>
          <div className="flex-1 pb-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="font-medium">{entry.label}</p>
              <time className="text-xs text-ink-400 dark:text-ink-200" dateTime={entry.timestamp}>
                {formatTimestamp(entry.timestamp)}
              </time>
            </div>
            <p className="text-sm text-ink-400 dark:text-ink-200">{entry.actor}</p>
            {entry.txHash && (
              <p className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-ink-50 px-2 py-1 font-mono text-xs text-seal-700 dark:bg-ink-700 dark:text-seal-300">
                <Link2 size={12} aria-hidden="true" />
                {entry.txHash}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}

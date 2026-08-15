import React from 'react'
import { ShieldCheck, Clock, ShieldAlert, ShieldX } from 'lucide-react'

const CONFIG = {
  verified: {
    label: 'Verified',
    icon: ShieldCheck,
    classes: 'bg-seal-50 text-seal-700 ring-1 ring-inset ring-seal-300 dark:bg-seal-700/20 dark:text-seal-100 dark:ring-seal-500/40',
    dot: 'bg-seal-500',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    classes: 'bg-amber-400/10 text-amber-500 ring-1 ring-inset ring-amber-400/40 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  flagged: {
    label: 'Flagged',
    icon: ShieldAlert,
    classes: 'bg-gold-100 text-gold-600 ring-1 ring-inset ring-gold-300 dark:bg-gold-500/10 dark:text-gold-300 dark:ring-gold-500/30',
    dot: 'bg-gold-500',
  },
  revoked: {
    label: 'Revoked',
    icon: ShieldX,
    classes: 'bg-danger-500/10 text-danger-500 ring-1 ring-inset ring-danger-400/40',
    dot: 'bg-danger-500',
  },
  disputed: {
    label: 'Disputed',
    icon: ShieldAlert,
    classes: 'bg-danger-500/10 text-danger-500 ring-1 ring-inset ring-danger-400/40',
    dot: 'bg-danger-500',
  },
  not_found: {
    label: 'Not found',
    icon: ShieldX,
    classes: 'bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200 dark:bg-ink-800 dark:text-ink-200 dark:ring-ink-600',
    dot: 'bg-ink-400',
  },
  active: {
    label: 'Active',
    icon: ShieldCheck,
    classes: 'bg-seal-50 text-seal-700 ring-1 ring-inset ring-seal-300 dark:bg-seal-700/20 dark:text-seal-100 dark:ring-seal-500/40',
    dot: 'bg-seal-500',
  },
  suspended: {
    label: 'Suspended',
    icon: ShieldX,
    classes: 'bg-danger-500/10 text-danger-500 ring-1 ring-inset ring-danger-400/40',
    dot: 'bg-danger-500',
  },
  pending_review: {
    label: 'Pending review',
    icon: Clock,
    classes: 'bg-amber-400/10 text-amber-500 ring-1 ring-inset ring-amber-400/40 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
}

export default function StatusBadge({ status = 'pending', pulse = false, className = '' }) {
  const cfg = CONFIG[status] ?? CONFIG.pending
  const Icon = cfg.icon
  return (
    <span
      role="status"
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${cfg.classes} ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {pulse && <span className={`absolute inline-flex h-full w-full animate-pulseRing rounded-full ${cfg.dot}`} />}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      </span>
      <Icon size={13} strokeWidth={2.25} aria-hidden="true" />
      {cfg.label}
    </span>
  )
}

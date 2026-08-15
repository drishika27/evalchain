import React, { useEffect, useRef, useState } from 'react'

/**
 * Animated statistic card. Counts up from 0 to `value` on mount / on change.
 * `value` should be a number; use `suffix` for units like "%" or "s".
 */
export default function StatCard({ label, value, suffix = '', icon: Icon, decimals = 0, accent = 'seal' }) {
  const [display, setDisplay] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    const target = Number(value) || 0
    const duration = 900
    const start = performance.now()
    const from = 0

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(from + (target - from) * eased)
      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [value])

  const accentClasses = {
    seal: 'text-seal-600 dark:text-seal-300 bg-seal-50 dark:bg-seal-700/15',
    gold: 'text-gold-600 dark:text-gold-300 bg-gold-100 dark:bg-gold-500/10',
    ink: 'text-ink-600 dark:text-ink-200 bg-ink-100 dark:bg-ink-800',
  }[accent]

  return (
    <div className="animate-countUp rounded-2xl border border-ink-100 bg-white p-5 shadow-seal dark:border-ink-600 dark:bg-ink-800">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-ink-400 dark:text-ink-200">{label}</p>
        {Icon && (
          <span className={`grid h-9 w-9 place-items-center rounded-xl ${accentClasses}`}>
            <Icon size={18} strokeWidth={2} aria-hidden="true" />
          </span>
        )}
      </div>
      <p className="mt-3 font-display text-3xl font-semibold tabular-nums text-ink-900 dark:text-white">
        {display.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}
        <span className="ml-0.5 text-lg font-medium text-ink-400 dark:text-ink-200">{suffix}</span>
      </p>
    </div>
  )
}

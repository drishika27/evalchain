import React from 'react'

export function Card({ children, className = '', as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={`rounded-2xl border border-ink-100 bg-white shadow-seal dark:border-ink-600 dark:bg-ink-800 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 px-5 py-4 dark:border-ink-600">
      <div>
        <h3 className="font-display text-base font-semibold text-ink-900 dark:text-white">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-ink-400 dark:text-ink-200">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export default Card

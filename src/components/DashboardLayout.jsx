import React from 'react'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'

export default function DashboardLayout({ role, title, subtitle, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-ink-50 dark:bg-ink-900">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-1">
        <Sidebar role={role} />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {(title || subtitle) && (
            <div className="mb-6">
              {title && <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">{title}</h1>}
              {subtitle && <p className="mt-1 text-sm text-ink-400 dark:text-ink-200">{subtitle}</p>}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}

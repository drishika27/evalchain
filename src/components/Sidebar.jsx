import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, FileCheck2, Users, Building2, Search, ScrollText, Settings,
} from 'lucide-react'

const NAV_BY_ROLE = {
  student: [
    { to: '/dashboard/student', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/verify', label: 'Verify a result', icon: Search },
  ],
  examiner: [
    { to: '/dashboard/examiner', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/verify', label: 'Verify a result', icon: Search },
  ],
  administrator: [
    { to: '/dashboard/administrator', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/verify', label: 'Verify a result', icon: Search },
  ],
}

export default function Sidebar({ role }) {
  const items = NAV_BY_ROLE[role] ?? []
  return (
    <aside className="hidden w-60 flex-none border-r border-ink-100 bg-white px-3 py-6 lg:block dark:border-ink-600 dark:bg-ink-900">
      <p className="px-3 text-xs font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-200">
        {role === 'administrator' ? 'Administration' : role === 'examiner' ? 'Examiner tools' : 'Student portal'}
      </p>
      <nav className="mt-3 flex flex-col gap-1">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-seal-50 text-seal-700 dark:bg-seal-700/20 dark:text-seal-200'
                  : 'text-ink-600 hover:bg-ink-50 dark:text-ink-100 dark:hover:bg-ink-700'
              }`
            }
          >
            <Icon size={17} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

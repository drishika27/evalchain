import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ShieldCheck, LogOut, ChevronDown } from 'lucide-react'
import ThemeToggle from './ThemeToggle.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const PUBLIC_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/verify', label: 'Verify a result' },
  { to: '/technology', label: 'Technology' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur dark:border-ink-600 dark:bg-ink-900/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink-900 dark:text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-seal-600 text-white">
            <ShieldCheck size={18} aria-hidden="true" />
          </span>
          VeriChain
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {PUBLIC_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-seal-600 dark:text-seal-300'
                    : 'text-ink-600 hover:text-ink-900 dark:text-ink-100 dark:hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to={`/dashboard/${user.role}`}
                className="flex items-center gap-2 rounded-xl border border-ink-100 px-3 py-1.5 text-sm font-medium text-ink-900 hover:bg-ink-50 dark:border-ink-600 dark:text-white dark:hover:bg-ink-700"
              >
                {user.name}
                <ChevronDown size={14} aria-hidden="true" />
              </Link>
              <button
                onClick={handleLogout}
                aria-label="Log out"
                className="grid h-9 w-9 place-items-center rounded-xl text-ink-400 hover:bg-ink-50 hover:text-danger-500 dark:text-ink-200 dark:hover:bg-ink-700"
              >
                <LogOut size={17} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-xl bg-seal-600 px-4 py-2 text-sm font-medium text-white hover:bg-seal-700"
            >
              Log in
            </Link>
          )}
        </div>

        <button
          className="grid h-9 w-9 place-items-center rounded-lg text-ink-600 md:hidden dark:text-ink-100"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink-100 px-4 py-3 md:hidden dark:border-ink-600">
          <div className="flex flex-col gap-1">
            {PUBLIC_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50 dark:text-ink-100 dark:hover:bg-ink-700"
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-ink-100 pt-3 dark:border-ink-600">
              <ThemeToggle />
              {user ? (
                <div className="flex items-center gap-2">
                  <Link to={`/dashboard/${user.role}`} onClick={() => setOpen(false)} className="text-sm font-medium text-ink-900 dark:text-white">
                    {user.name}
                  </Link>
                  <button onClick={handleLogout} className="text-sm font-medium text-danger-500">Log out</button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-xl bg-seal-600 px-4 py-2 text-sm font-medium text-white">
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

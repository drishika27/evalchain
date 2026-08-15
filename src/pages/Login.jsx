import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { GraduationCap, ClipboardCheck, ShieldEllipsis, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const ROLES = [
  { id: 'student', label: 'Student', icon: GraduationCap },
  { id: 'examiner', label: 'Examiner', icon: ClipboardCheck },
  { id: 'administrator', label: 'Administrator', icon: ShieldEllipsis },
]

export default function Login() {
  const [role, setRole] = useState('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await login(email, password, role)
      const redirectTo = location.state?.from?.pathname ?? `/dashboard/${user.role}`
      navigate(redirectTo, { replace: true })
    } catch {
      // error already captured in auth context
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-ink-50 dark:bg-ink-900">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-seal-600 text-white">
              <ShieldCheck size={20} aria-hidden="true" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-semibold text-ink-900 dark:text-white">Welcome back</h1>
            <p className="mt-1 text-sm text-ink-400 dark:text-ink-200">Sign in to view your verified records.</p>
          </div>

          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-seal dark:border-ink-600 dark:bg-ink-800">
            <fieldset className="mb-5">
              <legend className="mb-2 text-sm font-medium text-ink-900 dark:text-white">I am signing in as</legend>
              <div className="grid grid-cols-3 gap-2">
                {ROLES.map(({ id, label, icon: Icon }) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => setRole(id)}
                    aria-pressed={role === id}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-medium transition-colors ${
                      role === id
                        ? 'border-seal-500 bg-seal-50 text-seal-700 dark:bg-seal-700/20 dark:text-seal-200'
                        : 'border-ink-100 text-ink-600 hover:bg-ink-50 dark:border-ink-600 dark:text-ink-100 dark:hover:bg-ink-700'
                    }`}
                  >
                    <Icon size={18} aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-white">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@institution.edu"
                  className="w-full rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-seal-500 dark:border-ink-600 dark:bg-ink-900 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 pr-10 text-sm text-ink-900 placeholder:text-ink-400 focus:border-seal-500 dark:border-ink-600 dark:bg-ink-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute inset-y-0 right-0 grid w-10 place-items-center text-ink-400 hover:text-ink-600 dark:text-ink-200"
                  >
                    {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="rounded-lg bg-danger-500/10 px-3 py-2 text-sm text-danger-500">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" loading={loading}>
                Log in
              </Button>
            </form>
            <p className="mt-4 text-center text-xs text-ink-400 dark:text-ink-200">
              Demo mode — any email/password signs you in as the selected role.
            </p>
          </div>
          <p className="mt-6 text-center text-sm text-ink-400 dark:text-ink-200">
            Just checking a result? <Link to="/verify" className="font-medium text-seal-600 dark:text-seal-300">Verify without an account</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

import React from 'react'

const VARIANTS = {
  primary: 'bg-seal-600 text-white hover:bg-seal-700 focus-visible:outline-seal-600',
  secondary: 'bg-ink-100 text-ink-900 hover:bg-ink-200 dark:bg-ink-600 dark:text-white dark:hover:bg-ink-600/80',
  gold: 'bg-gold-500 text-ink-900 hover:bg-gold-600',
  ghost: 'bg-transparent text-ink-600 hover:bg-ink-100 dark:text-ink-100 dark:hover:bg-ink-700',
  outline: 'border border-ink-200 text-ink-900 hover:bg-ink-50 dark:border-ink-600 dark:text-white dark:hover:bg-ink-700',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  loading = false,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
      ) : (
        Icon && iconPosition === 'left' && <Icon size={16} aria-hidden="true" />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon size={16} aria-hidden="true" />}
    </button>
  )
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#0B1220',
          50: '#F5F7FA',
          100: '#E7EAF0',
          200: '#C6CCDA',
          400: '#6B7484',
          600: '#38404F',
          800: '#161F2E',
          900: '#0B1220',
        },
        seal: {
          50: '#EAF3EF',
          100: '#CFE4DA',
          300: '#7FAE9B',
          500: '#2F6F5E',
          600: '#255B4C',
          700: '#1C4739',
        },
        gold: {
          100: '#F4E9C9',
          300: '#E0C778',
          500: '#C9A227',
          600: '#A9860F',
        },
        danger: {
          400: '#D9755F',
          500: '#B4433A',
        },
        amber: {
          400: '#D3A64B',
          500: '#B8862B',
        },
      },
      boxShadow: {
        seal: '0 1px 2px rgba(11,18,32,0.06), 0 8px 24px -8px rgba(11,18,32,0.15)',
      },
      keyframes: {
        countUp: { '0%': { opacity: 0, transform: 'translateY(4px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        pulseRing: { '0%': { boxShadow: '0 0 0 0 rgba(47,111,94,0.35)' }, '100%': { boxShadow: '0 0 0 10px rgba(47,111,94,0)' } },
      },
      animation: {
        countUp: 'countUp 0.5s ease-out',
        pulseRing: 'pulseRing 1.6s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
}

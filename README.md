# VeriChain — Academic Result Verification Dashboard

A React + Vite + Tailwind CSS front end for a blockchain-based academic
result verification platform, with role-based dashboards for **Students**,
**Examiners**, and **Administrators**.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## Demo login

The login screen is wired to a mock auth service — any email/password
combination signs you in. Pick a role (Student / Examiner / Administrator)
before submitting to land on the matching dashboard.

## Project structure

```
src/
  components/     Reusable UI: StatCard, StatusBadge, TransactionTimeline,
                   ChartCard, Navbar, Sidebar, Button, Card, ThemeToggle, ...
  context/         ThemeContext (dark/light mode), AuthContext (mock session)
  pages/           Landing, Login, StudentDashboard, ExaminerDashboard,
                   AdminDashboard, ResultVerification, CertificateDetails,
                   AboutTechnology
  services/
    mockApi.js     Every "backend call" in the app. Each function returns a
                   Promise shaped like a future REST response (see the
                   comment at the top of the file for how to swap it for a
                   real API without touching any component).
```

## Connecting a real backend

Nothing in `src/pages` or `src/components` talks to `mockApi.js` internals —
they only call its exported functions and await a promise. To go live:

1. Replace each function body in `src/services/mockApi.js` with a `fetch`
   (or your SDK) call to the real endpoint, keeping the same function
   signature and return shape.
2. Point `mockLogin` at your real auth endpoint and store a real JWT instead
   of the mock token.
3. Wire `verifyCertificate` and `getTransactionTimeline` to your chain
   indexer / node provider.

## Design notes

- **Palette**: deep ink navy + a seal-green primary (verification/trust) and
  a muted gold accent (ceremonial "seal" motif), avoiding default
  purple/neon Web3 styling.
- **Type**: Fraunces (display/serif, academic-seal feel), Inter (UI/body),
  JetBrains Mono (transaction hashes, IDs).
- **Signature elements**: the circular verification seal badge and the
  chain-link transaction timeline, both used consistently across pages.
- **Accessibility**: visible focus rings, semantic table/list markup, ARIA
  labels on icon-only buttons, `prefers-reduced-motion` respected.
- **Dark/light mode**: class-based Tailwind dark mode, toggled via
  `ThemeContext`, persisted to `localStorage`.

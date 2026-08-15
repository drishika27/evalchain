/**
 * mockApi.js
 * ---------------------------------------------------------------------------
 * Mock service layer. Every function here mimics the shape (params, return
 * type, thrown errors) of a future REST call so the UI never has to change
 * when this is swapped for real endpoints, e.g.:
 *
 *   export const getResults = (studentId) =>
 *     fetch(`/api/v1/students/${studentId}/results`).then(r => r.json())
 *
 * All functions are async and return promises to match real network calls.
 * Nothing here talks to a blockchain or a database — it's local fixture
 * data plus an artificial delay.
 * ---------------------------------------------------------------------------
 */

const delay = (ms = 500) => new Promise((res) => setTimeout(res, ms))

const uid = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

const DEMO_USERS = {
  student: { id: 'STU-20194', name: 'Ananya Rao', email: 'student@demo.edu', role: 'student', institution: 'Rajasthan Institute of Technology' },
  examiner: { id: 'EXM-4471', name: 'Dr. Vikram Sen', email: 'examiner@demo.edu', role: 'examiner', institution: 'Board of Technical Examinations' },
  administrator: { id: 'ADM-0012', name: 'Priya Nair', email: 'admin@demo.edu', role: 'administrator', institution: 'VeriChain Council' },
}

export async function mockLogin(email, password, role) {
  await delay(600)
  if (!email || !password) {
    throw new Error('Email and password are required.')
  }
  const profile = DEMO_USERS[role] ?? DEMO_USERS.student
  return { ...profile, email, walletAddress: '0x8f3a...c19e', token: uid('token') }
}

export async function mockLogout() {
  await delay(200)
  return true
}

// ---------------------------------------------------------------------------
// Platform-wide stats (animated stat cards)
// ---------------------------------------------------------------------------

export async function getPlatformStats() {
  await delay(500)
  return {
    totalRecords: 128430,
    verifiedToday: 342,
    activeInstitutions: 187,
    avgVerificationSeconds: 4.2,
  }
}

export async function getStudentStats(studentId) {
  await delay(450)
  return {
    totalResults: 12,
    verifiedResults: 11,
    pendingResults: 1,
    sharedCertificates: 5,
  }
}

export async function getExaminerStats(examinerId) {
  await delay(450)
  return {
    resultsIssued: 964,
    pendingReview: 23,
    disputesOpen: 2,
    avgIssueTimeHours: 3.1,
  }
}

export async function getAdminStats() {
  await delay(450)
  return {
    totalUsers: 48210,
    institutionsOnboarded: 187,
    recordsOnChain: 128430,
    systemUptime: 99.98,
  }
}

// ---------------------------------------------------------------------------
// Results
// ---------------------------------------------------------------------------

const SAMPLE_RESULTS = [
  { id: 'RES-88213', course: 'B.Tech Computer Science', semester: 'Semester VI', grade: 'A', score: 91, status: 'verified', issuedOn: '2026-06-12', txHash: '0x71c9f0...4ab2' },
  { id: 'RES-88214', course: 'B.Tech Computer Science', semester: 'Semester V', grade: 'A-', score: 87, status: 'verified', issuedOn: '2026-01-08', txHash: '0x2a44d1...9e07' },
  { id: 'RES-88215', course: 'B.Tech Computer Science', semester: 'Semester IV', grade: 'B+', score: 81, status: 'verified', issuedOn: '2025-06-15', txHash: '0x9b0ee3...c110' },
  { id: 'RES-88216', course: 'B.Tech Computer Science', semester: 'Semester VII', grade: '—', score: null, status: 'pending', issuedOn: null, txHash: null },
  { id: 'RES-88217', course: 'B.Tech Computer Science', semester: 'Semester III', grade: 'A', score: 89, status: 'verified', issuedOn: '2024-12-20', txHash: '0x5f19a7...77bd' },
]

export async function getResultsForStudent(studentId) {
  await delay(600)
  return SAMPLE_RESULTS
}

export async function getResultById(resultId) {
  await delay(500)
  const found = SAMPLE_RESULTS.find((r) => r.id === resultId) ?? SAMPLE_RESULTS[0]
  return {
    ...found,
    studentName: 'Ananya Rao',
    studentId: 'STU-20194',
    institution: 'Rajasthan Institute of Technology',
    examiner: 'Dr. Vikram Sen',
    blockNumber: 19824031,
    contractAddress: '0x4E1b...9fD2',
    ipfsHash: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi',
  }
}

export async function verifyCertificate(certificateIdOrHash) {
  await delay(1100)
  if (!certificateIdOrHash || certificateIdOrHash.trim().length < 4) {
    return { status: 'not_found', message: 'No matching record found on-chain for that ID or hash.' }
  }
  // deterministic-looking mock outcome based on input length, purely for demo variety
  const outcomes = ['verified', 'verified', 'verified', 'pending', 'revoked']
  const status = outcomes[certificateIdOrHash.length % outcomes.length]
  return {
    status,
    certificateId: certificateIdOrHash,
    studentName: 'Ananya Rao',
    course: 'B.Tech Computer Science',
    institution: 'Rajasthan Institute of Technology',
    issuedOn: '2026-06-12',
    txHash: '0x71c9f0a3e2b6d4c8f1a09e7d5b3c2a1f4e6d8c0b-4ab2',
    verifiedAt: new Date().toISOString(),
  }
}

// ---------------------------------------------------------------------------
// Blockchain transaction timeline
// ---------------------------------------------------------------------------

export async function getTransactionTimeline(resultId) {
  await delay(550)
  return [
    { id: uid('tx'), label: 'Result submitted by examiner', actor: 'Dr. Vikram Sen', txHash: '0x1a2b3c...90fe', timestamp: '2026-06-10T09:14:00Z', status: 'complete' },
    { id: uid('tx'), label: 'Institution signature attached', actor: 'RIT Registrar', txHash: '0x4f5e6d...11ac', timestamp: '2026-06-10T14:02:00Z', status: 'complete' },
    { id: uid('tx'), label: 'Record hashed & pinned to IPFS', actor: 'VeriChain Node #7', txHash: '0x9c8b7a...33d0', timestamp: '2026-06-11T08:41:00Z', status: 'complete' },
    { id: uid('tx'), label: 'Block confirmation (12/12)', actor: 'Consensus Network', txHash: '0x71c9f0...4ab2', timestamp: '2026-06-12T02:17:00Z', status: 'complete' },
    { id: uid('tx'), label: 'Available for public verification', actor: 'VeriChain Registry', txHash: null, timestamp: '2026-06-12T02:18:00Z', status: 'complete' },
  ]
}

// ---------------------------------------------------------------------------
// Charts data
// ---------------------------------------------------------------------------

export async function getVerificationTrend() {
  await delay(500)
  return [
    { month: 'Mar', verifications: 8200 },
    { month: 'Apr', verifications: 9100 },
    { month: 'May', verifications: 10450 },
    { month: 'Jun', verifications: 11800 },
    { month: 'Jul', verifications: 13200 },
    { month: 'Aug', verifications: 14650 },
  ]
}

export async function getGradeDistribution() {
  await delay(500)
  return [
    { grade: 'A', count: 412 },
    { grade: 'A-', count: 356 },
    { grade: 'B+', count: 298 },
    { grade: 'B', count: 201 },
    { grade: 'C', count: 74 },
  ]
}

export async function getStatusBreakdown() {
  await delay(500)
  return [
    { name: 'Verified', value: 118420 },
    { name: 'Pending', value: 6210 },
    { name: 'Revoked', value: 1800 },
    { name: 'Disputed', value: 2000 },
  ]
}

// ---------------------------------------------------------------------------
// Examiner queue / Admin tables
// ---------------------------------------------------------------------------

export async function getPendingSubmissions() {
  await delay(600)
  return [
    { id: 'SUB-3391', student: 'Kabir Malhotra', studentId: 'STU-20388', course: 'B.Tech ECE — Sem IV', submittedOn: '2026-08-10', status: 'pending' },
    { id: 'SUB-3392', student: 'Sara Iqbal', studentId: 'STU-20391', course: 'B.Sc Physics — Sem II', submittedOn: '2026-08-11', status: 'pending' },
    { id: 'SUB-3393', student: 'Devansh Gupta', studentId: 'STU-20402', course: 'B.Tech CS — Sem VI', submittedOn: '2026-08-12', status: 'flagged' },
    { id: 'SUB-3394', student: 'Meera Pillai', studentId: 'STU-20411', course: 'BBA — Sem V', submittedOn: '2026-08-13', status: 'pending' },
  ]
}

export async function getInstitutions() {
  await delay(550)
  return [
    { id: 'INS-01', name: 'Rajasthan Institute of Technology', records: 24310, status: 'active', onboarded: '2023-02-11' },
    { id: 'INS-02', name: 'Ashoka College of Commerce', records: 11840, status: 'active', onboarded: '2023-05-30' },
    { id: 'INS-03', name: 'Jaipur Medical Sciences University', records: 18990, status: 'active', onboarded: '2022-11-04' },
    { id: 'INS-04', name: 'Northfield Polytechnic', records: 3021, status: 'pending_review', onboarded: '2026-07-22' },
  ]
}

export async function getUserDirectory() {
  await delay(600)
  return [
    { id: 'USR-9021', name: 'Ananya Rao', role: 'student', institution: 'RIT', status: 'active' },
    { id: 'USR-9022', name: 'Dr. Vikram Sen', role: 'examiner', institution: 'Board of Technical Examinations', status: 'active' },
    { id: 'USR-9023', name: 'Kabir Malhotra', role: 'student', institution: 'RIT', status: 'active' },
    { id: 'USR-9024', name: 'Neha Chandran', role: 'examiner', institution: 'Ashoka College', status: 'suspended' },
    { id: 'USR-9025', name: 'Rohan Bhatt', role: 'student', institution: 'JMSU', status: 'active' },
  ]
}

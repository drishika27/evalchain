import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import ExaminerDashboard from './pages/ExaminerDashboard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ResultVerification from './pages/ResultVerification.jsx'
import CertificateDetails from './pages/CertificateDetails.jsx'
import AboutTechnology from './pages/AboutTechnology.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<ResultVerification />} />
      <Route path="/technology" element={<AboutTechnology />} />
      <Route path="/certificate/:id" element={<CertificateDetails />} />

      <Route
        path="/dashboard/student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/examiner"
        element={
          <ProtectedRoute role="examiner">
            <ExaminerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/administrator"
        element={
          <ProtectedRoute role="administrator">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Landing />} />
    </Routes>
  )
}

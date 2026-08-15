import React, { createContext, useContext, useState } from 'react'
import { mockLogin, mockLogout } from '../services/mockApi.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = window.localStorage.getItem('verichain-user')
    return saved ? JSON.parse(saved) : null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = async (email, password, role) => {
    setLoading(true)
    setError(null)
    try {
      const result = await mockLogin(email, password, role)
      setUser(result)
      window.localStorage.setItem('verichain-user', JSON.stringify(result))
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await mockLogout()
    setUser(null)
    window.localStorage.removeItem('verichain-user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axiosInstance'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const restore = async () => {
      try {
        const res = await api.get('/auth/me')
        setUser(res.data)
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    restore()
  }, [])

  const login = (userData) => setUser(userData)
  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.error(err)
    }
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

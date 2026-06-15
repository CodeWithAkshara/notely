import React, { useState } from 'react'
import api from '../api/axiosInstance'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await api.post('/auth/login', { username, password })
      login(res.data)
      navigate('/')
    } catch (err) {
       
      setError(err?.response?.data?.message || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="p-6 border rounded w-full max-w-md bg-white dark:bg-zinc-900">
        <h2 className="text-xl mb-4">Welcome Back</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="w-full mb-2 px-3 py-2 border rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full mb-2 px-3 py-2 border rounded" />
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">{loading? '...' : 'Login'}</button>
        <div className="mt-2 text-sm">No account? <Link to="/register" className="text-blue-600">Create one</Link></div>
      </form>
    </div>
  )
}

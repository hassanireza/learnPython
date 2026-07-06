import { FormEvent, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (user) return <Navigate to="/" replace />

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const result = login(email, password)
    if (!result.ok) {
      setError(result.error ?? 'Could not log in.')
      return
    }
    navigate('/')
  }

  return (
    <div className="auth">
      <div className="auth__card card">
        <div className="auth__notice">
          This is a showcase login. All lessons and the certificate are available without an account.
        </div>
        <h1>Welcome back</h1>
        <p className="auth__sub">Log in to see a personalized greeting. Nothing else changes.</p>

        <form onSubmit={handleSubmit} className="auth__form">
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </label>

          {error && <div className="auth__error">{error}</div>}

          <button type="submit" className="btn btn--primary btn--block">
            Log in
          </button>
        </form>

        <p className="auth__switch">
          Do not have a showcase account? <Link to="/signup">Sign up</Link>
        </p>
        <p className="auth__switch">
          Just here to learn? <Link to="/day/1">Skip straight to Day 1</Link>
        </p>
      </div>
    </div>
  )
}

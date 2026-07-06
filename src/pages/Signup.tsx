import { FormEvent, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Signup() {
  const { user, signup } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (user) return <Navigate to="/" replace />

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const result = signup(name, email, password)
    if (!result.ok) {
      setError(result.error ?? 'Could not create an account.')
      return
    }
    navigate('/')
  }

  return (
    <div className="auth">
      <div className="auth__card card">
        <div className="auth__notice">
          This is a showcase signup. Accounts are stored only in your browser, there is no server or
          database. Every lesson and the certificate work without signing up.
        </div>
        <h1>Create an account</h1>
        <p className="auth__sub">Purely optional. It only unlocks a personalized greeting in the navbar.</p>

        <form onSubmit={handleSubmit} className="auth__form">
          <label>
            Name
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ada Lovelace"
            />
          </label>
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
            Sign up
          </button>
        </form>

        <p className="auth__switch">
          Already have a showcase account? <Link to="/login">Log in</Link>
        </p>
        <p className="auth__switch">
          Just here to learn? <Link to="/day/1">Skip straight to Day 1</Link>
        </p>
      </div>
    </div>
  )
}

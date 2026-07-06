import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

/**
 * This is a SHOWCASE authentication system only.
 *
 * Nothing in this app actually requires an account:
 * - All 30 lessons are open and navigable without logging in.
 * - The certificate can be generated without logging in.
 * - No backend exists; "accounts" are stored in the browser's localStorage
 *   purely so the login / signup screens have something to demonstrate.
 *
 * Do not use this pattern for a real product. It exists so the UI can
 * demonstrate what an authenticated experience could look like.
 */

export interface ShowcaseUser {
  name: string
  email: string
}

interface AuthContextValue {
  user: ShowcaseUser | null
  login: (email: string, _password: string) => { ok: boolean; error?: string }
  signup: (name: string, email: string, _password: string) => { ok: boolean; error?: string }
  logout: () => void
}

const STORAGE_KEY = 'p30_showcase_user'
const ACCOUNTS_KEY = 'p30_showcase_accounts'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

type StoredAccount = { name: string; email: string; password: string }

function readAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY)
    return raw ? (JSON.parse(raw) as StoredAccount[]) : []
  } catch {
    return []
  }
}

function writeAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ShowcaseUser | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw) as ShowcaseUser)
    } catch {
      /* ignore corrupted storage */
    }
  }, [])

  const login: AuthContextValue['login'] = (email, _password) => {
    const accounts = readAccounts()
    const match = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase())
    if (!match) {
      return { ok: false, error: 'No showcase account found for that email. Try signing up first.' }
    }
    const nextUser = { name: match.name, email: match.email }
    setUser(nextUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    return { ok: true }
  }

  const signup: AuthContextValue['signup'] = (name, email, password) => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return { ok: false, error: 'Please fill in every field.' }
    }
    const accounts = readAccounts()
    if (accounts.some((a) => a.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'An account with that email already exists in this browser.' }
    }
    accounts.push({ name, email, password })
    writeAccounts(accounts)
    const nextUser = { name, email }
    setUser(nextUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    return { ok: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = useMemo(() => ({ user, login, signup, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}

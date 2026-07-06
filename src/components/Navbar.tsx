import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import './Navbar.css'

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout } = useAuth()
  const { percentComplete } = useProgress()

  return (
    <header className="navbar">
      <div className="navbar__left">
        <button className="navbar__menu-btn" onClick={onMenuClick} aria-label="Toggle curriculum menu">
          <span />
          <span />
          <span />
        </button>
        <Link to="/" className="navbar__brand">
          <span className="navbar__logo">🐍</span>
          <span className="navbar__title">
            Python <em>in 30 Days</em>
          </span>
        </Link>
      </div>

      <nav className="navbar__links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/day/1" className={({ isActive }) => (isActive ? 'active' : '')}>
          Curriculum
        </NavLink>
        <NavLink to="/certificate" className={({ isActive }) => (isActive ? 'active' : '')}>
          Certificate
        </NavLink>
      </nav>

      <div className="navbar__right">
        <div className="navbar__progress" title={`${percentComplete}% complete`}>
          <div className="navbar__progress-track">
            <div className="navbar__progress-fill" style={{ width: `${percentComplete}%` }} />
          </div>
          <span>{percentComplete}%</span>
        </div>

        {user ? (
          <div className="navbar__user">
            <span className="navbar__avatar">{user.name.charAt(0).toUpperCase()}</span>
            <span className="navbar__username">{user.name}</span>
            <button className="btn btn--ghost btn--sm" onClick={logout}>
              Log out
            </button>
          </div>
        ) : (
          <div className="navbar__auth">
            <Link to="/login" className="btn btn--ghost btn--sm">
              Log in
            </Link>
            <Link to="/signup" className="btn btn--primary btn--sm">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

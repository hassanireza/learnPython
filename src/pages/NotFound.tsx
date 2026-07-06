import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
      <h1 style={{ fontSize: '3rem' }}>404</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        This page does not exist. Maybe it wandered off during a while loop.
      </p>
      <Link to="/" className="btn btn--primary">
        Back to home
      </Link>
    </div>
  )
}

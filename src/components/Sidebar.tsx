import { NavLink } from 'react-router-dom'
import { CURRICULUM, TOPICS } from '../data/curriculum'
import { useProgress } from '../context/ProgressContext'
import './Sidebar.css'

interface SidebarProps {
  open: boolean
  onNavigate?: () => void
}

export default function Sidebar({ open, onNavigate }: SidebarProps) {
  const { isComplete, completedCount, percentComplete } = useProgress()

  return (
    <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
      <div className="sidebar__summary">
        <div className="sidebar__summary-text">
          <strong>{completedCount}/30</strong> days marked complete
        </div>
        <div className="sidebar__summary-track">
          <div className="sidebar__summary-fill" style={{ width: `${percentComplete}%` }} />
        </div>
      </div>

      <nav className="sidebar__nav">
        {TOPICS.map((topic) => (
          <div key={topic} className="sidebar__group">
            <div className="sidebar__group-title">{topic}</div>
            {CURRICULUM.filter((d) => d.topic === topic).map((day) => (
              <NavLink
                key={day.id}
                to={`/day/${day.id}`}
                onClick={onNavigate}
                className={({ isActive }) => `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`}
              >
                <span className="sidebar__item-check" aria-hidden>
                  {isComplete(day.id) ? '✓' : day.id}
                </span>
                <span className="sidebar__item-label">
                  <span className="sidebar__item-emoji">{day.emoji}</span> {day.title}
                </span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}

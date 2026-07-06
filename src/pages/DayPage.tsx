import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getAdjacentDays, getDayMeta, TOTAL_DAYS } from '../data/curriculum'
import { getLessonMarkdown, getSolutionCode } from '../data/content'
import { useProgress } from '../context/ProgressContext'
import CodeBlock from '../components/CodeBlock'
import './DayPage.css'

export default function DayPage() {
  const { dayId } = useParams<{ dayId: string }>()
  const id = Number(dayId)
  const meta = getDayMeta(id)
  const { isComplete, toggleComplete } = useProgress()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!meta || Number.isNaN(id)) {
    return <Navigate to="/" replace />
  }

  const markdown = getLessonMarkdown(meta.slug)
  const solution = getSolutionCode(meta.slug)
  const { prev, next } = getAdjacentDays(id)
  const done = isComplete(id)

  return (
    <div className="day-page">
      <div className="day-page__topbar">
        <div className="day-page__crumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Day {String(id).padStart(2, '0')}</span>
        </div>
        <div className="day-page__meter">
          Day {id} of {TOTAL_DAYS}
        </div>
      </div>

      <article className="day-page__lesson card">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ code: CodeBlock }}>
          {markdown}
        </ReactMarkdown>
      </article>

      {solution && (
        <section className="day-page__solution card">
          <div className="day-page__solution-head">
            <h2>Project Solution</h2>
            <span className="badge">solution.py</span>
          </div>
          <CodeBlock className="language-python">{solution}</CodeBlock>
        </section>
      )}

      <div className="day-page__complete card">
        <div>
          <strong>{done ? 'Marked complete' : 'Mark this day complete'}</strong>
          <p>
            This is just a personal tracker stored in your browser. It never blocks navigation, jump to
            any day whenever you like.
          </p>
        </div>
        <button
          className={`btn ${done ? 'btn--ghost' : 'btn--secondary'}`}
          onClick={() => toggleComplete(id)}
        >
          {done ? 'Unmark' : 'Mark complete'}
        </button>
      </div>

      <nav className="day-page__pagination">
        {prev ? (
          <Link to={`/day/${prev.id}`} className="day-page__nav-btn day-page__nav-btn--prev">
            <span className="day-page__nav-label">Previous</span>
            <span className="day-page__nav-title">
              {prev.emoji} Day {String(prev.id).padStart(2, '0')}: {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link to={`/day/${next.id}`} className="day-page__nav-btn day-page__nav-btn--next">
            <span className="day-page__nav-label">Next</span>
            <span className="day-page__nav-title">
              {next.emoji} Day {String(next.id).padStart(2, '0')}: {next.title}
            </span>
          </Link>
        ) : (
          <Link to="/certificate" className="day-page__nav-btn day-page__nav-btn--next">
            <span className="day-page__nav-label">Finished the curriculum</span>
            <span className="day-page__nav-title">Claim your certificate</span>
          </Link>
        )}
      </nav>
    </div>
  )
}

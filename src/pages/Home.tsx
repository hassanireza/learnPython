import { Link } from 'react-router-dom'
import { CURRICULUM, TOPICS } from '../data/curriculum'
import { useProgress } from '../context/ProgressContext'
import { DayTile, Icon } from '../components/icons/Icon'
import './Home.css'

export default function Home() {
  const { isComplete, completedCount, percentComplete } = useProgress()

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__badges">
          <span className="badge"><Icon name="book-open" size={14} />30 Lessons</span>
          <span className="badge"><Icon name="code" size={14} />30 Projects</span>
          <span className="badge"><Icon name="unlock" size={14} />No Login Required</span>
          <span className="badge"><Icon name="infinity" size={14} />Free Forever</span>
        </div>
        <h1>
          Learn Python in <span className="hero__accent">30 Days</span>
        </h1>
        <p className="hero__lead">
          A complete, beginner friendly Python course. Every day pairs a focused lesson with a hands on
          project so you learn by writing real code, not by memorizing syntax.
        </p>
        <div className="hero__actions">
          <Link to="/day/1" className="btn btn--primary">
            Start Day 1
            <Icon name="arrow-right" size={16} />
          </Link>
          <Link to="/certificate" className="btn btn--ghost">
            <Icon name="award" size={16} />
            Get your certificate
          </Link>
        </div>
        <p className="hero__note">
          Browse every lesson freely, jump between days in any order, and generate your completion
          certificate whenever you like. An account is never required.
        </p>
      </section>

      <section className="stats">
        <div className="stats__card">
          <span className="stats__value">30</span>
          <span className="stats__label">Daily lessons</span>
        </div>
        <div className="stats__card">
          <span className="stats__value">30</span>
          <span className="stats__label">Hands on projects</span>
        </div>
        <div className="stats__card">
          <span className="stats__value">{completedCount}</span>
          <span className="stats__label">Days you have marked complete</span>
        </div>
        <div className="stats__card">
          <span className="stats__value">{percentComplete}%</span>
          <span className="stats__label">Your progress</span>
        </div>
      </section>

      <section className="curriculum-preview">
        <div className="curriculum-preview__head">
          <h2>Curriculum</h2>
          <p>Every day builds on the last, but nothing is locked. Jump anywhere, anytime.</p>
        </div>

        {TOPICS.map((topic) => (
          <div key={topic} className="curriculum-topic">
            <h3>{topic}</h3>
            <div className="curriculum-grid">
              {CURRICULUM.filter((d) => d.topic === topic).map((day) => (
                <Link key={day.id} to={`/day/${day.id}`} className="day-card">
                  <div className="day-card__top">
                    <span className="day-card__number">Day {String(day.id).padStart(2, '0')}</span>
                    {isComplete(day.id) && (
                      <span className="day-card__done">
                        <Icon name="check" size={11} />
                        Done
                      </span>
                    )}
                  </div>
                  <div className="day-card__title">
                    <DayTile day={day.id} size={34} />
                    <span>{day.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

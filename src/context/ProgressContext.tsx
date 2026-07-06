import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { TOTAL_DAYS } from '../data/curriculum'

/**
 * Tracks which days the learner has marked complete. This is entirely
 * optional bookkeeping: nothing in the app checks this state before
 * allowing navigation to the next or previous day. Learners are always
 * free to move forward or backward through the curriculum, and the
 * certificate is available regardless of how many days are marked done.
 */

interface ProgressContextValue {
  completedDays: number[]
  isComplete: (day: number) => boolean
  toggleComplete: (day: number) => void
  completedCount: number
  percentComplete: number
  resetProgress: () => void
}

const STORAGE_KEY = 'p30_progress'

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedDays, setCompletedDays] = useState<number[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setCompletedDays(JSON.parse(raw) as number[])
    } catch {
      /* ignore corrupted storage */
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedDays))
  }, [completedDays])

  const isComplete = useCallback((day: number) => completedDays.includes(day), [completedDays])

  const toggleComplete = useCallback((day: number) => {
    setCompletedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort((a, b) => a - b),
    )
  }, [])

  const resetProgress = useCallback(() => setCompletedDays([]), [])

  const completedCount = completedDays.length
  const percentComplete = Math.round((completedCount / TOTAL_DAYS) * 100)

  const value = useMemo(
    () => ({ completedDays, isComplete, toggleComplete, completedCount, percentComplete, resetProgress }),
    [completedDays, isComplete, toggleComplete, completedCount, percentComplete, resetProgress],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within a ProgressProvider')
  return ctx
}

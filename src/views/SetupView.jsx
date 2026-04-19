import { useState } from 'react'
import { DEFAULT_WEEK_PATTERN, DAY_NAMES, DAY_NAMES_FULL } from '../data/program'
import styles from './SetupView.module.css'

const TYPE_OPTIONS = ['strength', 'run', 'rest']

export default function SetupView({ onComplete }) {
  const [runStartDate, setRunStartDate] = useState('2026-05-01')
  const [weekPattern, setWeekPattern] = useState([...DEFAULT_WEEK_PATTERN])
  const [step, setStep] = useState(0)

  function cycleDay(i) {
    setWeekPattern(prev => {
      const next = [...prev]
      const idx = TYPE_OPTIONS.indexOf(next[i])
      next[i] = TYPE_OPTIONS[(idx + 1) % TYPE_OPTIONS.length]
      return next
    })
  }

  function validate() {
    const counts = { strength: 0, run: 0, rest: 0 }
    weekPattern.forEach(t => counts[t]++)
    if (counts.strength < 2 || counts.run < 2) {
      return 'Schedule at least 2 strength days and 2 run days.'
    }
    // No strength + run adjacent (soft check — just warn)
    return null
  }

  function handleFinish() {
    const err = validate()
    if (err) { alert(err); return }
    onComplete({ runStartDate, weekPattern })
  }

  return (
    <div className={styles.page + ' page-scroll'}>
      <div className={styles.inner}>
        <div className={styles.logoMark}>🏃🏻‍♀️</div>
        <h1 className={styles.title}>Back on Track</h1>
        <p className={styles.sub}>Let's configure your program before we begin.</p>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Run program start date</h2>
          <p className={styles.cardDesc}>When does your run program begin? (You can always change this later.)</p>
          <input
            type="date"
            className={styles.dateInput}
            value={runStartDate}
            onChange={e => setRunStartDate(e.target.value)}
          />
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Weekly schedule</h2>
          <p className={styles.cardDesc}>Tap each day to cycle between Strength, Run, and Rest. Strength and run days should not overlap.</p>
          <div className={styles.patternGrid}>
            {DAY_NAMES.map((d, i) => (
              <button key={d} className={`${styles.dayBtn} ${styles[`dayBtn_${weekPattern[i]}`]}`} onClick={() => cycleDay(i)}>
                <span className={styles.dayName}>{d}</span>
                <span className={styles.dayIcon}>
                  {weekPattern[i] === 'strength' ? '💪' : weekPattern[i] === 'run' ? '🏃🏻‍♀️' : '—'}
                </span>
                <span className={styles.dayTypeLabel}>{weekPattern[i]}</span>
              </button>
            ))}
          </div>
        </div>

        <button className={styles.startBtn} onClick={handleFinish}>
          Start my program →
        </button>
      </div>
    </div>
  )
}

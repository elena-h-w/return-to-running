import { useState } from 'react'
import { STRENGTH_EXERCISES } from '../data/program'
import RestTimer from '../components/RestTimer'
import styles from './StrengthWorkout.module.css'

export default function StrengthWorkout({ onComplete, onExit }) {
  const [exerciseIdx, setExerciseIdx] = useState(0)
  const [setNum, setSetNum] = useState(1)
  const [showRest, setShowRest] = useState(false)
  const [done, setDone] = useState(false)
  const [restSeconds] = useState(60)

  const exercise = STRENGTH_EXERCISES[exerciseIdx]
  const isLastExercise = exerciseIdx === STRENGTH_EXERCISES.length - 1
  const isLastSet = setNum === exercise.sets

  function handleSetDone() {
    if (!isLastSet) {
      setShowRest(true)
    } else if (!isLastExercise) {
      setShowRest(true)
    } else {
      setDone(true)
    }
  }

  function handleRestDone() {
    setShowRest(false)
    setSetNum(prev => {
      if (prev >= exercise.sets) {
        setExerciseIdx(i => i + 1)
        return 1
      }
      return prev + 1
    })
  }

  if (done) {
    return (
      <div className={styles.done + ' fade-in'}>
        <div className={styles.doneCheck}>
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill="var(--success)" />
            <polyline points="14,24 21,31 34,17" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className={styles.doneTitle}>Strength session done</h2>
        <p className={styles.doneSub}>All {STRENGTH_EXERCISES.length} exercises complete.</p>
        <button className={styles.doneBtn} onClick={onComplete}>Log & finish</button>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.exitBtn} onClick={onExit}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Exit
        </button>
        <span className={styles.counter}>{exerciseIdx + 1} / {STRENGTH_EXERCISES.length}</span>
      </div>

      {/* Progress bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${((exerciseIdx + (setNum - 1) / exercise.sets) / STRENGTH_EXERCISES.length) * 100}%` }}
        />
      </div>

      {/* Exercise card */}
      <div className={styles.card + ' fade-in'} key={exerciseIdx + '-' + setNum}>
        <div className={styles.category}>{exercise.category}</div>
        <h2 className={styles.name}>{exercise.name}</h2>

        {exercise.equipment.length > 0 && (
          <div className={styles.equipment}>
            {exercise.equipment.map(e => (
              <span key={e} className={styles.tag}>{e}</span>
            ))}
          </div>
        )}

        <div className={styles.setInfo}>
          <div className={styles.setChips}>
            {Array.from({ length: exercise.sets }).map((_, i) => (
              <span key={i} className={`${styles.chip} ${i < setNum - 1 ? styles.chipDone : i === setNum - 1 ? styles.chipCurrent : ''}`} />
            ))}
          </div>
          <span className={styles.setLabel}>
            Set {setNum} of {exercise.sets} · {exercise.repsLabel ?? `${exercise.reps} reps`}
          </span>
        </div>

        <div className={styles.instructions}>
          {exercise.instructions.map((step, i) => (
            <div key={i} className={styles.step}>
              <span className={styles.stepNum}>{i + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>

        {exercise.cue && (
          <div className={styles.cue}>
            <span className={styles.cueIcon}>💡</span>
            <p>{exercise.cue}</p>
          </div>
        )}
      </div>

      {showRest ? (
        <div className={styles.restWrap + ' fade-in'}>
          <p className={styles.restLabel}>Rest</p>
          <RestTimer defaultSeconds={restSeconds} onDone={handleRestDone} />
        </div>
      ) : (
        <button className={styles.doneSetBtn} onClick={handleSetDone}>
          {isLastSet && isLastExercise ? 'Finish workout' : 'Set complete →'}
        </button>
      )}
    </div>
  )
}

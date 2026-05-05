import { useState } from 'react'
import { STRENGTH_EXERCISES, RUN_PHASES, PAIN_TYPES } from '../data/program'
import StrengthWorkout from './StrengthWorkout'
import PainCheck from '../components/PainCheck'
import styles from './TodayView.module.css'

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const TYPE_OPTIONS = ['strength', 'run', 'rest']

function WeekStrip({ pattern, todayDow, onDayTap }) {
  return (
    <div className={styles.weekStrip}>
      {DAY_LABELS.map((d, i) => (
        <button
          key={d}
          className={`${styles.dayCell} ${i === todayDow ? styles.dayCellToday : ''}`}
          onClick={() => onDayTap(i)}
        >
          <span className={styles.dayName}>{d}</span>
          <span className={styles.dayType}>
            {pattern[i] === 'strength' ? '💪' : pattern[i] === 'run' ? '🏃🏻‍♀️' : '🧘🏻‍♀️'}
          </span>
        </button>
      ))}
    </div>
  )
}

export default function TodayView({ program }) {
  const [workoutMode, setWorkoutMode] = useState(false)
  const [showPainCheck, setShowPainCheck] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [pendingPainResult, setPendingPainResult] = useState(null)

  const {
    todayType,
    todayDow,
    state,
    isTodayComplete,
    getCurrentRunPhaseData,
    getCurrentRunStageData,
    getPhase3TodayMinutes,
    completeStrength,
    completeRun,
    advanceRunStage,
    canAdvanceRun,
    consecutivePainFree,
    updateSettings,
  } = program

  function handleDayTap(i) {
    const current = state.weekPattern[i]
    const next = TYPE_OPTIONS[(TYPE_OPTIONS.indexOf(current) + 1) % TYPE_OPTIONS.length]
    const newPattern = [...state.weekPattern]
    newPattern[i] = next
    updateSettings({ weekPattern: newPattern })
  }

  if (workoutMode) {
    return (
      <StrengthWorkout
        onComplete={() => {
          completeStrength()
          setWorkoutMode(false)
          setSessionComplete(true)
        }}
        onExit={() => setWorkoutMode(false)}
      />
    )
  }

  function handleRunComplete() {
    setShowPainCheck(true)
  }

  function handlePainSubmit(painTypeId) {
    setShowPainCheck(false)
    const entry = completeRun(painTypeId)
    setPendingPainResult(painTypeId)
    setSessionComplete(true)
  }

  const phase = getCurrentRunPhaseData()
  const stage = getCurrentRunStageData()
  const phase3minutes = getPhase3TodayMinutes()

  const today = new Date()
  const dateLabel = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className={styles.page + ' page-scroll'}>
      {showPainCheck && (
        <PainCheck
          onSubmit={handlePainSubmit}
          onCancel={() => setShowPainCheck(false)}
        />
      )}

      <div className={styles.header}>
        <p className={styles.dateLabel}>{dateLabel}</p>
        <h1 className={styles.title}>
          {todayType === 'strength' ? 'Strength day' : todayType === 'run' ? 'Run day' : 'Rest day'}
        </h1>
      </div>

      <WeekStrip pattern={state.weekPattern} todayDow={todayDow} onDayTap={handleDayTap} />

      {/* Session complete banner */}
      {isTodayComplete && todayType !== 'rest' && (
        <div className={styles.completeBanner + ' fade-in'}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="var(--success)" />
            <polyline points="7,12 10,15 17,9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Today's session logged.</span>
        </div>
      )}

      {/* TODAY CONTENT */}
      {todayType === 'rest' && (
        <div className={styles.restCard}>
          <div className={styles.restEmoji}>🧘🏻‍♀️</div>
          <h2 className={styles.restTitle}>Rest day</h2>
          <p className={styles.restText}>Recovery is part of the program. Let your body absorb the work.</p>
        </div>
      )}

      {todayType === 'strength' && !isTodayComplete && (
        <div className={styles.sessionCard}>
          <div className={styles.sessionMeta}>
            <span className={styles.badge + ' ' + styles.badgeStrength}>Strength</span>
            <span className={styles.sessionDetail}>{STRENGTH_EXERCISES.length} exercises · ~35–45 min</span>
          </div>
          <h2 className={styles.sessionTitle}>Core, Hips &amp; Upper Back</h2>
          <p className={styles.sessionDesc}>Work through all 11 exercises with rest between sets. Tap "Start workout" to enter guided mode.</p>

          <div className={styles.exerciseList}>
            {STRENGTH_EXERCISES.map((ex, i) => (
              <div key={ex.id} className={styles.exerciseRow}>
                <span className={styles.exNum}>{i + 1}</span>
                <span className={styles.exName}>{ex.name}</span>
                <span className={styles.exSets}>{ex.sets}×{ex.repsLabel ?? ex.reps}</span>
              </div>
            ))}
          </div>

          <button className={styles.primaryBtn + ' ' + styles.strengthBtn} onClick={() => setWorkoutMode(true)}>
            Start workout
          </button>
        </div>
      )}

      {todayType === 'strength' && isTodayComplete && (
        <div className={styles.doneCard}>
          <p className={styles.doneMsg}>Nice work — strength session complete.</p>
        </div>
      )}

      {todayType === 'run' && (
        <RunCard
          phase={phase}
          stage={stage}
          phase3minutes={phase3minutes}
          isTodayComplete={isTodayComplete}
          canAdvanceRun={canAdvanceRun}
          onRunComplete={handleRunComplete}
          onAdvance={advanceRunStage}
          consecutivePainFree={consecutivePainFree}
          pendingPainResult={pendingPainResult}
        />
      )}
    </div>
  )
}

function RunCard({ phase, stage, phase3minutes, isTodayComplete, canAdvanceRun, onRunComplete, onAdvance, consecutivePainFree, pendingPainResult }) {
  const painData = PAIN_TYPES.find(p => p.id === pendingPainResult)

  return (
    <div className={styles.sessionCard}>
      <div className={styles.sessionMeta}>
        <span className={styles.badge + ' ' + styles.badgeRun}>Run</span>
        <span className={styles.sessionDetail}>Phase {phase.phase} — {phase.name}</span>
      </div>

      {phase.phase === 1 && (
        <>
          <h2 className={styles.sessionTitle}>Walking Base</h2>
          <p className={styles.sessionDesc}>{phase.description}</p>
          {!isTodayComplete && (
            <button className={styles.primaryBtn + ' ' + styles.runBtn} onClick={onRunComplete}>
              Log today's walk
            </button>
          )}
          {isTodayComplete && canAdvanceRun && (
            <button className={styles.advanceBtn} onClick={onAdvance}>
              Ready to advance → Walk/Jog
            </button>
          )}
        </>
      )}

      {phase.phase === 2 && stage && (
        <>
          <h2 className={styles.sessionTitle}>Stage {stage.stage}</h2>
          {stage.note ? (
            <p className={styles.sessionDesc}>{stage.note}</p>
          ) : (
            <div className={styles.intervalViz}>
              {Array.from({ length: stage.reps }).map((_, i) => (
                <div key={i} className={styles.intervalPair}>
                  <div className={styles.intervalWalk} style={{ flex: stage.walk }}>
                    <span>{stage.walk}m walk</span>
                  </div>
                  <div className={styles.intervalJog} style={{ flex: stage.jog }}>
                    <span>{stage.jog}m jog</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className={styles.totalTime}>Total: {stage.totalMin} min · {stage.reps}× repeat</p>

          {!isTodayComplete && (
            <button className={styles.primaryBtn + ' ' + styles.runBtn} onClick={onRunComplete}>
              Log this run
            </button>
          )}
          {isTodayComplete && (
            <div className={styles.streak}>
              {consecutivePainFree}/2 pain-free sessions to advance
            </div>
          )}
          {isTodayComplete && canAdvanceRun && (
            <button className={styles.advanceBtn} onClick={onAdvance}>
              Advance to next stage →
            </button>
          )}
        </>
      )}

      {phase.phase === 3 && (
        <>
          <h2 className={styles.sessionTitle}>
            {phase3minutes === null ? 'Cross-train / Rest'
              : phase3minutes === 'done' ? 'Program complete!'
              : `${phase3minutes} min run`}
          </h2>
          <p className={styles.sessionDesc}>Target: 11–12 min/mile — easy, conversational pace.</p>
          {phase3minutes && phase3minutes !== 'done' && !isTodayComplete && (
            <button className={styles.primaryBtn + ' ' + styles.runBtn} onClick={onRunComplete}>
              Log this run
            </button>
          )}
        </>
      )}

      {pendingPainResult && painData && (
        <div className={`${styles.painResult} ${styles[`painResult_${painData.color}`]} fade-in`}>
          <strong>{painData.label}</strong>
          {painData.warning && <p>{painData.warning}</p>}
          {painData.note && <p>{painData.note}</p>}
        </div>
      )}
    </div>
  )
}

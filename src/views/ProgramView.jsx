import { useState } from 'react'
import { STRENGTH_EXERCISES, RUN_PHASES, DAY_NAMES } from '../data/program'
import styles from './ProgramView.module.css'

const TYPE_OPTIONS = ['strength', 'run', 'rest']

export default function ProgramView({ program }) {
  const [tab, setTab] = useState('run')
  const { state, getCurrentRunPhaseData, getCurrentRunStageData, updateSettings } = program
  const currentPhase = getCurrentRunPhaseData()
  const currentStage = getCurrentRunStageData()

  return (
    <div className={styles.page + ' page-scroll'}>
      <div className={styles.header}>
        <h1 className={styles.title}>Program</h1>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tabBtn} ${tab === 'run' ? styles.tabActive : ''}`} onClick={() => setTab('run')}>
          Running
        </button>
        <button className={`${styles.tabBtn} ${tab === 'strength' ? styles.tabActive : ''}`} onClick={() => setTab('strength')}>
          Strength
        </button>
        <button className={`${styles.tabBtn} ${tab === 'schedule' ? styles.tabActive : ''}`} onClick={() => setTab('schedule')}>
          Schedule
        </button>
      </div>

      {tab === 'run' && (
        <RunProgram currentPhase={currentPhase} currentStage={currentStage} programState={state} />
      )}
      {tab === 'strength' && <StrengthProgram />}
      {tab === 'schedule' && (
        <ScheduleEditor weekPattern={state.weekPattern} onSave={weekPattern => updateSettings({ weekPattern })} />
      )}
    </div>
  )
}

function RunProgram({ currentPhase, currentStage, programState }) {
  return (
    <div className={styles.section}>
      {/* Phase progress */}
      <div className={styles.phaseNav}>
        {RUN_PHASES.map((ph, i) => {
          const isCurrent = ph.phase === currentPhase.phase
          const isDone = ph.phase < currentPhase.phase
          return (
            <div key={ph.id} className={`${styles.phaseStep} ${isCurrent ? styles.phaseCurrent : ''} ${isDone ? styles.phaseDone : ''}`}>
              <div className={styles.phaseCircle}>
                {isDone
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><polyline points="5,12 10,17 19,8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  : ph.phase
                }
              </div>
              <span className={styles.phaseLabel}>{ph.name}</span>
              {i < RUN_PHASES.length - 1 && <div className={`${styles.phaseConnector} ${isDone ? styles.phaseConnectorDone : ''}`} />}
            </div>
          )
        })}
      </div>

      {/* Current phase detail */}
      <div className={styles.phaseCard}>
        <div className={styles.phaseTag}>Current phase</div>
        <h2 className={styles.phaseTitle}>Phase {currentPhase.phase}: {currentPhase.name}</h2>
        <p className={styles.phaseDesc}>{currentPhase.description}</p>

        {currentPhase.type === 'stages' && currentPhase.stages && (
          <div className={styles.stageList}>
            {currentPhase.stages.map((s, i) => {
              const isCurrent = currentStage && s.id === currentStage.id
              const isDone = currentStage && currentPhase.stages.indexOf(currentStage) > i
              return (
                <div key={s.id} className={`${styles.stageRow} ${isCurrent ? styles.stageCurrent : ''} ${isDone ? styles.stageDone : ''}`}>
                  <div className={styles.stageMarker}>{isDone ? '✓' : `${s.stage}`}</div>
                  <div className={styles.stageInfo}>
                    {s.note
                      ? <span className={styles.stageDesc}>{s.note}</span>
                      : <span className={styles.stageDesc}>{s.walk}m walk / {s.jog}m jog × {s.reps} = {s.totalMin} min</span>
                    }
                  </div>
                  {isCurrent && <span className={styles.currentTag}>Now</span>}
                </div>
              )
            })}
          </div>
        )}

        {currentPhase.type === 'schedule' && (
          <Phase3Schedule weeks={currentPhase.weeks} />
        )}
      </div>

      {/* Phase II overview even when in phase I */}
      {currentPhase.phase === 1 && (
        <div className={styles.upNextCard}>
          <div className={styles.upNextLabel}>Up next</div>
          <h3 className={styles.upNextTitle}>Phase 2: Walk/Jog Progression</h3>
          <div className={styles.stageList}>
            {RUN_PHASES[1].stages.map(s => (
              <div key={s.id} className={styles.stageRow}>
                <div className={styles.stageMarker}>{s.stage}</div>
                <div className={styles.stageInfo}>
                  {s.note
                    ? <span className={styles.stageDesc}>{s.note}</span>
                    : <span className={styles.stageDesc}>{s.walk}m walk / {s.jog}m jog × {s.reps} = {s.totalMin} min</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Phase3Schedule({ weeks }) {
  const DAY = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  return (
    <div className={styles.scheduleTable}>
      <div className={styles.scheduleHeader}>
        <span className={styles.wkLabel}></span>
        {DAY.map((d, i) => <span key={i} className={styles.dayCol}>{d}</span>)}
      </div>
      {weeks.map((week, wi) => (
        <div key={wi} className={styles.scheduleRow}>
          <span className={styles.wkLabel}>Wk {wi + 1}</span>
          {week.map((min, di) => (
            <span key={di} className={`${styles.dayCol} ${min ? styles.runDay : styles.restDay}`}>
              {min ?? '—'}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

function ScheduleEditor({ weekPattern: initial, onSave }) {
  const [pattern, setPattern] = useState([...initial])
  const [saved, setSaved] = useState(false)

  function cycleDay(i) {
    setSaved(false)
    setPattern(prev => {
      const next = [...prev]
      const idx = TYPE_OPTIONS.indexOf(next[i])
      next[i] = TYPE_OPTIONS[(idx + 1) % TYPE_OPTIONS.length]
      return next
    })
  }

  function handleSave() {
    const counts = { strength: 0, run: 0, rest: 0 }
    pattern.forEach(t => counts[t]++)
    if (counts.strength < 2 || counts.run < 2) {
      alert('Schedule at least 2 strength days and 2 run days.')
      return
    }
    onSave(pattern)
    setSaved(true)
  }

  return (
    <div className={styles.section}>
      <div className={styles.scheduleCard}>
        <p className={styles.scheduleDesc}>Tap a day to cycle between Strength, Run, and Rest.</p>
        <div className={styles.patternGrid}>
          {DAY_NAMES.map((d, i) => (
            <button
              key={d}
              className={`${styles.dayBtn} ${styles[`dayBtn_${pattern[i]}`]}`}
              onClick={() => cycleDay(i)}
            >
              <span className={styles.dayBtnName}>{d}</span>
              <span className={styles.dayBtnIcon}>
                {pattern[i] === 'strength' ? '💪' : pattern[i] === 'run' ? '🏃🏻‍♀️' : '🧘🏻‍♀️'}
              </span>
              <span className={styles.dayBtnLabel}>{pattern[i]}</span>
            </button>
          ))}
        </div>
        <button className={styles.saveBtn} onClick={handleSave}>
          {saved ? 'Saved ✓' : 'Save schedule'}
        </button>
      </div>
    </div>
  )
}

function StrengthProgram() {
  const [expanded, setExpanded] = useState(null)
  return (
    <div className={styles.section}>
      <p className={styles.sectionNote}>3 sessions per week · All exercises each session</p>
      {STRENGTH_EXERCISES.map((ex, i) => (
        <div key={ex.id} className={styles.exCard}>
          <button
            className={styles.exCardHeader}
            onClick={() => setExpanded(expanded === ex.id ? null : ex.id)}
          >
            <span className={styles.exCardNum}>{i + 1}</span>
            <div className={styles.exCardInfo}>
              <span className={styles.exCardName}>{ex.name}</span>
              <span className={styles.exCardMeta}>{ex.category} · {ex.sets}×{ex.repsLabel ?? ex.reps}</span>
            </div>
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: expanded === ex.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, color: 'var(--text-muted)' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {expanded === ex.id && (
            <div className={styles.exCardBody + ' fade-in'}>
              {ex.equipment.length > 0 && (
                <div className={styles.exEquipment}>
                  {ex.equipment.map(e => <span key={e} className={styles.tag}>{e}</span>)}
                </div>
              )}
              <ol className={styles.exInstructions}>
                {ex.instructions.map((step, si) => <li key={si}>{step}</li>)}
              </ol>
              {ex.cue && (
                <div className={styles.exCue}>
                  <span>💡</span> {ex.cue}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

import { useState } from 'react'
import { PAIN_TYPES, RUN_PHASES } from '../data/program'
import styles from './LogView.module.css'

function formatDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  })
}

function EntryBadge({ type }) {
  if (type === 'strength') return <span className={styles.badgeStrength}>Strength</span>
  if (type === 'run') return <span className={styles.badgeRun}>Run</span>
  return null
}

function PainPill({ painType }) {
  if (!painType || painType === 'none') return <span className={styles.pillGood}>Pain-free</span>
  const data = PAIN_TYPES.find(p => p.id === painType)
  if (!data) return null
  const cls = data.color === 'success' ? styles.pillGood : data.color === 'warning' ? styles.pillWarn : styles.pillBad
  return <span className={cls}>{data.label}</span>
}

export default function LogView({ program }) {
  const { log, resetAll, state } = program
  const [confirmReset, setConfirmReset] = useState(false)

  function handleReset() {
    if (confirmReset) {
      resetAll()
      setConfirmReset(false)
    } else {
      setConfirmReset(true)
    }
  }

  return (
    <div className={styles.page + ' page-scroll'}>
      <div className={styles.header}>
        <h1 className={styles.title}>Log</h1>
      </div>

      {/* Settings summary */}
      <div className={styles.settingsCard}>
        <div className={styles.settingRow}>
          <span className={styles.settingLabel}>Run start date</span>
          <span className={styles.settingValue}>
            {state.runStartDate
              ? new Date(state.runStartDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
              : 'Not set'}
          </span>
        </div>
        <div className={styles.settingRow}>
          <span className={styles.settingLabel}>Sessions logged</span>
          <span className={styles.settingValue}>{log.length}</span>
        </div>
        <div className={styles.settingRow}>
          <span className={styles.settingLabel}>Current run phase</span>
          <span className={styles.settingValue}>{RUN_PHASES[state.currentRunPhase]?.name ?? '—'}</span>
        </div>
      </div>

      {/* Log entries */}
      {log.length === 0 ? (
        <div className={styles.empty}>
          <p>No sessions logged yet.</p>
          <p>Complete today's workout to get started.</p>
        </div>
      ) : (
        <div className={styles.entries}>
          {log.map(entry => (
            <div key={entry.id} className={`${styles.entry} ${!entry.completed ? styles.entryIncomplete : ''}`}>
              <div className={styles.entryLeft}>
                <EntryBadge type={entry.type} />
                <span className={styles.entryDate}>{formatDate(entry.date)}</span>
              </div>
              <div className={styles.entryRight}>
                {entry.type === 'run' && <PainPill painType={entry.painType} />}
                {!entry.completed && <span className={styles.pillBad}>Not logged</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reset */}
      <div className={styles.resetSection}>
        {confirmReset ? (
          <div className={styles.resetConfirm + ' fade-in'}>
            <p className={styles.resetWarning}>This will erase all progress and log entries.</p>
            <div className={styles.resetActions}>
              <button className={styles.resetCancel} onClick={() => setConfirmReset(false)}>Cancel</button>
              <button className={styles.resetConfirmBtn} onClick={handleReset}>Yes, reset everything</button>
            </div>
          </div>
        ) : (
          <button className={styles.resetBtn} onClick={handleReset}>Reset all progress</button>
        )}
      </div>
    </div>
  )
}

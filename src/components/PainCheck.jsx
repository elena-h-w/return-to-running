import { useState } from 'react'
import { PAIN_TYPES } from '../data/program'
import styles from './PainCheck.module.css'

export default function PainCheck({ onSubmit, onCancel }) {
  const [selected, setSelected] = useState(null)

  function handleSubmit() {
    if (!selected) return
    onSubmit(selected)
  }

  const selectedData = PAIN_TYPES.find(p => p.id === selected)

  return (
    <div className={styles.overlay}>
      <div className={styles.sheet + ' scale-in'}>
        <div className={styles.handle} />
        <h2 className={styles.title}>How did it feel?</h2>
        <p className={styles.subtitle}>Be honest — this guides your progression.</p>

        <div className={styles.options}>
          {PAIN_TYPES.map(pt => (
            <button
              key={pt.id}
              className={`${styles.option} ${selected === pt.id ? styles.selected : ''} ${styles[pt.color]}`}
              onClick={() => setSelected(pt.id)}
            >
              <span className={styles.optionLabel}>{pt.label}</span>
              <span className={styles.optionDesc}>{pt.description}</span>
            </button>
          ))}
        </div>

        {selectedData?.warning && (
          <div className={styles.warning + ' fade-in'}>
            <span className={styles.warningIcon}>⚠️</span>
            <p>{selectedData.warning}</p>
          </div>
        )}

        {selectedData?.note && (
          <div className={styles.note + ' fade-in'}>
            <p>{selectedData.note}</p>
          </div>
        )}

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onCancel}>Cancel</button>
          <button
            className={styles.submit}
            onClick={handleSubmit}
            disabled={!selected}
          >
            Log Session
          </button>
        </div>
      </div>
    </div>
  )
}

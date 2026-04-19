import { useStorage } from './useStorage'
import { DEFAULT_WEEK_PATTERN, RUN_PHASES } from '../data/program'

const DEFAULT_STATE = {
  runStartDate: '2026-05-01',
  weekPattern: DEFAULT_WEEK_PATTERN,
  currentRunPhase: 0,
  currentRunStage: 0,
  runPhaseConsecutivePainFree: 0,
  setupComplete: false,
}

function dateStr(d) {
  return d.toISOString().slice(0, 10)
}

function dayOfWeek(dateString) {
  // Returns 0=Mon ... 6=Sun (matches our pattern array)
  const d = new Date(dateString + 'T12:00:00')
  return (d.getDay() + 6) % 7
}

export function useProgram() {
  const [state, setState] = useStorage('bot_program', DEFAULT_STATE)
  const [log, setLog] = useStorage('bot_log', [])

  const todayStr = dateStr(new Date())
  const todayDow = dayOfWeek(todayStr)
  const todayType = state.weekPattern[todayDow]

  function getTodayLog() {
    return log.filter(e => e.date === todayStr)
  }

  function isTodayComplete() {
    const entries = getTodayLog()
    if (todayType === 'rest') return true
    if (todayType === 'strength') return entries.some(e => e.type === 'strength' && e.completed)
    if (todayType === 'run') return entries.some(e => e.type === 'run' && e.completed)
    return false
  }

  function getCurrentRunPhaseData() {
    return RUN_PHASES[state.currentRunPhase] ?? RUN_PHASES[0]
  }

  function getCurrentRunStageData() {
    const phase = getCurrentRunPhaseData()
    if (phase.type === 'stages') {
      return phase.stages[state.currentRunStage] ?? phase.stages[0]
    }
    return null
  }

  function getPhase3TodayMinutes() {
    const phase = getCurrentRunPhaseData()
    if (phase.type !== 'schedule' || !state.runStartDate) return null

    const startDate = new Date(state.runStartDate + 'T12:00:00')
    const today = new Date(todayStr + 'T12:00:00')
    const diffDays = Math.floor((today - startDate) / 86400000)

    // Phase 3 starts after phase 1 + 2, compute offset dynamically
    const phase3StartOffset = getPhase3DayOffset()
    const dayInPhase3 = diffDays - phase3StartOffset
    if (dayInPhase3 < 0) return null

    const weekIdx = Math.floor(dayInPhase3 / 7)
    const dayIdx = dayInPhase3 % 7

    if (weekIdx >= phase.weeks.length) return 'done'
    return phase.weeks[weekIdx][dayIdx]
  }

  function getPhase3DayOffset() {
    // Conservative estimate: Phase 1 + Phase 2 each take ~2 weeks
    return 28
  }

  function logSession(entry) {
    const newEntry = {
      id: Date.now(),
      date: todayStr,
      ...entry,
    }
    setLog(prev => [newEntry, ...prev])
    return newEntry
  }

  function completeRun(painTypeId) {
    const painFree = painTypeId === 'none' || painTypeId === 'type-1' || painTypeId === 'type-2'
    const phase = getCurrentRunPhaseData()

    const entry = logSession({
      type: 'run',
      phase: state.currentRunPhase,
      stage: state.currentRunStage,
      phaseId: phase.id,
      painType: painTypeId,
      completed: painFree,
    })

    if (painFree) {
      setState(prev => ({
        ...prev,
        runPhaseConsecutivePainFree: prev.runPhaseConsecutivePainFree + 1,
      }))
    } else if (painTypeId === 'type-3' || painTypeId === 'type-4') {
      setState(prev => ({ ...prev, runPhaseConsecutivePainFree: 0 }))
    }

    return entry
  }

  function advanceRunStage() {
    const phase = getCurrentRunPhaseData()
    setState(prev => {
      if (phase.type === 'stages') {
        const nextStage = prev.currentRunStage + 1
        if (nextStage >= phase.stages.length) {
          // Advance to next phase
          return {
            ...prev,
            currentRunPhase: Math.min(prev.currentRunPhase + 1, RUN_PHASES.length - 1),
            currentRunStage: 0,
            runPhaseConsecutivePainFree: 0,
          }
        }
        return { ...prev, currentRunStage: nextStage, runPhaseConsecutivePainFree: 0 }
      }
      return {
        ...prev,
        currentRunPhase: Math.min(prev.currentRunPhase + 1, RUN_PHASES.length - 1),
        currentRunStage: 0,
        runPhaseConsecutivePainFree: 0,
      }
    })
  }

  function completeStrength() {
    logSession({ type: 'strength', completed: true })
  }

  function updateSettings(updates) {
    setState(prev => ({ ...prev, ...updates, setupComplete: true }))
  }

  function resetAll() {
    setState(DEFAULT_STATE)
    setLog([])
  }

  return {
    state,
    log,
    todayStr,
    todayType,
    todayDow,
    isTodayComplete: isTodayComplete(),
    getTodayLog,
    getCurrentRunPhaseData,
    getCurrentRunStageData,
    getPhase3TodayMinutes,
    completeRun,
    advanceRunStage,
    completeStrength,
    updateSettings,
    resetAll,
    canAdvanceRun: state.runPhaseConsecutivePainFree >= 2,
  }
}

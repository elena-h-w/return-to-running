// ─── Strength Program ───────────────────────────────────────────────────────

export const STRENGTH_EXERCISES = [
  {
    id: 'dead-bug',
    name: 'Dead Bug',
    category: 'Core Stabilization',
    sets: 2,
    reps: 15,
    equipment: [],
    instructions: [
      'Lie on your back and bring your legs up to tabletop position — hips and knees at 90°.',
      'Raise your arms straight up toward the ceiling.',
      'Keeping your back flat, slowly lower your opposite arm and leg toward the floor.',
      'Do not let your back arch. Return to start, then switch sides.',
      'That is one rep. Keep breathing throughout.',
    ],
    cue: 'Press your lower back into the floor the entire time.',
  },
  {
    id: 'bird-dog',
    name: 'Bird Dog',
    category: 'Core Stabilization',
    sets: 3,
    reps: 10,
    equipment: [],
    instructions: [
      'Start on hands and knees — hands under shoulders, knees under hips.',
      'Tighten your core.',
      'Extend your opposite arm and leg simultaneously, keeping your torso level.',
      'Do not let your hips rotate or drop.',
      'Return to start and repeat on the other side.',
    ],
    cue: 'Imagine balancing a glass of water on your lower back.',
  },
  {
    id: 'clamshell-plank',
    name: 'Clamshell in Side Plank',
    category: 'Hip External Rotation',
    sets: 3,
    reps: 10,
    equipment: ['Resistance band (above knees)'],
    instructions: [
      'Lie on your side with knees bent and feet stacked.',
      'Tie resistance band around thighs, just above your knees.',
      'Prop up on your forearm with elbow under your shoulder.',
      'Tighten core and glutes, then lift your hips off the floor.',
      'Holding the side plank, lift your top knee up while keeping feet together.',
      'Lower slowly and repeat.',
    ],
    cue: 'Keep your hips square — don\'t let them roll back.',
  },
  {
    id: 'hip-abduction-lying',
    name: 'Hip Abduction — Side Lying',
    category: 'Hip Strengthening',
    sets: 3,
    reps: 10,
    equipment: ['Resistance band (at ankles)'],
    instructions: [
      'Lie on your side with your affected leg on top.',
      'Tie resistance band around both ankles.',
      'Keeping your top leg straight, lift it directly upward against the band.',
      'Slowly lower it back down, controlling the movement.',
      'Relax and repeat.',
    ],
    cue: 'Toes should point forward — not toward the ceiling.',
  },
  {
    id: 'hip-extension-standing',
    name: 'Hip Extension — Standing',
    category: 'Hip Strengthening',
    sets: 3,
    reps: 10,
    equipment: ['Resistance band (at ankles)'],
    instructions: [
      'Stand upright with band around your ankles.',
      'Keeping your body straight, move your affected leg backward, driving the movement from your glute.',
      'Make sure your knee stays straight.',
      'Control the movement back to start and repeat.',
    ],
    cue: 'Don\'t lean forward — stay tall.',
  },
  {
    id: 'lateral-band-walk',
    name: 'Lateral Band Walk',
    category: 'Hip Strengthening',
    sets: 3,
    reps: 15,
    repsLabel: '15 steps each direction',
    equipment: ['Resistance band (above knees)'],
    instructions: [
      'Stand with band around both legs, just above the knees.',
      'Feet hip-width apart — there should be some tension in the band.',
      'Keeping back straight, bend knees slightly into a mini-squat.',
      'Step sideways one direction for 15 steps, then reverse.',
      'Raise arms overhead as tolerated.',
    ],
    cue: 'Stay low — don\'t stand up between steps.',
  },
  {
    id: 'prone-y',
    name: 'Scapular Retraction — Prone Y',
    category: 'Shoulder / Upper Back',
    sets: 3,
    reps: 10,
    equipment: [],
    instructions: [
      'Lie face down with your forehead resting on a small towel.',
      'Extend your arms in a Y shape — diagonally up and away from you.',
      'Rotate your forearms so palms face forward.',
      'Squeeze your shoulder blades together, then lift your arms off the floor.',
      'Hold briefly, then lower slowly.',
    ],
    cue: 'Lead the movement from your shoulder blades, not your hands.',
  },
  {
    id: 'prone-t-weight',
    name: 'Scapular Retraction — Prone T with Weight',
    category: 'Shoulder / Upper Back',
    sets: 3,
    reps: 10,
    equipment: ['Light weights (e.g., 1–2 lb)'],
    instructions: [
      'Lie face down with your forehead on a small towel.',
      'Hold a light weight in each hand, arms out to the sides in a T shape.',
      'Rotate forearms so palms face forward.',
      'Keep chest and head in contact with the floor.',
      'Squeeze shoulder blades together, then lift your arms.',
      'Hold briefly, lower slowly.',
    ],
    cue: 'Keep the movement controlled — this is not about weight.',
  },
  {
    id: 'band-row',
    name: 'Band Row',
    category: 'Shoulder / Upper Back',
    sets: 3,
    reps: 10,
    equipment: ['Resistance band (chest height, anchored)'],
    instructions: [
      'Tie band around a solid object at chest height. Hold one end in each hand.',
      'Stand with feet hip-width apart, good upright posture.',
      'Bend your elbows and pull the band back, squeezing your shoulder blades together.',
      'Control the return to start.',
      'Keep your core strong throughout.',
    ],
    cue: 'Think about putting your shoulder blades in your back pockets.',
  },
  {
    id: 'trx-row',
    name: 'TRX Inverted Row',
    category: 'Shoulder / Upper Back',
    sets: 3,
    reps: 8,
    equipment: ['TRX suspension trainer'],
    instructions: [
      'Stand facing the TRX anchor. Grasp handles in each hand.',
      'Walk feet forward and lean back — body should be in a straight line, pivoting on your heels.',
      'Hold arms straight in front of you, palms facing down.',
      'Pull yourself up toward the handles, keeping body rigid.',
      'At the top, thumbs point up. Lower slowly to start.',
    ],
    cue: 'The more you lean back, the harder it is.',
  },
  {
    id: 'wall-clamshell',
    name: 'Wall Clamshell',
    category: 'Hip External Rotation',
    sets: 3,
    reps: 10,
    equipment: ['Resistance band (above knees)'],
    instructions: [
      'Place resistance band around legs, slightly above the knees.',
      'Stand in front of a wall, about arm\'s length away.',
      'Step forward with one foot, keeping that knee slightly bent.',
      'Place the opposite foot on the wall behind you.',
      'Push hips back into a hip hinge without touching the wall.',
      'Open the non-standing leg out and back against the band. Return slowly.',
    ],
    cue: 'Use the wall only for balance — keep your core engaged.',
  },
]

// ─── Run Program ─────────────────────────────────────────────────────────────

export const RUN_PHASES = [
  {
    id: 'phase-1',
    phase: 1,
    name: 'Walking Base',
    description: 'Walk pain-free at 4.0–4.5 mph on a treadmill. Log walks daily and mark ready to advance when comfortable at target pace.',
    type: 'open',
    advanceCondition: 'User confirms comfortable walking at target pace with no pain or stiffness.',
  },
  {
    id: 'phase-2',
    phase: 2,
    name: 'Walk / Jog Progression',
    description: 'Alternate walking and jogging intervals. Advance only when each stage is fully pain-free with no morning stiffness.',
    type: 'stages',
    stages: [
      { id: 'p2s1', stage: 'I',   walk: 5, jog: 1, reps: 5, totalMin: 30 },
      { id: 'p2s2', stage: 'II',  walk: 4, jog: 2, reps: 5, totalMin: 30 },
      { id: 'p2s3', stage: 'III', walk: 3, jog: 3, reps: 5, totalMin: 30 },
      { id: 'p2s4', stage: 'IV',  walk: 2, jog: 4, reps: 5, totalMin: 30 },
      { id: 'p2s5', stage: 'V',   walk: 5, jog: 30, reps: 1, totalMin: 40, note: '5 min walk warm-up + 30 min jog + 5 min walk cool-down' },
    ],
  },
  {
    id: 'phase-3',
    phase: 3,
    name: 'Timed Running',
    description: 'Target pace: 11–12 min/mile — easy, conversational effort. Cross-train or rest on off days.',
    type: 'schedule',
    // null = rest/cross-train day
    weeks: [
      // Week: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
      [30, null, 30, null, 30, null, 35],   // Wk 1
      [null, 30, null, 30, null, 35, null], // Wk 2
      [35, null, 30, null, 35, null, 35],   // Wk 3
      [null, 35, null, 40, null, 35, null], // Wk 4
      [35, null, 40, null, 40, null, 35],   // Wk 5
      [null, 40, null, 40, null, 40, null], // Wk 6
      [45, null, 40, null, 40, null, 45],   // Wk 7
      [null, 45, null, 40, null, 45, 30],   // Wk 8
      [null, 45, 35, null, 45, 40, null],   // Wk 9
      [45, 45, null, 45, 45, 30, null],     // Wk 10
      [45, 45, 35, null, 45, 45, 40],       // Wk 11
      [null, 45, 45, 45, null, 45, 45],     // Wk 12
    ],
  },
]

// ─── Pain Protocol ────────────────────────────────────────────────────────────

export const PAIN_TYPES = [
  {
    id: 'none',
    label: 'No pain',
    description: 'Felt great — no discomfort at all.',
    allowAdvance: true,
    color: 'success',
  },
  {
    id: 'type-1',
    label: 'Type I — After activity only',
    description: 'Pain appeared only after the activity and resolved within 24 hours.',
    allowAdvance: true,
    color: 'warning',
    note: 'Log and monitor. Do not advance if recurring.',
  },
  {
    id: 'type-2',
    label: 'Type II — Start then gone',
    description: 'Discomfort at the start of activity but disappeared once warmed up.',
    allowAdvance: true,
    color: 'warning',
    note: 'Log and monitor. Acceptable to continue.',
  },
  {
    id: 'type-3',
    label: 'Type III — Developed and worsened',
    description: 'Pain came on during the session and got worse as you continued.',
    allowAdvance: false,
    color: 'danger',
    warning: 'Do not advance. Rest and allow full recovery before next session. Consult your provider if it persists.',
  },
  {
    id: 'type-4',
    label: 'Type IV — Nighttime / woke you',
    description: 'Pain at night or pain that woke you from sleep.',
    allowAdvance: false,
    color: 'danger',
    warning: 'Stop the program. Consult your healthcare provider before resuming any running.',
  },
]

// ─── Schedule Template ────────────────────────────────────────────────────────

export const DEFAULT_WEEK_PATTERN = [
  'strength', // Mon
  'run',      // Tue
  'strength', // Wed
  'run',      // Thu
  'strength', // Fri
  'run',      // Sat
  'rest',     // Sun
]

export const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const DAY_NAMES_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

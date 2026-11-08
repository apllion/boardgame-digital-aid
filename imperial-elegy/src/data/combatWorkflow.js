// Step-by-step combat workflows for wartime

export const LAND_BATTLE_WORKFLOW = [
  {
    step: 1,
    title: 'Declare Attack',
    detail: 'Spend 1 CP. Name the space you are attacking. Limit: once per space, per impulse.',
    notes: [
      'Attacker is the player whose units moved into the space (or who initiated).',
      'Both sides reveal all units in the space.',
      'If a decoy is present, it is eliminated immediately.',
    ],
  },
  {
    step: 2,
    title: 'Place Battle Chit',
    detail: 'Mark the space with a battle chit. Choose main attacker and main defender forces.',
    notes: [
      'Main force = the armies in the battle space itself.',
      'Supporting forces are declared in the next step.',
    ],
  },
  {
    step: 3,
    title: 'Calculate BDRM (Battle Die Roll Modifier)',
    detail: 'Sum all applicable modifiers. One side will add the total BDRM to their die roll.',
    substeps: [
      {
        label: 'A. Firepower',
        detail: '+X DRM, where X = main force total FP (NOT supporting FP). Each full-strength army = 1 FP, reduced = 1 FP. EFs: 2 FP vs rebels, 0 FP vs armies.',
      },
      {
        label: 'B. Declare Support (attacker first)',
        detail: 'Max 2 supporting spaces per side. Adjacent to BOTH spaces: all armies support. Adjacent to ONE space: 1 army supports. Half FP if: via difficult connection, different power, into/from RU home space, or trench battle.',
      },
      {
        label: 'C. Commit Elite Unit (attacker first)',
        detail: '+1 DRM. One Elite Corps or Colonial per side, must be in main force.',
      },
      {
        label: 'D. Play Combat Cards (attacker first)',
        detail: 'Play combat cards from hand. Apply their effects to the BDRM.',
      },
      {
        label: 'E. Other Modifiers',
        detail: 'Check and apply all other applicable modifiers.',
        modifiers: [
          { name: 'Low Stability', value: '-1 or -2 (check stability track)' },
          { name: 'Difficult/Severe connection', value: '-1 (attacker only)' },
          { name: 'Only reduced armies', value: '-1 (unless defending in a fort)' },
          { name: 'Amphibious assault', value: '-1 (attacker only)' },
          { name: 'Broken LoC', value: '-1' },
          { name: 'Jihad', value: '-1' },
          { name: 'Manpower exhausted (GW)', value: '-1' },
          { name: 'Machine Guns', value: 'minimum die roll of 3 for non-rebel units' },
        ],
      },
    ],
  },
  {
    step: 4,
    title: 'Roll Dice',
    detail: 'Each side rolls 1d6. The side with the BDRM advantage adds it to their roll.',
    notes: [
      'If BDRM is positive: attacker adds it.',
      'If BDRM is negative: defender adds absolute value.',
      'If BDRM is zero: no modifier, just compare rolls.',
    ],
  },
  {
    step: 5,
    title: 'Determine Differential & Consult CRT',
    detail: 'Subtract the lower roll from the higher. Check which side rolled higher. Find the row on the CRT.',
    crt: true,
  },
  {
    step: 6,
    title: 'Apply Results',
    detail: 'Apply casualties (Att/Def losses), determine victor, and resolve retreat.',
    notes: [
      'Victor is listed on the CRT row.',
      'Loser must retreat (if able). Attacker retreats to the space they came from.',
      'Dreadnoughts must take the majority of naval losses.',
      '* (Hydraulic Recoil): victor may opt to inflict +1 loss to BOTH sides.',
      '** (Hydraulic Recoil): both sides take +1 loss.',
    ],
  },
  {
    step: 7,
    title: 'Check for Decisive Battle',
    detail: 'If the differential was 4+, the battle is decisive.',
    notes: [
      'Attacker bonus (land, once per impulse): may fight again in same space OR advance 1 space.',
      'Defender has no decisive bonus.',
      'In trench battles: decisive only causes stability loss, no bonus action.',
      'Loser: -1 stability (if force contained 2+ units).',
    ],
  },
]

export const NAVAL_BATTLE_WORKFLOW = [
  {
    step: 1,
    title: 'Naval Movement',
    detail: 'Spend 1 CP for Naval Movement. Move fleets into a naval box.',
    notes: [
      'You may move all fleets and 1 army.',
      'Moving into a box with enemy units triggers combat.',
    ],
  },
  {
    step: 2,
    title: 'Check for Interception [19.1]',
    detail: 'Enemy units in ports adjacent to the naval box may attempt to intercept.',
    notes: [
      'Roll 1d6, needs 5+ to intercept.',
      'Multiple players/ports can intercept separately.',
      'Intercepting units can NEVER be intercepted themselves.',
      'Active player (mover) is ALWAYS the attacker.',
    ],
    modifiers: [
      { name: 'Interceptor has 3+ friendly ports adjacent', value: '+1' },
      { name: 'Moving units have NO friendly ports adjacent', value: '+1' },
      { name: 'Friendly naval units already in the box', value: '+1' },
      { name: 'UK intercepting into North Atlantic', value: '+1' },
    ],
  },
  {
    step: 3,
    title: 'Defender May Avoid Battle [19.2]',
    detail: 'Defending units may attempt to avoid battle by retreating (roll 5+).',
    notes: [
      'Defender declares destination (friendly port or naval box) BEFORE rolling.',
      'Success: units retreat, attacker CANNOT continue moving.',
      'Failure: battle proceeds, defender gets -1 DRM for failing to avoid.',
      'Units that intercepted or were intercepted cannot avoid.',
      'Cannot avoid through Gibraltar, Dardanelles, or canals unless friendly.',
    ],
    modifiers: [
      { name: 'In an ocean box (not Med, Baltic, Black Sea)', value: '+1' },
      { name: 'Attacker has NO friendly ports adjacent', value: '+1' },
      { name: 'Attacker has 2+ more ports than defender', value: '-1' },
    ],
  },
  {
    step: 4,
    title: 'Calculate BDRM (Naval)',
    detail: 'Sum all applicable naval combat modifiers.',
    substeps: [
      {
        label: 'A. Firepower',
        detail: "+X DRM, where X = side's total FP. Squadron FP is HALVED when fighting Dreadnoughts.",
      },
      {
        label: 'B. Play Combat Cards (attacker first)',
        detail: 'Play combat cards from hand.',
      },
      {
        label: 'C. Other Modifiers',
        detail: 'Check and apply all other applicable modifiers.',
        modifiers: [
          { name: 'Low Stability', value: '-1 or -2 (check stability track)' },
          { name: 'No friendly ports adjacent', value: '-2' },
          { name: '2+ more ports than opponent', value: '+1' },
          { name: 'Only reduced units in battle', value: '-1' },
          { name: 'Failed to avoid battle', value: '-1' },
          { name: 'Manpower exhausted (GW)', value: '-1' },
        ],
      },
    ],
  },
  {
    step: 5,
    title: 'Roll Dice & Consult CRT',
    detail: 'Same as land battle: each side rolls 1d6, add BDRM, find differential on CRT.',
    crt: true,
  },
  {
    step: 6,
    title: 'Apply Results',
    detail: 'Apply casualties and determine victor.',
    notes: [
      'Dreadnoughts must take the MAJORITY of losses.',
      'Decisive (4+ differential): losing side DOUBLES its losses.',
      'Loser retreats to a friendly port or adjacent naval box.',
      'Only the loser must retreat in naval combat.',
    ],
  },
  {
    step: 7,
    title: 'After Battle',
    detail: 'Resolve remaining movement and check for further actions.',
    notes: [
      'Active player may continue naval movement (unless defender successfully avoided).',
      'Naval decisive: allows continued movement through European Waters.',
      'Check if amphibious assault is now possible (if attacking a port).',
    ],
  },
]

export const TRENCH_BATTLE_NOTES = [
  'GW Turn 1+: all keys automatically have trenches.',
  'Attacker must have a full-strength army in main force to attack a trench.',
  'Attacker automatically takes an additional loss.',
  'Supporting units have HALVED FP in trench battles.',
  'Three trench statuses: Trench (default) → Breakthrough (after retreat) → Deadlock.',
  'Track original attacker and defender — the "attacker" in a trench battle may not be the original attacker.',
]

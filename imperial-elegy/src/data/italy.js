// Italy subsystem reference data [22.0]
// Covers: mandatory event, unification, Kingdom of Italy, wars of unification, redeployment

export const ITALY_PHASES = [
  {
    phase: 1,
    name: 'Divided Italy',
    description: 'Two separate minors: Sardinia-Piedmont and Kingdom of the Two Sicilies. Each can be diplomatized/allied independently.',
    keyMechanic: 'Italy Mandatory Event card drives the unification process.',
  },
  {
    phase: 2,
    name: 'Unification Process',
    description: 'Mandatory event triggers rolls on the Italian Minor Power Table. Internal wars and nationalist waves push toward unification.',
    keyMechanic: 'If one side holds 3+ keys, roll for unification (d6, need ≥7 with modifiers).',
  },
  {
    phase: 3,
    name: 'Kingdom of Italy',
    description: 'Unified nation with own army, navy, reserves. Uses Kingdom of Italy Table for future events.',
    keyMechanic: 'Italian Redeployment rules. Can be pulled into TA or TE via MPIT.',
  },
]

export const ITALIAN_MINOR_POWER_TABLE = {
  ref: '22.0',
  drms: [
    { modifier: '+2', condition: 'No player-controlled spaces in Italy' },
    { modifier: '+1', condition: 'Per key controlled by Italian minor power with 2nd most influence' },
  ],
  drmNote: 'The player who dominates the Italy Flashpoint controls and may apply the DRM.',
  results: [
    {
      roll: 1,
      name: 'A Lost Cause',
      summary: 'Remove the Italy Card from the game. Unification is dead.',
      steps: ['Remove the Italy Card from the game permanently.'],
    },
    {
      roll: 2,
      name: 'Petition for Aid',
      summary: 'Italian state petitions a foreign power for aid.',
      steps: [
        'Check: Is Sardinia-Piedmont or Two Sicilies allied with a player who controls an Italian unification space?',
        'If YES: Active player places that player\'s alliance marker on Italy. Take control of Piedmont and Sardinia (if not already). Gain 1 EF in Italy if they gained the +1 card marker.',
        'If NO: Active player gains control of the Italian card.',
      ],
    },
    {
      roll: '3–5',
      name: 'Internal Italian War',
      summary: 'One Italian state conquers another\'s key. May trigger unification roll.',
      steps: [
        'Choose either Sardinia-Piedmont or Kingdom of Two Sicilies.',
        'That power gains 1 army + 1 naval squadron.',
        'Takes control of a neighboring Italian key not controlled by a player (only 1 available each).',
        'Eliminate all minor power armies in the conquered space.',
        'If that side now controls 3+ Italian keys → roll for Italian Unification.',
      ],
    },
    {
      roll: 6,
      name: 'Nationalist Wave',
      summary: 'One state takes all uncontrolled Italian keys. Fast-track to unification.',
      steps: [
        'Choose either Sardinia-Piedmont or Kingdom of Two Sicilies.',
        'That power gains 1 army.',
        'Takes control of ALL Italian key spaces not controlled by a player.',
        'Active player chooses where the army is placed.',
      ],
    },
  ],
}

export const UNIFICATION_DIE_ROLL = {
  target: '≥ 7 on d6',
  note: 'Base roll alone can never succeed (max 6). Modifiers are mandatory.',
  modifiers: [
    { modifier: '+2', condition: 'No player-controlled spaces in Italy' },
    { modifier: '+1', condition: 'Per key controlled by Italian minor power with 2nd most influence' },
  ],
  onSuccess: 'Italy immediately unifies. Set MPIT influence. Switch to Kingdom of Italy Table.',
  onFailure: 'Italy does not unify. End procedure. Try again next time mandatory event fires.',
}

export const KINGDOM_OF_ITALY_TABLE = {
  ref: 'Post-unification',
  note: 'Used instead of Italian Minor Power Table after unification.',
  results: [
    { roll: 1, name: 'The King Vacillates', effect: 'Italy gains 2 neutral influences on MPT.' },
    { roll: 2, name: 'Expand', effect: 'Active player places an Italian control marker on an uncontrolled Italian key.' },
    { roll: 3, name: 'Reserve Army', effect: 'Italy permanently gains an additional reserve army.' },
    { roll: 4, name: 'Reserve Army', effect: 'Italy permanently gains an additional reserve army.' },
    { roll: 5, name: 'Reserve Army + Expand', effect: 'Italy permanently gains an additional reserve army + active player places Italian control marker on uncontrolled key.' },
  ],
}

export const ITALIAN_WARS_OF_UNIFICATION = {
  ref: '13.2.1',
  prerequisite: 'Major power must have diplomacy or alliance with Sardinia-Piedmont or Two Sicilies.',
  procedure: [
    'Declare which Italian state gets the Kingdom (Sardinia-Piedmont or Two Sicilies)',
    'Give all power to that faction (if not already done)',
    'War aim = Unification (no WTT increase, no stability loss)',
    'Fight the war',
  ],
  whoCanDo: 'Any major power with diplomacy/alliance. FR and AU most common (Minor Power Alliance Table: Italy → 1st choice FR/AU*).',
  vsMandatoryEvent: 'Internal Italian War can also trigger unification without a major power declaring war — it\'s an internal process.',
}

export const ITALIAN_REDEPLOYMENT = {
  rules: [
    'Standing armies placed in spaces adjacent to Rome in the Italian peninsula',
    'Standing army placed with an Italian army in each space',
    'Naval units always placed in Naples if possible',
    'Piedmont is NOT considered in Italian redeployment',
  ],
}

export const ITALY_FLASHPOINT = {
  condition: 'Control 4 keys',
  reward: '+1 card',
  dominance: 'Player who dominates Italy controls the Flashpoint and applies DRMs to the mandatory event roll.',
  mpitInteractions: [
    'Kingdom Table roll 1 (King Vacillates): 2 neutral influences on MPT',
    'After unification, MPIT influence is set based on outcome',
    'Italy can be pulled into TA or TE',
    'If Italy attacked and player refuses to join: 10 neutral MPIT influence per refuser',
  ],
  allianceTableChoices: { first: 'FR/AU*', second: 'Germany', third: 'UK' },
}

// Designer rulings from BGG forums (ColonelMPanther = Michael Lorino)
export const ITALY_DESIGNER_RULINGS = [
  {
    topic: 'Unification War',
    ruling: 'Italian unification war aims must be adjacent to EACH OTHER, not to the ally marker.',
    source: 'https://boardgamegeek.com/thread/3722497',
  },
  {
    topic: 'Uprising',
    ruling: 'Rebel and player armies CAN coexist in the same space — no automatic battle occurs.',
    source: 'https://boardgamegeek.com/thread/3767214',
  },
  {
    topic: 'Uprising',
    ruling: 'Uprising only affects PLAYER CONTROLLED spaces, not allied spaces. Allies give control only for flashpoint domination.',
    source: 'https://boardgamegeek.com/thread/3662984',
  },
  {
    topic: 'Uprising',
    ruling: 'Fort does nothing for rebels — it still belongs to the player when rebels appear.',
    source: 'https://boardgamegeek.com/thread/3662984',
  },
  {
    topic: 'AU & Italy',
    ruling: 'AU Italian full citizenship covers ALL Italian minor powers, but AU can only absorb one at a time.',
    source: 'https://boardgamegeek.com/thread/3651335',
  },
  {
    topic: 'AU & Italy',
    ruling: 'AU citizenship does NOT prevent Italian revolts from the mandatory Italy card. Internal war happens regardless of alliances.',
    source: 'https://boardgamegeek.com/thread/3649975',
  },
  {
    topic: 'AU & Italy',
    ruling: 'AU Arbiter of Italy lets them declare wars of liberation targeting Italian spaces even without rebels present.',
    source: 'https://boardgamegeek.com/thread/3702734',
  },
  {
    topic: 'Unification',
    ruling: 'If Rome is player-controlled when Italy unifies, unified Italy has NO capital. Can only be eliminated by stability reaching 0.',
    source: 'https://boardgamegeek.com/thread/3651335',
  },
  {
    topic: 'Internal War',
    ruling: 'Minor powers still receive units even if no uncontrolled space to take (e.g., all spaces player-controlled).',
    source: 'https://boardgamegeek.com/thread/3684244',
  },
  {
    topic: 'Nationalist Wave',
    ruling: 'When an Italian minor takes another\'s space via Nationalist Wave, ally markers on the absorbed space are REMOVED.',
    source: 'https://boardgamegeek.com/thread/3634342',
  },
  {
    topic: 'Unification',
    ruling: 'The unification roll only has POSITIVE modifiers — there are no negative DRMs.',
    source: 'https://boardgamegeek.com/thread/3716606',
  },
  {
    topic: 'Flashpoint',
    ruling: '+1 card from Italy is only from winning an actual war of unification — NOT from Nationalist Wave result.',
    source: 'https://boardgamegeek.com/thread/3634342',
  },
  {
    topic: 'Flashpoint',
    ruling: 'If playing Papal Influence is what CREATES your flashpoint control, you do NOT get the +1 card from that same action.',
    source: 'https://boardgamegeek.com/thread/3642292',
  },
  {
    topic: 'Redeployment',
    ruling: 'Italian army in Tuscany in 1870 scenario redeploys to Rome during End Phase.',
    source: 'https://boardgamegeek.com/thread/3752613',
  },
  {
    topic: 'Control',
    ruling: 'Cannot place a control marker on an independent minor power using CP actions — only diplomacy markers.',
    source: 'https://boardgamegeek.com/thread/3748767',
  },
]

export const ITALY_GOTCHAS = [
  { mistake: 'Unification roll succeeds on raw d6', correction: 'Need ≥7 on d6. Base roll alone can never unify. Modifiers are mandatory.' },
  { mistake: 'Ignoring active player choice', correction: 'In Internal Italian War and Nationalist Wave, active player picks which Italian state benefits. Strategic choice.' },
  { mistake: '3+ keys = automatic unification', correction: '3+ keys triggers the die roll attempt. It can still fail.' },
  { mistake: 'Deploying to Piedmont after unification', correction: 'Piedmont excluded from Italian redeployment. Armies go around Rome.' },
  { mistake: 'Playing Italy card after A Lost Cause', correction: 'Roll 1 removes Italy card permanently. Unification is dead.' },
  { mistake: 'Underestimating Italy refusal penalty', correction: '10 neutral MPIT influence per refuser. Can shatter alliances.' },
  { mistake: 'Mixing up the two tables', correction: 'Before unification: Italian Minor Power Table. After: Kingdom of Italy Table.' },
  { mistake: '"Dominates Italy" = allied with Italian minor', correction: 'Means whoever controls the Italy Flashpoint, not necessarily the allied player.' },
  { mistake: 'Keeping minor armies after Internal War', correction: 'All minor power armies in the conquered space are eliminated.' },
  { mistake: 'War of unification without diplomacy/alliance', correction: 'Must have diplomacy or alliance on Sardinia-Piedmont or Two Sicilies first.' },
]

// Imperial Elegy Bot Rules - transcribed from Bot PAC and Rulebook 34.0

// Colors from rulebook: "dark gray for GE, red for UK, blue for FR, yellow for AU, white for RU, green for OT"
export const POWERS = {
  GE: { id: 'GE', name: 'Germany/Prussia', short: 'GE', color: '#5a5a5a', bgColor: '#3a3a3a', textColor: '#e0e0e0' },
  UK: { id: 'UK', name: 'United Kingdom', short: 'UK', color: '#c0392b', bgColor: '#922b21', textColor: '#ffffff' },
  FR: { id: 'FR', name: 'France', short: 'FR', color: '#2e5ea8', bgColor: '#1e3f7a', textColor: '#ffffff' },
  AU: { id: 'AU', name: 'Austria-Hungary', short: 'AU', color: '#d4a017', bgColor: '#b8860b', textColor: '#000000' },
  RU: { id: 'RU', name: 'Russia', short: 'RU', color: '#d5d0c0', bgColor: '#c0bba8', textColor: '#000000' },
  OT: { id: 'OT', name: 'Ottoman Empire', short: 'OT', color: '#3a7d44', bgColor: '#2d6235', textColor: '#ffffff' },
}

export const TURN_ORDER = ['GE', 'UK', 'FR', 'AU', 'RU', 'OT']

export const DIFFICULTY_LEVELS = {
  easy:   { label: 'Easy',   ngs: 3, redeploy: '1 army' },
  normal: { label: 'Normal', ngs: 4, redeploy: '1/2 of all armies' },
  hard:   { label: 'Hard',   ngs: 5, redeploy: 'all armies' },
}

// Home card placement in bot's card pile
export const HOME_CARD_PLACEMENT = {
  GE: 'top',       // GE and OT on top of their pile
  OT: 'top',
  FR: 'shuffled',  // FR, AU, and RU shuffled in
  AU: 'shuffled',
  RU: 'shuffled',
  UK: 'bottom',    // UK on bottom of their pile
}

// Priority 1 Actions (in priority order - check top to bottom)
export const PRIORITY_1_ACTIONS = [
  {
    id: 'home_card_event',
    text: 'Play home card for its event',
    detail: 'See "Home Card Revealed" rules for this power.',
    condition: 'Card revealed is a home card',
  },
  {
    id: 'attack_rebels',
    text: 'Attack rebels / build / move units to attack rebels',
    detail: 'If there are rebels on the map the bot can deal with.',
  },
  {
    id: 'bot_box_event',
    text: 'Play event from Bot Box',
    detail: 'If this power is listed in the Bot Box on the card, play for event. Bots will never play a card that (1) hurts the bot, or (2) hurts one of the bot\'s allies.',
    condition: 'Card has a Bot Box listing this power',
  },
  {
    id: 'industrialize',
    text: 'Industrialize',
    detail: 'Bots with an auto-industry marker will only industrialize with a 1 or 2 CP card.',
  },
  {
    id: 'ge_build_armies',
    text: 'GE special: build armies if able',
    powers: ['GE'],
  },
  {
    id: 'uk_build_dreadnoughts',
    text: 'UK special: build dreadnoughts if able',
    powers: ['UK'],
  },
  {
    id: 'all_build_armies_wtt',
    text: 'All Bots: build armies if WTT \u2265 3',
    detail: 'World Tension Track is 3 or higher.',
  },
]

// Priority 2 Actions (die roll determines action)
export const PRIORITY_2_ACTIONS = [
  {
    id: 'p2_auto_pacify',
    dieRange: null, // automatic unless 5-6 rolled
    text: 'Automatic: spend 1 CP to pacify a space if able',
    detail: 'Unless a 5 or 6 is rolled, bot will automatically spend 1 CP to pacify if they have a land unit in a space with a pacification marker. Pacification attempts with value \u2265 1 always succeed.',
  },
  {
    id: 'p2_1_influence',
    dieRange: [1, 1],
    text: 'Place influence in Asia or Africa based on BDIT',
    detail: 'Step 1: Place influence in Asia or Africa based on BDIT (next page). If unable, place diplomacy on the main map based on BDIT. Step 2: build or move an EF to a space and then attempt to pacify (build instead of moving if able to do so and still pacify).',
  },
  {
    id: 'p2_2_ef',
    dieRange: [2, 2],
    text: 'Build or move an EF to a space, then attempt to pacify',
    detail: 'Build instead of moving if able to do so and still pacify.',
  },
  {
    id: 'p2_3_alliance',
    dieRange: [3, 3],
    text: 'Gain a minor power alliance if able',
    detail: 'Bots only need to spend 2 CP to ally with a minor power. If unable, place and remove diplomacy on the main map based on BDIT (in that order).',
  },
  {
    id: 'p2_34_build',
    dieRange: [3, 4],
    text: 'Build armies (standing before reserves)',
    detail: 'THEN roll a die: (1-3) build a naval unit, (4-5) build a fort, (6) build an EC. The UK bot treats this result as a 1 if they have max armies.',
  },
  {
    id: 'p2_56_event',
    dieRange: [5, 6],
    text: 'Play card for its event',
    detail: 'Unless (1) it hurts the bot, (2) hurts one of the bot\'s allies, or (3) helps one of the bot\'s enemies. Bots will never play a 3 CP event that doesn\'t help them.',
  },
]

// Home Card Revealed rules per power
export const HOME_CARD_REVEALED = {
  GE: {
    title: 'GE Home Card Revealed',
    rules: [
      'Play Bismarck to declare war OR play the next GE card.',
      'GE will only declare war if they have armies equal to their peacetime manpower limit and at least 1 reserve army.',
      'If GE does not declare war, place the GE home card on top of their card pile after playing the next GE card.',
      'Play German General Staff if: (1) this is GE\'s last card and they won\'t declare war, (2) Bismarck is removed, or (3) Germany is unified.',
    ],
    note: 'Do not play for event if stability is at 6 and the event gives player < 3 CPs value.',
  },
  UK: {
    title: 'UK Home Card Revealed',
    rules: [
      'Always play Sun Never Sets.',
      'However, if a war is declared, on a roll of 1-2 play Balance of Power if the UK home card is unplayed.',
    ],
  },
  FR: {
    title: 'FR Home Card Revealed',
    rules: [
      'Roll a die.',
      'On a 1: play Aux Armes, Citoyens!',
      'Otherwise: play City of Lights.',
    ],
  },
  AU: {
    title: 'AU Home Card Revealed',
    rules: [
      'On turn 1: play Habsburg Dynasty.',
      'On later turns: roll a die. On 1-2 play Habsburg Dynasty, otherwise play Kaiserreich.',
      'If AU plays Habsburg Dynasty: roll a die. On a 1-2 declare a war of unification targeting a neighboring space that contains a nationality AU has granted citizenship.',
    ],
  },
  RU: {
    title: 'RU Home Card Revealed',
    rules: [
      'Roll a die.',
      'On 1-3: play Russo-Turkish Wars (unless RU has an OT truce), otherwise play God Save the Tsar.',
      'On 4-6: play God Save the Tsar.',
    ],
  },
  OT: {
    title: 'OT Home Card Revealed',
    rules: [
      'Always play Modernization unless industry is 3+.',
      'If industry is 3+: roll a die. On 1-2 play Jihad.',
      'Bots will NOT give OT a 3 CP card.',
    ],
  },
}

// Modifiers
export const MODIFIERS = [
  { powers: ['AU'], text: 'AU bot: +1 DRM', always: true },
  { powers: ['GE'], text: 'GE bot before unification: +1 DRM', condition: 'before unification' },
  { powers: ['UK'], text: 'UK bot: -1 DRM', always: true },
  { powers: ['FR'], text: 'FR bot not currently pacifying a space: -1 DRM', condition: 'not pacifying' },
]

// Bot Wars rules
export const BOT_WARS = {
  declaration: 'Bots will only ever declare war using their home cards. Bots will never declare punitive wars. Bots will never attack an enemy that has \u22654 more army steps than them.',
  warAims: 'Bots will always target the closest spaces. If a bot has 0 industry they will only target a single space.',
  warAimsPerPower: {
    GE: 'War of unification. Will always target minor powers first, then player-controlled spaces. Attack minors without player allies first, always attack two minors without allies if able.',
    UK: 'Will NOT declare an offensive war.',
    FR: 'War of conquest. Randomly select an adjacent power to attack. On a 1-3 FR targets 2 keys. Use the BDIT to choose a war aim(s).',
    AU: 'After the special home card condition occurs, war of unification targeting a neighboring space that contains a nationality that AU has granted citizenship. Use the BDIT to choose a war aim(s).',
    RU: 'Roll a die: (1-3) war of conquest, (4-6) war of liberation.',
    OT: 'War of liberation or use the card for CP.',
  },
  budget: 'Bots play their top card for their war budget. If home card is on top, draw the next card instead. If a mandatory event is drawn, draw another card. Return unplayed cards to the pile.',
  alliances: 'Bots will always call allies. Committed bots will always join. Aligned bots join on 3+. One bot invited via Balance of Power joins on 3+ if given the card. Bots use their top non-home card to join. Bots will aid minor powers.',
  treatyOptions: 'Bots will never give land or +1 card markers to other players. They will always give treaty options to themselves.',
}

// Free Bot Redeployment (at start of war/GW)
export const FREE_REDEPLOYMENT = {
  easy: 'Redeploy 1 army',
  normal: 'Redeploy 1/2 of all armies',
  hard: 'Redeploy all armies',
}

// Bot Wartime Action Priorities
export const WARTIME_PRIORITY_1 = [
  { id: 'attack_capital', text: 'Attack*/enter enemy capital' },
  { id: 'protect_capital', text: 'Protect threatened capital' },
  { id: 'deploy_reserves', text: 'Deploy reserves if undeployed reserve armies are > 1' },
  {
    id: 'bot_pass',
    text: 'Bot Pass',
    detail: 'If: (1) they have a budget \u2264 2, (2) at least one opponent has more CP in their budget, and (3) they have no viable attacks*.',
  },
]

export const WARTIME_PRIORITY_2 = {
  text: 'Attack*/defend war goals',
}

// GW Priority 2 Actions (die roll)
export const GW_PRIORITY_2 = [
  { dieRange: [1, 3], text: 'Attack*/move to defend stability spaces**' },
  { dieRange: [4, 5], text: 'Refit. Convert to a 6 if all armies are full strength.' },
  { dieRange: [6, 6], text: 'Draft, unless this would exhaust manpower.' },
]

export const GW_PRIORITY_2_NOTES = [
  'GW Priority 2 modifier: +1 DRM per reduced army',
  '*Bot attacks: Bots will only attack with a +1 DRM or greater',
  '**Stability spaces = spaces that affect this bot\'s stability if lost',
]

// Prep phase rules
export const PREP_PHASE = {
  text: 'Shuffle each bot\'s cards into a pile. Bots will take the optional stability increase if their stability is \u2264 2.',
}

// End phase rules
export const END_PHASE = {
  text: 'Bots will always build an army step instead of maintaining a fort (unless they cannot build an army step).',
}

// Excess CP rules
export const EXCESS_CP = {
  text: 'If a bot cannot play an event or has excess CP they will build armies, THEN they will spend any additional excess CP on the Major Power Influence Track using the BMPIT.',
  exception: 'Exception: Neutral bots may split their CP, see BMPIT rules.',
}

// Bot Response and Combat Cards
export const RESPONSE_CARDS = {
  text: 'Bots will never play response cards or combat cards for their events. Additionally, bots will never play the Impulsive Ruler card for its event.',
  exception: 'Exception: a UK bot might play Balance of Power after a war is declared, see Home Card Revealed.',
}

// Bot ECs
export const BOT_ECS = {
  text: 'Bots will use their EC if the differential after support is between -2 and +2 in their favor.',
}

// Bot behavior in wartime
export const BOT_WARTIME_BEHAVIOR = {
  text: 'In wartime, bots are controlled by a player ally. If the bot is in the neutral box, use the Bot Wartime Action Priorities list.',
  note: 'Ideally, any player with interests contrary to the opposing player should control a bot.',
}

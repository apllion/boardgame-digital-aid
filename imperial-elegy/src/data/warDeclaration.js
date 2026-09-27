// War Declaration - full lifecycle reference data
// Covers: declaration flow, war aims, calls to war, budget, wartime SoP,
// victory/treaty, demobilization, home card war powers, and gotchas.

export const WAR_GLOSSARY = [
  { term: 'Belligerent', definition: 'Any power (major or minor) actively fighting in a war. Each belligerent has their own war budget.' },
  { term: 'War Aim', definition: 'The objective declared at the start of a war. Determines targets, WTT/stability costs, and available treaty options. Three types: Liberation, Unification, Conquest.' },
  { term: 'War Budget', definition: 'CP available to a belligerent during the war. Comes from one card played face-down + that player\'s own industry. Allied industry is NOT added.' },
  { term: 'WTT', definition: 'War Tension Track. Tracks how close Europe is to the Great War. Increases from conquest wars; decreases by 1 each End Phase.' },
  { term: 'Primary Belligerent', definition: 'The main attacker or defender. Responsible for setting war aims (attacker) or playing the defense card (defender).' },
  { term: 'Call to War', definition: 'When war is declared, allied powers are called to join. They may refuse, with consequences (neutral influence on MPIT, stability loss).' },
  { term: 'Initiative Order', definition: 'Determines who acts first in the war\'s maneuver steps. Set during the Initiative and Budget Step.' },
  { term: 'Maneuver Step', definition: 'Each belligerent takes 1 CP wartime action in initiative order. Repeats until the war ends.' },
  { term: 'Treaty Option', definition: 'A reward claimed by the war\'s winner. Number depends on victory type (0–2).' },
  { term: 'Truce', definition: 'After a war ends, the two sides cannot attack each other for a set period. Progressed each End Phase.' },
  { term: 'Demobilization', definition: 'End-of-war cleanup: blockade check, reserves removed, units displaced, free redeployment.' },
  { term: 'Punitive War', definition: 'A war declared solely to punish, with no territorial aim.' },
  { term: 'Stability', definition: 'A power\'s internal cohesion. Conquest wars cost stability. Low stability causes combat DRM penalties.' },
  { term: 'Key', definition: 'A strategically important space (city). War aims typically target keys. Capitals and subcapitals cannot be conquest targets.' },
  { term: 'Home Space', definition: 'A space belonging to a power\'s home territory. Retaking your own home space qualifies for Liberation.' },
]

export const WAR_DECLARATION_FLOW = [
  {
    step: 1,
    title: 'Play a Card',
    detail: 'The declaring player plays a card for its CP value (or plays a home card that declares war as part of its event). The card\'s CP feeds the attacker\'s war budget.',
  },
  {
    step: 2,
    title: 'Choose War Aim Type',
    detail: 'Declare Liberation (no WTT/stability cost), Unification (no WTT/stability cost), or Conquest (WTT +1, stability decreases by current WTT).',
  },
  {
    step: 3,
    title: 'Designate Targets',
    detail: 'Target up to two spaces. For Conquest, only one can be a key. Conquest cannot target capitals or subcapitals [13.3.1].',
  },
  {
    step: 4,
    title: 'Alliance Shift Step',
    detail: 'Defender\'s allies are called to war. Attacker may invite allies. Players may refuse (with consequences).',
  },
  {
    step: 5,
    title: 'Initiative and Budget Step',
    detail: 'Determine initiative order. Each belligerent plays one card face-down for their war budget. Budget = card CP + own industry only. Allied industry does NOT add.',
  },
  {
    step: 6,
    title: 'Maneuver Steps (Loop)',
    detail: 'Each belligerent takes 1 CP wartime action in initiative order. Loop continues until victory conditions are met or both sides agree to peace.',
  },
  {
    step: 7,
    title: 'Victory Step',
    detail: 'Check victory conditions. Winner claims treaty options. Proceed to demobilization.',
  },
]

export const WAR_AIM_DETAILS = [
  {
    type: 'Liberation',
    ref: '13.1',
    cost: 'No WTT increase, no stability loss',
    targets: 'Up to two spaces: your own home spaces OR spaces in open rebellion (WoI marker)',
    specialCases: [
      'RU via Russo-Turkish Wars: can liberate Balkan nationalities even if NOT in rebellion',
      'AU: can liberate Italian spaces (before Italian unification only)',
      'Liberated minor powers become your allies',
      'Cannot liberate dual home spaces (e.g. Alsace-Lorraine) — must use Conquest',
    ],
    whenToUse: 'Defensive recovery, freeing rebellions, RU Balkan expansion via home card',
  },
  {
    type: 'Unification',
    ref: '13.2',
    cost: 'No WTT increase, no stability loss',
    targets: 'Up to two spaces containing the unifier\'s nationality or citizenship (AU)',
    specialCases: [
      'GE: German unification spaces (absorbing German minors)',
      'AU: spaces with nationalities that have been granted AU citizenship',
      'Any player with diplomacy/alliance on Sardinia-Piedmont or Two Sicilies: Italian unification [13.2.1]',
    ],
    whenToUse: 'GE\'s primary early-game expansion; AU citizenship strategy; Italian unification',
  },
  {
    type: 'Conquest',
    ref: '13.3',
    cost: 'WTT increases by 1; stability decreases by the WTT value (after the increase)',
    targets: 'Up to two spaces, only one of which can be a key',
    specialCases: [
      'Cannot target capitals or subcapitals [13.3.1]',
      'Stability loss scales with WTT — at WTT 4, conquest costs -5 stability',
      'Required for dual home spaces like Alsace-Lorraine',
    ],
    whenToUse: 'When target doesn\'t qualify for Liberation or Unification',
  },
]

export const WAR_AIM_QUICK_GUIDE = [
  { situation: 'Retaking your own home space', aim: 'Liberation', note: 'Free, no penalties' },
  { situation: 'Freeing a space with WoI marker', aim: 'Liberation', note: 'Free, gain minor ally' },
  { situation: 'GE absorbing German minors', aim: 'Unification', note: 'Free, core GE mechanic' },
  { situation: 'AU absorbing citizenship nationalities', aim: 'Unification', note: 'Free, requires Dual Monarchy' },
  { situation: 'Unifying Italy (with diplomacy/ally)', aim: 'Unification', note: 'Free' },
  { situation: 'Taking enemy territory', aim: 'Conquest', note: 'Costly: WTT+1, stability-WTT' },
  { situation: 'Retaking Alsace-Lorraine (dual home)', aim: 'Conquest', note: 'No choice, dual home = conquest only' },
  { situation: 'RU attacking OT Balkans (home card)', aim: 'Liberation', note: 'Russo-Turkish Wars special' },
  { situation: 'OT reclaiming home space from RU', aim: 'Liberation / Jihad', note: 'Jihad: no WTT/stability cost' },
]

export const CALL_TO_WAR = {
  whoGetsCalled: [
    'Defender\'s allies are automatically called',
    'Attacker may invite allies to join on their side',
    'Minor power allies join as normal (Minor Power Alliance Table [13.4.3])',
  ],
  joiningRules: [
    'Allied players who accept become belligerents',
    'Each joining player sets up their OWN war budget (separate card + own industry)',
    'Joining does not cost the joining player any action — happens during Alliance Shift Step',
  ],
  refusingConsequences: [
    { position: 'Aligned alliance box', consequence: 'Immediately receive 5 neutral influence on MPIT' },
    { position: 'Committed alliance box', consequence: 'Lose 1 stability + receive 10 neutral influence on MPIT' },
  ],
  italySpecial: 'If Italy is attacked and a player refuses to join, Italy gains 10 neutral influence on the MPIT per player that refused.',
  bismarckOverride: 'Otto von Bismarck can forbid other players from joining the war. Minor power allies still join.',
}

export const WAR_BUDGET = {
  howItWorks: [
    'Each belligerent plays one card face-down from their hand',
    'Card\'s CP value is revealed',
    'Add the player\'s own industry to the card CP',
    'Total = that player\'s war budget',
  ],
  whatCounts: [
    'The card\'s CP value (the number on the card)',
    'The player\'s own industry level (from their track)',
  ],
  whatDoesNotCount: [
    'Allied player industry — each player has their OWN budget',
    'Minor power industry — minor powers alone get no budget',
    'Cards played for events earlier (those CP are gone)',
  ],
  commonMistakes: [
    'Adding allied industry to your budget — #1 mistake. GE\'s budget is GE\'s card + GE\'s industry. AU\'s budget is AU\'s card + AU\'s industry. They do NOT combine.',
    'Using the home card for budget — powerful but you lose the event.',
    'Forgetting the budget sets the war\'s scope — a small budget means fewer maneuver actions.',
  ],
}

export const WARTIME_SOP_PREGW = [
  { step: 1, title: 'War Aim Step', detail: 'Attacker chooses war aims and designates targets. Defender plays a card for CP (war budget).' },
  { step: 2, title: 'Alliance Shift Step', detail: 'Defender\'s allies called. Attacker invites allies. Refusing players suffer MPIT/stability consequences.' },
  { step: 3, title: 'Initiative and Budget Step', detail: 'Determine initiative order; set war budgets. Each belligerent plays 1 card for budget.' },
  { step: 4, title: 'Maneuver Step', detail: 'Each belligerent takes 1 CP action in initiative order.' },
  { step: 5, title: 'Victory Step', detail: 'Check victory conditions. If not met, return to Maneuver Step.' },
]

export const WARTIME_ACTION_LIST = [
  { name: 'Deploy Reserves', cost: '1 CP', detail: 'Place reserve armies = 1/2 industry (min 1, max 3)' },
  { name: 'Land Battle', cost: '1 CP', detail: 'Launch an attack' },
  { name: 'Rail Move', cost: '1 CP', detail: 'Move armies = 1/2 industry (round up)' },
  { name: 'March', cost: '1 CP', detail: 'Move all armies 2 spaces (clear) or 1 (difficult/severe)' },
  { name: 'Naval Movement', cost: '1 CP', detail: 'Move all fleets and 1 army' },
  { name: 'Joint Naval Ops', cost: '1 CP', detail: 'Move with an ally' },
  { name: 'Recruitment', cost: '1–4 CP', detail: 'Build army steps and ECs' },
  { name: 'Construct Fleet', cost: '1–3 CP', detail: 'Build naval units' },
  { name: 'Redeployment', cost: '1 CP', detail: 'Move through controlled spaces' },
  { name: 'Construct Fort', cost: '1–2 CP', detail: 'Build or upgrade a fort' },
  { name: 'Blockade', cost: 'Free', detail: 'Blockade an enemy port (wartime only)' },
]

export const VICTORY_TYPES_DETAILED = [
  {
    type: 'Major Victory',
    condition: 'Occupy opponent\'s capital or surrender',
    treatyOptions: 2,
    stabilityEffect: 'Attacker +1, Defender -1',
    notes: 'Major Victory winners can never be blockaded.',
  },
  {
    type: 'Normal Victory',
    condition: 'Attacker accomplished their war aims',
    treatyOptions: 1,
    stabilityEffect: null,
    notes: null,
  },
  {
    type: 'Defensive Victory',
    condition: 'Attacker failed AND defender either (1) occupies attacker\'s space or (2) is blockading attacker',
    treatyOptions: 1,
    stabilityEffect: null,
    notes: 'Defender must have actively pushed back — just surviving is White Peace.',
  },
  {
    type: 'Negotiated Peace',
    condition: 'Both agree; one side concedes',
    treatyOptions: 1,
    stabilityEffect: null,
    notes: 'Useful when a war is stalemated.',
  },
  {
    type: 'White Peace',
    condition: 'Both agree to end with nothing, OR no conditions met',
    treatyOptions: 0,
    stabilityEffect: null,
    notes: 'The "nothing happened" outcome.',
  },
]

export const TREATY_OPTIONS_DETAILED = [
  {
    name: 'Territorial Cession',
    ref: '16.2.1',
    effect: 'Gain/liberate all territory targeted at war\'s start',
    restriction: 'Must match original war aims',
  },
  {
    name: 'Realignment (type 1)',
    ref: '16.2.2',
    effect: 'Take one minor power alliance from opponent',
    restriction: null,
  },
  {
    name: 'Realignment (type 2)',
    ref: '16.2.2',
    effect: 'All GE-nationality minors allied to loser become GE allies',
    restriction: 'GE only, war of unification only',
  },
  {
    name: 'War Reparations',
    ref: '16.2.3',
    effect: 'Winner: +1 card marker. Loser: -1 card marker',
    restriction: null,
  },
  {
    name: 'Righteous Defense',
    ref: '16.2.4',
    effect: 'Take 1 enemy key/territory, return a home space, or liberate a minority',
    restriction: 'Defender only. Defender must trace LoC.',
  },
  {
    name: 'Colonial Cession',
    ref: '16.2.5',
    effect: 'Gain 1 colonial key or naval base from loser',
    restriction: 'Colony need not be occupied by winner',
  },
  {
    name: 'Ally Knockout',
    ref: '16.2.6',
    effect: 'Awards 1 treaty option against the knocked-out ally',
    restriction: 'Can only be imposed on the specific ally knocked out',
  },
]

export const DEMOBILIZATION_STEPS = [
  { step: 1, title: 'Blockade Check [17.1]', detail: 'Can the player trace LoC from capital to any naval box (not Baltic/Black Sea)? If blocked: -1 card marker. Blockading is optional — blockader chooses. Major Victory winners can never be blockaded. RU: Pacific only if Trans-Siberian completed.' },
  { step: 2, title: 'Remove Reserves', detail: 'ALL reserve armies return to the reserve holding box. You cannot keep them deployed.' },
  { step: 3, title: 'Displace Armies', detail: 'Armies in enemy-controlled territory must displace to nearest controlled space with LoC.' },
  { step: 4, title: 'Free Redeployment', detail: 'Each belligerent gets a free redeployment action (no CP cost).' },
  { step: 5, title: 'Free Naval Movement', detail: 'Each belligerent gets a free naval movement action (no CP cost).' },
]

export const HOME_CARD_WAR_POWERS = [
  {
    power: 'GE',
    card: 'Otto von Bismarck',
    abilities: [
      'Declare a war of unification using the card\'s 3 CP',
      'May target two different powers (not just two spaces)',
      'After declaring, may forbid other players from joining the war',
      'Minor power allies may still join as normal',
      'Gain 1 stability',
    ],
  },
  {
    power: 'UK',
    card: 'Balance of Power',
    abilities: [
      'Response card — played when another player declares war',
      'Cannot be played in response to Otto von Bismarck',
      'If defender agrees: UK becomes primary belligerent on defending side',
      'Uses Balance of Power\'s CP for UK war budget',
      'UK draws a card at war\'s end; one invited ally also draws a card',
      'If intervening for Ottomans: take control of an OT naval base in Eastern Med',
      'If defender refuses: UK just draws a card',
      'Alternative: play as event for 1 stability + draw a card',
    ],
  },
  {
    power: 'FR',
    card: 'Aux Armes, Citoyens!',
    abilities: [
      'Gain 2 reserve army steps first, then declare war',
      'If conquest aim: may target up to two keys and/or two different powers',
      'But: neutral powers can join against you',
      'Gain 1 stability if France wins',
    ],
  },
  {
    power: 'AU',
    card: 'Habsburg Dynasty',
    abilities: [
      'Not a direct war declaration card',
      'Primarily alliance manipulation (take an independent minor)',
      'Can trigger war of unification via citizenship mechanic (see Kaiserreich)',
    ],
  },
  {
    power: 'RU',
    card: 'Russo-Turkish Wars',
    abilities: [
      'Gain alliance with a Balkan minor (if diplomacy marker present)',
      'Declare war on Ottomans specifically',
      'Liberation aim: can liberate Balkan nationalities even if NOT in rebellion (unique)',
      'Conquest aim: no WTT increase or stability loss (special override)',
      'Gain 1 stability if Russia wins',
    ],
  },
  {
    power: 'OT',
    card: 'Jihad',
    abilities: [
      'Declare war against a power controlling an OT home space or Russia',
      'No WTT increase or stability loss',
      'Gain 2 Jihad markers (-1 DRM to opponent in combat)',
      'Gain 1 stability if you win',
    ],
  },
]

export const WAR_GOTCHAS = [
  {
    category: 'Declaration',
    items: [
      { mistake: 'Combining allied industry into one budget', correction: 'Each player has their OWN budget (card CP + own industry). They do NOT combine.' },
      { mistake: 'Targeting a capital with Conquest', correction: 'Capitals and subcapitals cannot be conquest targets [13.3.1].' },
      { mistake: 'Trying to Liberate Alsace-Lorraine', correction: 'Dual home spaces require Conquest, never Liberation.' },
      { mistake: 'Forgetting WTT cost scales', correction: 'Conquest: WTT+1, then stability drops by the NEW WTT value. At WTT 4, that\'s -5 stability total.' },
    ],
  },
  {
    category: 'During War',
    items: [
      { mistake: 'Forgetting wartime-per-power', correction: 'Different players can be at war/peace independently. GE can be at war with FR while UK is at peace.' },
      { mistake: 'Using peacetime actions during war', correction: 'Wartime has its own action list. No Trade/Diplomacy, no Industrialize during war.' },
      { mistake: 'Not deploying reserves first', correction: 'Reserves are powerful (up to 1/2 industry armies) and cost only 1 CP.' },
    ],
  },
  {
    category: 'Victory & Treaty',
    items: [
      { mistake: 'Defensive Victory = just surviving', correction: 'Defender must occupy attacker\'s space OR be blockading. Just surviving = White Peace.' },
      { mistake: 'Forgetting blockade check order', correction: 'Blockade check comes FIRST in demobilization — before reserves are removed.' },
      { mistake: 'Righteous Defense for attackers', correction: 'Righteous Defense is defender-only.' },
    ],
  },
  {
    category: 'Home Cards',
    items: [
      { mistake: 'Balance of Power vs Bismarck', correction: 'Cannot play Balance of Power in response to Otto von Bismarck.' },
      { mistake: 'Forgetting RTW non-rebellion liberation', correction: 'Russo-Turkish Wars can liberate Balkan nationalities even if NOT in rebellion.' },
      { mistake: 'Aux Armes conquest risk', correction: 'Two-key targeting lets neutral powers join against you.' },
    ],
  },
]

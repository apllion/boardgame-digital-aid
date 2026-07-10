// Player Aid data - actions, sequence of play, home cards

export const SEQUENCE_OF_PLAY = [
  {
    phase: 'Prep Phase',
    steps: [
      'Add new cards to the deck (check turn entry indicators)',
      'Reshuffle discard pile into draw deck',
      'Deal cards based on industry, flashpoints, +/- card markers, stability',
      'Optional: discard a random card to gain 1 stability (not home card or mandatory event)',
    ],
  },
  {
    phase: 'Diplomacy Phase',
    steps: [
      'Negotiate deals (non-binding, except card draws)',
      'Announce card draws given/received in turn order',
      'Select home card (in addition to dealt cards)',
    ],
  },
  {
    phase: 'Action Phase',
    steps: [
      'Players take impulses in turn order (GE, UK, FR, AU, RU, OT)',
      'Each impulse: play card for CP, play card for event, or pass',
      'Pass allowed with 0-1 cards remaining (UK: 2 cards), no home card or mandatory event in hand',
      'May hold 1 card for next turn (not home card or mandatory event)',
      'Phase ends when all players consecutively pass or have no cards',
    ],
  },
  {
    phase: 'End Phase',
    steps: [
      '(1) Militarism: gain 1 army step OR prevent 1 fort from degrading',
      '(2) Degrade forts',
      '(3) Non-player power build step',
      '(4) All naval units go to port',
      '(5) Set manpower',
      '(6) Industrialize (auto-industrialization cards)',
      '(7) Progress truces',
      '(8) Progress Wars of Independence',
      '(9) Alliance Resolution Step',
      '(10) Decrease WTT by 1',
      '(11) On turns 1, 3, 5: draw 3 National Goals, keep 1',
      '(12) Advance turn marker',
    ],
  },
]

export const PEACETIME_ACTIONS = [
  { name: 'Recruitment', cost: '1-4 CP', detail: 'Standing army: 1 CP/step. Reserve army: 1 CP/step. Elite Corps: 2 CP.' },
  { name: 'Naval Movement', cost: '1 CP', detail: 'Move a squadron or dreadnought.' },
  { name: 'Construct Fleet', cost: '1-3 CP', detail: 'Build naval units (squadron or dreadnought).' },
  { name: 'Place Influence/Diplomacy', cost: '1 CP', detail: 'Place an influence or diplomacy marker.' },
  { name: 'Remove Influence/Diplomacy', cost: '1 CP', detail: 'Remove an opposing influence or diplomacy marker.' },
  { name: 'Influence Great Power (MPIT)', cost: '1-4 CP', detail: 'Place influence on Major Power Influence Track.' },
  { name: 'Minor Power Alliance', cost: '3 CP', detail: 'Gain an alliance with a minor power (must have diplomacy marker).' },
  { name: 'Remove Minor Power Alliance', cost: '4 CP', detail: 'Remove another player\'s minor power alliance.' },
  { name: 'Expeditionary Force', cost: '1-2 CP', detail: 'Build or move an expeditionary force.' },
  { name: 'Pacification', cost: '1 CP', detail: 'Attempt to pacify a space with a pacification marker.' },
  { name: 'Construct Fort', cost: '1-2 CP', detail: 'Build or upgrade a fort.' },
  { name: 'CP Chain', cost: '1 Card', detail: 'Play an additional card for its CP value.' },
  { name: 'Industrialize', cost: '1 Card', detail: 'Play a card into industrialization.' },
  { name: 'Redeployment', cost: '1 CP', detail: 'Move armies through controlled spaces.' },
  { name: 'Land Battle (rebels)', cost: '1 CP', detail: 'Attack rebels in peacetime.' },
  { name: 'Declare War', cost: '1-4 CP', detail: 'Declare war on another power.' },
]

export const WARTIME_ACTIONS = [
  { name: 'Attack', cost: '1 CP', detail: 'Initiate a land battle.' },
  { name: 'Move', cost: '1 CP', detail: 'Move an army into an empty space.' },
  { name: 'Naval Movement', cost: '1 CP', detail: 'Move a fleet.' },
  { name: 'Construct Fleet', cost: '1-3 CP', detail: 'Build naval units.' },
  { name: 'Recruitment', cost: '1-4 CP', detail: 'Build army steps and ECs.' },
  { name: 'Redeployment', cost: '1 CP', detail: 'Move through controlled spaces.' },
  { name: 'Construct Fort', cost: '1-2 CP', detail: 'Build or upgrade a fort.' },
  { name: 'Blockade', cost: 'Free', detail: 'Blockade an enemy port (wartime only).' },
]

export const HOME_CARDS = {
  GE: [
    { name: 'Otto von Bismarck', cp: 3, text: 'Gain 1 stability. Declare a war of unification using this card\'s CP value. You may target two different powers. After declaring war you may forbid other players from joining the war. Minor power allies may join as normal.' },
    { name: 'German General Staff', cp: 3, text: 'Gain 1 stability. Take any response or combat card from the discard pile (cannot play this impulse). OR Gain 1 stability and two elite corps.' },
  ],
  UK: [
    { name: 'Sun Never Sets', cp: 3, text: 'Gain 1 stability. Build 1 naval squadron or Dreadnought and then spend 2 CP on expeditionary force, pacification, and/or naval movement actions.' },
    { name: 'Jewel in the Crown', cp: 3, text: 'Flip Indian Stability to "Stable." Spend up to 2 CP to build Indian army steps or an EF in India or Bengal. Place the Indian Fort in India or upgrade it to level 2.' },
  ],
  FR: [
    { name: 'Aux Armes, Citoyens!', cp: 3, text: 'Gain 2 reserve army steps, then declare war using this card\'s CP. If conquest war aim, may target up to two keys and/or two different powers (but neutral powers can join against you). Gain 1 stability if France wins.' },
    { name: 'The City of Light', cp: 3, text: 'Gain 1 stability and 3 CP to spend. Roll a die: if result <= current turn, gain 1 City of Light point. Before rolling, may forgo X CP to apply -X DRM.' },
  ],
  AU: [
    { name: 'Habsburg Dynasty', cp: 3, text: 'Choose an independent minor power in Europe. Remove opposing diplomacy, gain alliance. Special: if you choose a German minor power, may remove opposing alliance marker. If allied with 2+ German minors, gain +1 card marker.' },
    { name: 'Kaiserreich', cp: 3, text: 'Gain 1 stability. Grant rights to a nationality. OR Gain 1 stability. Attempt to grant citizenship (roll >= 3, +1 difficulty per existing citizenship). May forgo stability for +2 DRM. Requires Dual Monarchy played.' },
  ],
  RU: [
    { name: 'Russo-Turkish Wars', cp: 3, text: 'Gain alliance with a Balkan minor (if diplomacy marker present). Declare war on Ottomans. Liberation aim can liberate Balkan nationalities not in rebellion. Conquest aim: no WTT increase or stability loss. Gain 1 stability if Russia wins.' },
    { name: 'God Save the Tsar', cp: 3, text: 'Gain 1 stability. Spend 4 CP on recruitment and construct fort (max 1 EC). OR Gain 1 stability. Attempt Trans-Siberian Railroad (roll <= current turn to complete).' },
  ],
  OT: [
    { name: 'Modernization', cp: 3, text: 'Gain 1 stability. Another player can give you a card for industrialization (they draw a card, must reveal true CP value). If no player gives, use this card for 3 CP.' },
    { name: 'Jihad', cp: 3, text: 'Declare war against a power controlling an OT home space or RU. No WTT increase or stability loss. Gain 2 Jihad markers. Gain 1 stability if you win.' },
  ],
}

// Combat Results Table
export const CRT = [
  { differential: 'Att +4 or more', attDef: '0/2*', victor: 'Att (decisive)\u2020' },
  { differential: 'Att +3', attDef: '1/2*', victor: 'Attacker' },
  { differential: 'Att +2', attDef: '1/1*', victor: 'Attacker' },
  { differential: '0 or Att +1', attDef: '1/1**', victor: 'Attacker' },
  { differential: 'Def +1', attDef: '1/1*', victor: 'Attacker' },
  { differential: 'Def +2', attDef: '1/1*', victor: 'Defender' },
  { differential: 'Def +3', attDef: '2/1*', victor: 'Defender' },
  { differential: 'Def +4 or more', attDef: '2/0*', victor: 'Def (decisive)\u2020' },
]

export const CRT_NOTES = [
  '* and ** only apply if Hydraulic Recoil has been played',
  '* Both sides take +1 casualty',
  '** The victor may inflict +1 casualty to both sides',
  '\u2020 In a naval battle, the losing side doubles its losses',
  'Naval Battles: Dreadnoughts must take the majority of losses',
  'During the GW: players may remove forts to cancel retreats, forts reduce their level by one after a battle, and trenches inflict an additional loss on the attacker.',
]

// Land Combat Modifiers [18.2]
export const LAND_COMBAT_MODIFIERS = [
  { name: 'Firepower', detail: '+X DRM, X = side\'s total FP (including supporting FP)' },
  { name: 'Elite Units', detail: '+1 DRM' },
  { name: 'Low Stability BM', detail: '-1 or -2 (check stability track)' },
  { name: 'Attacking via difficult/severe connection', detail: '-1' },
  { name: 'Only reduced armies in main attack/defense', detail: '-1 (unless defending in a fort)' },
  { name: 'Amphibious Landing', detail: '-1' },
  { name: 'Broken LoC', detail: '-1' },
  { name: 'Jihad', detail: '-1' },
  { name: 'Manpower exhausted (GW only)', detail: '-1' },
  { name: 'Machine Guns', detail: 'minimum die roll of 3 for non-rebel units' },
]

// Naval Combat Modifiers [19.5]
export const NAVAL_COMBAT_MODIFIERS = [
  { name: 'Firepower*', detail: '+X, X = side\'s total FP' },
  { name: '*Squadron FP halved', detail: 'when fighting Dreadnoughts' },
  { name: 'Low Stability BM', detail: '-1' },
  { name: '2+ ports adjacent to embattled area', detail: '-2' },
  { name: 'Only spent units in battle', detail: '-1' },
  { name: 'Failure to avoid battle', detail: '-1' },
  { name: 'Manpower exhausted (GW only)', detail: '-1' },
]

// Land Battle Sequence
export const BATTLE_SEQUENCE = [
  'Place Battle Chit and choose main attacker/defender',
  'Calculate the BDRM: (a) total land combat modifiers, (b) declare support (attacker first), (c) commit elite unit (attacker first), (d) player combat cards (attacker first)',
  'Each rolls a die, with one side adding the BDRM to their die roll',
  'Determine the differential between the two rolls',
  'Consult the CRT and apply the results',
]

// Support Summary [18.3]
export const SUPPORT_RULES = [
  'A max of two spaces, per side, can support',
  'Adjacent to both attacking and defending space: all armies can support',
  'Adjacent to the attacking OR the defending space: 1 army can support',
  'Armies adjacent via red connections cannot support',
  'Half Support (1/2 FP): only adjacent via difficult connections, from a different power, into/from a RU home space, or supporting armies in a trench battle',
  'FP can only be halved once',
]

// War Aims [13.0]
export const WAR_AIMS = {
  types: [
    { name: 'Liberation', detail: 'Target up to two spaces. Retake home spaces or liberate spaces in open rebellion.' },
    { name: 'Unification', detail: 'Target up to two spaces containing the unifier\'s nationality (or citizenship for AU).' },
    { name: 'Conquest', detail: 'Target up to two spaces, only one can be a key. Increases WTT by one, decrease stability by WTT after increase.' },
  ],
}

// Wartime Actions [15.4] / [GW 27.5]
export const WARTIME_ACTIONS_DETAILED = [
  { name: 'Deploy Reserves', cost: '1 CP', detail: 'Place reserve armies = 1/2 industry (max 3)' },
  { name: 'Land Battle', cost: '1 CP', detail: 'Launch an attack' },
  { name: 'Rail Move', cost: '1 CP', detail: 'Move armies = 1/2 industry' },
  { name: 'March', cost: '1 CP', detail: 'Move all armies 2 spaces (1 space via difficult/severe connections)' },
  { name: 'Naval Movement', cost: '1 CP', detail: 'Move all fleets and 1 army' },
  { name: 'Joint Naval Operations', cost: '1 CP', detail: 'Move with an ally' },
  { name: 'Refit Fleet', cost: '1 CP', detail: 'Only in a friendly port (GW only)' },
  { name: 'Refit Army', cost: '1 CP', detail: 'GW only' },
  { name: 'Draft', cost: '1 CP + 1 MP', detail: '2 reduced armies (GW only)' },
  { name: 'Elite Corps', cost: '1 CP', detail: 'GW only' },
]

// Minor Power Alliance Table
export const MINOR_POWER_ALLIANCES = [
  { nation: 'Netherlands/Bel.', choices: ['UK/GE*', 'France', '-'] },
  { nation: 'Denmark', choices: ['UK/FR*', 'GE/RU*', 'Germany'] },
  { nation: 'German State', choices: ['AU/GE*', 'Russia', 'France'] },
  { nation: 'Balkan State', choices: ['RU/AU*', 'France', 'UK'] },
  { nation: 'Greece', choices: ['UK/RU*', 'FR/AU*', '-'] },
  { nation: 'Italy/Italian Minor', choices: ['FR/AU*', 'Germany', 'UK'] },
  { nation: 'Egypt', choices: ['UK/FR*', 'Ottomans', '-'] },
  { nation: 'Persia', choices: ['UK/RU*', 'France', 'Ottomans'] },
  { nation: 'Qing China', choices: ['UK/FR*', 'Russia', '-'] },
  { nation: 'Japan', choices: ['UK/FR*', 'Russia', '-'] },
  { nation: 'Poland**', choices: ['France', 'AU/GE*', '-'] },
  { nation: 'Ireland**', choices: ['France', 'Germany', '-'] },
]

export const MINOR_POWER_NOTES = [
  '*Both players roll a d6 to see who the minor power turns to for aid, reroll ties.',
  '**Poland and Ireland do not start as independent nations, but they can become independent.',
]

// Treaty Options [16.2]
export const TREATY_OPTIONS = [
  { name: 'Territorial Cession', detail: 'Gain control of, or in case of a liberation war aim, liberate all territory targeted at the beginning of the war.' },
  { name: 'Realignment (type 1)', detail: 'Choose one minor power allied with your opponent, remove the alliance marker from the minor power and replace it with your own.' },
  { name: 'Realignment (type 2)', detail: 'GE only in war of unification. All minor powers with GE nationality allied to the losing power become allies of GE.' },
  { name: 'War Reparations', detail: 'Winner gains a +1 card marker and the loser gains a -1 card marker.' },
  { name: 'Righteous Defense', detail: 'Defender only. Gain control of one key or territory where the defender can trace a LoC. Must be occupied unless it is a defender home space.' },
  { name: 'Colonial Cession', detail: 'Gain one colonial key or naval base controlled by the losing player. Colony does not have to be occupied by the winner.' },
  { name: 'Ally Knockout', detail: 'Awards one treaty option, but it can only be imposed upon the ally that was knocked out of the war.' },
]

// Victory Types
export const VICTORY_TYPES = [
  { name: 'Major Victory', detail: 'Occupying the opponent\'s capital or surrender. Winner receives two treaty options. Attacker +1 stability, defender -1 stability.' },
  { name: 'Normal Victory', detail: 'Attacker accomplished their war aims set at the beginning. Winner receives two treaty options.' },
  { name: 'Defensive Victory', detail: 'Attacker did not accomplish war aims and defender either (1) occupies a space controlled by attacker, or (2) is blockading the attacker. Winner receives one treaty option.' },
  { name: 'Negotiated Peace', detail: 'Both players agree to end the fighting with one side conceding 1 treaty option.' },
  { name: 'White Peace', detail: 'Both sides agree to end with no treaty options OR none of the above conditions are met. No treaty options awarded.' },
]

// Refusing a Call to War
export const REFUSING_WAR = [
  'If in an aligned alliance box: immediately receive 5 neutral influence on the MPIT.',
  'If in a committed alliance box: lose 1 stability and immediately receive 10 neutral influence on the MPIT.',
  'If Italy is attacked and a player refuses to join: Italy gains 10 neutral influence on the MPIT per player that refused.',
]

// EF Special Rules
export const EF_RULES = [
  'EFs fighting rebel armies or other EFs: 2 FP',
  'EFs fighting non-rebel armies: 0 FP',
  'EFs only have 1 step; if they suffer a step loss they are eliminated.',
  'A force of only EFs can inflict hits against but cannot eliminate non-rebel armies.',
  'A force of EFs and armies cannot take losses on the EFs.',
  'When a force of EFs and armies takes a step loss on an army they must also eliminate an EF.',
  'Exception: Elite colonial EFs (and Zouaves) are not subject to the latter bullet point. They are treated as ECs for elimination purposes.',
]

export const NATIONAL_CHARACTERISTICS = {
  GE: [
    'Starts divided - must unify German minor powers',
    'Bismarck allows targeting two powers in war of unification',
    'Strong military tradition (+1 DRM in some contexts)',
    'Industry is crucial for cards and reserve armies',
  ],
  UK: [
    'Naval power - Two Power Standard, dreadnoughts',
    'Indian stability affects card draws',
    'Balance of Power response card is unique and powerful',
    'Cannot declare offensive wars easily',
    'Can pass with 2 cards remaining',
  ],
  FR: [
    'City of Light points as unique victory mechanic',
    'Napoleon\'s Legacy enables aggressive expansion',
    'Strong starting position but surrounded',
    'Aux Armes allows targeting two keys/powers',
  ],
  AU: [
    'Dual Monarchy - citizenship/rights mechanic',
    'Precarious position between multiple rivals',
    'Habsburg Dynasty strong for German influence',
    'Must manage multiple nationalities',
  ],
  RU: [
    'Eastern ambitions - Asia expansion',
    'Russo-Turkish Wars are powerful against OT',
    'Trans-Siberian Railroad as long-term investment',
    'Industrial deficit must be overcome',
    'Highest army potential',
  ],
  OT: [
    'Modernization depends on other players\' cooperation',
    'Jihad markers provide unique combat advantage',
    'Defensive posture - protect home spaces',
    'Industrial challenge - needs help to industrialize',
    'Egypt is strategically critical',
  ],
}

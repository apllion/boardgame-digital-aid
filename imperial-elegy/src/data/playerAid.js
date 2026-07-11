// Player Aid data - actions, sequence of play, home cards

export const SEQUENCE_OF_PLAY = [
  {
    phase: 'Prep Phase [10.0]',
    steps: [
      'Add new cards to the deck (check turn entry indicators) [10.1]',
      'Reshuffle discard pile into draw deck [10.1]',
      'Deal cards based on industry, flashpoints, +/- card markers, stability [10.2]',
      'Optional: discard a random card to gain 1 stability (not home card or mandatory event) [10.4]',
    ],
  },
  {
    phase: 'Diplomacy Phase [11.0]',
    steps: [
      'Negotiate deals (non-binding, except card draws) [11.0]',
      'Announce card draws given/received in turn order [11.1]',
      'Select home card (in addition to dealt cards) [11.2]',
    ],
  },
  {
    phase: 'Action Phase [12.0]',
    steps: [
      'Players take impulses in turn order (GE, UK, FR, AU, RU, OT)',
      'Each impulse: play card for CP, play card for event, or pass [12.0]',
      'Pass allowed with 0-1 cards remaining (UK: 2 cards), no home card or mandatory event in hand [12.0]',
      'May hold 1 card for next turn (not home card or mandatory event) [12.0]',
      'Phase ends when all players consecutively pass or have no cards [12.0]',
    ],
  },
  {
    phase: 'End Phase [20.0]',
    steps: [
      '(1) Militarism: gain 1 army step OR prevent 1 fort from degrading [20.1]',
      '(2) Degrade forts [20.2]',
      '(3) Non-player power build step [20.3]',
      '(4) All naval units go to port [20.4]',
      '(5) Set manpower [20.5]',
      '(6) Industrialize (auto-industrialization cards) [20.6]',
      '(7) Progress truces [20.7]',
      '(8) Progress Wars of Independence [20.8]',
      '(9) Alliance Resolution Step [20.9]',
      '(10) Decrease WTT by 1 [20.10]',
      '(11) On turns 1, 3, 5: draw 3 National Goals, keep 1 [20.11]',
      '(12) Advance turn marker [20.12]',
    ],
  },
]

export const PEACETIME_ACTIONS = [
  { name: 'Recruitment', cost: '1-4 CP', detail: 'Standing army: 1 CP/step. Reserve army: 1 CP/step. Elite Corps: 2 CP. [12.2]' },
  { name: 'Naval Movement', cost: '1 CP', detail: 'Move a squadron or dreadnought. [12.3]' },
  { name: 'Construct Fleet', cost: '1-3 CP', detail: 'Build naval units (squadron or dreadnought). [12.4]' },
  { name: 'Place Influence/Diplomacy', cost: '1 CP', detail: 'Place an influence or diplomacy marker. [12.5]' },
  { name: 'Remove Influence/Diplomacy', cost: '1 CP', detail: 'Remove an opposing influence or diplomacy marker. [12.6]' },
  { name: 'Influence Great Power (MPIT)', cost: '1-4 CP', detail: 'Place influence on Major Power Influence Track. [12.7]' },
  { name: 'Minor Power Alliance', cost: '3 CP', detail: 'Gain an alliance with a minor power (must have diplomacy marker). [12.8]' },
  { name: 'Remove Minor Power Alliance', cost: '4 CP', detail: 'Remove another player\'s minor power alliance. [12.9]' },
  { name: 'Expeditionary Force', cost: '1-2 CP', detail: 'Build or move an expeditionary force. [12.10]' },
  { name: 'Pacification', cost: '1 CP', detail: 'Attempt to pacify a space with a pacification marker. [12.11]' },
  { name: 'Construct Fort', cost: '1-2 CP', detail: 'Build or upgrade a fort. [12.12]' },
  { name: 'CP Chain', cost: '1 Card', detail: 'Play an additional card for its CP value. [12.13]' },
  { name: 'Industrialize', cost: '1 Card', detail: 'Play a card into industrialization. [12.14]' },
  { name: 'Redeployment', cost: '1 CP', detail: 'Move armies through controlled spaces. [12.15]' },
  { name: 'Land Battle (rebels)', cost: '1 CP', detail: 'Attack rebels in peacetime. [12.16]' },
  { name: 'Declare War', cost: '1-4 CP', detail: 'Declare war on another power. [13.0]' },
]

export const WARTIME_ACTIONS = [
  { name: 'Attack', cost: '1 CP', detail: 'Initiate a land battle. [15.2]' },
  { name: 'Move', cost: '1 CP', detail: 'Move an army into an empty space. [15.2]' },
  { name: 'Naval Movement', cost: '1 CP', detail: 'Move a fleet. [15.2]' },
  { name: 'Construct Fleet', cost: '1-3 CP', detail: 'Build naval units. [15.2]' },
  { name: 'Recruitment', cost: '1-4 CP', detail: 'Build army steps and ECs. [15.2]' },
  { name: 'Redeployment', cost: '1 CP', detail: 'Move through controlled spaces. [15.2]' },
  { name: 'Construct Fort', cost: '1-2 CP', detail: 'Build or upgrade a fort. [15.2]' },
  { name: 'Blockade', cost: 'Free', detail: 'Blockade an enemy port (wartime only). [15.2]' },
]

export const HOME_CARDS = {
  GE: [
    { name: 'Otto von Bismarck', cp: 3, text: 'Gain 1 stability. Declare a war of unification using this card\'s CP value. You may target two different powers. After declaring war you may forbid other players from joining the war. Minor power allies may join as normal.' },
    { name: 'German General Staff', cp: 3, text: 'Gain 1 stability. Take any response or combat card from the discard pile (cannot play this impulse). OR Gain 1 stability and two elite corps.' },
  ],
  UK: [
    { name: 'Sun Never Sets', cp: 3, text: 'Gain 1 stability. Build 1 naval squadron or Dreadnought and then spend 2 CP on expeditionary force, pacification, and/or naval movement actions.' },
    { name: 'Balance of Power', cp: 3, text: 'Play when another player declares war. Cannot be played in response to Otto von Bismarck. If the defender agrees, you become the primary belligerent and enter the war on the defending side. Use this card\'s CP for your war budget. Draw a card at the end of the war. One invited player who joined also draws a card. If intervening to help the Ottomans, take control of an Ottoman naval base in the Eastern Mediterranean. If the defender does not agree, draw a card. Playable as event to gain 1 stability and draw a card.' },
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

// Combat Results Table [18.4]
export const CRT = [
  { differential: 'Att +4 or more', attDef: '0/2*', victor: 'Att (decisive)\u2020' },
  { differential: 'Att +3', attDef: '1/2*', victor: 'Attacker' },
  { differential: 'Att +2', attDef: '1/1*', victor: 'Attacker' },
  { differential: '0 or Att +1', attDef: '1/1**', victor: 'Attacker' },
  { differential: 'Def +1', attDef: '1/1**', victor: 'Defender' },
  { differential: 'Def +2', attDef: '1/1*', victor: 'Defender' },
  { differential: 'Def +3', attDef: '2/1*', victor: 'Defender' },
  { differential: 'Def +4 or more', attDef: '2/0*', victor: 'Def (decisive)\u2020' },
]

export const CRT_NOTES = [
  '* and ** only apply if Hydraulic Recoil has been played',
  '** Both sides take +1 loss',
  '* The victor may opt to inflict +1 loss to both sides',
  '\u2020 In a naval battle, the losing side doubles its losses',
  'Naval Battles: Dreadnoughts must take the majority of losses',
  'During the GW: forts reduce their level by 1 at the end of a battle in their space, and trenches inflict an additional loss on the attacker.',
]

// Land Combat Modifiers [18.2]
export const LAND_COMBAT_MODIFIERS = [
  { name: 'Firepower', detail: '+X DRM, X = main attack/defense force total FP (not supporting FP) [18.2.1]' },
  { name: 'Elite Corps/Colonials', detail: '+1 DRM (one per side, must be in main force) [18.2.2]' },
  { name: 'Low Stability BM', detail: '-1 or -2 (check stability track) [18.2.3]' },
  { name: 'Attacking via difficult/severe connection', detail: '-1 [18.2.4]' },
  { name: 'Only reduced armies in main attack/defense', detail: '-1 (unless defending in a fort) [18.2.5]' },
  { name: 'Amphibious Landing', detail: '-1 [18.2.6]' },
  { name: 'Broken LoC', detail: '-1 [18.2.7]' },
  { name: 'Jihad', detail: '-1 [18.2.8]' },
  { name: 'Manpower exhausted (GW only)', detail: '-1 [18.2.9]' },
  { name: 'Machine Guns', detail: 'minimum die roll of 3 for non-rebel units [18.2.10]' },
]

// Naval Combat Modifiers [19.5]
export const NAVAL_COMBAT_MODIFIERS = [
  { name: 'Firepower*', detail: '+X, X = side\'s total FP [19.5]' },
  { name: '*Squadron FP halved', detail: 'when fighting Dreadnoughts [19.5]' },
  { name: 'Low Stability BM', detail: '-1 or -2 (check stability track) [19.5]' },
  { name: 'No friendly ports adjacent', detail: '-2 [19.5]' },
  { name: '2+ more ports than opponent', detail: '+1 [19.5]' },
  { name: 'Only reduced units in battle', detail: '-1 [19.5]' },
  { name: 'Failure to avoid battle', detail: '-1 [19.2]' },
  { name: 'Manpower exhausted (GW only)', detail: '-1 [19.5]' },
]

// Land Battle Sequence [18.1]
export const BATTLE_SEQUENCE = [
  'Place Battle Chit and choose main attacker/defender [18.1]',
  'Calculate the BDRM: (a) total land combat modifiers [18.2], (b) declare support (attacker first) [18.3], (c) commit elite unit (attacker first), (d) player combat cards (attacker first) [9.1.2]',
  'Each rolls a die, with one side adding the BDRM to their die roll [18.4]',
  'Determine the differential between the two rolls [18.4]',
  'Consult the CRT and apply the results [18.4]',
]

// Support Summary [18.3]
export const SUPPORT_RULES = [
  'A max of two spaces, per side, can support [18.3]',
  'Adjacent to both attacking and defending space: all armies can support [18.3]',
  'Adjacent to the attacking OR the defending space: 1 army can support [18.3]',
  'Armies adjacent via red connections cannot support [18.3]',
  'Half Support (1/2 FP): only adjacent via difficult connections, from a different power, into/from a RU home space, or supporting armies in a trench battle [18.3]',
  'FP can only be halved once [18.3]',
]

// War Aims [13.0]
export const WAR_AIMS = {
  types: [
    { name: 'Liberation', detail: 'Target up to two spaces. Retake home spaces or liberate spaces in open rebellion. [13.1]' },
    { name: 'Unification', detail: 'Target up to two spaces containing the unifier\'s nationality (or citizenship for AU). [13.2]' },
    { name: 'Conquest', detail: 'Target up to two spaces, only one can be a key. Increases WTT by one, decrease stability by WTT after increase. [13.3]' },
  ],
}

// Wartime Actions [15.4] / [GW 27.5]
export const WARTIME_ACTIONS_DETAILED = [
  { name: 'Deploy Reserves', cost: '1 CP', detail: 'Place reserve armies = 1/2 industry (min 1, max 3) [15.2]' },
  { name: 'Land Battle', cost: '1 CP', detail: 'Launch an attack [15.2]' },
  { name: 'Rail Move', cost: '1 CP', detail: 'Move armies = 1/2 industry (round up) [15.2]' },
  { name: 'March', cost: '1 CP', detail: 'Move all armies 2 spaces via clear connections (1 space via difficult/severe) [15.2]' },
  { name: 'Naval Movement', cost: '1 CP', detail: 'Move all fleets and 1 army [15.2]' },
  { name: 'Joint Naval Operations', cost: '1 CP', detail: 'Move with an ally [15.2]' },
  { name: 'Refit Fleet', cost: '1 CP', detail: 'Only in a friendly port (GW only) [27.5]' },
  { name: 'Refit Army', cost: '1 CP', detail: 'Flip reduced army to full strength (GW only) [27.5]' },
  { name: 'Draft', cost: '1 CP + 1 MP', detail: '2 reduced armies (GW only) [27.5]' },
  { name: 'Elite Corps', cost: '1 CP', detail: 'GW only [27.5]' },
]

// Minor Power Alliance Table [13.4.3]
export const MINOR_POWER_ALLIANCES = [
  { nation: 'Netherlands/Bel.', choices: ['UK/GE*', 'France', '-'] },
  { nation: 'Denmark', choices: ['UK/FR*', 'GE/RU*', 'Austria'] },
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
  { name: 'Territorial Cession', detail: 'Gain control of, or in case of a liberation war aim, liberate all territory targeted at the beginning of the war. [16.2.1]' },
  { name: 'Realignment (type 1)', detail: 'Choose one minor power allied with your opponent, remove the alliance marker from the minor power and replace it with your own. [16.2.2]' },
  { name: 'Realignment (type 2)', detail: 'GE only in war of unification. All minor powers with GE nationality allied to the losing power become allies of GE. [16.2.2]' },
  { name: 'War Reparations', detail: 'Winner gains a +1 card marker and the loser gains a -1 card marker. [16.2.3]' },
  { name: 'Righteous Defense', detail: 'Defender only. Options: (1) Take control of one occupied enemy key/territory (defender must trace LoC), (2) Return a home space controlled by the attacker to its owner, (3) Liberate a minority nationality in a space occupied by the defender (gain alliance). [16.2.4]' },
  { name: 'Colonial Cession', detail: 'Gain one colonial key or naval base controlled by the losing player. Colony does not have to be occupied by the winner. [16.2.5]' },
  { name: 'Ally Knockout', detail: 'Awards one treaty option, but it can only be imposed upon the ally that was knocked out of the war. [16.2.6]' },
]

// Victory Types [16.1]
export const VICTORY_TYPES = [
  { name: 'Major Victory', detail: 'Occupying the opponent\'s capital or surrender. Winner receives two treaty options. Attacker +1 stability, defender -1 stability. [16.1.1]' },
  { name: 'Normal Victory', detail: 'Attacker accomplished their war aims set at the beginning. Winner receives one treaty option. [16.1.2]' },
  { name: 'Defensive Victory', detail: 'Attacker did not accomplish war aims and defender either (1) occupies a space controlled by attacker, or (2) is blockading the attacker. Winner receives one treaty option. [16.1.3]' },
  { name: 'Negotiated Peace', detail: 'Both players agree to end the fighting with one side conceding 1 treaty option. [16.1.4]' },
  { name: 'White Peace', detail: 'Both sides agree to end with no treaty options OR none of the above conditions are met. No treaty options awarded. [16.1.5]' },
]

// Refusing a Call to War [14.0]
export const REFUSING_WAR = [
  'If in an aligned alliance box: immediately receive 5 neutral influence on the MPIT. [14.0]',
  'If in a committed alliance box: lose 1 stability and immediately receive 10 neutral influence on the MPIT. [14.0]',
  'If Italy is attacked and a player refuses to join: Italy gains 10 neutral influence on the MPIT per player that refused. [14.0]',
]

// EF Special Rules [5.3]
export const EF_RULES = [
  'EFs fighting rebel armies or other EFs: 2 FP [5.3]',
  'EFs fighting non-rebel armies: 0 FP [5.3]',
  'EFs only have 1 step; if they suffer a step loss they are eliminated. [5.3]',
  'A force of only EFs can inflict hits against but cannot eliminate non-rebel armies. [5.3]',
  'A force of EFs and armies cannot take losses on the EFs. [5.3]',
  'When a force of EFs and armies takes a step loss on an army they must also eliminate an EF. [5.3]',
  'Exception: Elite colonial EFs (and Zouaves) are not subject to the latter bullet point. They are treated as ECs for elimination purposes. [5.3]',
]

export const NATIONAL_CHARACTERISTICS = {
  GE: [
    'Starts divided - must unify German minor powers [33.1]',
    'Bismarck allows targeting two powers in war of unification',
    'Strong military tradition (+1 DRM in some contexts) [33.1]',
    'Industry is crucial for cards and reserve armies',
  ],
  UK: [
    'Naval power - Two Power Standard, dreadnoughts [33.2]',
    'Indian stability affects card draws [33.2.2]',
    'Balance of Power response card is unique and powerful',
    'Cannot declare offensive wars easily [33.2]',
    'Can pass with 2 cards remaining [12.0]',
  ],
  FR: [
    'City of Light points as unique victory mechanic [33.3]',
    'Napoleon\'s Legacy enables aggressive expansion',
    'Strong starting position but surrounded',
    'Aux Armes allows targeting two keys/powers',
  ],
  AU: [
    'Dual Monarchy - citizenship/rights mechanic [33.4]',
    'Precarious position between multiple rivals',
    'Habsburg Dynasty strong for German influence',
    'Must manage multiple nationalities [33.4]',
  ],
  RU: [
    'Eastern ambitions - Asia expansion [33.5]',
    'Russo-Turkish Wars are powerful against OT',
    'Trans-Siberian Railroad as long-term investment [33.5]',
    'Industrial deficit must be overcome',
    'Highest army potential [33.5]',
  ],
  OT: [
    'Modernization depends on other players\' cooperation [33.6]',
    'Jihad markers provide unique combat advantage [33.6]',
    'Defensive posture - protect home spaces',
    'Industrial challenge - needs help to industrialize [33.6]',
    'Egypt is strategically critical',
  ],
}

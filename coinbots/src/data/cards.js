// Cuba Libre Event Cards
// Faction order symbols: G=Government, J=26July, D=Directorio, S=Syndicate
// type: 'dual' (unshaded top / shaded bottom), 'single', 'capability', 'momentum'
// capability cards have a colored banner: INSURGENT CAPABILITY or GOVERNMENT MOMENTUM

export const CARDS = [
  {
    id: 1,
    name: 'Armored Cars',
    factionOrder: ['J', 'D', 'G', 'S'],
    type: 'momentum',
    unshaded: {
      title: 'In rebel service',
      text: '26July or DR free Marches into a space and free Ambushes there (even if Active).',
    },
    shaded: {
      title: 'Delivered',
      text: 'Until Propaganda, before Assault, move Troops to Assault spaces from other spaces.',
      momentum: true,
    },
  },
  {
    id: 2,
    name: 'Guantánamo Bay',
    factionOrder: ['G', 'D', 'S', 'J'],
    type: 'capability',
    unshaded: {
      title: 'Base personnel targeted',
      text: '26July may Kidnap in Sierra Maestra as if City.',
      capability: 'insurgent',
    },
    shaded: {
      title: 'US airfield',
      text: 'Until Propaganda, Air Strike removes 2 pieces and allowed even if Embargoed.',
      momentum: true,
    },
  },
  {
    id: 3,
    name: 'Eulogio Cantillo',
    factionOrder: ['D', 'G', 'J', 'S'],
    type: 'dual',
    unshaded: {
      title: 'General seals truce',
      text: 'Select a space with Troops. A Faction free Marches all its Guerrillas out, then flips them Underground.',
    },
    shaded: {
      title: 'Dictator backs general\'s offensive',
      text: 'Select a Province or City with Troops. They free Sweep in place, then free Assault.',
    },
  },
  {
    id: 4,
    name: 'S.I.M.',
    factionOrder: ['J', 'G', 'D', 'S'],
    type: 'momentum',
    unshaded: {
      title: 'Word of torture',
      text: 'Remove Support from a space with no Police.',
    },
    shaded: {
      title: 'Military intelligence glasses lands',
      text: 'Until next Propaganda, Police Sweep and Assault as if Troops.',
      momentum: true,
    },
  },
  {
    id: 5,
    name: 'Rolando Masferrer',
    factionOrder: ['J', 'G', 'D', 'S'],
    type: 'momentum',
    unshaded: {
      title: 'Brutal commander',
      text: 'Set a Province with Troops and 1 adjacent Province to Passive Opposition.',
    },
    shaded: {
      title: 'Paramilitares',
      text: 'Sweep may free Assault 1 space as its Special Activity (until Propaganda).',
      momentum: true,
    },
  },
  {
    id: 6,
    name: 'Sánchez Mosquera',
    factionOrder: ['J', 'D', 'G', 'S'],
    type: 'momentum',
    unshaded: {
      title: 'Popular colonel wounded',
      text: 'Remove all Troops from a Mountain space (to available).',
    },
    shaded: {
      title: 'Effective army commander',
      text: 'Until next Propaganda, Assault treats Mountain as City.',
      momentum: true,
    },
  },
  {
    id: 7,
    name: 'Election',
    factionOrder: ['D', 'G', 'J', 'S'],
    type: 'dual',
    unshaded: {
      title: 'Postponed! Rebel ranks grow',
      text: 'Place 1 Guerrilla in each City.',
    },
    shaded: {
      title: 'Scheduled!',
      text: 'Batista bows to US pressure: Set a City to Neutral. Aid +10.',
    },
  },
  {
    id: 8,
    name: 'General Strike',
    factionOrder: ['D', 'G', 'S', 'J'],
    type: 'dual',
    unshaded: {
      title: 'Widespread disruption',
      text: 'In each City, shift 1 level toward Neutral and place any 1 Guerrilla.',
    },
    shaded: {
      title: 'Strike fails, shops open',
      text: 'Set a City to Active Support and Activate all Guerrillas there. Open any 1 closed Casino.',
    },
  },
  {
    id: 9,
    name: 'Coup',
    factionOrder: ['G', 'J', 'D', 'S'],
    type: 'dual',
    unshaded: {
      title: 'Batista ousted!',
      text: 'Shift all Govt Control spaces 1 level toward Neutral. US Alliance up 1 box.',
    },
    shaded: {
      title: 'US-backed plot discovered',
      text: 'Activate and free Assault all DR pieces in Cities with cubes. US Alliance down 1 box.',
    },
  },
  {
    id: 10,
    name: 'MAP',
    factionOrder: ['G', 'D', 'S', 'J'],
    type: 'momentum',
    unshaded: {
      title: 'Arms shipment stolen',
      text: 'Replace a cube with any 2 Guerrillas.',
    },
    shaded: {
      title: 'US training',
      text: 'Until Propaganda, Govt may accompany LimOps with a free Special Activity.',
      momentum: true,
    },
  },
  {
    id: 11,
    name: 'Batista Flees',
    factionOrder: ['J', 'G', 'D', 'S'],
    type: 'single',
    unshaded: {
      title: 'US forces dictator out',
      text: 'Government Resources -10. Select and remove a die roll of Troops. US Alliance 1 box up. Aid +10. Government Redeploys as in Propaganda round.',
    },
    shaded: null,
  },
  {
    id: 12,
    name: 'BRAC',
    factionOrder: ['G', 'D', 'J', 'S'],
    type: 'dual',
    unshaded: {
      title: 'Anti-subversion agency',
      text: 'Remove any 2 Guerrillas.',
    },
    shaded: {
      title: 'CIA trains political police',
      text: 'Place 1 Police anywhere. Add lesser of +6 or Aid to Government Resources.',
    },
  },
  {
    id: 13,
    name: 'El Che',
    factionOrder: ['D', 'G', 'J', 'S'],
    type: 'capability',
    unshaded: {
      title: 'Inspired military leader',
      text: 'The first group of Guerrillas to move on each 26July March operation flips Underground.',
      capability: 'insurgent',
    },
    shaded: null,
  },
  {
    id: 14,
    name: 'Operation Fisherman',
    factionOrder: ['D', 'G', 'S', 'J'],
    type: 'dual',
    unshaded: {
      title: '2nd invasion',
      text: 'Place a 26July Base and Guerrilla in Pinar del Rio.',
    },
    shaded: {
      title: 'Locals resist being drawn in',
      text: 'Shift Pinar del Rio 2 levels toward Active Support.',
    },
  },
  {
    id: 15,
    name: 'Come Comrades!',
    factionOrder: ['G', 'J', 'S', 'D'],
    type: 'dual',
    unshaded: {
      title: 'Communist recruits',
      text: 'Place 3 26July Guerrillas anywhere.',
    },
    shaded: {
      title: 'Soviet influence suspected',
      text: 'Add lesser of Aid or +10 to Government Resources. Then Aid +5.',
    },
  },
  {
    id: 16,
    name: 'Larrazábal',
    factionOrder: ['G', 'S', 'D', 'J'],
    type: 'dual',
    unshaded: {
      title: 'Venezuelan junta supplies arms',
      text: 'Place a 26July Base where there is a 26July piece.',
    },
    shaded: {
      title: 'Caracas cuts off shipments',
      text: 'Remove one 26July Base. 26July Resources -3.',
    },
  },
  {
    id: 17,
    name: 'Alberto Bayo',
    factionOrder: ['J', 'D', 'S', 'G'],
    type: 'dual',
    unshaded: {
      title: 'Vet trains guerrillas',
      text: '26July or DR free Rallies in each space it has a Base (as if spaces Neutral).',
    },
    shaded: {
      title: 'Mexico blocks training by Cuban expats',
      text: 'All 26July Guerrillas Active. 26July Ineligible through next card.',
    },
  },
  {
    id: 18,
    name: 'Pact of Caracas',
    factionOrder: ['D', 'J', 'G', 'S'],
    type: 'capability',
    unshaded: {
      title: '',
      text: 'No 26July or DR Ops or Special Activities that remove the other\'s pieces or affect placed Opposition. If same player, mutual transfers allowed. If either removes 2 of its Bases at once, cancel Capability. Executing Faction stays Eligible.',
      capability: 'insurgent',
    },
    shaded: null,
  },
  {
    id: 19,
    name: 'Sierra Maestra Manifesto',
    factionOrder: ['D', 'G', 'S', 'J'],
    type: 'single',
    unshaded: {
      title: 'Fidel disdains elections or compromise',
      text: 'In card Faction order, each Faction may place 2 non-Casino pieces in a space where they already have a piece. Executing Faction stays Eligible.',
    },
    shaded: null,
  },
  {
    id: 20,
    name: 'The Twelve',
    factionOrder: ['G', 'J', 'D', 'S'],
    type: 'dual',
    unshaded: {
      title: 'Tale of survivors inspires movement',
      text: 'A Faction free Marches then free Rallies at a March destination.',
    },
    shaded: {
      title: 'Granma travail presages supply challenge',
      text: 'Remove ⅓ rounded up of any Guerrillas from the space with the most Guerrillas.',
    },
  },
  {
    id: 21,
    name: 'Fangio',
    factionOrder: ['J', 'D', 'S', 'G'],
    type: 'dual',
    unshaded: {
      title: '26July seizes racer',
      text: 'Shift a City 1 level toward Active Opposition, 2 levels if a 26July piece is there.',
    },
    shaded: {
      title: 'Famous driver popularizes Cuba',
      text: 'In 2 spaces with any Casinos, open a closed Casino or place 1 Cash with a Guerrilla or cube.',
    },
  },
  {
    id: 22,
    name: 'Raúl',
    factionOrder: ['G', 'D', 'S', 'J'],
    type: 'capability',
    unshaded: {
      title: 'Younger Castro an ace',
      text: '26July may reroll each Attack or Kidnap.',
      capability: 'insurgent',
    },
    shaded: {
      title: 'US hostage-taking backfires',
      text: 'Until Propaganda, add to Aid twice any Resources from Kidnap.',
      momentum: true,
    },
  },
  {
    id: 23,
    name: 'Radio Rebelde',
    factionOrder: ['J', 'G', 'S', 'D'],
    type: 'dual',
    unshaded: {
      title: 'Clandestine radio reaches masses',
      text: 'Shift 2 Provinces each 1 level toward Active Opposition.',
    },
    shaded: {
      title: 'Transmitter pinpointed',
      text: 'Remove a 26July Base from a Province.',
    },
  },
  {
    id: 24,
    name: 'Vilma Espín',
    factionOrder: ['J', 'G', 'D', 'S'],
    type: 'dual',
    unshaded: {
      title: 'Revolutionary interlocutor',
      text: 'Set Sierra Maestra or an adjacent space to Active Opposition.',
    },
    shaded: {
      title: 'Raúl\'s fiancé betrays urban guerrilla',
      text: 'Remove all 26July pieces from a City other than Havana.',
    },
  },
  {
    id: 25,
    name: 'Escapade',
    factionOrder: ['G', 'D', 'S', 'J'],
    type: 'dual',
    unshaded: {
      title: 'Yacht brings fighters',
      text: 'Place a DR Guerrilla and Base in either Camagüey Province or Oriente.',
    },
    shaded: {
      title: 'Resupply yacht intercepted',
      text: 'Remove a Directorio Base.',
    },
  },
  {
    id: 26,
    name: 'Rodríguez Loeches',
    factionOrder: ['D', 'G', 'J', 'S'],
    type: 'dual',
    unshaded: {
      title: 'DR Leader',
      text: 'DR places 1 Guerrilla anywhere and free Marches to, Rallies, or Ambushes there.',
    },
    shaded: {
      title: 'Inefficient administrator',
      text: 'Remove 1 DR Guerrilla. DR Resources -5.',
    },
  },
  {
    id: 27,
    name: 'Echeverría',
    factionOrder: ['D', 'G', 'J', 'S'],
    type: 'dual',
    unshaded: {
      title: 'Near-miss attempt on dictator\'s life',
      text: 'Place 2 DR Guerrillas anywhere. Havana to Neutral. DR is Eligible.',
    },
    shaded: {
      title: 'Popular revolutionary dies in his "hit at the top"',
      text: 'Remove the 2 DR pieces closest to Havana. DR Resources -3.',
    },
  },
  {
    id: 28,
    name: 'Morgan',
    factionOrder: ['D', 'J', 'S', 'G'],
    type: 'capability',
    unshaded: {
      title: 'US Comandante',
      text: 'DR Guerrillas may March 2 adjacent spaces.',
      capability: 'insurgent',
    },
    shaded: {
      title: 'Backlash against Yanqui adventurer',
      text: 'Set a space with a DR Guerrilla to Active Support.',
    },
  },
  {
    id: 29,
    name: 'Fauré Chomón',
    factionOrder: ['G', 'J', 'D', 'S'],
    type: 'dual',
    unshaded: {
      title: 'Students take to the field',
      text: 'DR or 26July places a Base and 2 Guerrillas in Las Villas.',
    },
    shaded: {
      title: 'Student loyalties shift',
      text: 'Remove a DR piece or replace it with its 26July counterpart.',
    },
  },
  {
    id: 30,
    name: 'The Guerrilla Life',
    factionOrder: ['J', 'D', 'G', 'S'],
    type: 'capability',
    unshaded: {
      title: 'Hardships harden 26July fighters',
      text: 'All 26July Rallies flip Guerrillas Underground, even if placing.',
      capability: 'insurgent',
    },
    shaded: {
      title: 'Hardships harden student revolutionaries',
      text: 'Flip all DR Guerrillas Underground. Place 1 DR Guerrilla in a City.',
    },
  },
  {
    id: 31,
    name: 'Escopeteros',
    factionOrder: ['G', 'S', 'J', 'D'],
    type: 'dual',
    unshaded: {
      title: 'Locals start their own revolution',
      text: 'Place any non-Casino Base and any 1 Guerrilla into a Mountain.',
    },
    shaded: {
      title: 'Traditionalist countryside rejects rebellion',
      text: 'Shift a Mountain space 1 level toward Active Support.',
    },
  },
  {
    id: 32,
    name: 'Resistencia Cívica',
    factionOrder: ['D', 'G', 'S', 'J'],
    type: 'dual',
    unshaded: {
      title: 'Urban movement backs Castro',
      text: 'In a City, replace all Directorio pieces with 26July counterparts.',
    },
    shaded: {
      title: 'Movement splits with Castro',
      text: 'In a City, replace all 26July pieces with Directorio counterparts.',
    },
  },
  {
    id: 33,
    name: 'Carlos Prío',
    factionOrder: ['G', 'S', 'D', 'J'],
    type: 'dual',
    unshaded: {
      title: 'Ex-president funnels funds',
      text: '+5 DR or +5 26July Resources.',
    },
    shaded: {
      title: 'Return from exile',
      text: 'Select a space without Govt Control. Place a DR Base there and set it to Neutral.',
    },
  },
  {
    id: 34,
    name: 'US Speaking Tour',
    factionOrder: ['D', 'G', 'J', 'S'],
    type: 'dual',
    unshaded: {
      title: 'Expatriates invest',
      text: 'An Insurgent Faction adds a die roll in Resources. Each other adds +2.',
    },
    shaded: {
      title: 'An embarrassment',
      text: 'Add the lesser of +8 or Aid to Government Resources. Then Aid +8.',
    },
  },
  {
    id: 35,
    name: 'Defections',
    factionOrder: ['D', 'G', 'J', 'S'],
    type: 'single',
    unshaded: {
      title: 'Disillusioned fighters',
      text: 'In a space already occupied by your pieces and those of an enemy, replace 2 of the enemy\'s Guerrillas or cubes with your Guerrillas or cubes.',
    },
    shaded: null,
  },
  {
    id: 36,
    name: 'Eloy Gutiérrez Menoyo',
    factionOrder: ['D', 'G', 'J', 'S'],
    type: 'dual',
    unshaded: {
      title: 'Inspiring DR leader',
      text: 'Replace a non-DR non-Casino piece within 1 space of Las Villas with 2 DR Guerrillas.',
    },
    shaded: {
      title: 'Counterrevolutionary Frotista',
      text: 'Replace a Directorio Guerrilla with a non-Directorio Guerrilla.',
    },
  },
  {
    id: 37,
    name: 'Herbert Matthews',
    factionOrder: ['J', 'D', 'S', 'G'],
    type: 'dual',
    unshaded: {
      title: 'NYTimes refutes Fidel\'s death',
      text: '26July Resources +5. Aid -4.',
    },
    shaded: {
      title: 'Fidel\'s survival spurs support to counterweights',
      text: 'Aid +10. Directorio Resources +3. Syndicate Resources +5.',
    },
  },
  {
    id: 38,
    name: 'Meyer Lansky',
    factionOrder: ['S', 'G', 'J', 'D'],
    type: 'dual',
    unshaded: {
      title: 'Wheeler dealer',
      text: 'Within a space, transfer any Cash among any Guerrillas or cubes.',
    },
    shaded: {
      title: 'Master mobster',
      text: 'Syndicate relocates any Casinos anywhere (within stacking). All Casinos open.',
    },
  },
  {
    id: 39,
    name: 'Turismo',
    factionOrder: ['S', 'G', 'J', 'D'],
    type: 'dual',
    unshaded: {
      title: '"Ugly American"',
      text: 'Support 1 level toward Neutral each Casino space.',
    },
    shaded: {
      title: 'Police "protection" for tourists',
      text: 'Govt and Syndicate each add +3 Resources per space with open Casino and Police.',
    },
  },
  {
    id: 40,
    name: 'Ambassador Smith',
    factionOrder: ['S', 'D', 'J', 'G'],
    type: 'dual',
    unshaded: {
      title: 'Havana advocate ignored in US',
      text: 'Shift US Alliance 1 box down (lower Aid the same).',
    },
    shaded: {
      title: 'Blindly backing dictator',
      text: 'Shift US Alliance 1 box up. Aid +9. Then add lesser of +9 or half Aid (round down) to Syndicate Resources.',
    },
  },
  {
    id: 41,
    name: 'Fat Butcher',
    factionOrder: ['S', 'G', 'D', 'J'],
    type: 'dual',
    unshaded: {
      title: 'Casino-man Nicholas di Constanzo drains US base',
      text: 'Close 1 Casino or reduce Aid -8.',
    },
    shaded: {
      title: 'Mob enforcer',
      text: 'Syndicate free Ambushes with 1 of its Underground Guerrillas and opens 1 closed Casino.',
    },
  },
  {
    id: 42,
    name: 'Llano',
    factionOrder: ['J', 'D', 'G', 'S'],
    type: 'dual',
    unshaded: {
      title: 'Slums to arms',
      text: 'Place a 26July Base and any Guerrilla in a City.',
    },
    shaded: {
      title: 'Urban poor indifferent, eager for work',
      text: 'Select a City. Remove any Opposition there and place an open Casino.',
    },
  },
  {
    id: 43,
    name: 'Mafia Offensive',
    factionOrder: ['S', 'J', 'D', 'G'],
    type: 'capability',
    unshaded: {
      title: 'Mob helps rebels',
      text: '26July or DR executes a free LimOp, treating 1 Syndicate piece as that Faction\'s piece.',
    },
    shaded: {
      title: 'Hitmen',
      text: 'Syndicate may Assassinate as if DR, but regardless of Police.',
      capability: 'insurgent',
    },
  },
  {
    id: 44,
    name: 'Rebel Air Force',
    factionOrder: ['J', 'S', 'G', 'D'],
    type: 'dual',
    unshaded: {
      title: 'Captured aircraft shocks troops',
      text: 'A 26July or DR Guerrilla (Active or not) free Ambushes Government forces. Remove Bases first.',
    },
    shaded: {
      title: 'Rebels purchase but cannot operate aircraft',
      text: 'Select 26July or DR and transfer 1 die roll of their Resources to Syndicate.',
    },
  },
  {
    id: 45,
    name: 'Anastasia',
    factionOrder: ['S', 'G', 'D', 'J'],
    type: 'dual',
    unshaded: {
      title: 'Rival muscles into Cuba',
      text: 'Close all Casinos in Havana. Syndicate Resources -5.',
    },
    shaded: {
      title: 'Lansky rival whacked in New York',
      text: 'Syndicate Resources +10.',
    },
  },
  {
    id: 46,
    name: 'Sinatra',
    factionOrder: ['S', 'J', 'G', 'D'],
    type: 'dual',
    unshaded: {
      title: 'Over-priced star',
      text: 'Syndicate Resources -6.',
    },
    shaded: {
      title: 'Frankie\'s show',
      text: 'Place an open Casino in Havana regardless of stacking. Place 1 Cash with Police there.',
    },
  },
  {
    id: 47,
    name: 'Pact of Miami',
    factionOrder: ['G', 'S', 'J', 'D'],
    type: 'dual',
    unshaded: {
      title: 'Surprise for dictator and rebels',
      text: 'Remove 2 Guerrillas. Govt Ineligible through next card.',
    },
    shaded: {
      title: 'Agreement causes confusion',
      text: '26July and Directorio each lose -3 Resources and are Ineligible through next card.',
    },
  },
  {
    id: 48,
    name: 'Santo Trafficante Jr',
    factionOrder: ['S', 'G', 'J', 'D'],
    type: 'capability',
    unshaded: {
      title: 'Feud with Lansky',
      text: 'Syndicate Resources -10. All Syndicate Guerrillas to Active.',
    },
    shaded: {
      title: 'Old-time mobster',
      text: 'Any Underground Syndicate Guerrilla: Mock Skim (6.2.3).',
      capability: 'insurgent',
    },
  },
];

// Event instructions for non-player factions (Rule 8.4.1)
// Per the rules: DR/26July use unshaded text, Govt/Syndicate use shaded text (Rule 8.4.2)
// These overrides tell a faction to skip the event and do Ops instead, or to use
// the opposite side (unshaded/shaded) from their default.
//
// Key: cardId -> { factionId: instruction }
// 'ops' = skip event, do Ops & Special Activity
// 'unshaded' / 'shaded' = use that specific side (overriding default)
// If a faction is not listed, they follow the default rule (play the event)
export const EVENT_INSTRUCTIONS = {
  // Card-specific bot overrides based on non-player rules
  // These are the "gray halo" instructions from the faction aid sheets
  11: { government: 'ops', syndicate: 'ops' }, // Batista Flees - bad for Govt/Syndicate
  45: { directorio: 'ops' }, // Anastasia - DR skips
  10: { syndicate: 'ops' }, // MAP - Syndicate does Ops
  48: { syndicate: 'ops' }, // Santo Trafficante Jr - unshaded hurts Syndicate
  46: { syndicate: 'ops' }, // Sinatra - unshaded hurts Syndicate
};

// Non-player event side preference (Rule 8.4.2)
// DR and 26July use UNSHADED, Government and Syndicate use SHADED
export const FACTION_EVENT_SIDE = {
  government: 'shaded',
  directorio: 'unshaded',
  july26: 'unshaded',
  syndicate: 'shaded',
};

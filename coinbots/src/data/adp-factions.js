// A Distant Plain — Non-Player Faction Flowcharts
// Factions: Coalition, Government, Taliban, Warlords

export const ADP_FACTIONS = {
  coalition: {
    id: 'coalition',
    name: 'Coalition',
    color: '#4a7caa',
    bgColor: '#2d3d4a',
    description: 'COIN — NATO forces',
    questions: [
      {
        id: 'coal-q1',
        text: 'Is there an Underground Taliban Guerrilla in a Support space, OR an Underground Guerrilla of a Player Faction in a Coalition Base space?',
        yes: 'sweep',
      },
      {
        id: 'coal-q2',
        text: 'Would Assault (alone or with Air Strikes) remove a Player Faction\'s Bases or any pieces of any Faction in Support spaces?',
        yes: 'assault',
      },
      {
        id: 'coal-q3',
        text: '(Default) None of the above conditions met.',
        yes: 'train',
        no: 'train',
      },
    ],
    operations: {
      sweep: {
        name: 'Sweep',
        description: 'Activate Underground Guerrillas',
        steps: [
          'Do NOT move any faction\'s last cube at any Coalition Bases.',
          'Do NOT move cubes needed for a Sweep in a Support space.',
          'Do NOT move last 3 cubes from non-Pashtun spaces with Support.',
          'Bring max Government Troops (1 per Coalition Troop, cost 3 Resources/destination) into spaces with <2 Government cubes.',
          '1. Sweep into/in-place in all reachable highest Pop spaces with Support and enemy — use sufficient Troops to activate most enemies.',
          '2. Then Sweep everywhere in place.',
          '3. Then Sweep into/at one reachable highest Pop space with 1+ Pop and enemy, with max Coalition Troops. Tiebreaker: Coalition Bases, then most Bases of any faction.',
          'Activation priority: random Player first, then Taliban, then Warlords.',
        ],
        specialActivity: 'airstrike',
        altSpecialActivity: 'airlift',
      },
      assault: {
        name: 'Assault',
        description: 'Remove enemy pieces in Support spaces',
        steps: [
          'Add Government Assault in up to 1 space (cost 3 Resources).',
          '1. Assault to remove Player or Taliban pieces — target Bases first, then pieces at Support.',
          '   If helpful for removing a Base or all enemy pieces at Support: add Government Assault, then Air Strike, then Air Lift.',
          '2. If pieces were removed above OR Coalition unable to conduct any other Operations: Assault everywhere in place.',
        ],
        specialActivity: 'airstrike',
        altSpecialActivity: 'airlift',
      },
      train: {
        name: 'Train',
        description: 'Build up forces and conduct Civic Actions',
        steps: [
          'Train in up to 3 spaces (Kabul or where Coalition pieces). Spending limit: max ⅔ of Resources (no limit if Government <9 Resources). Place NO Government cubes unless indicated.',
          '1. If Government is Player AND Patronage ≥ 11: Train and reduce Patronage in Kabul.',
          '2. If Taliban is Player AND has 18+ Opposition+Bases: Civic Actions in 1 space (or 2 if PRTs) with COIN Control and Coalition piece(s) — remove most Opposition.',
          '3. If 1+ Coalition Bases Available OR final Campaign: pause Train, do Surge, then return.',
          '4. At 1 Coalition Base space with COIN Control (or 2 if PRTs): Civic Actions to max extent. Tiebreaker: greatest shift, then non-Pashtun, then no Taliban pieces.',
          '5. If Resources permit: Train at each Coalition Base with <2 Government pieces or no Police — place max cubes (Police first, then Troops).',
          '6. In 1 space (or 2 if PRTs) with COIN Control and Coalition piece(s): Civic Actions for greatest shift.',
        ],
        specialActivity: 'surge',
      },
    },
    specialActivities: {
      airlift: {
        name: 'Air Lift',
        description: 'Redistribute troops among 3 spaces',
        steps: [
          'Do NOT lift last Coalition Troop from a Coalition Base.',
          'Do NOT lift last 2 Government Troops from where there are Coalition pieces.',
          'Do NOT lift last 3 cubes from non-Pashtun spaces with Support.',
          '1. Get up to 2 Government Troops into each space with Coalition + Taliban pieces but no Government cubes (protect from Ambush).',
          '2. Relocate Government Troops from Coalition Base spaces so Coalition Troops outnumber Government. Move first from no-Support spaces, then highest Pop. Relocate to spaces in #1, then random spaces that don\'t disable Propaganda Civic Actions.',
        ],
        fallback: null,
      },
      airstrike: {
        name: 'Air Strike',
        description: 'Remove Active enemy pieces in up to 3 Provinces',
        steps: [
          'Strikes in up to 3 Provinces in Afghanistan.',
          'Strike to remove: first Bases, then Guerrillas.',
          'Within both: first in spaces with Support, then with Coalition Bases, then to remove a faction\'s last Guerrilla.',
          'Target priority: random Player, then Taliban, then Warlords.',
          'If Predators capability: also in Pakistan if removing a Base.',
        ],
        fallback: 'airlift',
      },
      surge: {
        name: 'Surge',
        description: 'Move Coalition pieces among 3 spaces and Available',
        steps: [
          '1. If final Campaign only: relocate max Troops from Kabul/COIN Controlled to Available (improving victory margin) — keep last Coalition Troop at Bases. Last from Support spaces.',
          '2. Get Available Bases (with 1+ Coalition Troop each) to different highest Pop spaces with 1+ Pop (Kabul or COIN Controlled). Never 2 Coalition Bases in one space.',
          '3. Move on-map Bases to higher Pop spaces. Move from lowest Pop with no Support only.',
          '4. If pieces moved above:',
          '   (a) If not final: roll 1d6, move that many Troops to get Available count close to Support total.',
          '   (b) Get 1+ Coalition Troop per Coalition Base space.',
          '   (c) If Government is Player: add Aid only if Patronage < 6. Otherwise always add Aid (roll 1d6).',
        ],
        fallback: 'airlift',
      },
    },
  },

  government: {
    id: 'government',
    name: 'Government',
    color: '#4a7c4a',
    bgColor: '#2d4a2d',
    description: 'COIN — Afghan government',
    questions: [
      {
        id: 'gov-q1',
        text: 'Would Assault place 2+ Population under COIN Control OR remove a Taliban Base?',
        yes: 'assault',
      },
      {
        id: 'gov-q2',
        text: '2+ Player pieces on a LoC somewhere, OR Taliban exceed enemies on the 3 or 4 Econ Value LoCs?',
        yes: 'patrol',
      },
      {
        id: 'gov-q3',
        text: '10+ Government Troops Available, OR would Train place a Government Base?',
        yes: 'train',
        no: 'sweep',
      },
    ],
    operations: {
      assault: {
        name: 'Assault',
        description: 'Remove enemy pieces and establish control',
        steps: [
          'Assault in up to 3 spaces. Spending limit: max ⅔ of Resources (no limit if <9 Resources).',
          '1. Assault where able to establish COIN Control.',
          '2. Assault to remove: first Bases, then the most Guerrillas.',
          '   Within: Assault last on LoCs with Player or Taliban pieces (only such LoCs).',
          '   Target priority: Player\'s pieces, then Taliban, then Warlords.',
        ],
        specialActivity: 'eradicate',
        altSpecialActivity: 'govern',
      },
      patrol: {
        name: 'Patrol',
        description: 'Secure LoCs and Kabul',
        steps: [
          'Patrol first with all available Police, then Troops — moving one by one equally from where most of that type.',
          'Do NOT move last Police of any Government Base or non-Pashtun space.',
          'Patrol such that no COIN Control is lost.',
          '1. Patrol to establish COIN Control in Kabul.',
          '2. Get Government cubes equal to any Player\'s pieces on highest Econ LoCs. Then get 2 cubes on each 3-4 Econ LoC. Then 1 cube on each remaining LoC.',
          '3. Assault on 1 LoC removing most pieces of: any Player, then Taliban, then Warlords.',
        ],
        specialActivity: 'govern',
        altSpecialActivity: 'eradicate',
      },
      train: {
        name: 'Train',
        description: 'Place forces and conduct Civic Actions',
        steps: [
          'Train in up to 3 spaces. Spending limit: max ⅔ of Resources (no limit if <9). Place max cubes: 2 more Troops than Police if Available.',
          '1. Train in highest Pop Province with 1+ Pop, 3+ Government cubes, no COIN Base but room: replace 3 cubes with a Base.',
          '2. If no Base: in highest Pop Province with 2+ Pop, COIN Control, no Coalition Base, no Terror — Train (0 cubes if no COIN Base) AND Civic Actions AND Govern for Patronage.',
          '3. If no Base/SA: losing no COIN Control, Train placing max Troops AND Transport 5 Troops to highest Pop space with 2+ Pop AND Train there replacing 3 cubes with Government Base.',
          '4. Train placing cubes at Kabul or COIN Base spaces. Tiebreaker: least Government cubes, then highest Pop.',
          '5. If no Civic Actions/Base: Train and Civic Actions in 1 COIN Controlled space removing most Opposition.',
        ],
        specialActivity: 'eradicate',
        altSpecialActivity: 'govern',
      },
      sweep: {
        name: 'Sweep',
        description: 'Move troops and activate guerrillas',
        steps: [
          'Sweep in/into up to 2 spaces. Do NOT move last Troop of any LoC or Government Base. Maintain COIN Control.',
          '1. Use Sweep to get up to 4+ Troops to add COIN Control at highest Pop spaces with 1+ Pop and no COIN Base. Sweep from random sources evenly. Prioritize lowest cost (pay Warlords 1 Resource per LoC with enemies).',
          '2. Then Sweep in place activating most pieces of: any Player first, then Taliban, then Warlords.',
        ],
        specialActivity: 'transport',
      },
    },
    specialActivities: {
      eradicate: {
        name: 'Eradicate',
        description: 'Destroy crops to reduce Opposition',
        steps: [
          '1. In any legal space at Opposition.',
          '2. If Aid is 0: in any legal space.',
          '3. In non-Pashtun spaces (avoid placing Taliban Guerrilla). If Taliban is Player: only if Government has Tribal Elders.',
          '4. In a random space.',
        ],
        fallback: 'transport',
      },
      govern: {
        name: 'Govern',
        description: 'Extract Patronage and place Pop markers',
        steps: [
          '1. If able, Govern for Patronage in up to 2 highest Pop spaces with Support, COIN Control, and no Coalition Base.',
          '2. Place +1 Pop markers in up to 2 highest Pop spaces with 1+ Pop, Support, COIN Control, and COIN Base. Prioritize Government Bases over Coalition.',
        ],
        fallback: 'eradicate',
      },
      transport: {
        name: 'Transport',
        description: 'Move Troops to establish control',
        steps: [
          'Do not move last Troop of any LoC or Government Base. No COIN Control lost.',
          '1. Get up to 4+ Troops to establish COIN Control at 1 highest Pop space with 1+ Pop and no COIN Base.',
          '   Pay 1 Resource to Warlords per space with Guerrillas.',
          '   Transport from where most excess Troops. Prioritize lowest cost target.',
        ],
        fallback: null,
      },
    },
  },

  taliban: {
    id: 'taliban',
    name: 'Taliban',
    color: '#333333',
    bgColor: '#1a1a1a',
    description: 'Insurgent — Islamic fundamentalists',
    questions: [
      {
        id: 'tal-q1',
        text: 'Would Terror shift 3+ points of Opposition and Support combined?',
        yes: 'terror',
      },
      {
        id: 'tal-q2',
        text: '15+ Taliban Guerrillas Available, OR would Rally place a Base (3+ Guerrillas in a space)?',
        yes: 'rally',
      },
      {
        id: 'tal-q3',
        text: 'Would Attack with or without Ambush remove 2+ Coalition pieces?',
        yes: 'attack',
        no: 'march',
      },
    ],
    operations: {
      terror: {
        name: 'Terror',
        description: 'Shift Support/Neutral toward Opposition',
        steps: [
          'Do NOT expose last Taliban Guerrilla at a Taliban Base (last 2 if Find Fix Finish).',
          'Pause Terror to Extort whenever more Resources needed.',
          '1. Terror in Support spaces.',
          '2. Then in Neutral spaces.',
          'Within both: prioritize highest Pop.',
        ],
        specialActivity: 'extort_terror',
      },
      rally: {
        name: 'Rally',
        description: 'Place guerrillas and bases',
        steps: [
          'Rally in up to 6 spaces. Pause to Extort whenever more Resources needed.',
          'Place Guerrillas until none Available; thereafter flip Guerrillas Underground.',
          'At end of Rally: check if Taliban can buy Sharia for greatest shift.',
          '1. Rally at all Taliban Bases with no Taliban Guerrillas.',
          '2. Rally in spaces with 3+ Taliban Guerrillas — replace 2 with a Base (Active before Underground). Prioritize Pakistan.',
          '3. Rally where all Taliban Guerrillas at Taliban Bases are Active AND cubes present. Prioritize highest Pop.',
          '4. Rally in Kabul if no Underground Taliban Guerrilla there.',
          '5. Rally in up to 2 spaces at Neutral with no Coalition and no Taliban pieces. Highest Pop.',
          '6. Rally at all Taliban Bases. Pakistan last, then highest Pop.',
          '7. Rally in all 3 Pakistani spaces if free.',
        ],
        specialActivity: 'extort_rally',
      },
      march: {
        name: 'March',
        description: 'Move guerrillas to key locations',
        steps: [
          'Max ⅔ of Resources (no limit if <9). Do NOT relocate last Taliban Guerrilla at Base (last 2 if Find Fix). Maintain Taliban Control.',
          '1. Get 1 Underground Guerrilla to each Taliban Base with no such Guerrilla. Only March into Pakistani spaces with no Guerrillas at Bases.',
          '2. Get 3 Guerrillas (Underground if able) to 1 Afghan space with room for a Base (only if Bases Available).',
          '3. Get 1 Underground Guerrilla each into up to 3 spaces:',
          '   (a) Neutral spaces with no Taliban and no Coalition.',
          '   (b) Spaces with Support.',
          '   Within: lowest cost, then highest Pop.',
          '4. Get up to 2 Guerrillas onto each adjacent LoC to outnumber enemies. Prioritize highest Econ, then Underground arrival.',
        ],
        specialActivity: 'extort_rally',
      },
      attack: {
        name: 'Attack',
        description: 'Remove Coalition pieces',
        steps: [
          'Do NOT expose last Taliban Guerrilla at Base (last 2 if Find Fix).',
          '1. Attack (with Ambush if needed) where removing Coalition pieces. Government pieces in space prevent Coalition removal.',
          '2. Attack per Ambush priorities using Ambush, except in spaces with 6+ Taliban Guerrillas.',
          '3. Attack with groups of 4+ Taliban Guerrillas.',
        ],
        specialActivity: 'ambush',
      },
    },
    specialActivities: {
      extort_terror: {
        name: 'Extort',
        description: 'Gain Resources by intimidation (with Terror)',
        steps: [
          'Do not expose last Taliban Guerrilla at Taliban Base (last 2 if Find Fix).',
          '1. Extort everywhere possible without exposing last Guerrilla in a space with no Opposition.',
          '2. If Taliban still has 0 Resources: Extort everywhere possible.',
        ],
        fallback: null,
      },
      extort_rally: {
        name: 'Extort',
        description: 'Gain Resources on LoCs (with Rally/March)',
        steps: [
          'Extort on 3 and 4 Economic Value LoCs.',
          'If not possible: try Infiltrate instead.',
        ],
        fallback: 'infiltrate',
      },
      infiltrate: {
        name: 'Infiltrate',
        description: 'Remove enemy pieces by subversion',
        steps: [
          'In 1 space with Underground Taliban Guerrilla(s).',
          'Select to remove pieces of: first Player, then Government, then Warlords.',
          '(a) If Government is Player: where removing most Government cubes (reducing Patronage).',
          '(b) Where removing any faction\'s last piece(s).',
          '(c) Prioritize highest Pop and highest Econ.',
          'If a single cube removed: also place a Guerrilla there.',
        ],
        fallback: 'extort_terror',
      },
      ambush: {
        name: 'Ambush',
        description: 'Guaranteed kills with underground guerrillas',
        steps: [
          'Select Ambush spaces to remove pieces of:',
          '1. Coalition: Bases first, then Troops.',
          '2. Government: Bases, then Police, then Troops.',
          '3. Warlords: Bases, then Guerrillas.',
        ],
        fallback: 'extort_terror',
      },
    },
  },

  warlords: {
    id: 'warlords',
    name: 'Warlords',
    color: '#8c6d3f',
    bgColor: '#3d3020',
    description: 'Insurgent — Regional strongmen',
    questions: [
      {
        id: 'wl-q1',
        text: 'Would Rally replace Guerrillas with a Warlord Base (3+ Guerrillas in a space)?',
        yes: 'rally',
      },
      {
        id: 'wl-q2',
        text: 'Does NO Player Faction have a positive Victory margin?',
        yes: 'march',
      },
      {
        id: 'wl-q3',
        text: 'Would Terror reduce Victory margin of any Player Faction?',
        yes: 'terror',
        no: 'attack',
      },
    ],
    operations: {
      rally: {
        name: 'Rally',
        description: 'Place guerrillas and build bases',
        steps: [
          'Rally in up to 3 spaces. Place Guerrillas until none Available; then flip Underground.',
          '1. In spaces with 3+ Warlord Guerrillas:',
          '   (a) If no room for Base but there\'s a Government Base: Suborn it, then Rally replacing 2 Guerrillas with Base.',
          '   (b) Otherwise: replace 2 Guerrillas with a Base.',
          '2. In 1 highest Pop space with single Warlords Base and room:',
          '   (a) If Rally enables Cultivate: Rally then Cultivate.',
          '   (b) Otherwise: Cultivate then Rally.',
          '3. Rally at all Warlord Bases with no Guerrillas. Tiebreaker: highest Pop, then most Bases.',
          '4. Rally at all Warlord Bases. Highest Pop.',
          '5. Rally where Warlord Guerrilla(s) but no Warlord Bases.',
          '6. Rally in 1 random highest Pop space with 1+ Pop.',
        ],
        specialActivity: 'cultivate',
      },
      march: {
        name: 'March',
        description: 'Position guerrillas and remove control',
        steps: [
          'Do NOT relocate last Warlords Guerrilla at Base (last 2 where 2 Bases if Find Fix). Create no COIN nor Taliban Control.',
          '1. Get 1 Underground Guerrilla to each Warlord Base with no such Guerrilla.',
          '2. Get exactly 2 Guerrillas on each reachable LoC (Active first). Skip if Resources ≥ 45 or last Campaign.',
          '3. Unless last Campaign: get 3 Guerrillas into each reachable space with 1+ Pop and room for Base. Tiebreaker: highest Pop, then no Coalition.',
          '4. March to remove most Control. Prioritize Player Faction Control.',
          '5. If in a loop: March to highest Pop 1+ space, otherwise PASS (earn a Resource).',
        ],
        specialActivity: 'cultivate',
      },
      terror: {
        name: 'Terror',
        description: 'Reduce Player victory margins',
        steps: [
          'Terror in up to 3 spaces (shifting to Neutral). Do NOT expose last Guerrilla at Warlords Base.',
          '1. Terror to reduce Victory margin of any Player. Highest Pop.',
          '2. Terror in 1 random space for greatest reduction in Support or Opposition.',
        ],
        specialActivity: 'suborn',
      },
      attack: {
        name: 'Attack',
        description: 'Remove enemy pieces with force',
        steps: [
          'Attack in spaces with 4+ Warlord Guerrillas only. Do NOT expose last Guerrilla at Base.',
          '1. Attack to reduce Victory margin of any Player (removing Control or Bases). Highest Pop.',
        ],
        specialActivity: 'suborn',
      },
    },
    specialActivities: {
      cultivate: {
        name: 'Cultivate',
        description: 'Generate income from poppy',
        steps: [
          'If last Campaign: skip to Traffic.',
          '1. In a space with an existing Warlords Base. Highest Pop.',
          '2. Then in a space with no Warlords Base. Highest Pop.',
          '3. If no eligible space: Rally in 1 more space AND then Cultivate there.',
        ],
        fallback: 'traffic',
      },
      traffic: {
        name: 'Traffic',
        description: 'Earn Resources from drugs',
        steps: [
          '1. Traffic at all uncontrolled Warlord Base spaces.',
          '2. Traffic at all Warlord Bases excluding those where it would give a Player Resources or Patronage (i.e. spaces with Taliban or COIN Control).',
        ],
        fallback: 'suborn',
      },
      suborn: {
        name: 'Suborn',
        description: 'Buy off enemy forces',
        steps: [
          'Do not fall below 41 Resources.',
          '1. Suborn in spaces reducing Government Player\'s Victory margin by up to 4 points.',
          '2. Suborn to remove any Control in 1 highest Pop space in Afghanistan.',
        ],
        fallback: 'cultivate',
      },
    },
  },
};

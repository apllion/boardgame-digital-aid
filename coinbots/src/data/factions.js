export const FACTIONS = {
  government: {
    id: 'government',
    name: 'Government',
    color: '#4a7c4a',
    bgColor: '#2d4a2d',
    description: 'Counter-Insurgent faction',
    questions: [
      {
        id: 'gov-q1',
        text: 'Does a Government Base or City lack Government Control, Troops, or Police?',
        yes: 'train',
      },
      {
        id: 'gov-q2',
        text: 'Do 26 July + DR at any Economic Center Underground, or do they exceed cubes anywhere?',
        yes: 'garrison',
      },
      {
        id: 'gov-q3',
        text: 'Would Assault add Government Control, remove a Base, or remove 3+ guerrillas?',
        yes: 'assault',
        no: 'sweep',
      },
    ],
    operations: {
      train: {
        name: 'Train',
        description: 'Place cubes and build bases',
        steps: [
          'Spend up to 9 Resources, select up to 4 spaces (Cities and Government Bases).',
          'Until fewer than 4 cubes available, place 4 cubes: first where no Government Control, then where no Police, then where no Troops.',
          'In 1 Province with 2+ cubes, no Government Base, and room: replace 2 cubes (Troops then Police) with a Base.',
          'If no Base built: buy Civic Action in a Training space for the greatest shift (without spending Resources below 9).',
        ],
        specialActivity: 'transport',
      },
      garrison: {
        name: 'Garrison',
        description: 'Relocate Police and Troops',
        steps: [
          'Move Police then Troops to Economic Centers to equal Guerrillas there.',
          'Then move to add Government Control and at least 1 Police and 1 Troop to each City.',
          'Move FROM spaces with the most of the moving cube type, not the last Police.',
          'Then Assault where the most 26 July Guerrillas.',
        ],
        specialActivity: 'airstrike',
      },
      sweep: {
        name: 'Sweep',
        description: 'Activate underground guerrillas',
        steps: [
          'Spend up to 9 Resources, select up to 4 spaces.',
          'Activate Underground 26 July or DR Guerrillas: first at Support, then in Havana, then elsewhere.',
          'Within those priorities, first where cubes already present.',
          'Move in Troops needed to activate all Guerrillas and add Government Control (without losing existing Government Control).',
          'Target priority: 26 July, then DR, then Syndicate.',
        ],
        specialActivity: 'airstrike',
      },
      assault: {
        name: 'Assault',
        description: 'Remove enemy pieces',
        steps: [
          'Spend up to 9 Resources, select up to 4 spaces.',
          'First in spaces to remove the most Bases (not close them), then to take Cash, then to remove the most Guerrillas.',
          'In each space target: Bases first, then Cash, then 26 July, then DR, then Syndicate.',
        ],
        specialActivity: 'airstrike',
      },
    },
    specialActivities: {
      transport: {
        name: 'Transport',
        description: 'Move Troops to where needed',
        steps: [
          'Move up to 3 Troops to max 1 destination.',
          'FROM: City with most Troops above Government Control.',
          'TO: Province with Police but not Troops, then where Active Guerrillas exceed Troops, then to remove enemy Control.',
        ],
        fallback: null,
      },
      airstrike: {
        name: 'Airstrike',
        description: 'Remove an Active piece',
        steps: [
          'Target an Active piece in a Province if possible, otherwise an EC.',
          'Priority: remove 26 July Base, then DR Base.',
          'Then: remove 26 July Guerrilla where a Cube, then DR where a Cube.',
          'Then: remove any 26 July or DR Guerrilla.',
        ],
        fallback: 'reprisal',
      },
      reprisal: {
        name: 'Reprisal',
        description: 'Shift support and relocate guerrillas',
        steps: [
          'Shift highest Population Government-Controlled space with Opposition toward Neutral.',
          'Relocate 26 July, then DR, then Syndicate (Underground first) to Neutral or Opposition spaces if possible.',
        ],
        fallback: 'transport',
      },
    },
  },

  directorio: {
    id: 'directorio',
    name: 'Directorio',
    color: '#7c6a4a',
    bgColor: '#4a3d2d',
    description: 'Insurgent faction (students)',
    questions: [
      {
        id: 'dr-q1',
        text: 'Can DR Terror in an Active space or Assassinate a Government Base?',
        yes: 'terror',
      },
      {
        id: 'dr-q2',
        text: '6+ Guerrillas available, or would Rally place a Base?',
        yes: 'rally',
      },
      {
        id: 'dr-q3',
        text: 'Would Attack removing 1-2 Government or Syndicate pieces add DR Control?',
        yes: 'attack',
        no: 'march',
      },
    ],
    operations: {
      terror: {
        name: 'Terror',
        description: 'Place Terror markers and shift support',
        steps: [
          'Use Underground DR Guerrillas.',
          'First: where Active Support.',
          'Then: where Active Opposition.',
          'Finally: at 1 Assassination target — first a Government Base, then any player\'s Base, then other.',
        ],
        specialActivity: 'assassinate',
      },
      rally: {
        name: 'Rally',
        description: 'Place guerrillas and bases',
        steps: [
          'In Neutral or Passive spaces.',
          'Flip Underground where all Active DR Guerrillas, a DR Base, and a cube.',
          'Place Bases where at least 3 DR Guerrillas and room.',
          'Place Guerrillas at all DR Bases, then with DR Guerrillas, then 1 random.',
        ],
        specialActivity: 'subvert',
      },
      march: {
        name: 'March',
        description: 'Move guerrillas toward objectives',
        steps: [
          'Max 2 destinations.',
          'First: just enough to take DR Control of the highest Population City or Province possible (from where the most DR Guerrillas).',
          'Then: 1 Government-Controlled space (first where Support), with Guerrillas from all adjacent Opposition spaces and ECs.',
          'Move toward Havana. Do not remove DR Control or last DR Guerrilla from any space.',
        ],
        specialActivity: 'subvert',
      },
      attack: {
        name: 'Attack',
        description: 'Remove enemy pieces by force',
        steps: [
          'In up to 3 spaces with any enemy piece.',
          'Requires at least 1 Underground or 4 total DR Guerrillas; pick spaces with the most DR Guerrillas first.',
          'Target: first to take Cash, then Government, then 26 July.',
        ],
        specialActivity: 'ambush',
      },
    },
    specialActivities: {
      assassinate: {
        name: 'Assassinate',
        description: 'Remove a key enemy piece',
        steps: [
          'Where DR did max 1 Terror and DR Guerrillas > Police (max 1 space).',
          'Target priority: Government Base, then any player\'s Base, then piece to take Cash, then open Casino, then a cube, then 26 July.',
        ],
        fallback: null,
      },
      subvert: {
        name: 'Subvert',
        description: 'Remove support or opposition',
        steps: [
          'In a Province with DR Control (max 1).',
          'If 26 July at victory: remove the most Opposition possible.',
          'Otherwise: remove the most Support.',
          'If neither applies: at highest Population, Neutral if possible.',
        ],
        fallback: null,
      },
      ambush: {
        name: 'Ambush',
        description: 'Guaranteed kill with underground guerrilla',
        steps: [
          'Max 1 space.',
          'In the Attack space with the fewest total DR Guerrillas (at least 1 Underground).',
          'Target: first Cash, then Government, then Syndicate, then 26 July.',
        ],
        fallback: null,
      },
    },
  },

  july26: {
    id: 'july26',
    name: '26 July',
    color: '#4a4a7c',
    bgColor: '#2d2d4a',
    description: 'Insurgent faction (Castro)',
    questions: [
      {
        id: 'm26-q1',
        text: 'Could 26 July Terror Kidnap, Sabotage, or shift support?',
        yes: 'terror',
      },
      {
        id: 'm26-q2',
        text: '6+ Guerrillas available, or would Rally place a Base?',
        yes: 'rally',
      },
      {
        id: 'm26-q3',
        text: 'Does 26 July have 4+ Guerrillas with a Government piece?',
        yes: 'attack',
        no: 'march',
      },
    ],
    operations: {
      terror: {
        name: 'Terror',
        description: 'Kidnap, sabotage, and shift support',
        steps: [
          'Use Underground 26 July Guerrillas.',
          'First: where Kidnap possible (26 July Guerrillas > Police) — EC first, then City, then open Casino.',
          'Then: on all other un-Sabotaged ECs.',
          'Then: in each City and Province not at Opposition.',
          'If no "Pact of Caracas": at each Passive Opposition.',
        ],
        specialActivity: 'kidnap',
      },
      rally: {
        name: 'Rally',
        description: 'Place guerrillas and bases',
        steps: [
          'In non-Support spaces.',
          'Flip Underground where all Active 26 July Guerrillas, a 26 July Base, and a cube.',
          'Place Bases where at least 3 26 July Guerrillas and room.',
          'Place Guerrillas at 26 July Bases, then with 26 July Guerrillas, then 1 random.',
        ],
        specialActivity: 'infiltrate',
      },
      march: {
        name: 'March',
        description: 'Move guerrillas toward objectives',
        steps: [
          'Move to all ECs with Underground 26 July Guerrillas until 1 on each.',
          'Then: 1 Government-Controlled space (first where Support), with Guerrillas from all adjacent Opposition and ECs.',
          'Then: 1 space closer to Havana with largest 26 July group yet to move.',
          'Leave 1 26 July Guerrilla in each space.',
        ],
        specialActivity: 'infiltrate',
      },
      attack: {
        name: 'Attack',
        description: 'Remove government pieces',
        steps: [
          'Target Cash then Government pieces.',
          'In each space with at least 4 26 July Guerrillas that could take Cash or remove Government pieces.',
          'Then in 1 other City or Province where 26 July could Ambush — first to take Cash, then to remove Government pieces.',
        ],
        specialActivity: 'ambush',
      },
    },
    specialActivities: {
      kidnap: {
        name: 'Kidnap',
        description: 'Take resources from an enemy',
        steps: [
          'In 1 space where Terror was done and 26 July Guerrillas > Police.',
          'Target Cash if possible, otherwise a Faction with > 0 resources.',
          'Priority: Government Cash/Resources, otherwise Syndicate.',
        ],
        fallback: null,
      },
      infiltrate: {
        name: 'Infiltrate',
        description: 'Place underground guerrilla in key location',
        steps: [
          'In a non-Support space within 1 space of an Underground 26 July Guerrilla (max 1).',
          'Priority: at an EC, then to take Cash, then to remove last Police from a space, then elsewhere.',
        ],
        fallback: null,
      },
      ambush: {
        name: 'Ambush',
        description: 'Guaranteed kill with underground guerrilla',
        steps: [
          'Max 1 space.',
          'In the Attack space with the fewest total 26 July Guerrillas (at least 1 Underground).',
          'Priority: where Cash would be taken, then a Base removed, then random.',
        ],
        fallback: null,
      },
    },
  },

  syndicate: {
    id: 'syndicate',
    name: 'Syndicate',
    color: '#7c4a6a',
    bgColor: '#4a2d3d',
    description: 'Mafia faction',
    questions: [
      {
        id: 'syn-q1',
        text: 'Could Syndicate add a Guerrilla where a Casino has none?',
        yes: 'rally',
      },
      {
        id: 'syn-q2',
        text: 'Would Syndicate March to an empty EC or to a space with Cash?',
        yes: 'march',
      },
      {
        id: 'syn-q3',
        text: 'Are Available + Closed Casinos greater than Cash on map?',
        yes: 'construct',
        no: 'terror',
      },
    ],
    operations: {
      rally: {
        name: 'Rally',
        description: 'Protect casinos with guerrillas',
        steps: [
          'Place 1 Guerrilla per space with any Casino and no Syndicate Guerrillas.',
          'Then: where any open Casino, cube, and all Syndicate Guerrillas Active — flip Guerrillas Underground.',
        ],
        specialActivity: 'profit',
      },
      march: {
        name: 'March',
        description: 'Move to economic centers',
        steps: [
          'First: 1 to each empty EC, from where most Syndicate Guerrillas, then where no open Casino, then random.',
          'Then: if next Propaganda card is final, move any with Cash where no closed Casinos to any closed Casinos.',
        ],
        specialActivity: 'profit',
      },
      construct: {
        name: 'Construct',
        description: 'Build casinos',
        steps: [
          'In 1 space (2 if Resources > 35), at Government or Syndicate Control.',
          'If next Propaganda card is final: open closed Casinos where no Cash.',
          'Otherwise: place new closed Casinos, first where already 1 Casino.',
        ],
        specialActivity: 'profit',
      },
      terror: {
        name: 'Terror',
        description: 'Disrupt support where needed',
        steps: [
          'In up to 2 spaces with Underground Syndicate Guerrillas.',
          'If 26 July is a player and at victory: 1 space with Opposition.',
          'If Government is a player and at victory: 1 space with Support.',
          'If neither: in 1 random City/Province.',
        ],
        specialActivity: 'bribe',
      },
    },
    specialActivities: {
      profit: {
        name: 'Profit',
        description: 'Place Cash at open Casinos',
        steps: [
          'At 1-2 open Casinos.',
          'Place up to 2 Cash with Syndicate Guerrillas: first where Syndicate has no Cash, then where no enemy, then random.',
        ],
        fallback: 'muscle',
      },
      muscle: {
        name: 'Muscle',
        description: 'Move cubes to protect Casinos',
        steps: [
          'Move 2 cubes (Troops if to Province, Police if to City) — max 1 destination.',
          'TO: an open Casino in 26 July-Control, then DR-Control space.',
          'FROM: a space with the most Cubes.',
        ],
        fallback: 'bribe',
      },
      bribe: {
        name: 'Bribe',
        description: 'Move enemy pieces or take cash',
        steps: [
          'First: to take Cash, if possible.',
          'Then: move 26 July, then DR at open Casino.',
          'Then: move 26 July, then DR at Syndicate-controlled space.',
          'If Mafia Offensive event and Terror: Assassinate instead, if possible.',
        ],
        fallback: null,
      },
    },
  },
};

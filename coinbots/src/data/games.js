import { FACTIONS as CL_FACTIONS } from './factions';
import { CARDS as CL_CARDS, EVENT_INSTRUCTIONS as CL_EVENT_INSTRUCTIONS, FACTION_EVENT_SIDE as CL_FACTION_EVENT_SIDE } from './cards';
import { ADP_FACTIONS } from './adp-factions';

export const GAMES = {
  cubalibre: {
    id: 'cubalibre',
    name: 'Cuba Libre',
    subtitle: 'Vol II — Cuban Revolution',
    color: '#7c4a4a',
    factions: CL_FACTIONS,
    cards: CL_CARDS,
    eventInstructions: CL_EVENT_INSTRUCTIONS,
    factionEventSide: CL_FACTION_EVENT_SIDE,
  },
  adistantplain: {
    id: 'adistantplain',
    name: 'A Distant Plain',
    subtitle: 'Vol III — War in Afghanistan',
    color: '#8c6d3f',
    factions: ADP_FACTIONS,
    cards: null, // TODO: add ADP cards
    eventInstructions: null,
    factionEventSide: {
      coalition: 'unshaded',
      government: 'unshaded',
      taliban: 'shaded',
      warlords: 'shaded',
    },
  },
};

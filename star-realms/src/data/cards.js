// Star Trek Star Realms - Card Data
// Faction mapping from original Star Realms:
//   Trade Federation → Starfleet (blue)
//   Star Empire      → Klingon (red)
//   Blob             → Romulan (green)
//   Machine Cult     → Dominion (yellow)
//
// Card names: "stName" is the Star Trek name (fill in from physical cards).
// If stName is null, the original name is shown as fallback.

export const FACTIONS = {
  starfleet: { id: 'starfleet', name: 'Starfleet', color: '#4a90d9', original: 'Trade Federation' },
  klingon:   { id: 'klingon',   name: 'Klingon',   color: '#c0392b', original: 'Star Empire' },
  romulan:   { id: 'romulan',   name: 'Romulan',   color: '#27ae60', original: 'Blob' },
  dominion:  { id: 'dominion',  name: 'Dominion',   color: '#d4a017', original: 'Machine Cult' },
  unaligned: { id: 'unaligned', name: 'Unaligned',  color: '#888',    original: 'Unaligned' },
}

// Map original faction names to Star Trek factions
const FACTION_MAP = {
  'Trade Federation': 'starfleet',
  'Star Empire': 'klingon',
  'Blob': 'romulan',
  'Machine Cult': 'dominion',
  'Unaligned': 'unaligned',
  '': 'unaligned',
}

// Each card: { name, stName, faction, type, cost, qty, text, defense? }
// stName = Star Trek name (null = not yet mapped, uses original name)
const CORE_SET = [
  // ── Romulan (was Blob) ──────────────────────────────────
  { name: 'Blob Fighter',   stName: null, faction: 'romulan', type: 'Ship', cost: 1, qty: 3, text: 'Add 3 Combat Ally: Draw a card.' },
  { name: 'Trade Pod',      stName: null, faction: 'romulan', type: 'Ship', cost: 2, qty: 3, text: 'Add 3 Trade Ally: Add 2 Combat' },
  { name: 'Battle Pod',     stName: null, faction: 'romulan', type: 'Ship', cost: 2, qty: 2, text: 'Add 4 Combat You may scrap a card in the trade row. Ally: Add 2 Combat' },
  { name: 'Ram',            stName: null, faction: 'romulan', type: 'Ship', cost: 3, qty: 2, text: 'Add 5 Combat Ally: Add 2 Combat Scrap: Add 3 Trade' },
  { name: 'Blob Wheel',     stName: null, faction: 'romulan', type: 'Base', cost: 3, qty: 3, text: 'Add 1 Combat Scrap: Add 3 Trade', defense: '5' },
  { name: 'Blob Destroyer', stName: null, faction: 'romulan', type: 'Ship', cost: 4, qty: 2, text: 'Add 6 Combat Ally: Destroy target base and/or scrap a card in the trade row.' },
  { name: 'The Hive',       stName: null, faction: 'romulan', type: 'Base', cost: 5, qty: 1, text: 'Add 3 Combat Ally: Draw a card', defense: '5' },
  { name: 'Battle Blob',    stName: null, faction: 'romulan', type: 'Ship', cost: 6, qty: 1, text: 'Add 8 Combat Ally: Draw a card. Scrap: Add 4 Combat' },
  { name: 'Blob Carrier',   stName: null, faction: 'romulan', type: 'Ship', cost: 6, qty: 1, text: 'Add 7 Combat Ally: Acquire any ship without paying its cost and put it on top of your deck.' },
  { name: 'Mothership',     stName: null, faction: 'romulan', type: 'Ship', cost: 7, qty: 1, text: 'Add 6 Combat Draw a card. Ally: Draw a card.' },
  { name: 'Blob World',     stName: null, faction: 'romulan', type: 'Base', cost: 8, qty: 1, text: 'Add 5 Combat OR Draw a card for each Romulan card that you\'ve played this turn.' },

  // ── Dominion (was Machine Cult) ─────────────────────────
  { name: 'Trade Bot',      stName: null, faction: 'dominion', type: 'Ship', cost: 1, qty: 3, text: 'Add 1 Trade You may scrap a card in your hand or discard pile. Ally: Add 2 Combat' },
  { name: 'Missile Bot',    stName: null, faction: 'dominion', type: 'Ship', cost: 2, qty: 3, text: 'Add 2 Combat You may scrap a card in your hand or discard pile. Ally: Add 2 Combat' },
  { name: 'Supply Bot',     stName: null, faction: 'dominion', type: 'Ship', cost: 3, qty: 3, text: 'Add 2 Trade You may scrap a card in your hand or discard pile. Ally: Add 2 Combat' },
  { name: 'Battle Station', stName: null, faction: 'dominion', type: 'Base', cost: 3, qty: 2, text: 'Scrap: Add 5 Combat', defense: '5 Outpost' },
  { name: 'Patrol Mech',    stName: null, faction: 'dominion', type: 'Ship', cost: 4, qty: 2, text: 'Add 3 Trade OR Add 5 Combat Ally: You may scrap a card in your hand or discard pile.' },
  { name: 'Stealth Needle', stName: null, faction: 'dominion', type: 'Ship', cost: 4, qty: 1, text: 'Copy another ship you\'ve played this turn. Stealth Needle has that ship\'s faction in addition to Dominion.' },
  { name: 'Battle Mech',    stName: null, faction: 'dominion', type: 'Ship', cost: 5, qty: 1, text: 'Add 4 Combat You may scrap a card in your hand or discard pile. Ally: Draw a card.' },
  { name: 'Mech World',     stName: null, faction: 'dominion', type: 'Base', cost: 5, qty: 1, text: 'Mech World counts as an ally for all factions.', defense: '6 Outpost' },
  { name: 'Junkyard',       stName: null, faction: 'dominion', type: 'Base', cost: 6, qty: 1, text: 'Scrap a card in your hand or discard pile.', defense: '5 Outpost' },
  { name: 'Missile Mech',   stName: null, faction: 'dominion', type: 'Ship', cost: 6, qty: 1, text: 'Add 6 Combat You may destroy target base. Ally: Draw a card' },
  { name: 'Machine Base',   stName: null, faction: 'dominion', type: 'Base', cost: 7, qty: 1, text: 'Draw a card, then scrap a card from your hand.', defense: '6 Outpost' },
  { name: 'Brain World',    stName: null, faction: 'dominion', type: 'Base', cost: 8, qty: 1, text: 'Scrap up to two cards from your hand and/or discard pile. Draw a card for each card scrapped this way.', defense: '6 Outpost' },

  // ── Klingon (was Star Empire) ───────────────────────────
  { name: 'Imperial Fighter', stName: null, faction: 'klingon', type: 'Ship', cost: 1, qty: 3, text: 'Add 2 Combat Target opponent discards a card. Ally: Add 2 Combat' },
  { name: 'Corvette',         stName: null, faction: 'klingon', type: 'Ship', cost: 2, qty: 2, text: 'Add 1 Combat Draw a card. Ally: Add 2 Combat' },
  { name: 'Imperial Frigate', stName: null, faction: 'klingon', type: 'Ship', cost: 3, qty: 3, text: 'Add 4 Combat Target opponent discards a card. Ally: Add 2 Combat Scrap: Draw a card' },
  { name: 'Survey Ship',      stName: null, faction: 'klingon', type: 'Ship', cost: 3, qty: 2, text: 'Add 1 Trade Draw a card. Scrap: Target opponent discards a card.' },
  { name: 'Recycling Station',stName: null, faction: 'klingon', type: 'Base', cost: 4, qty: 2, text: 'Add 1 Trade OR Discard up to two cards, then draw that many cards.', defense: '4 Outpost' },
  { name: 'Space Station',    stName: null, faction: 'klingon', type: 'Base', cost: 4, qty: 2, text: 'Add 2 Combat Ally: Add 2 Combat Scrap: Add 4 Trade', defense: '4 Outpost' },
  { name: 'War World',        stName: null, faction: 'klingon', type: 'Base', cost: 5, qty: 1, text: 'Add 3 Combat Ally: Add 4 Combat', defense: '4 Outpost' },
  { name: 'Battlecruiser',    stName: null, faction: 'klingon', type: 'Ship', cost: 6, qty: 1, text: 'Add 5 Combat Draw a card. Ally: Target opponent discards a card. Scrap: Draw a card. You may destroy target base.' },
  { name: 'Royal Redoubt',    stName: null, faction: 'klingon', type: 'Base', cost: 6, qty: 1, text: 'Add 3 Combat Ally: Target opponent discards a card.', defense: '6 Outpost' },
  { name: 'Dreadnaught',      stName: null, faction: 'klingon', type: 'Ship', cost: 7, qty: 1, text: 'Add 7 Combat Draw a card. Scrap: Add 5 Combat' },
  { name: 'Fleet HQ',         stName: null, faction: 'klingon', type: 'Base', cost: 8, qty: 1, text: 'All of your ships get "Add 1 Combat"', defense: '8' },

  // ── Starfleet (was Trade Federation) ────────────────────
  { name: 'Federation Shuttle', stName: null, faction: 'starfleet', type: 'Ship', cost: 1, qty: 3, text: 'Add 2 Trade Ally: Add 4 Authority' },
  { name: 'Cutter',             stName: null, faction: 'starfleet', type: 'Ship', cost: 2, qty: 3, text: 'Add 4 Authority Add 2 Trade Ally: Add 4 Combat' },
  { name: 'Embassy Yacht',      stName: null, faction: 'starfleet', type: 'Ship', cost: 3, qty: 2, text: 'Add 3 Authority Add 2 Trade If you have two or more bases in play, draw two cards' },
  { name: 'Trading Post',       stName: null, faction: 'starfleet', type: 'Base', cost: 3, qty: 2, text: 'Add 1 Authority OR Add 1 Trade Scrap: Add 3 Combat', defense: '4 Outpost' },
  { name: 'Freighter',          stName: null, faction: 'starfleet', type: 'Ship', cost: 4, qty: 2, text: 'Add 4 Trade Ally: You may put the next ship you acquire this turn on top of your deck.' },
  { name: 'Barter World',       stName: null, faction: 'starfleet', type: 'Base', cost: 4, qty: 2, text: 'Add 2 Authority OR Add 2 Trade Scrap: Add 5 Combat', defense: '4' },
  { name: 'Defense Center',     stName: null, faction: 'starfleet', type: 'Base', cost: 5, qty: 1, text: 'Add 3 Authority OR Add 2 Combat Ally: Add 2 Combat', defense: '5 Outpost' },
  { name: 'Trade Escort',       stName: null, faction: 'starfleet', type: 'Ship', cost: 5, qty: 1, text: 'Add 4 Authority Add 4 Combat Ally: Draw a card.' },
  { name: 'Flagship',           stName: null, faction: 'starfleet', type: 'Ship', cost: 6, qty: 1, text: 'Add 5 Combat Draw a card. Ally: Add 5 Authority' },
  { name: 'Port of Call',       stName: null, faction: 'starfleet', type: 'Base', cost: 6, qty: 1, text: 'Add 3 Trade Scrap: Draw a card. You may destroy target base.', defense: '6 Outpost' },
  { name: 'Central Office',     stName: null, faction: 'starfleet', type: 'Base', cost: 7, qty: 1, text: 'Add 2 Trade You may put the next ship you acquire this turn on top of your deck. Ally: Draw a card.', defense: '6' },
  { name: 'Command Ship',       stName: null, faction: 'starfleet', type: 'Ship', cost: 8, qty: 1, text: 'Add 4 Authority Add 5 Combat Draw two cards. Ally: You may destroy target base.' },

  // ── Unaligned / Starting cards ──────────────────────────
  { name: 'Scout',    stName: null, faction: 'unaligned', type: 'Ship', cost: 0, qty: 8,  text: 'Add 1 Trade' },
  { name: 'Viper',    stName: null, faction: 'unaligned', type: 'Ship', cost: 0, qty: 2,  text: 'Add 1 Combat' },
  { name: 'Explorer', stName: null, faction: 'unaligned', type: 'Ship', cost: 2, qty: 10, text: 'Add 2 Trade Scrap: Add 2 Combat' },
]

// Helper: get display name (Star Trek name if available, otherwise original)
export function getCardDisplayName(card) {
  return card.stName || card.name
}

// Helper: get faction info
export function getFaction(factionId) {
  return FACTIONS[factionId] || FACTIONS.unaligned
}

export default CORE_SET

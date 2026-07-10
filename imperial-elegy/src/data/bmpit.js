// Bot Major Power Influence Table (BMPIT)
// Two dice: 1st die selects power column, 2nd die selects alliance row

export const POWERS_ORDER = ['GE', 'UK', 'FR', 'AU', 'RU', 'OT']

export const ALLIANCE_ROWS = {
  '1-2': 'TA',   // Triple Alliance
  '3-4': 'Neu',  // Neutral
  '5-6': 'TE',   // Triple Entente
}

export function lookupBMPIT(die1, die2) {
  const powerIndex = die1 - 1
  const power = POWERS_ORDER[powerIndex] || null

  let alliance
  if (die2 <= 2) alliance = 'TA'
  else if (die2 <= 4) alliance = 'Neu'
  else alliance = 'TE'

  return { power, alliance }
}

export const BMPIT_RULES = [
  'Allied bots will NOT influence another power to leave their alliance or an enemy bot to stay in their alliance.',
  'Neutral bots that influence another player to join an alliance split the influence between themselves and the other player.',
  'Italy: if doubles are rolled, the bot will influence Italy if able.',
]

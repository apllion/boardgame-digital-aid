// Bot Diplomatic Interest Table (BDIT)
// Maps die roll (1-6) to which bot power is interested in each region
// Format: { dieValue: 'POWER_CODE' } for each region

export const BDIT = {
  mainMap: {
    Germany:        { 1: 'GE', 2: 'GE', 3: 'GE', 4: 'GE', 5: null, 6: null, AU: [1, 2] },
    Italy:          { 1: null, 2: 'FR', 3: 'FR', 4: null, 5: null, 6: null, FR: [1, 3], AU: [3, 4] },
    'Low Countries': { 1: null, 2: 'UK', 3: null, 4: null, 5: 'GE', 6: 'GE', GE: [5, 6], FR: [4, 6] },
    Balkans:        { 1: null, 2: null, 3: null, 4: null, 5: 'RU', 6: 'OT', AU: [5, 6] },
  },
  submaps: {
    Africa:         { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, GE: [1, 4], UK: [1, 3], FR: [1, 4], OT: [1, 3] },
    'Great Game':   { 1: null, 2: null, 3: null, 4: null, 5: 'RU', 6: null, UK: [4, 5], OT: [4, 6] },
    'Jpn + Pac':    { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, GE: [5, 6], UK: [6, 6], FR: [5, 6] },
  },
}

// Restructured for easier lookup: given a bot power, which regions + die ranges apply?
// This is the primary lookup used during play.
export const BDIT_BY_POWER = {
  GE: [
    { region: 'Germany', range: [1, 4], map: 'main' },
    { region: 'Low Countries', range: [5, 6], map: 'main' },
    { region: 'Africa', range: [1, 4], map: 'sub' },
    { region: 'Jpn + Pac', range: [5, 6], map: 'sub' },
  ],
  UK: [
    { region: 'Low Countries', range: [2, 2], map: 'main' },
    { region: 'Africa', range: [1, 3], map: 'sub' },
    { region: 'Great Game', range: [4, 5], map: 'sub' },
    { region: 'Jpn + Pac', range: [6, 6], map: 'sub' },
  ],
  FR: [
    { region: 'Italy', range: [1, 3], map: 'main' },
    { region: 'Low Countries', range: [4, 6], map: 'main' },
    { region: 'Africa', range: [1, 4], map: 'sub' },
    { region: 'Jpn + Pac', range: [5, 6], map: 'sub' },
  ],
  AU: [
    { region: 'Germany', range: [1, 2], map: 'main' },
    { region: 'Italy', range: [3, 4], map: 'main' },
    { region: 'Balkans', range: [5, 6], map: 'main' },
  ],
  RU: [
    { region: 'Balkans', range: [5, 5], map: 'main' },
    { region: 'Great Game', range: [5, 5], map: 'sub' },
  ],
  OT: [
    { region: 'Balkans', range: [6, 6], map: 'main' },
    { region: 'Africa', range: [1, 3], map: 'sub' },
    { region: 'Great Game', range: [4, 6], map: 'sub' },
  ],
}

// Special: OT will always diplomacy/ally Egypt if able

// Full table for display purposes
export const BDIT_DISPLAY = {
  columns: ['Region', '1', '2', '3', '4', '5', '6'],
  mainMap: [
    { region: 'Germany',        cells: ['GE', 'GE', 'GE', 'GE', '', ''] },
    { region: 'Italy',          cells: ['', 'FR', 'FR', 'AU', '', ''] },
    { region: 'Low Countries',  cells: ['', 'UK', '', 'FR', 'GE', 'GE'] },
    { region: 'Balkans',        cells: ['', '', '', '', 'RU', 'OT*'] },
  ],
  submaps: [
    { region: 'Africa',         cells: ['GE', 'GE', 'FR', 'FR', '', 'OT'] },
    { region: 'Great Game',     cells: ['', '', '', 'UK', 'RU', 'OT'] },
    { region: 'Jpn + Pac',      cells: ['', '', '', '', 'GE', 'FR'] },
  ],
  footnote: '*OT will always diplomacy/ally Egypt if able',
}

// Corrected BDIT display matching the PAC exactly
// Re-reading the PAC image more carefully:
// Africa row: GE 1-4, UK 1-3, FR 1-4, OT 1-3
// But the table shows columns 1-6, and multiple powers can share a column
// The table uses colored cells: dark(GE), blue(UK), red(FR), yellow(AU), white(RU), green(OT)

export function lookupBDIT(power, dieRoll) {
  const entries = BDIT_BY_POWER[power] || []
  const matches = entries.filter(e => dieRoll >= e.range[0] && dieRoll <= e.range[1])
  return matches
}

import { useState } from 'react'
import { BDIT_BY_POWER } from '../data/bdit'
import DiceRoll from './DiceRoll'

const MAIN_ROWS = [
  { region: 'Germany',        cells: [['GE'],['GE'],['GE'],['GE','AU'],[],[]] },
  { region: 'Italy',          cells: [[],['FR'],['FR','AU'],['AU'],[],[]] },
  { region: 'Low Countries',  cells: [['GE'],['UK'],['FR'],['FR'],['GE'],['GE']] },
  { region: 'Balkans',        cells: [[],[],[],['AU'],['AU','RU'],['OT']] },
]

const SUB_ROWS = [
  { region: 'Africa',         cells: [['GE'],['GE','UK'],['FR','UK'],['FR','GE'],[],['OT']] },
  { region: 'Great Game',     cells: [[],[],[],['UK'],['UK','RU'],['OT']] },
  { region: 'Jpn + Pac',      cells: [[],[],[],[],['GE','FR'],['GE','UK','FR']] },
]

function powerClass(code) {
  return code ? code.toLowerCase() : ''
}

export default function BDITTable({ activePower, highlightResult, startExpanded }) {
  const [expanded, setExpanded] = useState(startExpanded || false)

  function renderRow(row) {
    return (
      <tr key={row.region}>
        <td style={{ textAlign: 'left', fontWeight: 600, background: '#2a2a4a' }}>{row.region}</td>
        {row.cells.map((cell, i) => {
          const dieVal = i + 1
          const isHighlighted = highlightResult && highlightResult.region === row.region && highlightResult.die === dieVal
          if (cell.length === 0) {
            return <td key={i} className={isHighlighted ? 'highlight-cell' : ''}></td>
          }
          // Show the cell with the active power's color if it matches
          const matchesPower = activePower && cell.includes(activePower)
          const primaryPower = matchesPower ? activePower : cell[0]
          return (
            <td
              key={i}
              className={`${powerClass(primaryPower)} ${isHighlighted ? 'highlight-cell' : ''}`}
            >
              {cell.join('/')}
            </td>
          )
        })}
      </tr>
    )
  }

  return (
    <div>
      <div className="collapsible-header" onClick={() => setExpanded(!expanded)}>
        <span>BDIT - Bot Diplomatic Interest Table</span>
        <span className={`chevron ${expanded ? 'open' : ''}`}>{'\u25B6'}</span>
      </div>
      {expanded && (
        <div className="collapsible-body">
          <table className="reference-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan={7} className="table-section-header">Main Map</td></tr>
              {MAIN_ROWS.map(renderRow)}
              <tr><td colSpan={7} className="table-section-header">Submaps</td></tr>
              {SUB_ROWS.map(renderRow)}
            </tbody>
          </table>
          <p className="table-footnote">*OT will always diplomacy/ally Egypt if able</p>

          {activePower && (
            <div style={{ marginTop: '0.75rem' }}>
              <h3>{activePower} Diplomatic Interests</h3>
              <ul className="rules-list">
                {(BDIT_BY_POWER[activePower] || []).map((e, i) => (
                  <li key={i}>{e.region}: die {e.range[0]}{e.range[1] !== e.range[0] ? `-${e.range[1]}` : ''} ({e.map === 'main' ? 'Main Map' : 'Submap'})</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

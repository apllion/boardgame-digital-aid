import { useState } from 'react'
import { POWERS_ORDER, BMPIT_RULES, lookupBMPIT } from '../data/bmpit'
import { POWERS } from '../data/botRules'

export default function BMPITTable({ highlightResult, startExpanded }) {
  const [expanded, setExpanded] = useState(startExpanded || false)

  const allianceLabels = ['Triple Alliance', 'Triple Alliance', 'Neutral', 'Neutral', 'Triple Entente', 'Triple Entente']
  const rowRanges = ['1-2', '3-4', '5-6']
  const allianceColors = { TA: '#c89100', Neu: '#666', TE: '#1565c0' }

  return (
    <div>
      <div className="collapsible-header" onClick={() => setExpanded(!expanded)}>
        <span>BMPIT - Bot Major Power Influence Table</span>
        <span className={`chevron ${expanded ? 'open' : ''}`}>{'\u25B6'}</span>
      </div>
      {expanded && (
        <div className="collapsible-body">
          <table className="reference-table">
            <thead>
              <tr>
                <th>2nd die \ 1st die</th>
                {POWERS_ORDER.map(p => (
                  <th key={p} className={p.toLowerCase()}>{p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowRanges.map((range, ri) => {
                const alliance = ['TA', 'Neu', 'TE'][ri]
                const labels = ['Triple Alliance', 'Neutral', 'Triple Entente']
                return (
                  <tr key={range}>
                    <td style={{ fontWeight: 600, background: '#2a2a4a' }}>{range}</td>
                    {POWERS_ORDER.map((p, ci) => {
                      const isHighlighted = highlightResult &&
                        highlightResult.power === p &&
                        highlightResult.alliance === alliance
                      return (
                        <td
                          key={p}
                          style={{ background: allianceColors[alliance], color: alliance === 'Neu' ? '#eee' : '#fff' }}
                          className={isHighlighted ? 'highlight-cell' : ''}
                        >
                          {labels[ri]}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div style={{ marginTop: '0.75rem' }}>
            <ul className="rules-list">
              {BMPIT_RULES.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

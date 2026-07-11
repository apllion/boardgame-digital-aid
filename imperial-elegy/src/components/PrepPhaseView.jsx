import { useState } from 'react'
import { useGameContext } from '@shared/game-tree'
import { SEQUENCE_OF_PLAY } from '../data/playerAid'
import { PREP_PHASE } from '../data/botRules'
import RulesViewer from './RulesViewer'

export default function PrepPhaseView() {
  const ctx = useGameContext()
  const [subView, setSubView] = useState(null)

  if (subView) {
    return (
      <div>
        <div className="gt-breadcrumbs">
          <button className="gt-back-btn" onClick={() => setSubView(null)}>&#x2039;</button>
          <div className="gt-breadcrumb-trail">
            <span className="gt-breadcrumb-active">{subView.title}</span>
          </div>
        </div>
        <div className="gt-content">{subView.render()}</div>
      </div>
    )
  }

  return (
    <div>
      <div className="card info">
        <div className="card-title">Prep Phase [10.0]</div>
        <ul className="rules-list">
          {SEQUENCE_OF_PLAY[0].steps.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
        {ctx.bots.size > 0 && (
          <div style={{ marginTop: '0.5rem', padding: '0.4rem', background: '#1a1a3e', borderRadius: '6px', fontSize: '0.8rem', color: '#aaa' }}>
            Bot: {PREP_PHASE.text}
          </div>
        )}
      </div>

      <div className="card highlight">
        <div className="card-title">Diplomacy Phase [11.0]</div>
        <ul className="rules-list">
          {SEQUENCE_OF_PLAY[1].steps.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
        {ctx.bots.size > 0 && (
          <div style={{ marginTop: '0.5rem', padding: '0.4rem', background: '#1a1a3e', borderRadius: '6px', fontSize: '0.8rem', color: '#aaa' }}>
            Bots skip diplomacy. Random home card added to pile (GE/OT top, FR/AU/RU shuffled, UK bottom).
          </div>
        )}
      </div>

      <div className="gt-children-list" style={{ marginTop: '0.75rem' }}>
        <button className="gt-child-item" style={{ borderLeftColor: '#4a5adb' }} onClick={() => setSubView({
          title: 'Rulebook',
          render: () => <RulesViewer section="10.0" />,
        })}>
          <span className="gt-child-label">Search Rulebook</span>
          <span className="gt-child-arrow">&rsaquo;</span>
        </button>
      </div>
    </div>
  )
}

import { useGameContext } from '@shared/game-tree'
import { SEQUENCE_OF_PLAY } from '../data/playerAid'
import { PREP_PHASE, POWERS, TURN_ORDER, HOME_CARD_PLACEMENT } from '../data/botRules'

const PLACEMENT_LABEL = {
  top: 'Home card ON TOP of pile',
  bottom: 'Home card ON BOTTOM of pile',
  shuffled: 'Home card SHUFFLED into pile',
}

const PLACEMENT_COLOR = {
  top: '#c0392b',
  bottom: '#2e5ea8',
  shuffled: '#888',
}

export default function PrepPhaseView() {
  const ctx = useGameContext()
  const botIds = TURN_ORDER.filter(id => ctx.bots.has(id))

  return (
    <div>
      <div className="card info">
        <div className="card-title">Prep Phase [10.0]</div>
        <ul className="rules-list">
          {SEQUENCE_OF_PLAY[0].steps.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
        {botIds.length > 0 && (
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
        {botIds.length > 0 && (
          <div style={{ marginTop: '0.75rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Bot Deck Setup</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {botIds.map(id => {
                const p = POWERS[id]
                const placement = HOME_CARD_PLACEMENT[id]
                return (
                  <div key={id} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.4rem 0.5rem', background: '#1a1a3e', borderRadius: '6px',
                    borderLeft: `3px solid ${p.color}`,
                  }}>
                    <span style={{ fontWeight: 700, minWidth: '28px', color: p.color }}>{p.short}</span>
                    <span style={{ fontSize: '0.8rem', color: PLACEMENT_COLOR[placement] }}>
                      {PLACEMENT_LABEL[placement]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

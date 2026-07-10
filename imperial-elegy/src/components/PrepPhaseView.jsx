import { useGameContext } from '@shared/game-tree'
import { SEQUENCE_OF_PLAY } from '../data/playerAid'
import { PREP_PHASE } from '../data/botRules'

export default function PrepPhaseView() {
  const ctx = useGameContext()

  return (
    <div>
      <div className="card info">
        <div className="card-title">Prep Phase</div>
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
        <div className="card-title">Diplomacy Phase</div>
        <ul className="rules-list">
          {SEQUENCE_OF_PLAY[1].steps.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
        {ctx.bots.size > 0 && (
          <div style={{ marginTop: '0.5rem', padding: '0.4rem', background: '#1a1a3e', borderRadius: '6px', fontSize: '0.8rem', color: '#aaa' }}>
            Bots skip diplomacy. Random home card added to pile (GE/OT top, FR/AU/RU shuffled, UK bottom).
          </div>
        )}
      </div>
    </div>
  )
}

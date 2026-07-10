import { useGameContext } from '@shared/game-tree'
import { SEQUENCE_OF_PLAY } from '../data/playerAid'
import { END_PHASE } from '../data/botRules'

export default function EndPhaseView() {
  const ctx = useGameContext()

  return (
    <div>
      <div className="card info">
        <div className="card-title">End Phase</div>
        <ul className="rules-list">
          {SEQUENCE_OF_PLAY[3].steps.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
        {ctx.bots.size > 0 && (
          <div style={{ marginTop: '0.5rem', padding: '0.4rem', background: '#1a1a3e', borderRadius: '6px', fontSize: '0.8rem', color: '#aaa' }}>
            Bot: {END_PHASE.text}
          </div>
        )}
      </div>
    </div>
  )
}

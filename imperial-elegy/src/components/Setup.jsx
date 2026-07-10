import { POWERS, TURN_ORDER, DIFFICULTY_LEVELS } from '../data/botRules'

export default function Setup({ config, onConfigChange, onStart }) {
  const { bots, difficulty } = config

  function toggleBot(powerId) {
    const next = new Set(bots)
    if (next.has(powerId)) next.delete(powerId)
    else next.add(powerId)
    onConfigChange({ ...config, bots: next })
  }

  return (
    <div className="setup">
      <h2>Select Bot Powers</h2>
      <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.75rem' }}>
        Tap a power to toggle it as a bot. You play the remaining powers.
      </p>

      <div className="power-grid">
        {TURN_ORDER.map(id => {
          const p = POWERS[id]
          const isBot = bots.has(id)
          return (
            <div
              key={id}
              className={`power-card ${isBot ? 'selected' : ''}`}
              style={{
                borderColor: isBot ? p.color : '#333',
                background: isBot ? p.bgColor : '#252540',
                color: isBot ? p.textColor : '#e0e0e0',
              }}
              onClick={() => toggleBot(id)}
            >
              <div className="name">{p.name}</div>
              <div className="code">{p.short}</div>
              <div className="bot-badge" style={{ visibility: isBot ? 'visible' : 'hidden' }}>BOT</div>
            </div>
          )
        })}
      </div>

      <div className="difficulty-section">
        <h2>Bot Difficulty</h2>
        <div className="difficulty-buttons">
          {Object.entries(DIFFICULTY_LEVELS).map(([key, d]) => (
            <button
              key={key}
              className={difficulty === key ? 'active' : ''}
              onClick={() => onConfigChange({ ...config, difficulty: key })}
            >
              <div>{d.label}</div>
              <div style={{ fontSize: '0.7rem', color: '#aaa' }}>{d.ngs} NGs</div>
            </button>
          ))}
        </div>
        <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>
          Difficulty determines how many National Goals bots draw and free redeployment at war start.
        </p>
      </div>

      <button
        className="btn btn-primary btn-full"
        onClick={onStart}
      >
        {bots.size === 0
          ? 'Start Game (Player Aid only)'
          : `Start Game (${bots.size} bot${bots.size !== 1 ? 's' : ''}, ${6 - bots.size} player${6 - bots.size !== 1 ? 's' : ''})`
        }
      </button>
    </div>
  )
}

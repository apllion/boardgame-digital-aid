import { useState, useCallback } from 'react'
import Dictionary from './Dictionary'

const PLAYER_COLORS = ['#4a90d9', '#d94a4a', '#4ad97a', '#d9b44a']
const PLAYER_NAMES = ['Player 1', 'Player 2', 'Player 3', 'Player 4']

export default function AuthorityCounter({ playerCount, startingAuthority, onBack }) {
  const [authorities, setAuthorities] = useState(
    () => Array(playerCount).fill(startingAuthority)
  )
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [showDict, setShowDict] = useState(false)
  const [rotated, setRotated] = useState(() => Array(playerCount).fill(false))

  const adjust = useCallback((playerIdx, delta) => {
    setAuthorities(prev => {
      const next = [...prev]
      next[playerIdx] = prev[playerIdx] + delta
      return next
    })
    setHistory(prev => [
      { player: playerIdx, delta, result: authorities[playerIdx] + delta, time: Date.now() },
      ...prev,
    ])
  }, [authorities])

  const reset = useCallback(() => {
    setAuthorities(Array(playerCount).fill(startingAuthority))
    setHistory([])
  }, [playerCount, startingAuthority])

  return (
    <div className="counter-screen">
      <div className="players-container">
        {authorities.map((auth, idx) => (
          <div
            key={idx}
            className={`player-panel${rotated[idx] ? ' rotated' : ''}`}
            style={{ borderLeft: `4px solid ${PLAYER_COLORS[idx]}` }}
          >
            <div className="player-name" style={{ color: PLAYER_COLORS[idx] }}>
              {PLAYER_NAMES[idx]}
            </div>
            <div className="player-content">
              <button className="adjust-btn minus" onClick={() => adjust(idx, -1)}>-</button>
              <div
                className={`authority-value${auth <= 10 ? (auth <= 5 ? ' critical' : ' low') : ''}`}
                style={{ color: auth > 10 ? PLAYER_COLORS[idx] : undefined }}
              >
                {auth}
              </div>
              <button className="adjust-btn plus" onClick={() => adjust(idx, +1)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="toolbar">
        <button onClick={onBack}>Back</button>
        {authorities.map((_, idx) => (
          <button key={idx} onClick={() => setRotated(prev => {
            const next = [...prev]
            next[idx] = !next[idx]
            return next
          })}>
            P{idx + 1} {rotated[idx] ? '↑' : '↓'}
          </button>
        ))}
        <button onClick={() => setShowDict(true)}>EN → DE</button>
        <button onClick={() => setShowHistory(true)}>History ({history.length})</button>
        <button className="reset-btn" onClick={reset}>Reset</button>
      </div>

      {showDict && <Dictionary onClose={() => setShowDict(false)} />}

      {showHistory && (
        <div className="history-overlay" onClick={() => setShowHistory(false)}>
          <div className="history-panel" onClick={e => e.stopPropagation()}>
            <h3>
              History
              <button className="close-btn" onClick={() => setShowHistory(false)}>Close</button>
            </h3>
            {history.length === 0 ? (
              <p className="history-empty">No changes yet</p>
            ) : (
              history.map((entry, i) => (
                <div key={i} className="history-entry">
                  <span className="player" style={{ color: PLAYER_COLORS[entry.player] }}>
                    {PLAYER_NAMES[entry.player]}
                  </span>
                  <span className={`delta ${entry.delta > 0 ? 'positive' : 'negative'}`}>
                    {entry.delta > 0 ? '+' : ''}{entry.delta}
                  </span>
                  <span className="result">{entry.result}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

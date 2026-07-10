import { useState, useMemo } from 'react'
import { useGameTree, SwipeableContainer, GameTreeContext } from '@shared/game-tree'
import '@shared/game-tree/styles.css'
import { buildImperialElegyTree } from '../trees/imperialElegyTree'
import { POWERS } from '../data/botRules'

export default function GameSession({ config, onBack }) {
  const [turn, setTurn] = useState(1)
  const [isWartime, setIsWartime] = useState(false)
  const [isGW, setIsGW] = useState(false)
  const [history, setHistory] = useState([])

  const gameCtx = useMemo(() => ({
    turn,
    isWartime,
    isGW,
    bots: config.bots,
    difficulty: config.difficulty,
    addHistory: (powerId, text) => setHistory(h => [...h, { power: powerId, text }]),
    onLoop: () => {
      setTurn(t => t + 1)
      setHistory([])
    },
  }), [turn, isWartime, isGW, config.bots, config.difficulty])

  const gameTree = useMemo(() => buildImperialElegyTree(config), [config])
  const tree = useGameTree(gameTree, gameCtx)

  return (
    <GameTreeContext.Provider value={gameCtx}>
      {/* Turn bar */}
      <div className="turn-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem' }}
            onClick={() => turn > 1 && setTurn(t => t - 1)}
            disabled={turn <= 1}
          >&lsaquo;</button>
          <span>Turn <span className="turn-number">{turn}</span></span>
          <button
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem' }}
            onClick={() => setTurn(t => t + 1)}
          >&rsaquo;</button>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            className={`btn ${isWartime ? 'btn-danger' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
            onClick={() => { setIsWartime(!isWartime); setIsGW(false) }}
          >
            {isWartime ? 'War' : 'Peace'}
          </button>
          {isWartime && (
            <button
              className={`btn ${isGW ? 'btn-danger' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              onClick={() => setIsGW(!isGW)}
            >
              {isGW ? 'GW' : 'Ltd'}
            </button>
          )}
          <button
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
            onClick={onBack}
          >
            Setup
          </button>
        </div>
      </div>

      {/* Game Tree */}
      <SwipeableContainer tree={tree} onBack={onBack} />

      {/* History log */}
      {history.length > 0 && (
        <div className="history" style={{ marginTop: '1rem' }}>
          <h3>Turn {turn} Log</h3>
          {history.map((entry, i) => (
            <div key={i} className="history-entry">
              <span className="power" style={{ color: POWERS[entry.power]?.color }}>{entry.power}</span>
              <span className="action">{entry.text}</span>
            </div>
          ))}
        </div>
      )}
    </GameTreeContext.Provider>
  )
}

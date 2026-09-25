import { useState } from 'react'
import AuthorityCounter from './components/AuthorityCounter'

const STARTING_AUTHORITY = 50

export default function App() {
  const [playerCount, setPlayerCount] = useState(null)

  if (playerCount === null) {
    return (
      <div className="setup">
        <h1>Star Realms</h1>
        <p className="subtitle">Authority Counter</p>
        <p style={{ color: '#888', fontSize: '0.85rem' }}>Players</p>
        <div className="player-count">
          {[2, 3, 4].map(n => (
            <button key={n} onClick={() => setPlayerCount(n)}>
              {n}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <AuthorityCounter
      playerCount={playerCount}
      startingAuthority={STARTING_AUTHORITY}
      onBack={() => setPlayerCount(null)}
    />
  )
}

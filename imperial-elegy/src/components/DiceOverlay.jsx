import { useState } from 'react'
import DiceRoll from './DiceRoll'

export default function DiceOverlay({ onClose }) {
  const [randomN, setRandomN] = useState(null)
  const [randomResult, setRandomResult] = useState(null)

  function rollRandom(n) {
    setRandomN(n)
    setRandomResult(Math.ceil(Math.random() * n))
  }

  return (
    <div className="dice-overlay" onClick={onClose}>
      <div className="dice-overlay-content" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>Dice &amp; Random</span>
          <button className="gt-back-btn" onClick={onClose}>&times;</button>
        </div>

        {/* 1d6 */}
        <DiceRoll label="1d6" onRoll={() => {}} />

        {/* 2d6 */}
        <div style={{ marginTop: '0.75rem' }}>
          <DiceRoll label="2d6" count={2} onRoll={() => {}} />
        </div>

        {/* Random from N */}
        <div style={{ marginTop: '1rem', borderTop: '1px solid #444', paddingTop: '0.75rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Pick random (1 to N)</div>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {[2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map(n => (
              <button
                key={n}
                className={`die-pick ${randomN === n ? 'active' : ''}`}
                style={{ width: 38, height: 38 }}
                onClick={() => rollRandom(n)}
              >
                {n}
              </button>
            ))}
          </div>
          {randomResult !== null && (
            <div style={{ marginTop: '0.5rem', fontSize: '1.2rem', fontWeight: 700, textAlign: 'center' }}>
              <span style={{ color: '#888', fontSize: '0.85rem' }}>1-{randomN}: </span>
              <span style={{ color: '#f9a825' }}>{randomResult}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

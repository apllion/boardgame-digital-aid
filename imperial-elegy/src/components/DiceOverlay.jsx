import { useState } from 'react'
import { POWERS, TURN_ORDER } from '../data/botRules'
import DiceRoll from './DiceRoll'

export default function DiceOverlay({ onClose }) {
  const [randomN, setRandomN] = useState(null)
  const [randomResult, setRandomResult] = useState(null)
  const [randomPower, setRandomPower] = useState(null)
  const [history, setHistory] = useState([])

  function addToHistory(label, result) {
    setHistory(h => [{ label, result, time: Date.now() }, ...h].slice(0, 10))
  }

  function rollRandom(n) {
    const result = Math.ceil(Math.random() * n)
    setRandomN(n)
    setRandomResult(result)
    addToHistory(`1-${n}`, result)
  }

  function rollPower() {
    const idx = Math.floor(Math.random() * TURN_ORDER.length)
    const id = TURN_ORDER[idx]
    setRandomPower(id)
    addToHistory('Power', POWERS[id].name)
  }

  return (
    <div className="dice-overlay" onClick={onClose}>
      <div className="dice-overlay-content" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>Dice &amp; Random</span>
          <button className="gt-back-btn" onClick={onClose}>&times;</button>
        </div>

        {/* 1d6 */}
        <DiceRoll label="1d6" onRoll={(v) => addToHistory('1d6', v)} />

        {/* 2d6 */}
        <div style={{ marginTop: '0.75rem' }}>
          <DiceRoll label="2d6" count={2} onRoll={(v) => addToHistory('2d6', v.join(' + '))} />
        </div>

        {/* Random power */}
        <div style={{ marginTop: '1rem', borderTop: '1px solid #444', paddingTop: '0.75rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Random Power</div>
          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
            <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }} onClick={rollPower}>
              Roll
            </button>
            {randomPower && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.3rem 0.6rem', borderRadius: '6px',
                background: POWERS[randomPower].color, color: POWERS[randomPower].textColor,
                fontWeight: 700, fontSize: '0.9rem',
              }}>
                {POWERS[randomPower].short} — {POWERS[randomPower].name}
              </span>
            )}
          </div>
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

        {/* Results history */}
        {history.length > 0 && (
          <div style={{ marginTop: '1rem', borderTop: '1px solid #444', paddingTop: '0.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', marginBottom: '0.35rem' }}>Recent</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              {history.map((h, i) => (
                <div key={h.time} style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: '0.8rem', color: i === 0 ? '#e0e0e0' : '#666',
                  padding: '0.15rem 0',
                }}>
                  <span>{h.label}</span>
                  <span style={{ fontWeight: 700, color: i === 0 ? '#f9a825' : '#666' }}>{h.result}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

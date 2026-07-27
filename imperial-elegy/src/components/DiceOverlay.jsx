import { useState } from 'react'
import { POWERS, TURN_ORDER } from '../data/botRules'
import DiceRoll from './DiceRoll'

const BALKAN_STATES = ['Serbia', 'Bulgaria', 'Romania', 'Greece', 'Bosnia', 'Albania', 'Montenegro']
const REGIONS_MAIN = ['Germany', 'Italy', 'Low Countries', 'Balkans']
const REGIONS_SUB = ['Africa', 'Great Game', 'Jpn + Pac']
const ALLIANCES = [
  { label: 'Triple Alliance', color: '#c89100' },
  { label: 'Neutral', color: '#666' },
  { label: 'Triple Entente', color: '#1565c0' },
]

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function RandomPicker({ label, items, onPick, resultDisplay }) {
  const [result, setResult] = useState(null)

  function roll() {
    const picked = pickRandom(items)
    setResult(picked)
    onPick(label, typeof resultDisplay === 'function' ? resultDisplay(picked) : picked)
  }

  return (
    <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.35rem 0.7rem' }} onClick={roll}>
        {label}
      </button>
      {result !== null && (
        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f9a825' }}>
          {typeof resultDisplay === 'function' ? resultDisplay(result) : result}
        </span>
      )}
    </div>
  )
}

export default function DiceOverlay({ onClose }) {
  const [randomN, setRandomN] = useState(null)
  const [randomResult, setRandomResult] = useState(null)
  const [history, setHistory] = useState([])

  function addToHistory(label, result) {
    setHistory(h => [{ label, result, time: Date.now() }, ...h].slice(0, 12))
  }

  function rollRandom(n) {
    const result = Math.ceil(Math.random() * n)
    setRandomN(n)
    setRandomResult(result)
    addToHistory(`1-${n}`, result)
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

        {/* Quick random pickers */}
        <div style={{ marginTop: '1rem', borderTop: '1px solid #444', paddingTop: '0.75rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Quick Random</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <RandomPicker
              label="Power"
              items={TURN_ORDER}
              onPick={addToHistory}
              resultDisplay={(id) => `${POWERS[id].short} — ${POWERS[id].name}`}
            />
            <RandomPicker
              label="Balkan"
              items={BALKAN_STATES}
              onPick={addToHistory}
            />
            <RandomPicker
              label="Region"
              items={[...REGIONS_MAIN, ...REGIONS_SUB]}
              onPick={addToHistory}
            />
            <RandomPicker
              label="Alliance"
              items={ALLIANCES}
              onPick={(l, v) => addToHistory(l, v)}
              resultDisplay={(a) => a.label}
            />
            <RandomPicker
              label="Home Card"
              items={['Higher numbered', 'Lower numbered']}
              onPick={addToHistory}
            />
          </div>
        </div>

        {/* Random from N */}
        <div style={{ marginTop: '1rem', borderTop: '1px solid #444', paddingTop: '0.75rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Pick 1 to N</div>
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

import { useState, useCallback } from 'react'

const FACE = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685']

export default function DiceRoll({ onRoll, label, count = 1 }) {
  const [values, setValues] = useState(Array(count).fill(null))
  const [rolling, setRolling] = useState(false)

  const submit = useCallback((results) => {
    setValues(results)
    if (onRoll) onRoll(count === 1 ? results[0] : results)
  }, [count, onRoll])

  const roll = useCallback(() => {
    setRolling(true)
    const results = Array.from({ length: count }, () => Math.ceil(Math.random() * 6))
    setTimeout(() => {
      setRolling(false)
      submit(results)
    }, 400)
  }, [count, submit])

  function pick(dieIndex, value) {
    const next = [...values]
    next[dieIndex] = value
    setValues(next)
    if (next.every(v => v !== null)) {
      submit(next)
    }
  }

  return (
    <div className="dice-container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {/* Die faces + picker row per die */}
        {values.map((v, di) => (
          <div key={di} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              className={`die ${rolling ? 'rolling' : ''}`}
              onClick={roll}
              title="Click to auto-roll"
            >
              {v ? FACE[v - 1] : '?'}
            </div>
            <div className="die-picker">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <button
                  key={n}
                  className={`die-pick ${v === n ? 'active' : ''}`}
                  onClick={() => pick(di, n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.3rem' }}>
        <button className="btn btn-secondary" onClick={roll} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
          Auto{label ? ` ${label}` : ''}
        </button>
        {values[0] && !rolling && (
          <span style={{ fontSize: '0.85rem', color: '#f9a825', fontWeight: 700 }}>
            = {values.join(', ')}
          </span>
        )}
      </div>
    </div>
  )
}

export function SingleDie({ value, small }) {
  if (!value) return null
  const size = small ? 32 : 48
  return (
    <span
      className="die"
      style={{
        width: size,
        height: size,
        fontSize: small ? '1.1rem' : '1.5rem',
        display: 'inline-flex',
        cursor: 'default',
      }}
    >
      {FACE[value - 1]}
    </span>
  )
}

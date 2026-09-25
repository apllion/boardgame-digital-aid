import { useState, useMemo } from 'react'
import DICTIONARY from '../data/dictionary'

const entries = Object.entries(DICTIONARY).sort(([a], [b]) => a.localeCompare(b))

export default function Dictionary({ onClose }) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return entries
    const q = search.toLowerCase()
    return entries.filter(([en, de]) =>
      en.toLowerCase().includes(q) || de.toLowerCase().includes(q)
    )
  }, [search])

  return (
    <div className="dict-overlay" onClick={onClose}>
      <div className="dict-panel" onClick={e => e.stopPropagation()}>
        <div className="dict-header">
          <h3>EN → DE</h3>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
        <input
          className="dict-search"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoFocus
        />
        <div className="dict-list">
          {filtered.map(([en, de]) => (
            <div key={en} className="dict-entry">
              <div className="dict-en">{en}</div>
              <div className="dict-de">{de}</div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="dict-empty">No matches</p>
          )}
        </div>
      </div>
    </div>
  )
}

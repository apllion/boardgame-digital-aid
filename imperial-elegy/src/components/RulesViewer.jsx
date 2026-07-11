import { useState, useEffect, useRef } from 'react'
import { decryptRulebook } from '../data/decrypt'

export default function RulesViewer({ section }) {
  const [rulesText, setRulesText] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState(section || '')
  const contentRef = useRef(null)

  useEffect(() => {
    const key = sessionStorage.getItem('bgda-key')
    if (!key) {
      setError('No passphrase found. Please enter via the main gate first.')
      return
    }
    setLoading(true)
    decryptRulebook(key)
      .then(text => {
        setRulesText(text)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to decrypt rulebook.')
        setLoading(false)
      })
  }, [])

  // When section prop changes, update search
  useEffect(() => {
    if (section) setSearchTerm(section)
  }, [section])

  // Scroll to first match when search changes
  useEffect(() => {
    if (!searchTerm || !contentRef.current) return
    const mark = contentRef.current.querySelector('mark')
    if (mark) mark.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [searchTerm, rulesText])

  if (loading) return <div className="card info"><div className="card-detail">Loading rulebook...</div></div>
  if (error) return <div className="card war"><div className="card-detail">{error}</div></div>
  if (!rulesText) return null

  // Find relevant section of text
  const lines = rulesText.split('\n')
  let filteredLines = lines
  let matchCount = 0

  if (searchTerm.trim()) {
    const term = searchTerm.trim().toLowerCase()
    // Try to find the section header first (e.g. "18.2" or "Combat Results")
    const sectionIdx = lines.findIndex(l => l.toLowerCase().includes(term))
    if (sectionIdx >= 0) {
      // Show ~60 lines around the match
      const start = Math.max(0, sectionIdx - 5)
      const end = Math.min(lines.length, sectionIdx + 55)
      filteredLines = lines.slice(start, end)
    }
    matchCount = lines.filter(l => l.toLowerCase().includes(term)).length
  }

  function highlightText(line) {
    if (!searchTerm.trim()) return line
    const term = searchTerm.trim()
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = line.split(regex)
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i} style={{ background: '#f9a825', color: '#000', borderRadius: '2px', padding: '0 2px' }}>{part}</mark> : part
    )
  }

  return (
    <div>
      <div style={{ position: 'sticky', top: 0, background: '#1a1a2e', padding: '0.5rem 0', zIndex: 10 }}>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search rules (e.g. 18.2, combat, alliance)"
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            border: '1px solid #444',
            borderRadius: '6px',
            background: '#252540',
            color: '#e0e0e0',
            fontSize: '0.9rem',
          }}
        />
        {searchTerm && (
          <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>
            {matchCount} match{matchCount !== 1 ? 'es' : ''} found
          </div>
        )}
      </div>
      <div ref={contentRef} style={{ fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: 1.6, color: '#ccc', whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}>
        {filteredLines.map((line, i) => (
          <div key={i}>{highlightText(line)}</div>
        ))}
      </div>
    </div>
  )
}

import { useState, useEffect, useRef } from 'react'
import { decryptRulebook } from '../data/decrypt'

// Match section headers like "10.0", "18.2", "18.2.1", "12.0 Action Phase"
const SECTION_RE = /^(\d+\.\d+(?:\.\d+)?)\s/

function parseSections(text) {
  const lines = text.split('\n')
  const sections = []
  let current = null

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(SECTION_RE)
    if (match) {
      if (current) {
        current.endLine = i
        sections.push(current)
      }
      current = { id: match[1], title: lines[i].trim(), startLine: i, endLine: lines.length }
    }
  }
  if (current) {
    sections.push(current)
  }
  return { lines, sections }
}

function findSection(sections, sectionId) {
  // Exact match first
  let found = sections.find(s => s.id === sectionId)
  if (found) return found
  // Try without trailing .0
  if (sectionId.endsWith('.0')) {
    found = sections.find(s => s.id === sectionId.replace(/\.0$/, ''))
  }
  // Try prefix match (e.g. "18" matches "18.0" or "18.1")
  if (!found) {
    found = sections.find(s => s.id.startsWith(sectionId))
  }
  return found
}

// Get a section and all its subsections (e.g. 18.0 includes 18.1, 18.2, 18.3 etc.)
function getSectionRange(lines, sections, sectionId) {
  const section = findSection(sections, sectionId)
  if (!section) return null

  // Find the parent level: e.g. for "18.2" the parent is "18", for "10.0" the parent is "10"
  const parts = section.id.split('.')
  const parentPrefix = parts[0] + '.'

  // Find the end: next section that is NOT a child of this section
  let endLine = lines.length
  const depth = parts.length

  for (const s of sections) {
    if (s.startLine <= section.startLine) continue
    const sParts = s.id.split('.')
    // If it's a sibling or higher level, stop
    if (depth === 1) {
      // Top-level section (e.g. "18"): stop at next top-level
      if (sParts[0] !== parts[0]) { endLine = s.startLine; break }
    } else if (depth === 2) {
      // Sub-section (e.g. "18.2"): stop at next sibling or higher
      if (!s.id.startsWith(parts[0] + '.' + parts[1] + '.') && s.id !== section.id) {
        // It's not a child like 18.2.1 — check if sibling or different parent
        if (sParts[0] !== parts[0] || (sParts.length <= 2 && sParts[1] !== parts[1])) {
          endLine = s.startLine; break
        }
      }
    } else {
      // Sub-sub-section (e.g. "18.2.1"): stop at next section at same or higher level
      if (sParts.length <= depth) { endLine = s.startLine; break }
    }
  }

  return {
    startLine: Math.max(0, section.startLine - 1),
    endLine: Math.min(lines.length, endLine),
    section,
  }
}

export default function RulesViewer({ section }) {
  const [rulesText, setRulesText] = useState(null)
  const [parsed, setParsed] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState(section || '')
  const [mode, setMode] = useState(section ? 'section' : 'search') // 'section' or 'search'
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
        setParsed(parseSections(text))
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to decrypt rulebook.')
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (section) {
      setSearchTerm(section)
      setMode('section')
    }
  }, [section])

  // Scroll to top when content changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [searchTerm, mode])

  if (loading) return <div className="card info"><div className="card-detail">Loading rulebook...</div></div>
  if (error) return <div className="card war"><div className="card-detail">{error}</div></div>
  if (!parsed) return null

  const { lines, sections } = parsed
  let displayLines = []
  let matchInfo = ''

  if (searchTerm.trim()) {
    const term = searchTerm.trim()

    // Try section lookup first (if term looks like a section number)
    if (/^\d+\.\d/.test(term)) {
      const range = getSectionRange(lines, sections, term)
      if (range) {
        displayLines = lines.slice(range.startLine, range.endLine)
        matchInfo = `Section ${range.section.id}: ${range.section.title} (${displayLines.length} lines)`
      }
    }

    // Fall back to text search if no section found
    if (displayLines.length === 0) {
      const lowerTerm = term.toLowerCase()
      const matchingIndices = []
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].toLowerCase().includes(lowerTerm)) matchingIndices.push(i)
      }
      if (matchingIndices.length > 0) {
        // Show context around first match
        const firstMatch = matchingIndices[0]
        const start = Math.max(0, firstMatch - 3)
        const end = Math.min(lines.length, firstMatch + 50)
        displayLines = lines.slice(start, end)
        matchInfo = `${matchingIndices.length} match${matchingIndices.length !== 1 ? 'es' : ''} — showing from line ${start + 1}`
      } else {
        matchInfo = 'No matches found'
      }
    }
  } else {
    // Show table of contents (all section headers)
    displayLines = sections.map(s => s.title)
    matchInfo = `${sections.length} sections`
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
          placeholder="Section (e.g. 18.2) or search text"
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
        {matchInfo && (
          <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>{matchInfo}</div>
        )}
      </div>
      <div ref={contentRef} style={{ fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: 1.6, color: '#ccc', whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}>
        {displayLines.map((line, i) => (
          <div key={i}>{highlightText(line)}</div>
        ))}
      </div>
    </div>
  )
}

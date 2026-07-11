import { useState, useEffect } from 'react'
import { decryptPDF } from '../data/decrypt'
import { getPageForSection } from '../data/sectionPages'

export default function RulesViewer({ section }) {
  const [pdfUrl, setPdfUrl] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const page = section ? getPageForSection(section) : 1

  useEffect(() => {
    const key = sessionStorage.getItem('bgda-key')
    if (!key) {
      setError('No passphrase found. Please enter via the main gate first.')
      return
    }
    setLoading(true)
    decryptPDF(key)
      .then(blob => {
        const url = URL.createObjectURL(blob)
        setPdfUrl(url)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to decrypt rulebook.')
        setLoading(false)
      })

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl)
    }
  }, [])

  if (loading) {
    return (
      <div className="card info">
        <div className="card-detail">Loading rulebook (15 MB)...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card war">
        <div className="card-detail">{error}</div>
      </div>
    )
  }

  if (!pdfUrl) return null

  // Use the browser's built-in PDF viewer via iframe
  // Add #page=N to jump to the right page
  const src = `${pdfUrl}#page=${page}`

  return (
    <div>
      {section && (
        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>
          Section {section} &rarr; page {page}
        </div>
      )}
      <iframe
        src={src}
        style={{
          width: '100%',
          height: 'calc(100vh - 160px)',
          border: '1px solid #333',
          borderRadius: '6px',
          background: '#fff',
        }}
        title="Rulebook"
      />
    </div>
  )
}

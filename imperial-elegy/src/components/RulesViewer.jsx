import { useState, useEffect, useRef, useCallback } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import { decryptPDF } from '../data/decrypt'
import { getPageForSection } from '../data/sectionPages'

// Use the bundled worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).href

let cachedPdfDoc = null

export default function RulesViewer({ section }) {
  const [pdfDoc, setPdfDoc] = useState(cachedPdfDoc)
  const [currentPage, setCurrentPage] = useState(section ? getPageForSection(section) : 1)
  const [totalPages, setTotalPages] = useState(0)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(!cachedPdfDoc)
  const [rendering, setRendering] = useState(false)
  const canvasRef = useRef(null)
  const renderTaskRef = useRef(null)

  // Load PDF once
  useEffect(() => {
    if (cachedPdfDoc) {
      setPdfDoc(cachedPdfDoc)
      setTotalPages(cachedPdfDoc.numPages)
      setLoading(false)
      return
    }

    const key = sessionStorage.getItem('bgda-key')
    if (!key) {
      setError('No passphrase found. Please enter via the main gate first.')
      return
    }

    setLoading(true)
    decryptPDF(key)
      .then(data => pdfjsLib.getDocument({ data }).promise)
      .then(doc => {
        cachedPdfDoc = doc
        setPdfDoc(doc)
        setTotalPages(doc.numPages)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load rulebook.')
        setLoading(false)
      })
  }, [])

  // Jump to section page when section prop changes
  useEffect(() => {
    if (section) {
      setCurrentPage(getPageForSection(section))
    }
  }, [section])

  // Render current page to canvas
  const renderPage = useCallback(async (pageNum) => {
    if (!pdfDoc || !canvasRef.current) return
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel()
    }

    setRendering(true)
    try {
      const page = await pdfDoc.getPage(pageNum)
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      // Scale to fill container width
      const containerWidth = canvas.parentElement.clientWidth
      const viewport = page.getViewport({ scale: 1 })
      const scale = containerWidth / viewport.width
      const scaledViewport = page.getViewport({ scale })

      canvas.width = scaledViewport.width
      canvas.height = scaledViewport.height

      const task = page.render({ canvasContext: ctx, viewport: scaledViewport })
      renderTaskRef.current = task
      await task.promise
      renderTaskRef.current = null
    } catch (e) {
      if (e.name !== 'RenderingCancelledException') {
        console.error('Render error:', e)
      }
    }
    setRendering(false)
  }, [pdfDoc])

  useEffect(() => {
    renderPage(currentPage)
  }, [currentPage, renderPage])

  function goToPage(p) {
    if (p >= 1 && p <= totalPages) setCurrentPage(p)
  }

  if (error) {
    return <div className="card war"><div className="card-detail">{error}</div></div>
  }

  if (loading) {
    return <div className="card info"><div className="card-detail">Loading rulebook (15 MB)...</div></div>
  }

  return (
    <div>
      {/* Page controls */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: '#1a1a2e', padding: '0.4rem 0',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
      }}>
        <button
          className="btn btn-secondary"
          style={{ padding: '0.3rem 0.6rem', fontSize: '1rem' }}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
        >&lsaquo;</button>
        <span style={{ fontSize: '0.85rem', minWidth: '60px', textAlign: 'center' }}>
          {currentPage} / {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          style={{ padding: '0.3rem 0.6rem', fontSize: '1rem' }}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >&rsaquo;</button>
      </div>

      {section && (
        <div style={{ fontSize: '0.75rem', color: '#888', textAlign: 'center', marginBottom: '0.25rem' }}>
          [{section}] &rarr; page {getPageForSection(section)}
        </div>
      )}

      {/* Canvas */}
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          style={{ width: '100%', display: 'block', borderRadius: '4px' }}
        />
        {rendering && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            color: '#888', fontSize: '0.8rem',
          }}>
            Rendering...
          </div>
        )}
      </div>
    </div>
  )
}

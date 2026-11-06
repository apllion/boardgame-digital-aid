import { useState } from 'react'

export default function GameManager({ currentGame, saves, onSave, onLoad, onDelete, onNew, onClose }) {
  const [saveName, setSaveName] = useState(currentGame.name || '')
  const [pendingDelete, setPendingDelete] = useState(null)

  function handleSave() {
    const name = saveName.trim()
    if (!name) return
    onSave(name)
  }

  function handleDelete(name) {
    if (pendingDelete !== name) {
      setPendingDelete(name)
      return
    }
    setPendingDelete(null)
    onDelete(name)
  }

  return (
    <div className="fleet-overlay" onClick={onClose}>
      <div className="fleet-add-panel" onClick={e => e.stopPropagation()}>
        <div className="fleet-add-header">
          <h3>Games</h3>
          <button className="fleet-close" onClick={onClose}>Close</button>
        </div>

        <div className="game-mgr-section">
          <div className="game-mgr-label">Save current game</div>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <input
              className="game-mgr-input"
              type="text"
              placeholder="Game name..."
              value={saveName}
              onChange={e => setSaveName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
            />
            <button className="btn btn-primary btn-sm" onClick={handleSave}>Save</button>
          </div>
        </div>

        {saves.length > 0 && (
          <div className="game-mgr-section">
            <div className="game-mgr-label">Saved games</div>
            {saves.map(save => (
              <div key={save.name} className="game-mgr-row">
                <div className="game-mgr-info" onClick={() => onLoad(save)}>
                  <strong>{save.name}</strong>
                  <span className="game-mgr-detail">
                    {save.phase.startsWith('setup') ? 'Setup' : `Turn ${save.turn}`}
                    {' · '}{save.fleet.length} ships
                  </span>
                </div>
                <button
                  className={`game-mgr-del ${pendingDelete === save.name ? 'confirm' : ''}`}
                  onClick={() => handleDelete(save.name)}
                >
                  {pendingDelete === save.name ? 'Sure?' : 'Del'}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="game-mgr-section">
          <button className="btn btn-secondary btn-full" onClick={onNew}>New Game</button>
        </div>
      </div>
    </div>
  )
}

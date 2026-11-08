import { useState, useEffect } from 'react'
import Setup from './components/Setup'
import GameSession from './components/GameSession'
import PlayerAid from './components/PlayerAid'

const STORAGE_KEY = 'ie-bot-config'
const MODE_KEY = 'ie-mode'

function loadConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return { ...parsed, bots: new Set(parsed.bots) }
    }
  } catch {}
  return { bots: new Set(), difficulty: 'normal' }
}

function saveConfig(config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    ...config,
    bots: [...config.bots],
  }))
}

export default function App() {
  const [mode, setMode] = useState(() => localStorage.getItem(MODE_KEY) || 'menu')
  const [config, setConfig] = useState(loadConfig)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    saveConfig(config)
  }, [config])

  useEffect(() => {
    localStorage.setItem(MODE_KEY, mode)
  }, [mode])

  function handleStart() {
    setStarted(true)
  }

  function handleBack() {
    setStarted(false)
    setMode('menu')
  }

  if (mode === 'player-aid') {
    return (
      <div>
        <h1>Imperial Elegy</h1>
        <p className="subtitle">Player Aid</p>
        <PlayerAid onBack={() => setMode('menu')} />
      </div>
    )
  }

  if (mode === 'bot-aid') {
    return (
      <div>
        <h1>Imperial Elegy</h1>
        <p className="subtitle">Bot Aid</p>
        {!started ? (
          <Setup config={config} onConfigChange={setConfig} onStart={handleStart} />
        ) : (
          <GameSession config={config} onBack={handleBack} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h1>Imperial Elegy</h1>
      <p className="subtitle">Game Aid</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
        <button className="btn btn-primary btn-full" style={{ background: '#4a5adb', padding: '1rem' }} onClick={() => setMode('player-aid')}>
          Player Aid
          <div style={{ fontSize: '0.75rem', fontWeight: 400, marginTop: '0.25rem', opacity: 0.7 }}>Phase-by-phase guide with power filtering</div>
        </button>
        <button className="btn btn-primary btn-full" style={{ background: '#2e7d32', padding: '1rem' }} onClick={() => setMode('bot-aid')}>
          Bot Aid
          <div style={{ fontSize: '0.75rem', fontWeight: 400, marginTop: '0.25rem', opacity: 0.7 }}>Bot impulse flowcharts &amp; player reference</div>
        </button>
      </div>
    </div>
  )
}

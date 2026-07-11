import { useState, useEffect } from 'react'
import Setup from './components/Setup'
import GameSession from './components/GameSession'

const STORAGE_KEY = 'ie-bot-config'

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
  const [config, setConfig] = useState(loadConfig)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    saveConfig(config)
  }, [config])

  function handleStart() {
    setStarted(true)
  }

  function handleBack() {
    setStarted(false)
  }

  return (
    <div>
      <h1>Imperial Elegy</h1>
      <p className="subtitle">Game Aid <span style={{ fontSize: '0.7rem', color: '#555' }}>v0.4.0</span></p>

      {!started ? (
        <Setup config={config} onConfigChange={setConfig} onStart={handleStart} />
      ) : (
        <GameSession config={config} onBack={handleBack} />
      )}
    </div>
  )
}

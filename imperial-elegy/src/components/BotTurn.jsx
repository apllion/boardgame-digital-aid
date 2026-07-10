import { useState, useCallback } from 'react'
import {
  POWERS, TURN_ORDER,
  PRIORITY_1_ACTIONS, PRIORITY_2_ACTIONS,
  HOME_CARD_REVEALED, HOME_CARD_PLACEMENT,
  MODIFIERS, EXCESS_CP, BOT_WARS, BOT_ECS,
  RESPONSE_CARDS, BOT_WARTIME_BEHAVIOR,
  WARTIME_PRIORITY_1, WARTIME_PRIORITY_2,
  GW_PRIORITY_2, GW_PRIORITY_2_NOTES,
  PREP_PHASE, END_PHASE, FREE_REDEPLOYMENT,
  DIFFICULTY_LEVELS,
} from '../data/botRules'
import { lookupBMPIT } from '../data/bmpit'
import DiceRoll from './DiceRoll'
import BDITTable from './BDITTable'
import BMPITTable from './BMPITTable'

const PHASES = ['card', 'priority1', 'priority2', 'excess', 'done']
const PHASE_LABELS = ['Card', 'Priority 1', 'Priority 2', 'Excess CP', 'Done']

export default function BotTurn({ config, onBack }) {
  const { bots, difficulty } = config
  const botList = TURN_ORDER.filter(id => bots.has(id))

  const [turn, setTurn] = useState(1)
  const [currentBotIndex, setCurrentBotIndex] = useState(0)
  const [phase, setPhase] = useState('card')
  const [cardType, setCardType] = useState(null) // 'home' | 'cp1' | 'cp2' | 'cp3'
  const [hasBotBox, setHasBotBox] = useState(null)
  const [p2Roll, setP2Roll] = useState(null)
  const [history, setHistory] = useState([])
  const [bmpitResult, setBmpitResult] = useState(null)
  const [isWartime, setIsWartime] = useState(false)
  const [isGW, setIsGW] = useState(false)
  const [showWarRules, setShowWarRules] = useState(false)
  const [showReference, setShowReference] = useState(false)

  const currentPower = botList[currentBotIndex]
  const power = POWERS[currentPower]

  const addHistory = useCallback((text) => {
    setHistory(h => [...h, { power: currentPower, text, impulse: h.filter(e => e.power === currentPower).length + 1 }])
  }, [currentPower])

  function selectCard(type) {
    setCardType(type)
    if (type === 'home') {
      setPhase('priority1')
      addHistory(`Home card revealed`)
    } else {
      setPhase('priority1')
      addHistory(`${type.toUpperCase()} card revealed`)
    }
  }

  function selectP1Action(action) {
    addHistory(`P1: ${action.text}`)
    setPhase('excess')
  }

  function skipToP2() {
    setPhase('priority2')
    addHistory('No Priority 1 action applies')
  }

  function handleP2Roll(value) {
    setP2Roll(value)
    // Find matching action
    const action = PRIORITY_2_ACTIONS.find(a =>
      a.dieRange && value >= a.dieRange[0] && value <= a.dieRange[1]
    )
    if (action) {
      addHistory(`P2 roll: ${value} -> ${action.text}`)
    }
  }

  function finishP2() {
    setPhase('excess')
  }

  function finishExcess() {
    setPhase('done')
  }

  function nextBot() {
    if (currentBotIndex < botList.length - 1) {
      setCurrentBotIndex(i => i + 1)
    } else {
      setCurrentBotIndex(0)
    }
    setPhase('card')
    setCardType(null)
    setHasBotBox(null)
    setP2Roll(null)
    setBmpitResult(null)
  }

  function nextTurn() {
    setTurn(t => t + 1)
    setCurrentBotIndex(0)
    setPhase('card')
    setCardType(null)
    setHasBotBox(null)
    setP2Roll(null)
    setHistory([])
    setBmpitResult(null)
  }

  const homeCardRules = HOME_CARD_REVEALED[currentPower]
  const applicableModifiers = MODIFIERS.filter(m => m.powers.includes(currentPower))

  // Get P2 action for current roll
  const p2Action = p2Roll ? PRIORITY_2_ACTIONS.find(a =>
    a.dieRange && p2Roll >= a.dieRange[0] && p2Roll <= a.dieRange[1]
  ) : null

  // Auto-pacify check
  const autoPacify = p2Roll && p2Roll <= 4

  // Filter P1 actions visible to this power
  const visibleP1 = PRIORITY_1_ACTIONS.filter(a => !a.powers || a.powers.includes(currentPower))

  return (
    <div>
      {/* Turn bar */}
      <div className="turn-bar">
        <span>Turn <span className="turn-number">{turn}</span> / 7</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`btn btn-secondary ${isWartime ? 'btn-danger' : ''}`}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
            onClick={() => { setIsWartime(!isWartime); setIsGW(false) }}
          >
            {isWartime ? 'Wartime' : 'Peacetime'}
          </button>
          {isWartime && (
            <button
              className={`btn ${isGW ? 'btn-danger' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              onClick={() => setIsGW(!isGW)}
            >
              {isGW ? 'Great War' : 'Limited War'}
            </button>
          )}
          <button
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
            onClick={onBack}
          >
            Setup
          </button>
        </div>
      </div>

      {/* Bot order indicator */}
      <div className="bot-order">
        {botList.map((id, i) => (
          <div
            key={id}
            className={`pip ${i === currentBotIndex ? 'active' : i < currentBotIndex ? 'done' : ''}`}
            style={{ background: POWERS[id].color }}
            title={POWERS[id].name}
          />
        ))}
      </div>

      {/* Bot header */}
      <div className="bot-header" style={{ background: `${power.bgColor}40` }}>
        <div className="power-badge" style={{ background: power.color, color: power.textColor }}>
          {power.short}
        </div>
        <div>
          <div className="power-name">{power.name}</div>
          <div className="impulse-label">
            Bot Impulse &middot; {DIFFICULTY_LEVELS[difficulty].label} difficulty
          </div>
        </div>
      </div>

      {/* Phase indicator */}
      <div className="phase-steps">
        {PHASES.map((p, i) => (
          <div
            key={p}
            className={`phase-step ${p === phase ? 'active' : PHASES.indexOf(phase) > i ? 'completed' : ''}`}
          >
            {PHASE_LABELS[i]}
          </div>
        ))}
      </div>

      {/* PHASE: Card Selection */}
      {phase === 'card' && (
        <div className="card highlight">
          <div className="card-title">Reveal top card of {power.short}'s pile</div>
          <div className="card-detail" style={{ marginBottom: '0.75rem' }}>
            What type of card is it?
            {currentPower && <span style={{ color: '#888' }}> (Home cards placed: {HOME_CARD_PLACEMENT[currentPower]})</span>}
          </div>
          <div className="btn-row">
            <button className="btn btn-warning" onClick={() => selectCard('home')}>Home Card</button>
            <button className="btn btn-secondary" onClick={() => selectCard('cp1')}>1 CP</button>
            <button className="btn btn-secondary" onClick={() => selectCard('cp2')}>2 CP</button>
            <button className="btn btn-secondary" onClick={() => selectCard('cp3')}>3 CP</button>
          </div>
        </div>
      )}

      {/* PHASE: Priority 1 */}
      {phase === 'priority1' && (
        <div>
          {/* Home card rules if applicable */}
          {cardType === 'home' && homeCardRules && (
            <div className="card action">
              <div className="card-title">{homeCardRules.title}</div>
              <ul className="rules-list">
                {homeCardRules.rules.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
              {homeCardRules.note && (
                <p className="card-detail" style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>{homeCardRules.note}</p>
              )}
              <DiceRoll label="(if needed)" onRoll={() => {}} />
            </div>
          )}

          <div className="card info">
            <div className="card-title">Priority 1 Actions (check in order)</div>
            <div className="card-detail" style={{ marginBottom: '0.5rem' }}>
              Select the first applicable action, or skip to Priority 2.
            </div>
            <ul className="priority-list">
              {visibleP1.map((action, i) => (
                <li
                  key={action.id}
                  className="priority-item"
                  onClick={() => selectP1Action(action)}
                >
                  <span className="number">{i + 1}</span>
                  <div>
                    <div>{action.text}</div>
                    {action.detail && <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.2rem' }}>{action.detail}</div>}
                    {action.condition && <div style={{ fontSize: '0.75rem', color: '#f9a825', marginTop: '0.2rem' }}>Condition: {action.condition}</div>}
                  </div>
                </li>
              ))}
            </ul>
            <button className="btn btn-primary" style={{ marginTop: '0.5rem' }} onClick={skipToP2}>
              No P1 applies &rarr; Roll for Priority 2
            </button>
          </div>

          {applicableModifiers.length > 0 && (
            <div className="card" style={{ borderLeftColor: '#888' }}>
              <div className="card-title">Modifiers for {power.short}</div>
              <ul className="rules-list">
                {applicableModifiers.map((m, i) => (
                  <li key={i}>{m.text}{m.condition ? ` (${m.condition})` : ''}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* PHASE: Priority 2 */}
      {phase === 'priority2' && !isWartime && (
        <div>
          <div className="card action">
            <div className="card-title">Priority 2 - Roll a die</div>
            <DiceRoll label="Priority 2" onRoll={handleP2Roll} />

            {/* Auto-pacify note */}
            {p2Roll && (
              <div className="card-detail" style={{ marginTop: '0.5rem' }}>
                {autoPacify ? (
                  <span style={{ color: '#4caf50' }}>Auto-pacify: Bot spends 1 CP to pacify if able (rolled {p2Roll}, not 5-6).</span>
                ) : (
                  <span style={{ color: '#888' }}>No auto-pacify (rolled {p2Roll}).</span>
                )}
              </div>
            )}

            {p2Action && (
              <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#1a1a3e', borderRadius: '6px' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.35rem', color: '#f9a825' }}>
                  Result ({p2Roll}): {p2Action.text}
                </div>
                <div className="card-detail">{p2Action.detail}</div>
              </div>
            )}
          </div>

          {p2Roll && (
            <button className="btn btn-primary" onClick={finishP2}>
              Continue &rarr; Excess CP
            </button>
          )}
        </div>
      )}

      {/* PHASE: Priority 2 - Wartime */}
      {phase === 'priority2' && isWartime && (
        <div>
          <div className="card war">
            <div className="card-title">Wartime Priority 1</div>
            <ul className="priority-list">
              {WARTIME_PRIORITY_1.map((a, i) => (
                <li key={a.id} className="priority-item" onClick={() => { addHistory(`War P1: ${a.text}`); setPhase('excess') }}>
                  <span className="number">{i + 1}</span>
                  <div>
                    <div>{a.text}</div>
                    {a.detail && <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.2rem' }}>{a.detail}</div>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card war">
            <div className="card-title">{isGW ? 'GW Priority 2' : 'Wartime Priority 2'}</div>
            {!isGW && <p className="card-detail">{WARTIME_PRIORITY_2.text}</p>}
            {isGW && (
              <>
                <DiceRoll label="GW P2" onRoll={(v) => {
                  const action = GW_PRIORITY_2.find(a => v >= a.dieRange[0] && v <= a.dieRange[1])
                  if (action) addHistory(`GW P2 roll ${v}: ${action.text}`)
                  setP2Roll(v)
                }} />
                {p2Roll && (() => {
                  const action = GW_PRIORITY_2.find(a => p2Roll >= a.dieRange[0] && p2Roll <= a.dieRange[1])
                  return action ? (
                    <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: '#1a1a3e', borderRadius: '6px' }}>
                      <div style={{ fontWeight: 700, color: '#c62828' }}>Result ({p2Roll}): {action.text}</div>
                    </div>
                  ) : null
                })()}
                <ul className="rules-list" style={{ marginTop: '0.5rem' }}>
                  {GW_PRIORITY_2_NOTES.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
              </>
            )}
          </div>

          <button className="btn btn-primary" onClick={finishP2}>
            Continue &rarr; Excess CP
          </button>
        </div>
      )}

      {/* PHASE: Excess CP */}
      {phase === 'excess' && (
        <div>
          <div className="card info">
            <div className="card-title">Excess CP</div>
            <div className="card-detail">{EXCESS_CP.text}</div>
            <div className="card-detail" style={{ marginTop: '0.25rem', fontStyle: 'italic' }}>{EXCESS_CP.exception}</div>

            <div style={{ marginTop: '0.75rem' }}>
              <DiceRoll label="BMPIT (2 dice)" count={2} onRoll={(vals) => {
                const [d1, d2] = vals
                const result = lookupBMPIT(d1, d2)
                setBmpitResult(result)
                addHistory(`BMPIT roll: ${d1},${d2} -> influence ${result.power} toward ${result.alliance}`)
              }} />
              {bmpitResult && (
                <div style={{ padding: '0.5rem', background: '#1a1a3e', borderRadius: '6px', marginTop: '0.5rem' }}>
                  <span style={{ fontWeight: 700, color: '#f9a825' }}>
                    Influence {bmpitResult.power} toward {bmpitResult.alliance === 'TA' ? 'Triple Alliance' : bmpitResult.alliance === 'TE' ? 'Triple Entente' : 'Neutral'}
                  </span>
                  {bmpitResult.power === currentPower && (
                    <span style={{ color: '#c62828', marginLeft: '0.5rem' }}>(self - reroll)</span>
                  )}
                </div>
              )}
            </div>
          </div>

          <button className="btn btn-success" onClick={finishExcess}>
            Finish Impulse
          </button>
        </div>
      )}

      {/* PHASE: Done */}
      {phase === 'done' && (
        <div>
          <div className="card" style={{ borderLeftColor: '#4caf50' }}>
            <div className="card-title" style={{ color: '#4caf50' }}>{power.short} impulse complete</div>
          </div>
          <div className="btn-row">
            <button className="btn btn-primary" onClick={nextBot}>
              Next Bot Impulse
            </button>
            <button className="btn btn-warning" onClick={nextTurn}>
              Next Turn
            </button>
          </div>
        </div>
      )}

      {/* Reference sections (always visible at bottom) */}
      <div style={{ marginTop: '1.5rem' }}>
        <BDITTable activePower={currentPower} />
        <BMPITTable highlightResult={bmpitResult} />

        {/* Quick reference */}
        <div className="collapsible-header" onClick={() => setShowReference(!showReference)}>
          <span>Quick Reference</span>
          <span className={`chevron ${showReference ? 'open' : ''}`}>{'\u25B6'}</span>
        </div>
        {showReference && (
          <div className="collapsible-body">
            <div className="card" style={{ borderLeftColor: '#888' }}>
              <div className="card-title">Bot ECs</div>
              <div className="card-detail">{BOT_ECS.text}</div>
            </div>
            <div className="card" style={{ borderLeftColor: '#888' }}>
              <div className="card-title">Response & Combat Cards</div>
              <div className="card-detail">{RESPONSE_CARDS.text}</div>
              <div className="card-detail" style={{ fontStyle: 'italic' }}>{RESPONSE_CARDS.exception}</div>
            </div>
            <div className="card" style={{ borderLeftColor: '#888' }}>
              <div className="card-title">End Phase</div>
              <div className="card-detail">{END_PHASE.text}</div>
            </div>
            <div className="card" style={{ borderLeftColor: '#888' }}>
              <div className="card-title">Free Redeployment ({DIFFICULTY_LEVELS[difficulty].label})</div>
              <div className="card-detail">{FREE_REDEPLOYMENT[difficulty]}</div>
            </div>

            <div className="card war">
              <div className="card-title">Bot Wars</div>
              <ul className="rules-list">
                <li>{BOT_WARS.declaration}</li>
                <li>{BOT_WARS.warAims}</li>
                <li><strong>{currentPower}:</strong> {BOT_WARS.warAimsPerPower[currentPower]}</li>
                <li><strong>Budget:</strong> {BOT_WARS.budget}</li>
                <li><strong>Alliances:</strong> {BOT_WARS.alliances}</li>
                <li><strong>Treaty:</strong> {BOT_WARS.treatyOptions}</li>
              </ul>
            </div>
          </div>
        )}

        {/* War rules toggle */}
        <div className="collapsible-header" onClick={() => setShowWarRules(!showWarRules)}>
          <span>Bot Wartime Rules</span>
          <span className={`chevron ${showWarRules ? 'open' : ''}`}>{'\u25B6'}</span>
        </div>
        {showWarRules && (
          <div className="collapsible-body">
            <div className="card war">
              <div className="card-title">Wartime Behavior</div>
              <div className="card-detail">{BOT_WARTIME_BEHAVIOR.text}</div>
              <div className="card-detail" style={{ fontStyle: 'italic' }}>{BOT_WARTIME_BEHAVIOR.note}</div>
            </div>
          </div>
        )}
      </div>

      {/* History log */}
      {history.length > 0 && (
        <div className="history" style={{ marginTop: '1rem' }}>
          <h3>Action Log</h3>
          {history.map((entry, i) => (
            <div key={i} className="history-entry">
              <span className="power" style={{ color: POWERS[entry.power]?.color }}>{entry.power}</span>
              <span className="action">{entry.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

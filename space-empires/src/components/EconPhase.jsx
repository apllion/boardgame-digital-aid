import { useState } from 'react'
import { SHIPS, TECHNOLOGIES } from '../data/gameData.js'

function EconRow({ label, value, onChange, readOnly, className = '', color }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')

  const colorClass = color || (value < 0 ? 'negative' : value === 0 ? 'zero' : '')

  function startEdit() {
    if (readOnly) return
    setDraft(String(value))
    setEditing(true)
  }

  function commitEdit() {
    const parsed = parseInt(draft, 10)
    if (!isNaN(parsed)) onChange(parsed)
    setEditing(false)
  }

  return (
    <div className={`econ-row ${className}`}>
      <span className="label">{label}</span>
      {!readOnly && !editing && (
        <div className="controls">
          <button className="stepper-btn" onClick={() => onChange(value - 1)}>-</button>
        </div>
      )}
      {editing ? (
        <input
          className="econ-input"
          type="number"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={e => e.key === 'Enter' && commitEdit()}
          autoFocus
        />
      ) : (
        <span
          className={`value ${colorClass}${!readOnly ? ' editable' : ''}`}
          onClick={startEdit}
        >
          {value}
        </span>
      )}
      {!readOnly && !editing && (
        <div className="controls">
          <button className="stepper-btn" onClick={() => onChange(value + 1)}>+</button>
        </div>
      )}
    </div>
  )
}

// Calculate total spending for a turn (tech + ships + upgrades)
function turnSpending(techPurchases, fleet, upgrades, turnNum) {
  let techSpent = 0
  for (const [techId, t] of Object.entries(techPurchases)) {
    if (t === turnNum) {
      const tech = TECHNOLOGIES.flatMap(c => c.techs).find(x => x.id === techId)
      if (tech) techSpent += tech.cost
    }
  }

  let shipSpent = 0
  for (const group of fleet) {
    if (group.boughtTurn === turnNum) {
      const base = SHIPS.find(s => s.id === group.type)
      if (base) shipSpent += base.cost * group.count
    }
  }

  let upgradeSpent = 0
  for (const u of upgrades) {
    if (u.turn === turnNum) {
      upgradeSpent += u.hullCost || 0
    }
  }

  return { techSpent, shipSpent, upgradeSpent }
}

// Calculate remaining CP for a given turn (recursive for carry-over)
export function calcTurnRemaining(econData, techPurchases, fleet, upgrades, turnNum, startingCP = 0) {
  if (turnNum < 0) return startingCP
  const data = econData[turnNum] || {}
  const carryOver = turnNum === 0 ? startingCP : calcTurnRemaining(econData, techPurchases, fleet, upgrades, turnNum - 1, startingCP)

  const income = (data.colony ?? 0) + (data.mineral ?? 0) + (data.pipeline ?? 0)
  const subtotal = carryOver + income

  // Maintenance = ships alive at start of this turn (setup ships count as turn 1)
  const maintenance = fleet.filter(g => {
    const effectiveBoughtTurn = g.boughtTurn === 'free' ? 0 : g.boughtTurn
    const boughtBefore = typeof effectiveBoughtTurn === 'number' && effectiveBoughtTurn < turnNum
    const aliveAtStart = !g.destroyed || g.destroyed >= turnNum
    return boughtBefore && aliveAtStart
  }).reduce((sum, g) => {
    const base = SHIPS.find(s => s.id === g.type)
    return sum + (base?.maintenance || 0) * g.count
  }, 0)

  const { techSpent, shipSpent, upgradeSpent } = turnSpending(techPurchases, fleet, upgrades, turnNum)
  return subtotal - (data.bid ?? 0) - maintenance - techSpent - shipSpent - upgradeSpent
}

export default function EconPhase({ viewTurn, setViewTurn, currentTurn, advanceTurn, startingCP, econData, setEconData, techPurchases, fleet, upgrades, onResetTurn, pendingReset, setPendingReset, umpireMode }) {
  const turn = viewTurn
  const isCurrentTurn = turn === currentTurn
  const editable = isCurrentTurn || umpireMode
  const data = econData[turn] || {}

  const carryOver = calcTurnRemaining(econData, techPurchases, fleet, upgrades, turn - 1, startingCP)

  const colony = data.colony ?? 0
  const mineral = data.mineral ?? 0
  const pipeline = data.pipeline ?? 0
  const bid = data.bid ?? 0

  // Maintenance = count of ships alive at start of turn (bought before this turn, not destroyed before this turn)
  function maintenanceForTurn(t) {
    return fleet.filter(g => {
      // Setup ships count as bought on turn 1 — maintenance starts turn 2
      const effectiveBoughtTurn = g.boughtTurn
      const boughtBefore = typeof effectiveBoughtTurn === 'number' && effectiveBoughtTurn < t
      const aliveAtStart = !g.destroyed || g.destroyed >= t
      return boughtBefore && aliveAtStart
    }).reduce((sum, g) => {
      const base = SHIPS.find(s => s.id === g.type)
      return sum + (base?.maintenance || 0) * g.count
    }, 0)
  }
  const maintenance = maintenanceForTurn(turn)

  const subtotal = carryOver + colony + mineral + pipeline

  // Itemized spending for this turn
  const techItems = []
  let techSpent = 0
  for (const [techId, t] of Object.entries(techPurchases)) {
    if (t === turn) {
      const tech = TECHNOLOGIES.flatMap(c => c.techs).find(x => x.id === techId)
      if (tech) { techSpent += tech.cost; techItems.push(tech) }
    }
  }

  const shipItems = []
  let shipSpent = 0
  for (const group of fleet) {
    if (group.boughtTurn === turn) {
      const base = SHIPS.find(s => s.id === group.type)
      if (base) {
        const cost = base.cost * group.count
        shipSpent += cost
        shipItems.push({ id: group.id, name: `${group.count}× ${base.name}`, cost })
      }
    }
  }

  let upgradeSpent = 0
  const upgradeItems = []
  for (const u of upgrades) {
    if (u.turn === turn) {
      const group = fleet.find(g => g.id === u.shipId)
      if (group) {
        upgradeSpent += u.hullCost || 0
        upgradeItems.push({ ...u, label: group.label, cost: u.hullCost })
      }
    }
  }

  const remaining = subtotal - bid - maintenance - techSpent - shipSpent
  const afterUpgrades = remaining - upgradeSpent

  // Ships bought / lost this turn
  const shipsBought = fleet.filter(g => g.boughtTurn === turn).reduce((s, g) => s + g.count, 0)
  const shipsLost = fleet.filter(g => g.destroyed === turn).reduce((s, g) => s + g.count, 0)

  function updateField(field, val) {
    setEconData(prev => ({
      ...prev,
      [turn]: { ...data, [field]: val },
    }))
  }

  return (
    <div>
      <div className="turn-selector">
        <button className="stepper-btn" onClick={() => setViewTurn(t => Math.max(0, t - 1))}>&lt;</button>
        <div style={{ textAlign: 'center' }}>
          <div className="turn-num">{turn === 0 ? 'Setup' : turn}</div>
          <div className="turn-label">
            {!isCurrentTurn ? `(viewing — current: ${currentTurn === 0 ? 'Setup' : currentTurn})` : turn === 0 ? 'Starting Purchases' : 'Econ Phase'}
          </div>
        </div>
        {isCurrentTurn ? (
          <button
            className={`stepper-btn ${afterUpgrades < 0 ? 'disabled' : pendingReset === 'advance' ? 'confirm-advance' : ''}`}
            onClick={() => {
              if (afterUpgrades < 0) return
              if (pendingReset !== 'advance') { setPendingReset('advance'); return }
              setPendingReset(null)
              advanceTurn(t => Math.min(20, t + 1))
            }}
            disabled={afterUpgrades < 0}
          >{pendingReset === 'advance' ? '>>' : '>'}</button>
        ) : (
          <button className="stepper-btn" onClick={() => setViewTurn(t => Math.min(currentTurn, t + 1))}>&gt;</button>
        )}
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '0.5rem', color: '#8b7aff' }}>{turn === 0 ? 'Starting Budget' : 'Income'}</h3>
        {turn === 0 ? (
          <EconRow label="Starting CP" value={carryOver} readOnly />
        ) : (
          <>
            <EconRow label="Carry Over CP" value={carryOver} readOnly />
            <EconRow label="Colony CP" value={colony} onChange={v => updateField('colony', v)} readOnly={!editable} />
            <EconRow label="Mineral CP" value={mineral} onChange={v => updateField('mineral', v)} readOnly={!editable} />
            <EconRow label="MS Pipeline CP" value={pipeline} onChange={v => updateField('pipeline', v)} readOnly={!editable} />
          </>
        )}
        <EconRow label="Subtotal" value={subtotal} readOnly className="subtotal" />
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '0.5rem', color: '#f9a825' }}>Spending</h3>
        {turn > 0 && <EconRow label="Turn Order Bid" value={bid} onChange={v => updateField('bid', Math.abs(v))} readOnly={!editable} />}
        {turn > 0 && <EconRow label="Maintenance" value={maintenance} readOnly />}
        <EconRow label="Tech Spending" value={techSpent} readOnly />
        {techItems.length > 0 && (
          <div className="spending-detail">
            {techItems.map(t => <span key={t.id} className="spending-tag">{t.name} ({t.cost})</span>)}
          </div>
        )}
        <EconRow label="Ship Purchasing" value={shipSpent} readOnly />
        {shipItems.length > 0 && (
          <div className="spending-detail">
            {shipItems.map(s => <span key={s.id} className="spending-tag">{s.name} ({s.cost})</span>)}
          </div>
        )}
        <EconRow label="Remaining CP" value={remaining} readOnly className="total" />
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '0.5rem', color: '#6a4ad9' }}>Upgrades</h3>
        <EconRow label="Ship Upgrades" value={upgradeSpent} readOnly />
        {upgradeItems.length > 0 && (
          <div className="spending-detail">
            {upgradeItems.map(u => <span key={u.shipId} className="spending-tag">{u.label} ({u.cost})</span>)}
          </div>
        )}
        <EconRow label="After Upgrades" value={afterUpgrades} readOnly className="total" />
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '0.5rem', color: '#888' }}>Turn Summary</h3>
        <div className="econ-summary-row">
          <span>Ships bought</span><span className="positive">{shipsBought}</span>
        </div>
        <div className="econ-summary-row">
          <span>Ships lost</span><span className={shipsLost > 0 ? 'negative' : ''}>{shipsLost}</span>
        </div>
      </div>

      {isCurrentTurn && (
        <div style={{ textAlign: 'center', padding: '0.75rem 0' }}>
          <button className={`btn ${pendingReset === 'turn' ? 'btn-danger-confirm' : 'btn-secondary'}`} onClick={onResetTurn}>
            {pendingReset === 'turn' ? 'Tap again to confirm' : `Reset Turn ${turn}`}
          </button>
        </div>
      )}
    </div>
  )
}

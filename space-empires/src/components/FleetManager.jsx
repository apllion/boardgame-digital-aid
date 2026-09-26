import { useState } from 'react'
import { SHIPS } from '../data/gameData.js'

const AUTO_UPGRADE = new Set(['BASE', 'SY'])

function getTechLevels(ownedTechs) {
  let atk = 0, def = 0, tac = 0, mov = 1
  if (ownedTechs.has('atk1')) atk++
  if (ownedTechs.has('atk2')) atk++
  if (ownedTechs.has('atk3')) atk++
  if (ownedTechs.has('def1')) def++
  if (ownedTechs.has('def2')) def++
  if (ownedTechs.has('def3')) def++
  if (ownedTechs.has('tac1')) tac++
  if (ownedTechs.has('tac2')) tac++
  if (ownedTechs.has('tac3')) tac++
  if (ownedTechs.has('mov6')) mov = 6
  else if (ownedTechs.has('mov5')) mov = 5
  else if (ownedTechs.has('mov4')) mov = 4
  else if (ownedTechs.has('mov3')) mov = 3
  else if (ownedTechs.has('mov2')) mov = 2
  return { atk, def, tac, mov }
}

function getEffectiveStats(group, currentTech) {
  const base = SHIPS.find(s => s.id === group.type)
  if (!base || base.noncombat) return null
  // Use currentTech for: auto-upgrade ships, or setup ships (no snapshot yet)
  const tech = (AUTO_UPGRADE.has(group.type) || !group.techSnapshot) ? currentTech : group.techSnapshot
  return {
    attack: typeof base.attack === 'number' ? base.attack + Math.min(tech.atk, base.hull) : base.attack,
    defense: base.defense + Math.min(tech.def, base.hull),
    tactics: tech.tac,
    move: tech.mov,
    class: base.class,
    hull: base.hull,
  }
}

function snapshotsEqual(a, b) {
  if (!a || !b) return false
  return a.atk === b.atk && a.def === b.def && a.tac === b.tac && a.mov === b.mov
}

function nextLabel(type, fleet) {
  const used = new Set(fleet.filter(g => g.type === type).map(g => g.label))
  for (let i = 1; i <= 20; i++) {
    const label = `${type} #${i}`
    if (!used.has(label)) return label
  }
  return `${type} #${Date.now()}`
}

export default function FleetManager({ turn, fleet, setFleet, ownedTechs, currentTurnSpent, umpireMode, isSetup, upgrades = [], setUpgrades, upgradeSpent = 0, upgradeBudget = 0, remainingCP = 0 }) {
  const [showAdd, setShowAdd] = useState(false)
  const [moveFrom, setMoveFrom] = useState(null) // { groupId, count }
  const [mergeFrom, setMergeFrom] = useState(null)
  const [editingLabel, setEditingLabel] = useState(null)
  const [labelDraft, setLabelDraft] = useState('')

  const currentTech = getTechLevels(ownedTechs)

  // Compatible groups for a given group (same type + same techSnapshot)
  function getCompatible(groupId) {
    const src = fleet.find(g => g.id === groupId)
    if (!src) return []
    return fleet.filter(g =>
      g.id !== groupId && !g.destroyed && g.type === src.type &&
      snapshotsEqual(g.techSnapshot, src.techSnapshot)
    )
  }

  // --- Operations ---

  function addToGroup(groupId) {
    setFleet(fleet.map(g => g.id === groupId ? { ...g, count: g.count + 1 } : g))
    setShowAdd(false)
  }

  function snapshotMatches(groupSnapshot) {
    // Current-turn and setup ships have null snapshots — compatible with each other
    // and with any group whose frozen snapshot matches current tech
    if (groupSnapshot === null) return true
    return snapshotsEqual(groupSnapshot, currentTech)
  }

  function createGroup(shipId) {
    const base = SHIPS.find(s => s.id === shipId)
    setFleet(prev => [...prev, {
      id: Date.now(),
      type: shipId,
      count: 1,
      label: nextLabel(shipId, prev),
      // No snapshot yet — lives with current tech until turn advances
      techSnapshot: base.noncombat ? null : null,
      boughtTurn: isSetup ? 'setup' : turn,
    }])
    setShowAdd(false)
  }

  function removeGroup(id) {
    const group = fleet.find(g => g.id === id)
    if (!group) return
    if (isSetup && group.boughtTurn === 'setup') setFleet(fleet.filter(g => g.id !== id))
    else if (group.boughtTurn === turn || umpireMode) setFleet(fleet.filter(g => g.id !== id))
  }

  function loseOne(id) {
    setFleet(fleet.map(g => {
      if (g.id !== id) return g
      if (g.count <= 1) return { ...g, count: 0, destroyed: turn }
      return { ...g, count: g.count - 1 }
    }).filter(g => g.count > 0 || g.destroyed))
  }

  // Move: start
  function startMove(groupId) {
    setMoveFrom({ groupId, count: 1 })
    setMergeFrom(null)
  }

  function setMoveCount(n) {
    if (!moveFrom) return
    const group = fleet.find(g => g.id === moveFrom.groupId)
    if (!group) return
    setMoveFrom({ ...moveFrom, count: Math.max(1, Math.min(n, group.count - 1)) })
  }

  function executeMoveToGroup(targetId) {
    if (!moveFrom) return
    const n = moveFrom.count
    setFleet(fleet.map(g => {
      if (g.id === moveFrom.groupId) return { ...g, count: g.count - n }
      if (g.id === targetId) return { ...g, count: g.count + n }
      return g
    }).filter(g => g.count > 0))
    setMoveFrom(null)
  }

  function executeMoveToNew() {
    if (!moveFrom) return
    const src = fleet.find(g => g.id === moveFrom.groupId)
    if (!src) { setMoveFrom(null); return }
    const n = moveFrom.count
    setFleet(prev => {
      const updated = prev.map(g =>
        g.id === moveFrom.groupId ? { ...g, count: g.count - n } : g
      ).filter(g => g.count > 0)
      return [...updated, {
        ...src,
        id: Date.now(),
        count: n,
        label: nextLabel(src.type, updated),
      }]
    })
    setMoveFrom(null)
  }

  // Merge
  function startMerge(groupId) {
    setMergeFrom(groupId)
    setMoveFrom(null)
  }

  function executeMerge(targetId) {
    const src = fleet.find(g => g.id === mergeFrom)
    if (!src) { setMergeFrom(null); return }
    setFleet(fleet
      .map(g => g.id === targetId ? { ...g, count: g.count + src.count } : g)
      .filter(g => g.id !== mergeFrom)
    )
    setMergeFrom(null)
  }

  // Upgrade
  function upgradeGroup(id) {
    const group = fleet.find(g => g.id === id)
    if (!group) return
    const base = SHIPS.find(s => s.id === group.type)
    setFleet(fleet.map(g => g.id === id ? { ...g, techSnapshot: { ...currentTech } } : g))
    if (base && setUpgrades) {
      setUpgrades(prev => [...prev, { shipId: id, turn, count: group.count, hullCost: base.hull * group.count }])
    }
  }

  // Label editing
  function startEditLabel(id, currentLabel) {
    setLabelDraft(currentLabel)
    setEditingLabel(id)
  }

  function commitLabel(id) {
    const trimmed = labelDraft.trim()
    if (trimmed) setFleet(fleet.map(g => g.id === id ? { ...g, label: trimmed } : g))
    setEditingLabel(null)
  }

  // --- Render helpers ---

  const activeGroups = fleet.filter(g => !g.destroyed)
  const destroyedGroups = fleet.filter(g => g.destroyed)
  const totalShips = activeGroups.reduce((s, g) => s + g.count, 0)
  // Next turn's maintenance = all currently active ships
  const nextMaint = activeGroups.reduce((s, g) => {
    const base = SHIPS.find(b => b.id === g.type)
    return s + (base?.maintenance || 0) * g.count
  }, 0)

  // For add sheet: group compatible existing groups by ship type
  function getAddOptions() {
    return SHIPS.map(ship => {
      const compatible = activeGroups.filter(g =>
        g.type === ship.id && snapshotMatches(g.techSnapshot)
      )
      return { ship, compatible }
    })
  }

  return (
    <div>
      <h2>{isSetup ? 'Starting Ships' : `Ships (${activeGroups.length} groups)`}</h2>

      <div className="fleet-summary">
        <span>{totalShips} ships</span>
        <span className="fleet-maint">Next maint: {nextMaint} CP</span>
      </div>
      {!isSetup && (
        <div className="fleet-summary" style={{ marginTop: '-0.5rem' }}>
          <span>Ships: {currentTurnSpent} CP</span>
          <span style={{ color: remainingCP < 0 ? '#e57373' : '#81c784' }}>Remaining: {remainingCP} CP</span>
        </div>
      )}

      {activeGroups.length === 0 && (
        <div className="fleet-empty">No ships yet. Tap + to add.</div>
      )}

      {activeGroups.map(group => {
        const base = SHIPS.find(s => s.id === group.type)
        const stats = getEffectiveStats(group, currentTech)
        // Only show upgrade if it would actually change effective stats (respecting hull caps)
        const outdated = !AUTO_UPGRADE.has(group.type) && !base.noncombat &&
          group.techSnapshot && !snapshotsEqual(group.techSnapshot, currentTech) &&
          (() => {
            const old = getEffectiveStats(group, currentTech)
            const upgraded = getEffectiveStats({ ...group, techSnapshot: currentTech }, currentTech)
            if (!old || !upgraded) return false
            return old.attack !== upgraded.attack || old.defense !== upgraded.defense ||
              old.tactics !== upgraded.tactics || old.move !== upgraded.move
          })()
        const canModify = isSetup ? group.boughtTurn === 'setup'
          : umpireMode || true // can always move/merge/lose active ships
        const isMoving = moveFrom?.groupId === group.id
        const isMerging = mergeFrom === group.id
        const compatible = getCompatible(group.id)

        return (
          <div key={group.id} className="fleet-card">
            <div className="fleet-info-row">
              <div className="fleet-name">
                {editingLabel === group.id ? (
                  <input className="fleet-label-input" value={labelDraft}
                    onChange={e => setLabelDraft(e.target.value)}
                    onBlur={() => commitLabel(group.id)}
                    onKeyDown={e => e.key === 'Enter' && commitLabel(group.id)}
                    autoFocus />
                ) : (
                  <strong onClick={() => startEditLabel(group.id, group.label)}>{group.label}</strong>
                )}
                <span className="fleet-type">
                  {group.count}× {base.name}
                  {outdated && <span className="outdated-badge">OLD</span>}
                </span>
              </div>
              {stats ? (
                <div className="fleet-stats">
                  <span className="fleet-stat">A{stats.attack}</span>
                  <span className="fleet-stat">D{stats.defense}</span>
                  <span className="fleet-stat">T{stats.tactics}</span>
                  <span className="fleet-stat">M{stats.move}</span>
                </div>
              ) : (
                <div className="fleet-stats"><span className="fleet-stat noncombat">NC</span></div>
              )}
            </div>
            {umpireMode && stats && (
              <div className="umpire-edit-row">
                <label>
                  Cnt
                  <input type="number" className="umpire-input" value={group.count}
                    onChange={e => { const v = parseInt(e.target.value); if (v >= 0) setFleet(fleet.map(g => g.id === group.id ? { ...g, count: v } : g)); }} />
                </label>
                <label>
                  A
                  <input type="number" className="umpire-input" value={group.techSnapshot?.atk ?? 0}
                    onChange={e => { const v = parseInt(e.target.value); if (v >= 0) setFleet(fleet.map(g => g.id === group.id ? { ...g, techSnapshot: { ...(g.techSnapshot || currentTech), atk: v } } : g)); }} />
                </label>
                <label>
                  D
                  <input type="number" className="umpire-input" value={group.techSnapshot?.def ?? 0}
                    onChange={e => { const v = parseInt(e.target.value); if (v >= 0) setFleet(fleet.map(g => g.id === group.id ? { ...g, techSnapshot: { ...(g.techSnapshot || currentTech), def: v } } : g)); }} />
                </label>
                <label>
                  T
                  <input type="number" className="umpire-input" value={group.techSnapshot?.tac ?? 0}
                    onChange={e => { const v = parseInt(e.target.value); if (v >= 0) setFleet(fleet.map(g => g.id === group.id ? { ...g, techSnapshot: { ...(g.techSnapshot || currentTech), tac: v } } : g)); }} />
                </label>
                <label>
                  M
                  <input type="number" className="umpire-input" value={group.techSnapshot?.mov ?? 1}
                    onChange={e => { const v = parseInt(e.target.value); if (v >= 1) setFleet(fleet.map(g => g.id === group.id ? { ...g, techSnapshot: { ...(g.techSnapshot || currentTech), mov: v } } : g)); }} />
                </label>
              </div>
            )}
            <div className="fleet-action-row">
              <button className="fleet-btn-sm" onClick={() => setFleet(fleet.map(g => g.id === group.id ? { ...g, count: g.count + 1 } : g))}>+1</button>
              {!isSetup && <button className="fleet-destroy-btn" onClick={() => loseOne(group.id)}>-1</button>}
              {canModify && group.count > 1 && !isMoving && (
                <button className="fleet-btn-sm" onClick={() => startMove(group.id)}>Assign</button>
              )}
              {canModify && compatible.length > 0 && !isMerging && (
                <button className="fleet-btn-sm" onClick={() => startMerge(group.id)}>Merge</button>
              )}
              {outdated && (() => {
                const cost = base.hull * group.count
                const canAfford = upgradeBudget >= cost
                return (
                  <button className={`fleet-upgrade-btn ${!canAfford ? 'disabled' : ''}`}
                    onClick={() => canAfford && upgradeGroup(group.id)}
                    disabled={!canAfford}>
                    Upg ({cost})
                  </button>
                )
              })()}
              {(isSetup && group.boughtTurn === 'setup' || group.boughtTurn === turn || umpireMode) && (
                <button className="fleet-remove" onClick={() => removeGroup(group.id)}>&times;</button>
              )}
            </div>

            {/* Move panel */}
            {isMoving && (
              <div className="fleet-move-panel">
                <div className="fleet-move-stepper">
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>Assign:</span>
                  <button className="stepper-btn small" onClick={() => setMoveCount(moveFrom.count - 1)}>-</button>
                  <span className="fleet-move-count">{moveFrom.count}</span>
                  <button className="stepper-btn small" onClick={() => setMoveCount(moveFrom.count + 1)}>+</button>
                </div>
                <div className="fleet-move-targets">
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>To:</span>
                  {compatible.map(t => (
                    <button key={t.id} className="fleet-btn-sm" onClick={() => executeMoveToGroup(t.id)}>
                      {t.label} ({t.count}×)
                    </button>
                  ))}
                  <button className="fleet-btn-sm new" onClick={executeMoveToNew}>New Group</button>
                  <button className="fleet-btn-sm" onClick={() => setMoveFrom(null)}>Cancel</button>
                </div>
              </div>
            )}

            {/* Merge panel */}
            {isMerging && (
              <div className="fleet-merge-panel">
                <span style={{ fontSize: '0.75rem', color: '#888' }}>Merge into:</span>
                {compatible.map(t => (
                  <button key={t.id} className="fleet-btn-sm" onClick={() => executeMerge(t.id)}>
                    {t.label} ({t.count}×)
                  </button>
                ))}
                <button className="fleet-btn-sm" onClick={() => setMergeFrom(null)}>Cancel</button>
              </div>
            )}
          </div>
        )
      })}

      <button className="fleet-add-btn" onClick={() => setShowAdd(true)}>+ Add Ship</button>

      {destroyedGroups.length > 0 && (
        <>
          <h3 className="fleet-section-header" style={{ color: '#c62828', marginTop: '1rem' }}>Losses</h3>
          {destroyedGroups.map(group => {
            const base = SHIPS.find(s => s.id === group.type)
            return (
              <div key={group.id} className="fleet-row destroyed">
                <div className="fleet-name">
                  <strong>{group.label}</strong>
                  <span className="fleet-type">{base.name} — lost T{group.destroyed}</span>
                </div>
              </div>
            )
          })}
        </>
      )}

      {/* Add ship sheet */}
      {showAdd && (
        <div className="fleet-overlay" onClick={() => setShowAdd(false)}>
          <div className="fleet-add-panel" onClick={e => e.stopPropagation()}>
            <div className="fleet-add-header">
              <h3>Add Ship</h3>
              <button className="fleet-close" onClick={() => setShowAdd(false)}>Close</button>
            </div>
            {getAddOptions().map(({ ship, compatible }) => (
              <div key={ship.id} className="fleet-add-group">
                <div className="fleet-add-type">
                  <span className="fleet-add-name">{ship.name}</span>
                  <span className="fleet-add-cost">{isSetup ? 'Free' : `${ship.cost} CP`}</span>
                </div>
                {compatible.map(g => (
                  <button key={g.id} className="fleet-add-target" onClick={() => addToGroup(g.id)}>
                    Add to {g.label} ({g.count}×)
                  </button>
                ))}
                <button className="fleet-add-target new" onClick={() => createGroup(ship.id)}>
                  New Group
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

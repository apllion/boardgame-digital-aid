import { TECHNOLOGIES } from '../data/gameData.js';

export default function TechTree({ turn, techPurchases, setTechPurchases, ownedTechs, currentTurnSpent, remainingCP = 0, umpireMode, isSetup }) {

  function toggleTech(tech) {
    const boughtTurn = techPurchases[tech.id]
    if (boughtTurn != null) {
      // Can only unbuy if bought this turn (or umpire mode)
      if (boughtTurn !== turn && !umpireMode) return
      setTechPurchases(prev => {
        const next = { ...prev }
        // Cascade: also remove techs bought this turn that depend on this
        const toRemove = new Set([tech.id])
        let changed = true
        while (changed) {
          changed = false
          for (const cat of TECHNOLOGIES) {
            for (const t of cat.techs) {
              if (t.prereq && toRemove.has(t.prereq) && next[t.id] === turn && !toRemove.has(t.id)) {
                toRemove.add(t.id)
                changed = true
              }
            }
          }
        }
        for (const id of toRemove) delete next[id]
        return next
      })
    } else {
      // Buy: prereq must be owned
      if (tech.prereq && !ownedTechs.has(tech.prereq)) return
      setTechPurchases(prev => ({ ...prev, [tech.id]: turn }))
    }
  }

  return (
    <div>
      <h2>Technology Tree</h2>
      {isSetup && (
        <div className="card" style={{ borderLeft: '4px solid #8b7aff', fontSize: '0.85rem', color: '#888' }}>
          Tech bought here counts as Turn 1 spending. Ships (including starting ships) will use this tech.
        </div>
      )}
      <div className="tech-total">
        Turn {turn}: {currentTurnSpent} CP spent
        <span style={{ color: remainingCP < 0 ? '#e57373' : '#81c784', marginLeft: '0.75rem' }}>
          Remaining: {remainingCP} CP
        </span>
      </div>
      {TECHNOLOGIES.map(cat => (
        <div key={cat.category} className="tech-category">
          <div className="tech-category-header">{cat.category}</div>
          {cat.techs.map(tech => {
            const boughtTurn = techPurchases[tech.id]
            const owned = ownedTechs.has(tech.id)
            const boughtThisTurn = boughtTurn === turn
            const locked = !owned && tech.prereq && !ownedTechs.has(tech.prereq)
            const frozenPrev = owned && !boughtThisTurn && !umpireMode

            return (
              <div
                key={tech.id}
                className={`tech-item ${locked ? 'locked' : ''} ${frozenPrev ? 'frozen' : ''}`}
                onClick={() => !locked && !frozenPrev && toggleTech(tech)}
              >
                <div className={`tech-check ${owned ? 'bought' : ''} ${boughtThisTurn ? 'this-turn' : ''}`}>
                  {owned ? '\u2713' : ''}
                </div>
                <div className="tech-info">
                  <div className="tech-name">
                    {tech.name}
                    {boughtThisTurn && <span className="turn-badge">T{turn}</span>}
                    {frozenPrev && <span className="turn-badge frozen-badge">T{boughtTurn}</span>}
                  </div>
                  <div className="tech-desc">
                    {tech.desc}
                    {locked && tech.prereq && (
                      <span style={{ color: '#e57373' }}> (Requires {TECHNOLOGIES.flatMap(c => c.techs).find(t => t.id === tech.prereq)?.name})</span>
                    )}
                  </div>
                </div>
                <div className="tech-cost">{tech.cost}</div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

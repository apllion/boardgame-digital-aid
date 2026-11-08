import { useState } from 'react'
import { POWERS, TURN_ORDER } from '../data/botRules'
import { SEQUENCE_OF_PLAY, HOME_CARDS, NATIONAL_CHARACTERISTICS, MINOR_POWER_ALLIANCES, MINOR_POWER_NOTES } from '../data/playerAid'
import {
  ActionsView, CombatView, WarAimsView, StackingView, FlashpointsView,
  ItalyView, CardIconsView, GWRulesView, TrickyRulesMenu, TrickyRuleView,
  LandBattleWorkflow, NavalBattleWorkflow,
  WarDeclarationView, AllianceGuideView, ItalyGuideView,
} from './AidViews'
import { GW_SOP, GW_NATIONAL_WILL, GW_STABILITY_TABLE, TRENCHES } from '../data/playerAid'

const PHASES = [
  { id: 'prep', label: 'Prep' },
  { id: 'diplomacy', label: 'Diplo' },
  { id: 'action', label: 'Action' },
  { id: 'end', label: 'End' },
  { id: 'ref', label: 'Ref' },
]

const STORAGE_KEY = 'ie-player-aid'

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return { powerId: 'GE', warMode: 'peace', bots: {} } // bots: { GE: true, UK: false, ... }
}

function MenuItem({ title, borderColor, onClick }) {
  return (
    <button className="gt-child-item" style={borderColor ? { borderLeftColor: borderColor } : undefined} onClick={onClick}>
      <span className="gt-child-label">{title}</span>
      <span className="gt-child-arrow">&rsaquo;</span>
    </button>
  )
}

function MinorPowersView() {
  return (
    <div>
      <table className="reference-table">
        <thead><tr><th style={{ textAlign: 'left' }}>Nation</th><th>1st</th><th>2nd</th><th>3rd</th></tr></thead>
        <tbody>
          {MINOR_POWER_ALLIANCES.map((m, i) => (
            <tr key={i}><td style={{ textAlign: 'left', fontWeight: 600 }}>{m.nation}</td>{m.choices.map((c, j) => <td key={j}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
      <ul className="rules-list" style={{ marginTop: '0.5rem' }}>
        {MINOR_POWER_NOTES.map((n, i) => <li key={i} style={{ fontSize: '0.75rem' }}>{n}</li>)}
      </ul>
    </div>
  )
}

function HomeCardsView({ powerId }) {
  const power = POWERS[powerId]
  const homeCards = HOME_CARDS[powerId] || []
  return (
    <div>
      {homeCards.map((card, i) => (
        <div key={i} className="card" style={{ borderLeftColor: power.color }}>
          <div className="card-title">{card.name} ({card.cp} CP)</div>
          <div className="card-detail">{card.text}</div>
        </div>
      ))}
    </div>
  )
}

function NationalTraitsView({ powerId }) {
  const traits = NATIONAL_CHARACTERISTICS[powerId] || []
  return (
    <ul className="rules-list">
      {traits.map((t, i) => <li key={i}>{t}</li>)}
    </ul>
  )
}

export default function PlayerAid({ onBack }) {
  const [state, setState] = useState(loadState)
  const [phase, setPhase] = useState('action')
  const [subView, setSubView] = useState(null)

  const { powerId, warMode = 'peace', bots = {} } = state
  const isWartime = warMode === 'war' || warMode === 'gw'
  const isGW = warMode === 'gw'
  const isBot = !!bots[powerId]

  function updateState(fields) {
    const next = { ...state, ...fields }
    setState(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const power = POWERS[powerId]

  if (subView) {
    return (
      <div>
        <div className="gt-breadcrumbs">
          <button className="gt-back-btn" onClick={() => setSubView(null)}>&#x2039;</button>
          <div className="gt-breadcrumb-trail">
            <span className="gt-breadcrumb-active">{subView.title}</span>
          </div>
        </div>
        <div className="gt-content">
          {subView.render()}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Power selector */}
      <div className="power-selector">
        {TURN_ORDER.map(id => (
          <button
            key={id}
            className={`power-chip ${powerId === id ? 'active' : ''}`}
            style={powerId === id ? { background: POWERS[id].color, color: POWERS[id].textColor } : undefined}
            onClick={() => updateState({ powerId: id })}
          >
            {id}
            {bots[id] && <span className="bot-indicator">bot</span>}
          </button>
        ))}
      </div>

      {/* Peace/War/GW toggle */}
      <div className="war-toggle">
        <button className={warMode === 'peace' ? 'active' : ''} onClick={() => updateState({ warMode: 'peace' })}>Peace</button>
        <button className={warMode === 'war' ? 'active war' : ''} onClick={() => updateState({ warMode: 'war' })}>War</button>
        <button className={warMode === 'gw' ? 'active gw' : ''} onClick={() => updateState({ warMode: 'gw' })}>GW</button>
      </div>

      {/* Phase content */}
      {phase === 'prep' && (
        <div>
          {isGW ? (
            <>
              <h2>GW Sequence of Play</h2>
              {GW_SOP.map((p, i) => (
                <div key={i} className="card" style={{ borderLeftColor: '#c0392b' }}>
                  <div className="card-title">{p.phase}</div>
                  <ol className="rules-list" style={{ paddingLeft: '1.2rem' }}>
                    {p.steps.map((s, j) => <li key={j} style={{ listStyle: 'decimal' }}>{s}</li>)}
                  </ol>
                </div>
              ))}
            </>
          ) : (
            <>
              <h2>Prep & Diplomacy Phase</h2>
              {SEQUENCE_OF_PLAY.filter((_, i) => i < 2).map((p, i) => (
                <div key={i} className="card" style={{ borderLeftColor: '#4a5adb' }}>
                  <div className="card-title">{p.phase}</div>
                  <ol className="rules-list" style={{ paddingLeft: '1.2rem' }}>
                    {p.steps.map((s, j) => <li key={j} style={{ listStyle: 'decimal' }}>{s}</li>)}
                  </ol>
                </div>
              ))}
            </>
          )}
          <div className="gt-children-list">
            <MenuItem title="Home Cards" borderColor={power.color} onClick={() => setSubView({ title: 'Home Cards', render: () => <HomeCardsView powerId={powerId} /> })} />
          </div>
        </div>
      )}

      {phase === 'diplomacy' && (
        <div>
          <h2>Diplomacy & Alliances</h2>
          <div className="gt-children-list">
            <MenuItem title="Alliance & Influence Guide" borderColor="#4a5adb" onClick={() => setSubView({ title: 'Alliance & Influence Guide', render: () => <AllianceGuideView onSelect={(view) => setSubView(view)} /> })} />
            <MenuItem title="Minor Power Alliances" onClick={() => setSubView({ title: 'Minor Power Alliances', render: () => <MinorPowersView /> })} />
            <MenuItem title="Flashpoints & Projection" borderColor="#d4a017" onClick={() => setSubView({ title: 'Flashpoints', render: () => <FlashpointsView /> })} />
            <MenuItem title="Italy" borderColor="#27ae60" onClick={() => setSubView({ title: 'Italy Guide', render: () => <ItalyGuideView onSelect={(view) => setSubView(view)} /> })} />
          </div>
        </div>
      )}

      {phase === 'action' && (
        <div>
          <h2>{isBot ? `${power.name} (Bot)` : isGW ? 'GW Actions' : isWartime ? 'Wartime Actions' : 'Peacetime Actions'}</h2>
          {isBot && (
            <div className="card" style={{ borderLeftColor: '#2e7d32', marginBottom: '0.75rem' }}>
              <div className="card-detail" style={{ fontSize: '0.85rem' }}>
                This power is controlled by a bot. Use the Bot Aid for impulse flowcharts.
              </div>
              <button className="btn btn-secondary" style={{ marginTop: '0.5rem' }} onClick={onBack}>Open Bot Aid</button>
            </div>
          )}
          {isGW && (
            <div className="card" style={{ borderLeftColor: '#c0392b', marginBottom: '0.75rem' }}>
              <div className="card-title">Trench Rules [28.1]</div>
              <ul className="rules-list">
                {TRENCHES.rules.map((r, i) => <li key={i} style={{ fontSize: '0.8rem' }}>{r}</li>)}
              </ul>
            </div>
          )}
          <div className="gt-children-list">
            <MenuItem
              title={isGW ? 'GW Wartime Actions' : isWartime ? 'Wartime Actions' : 'Peacetime Actions'}
              onClick={() => setSubView({ title: isWartime ? 'Wartime Actions' : 'Peacetime Actions', render: () => <ActionsView isWartime={isWartime} powerId={powerId} /> })}
            />
            {isWartime && (
              <>
                <MenuItem title="Land Battle Guide" borderColor="#c0392b" onClick={() => setSubView({ title: 'Land Battle Guide', render: () => <LandBattleWorkflow powerId={powerId} /> })} />
                <MenuItem title="Naval Battle Guide" borderColor="#2e5ea8" onClick={() => setSubView({ title: 'Naval Battle Guide', render: () => <NavalBattleWorkflow powerId={powerId} /> })} />
                <MenuItem title="War Declaration Guide" borderColor="#c0392b" onClick={() => setSubView({ title: 'War Declaration Guide', render: () => <WarDeclarationView onSelect={(view) => setSubView(view)} /> })} />
              </>
            )}
            <MenuItem title="Combat & CRT" borderColor="#c0392b" onClick={() => setSubView({ title: 'Combat & CRT', render: () => <CombatView powerId={powerId} /> })} />
            <MenuItem title="Stacking & Alliances" onClick={() => setSubView({ title: 'Stacking & Alliances', render: () => <StackingView /> })} />
          </div>
        </div>
      )}

      {phase === 'end' && (
        <div>
          <h2>End Phase</h2>
          {SEQUENCE_OF_PLAY.filter((_, i) => i === 3).map((p, i) => (
            <div key={i} className="card" style={{ borderLeftColor: '#888' }}>
              <div className="card-title">{p.phase}</div>
              <ol className="rules-list" style={{ paddingLeft: '1.2rem' }}>
                {p.steps.map((s, j) => <li key={j} style={{ listStyle: 'decimal' }}>{s}</li>)}
              </ol>
            </div>
          ))}
          {isGW && (
            <>
              <div className="card" style={{ borderLeftColor: '#d4a017' }}>
                <div className="card-title">National Will Step [25.6]</div>
                <table className="reference-table">
                  <thead><tr><th>VPs</th><th>Bonus</th></tr></thead>
                  <tbody>
                    {GW_NATIONAL_WILL.map((r, i) => (
                      <tr key={i}><td style={{ fontWeight: 700 }}>{r.vps}</td><td style={{ textAlign: 'left' }}>{r.bonus}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card" style={{ borderLeftColor: '#c0392b' }}>
                <div className="card-title">GW Stability Loss</div>
                <table className="reference-table">
                  <thead><tr><th style={{ textAlign: 'left' }}>Cause</th><th>Effect</th></tr></thead>
                  <tbody>
                    {GW_STABILITY_TABLE.gwCauses.map((r, i) => (
                      <tr key={i}><td style={{ textAlign: 'left', fontSize: '0.78rem' }}>{r.cause}</td><td style={{ fontWeight: 700 }}>{r.effect}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {phase === 'ref' && (
        <div>
          <h2>Bot Assignment</h2>
          <div className="bot-assignment">
            {TURN_ORDER.map(id => (
              <button
                key={id}
                className={`bot-assign-chip ${bots[id] ? 'is-bot' : ''}`}
                style={{ borderColor: POWERS[id].color }}
                onClick={() => updateState({ bots: { ...bots, [id]: !bots[id] } })}
              >
                <span style={{ color: POWERS[id].color, fontWeight: 700 }}>{id}</span>
                <span className="bot-assign-label">{bots[id] ? 'Bot' : 'Player'}</span>
              </button>
            ))}
          </div>

          <h2>Reference</h2>
          <div className="gt-children-list">
            <MenuItem title="National Characteristics" onClick={() => setSubView({ title: 'National Characteristics', render: () => <NationalTraitsView powerId={powerId} /> })} />
            <MenuItem title="Home Cards" borderColor={power.color} onClick={() => setSubView({ title: 'Home Cards', render: () => <HomeCardsView powerId={powerId} /> })} />
            <MenuItem title="Card Icons" onClick={() => setSubView({ title: 'Card Icons', render: () => <CardIconsView /> })} />
            <MenuItem title="GW Rules" borderColor="#c0392b" onClick={() => setSubView({ title: 'GW Rules', render: () => <GWRulesView /> })} />
            <MenuItem title="Tricky Rules" borderColor="#f9a825" onClick={() => setSubView({
              title: 'Tricky Rules',
              render: () => <TrickyRulesMenu onSelect={(rule) => setSubView({ title: rule.title, render: () => <TrickyRuleView rule={rule} /> })} />,
            })} />
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <button className="btn btn-secondary" onClick={onBack}>Back to Menu</button>
          </div>
        </div>
      )}

      {/* Bottom phase tabs */}
      <div className="phase-tabs">
        {PHASES.map(p => (
          <button
            key={p.id}
            className={phase === p.id ? 'active' : ''}
            onClick={() => { setPhase(p.id); setSubView(null); }}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}

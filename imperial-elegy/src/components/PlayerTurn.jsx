import { useState } from 'react'
import { useGameContext } from '@shared/game-tree'
import { POWERS } from '../data/botRules'
import {
  PEACETIME_ACTIONS, WARTIME_ACTIONS_DETAILED,
  HOME_CARDS, NATIONAL_CHARACTERISTICS,
  CRT, CRT_NOTES, LAND_COMBAT_MODIFIERS, NAVAL_COMBAT_MODIFIERS,
  BATTLE_SEQUENCE, SUPPORT_RULES,
  WAR_AIMS, TREATY_OPTIONS, VICTORY_TYPES, REFUSING_WAR,
  MINOR_POWER_ALLIANCES, MINOR_POWER_NOTES,
  EF_RULES,
} from '../data/playerAid'
import DiceRoll from './DiceRoll'

function useSubView() {
  const [stack, setStack] = useState([])
  const push = (view) => setStack(s => [...s, view])
  const pop = () => setStack(s => s.slice(0, -1))
  const current = stack.length > 0 ? stack[stack.length - 1] : null
  return { current, push, pop, depth: stack.length }
}

function MenuItem({ title, borderColor, onClick }) {
  return (
    <button
      className="gt-child-item"
      style={borderColor ? { borderLeftColor: borderColor } : undefined}
      onClick={onClick}
    >
      <span className="gt-child-label">{title}</span>
      <span className="gt-child-arrow">&rsaquo;</span>
    </button>
  )
}

function ActionsView({ isWartime }) {
  const actions = isWartime ? WARTIME_ACTIONS_DETAILED : PEACETIME_ACTIONS
  return (
    <table className="reference-table">
      <thead><tr><th style={{ textAlign: 'left' }}>Action</th><th>Cost</th></tr></thead>
      <tbody>
        {actions.map((a, i) => (
          <tr key={i}>
            <td style={{ textAlign: 'left' }}>
              <strong>{a.name}</strong>
              <div style={{ fontSize: '0.7rem', color: '#999', marginTop: '0.15rem' }}>{a.detail}</div>
            </td>
            <td style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>{a.cost}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function CombatView() {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#c0392b' }}>
        <div className="card-title">Land Battle Sequence</div>
        <ol className="rules-list" style={{ paddingLeft: '1.2rem' }}>
          {BATTLE_SEQUENCE.map((s, i) => <li key={i} style={{ listStyle: 'decimal' }}>{s}</li>)}
        </ol>
      </div>

      <div className="card-title" style={{ marginTop: '0.5rem' }}>Combat Results Table</div>
      <table className="reference-table">
        <thead><tr><th>Differential</th><th>Att/Def</th><th>Victor</th></tr></thead>
        <tbody>
          {CRT.map((row, i) => (
            <tr key={i}>
              <td style={{ fontWeight: 600 }}>{row.differential}</td>
              <td>{row.attDef}</td>
              <td>{row.victor}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="rules-list" style={{ marginTop: '0.5rem' }}>
        {CRT_NOTES.map((n, i) => <li key={i} style={{ fontSize: '0.75rem' }}>{n}</li>)}
      </ul>

      <div className="card" style={{ borderLeftColor: '#888', marginTop: '0.75rem' }}>
        <div className="card-title">Land Combat Modifiers</div>
        <table className="reference-table">
          <tbody>
            {LAND_COMBAT_MODIFIERS.map((m, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'left', fontWeight: 600 }}>{m.name}</td>
                <td style={{ textAlign: 'left' }}>{m.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ borderLeftColor: '#2e5ea8', marginTop: '0.5rem' }}>
        <div className="card-title">Naval Combat Modifiers</div>
        <table className="reference-table">
          <tbody>
            {NAVAL_COMBAT_MODIFIERS.map((m, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'left', fontWeight: 600 }}>{m.name}</td>
                <td style={{ textAlign: 'left' }}>{m.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ borderLeftColor: '#888', marginTop: '0.5rem' }}>
        <div className="card-title">Support</div>
        <ul className="rules-list">
          {SUPPORT_RULES.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>

      <div className="card" style={{ borderLeftColor: '#888', marginTop: '0.5rem' }}>
        <div className="card-title">EF Special Rules</div>
        <ul className="rules-list">
          {EF_RULES.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>
    </div>
  )
}

function WarAimsView() {
  return (
    <div>
      {WAR_AIMS.types.map((t, i) => (
        <div key={i} className="card" style={{ borderLeftColor: '#d4a017' }}>
          <div className="card-title">{t.name}</div>
          <div className="card-detail">{t.detail}</div>
          <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.35rem' }}><strong>Who:</strong> {t.who}</div>
          <div style={{ fontSize: '0.8rem', color: '#c0392b', marginTop: '0.2rem' }}><strong>Cannot:</strong> {t.cannot}</div>
        </div>
      ))}

      <div className="card" style={{ borderLeftColor: '#4a5adb' }}>
        <div className="card-title">Quick Decision Guide</div>
        <table className="reference-table">
          <thead><tr><th style={{ textAlign: 'left' }}>Situation</th><th>War Aim</th></tr></thead>
          <tbody>
            {WAR_AIMS.guide.map((g, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'left' }}>{g.situation}</td>
                <td style={{ fontWeight: 600 }}>{g.aim}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ borderLeftColor: '#888' }}>
        <div className="card-title">Victory Types</div>
        {VICTORY_TYPES.map((v, i) => (
          <div key={i} style={{ marginBottom: '0.4rem' }}>
            <strong>{v.name}:</strong> <span className="card-detail">{v.detail}</span>
          </div>
        ))}
      </div>
      <div className="card" style={{ borderLeftColor: '#888' }}>
        <div className="card-title">Treaty Options</div>
        {TREATY_OPTIONS.map((t, i) => (
          <div key={i} style={{ marginBottom: '0.4rem' }}>
            <strong>{t.name}:</strong> <span className="card-detail">{t.detail}</span>
          </div>
        ))}
      </div>
      <div className="card" style={{ borderLeftColor: '#c0392b' }}>
        <div className="card-title">Refusing a Call to War</div>
        <ul className="rules-list">
          {REFUSING_WAR.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>
    </div>
  )
}

function MinorPowersView() {
  return (
    <div>
      <table className="reference-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Nation</th>
            <th>1st</th><th>2nd</th><th>3rd</th>
          </tr>
        </thead>
        <tbody>
          {MINOR_POWER_ALLIANCES.map((m, i) => (
            <tr key={i}>
              <td style={{ textAlign: 'left', fontWeight: 600 }}>{m.nation}</td>
              {m.choices.map((c, j) => <td key={j}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="rules-list" style={{ marginTop: '0.5rem' }}>
        {MINOR_POWER_NOTES.map((n, i) => <li key={i} style={{ fontSize: '0.75rem' }}>{n}</li>)}
      </ul>
    </div>
  )
}

function HomeCardsView({ powerId, color }) {
  const homeCards = HOME_CARDS[powerId] || []
  return (
    <div>
      {homeCards.map((card, i) => (
        <div key={i} className="card" style={{ borderLeftColor: color }}>
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

export default function PlayerTurn({ powerId }) {
  const ctx = useGameContext()
  const { isWartime } = ctx
  const power = POWERS[powerId]
  const subView = useSubView()

  if (subView.current) {
    return (
      <div>
        <div className="gt-breadcrumbs">
          <button className="gt-back-btn" onClick={subView.pop}>&#x2039;</button>
          <div className="gt-breadcrumb-trail">
            <span className="gt-breadcrumb-active">{subView.current.title}</span>
          </div>
        </div>
        <div className="gt-content">
          {subView.current.render()}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="bot-header" style={{ background: `${power.bgColor}40` }}>
        <div className="power-badge" style={{ background: power.color, color: power.textColor }}>
          {power.short}
        </div>
        <div>
          <div className="power-name">{power.name}</div>
          <div className="impulse-label">Player Impulse</div>
        </div>
      </div>

      <div className="card" style={{ borderLeftColor: power.color }}>
        <div className="card-title">Dice</div>
        <DiceRoll label="" onRoll={() => {}} />
      </div>

      <div className="gt-children-list">
        <MenuItem
          title={isWartime ? 'Wartime Actions' : 'Peacetime Actions'}
          onClick={() => subView.push({
            title: isWartime ? 'Wartime Actions' : 'Peacetime Actions',
            render: () => <ActionsView isWartime={isWartime} />,
          })}
        />
        <MenuItem
          title="Combat & CRT"
          borderColor="#c0392b"
          onClick={() => subView.push({
            title: 'Combat & CRT',
            render: () => <CombatView />,
          })}
        />
        <MenuItem
          title="War Aims & Treaties"
          borderColor="#d4a017"
          onClick={() => subView.push({
            title: 'War Aims & Treaties',
            render: () => <WarAimsView />,
          })}
        />
        <MenuItem
          title="Minor Power Alliances"
          onClick={() => subView.push({
            title: 'Minor Power Alliances',
            render: () => <MinorPowersView />,
          })}
        />
        <MenuItem
          title="Home Cards"
          borderColor={power.color}
          onClick={() => subView.push({
            title: 'Home Cards',
            render: () => <HomeCardsView powerId={powerId} color={power.color} />,
          })}
        />
        <MenuItem
          title="National Characteristics"
          onClick={() => subView.push({
            title: 'National Characteristics',
            render: () => <NationalTraitsView powerId={powerId} />,
          })}
        />
      </div>

      <div className="gt-swipe-hint" style={{ marginTop: '1rem' }}>
        <span style={{ color: '#888', fontSize: '0.85rem' }}>Swipe left for next power &rarr;</span>
      </div>
    </div>
  )
}

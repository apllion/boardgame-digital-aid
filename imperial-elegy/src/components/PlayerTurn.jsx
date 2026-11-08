import { useState } from 'react'
import { useGameContext } from '@shared/game-tree'
import { POWERS } from '../data/botRules'
import { HOME_CARDS, NATIONAL_CHARACTERISTICS, MINOR_POWER_ALLIANCES, MINOR_POWER_NOTES } from '../data/playerAid'
import { ActionsView, CombatView, WarAimsView, StackingView, FlashpointsView, ItalyView, CardIconsView, GWRulesView, TrickyRulesMenu, TrickyRuleView, WarDeclarationView, AllianceGuideView, ItalyGuideView, LandBattleWorkflow, NavalBattleWorkflow } from './AidViews'

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
  const status = ctx.getWarStatus(powerId)
  const isWartime = status !== 'peace'
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

      <div className="gt-children-list">
        <MenuItem
          title={isWartime ? 'Wartime Actions' : 'Peacetime Actions'}
          onClick={() => subView.push({
            title: isWartime ? 'Wartime Actions' : 'Peacetime Actions',
            render: () => <ActionsView isWartime={isWartime} powerId={powerId} />,
          })}
        />
        <MenuItem
          title="Land Battle Guide"
          borderColor="#c0392b"
          onClick={() => subView.push({
            title: 'Land Battle Guide',
            render: () => <LandBattleWorkflow powerId={powerId} />,
          })}
        />
        <MenuItem
          title="Naval Battle Guide"
          borderColor="#2e5ea8"
          onClick={() => subView.push({
            title: 'Naval Battle Guide',
            render: () => <NavalBattleWorkflow powerId={powerId} />,
          })}
        />
        <MenuItem
          title="Combat & CRT"
          borderColor="#c0392b"
          onClick={() => subView.push({
            title: 'Combat & CRT',
            render: () => <CombatView powerId={powerId} />,
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
          title="Stacking & Alliances"
          onClick={() => subView.push({
            title: 'Stacking & Alliances',
            render: () => <StackingView />,
          })}
        />
        <MenuItem
          title="Flashpoints & Projection"
          borderColor="#d4a017"
          onClick={() => subView.push({
            title: 'Flashpoints & Projection',
            render: () => <FlashpointsView />,
          })}
        />
        <MenuItem
          title="Italy"
          borderColor="#27ae60"
          onClick={() => subView.push({
            title: 'Italy',
            render: () => <ItalyView />,
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
        <MenuItem
          title="Card Icons"
          onClick={() => subView.push({
            title: 'Card Icons',
            render: () => <CardIconsView />,
          })}
        />
        <MenuItem
          title="GW Rules"
          borderColor="#c0392b"
          onClick={() => subView.push({
            title: 'GW Rules',
            render: () => <GWRulesView />,
          })}
        />
        <MenuItem
          title="War Declaration Guide"
          borderColor="#c0392b"
          onClick={() => subView.push({
            title: 'War Declaration Guide',
            render: () => <WarDeclarationView onSelect={(view) => subView.push(view)} />,
          })}
        />
        <MenuItem
          title="Alliance & Influence Guide"
          borderColor="#4a5adb"
          onClick={() => subView.push({
            title: 'Alliance & Influence Guide',
            render: () => <AllianceGuideView onSelect={(view) => subView.push(view)} />,
          })}
        />
        <MenuItem
          title="Italy Guide"
          borderColor="#27ae60"
          onClick={() => subView.push({
            title: 'Italy Guide',
            render: () => <ItalyGuideView onSelect={(view) => subView.push(view)} />,
          })}
        />
        <MenuItem
          title="Tricky Rules"
          borderColor="#f9a825"
          onClick={() => subView.push({
            title: 'Tricky Rules',
            render: () => <TrickyRulesMenu onSelect={(rule) => subView.push({
              title: rule.title,
              render: () => <TrickyRuleView rule={rule} />,
            })} />,
          })}
        />
      </div>

      <div className="gt-swipe-hint" style={{ marginTop: '1rem' }}>
        <span style={{ color: '#888', fontSize: '0.85rem' }}>Swipe left for next power &rarr;</span>
      </div>
    </div>
  )
}

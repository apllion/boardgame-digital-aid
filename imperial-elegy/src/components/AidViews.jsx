import {
  PEACETIME_ACTIONS, WARTIME_ACTIONS_DETAILED,
  CRT, CRT_NOTES, LAND_COMBAT_MODIFIERS, NAVAL_COMBAT_MODIFIERS,
  BATTLE_SEQUENCE, SUPPORT_RULES,
  WAR_AIMS, TREATY_OPTIONS, VICTORY_TYPES, REFUSING_WAR,
  MINOR_POWER_ALLIANCES, MINOR_POWER_NOTES,
  EF_RULES,
} from '../data/playerAid'
import { TRICKY_RULES } from '../data/trickyRules'

export function ActionsView({ isWartime }) {
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

export function CombatView() {
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

export function WarAimsView() {
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

export function TrickyRuleView({ rule }) {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#f9a825' }}>
        <div className="card-detail" style={{ fontStyle: 'italic' }}>{rule.summary}</div>
      </div>
      <div className="card" style={{ borderLeftColor: '#4caf50' }}>
        <div className="card-title">Steps</div>
        <ol className="rules-list" style={{ paddingLeft: '1.2rem' }}>
          {rule.steps.map((s, i) => <li key={i} style={{ listStyle: 'decimal' }}>{s}</li>)}
        </ol>
      </div>
      {rule.modifiers.length > 0 && (
        <div className="card" style={{ borderLeftColor: '#2e5ea8' }}>
          <div className="card-title">Modifiers / DRMs</div>
          <ul className="rules-list">
            {rule.modifiers.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </div>
      )}
      <div className="card" style={{ borderLeftColor: '#c0392b' }}>
        <div className="card-title">Gotchas</div>
        <ul className="rules-list">
          {rule.gotchas.map((g, i) => <li key={i}>{g}</li>)}
        </ul>
      </div>
    </div>
  )
}

export function TrickyRulesMenu({ onSelect }) {
  return (
    <div className="gt-children-list">
      {TRICKY_RULES.map(rule => (
        <button key={rule.id} className="gt-child-item" style={{ borderLeftColor: '#f9a825' }} onClick={() => onSelect(rule)}>
          <span className="gt-child-label">{rule.title}</span>
          <span className="gt-child-arrow">&rsaquo;</span>
        </button>
      ))}
    </div>
  )
}

import {
  PEACETIME_ACTIONS, WARTIME_ACTIONS_DETAILED,
  CRT, CRT_NOTES, LAND_COMBAT_MODIFIERS, NAVAL_COMBAT_MODIFIERS,
  BATTLE_SEQUENCE, SUPPORT_RULES,
  WAR_AIMS, TREATY_OPTIONS, VICTORY_TYPES, REFUSING_WAR,
  MINOR_POWER_ALLIANCES, MINOR_POWER_NOTES,
  EF_RULES,
  STACKING_RULES, ALLIANCE_RESOLUTION,
  FLASHPOINTS, FLASHPOINT_SUMMARY,
  ITALY_EVENT, KINGDOM_OF_ITALY,
  CARD_ICONS,
  GW_NATIONAL_WILL, GW_STABILITY_TABLE, GW_SOP, TRENCHES,
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
              {a.detail && <div style={{ fontSize: '0.7rem', color: '#999', marginTop: '0.15rem' }}>{a.detail}</div>}
              {a.items && <ul style={{ fontSize: '0.7rem', color: '#999', marginTop: '0.15rem', paddingLeft: '1rem' }}>
                {a.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>}
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

export function StackingView() {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#888' }}>
        <div className="card-title">Stacking Limits [5.3]</div>
        <table className="reference-table">
          <thead><tr><th style={{ textAlign: 'left' }}>Region</th><th>Limit</th></tr></thead>
          <tbody>
            {STACKING_RULES.map((r, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'left', fontWeight: 600 }}>{r.region}</td>
                <td>{r.limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card" style={{ borderLeftColor: '#4a5adb' }}>
        <div className="card-title">Alliance Resolution [8.6]</div>
        <ol className="rules-list" style={{ paddingLeft: '1.2rem' }}>
          {ALLIANCE_RESOLUTION.map((r, i) => <li key={i} style={{ listStyle: 'decimal' }}>{r}</li>)}
        </ol>
      </div>
    </div>
  )
}

export function FlashpointsView() {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#d4a017' }}>
        <div className="card-title">Flashpoints</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.5rem' }}>
          {FLASHPOINTS.list.map(f => (
            <span key={f.key} style={{ background: '#333', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
              <strong>{f.key}.</strong> {f.name}
            </span>
          ))}
        </div>
      </div>
      <div className="card-title" style={{ marginTop: '0.5rem' }}>Flashpoint Summary</div>
      <table className="reference-table">
        <thead><tr><th style={{ textAlign: 'left' }}>Flashpoint</th><th>Condition</th><th>Reward</th></tr></thead>
        <tbody>
          {FLASHPOINT_SUMMARY.map((f, i) => (
            <tr key={i}>
              <td style={{ textAlign: 'left', fontWeight: 600 }}>{f.name}</td>
              <td style={{ fontSize: '0.75rem' }}>{f.condition}</td>
              <td style={{ fontWeight: 600 }}>{f.reward}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="card" style={{ borderLeftColor: '#2e5ea8', marginTop: '0.75rem' }}>
        <div className="card-title">Power Projection</div>
        <ul className="rules-list">
          {FLASHPOINTS.powerProjection.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>
    </div>
  )
}

export function ItalyView() {
  return (
    <div>
      <div className="card-title">Italy Mandatory Event [22.0]</div>
      <table className="reference-table">
        <thead><tr><th>Roll</th><th style={{ textAlign: 'left' }}>Result</th></tr></thead>
        <tbody>
          {ITALY_EVENT.table.map((r, i) => (
            <tr key={i}>
              <td style={{ fontWeight: 700 }}>{r.roll}</td>
              <td style={{ textAlign: 'left' }}><strong>{r.result}</strong> — {r.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="card" style={{ borderLeftColor: '#2e5ea8', marginTop: '0.75rem' }}>
        <div className="card-title">DRMs</div>
        <ul className="rules-list">
          {ITALY_EVENT.drms.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
      </div>
      <div className="card" style={{ borderLeftColor: '#4caf50', marginTop: '0.5rem' }}>
        <div className="card-title">Petition for Aid (Roll 2)</div>
        <div className="card-detail">{ITALY_EVENT.results.petitionForAid}</div>
      </div>
      <div className="card" style={{ borderLeftColor: '#c0392b', marginTop: '0.5rem' }}>
        <div className="card-title">Internal Italian War (Roll 3–5)</div>
        <div className="card-detail">{ITALY_EVENT.results.internalItalianWar}</div>
      </div>
      <div className="card" style={{ borderLeftColor: '#d4a017', marginTop: '0.5rem' }}>
        <div className="card-title">Nationalist Wave (Roll 6)</div>
        <div className="card-detail">{ITALY_EVENT.results.nationalistWave}</div>
      </div>
      <div className="card" style={{ borderLeftColor: '#888', marginTop: '0.5rem' }}>
        <div className="card-title">Italian Unification Die Roll</div>
        <div className="card-detail">{ITALY_EVENT.unificationDieRoll}</div>
      </div>
      <div className="card" style={{ borderLeftColor: '#4a5adb', marginTop: '0.75rem' }}>
        <div className="card-title">Kingdom of Italy Table</div>
        <table className="reference-table">
          <thead><tr><th>Roll</th><th style={{ textAlign: 'left' }}>Result</th></tr></thead>
          <tbody>
            {KINGDOM_OF_ITALY.table.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{r.roll}</td>
                <td style={{ textAlign: 'left' }}>{r.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card" style={{ borderLeftColor: '#888', marginTop: '0.5rem' }}>
        <div className="card-title">Wars of Unification</div>
        <div className="card-detail">{KINGDOM_OF_ITALY.warsOfUnification}</div>
      </div>
      <div className="card" style={{ borderLeftColor: '#888', marginTop: '0.5rem' }}>
        <div className="card-title">Italian Redeployment</div>
        <div className="card-detail">{KINGDOM_OF_ITALY.redeployment}</div>
      </div>
    </div>
  )
}

export function CardIconsView() {
  return (
    <div>
      <div className="card-title">Card Icons Legend</div>
      <table className="reference-table">
        <thead><tr><th>Icon</th><th style={{ textAlign: 'left' }}>Meaning</th></tr></thead>
        <tbody>
          {CARD_ICONS.map((c, i) => (
            <tr key={i}>
              <td style={{ fontWeight: 700 }}>{c.icon}</td>
              <td style={{ textAlign: 'left' }}>{c.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function GWRulesView() {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#c0392b' }}>
        <div className="card-title">GW Sequence of Play</div>
        {GW_SOP.map((p, i) => (
          <div key={i} style={{ marginBottom: '0.5rem' }}>
            <strong>{p.phase}</strong>
            <ol className="rules-list" style={{ paddingLeft: '1.2rem' }}>
              {p.steps.map((s, j) => <li key={j} style={{ listStyle: 'decimal' }}>{s}</li>)}
            </ol>
          </div>
        ))}
      </div>
      <div className="card" style={{ borderLeftColor: '#d4a017', marginTop: '0.5rem' }}>
        <div className="card-title">National Will Step [25.6]</div>
        <table className="reference-table">
          <thead><tr><th>VPs</th><th>Bonus</th></tr></thead>
          <tbody>
            {GW_NATIONAL_WILL.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{r.vps}</td>
                <td style={{ textAlign: 'left' }}>{r.bonus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card" style={{ borderLeftColor: '#888', marginTop: '0.5rem' }}>
        <div className="card-title">GW Stability Loss</div>
        <table className="reference-table">
          <thead><tr><th style={{ textAlign: 'left' }}>Cause</th><th>Effect</th></tr></thead>
          <tbody>
            {GW_STABILITY_TABLE.gwCauses.map((r, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'left', fontSize: '0.75rem' }}>{r.cause}</td>
                <td style={{ fontWeight: 700 }}>{r.effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card" style={{ borderLeftColor: '#888', marginTop: '0.5rem' }}>
        <div className="card-title">Pre-GW Stability Loss</div>
        <table className="reference-table">
          <thead><tr><th style={{ textAlign: 'left' }}>Cause</th><th>Effect</th></tr></thead>
          <tbody>
            {GW_STABILITY_TABLE.preGwCauses.map((r, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'left', fontSize: '0.75rem' }}>{r.cause}</td>
                <td style={{ fontWeight: 700 }}>{r.effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card" style={{ borderLeftColor: '#2e5ea8', marginTop: '0.5rem' }}>
        <div className="card-title">Trenches [28.1]</div>
        <ul className="rules-list">
          {TRENCHES.rules.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
        <table className="reference-table" style={{ marginTop: '0.5rem' }}>
          <thead><tr><th>Status</th><th style={{ textAlign: 'left' }}>Detail</th></tr></thead>
          <tbody>
            {TRENCHES.statuses.map((s, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{s.status}</td>
                <td style={{ textAlign: 'left' }}>{s.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

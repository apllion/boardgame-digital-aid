import {
  PEACETIME_ACTIONS, WARTIME_ACTIONS_DETAILED,
  CRT, CRT_NOTES, LAND_COMBAT_MODIFIERS, NAVAL_COMBAT_MODIFIERS,
  BATTLE_SEQUENCE, SUPPORT_RULES,
  WAR_AIMS, TREATY_OPTIONS, VICTORY_TYPES, REFUSING_WAR,
  MINOR_POWER_ALLIANCES, MINOR_POWER_NOTES,
  EF_RULES, POWER_CONTEXT,
  STACKING_RULES, ALLIANCE_RESOLUTION,
  FLASHPOINTS, FLASHPOINT_SUMMARY,
  ITALY_EVENT, KINGDOM_OF_ITALY,
  CARD_ICONS,
  GW_NATIONAL_WILL, GW_STABILITY_TABLE, GW_SOP, TRENCHES,
} from '../data/playerAid'
import { TRICKY_RULES } from '../data/trickyRules'
import {
  WAR_GLOSSARY, WAR_DECLARATION_FLOW, WAR_AIM_DETAILS, WAR_AIM_QUICK_GUIDE,
  CALL_TO_WAR, WAR_BUDGET, WARTIME_SOP_PREGW, WARTIME_ACTION_LIST,
  VICTORY_TYPES_DETAILED, TREATY_OPTIONS_DETAILED, DEMOBILIZATION_STEPS,
  HOME_CARD_WAR_POWERS, WAR_GOTCHAS, WAR_DESIGNER_RULINGS,
} from '../data/warDeclaration'
import {
  ALLIANCE_GLOSSARY, TWO_SYSTEMS, DIPLOMACY_PIPELINE,
  MPIT_STRUCTURE, ALLIANCE_RESOLUTION as ALLIANCE_RESOLUTION_DETAIL,
  INFLUENCE_ACTIONS, ALLIANCES_IN_WAR, GW_OUTREACH, ALLIANCE_GOTCHAS,
  ALLIANCE_DESIGNER_RULINGS,
} from '../data/allianceInfluence'
import {
  ITALY_PHASES, ITALIAN_MINOR_POWER_TABLE, UNIFICATION_DIE_ROLL,
  KINGDOM_OF_ITALY_TABLE, ITALIAN_WARS_OF_UNIFICATION,
  ITALIAN_REDEPLOYMENT, ITALY_FLASHPOINT, ITALY_GOTCHAS,
  ITALY_DESIGNER_RULINGS,
} from '../data/italy'
import {
  LAND_BATTLE_WORKFLOW, NAVAL_BATTLE_WORKFLOW, TRENCH_BATTLE_NOTES,
} from '../data/combatWorkflow'

function CombatStepView({ workflow, title, trenchNotes }) {
  return (
    <div>
      {workflow.map(step => (
        <div key={step.step} className="card" style={{ borderLeftColor: step.crt ? '#c0392b' : '#4caf50', marginBottom: '0.5rem' }}>
          <div className="card-title">Step {step.step}: {step.title}</div>
          <div className="card-detail">{step.detail}</div>
          {step.substeps && (
            <div style={{ marginTop: '0.4rem' }}>
              {step.substeps.map((sub, i) => (
                <div key={i} style={{ marginTop: '0.35rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ccc' }}>{sub.label}</div>
                  <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{sub.detail}</div>
                  {sub.modifiers && (
                    <table className="reference-table" style={{ marginTop: '0.25rem' }}>
                      <tbody>
                        {sub.modifiers.map((m, j) => (
                          <tr key={j}>
                            <td style={{ textAlign: 'left', fontSize: '0.78rem' }}>{m.name}</td>
                            <td style={{ fontWeight: 600, whiteSpace: 'nowrap', fontSize: '0.78rem' }}>{m.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </div>
          )}
          {step.modifiers && (
            <table className="reference-table" style={{ marginTop: '0.35rem' }}>
              <tbody>
                {step.modifiers.map((m, j) => (
                  <tr key={j}>
                    <td style={{ textAlign: 'left', fontSize: '0.78rem' }}>{m.name}</td>
                    <td style={{ fontWeight: 600, whiteSpace: 'nowrap', fontSize: '0.78rem' }}>{m.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {step.crt && (
            <table className="reference-table" style={{ marginTop: '0.35rem' }}>
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
          )}
          {step.notes && (
            <ul className="rules-list" style={{ marginTop: '0.3rem' }}>
              {step.notes.map((n, i) => <li key={i} style={{ fontSize: '0.78rem' }}>{n}</li>)}
            </ul>
          )}
        </div>
      ))}
      {trenchNotes && (
        <div className="card" style={{ borderLeftColor: '#2e5ea8' }}>
          <div className="card-title">Trench Battle Notes (GW)</div>
          <ul className="rules-list">
            {trenchNotes.map((n, i) => <li key={i} style={{ fontSize: '0.78rem' }}>{n}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

export function LandBattleWorkflow({ powerId }) {
  return (
    <div>
      <PowerNotes powerId={powerId} context="combat" />
      <CombatStepView workflow={LAND_BATTLE_WORKFLOW} title="Land Battle" trenchNotes={TRENCH_BATTLE_NOTES} />
    </div>
  )
}

export function NavalBattleWorkflow({ powerId }) {
  return (
    <div>
      <PowerNotes powerId={powerId} context="combat" />
      <CombatStepView workflow={NAVAL_BATTLE_WORKFLOW} title="Naval Battle" />
    </div>
  )
}

function PowerNotes({ powerId, context }) {
  const notes = POWER_CONTEXT[powerId]?.[context]
  if (!notes || notes.length === 0) return null
  return (
    <div className="card highlight" style={{ borderLeftColor: '#f9a825', marginBottom: '0.75rem' }}>
      <div className="card-title" style={{ fontSize: '0.8rem' }}>Your Power</div>
      <ul className="rules-list">
        {notes.map((n, i) => <li key={i} style={{ fontSize: '0.8rem' }}>{n}</li>)}
      </ul>
    </div>
  )
}

export function ActionsView({ isWartime, powerId }) {
  const actions = isWartime ? WARTIME_ACTIONS_DETAILED : PEACETIME_ACTIONS
  return (
    <div>
      <PowerNotes powerId={powerId} context="actions" />
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
    </div>
  )
}

export function CombatView({ powerId }) {
  return (
    <div>
      <PowerNotes powerId={powerId} context="combat" />
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

// --- Shared: Designer Rulings View ---

function DesignerRulingsView({ rulings }) {
  const topics = [...new Set(rulings.map(r => r.topic))]
  return (
    <div>
      <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.75rem' }}>
        Official clarifications from designer Michael Lorino (ColonelMPanther) on BGG.
      </div>
      {topics.map(topic => (
        <div key={topic} className="card" style={{ borderLeftColor: '#9b59b6', marginBottom: '0.5rem' }}>
          <div className="card-title">{topic}</div>
          {rulings.filter(r => r.topic === topic).map((r, i) => (
            <div key={i} style={{ marginBottom: '0.4rem', paddingBottom: '0.3rem', borderBottom: '1px solid #333' }}>
              <div style={{ fontSize: '0.85rem', color: '#ccc' }}>{r.ruling}</div>
              <a href={r.source} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.7rem', color: '#666' }}>BGG thread</a>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// --- War Declaration Guide ---

export function WarDeclarationView({ onSelect }) {
  return (
    <div className="gt-children-list">
      <button className="gt-child-item" style={{ borderLeftColor: '#c0392b' }} onClick={() => onSelect({ title: 'Declaration Flow', render: () => <WarFlowDetail /> })}>
        <span className="gt-child-label">Declaration Flow</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" style={{ borderLeftColor: '#d4a017' }} onClick={() => onSelect({ title: 'War Aims', render: () => <WarAimsDetail /> })}>
        <span className="gt-child-label">War Aims (Liberation / Unification / Conquest)</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" style={{ borderLeftColor: '#c0392b' }} onClick={() => onSelect({ title: 'War Budget', render: () => <WarBudgetDetail /> })}>
        <span className="gt-child-label">War Budget</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" onClick={() => onSelect({ title: 'Wartime Actions', render: () => <WartimeActionsDetail /> })}>
        <span className="gt-child-label">Wartime Actions List</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" style={{ borderLeftColor: '#4a5adb' }} onClick={() => onSelect({ title: 'Calls to War', render: () => <CallsToWarDetail /> })}>
        <span className="gt-child-label">Calls to War & Refusing</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" style={{ borderLeftColor: '#d4a017' }} onClick={() => onSelect({ title: 'Victory & Treaty', render: () => <VictoryTreatyDetail /> })}>
        <span className="gt-child-label">Victory & Treaty Options</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" onClick={() => onSelect({ title: 'Demobilization', render: () => <DemobilizationDetail /> })}>
        <span className="gt-child-label">Demobilization</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" style={{ borderLeftColor: '#888' }} onClick={() => onSelect({ title: 'Home Card War Powers', render: () => <HomeCardWarDetail /> })}>
        <span className="gt-child-label">Home Card War Powers</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" style={{ borderLeftColor: '#c0392b' }} onClick={() => onSelect({ title: 'War Gotchas', render: () => <WarGotchasDetail /> })}>
        <span className="gt-child-label">Common Mistakes</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" onClick={() => onSelect({ title: 'War Glossary', render: () => <WarGlossaryDetail /> })}>
        <span className="gt-child-label">Glossary</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
    </div>
  )
}

function WarFlowDetail() {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#c0392b' }}>
        <div className="card-title">War Declaration Steps</div>
        <ol className="rules-list" style={{ paddingLeft: '1.2rem' }}>
          {WAR_DECLARATION_FLOW.map((s, i) => (
            <li key={i} style={{ listStyle: 'decimal', marginBottom: '0.5rem' }}>
              <strong>{s.title}</strong>
              <div style={{ fontSize: '0.8rem', color: '#bbb' }}>{s.detail}</div>
            </li>
          ))}
        </ol>
      </div>
      <div className="card" style={{ borderLeftColor: '#888', marginTop: '0.5rem' }}>
        <div className="card-title">Wartime Sequence (Pre-GW)</div>
        <ol className="rules-list" style={{ paddingLeft: '1.2rem' }}>
          {WARTIME_SOP_PREGW.map((s, i) => (
            <li key={i} style={{ listStyle: 'decimal', marginBottom: '0.35rem' }}>
              <strong>{s.title}</strong>
              <div style={{ fontSize: '0.8rem', color: '#bbb' }}>{s.detail}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function WarAimsDetail() {
  return (
    <div>
      {WAR_AIM_DETAILS.map((aim, i) => (
        <div key={i} className="card" style={{ borderLeftColor: aim.type === 'Conquest' ? '#c0392b' : '#4caf50', marginBottom: '0.5rem' }}>
          <div className="card-title">{aim.type} [{aim.ref}]</div>
          <div style={{ fontSize: '0.85rem', color: '#ccc', marginBottom: '0.3rem' }}><strong>Cost:</strong> {aim.cost}</div>
          <div style={{ fontSize: '0.85rem', color: '#ccc', marginBottom: '0.3rem' }}><strong>Targets:</strong> {aim.targets}</div>
          <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.2rem' }}><strong>When:</strong> {aim.whenToUse}</div>
          <ul className="rules-list" style={{ marginTop: '0.3rem' }}>
            {aim.specialCases.map((s, j) => <li key={j} style={{ fontSize: '0.8rem' }}>{s}</li>)}
          </ul>
        </div>
      ))}
      <div className="card" style={{ borderLeftColor: '#4a5adb', marginTop: '0.5rem' }}>
        <div className="card-title">Quick Decision Guide</div>
        <table className="reference-table">
          <thead><tr><th style={{ textAlign: 'left' }}>Situation</th><th>Aim</th></tr></thead>
          <tbody>
            {WAR_AIM_QUICK_GUIDE.map((g, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'left', fontSize: '0.8rem' }}>{g.situation}</td>
                <td style={{ fontWeight: 600 }}>{g.aim}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function WarBudgetDetail() {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#c0392b' }}>
        <div className="card-title">How It Works</div>
        <ol className="rules-list" style={{ paddingLeft: '1.2rem' }}>
          {WAR_BUDGET.howItWorks.map((s, i) => <li key={i} style={{ listStyle: 'decimal' }}>{s}</li>)}
        </ol>
      </div>
      <div className="card" style={{ borderLeftColor: '#4caf50', marginTop: '0.5rem' }}>
        <div className="card-title">What Counts</div>
        <ul className="rules-list">
          {WAR_BUDGET.whatCounts.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
      <div className="card" style={{ borderLeftColor: '#c0392b', marginTop: '0.5rem' }}>
        <div className="card-title">What Does NOT Count</div>
        <ul className="rules-list">
          {WAR_BUDGET.whatDoesNotCount.map((s, i) => <li key={i} style={{ fontWeight: 600 }}>{s}</li>)}
        </ul>
      </div>
      <div className="card" style={{ borderLeftColor: '#f9a825', marginTop: '0.5rem' }}>
        <div className="card-title">Common Mistakes</div>
        <ul className="rules-list">
          {WAR_BUDGET.commonMistakes.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
    </div>
  )
}

function WartimeActionsDetail() {
  return (
    <table className="reference-table">
      <thead><tr><th style={{ textAlign: 'left' }}>Action</th><th>Cost</th></tr></thead>
      <tbody>
        {WARTIME_ACTION_LIST.map((a, i) => (
          <tr key={i}>
            <td style={{ textAlign: 'left' }}>
              <strong>{a.name}</strong>
              <div style={{ fontSize: '0.7rem', color: '#999', marginTop: '0.1rem' }}>{a.detail}</div>
            </td>
            <td style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>{a.cost}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function CallsToWarDetail() {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#4a5adb' }}>
        <div className="card-title">Who Gets Called</div>
        <ul className="rules-list">
          {CALL_TO_WAR.whoGetsCalled.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
      <div className="card" style={{ borderLeftColor: '#888', marginTop: '0.5rem' }}>
        <div className="card-title">Joining Rules</div>
        <ul className="rules-list">
          {CALL_TO_WAR.joiningRules.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
      <div className="card" style={{ borderLeftColor: '#c0392b', marginTop: '0.5rem' }}>
        <div className="card-title">Refusing Consequences</div>
        <table className="reference-table">
          <thead><tr><th style={{ textAlign: 'left' }}>Position</th><th style={{ textAlign: 'left' }}>Consequence</th></tr></thead>
          <tbody>
            {CALL_TO_WAR.refusingConsequences.map((r, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'left', fontWeight: 600 }}>{r.position}</td>
                <td style={{ textAlign: 'left' }}>{r.consequence}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ fontSize: '0.8rem', color: '#f9a825', marginTop: '0.5rem' }}>
          <strong>Italy special:</strong> {CALL_TO_WAR.italySpecial}
        </div>
      </div>
      <div className="card" style={{ borderLeftColor: '#888', marginTop: '0.5rem' }}>
        <div className="card-detail"><strong>Bismarck:</strong> {CALL_TO_WAR.bismarckOverride}</div>
      </div>
    </div>
  )
}

function VictoryTreatyDetail() {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#d4a017' }}>
        <div className="card-title">Victory Types</div>
        <table className="reference-table">
          <thead><tr><th style={{ textAlign: 'left' }}>Type</th><th>Treaties</th><th style={{ textAlign: 'left' }}>Condition</th></tr></thead>
          <tbody>
            {VICTORY_TYPES_DETAILED.map((v, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'left', fontWeight: 600 }}>{v.type}</td>
                <td style={{ fontWeight: 700 }}>{v.treatyOptions}</td>
                <td style={{ textAlign: 'left', fontSize: '0.8rem' }}>{v.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card" style={{ borderLeftColor: '#4a5adb', marginTop: '0.5rem' }}>
        <div className="card-title">Treaty Options</div>
        {TREATY_OPTIONS_DETAILED.map((t, i) => (
          <div key={i} style={{ marginBottom: '0.4rem' }}>
            <strong>{t.name}</strong> <span style={{ fontSize: '0.75rem', color: '#888' }}>[{t.ref}]</span>
            <div className="card-detail">{t.effect}</div>
            {t.restriction && <div style={{ fontSize: '0.75rem', color: '#c0392b' }}>{t.restriction}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

function DemobilizationDetail() {
  return (
    <div className="card" style={{ borderLeftColor: '#888' }}>
      <div className="card-title">Demobilization [17.0]</div>
      <ol className="rules-list" style={{ paddingLeft: '1.2rem' }}>
        {DEMOBILIZATION_STEPS.map((s, i) => (
          <li key={i} style={{ listStyle: 'decimal', marginBottom: '0.5rem' }}>
            <strong>{s.title}</strong>
            <div style={{ fontSize: '0.8rem', color: '#bbb' }}>{s.detail}</div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function HomeCardWarDetail() {
  return (
    <div>
      {HOME_CARD_WAR_POWERS.map((p, i) => (
        <div key={i} className="card" style={{ borderLeftColor: '#888', marginBottom: '0.5rem' }}>
          <div className="card-title">{p.power} — {p.card}</div>
          <ul className="rules-list">
            {p.abilities.map((a, j) => <li key={j}>{a}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}

function WarGotchasDetail() {
  return (
    <div>
      {WAR_GOTCHAS.map((cat, i) => (
        <div key={i} className="card" style={{ borderLeftColor: '#c0392b', marginBottom: '0.5rem' }}>
          <div className="card-title">{cat.category}</div>
          {cat.items.map((item, j) => (
            <div key={j} style={{ marginBottom: '0.4rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#f9a825' }}><strong>Mistake:</strong> {item.mistake}</div>
              <div style={{ fontSize: '0.8rem', color: '#4caf50' }}><strong>Correct:</strong> {item.correction}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function WarGlossaryDetail() {
  return (
    <table className="reference-table">
      <thead><tr><th style={{ textAlign: 'left' }}>Term</th><th style={{ textAlign: 'left' }}>Definition</th></tr></thead>
      <tbody>
        {WAR_GLOSSARY.map((g, i) => (
          <tr key={i}>
            <td style={{ textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>{g.term}</td>
            <td style={{ textAlign: 'left', fontSize: '0.8rem' }}>{g.definition}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// --- Alliance & Influence Guide ---

export function AllianceGuideView({ onSelect }) {
  return (
    <div className="gt-children-list">
      <button className="gt-child-item" onClick={() => onSelect({ title: 'Two Systems', render: () => <TwoSystemsDetail /> })}>
        <span className="gt-child-label">Minor Power vs MPIT: Two Systems</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" style={{ borderLeftColor: '#4a5adb' }} onClick={() => onSelect({ title: 'Diplomacy Pipeline', render: () => <DiplomacyPipelineDetail /> })}>
        <span className="gt-child-label">Diplomacy → Alliance Pipeline</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" style={{ borderLeftColor: '#d4a017' }} onClick={() => onSelect({ title: 'MPIT Structure', render: () => <MPITDetail /> })}>
        <span className="gt-child-label">MPIT: Positions & Factions</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" onClick={() => onSelect({ title: 'Alliance Resolution', render: () => <AllianceResolutionDetail /> })}>
        <span className="gt-child-label">Alliance Resolution Step</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" onClick={() => onSelect({ title: 'Influence Actions', render: () => <InfluenceActionsDetail /> })}>
        <span className="gt-child-label">Influence Actions & Costs</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" style={{ borderLeftColor: '#c0392b' }} onClick={() => onSelect({ title: 'Alliances in War', render: () => <AlliancesInWarDetail /> })}>
        <span className="gt-child-label">How Alliances Affect War</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" style={{ borderLeftColor: '#c0392b' }} onClick={() => onSelect({ title: 'GW Outreach', render: () => <GWOutreachDetail /> })}>
        <span className="gt-child-label">GW Outreach Step</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" style={{ borderLeftColor: '#f9a825' }} onClick={() => onSelect({ title: 'Alliance Gotchas', render: () => <AllianceGotchasDetail /> })}>
        <span className="gt-child-label">Common Mistakes</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" onClick={() => onSelect({ title: 'Alliance Glossary', render: () => <AllianceGlossaryDetail /> })}>
        <span className="gt-child-label">Glossary</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
    </div>
  )
}

function TwoSystemsDetail() {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#4a5adb' }}>
        <div className="card-title">{TWO_SYSTEMS.minorPower.name}</div>
        <div style={{ fontSize: '0.85rem', color: '#aaa' }}>{TWO_SYSTEMS.minorPower.level}</div>
        <div style={{ fontSize: '0.85rem', color: '#ccc', marginTop: '0.3rem' }}><strong>Pipeline:</strong> {TWO_SYSTEMS.minorPower.pipeline}</div>
        <div style={{ fontSize: '0.85rem', color: '#ccc' }}><strong>Gives you:</strong> {TWO_SYSTEMS.minorPower.what}</div>
        <div style={{ fontSize: '0.85rem', color: '#c0392b' }}><strong>Removal:</strong> {TWO_SYSTEMS.minorPower.removal}</div>
      </div>
      <div className="card" style={{ borderLeftColor: '#d4a017', marginTop: '0.5rem' }}>
        <div className="card-title">{TWO_SYSTEMS.majorPower.name}</div>
        <div style={{ fontSize: '0.85rem', color: '#aaa' }}>{TWO_SYSTEMS.majorPower.level}</div>
        <div style={{ fontSize: '0.85rem', color: '#ccc', marginTop: '0.3rem' }}><strong>Pipeline:</strong> {TWO_SYSTEMS.majorPower.pipeline}</div>
        <div style={{ fontSize: '0.85rem', color: '#ccc' }}><strong>Determines:</strong> {TWO_SYSTEMS.majorPower.what}</div>
        <div style={{ fontSize: '0.85rem', color: '#f9a825' }}><strong>Key:</strong> {TWO_SYSTEMS.majorPower.interaction}</div>
      </div>
      <div className="card" style={{ borderLeftColor: '#888', marginTop: '0.5rem' }}>
        <div className="card-title">How They Interact</div>
        <ul className="rules-list">
          {TWO_SYSTEMS.howTheyInteract.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
    </div>
  )
}

function DiplomacyPipelineDetail() {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#4caf50' }}>
        <div className="card-title">Pipeline Steps</div>
        <ol className="rules-list" style={{ paddingLeft: '1.2rem' }}>
          {DIPLOMACY_PIPELINE.steps.map((s, i) => (
            <li key={i} style={{ listStyle: 'decimal', marginBottom: '0.4rem' }}>
              <strong>{s.action}</strong> ({s.cost}) [{s.ref}]
              <div style={{ fontSize: '0.8rem', color: '#bbb' }}>{s.detail}</div>
            </li>
          ))}
        </ol>
      </div>
      <div className="card" style={{ borderLeftColor: '#c0392b', marginTop: '0.5rem' }}>
        <div className="card-title">Removal</div>
        {DIPLOMACY_PIPELINE.removal.map((r, i) => (
          <div key={i} style={{ marginBottom: '0.3rem' }}>
            <strong>{r.action}</strong> ({r.cost}) [{r.ref}]
            <div style={{ fontSize: '0.8rem', color: '#bbb' }}>{r.detail}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ borderLeftColor: '#888', marginTop: '0.5rem' }}>
        <div className="card-title">Total Costs</div>
        <div style={{ fontSize: '0.85rem', color: '#ccc' }}><strong>New alliance:</strong> {DIPLOMACY_PIPELINE.totalCosts.newAlliance}</div>
        <div style={{ fontSize: '0.85rem', color: '#ccc' }}><strong>Hostile takeover:</strong> {DIPLOMACY_PIPELINE.totalCosts.hostileTakeover}</div>
      </div>
      <div className="card" style={{ borderLeftColor: '#f9a825', marginTop: '0.5rem' }}>
        <div className="card-title">Special Card Overrides</div>
        <ul className="rules-list">
          {DIPLOMACY_PIPELINE.specialCards.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
    </div>
  )
}

function MPITDetail() {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#d4a017' }}>
        <div className="card-title">MPIT Positions</div>
        <div style={{ fontSize: '0.9rem', fontFamily: 'monospace', color: '#ccc', textAlign: 'center', padding: '0.5rem 0' }}>
          {MPIT_STRUCTURE.positions.join(' ← → ')}
        </div>
      </div>
      <div className="card" style={{ borderLeftColor: '#888', marginTop: '0.5rem' }}>
        <div className="card-title">War Obligations by Position</div>
        <table className="reference-table">
          <thead><tr><th style={{ textAlign: 'left' }}>Position</th><th style={{ textAlign: 'left' }}>Refusing War</th></tr></thead>
          <tbody>
            {MPIT_STRUCTURE.positionEffects.map((p, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'left', fontWeight: 600 }}>{p.position}</td>
                <td style={{ textAlign: 'left', fontSize: '0.8rem' }}>{p.refuseWar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card" style={{ borderLeftColor: '#4caf50', marginTop: '0.5rem' }}>
        <div className="card-detail"><strong>New alliances:</strong> {MPIT_STRUCTURE.newAlliancePlacement}</div>
      </div>
    </div>
  )
}

function AllianceResolutionDetail() {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#4a5adb' }}>
        <div className="card-title">Alliance Resolution [{ALLIANCE_RESOLUTION_DETAIL.ref}]</div>
        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.3rem' }}>When: {ALLIANCE_RESOLUTION_DETAIL.when}</div>
        <ol className="rules-list" style={{ paddingLeft: '1.2rem' }}>
          {ALLIANCE_RESOLUTION_DETAIL.procedure.map((s, i) => <li key={i} style={{ listStyle: 'decimal' }}>{s}</li>)}
        </ol>
      </div>
      <div className="card" style={{ borderLeftColor: '#f9a825', marginTop: '0.5rem' }}>
        <div className="card-title">Why Order Matters</div>
        <div className="card-detail">{ALLIANCE_RESOLUTION_DETAIL.whyOrderMatters}</div>
      </div>
    </div>
  )
}

function InfluenceActionsDetail() {
  return (
    <table className="reference-table">
      <thead><tr><th style={{ textAlign: 'left' }}>Action</th><th>Cost</th><th style={{ textAlign: 'left' }}>Effect</th></tr></thead>
      <tbody>
        {INFLUENCE_ACTIONS.map((a, i) => (
          <tr key={i}>
            <td style={{ textAlign: 'left', fontWeight: 600 }}>{a.action}</td>
            <td style={{ whiteSpace: 'nowrap' }}>{a.cost}</td>
            <td style={{ textAlign: 'left', fontSize: '0.8rem' }}>{a.effect}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function AlliancesInWarDetail() {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#c0392b' }}>
        <div className="card-title">Refusing Costs</div>
        <table className="reference-table">
          <thead><tr><th style={{ textAlign: 'left' }}>Position</th><th style={{ textAlign: 'left' }}>Cost</th></tr></thead>
          <tbody>
            {ALLIANCES_IN_WAR.callsToWar.map((r, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'left', fontWeight: 600 }}>{r.position}</td>
                <td style={{ textAlign: 'left', fontSize: '0.8rem' }}>{r.refuseCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ fontSize: '0.8rem', color: '#f9a825', marginTop: '0.3rem' }}><strong>Italy:</strong> {ALLIANCES_IN_WAR.italySpecial}</div>
      </div>
      <div className="card" style={{ borderLeftColor: '#888', marginTop: '0.5rem' }}>
        <div className="card-title">Budget Independence</div>
        <div className="card-detail" style={{ fontWeight: 600 }}>{ALLIANCES_IN_WAR.budgetRule}</div>
      </div>
      <div className="card" style={{ borderLeftColor: '#4a5adb', marginTop: '0.5rem' }}>
        <div className="card-title">Joint Operations</div>
        <ul className="rules-list">
          {ALLIANCES_IN_WAR.jointOps.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
      <div className="card" style={{ borderLeftColor: '#888', marginTop: '0.5rem' }}>
        <div className="card-detail"><strong>Bismarck:</strong> {ALLIANCES_IN_WAR.bismarckOverride}</div>
      </div>
    </div>
  )
}

function GWOutreachDetail() {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#c0392b' }}>
        <div className="card-title">GW Outreach Step [{GW_OUTREACH.ref}]</div>
        <div className="card-detail" style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>{GW_OUTREACH.summary}</div>
        <ol className="rules-list" style={{ paddingLeft: '1.2rem' }}>
          {GW_OUTREACH.steps.map((s, i) => <li key={i} style={{ listStyle: 'decimal' }}>{s}</li>)}
        </ol>
      </div>
    </div>
  )
}

function AllianceGotchasDetail() {
  return (
    <div>
      {ALLIANCE_GOTCHAS.map((g, i) => (
        <div key={i} style={{ marginBottom: '0.5rem', padding: '0.4rem 0', borderBottom: '1px solid #333' }}>
          <div style={{ fontSize: '0.85rem', color: '#f9a825' }}><strong>Mistake:</strong> {g.mistake}</div>
          <div style={{ fontSize: '0.8rem', color: '#4caf50' }}><strong>Correct:</strong> {g.correction}</div>
        </div>
      ))}
    </div>
  )
}

function AllianceGlossaryDetail() {
  return (
    <table className="reference-table">
      <thead><tr><th style={{ textAlign: 'left' }}>Term</th><th style={{ textAlign: 'left' }}>Definition</th></tr></thead>
      <tbody>
        {ALLIANCE_GLOSSARY.map((g, i) => (
          <tr key={i}>
            <td style={{ textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>{g.term}</td>
            <td style={{ textAlign: 'left', fontSize: '0.8rem' }}>{g.definition}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// --- Italy Guide ---

export function ItalyGuideView({ onSelect }) {
  return (
    <div className="gt-children-list">
      <button className="gt-child-item" style={{ borderLeftColor: '#27ae60' }} onClick={() => onSelect({ title: 'Italy Overview', render: () => <ItalyOverviewDetail /> })}>
        <span className="gt-child-label">Three Phases Overview</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" style={{ borderLeftColor: '#d4a017' }} onClick={() => onSelect({ title: 'Mandatory Event Table', render: () => <ItalyMandatoryDetail /> })}>
        <span className="gt-child-label">Mandatory Event Table [22.0]</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" onClick={() => onSelect({ title: 'Unification Roll', render: () => <UnificationRollDetail /> })}>
        <span className="gt-child-label">Unification Die Roll</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" onClick={() => onSelect({ title: 'Kingdom Table', render: () => <KingdomTableDetail /> })}>
        <span className="gt-child-label">Kingdom of Italy Table</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" onClick={() => onSelect({ title: 'Wars of Unification', render: () => <ItalyWarsDetail /> })}>
        <span className="gt-child-label">Wars of Unification</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" onClick={() => onSelect({ title: 'Redeployment & Flashpoint', render: () => <ItalyMiscDetail /> })}>
        <span className="gt-child-label">Redeployment & Flashpoint</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
      <button className="gt-child-item" style={{ borderLeftColor: '#f9a825' }} onClick={() => onSelect({ title: 'Italy Gotchas', render: () => <ItalyGotchasDetail /> })}>
        <span className="gt-child-label">Common Mistakes</span>
        <span className="gt-child-arrow">&rsaquo;</span>
      </button>
    </div>
  )
}

function ItalyOverviewDetail() {
  return (
    <div>
      {ITALY_PHASES.map((p, i) => (
        <div key={i} className="card" style={{ borderLeftColor: i === 0 ? '#888' : i === 1 ? '#d4a017' : '#27ae60', marginBottom: '0.5rem' }}>
          <div className="card-title">Phase {p.phase}: {p.name}</div>
          <div className="card-detail">{p.description}</div>
          <div style={{ fontSize: '0.8rem', color: '#4caf50', marginTop: '0.2rem' }}><strong>Key mechanic:</strong> {p.keyMechanic}</div>
        </div>
      ))}
    </div>
  )
}

function ItalyMandatoryDetail() {
  return (
    <div>
      <table className="reference-table">
        <thead><tr><th>Roll</th><th style={{ textAlign: 'left' }}>Result</th></tr></thead>
        <tbody>
          {ITALIAN_MINOR_POWER_TABLE.results.map((r, i) => (
            <tr key={i}>
              <td style={{ fontWeight: 700 }}>{r.roll}</td>
              <td style={{ textAlign: 'left' }}><strong>{r.name}</strong> — {r.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="card" style={{ borderLeftColor: '#2e5ea8', marginTop: '0.5rem' }}>
        <div className="card-title">DRMs</div>
        <ul className="rules-list">
          {ITALIAN_MINOR_POWER_TABLE.drms.map((d, i) => <li key={i}><strong>{d.modifier}</strong> {d.condition}</li>)}
        </ul>
        <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.3rem' }}>{ITALIAN_MINOR_POWER_TABLE.drmNote}</div>
      </div>
      {ITALIAN_MINOR_POWER_TABLE.results.filter(r => r.steps.length > 1).map((r, i) => (
        <div key={i} className="card" style={{ borderLeftColor: '#888', marginTop: '0.5rem' }}>
          <div className="card-title">{r.name} (Roll {r.roll})</div>
          <ol className="rules-list" style={{ paddingLeft: '1.2rem' }}>
            {r.steps.map((s, j) => <li key={j} style={{ listStyle: 'decimal' }}>{s}</li>)}
          </ol>
        </div>
      ))}
    </div>
  )
}

function UnificationRollDetail() {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#d4a017' }}>
        <div className="card-title">Unification Die Roll</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f9a825', marginBottom: '0.3rem' }}>Target: {UNIFICATION_DIE_ROLL.target}</div>
        <div className="card-detail" style={{ color: '#c0392b', fontWeight: 600 }}>{UNIFICATION_DIE_ROLL.note}</div>
      </div>
      <div className="card" style={{ borderLeftColor: '#2e5ea8', marginTop: '0.5rem' }}>
        <div className="card-title">Modifiers</div>
        <ul className="rules-list">
          {UNIFICATION_DIE_ROLL.modifiers.map((m, i) => <li key={i}><strong>{m.modifier}</strong> {m.condition}</li>)}
        </ul>
      </div>
      <div className="card" style={{ borderLeftColor: '#4caf50', marginTop: '0.5rem' }}>
        <div className="card-title">On Success</div>
        <div className="card-detail">{UNIFICATION_DIE_ROLL.onSuccess}</div>
      </div>
      <div className="card" style={{ borderLeftColor: '#c0392b', marginTop: '0.5rem' }}>
        <div className="card-title">On Failure</div>
        <div className="card-detail">{UNIFICATION_DIE_ROLL.onFailure}</div>
      </div>
    </div>
  )
}

function KingdomTableDetail() {
  return (
    <div>
      <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>{KINGDOM_OF_ITALY_TABLE.note}</div>
      <table className="reference-table">
        <thead><tr><th>Roll</th><th style={{ textAlign: 'left' }}>Result</th></tr></thead>
        <tbody>
          {KINGDOM_OF_ITALY_TABLE.results.map((r, i) => (
            <tr key={i}>
              <td style={{ fontWeight: 700 }}>{r.roll}</td>
              <td style={{ textAlign: 'left' }}><strong>{r.name}</strong> — {r.effect}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ItalyWarsDetail() {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#d4a017' }}>
        <div className="card-title">Italian Wars of Unification [{ITALIAN_WARS_OF_UNIFICATION.ref}]</div>
        <div className="card-detail" style={{ color: '#f9a825', marginBottom: '0.3rem' }}><strong>Prerequisite:</strong> {ITALIAN_WARS_OF_UNIFICATION.prerequisite}</div>
        <ol className="rules-list" style={{ paddingLeft: '1.2rem' }}>
          {ITALIAN_WARS_OF_UNIFICATION.procedure.map((s, i) => <li key={i} style={{ listStyle: 'decimal' }}>{s}</li>)}
        </ol>
        <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.3rem' }}><strong>Who:</strong> {ITALIAN_WARS_OF_UNIFICATION.whoCanDo}</div>
      </div>
      <div className="card" style={{ borderLeftColor: '#888', marginTop: '0.5rem' }}>
        <div className="card-title">vs Mandatory Event</div>
        <div className="card-detail">{ITALIAN_WARS_OF_UNIFICATION.vsMandatoryEvent}</div>
      </div>
    </div>
  )
}

function ItalyMiscDetail() {
  return (
    <div>
      <div className="card" style={{ borderLeftColor: '#888' }}>
        <div className="card-title">Italian Redeployment</div>
        <ul className="rules-list">
          {ITALIAN_REDEPLOYMENT.rules.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>
      <div className="card" style={{ borderLeftColor: '#d4a017', marginTop: '0.5rem' }}>
        <div className="card-title">Italy Flashpoint</div>
        <div style={{ fontSize: '0.85rem', color: '#ccc' }}><strong>Condition:</strong> {ITALY_FLASHPOINT.condition} → <strong>{ITALY_FLASHPOINT.reward}</strong></div>
        <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.2rem' }}>{ITALY_FLASHPOINT.dominance}</div>
        <ul className="rules-list" style={{ marginTop: '0.3rem' }}>
          {ITALY_FLASHPOINT.mpitInteractions.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
    </div>
  )
}

function ItalyGotchasDetail() {
  return (
    <div>
      {ITALY_GOTCHAS.map((g, i) => (
        <div key={i} style={{ marginBottom: '0.5rem', padding: '0.4rem 0', borderBottom: '1px solid #333' }}>
          <div style={{ fontSize: '0.85rem', color: '#f9a825' }}><strong>Mistake:</strong> {g.mistake}</div>
          <div style={{ fontSize: '0.8rem', color: '#4caf50' }}><strong>Correct:</strong> {g.correction}</div>
        </div>
      ))}
    </div>
  )
}

import { useState, useEffect, useCallback, useMemo } from 'react';
import { SHIPS, TECHNOLOGIES } from './data/gameData.js';
import EconPhase, { calcTurnRemaining } from './components/EconPhase.jsx';
import TechTree from './components/TechTree.jsx';
import ShipReference from './components/ShipReference.jsx';
import FleetManager from './components/FleetManager.jsx';
import GameManager from './components/GameManager.jsx';

const STORAGE_KEY = 'se4x-current';
const SAVES_KEY = 'se4x-saves';

const TABS = [
  { id: 'econ', label: 'Econ' },
  { id: 'tech', label: 'Tech' },
  { id: 'ships', label: 'Ships' },
  { id: 'ref', label: 'Ref' },
];

function makeEmptyGame() {
  return {
    name: '',
    phase: 'setup', // 'setup' or 'play'
    turn: 1,
    startingCP: 0,
    econData: {},
    techPurchases: {},
    fleet: [],
    upgrades: [], // [{ shipId, turn }]
  };
}

function loadCurrent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveCurrent(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadSaves() {
  try {
    const raw = localStorage.getItem(SAVES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveSaves(saves) {
  localStorage.setItem(SAVES_KEY, JSON.stringify(saves));
}

function techSpentInTurn(techPurchases, turnNum) {
  let total = 0;
  for (const [techId, boughtTurn] of Object.entries(techPurchases)) {
    if (boughtTurn === turnNum) {
      const tech = TECHNOLOGIES.flatMap(c => c.techs).find(t => t.id === techId);
      if (tech) total += tech.cost;
    }
  }
  return total;
}

function shipSpentInTurn(fleet, turnNum) {
  let total = 0;
  for (const group of fleet) {
    if (group.boughtTurn === turnNum) {
      const base = SHIPS.find(s => s.id === group.type);
      if (base) total += base.cost * group.count;
    }
  }
  return total;
}

function StartingCPRow({ value, onChange }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  function startEdit() { setDraft(String(value)); setEditing(true); }
  function commit() { const p = parseInt(draft, 10); if (!isNaN(p)) onChange(p); setEditing(false); }
  return (
    <div className="econ-row">
      <span className="label">Starting CP</span>
      <div className="controls"><button className="stepper-btn" onClick={() => onChange(value - 1)}>-</button></div>
      {editing ? (
        <input className="econ-input" type="number" value={draft} onChange={e => setDraft(e.target.value)}
          onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()} autoFocus />
      ) : (
        <span className="value positive editable" onClick={startEdit}>{value}</span>
      )}
      <div className="controls"><button className="stepper-btn" onClick={() => onChange(value + 1)}>+</button></div>
    </div>
  );
}

export default function App() {
  const [game, setGame] = useState(() => loadCurrent() || makeEmptyGame());
  const [tab, setTab] = useState('econ');
  const [umpireMode, setUmpireMode] = useState(false);
  const [pendingReset, setPendingReset] = useState(null);
  const [showGameMgr, setShowGameMgr] = useState(false);
  const [saves, setSaves] = useState(() => loadSaves());

  const { phase, turn: currentTurn, startingCP = 0, econData, techPurchases, fleet, upgrades = [] } = game;
  const isSetup = phase === 'setup';
  const [viewTurn, setViewTurn] = useState(currentTurn);

  // Auto-save current game
  useEffect(() => { saveCurrent(game); }, [game]);
  useEffect(() => { setPendingReset(null); }, [viewTurn]);
  useEffect(() => { setViewTurn(currentTurn); }, [currentTurn]);

  function update(fields) {
    setGame(prev => ({ ...prev, ...fields }));
  }

  const setTurn = useCallback(fn => {
    setGame(prev => {
      const newTurn = typeof fn === 'function' ? fn(prev.turn) : fn;
      if (newTurn <= prev.turn) return { ...prev, turn: newTurn };
      // Auto-save before advancing (keep max 2)
      const autoName = `Turn ${prev.turn} auto`;
      const currentSaves = loadSaves();
      const entry = { ...prev, name: autoName, savedAt: Date.now() };
      const idx = currentSaves.findIndex(s => s.name === autoName);
      if (idx >= 0) currentSaves[idx] = entry; else currentSaves.push(entry);
      const autos = currentSaves.filter(s => s.name.endsWith(' auto')).sort((a, b) => b.savedAt - a.savedAt);
      const stale = new Set(autos.slice(2).map(s => s.name));
      const trimmed = currentSaves.filter(s => !stale.has(s.name));
      saveSaves(trimmed);
      setSaves(trimmed);
      // Advancing turn: freeze all null-snapshot ships with current tech
      const owned = new Set();
      for (const [techId, t] of Object.entries(prev.techPurchases)) {
        if (t <= prev.turn) owned.add(techId);
      }
      let atk = 0, def = 0, tac = 0, mov = 1;
      if (owned.has('atk1')) atk++; if (owned.has('atk2')) atk++; if (owned.has('atk3')) atk++;
      if (owned.has('def1')) def++; if (owned.has('def2')) def++; if (owned.has('def3')) def++;
      if (owned.has('tac1')) tac++; if (owned.has('tac2')) tac++; if (owned.has('tac3')) tac++;
      if (owned.has('mov6')) mov = 6;
      else if (owned.has('mov5')) mov = 5;
      else if (owned.has('mov4')) mov = 4;
      else if (owned.has('mov3')) mov = 3;
      else if (owned.has('mov2')) mov = 2;
      const snapshot = { atk, def, tac, mov };
      const fleet = prev.fleet.map(g => {
        if (g.techSnapshot !== null || g.destroyed) return g;
        const base = SHIPS.find(s => s.id === g.type);
        if (base?.noncombat) return g;
        return { ...g, techSnapshot: { ...snapshot } };
      });
      return { ...prev, turn: newTurn, fleet };
    });
  }, []);
  const setEconData = useCallback(fn => {
    setGame(prev => ({ ...prev, econData: typeof fn === 'function' ? fn(prev.econData) : fn }));
  }, []);
  const setTechPurchases = useCallback(fn => {
    setGame(prev => ({ ...prev, techPurchases: typeof fn === 'function' ? fn(prev.techPurchases) : fn }));
  }, []);
  const setFleet = useCallback(fn => {
    setGame(prev => ({ ...prev, fleet: typeof fn === 'function' ? fn(prev.fleet) : fn }));
  }, []);
  const setUpgrades = useCallback(fn => {
    setGame(prev => ({ ...prev, upgrades: typeof fn === 'function' ? fn(prev.upgrades || []) : fn }));
  }, []);

  const ownedTechs = useMemo(() => {
    const set = new Set();
    for (const [techId, boughtTurn] of Object.entries(techPurchases)) {
      if (boughtTurn <= currentTurn) set.add(techId);
    }
    return set;
  }, [techPurchases, currentTurn]);

  const currentTechSpent = techSpentInTurn(techPurchases, currentTurn);
  const currentShipSpent = shipSpentInTurn(fleet, currentTurn);

  const currentUpgradeSpent = upgrades.filter(u => u.turn === currentTurn).reduce((sum, u) => {
    const ship = fleet.find(s => s.id === u.shipId);
    if (!ship) return sum;
    const base = SHIPS.find(s => s.id === ship.type);
    return sum + (base?.hull || 0);
  }, 0);

  // Remaining CP before upgrades (for upgrade affordability check)
  const carryOver = calcTurnRemaining(econData, techPurchases, fleet, upgrades, currentTurn - 1, startingCP);
  const turnData = econData[currentTurn] || {};
  const subtotal = carryOver + (turnData.colony ?? 0) + (turnData.mineral ?? 0) + (turnData.pipeline ?? 0);
  const maintenanceCost = fleet.filter(g => {
    const effectiveBoughtTurn = g.boughtTurn === 'setup' ? 1 : g.boughtTurn;
    const boughtBefore = typeof effectiveBoughtTurn === 'number' && effectiveBoughtTurn < currentTurn;
    const aliveAtStart = !g.destroyed || g.destroyed >= currentTurn;
    return boughtBefore && aliveAtStart;
  }).reduce((sum, g) => {
    const base = SHIPS.find(s => s.id === g.type);
    return sum + (base?.maintenance || 0) * g.count;
  }, 0);
  const remainingBeforeUpgrades = subtotal - (turnData.bid ?? 0) - maintenanceCost - currentTechSpent - currentShipSpent;

  // Auto-cancel confirmation after 3 seconds
  useEffect(() => {
    if (!pendingReset) return;
    const timer = setTimeout(() => setPendingReset(null), 3000);
    return () => clearTimeout(timer);
  }, [pendingReset]);

  function startGame() {
    if (pendingReset !== 'start') {
      setPendingReset('start');
      return;
    }
    setPendingReset(null);
    update({ phase: 'play' });
    setTab('econ');
  }

  const handleResetTurn = useCallback(() => {
    if (pendingReset !== 'turn') { setPendingReset('turn'); return; }
    setPendingReset(null);
    setTechPurchases(prev => {
      const next = { ...prev };
      for (const [techId, t] of Object.entries(next)) { if (t === currentTurn) delete next[techId]; }
      return next;
    });
    setFleet(prev => prev.filter(s => s.boughtTurn !== currentTurn));
    setUpgrades(prev => prev.filter(u => u.turn !== currentTurn));
    setEconData(prev => { const next = { ...prev }; delete next[currentTurn]; return next; });
  }, [currentTurn, pendingReset]);

  // Game management
  function saveGameAs(name) {
    const updated = [...saves];
    const idx = updated.findIndex(s => s.name === name);
    const entry = { ...game, name, savedAt: Date.now() };
    if (idx >= 0) updated[idx] = entry; else updated.push(entry);
    saveSaves(updated);
    setSaves(updated);
    update({ name });
  }

  function loadGame(save) {
    setGame(save);
    setShowGameMgr(false);
    setTab(save.phase === 'setup' ? 'ships' : 'econ');
  }

  function deleteGame(name) {
    const updated = saves.filter(s => s.name !== name);
    saveSaves(updated);
    setSaves(updated);
  }

  function newGame() {
    setGame(makeEmptyGame());
    setShowGameMgr(false);
    setTab('ships');
  }

  return (
    <div>
      <h1>Space Empires 4X</h1>
      <div className="subtitle">
        {isSetup ? 'Setup' : `Econ Phase ${currentTurn}`}
        {umpireMode && <span className="umpire-badge">UMPIRE</span>}
        <button className="game-mgr-btn" onClick={() => setShowGameMgr(true)}>Games</button>
      </div>

      {showGameMgr && (
        <GameManager
          currentGame={game}
          saves={saves}
          onSave={saveGameAs}
          onLoad={loadGame}
          onDelete={deleteGame}
          onNew={newGame}
          onClose={() => setShowGameMgr(false)}
        />
      )}

      {isSetup && tab === 'econ' && (
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: '#888', marginBottom: '0.75rem' }}>Set starting CP and ships first, then start.</p>
          <button className={`btn ${pendingReset === 'start' ? 'btn-danger-confirm' : 'btn-primary'}`} onClick={startGame}>
            {pendingReset === 'start' ? 'Tap again to confirm' : 'Start Game'}
          </button>
        </div>
      )}

      {!isSetup && tab === 'econ' && (
        <EconPhase
          viewTurn={viewTurn}
          setViewTurn={setViewTurn}
          currentTurn={currentTurn}
          advanceTurn={setTurn}
          startingCP={startingCP}
          econData={econData}
          setEconData={setEconData}
          techPurchases={techPurchases}
          fleet={fleet}
          upgrades={upgrades}
          onResetTurn={handleResetTurn}
          pendingReset={pendingReset}
          setPendingReset={setPendingReset}
          umpireMode={umpireMode}
        />
      )}

      {tab === 'tech' && (
        <TechTree
          turn={currentTurn}
          techPurchases={techPurchases}
          setTechPurchases={setTechPurchases}
          ownedTechs={ownedTechs}
          currentTurnSpent={currentTechSpent}
          remainingCP={remainingBeforeUpgrades}
          umpireMode={umpireMode}
          isSetup={isSetup}
        />
      )}

      {tab === 'ships' && (
        <>
          {isSetup && (
            <div className="card" style={{ borderLeft: '4px solid #8b7aff' }}>
              <StartingCPRow value={startingCP} onChange={v => update({ startingCP: v })} />
            </div>
          )}
          <FleetManager
            turn={currentTurn}
            fleet={fleet}
            setFleet={setFleet}
            ownedTechs={ownedTechs}
            currentTurnSpent={currentShipSpent}
            umpireMode={umpireMode}
            isSetup={isSetup}
            upgrades={upgrades}
            setUpgrades={setUpgrades}
            upgradeSpent={currentUpgradeSpent}
            upgradeBudget={remainingBeforeUpgrades - currentUpgradeSpent}
            remainingCP={remainingBeforeUpgrades}
          />
          {isSetup && (
            <div style={{ textAlign: 'center', padding: '0.75rem 0' }}>
              <button className={`btn ${pendingReset === 'start' ? 'btn-danger-confirm' : 'btn-primary'}`} onClick={startGame}>
                {pendingReset === 'start' ? 'Tap again to confirm' : 'Start Game'}
              </button>
            </div>
          )}
        </>
      )}

      {tab === 'ref' && (
        <div>
          <ShipReference />
          <h2 style={{ marginTop: '1.25rem' }}>Quick Reference</h2>
          <div className="card">
            <h3>Econ Phase Sequence</h3>
            <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', lineHeight: 1.8 }}>
              <li>Calculate Income (Colony + Mineral + Pipeline)</li>
              <li>Purchase Units and Technology</li>
              <li>Place Units at Ship Yards</li>
              <li>Grow Colonies (+1 CP per colony, max planet value)</li>
            </ol>
          </div>
          <div className="card">
            <h3>Combat Order</h3>
            <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', lineHeight: 1.8 }}>
              <li>Mines activate (after sweepers)</li>
              <li>Ships fire by Class: A, B, C, D, E (Tactics breaks ties)</li>
              <li>Remove destroyed ships</li>
              <li>Retreat option (loser may retreat)</li>
            </ol>
          </div>
          <div className="card">
            <h3>Class Fire Order</h3>
            <div style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
              <strong>A:</strong> BB, DN, Raider, Base<br/>
              <strong>B:</strong> BC, Fighter<br/>
              <strong>C:</strong> CA, Ship Yard<br/>
              <strong>D:</strong> DD<br/>
              <strong>E:</strong> SC, CV, Mine Sweeper
            </div>
          </div>
          <div className="card">
            <h3>Attack/Defense Limits by Hull</h3>
            <div style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
              Hull 1: max +1 Atk/Def upgrade<br/>
              Hull 2: max +2 Atk/Def upgrade<br/>
              Hull 3: max +3 Atk/Def upgrade
            </div>
          </div>
          <div className="card">
            <h3>Umpire Mode</h3>
            <div style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.5rem' }}>
              Unlocks editing of past turns to fix errors.
            </div>
            <button
              className={`btn ${umpireMode ? 'btn-danger' : 'btn-secondary'}`}
              onClick={() => {
                if (!umpireMode) {
                  // Auto-save before entering umpire mode
                  const autoName = `Pre-umpire T${currentTurn} auto`;
                  const currentSaves = loadSaves();
                  const entry = { ...game, name: autoName, savedAt: Date.now() };
                  const idx = currentSaves.findIndex(s => s.name === autoName);
                  if (idx >= 0) currentSaves[idx] = entry; else currentSaves.push(entry);
                  const autos = currentSaves.filter(s => s.name.endsWith(' auto')).sort((a, b) => b.savedAt - a.savedAt);
                  const stale = new Set(autos.slice(2).map(s => s.name));
                  const trimmed = currentSaves.filter(s => !stale.has(s.name));
                  saveSaves(trimmed);
                  setSaves(trimmed);
                }
                setUmpireMode(u => !u);
              }}
            >
              {umpireMode ? 'Disable Umpire Mode' : 'Enable Umpire Mode'}
            </button>
          </div>
        </div>
      )}

      <div className="tab-bar">
        {TABS.map(t => (
          <button
            key={t.id}
            className={tab === t.id ? 'active' : ''}
            onClick={() => { setTab(t.id); setPendingReset(null); }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

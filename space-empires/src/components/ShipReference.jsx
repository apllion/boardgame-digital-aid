import { SHIPS } from '../data/gameData.js';

export default function ShipReference() {
  const combatShips = SHIPS.filter(s => !s.noncombat);
  const noncombatShips = SHIPS.filter(s => s.noncombat);

  return (
    <div>
      <h2>Ship Reference</h2>

      <div style={{ overflowX: 'auto' }}>
        <table className="ship-table">
          <thead>
            <tr>
              <th>Ship</th>
              <th>Cost</th>
              <th>Class</th>
              <th>Atk</th>
              <th>Def</th>
              <th>Hull</th>
              <th>Mnt</th>
            </tr>
          </thead>
          <tbody>
            {combatShips.map(ship => (
              <tr key={ship.id}>
                <td>{ship.name}</td>
                <td>{ship.cost}</td>
                <td>{ship.class}</td>
                <td>{ship.attack}</td>
                <td>{ship.defense}</td>
                <td>{ship.hull}</td>
                <td>{ship.maintenance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {combatShips.filter(s => s.desc).map(ship => (
        <div key={ship.id} className="ship-desc">
          <strong>{ship.name}:</strong> {ship.desc}
          {ship.prereq && <span style={{ color: '#8b7aff' }}> [{ship.prereq}]</span>}
        </div>
      ))}

      <h3 style={{ marginTop: '1.25rem' }}>Noncombat Ships</h3>

      <div style={{ overflowX: 'auto' }}>
        <table className="ship-table">
          <thead>
            <tr>
              <th>Ship</th>
              <th>Cost</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {noncombatShips.map(ship => (
              <tr key={ship.id} className="noncombat">
                <td>{ship.name}</td>
                <td>{ship.cost}</td>
                <td style={{ textAlign: 'left', fontSize: '0.7rem' }}>{ship.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

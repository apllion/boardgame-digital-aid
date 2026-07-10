export function FactionSelect({ factions, onSelect }) {
  return (
    <div className="faction-select">
      <h2>Select a Faction Bot</h2>
      <p className="hint">Choose which non-player faction to guide</p>
      <div className="faction-grid">
        {Object.values(factions).map((faction) => (
          <button
            key={faction.id}
            className="faction-card"
            style={{ backgroundColor: faction.bgColor, borderColor: faction.color }}
            onClick={() => onSelect(faction.id)}
          >
            <h3>{faction.name}</h3>
            <p>{faction.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

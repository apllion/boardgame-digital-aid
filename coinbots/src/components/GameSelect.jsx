import { GAMES } from '../data/games';

export function GameSelect({ onSelect }) {
  return (
    <div className="game-select">
      <h2>Select a Game</h2>
      <p className="hint">Choose which COIN game to play</p>
      <div className="game-grid">
        {Object.values(GAMES).map((game) => (
          <button
            key={game.id}
            className="game-card"
            style={{ borderColor: game.color }}
            onClick={() => onSelect(game.id)}
          >
            <h3>{game.name}</h3>
            <p>{game.subtitle}</p>
            <span className="faction-count">
              {Object.keys(game.factions).length} factions
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

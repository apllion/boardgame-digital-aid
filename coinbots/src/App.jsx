import { useState, useCallback, useEffect } from 'react';
import { GAMES } from './data/games';
import { GameSelect } from './components/GameSelect';
import { FactionSelect } from './components/FactionSelect';
import { Flowchart } from './components/Flowchart';
import { RoomPanel } from './components/RoomPanel';
import { useRoom } from './hooks/useRoom';
import './index.css';

function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedFaction, setSelectedFaction] = useState(null);
  const [remoteState, setRemoteState] = useState(null);
  const room = useRoom();

  useEffect(() => {
    room.onRemoteState((state) => {
      setRemoteState(state);
      if (state?.gameId) setSelectedGame(state.gameId);
      if (state?.factionId) setSelectedFaction(state.factionId);
    });
  }, [room.onRemoteState]);

  const handleStateChange = useCallback((state) => {
    room.broadcastState({ ...state, gameId: selectedGame });
  }, [room.broadcastState, selectedGame]);

  const game = selectedGame ? GAMES[selectedGame] : null;

  const activeFaction = room.isHost || !remoteState
    ? selectedFaction
    : remoteState?.factionId || null;

  return (
    <div className="app">
      <header>
        <h1>COIN Bot Guide</h1>
        <p className="subtitle">Non-Player Faction Flowchart Assistant</p>
      </header>

      <RoomPanel room={room} />

      <main>
        {!game ? (
          <GameSelect onSelect={setSelectedGame} />
        ) : !activeFaction ? (
          <>
            <div className="breadcrumb">
              <button className="btn btn-back" onClick={() => { setSelectedGame(null); setSelectedFaction(null); }}>← Games</button>
              <span className="faction-name" style={{ color: game.color }}>{game.name}</span>
            </div>
            <FactionSelect factions={game.factions} onSelect={setSelectedFaction} />
          </>
        ) : (
          <Flowchart
            factionId={activeFaction}
            game={game}
            onBack={() => {
              setSelectedFaction(null);
              if (room.isHost) room.broadcastState(null);
            }}
            onStateChange={room.isHost ? handleStateChange : null}
            externalState={!room.isHost ? remoteState : null}
          />
        )}
      </main>
    </div>
  );
}

export default App;

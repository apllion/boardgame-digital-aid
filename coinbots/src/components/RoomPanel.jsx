import { useState } from 'react';

const STATUS_LABEL = {
  disconnected: '',
  connecting: 'connecting...',
  connected: 'connected',
};

export function RoomPanel({ room }) {
  const [joinCode, setJoinCode] = useState('');

  if (room.roomId) {
    return (
      <div className="room-panel connected">
        <div className="room-info">
          <span className="room-code">Room: <strong>{room.roomId}</strong></span>
          {room.isHost && <span className="badge host">Host</span>}
          {!room.isHost && <span className="badge viewer">Watching</span>}
          <span className={`status-dot ${room.status}`} />
          {room.peerCount > 0 && (
            <span className="viewer-count">
              {room.peerCount} {room.peerCount === 1 ? 'peer' : 'peers'}
            </span>
          )}
          {room.peerCount === 0 && room.status === 'connecting' && (
            <span className="viewer-count">{STATUS_LABEL[room.status]}</span>
          )}
        </div>
        <button className="btn btn-back btn-sm" onClick={room.leaveRoom}>Leave</button>
      </div>
    );
  }

  return (
    <div className="room-panel">
      <div className="room-actions">
        <button className="btn btn-next btn-sm" onClick={room.createRoom}>
          Host Room
        </button>
        <div className="join-form">
          <input
            type="text"
            placeholder="Room code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            maxLength={6}
          />
          <button
            className="btn btn-yes btn-sm"
            onClick={() => joinCode && room.joinRoom(joinCode)}
            disabled={!joinCode}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

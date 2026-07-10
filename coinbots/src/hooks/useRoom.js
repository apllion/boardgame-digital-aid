// P2P room sync via Trystero (WebRTC over Nostr relays). No server needed.

import { useState, useEffect, useRef, useCallback } from 'react';
import { joinRoom as trysteroJoin } from 'trystero/nostr';

const APP_ID = 'coinbots-v1';
const ROOM_KEY = 'coinbots_room';

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function saveRoomInfo(code, isHost) {
  try { localStorage.setItem(ROOM_KEY, JSON.stringify({ code, isHost })); } catch {}
}
function loadRoomInfo() {
  try { return JSON.parse(localStorage.getItem(ROOM_KEY)); } catch { return null; }
}
function clearRoomInfo() {
  try { localStorage.removeItem(ROOM_KEY); } catch {}
}

export function useRoom() {
  const [roomId, setRoomId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [peerCount, setPeerCount] = useState(0);
  const [status, setStatus] = useState('disconnected'); // disconnected | connecting | connected

  const roomRef = useRef(null);
  const sendStateRef = useRef(null);
  const sendStateReqRef = useRef(null);
  const sendPingRef = useRef(null);
  const heartbeatRef = useRef(null);
  const stateRef = useRef(null);
  const onRemoteStateRef = useRef(null);
  const reconnectRef = useRef(null);

  const clearReconnect = useCallback(() => {
    if (reconnectRef.current?.timer) clearTimeout(reconnectRef.current.timer);
    reconnectRef.current = null;
  }, []);

  const cleanup = useCallback(() => {
    clearReconnect();
    if (heartbeatRef.current) { clearInterval(heartbeatRef.current); heartbeatRef.current = null; }
    if (roomRef.current) { roomRef.current.leave(); roomRef.current = null; }
    sendStateRef.current = null;
    sendStateReqRef.current = null;
    sendPingRef.current = null;
    setPeerCount(0);
    setStatus('disconnected');
    setRoomId(null);
    setIsHost(false);
  }, [clearReconnect]);

  const connect = useCallback((code, host) => {
    // Clean up existing
    if (heartbeatRef.current) { clearInterval(heartbeatRef.current); heartbeatRef.current = null; }
    if (roomRef.current) { roomRef.current.leave(); roomRef.current = null; }

    setStatus('connecting');
    setRoomId(code);
    setIsHost(host);
    saveRoomInfo(code, host);

    if (!reconnectRef.current || reconnectRef.current.code !== code) {
      clearReconnect();
      reconnectRef.current = { code, isHost: host, timer: null, delay: 1000 };
    }

    let room;
    try {
      room = trysteroJoin({ appId: APP_ID }, code);
    } catch {
      scheduleReconnect();
      return;
    }
    roomRef.current = room;

    const [sendState, onState] = room.makeAction('state');
    const [sendPing, onPing] = room.makeAction('ping');
    const [sendStateReq, onStateReq] = room.makeAction('stateReq');

    sendStateRef.current = sendState;
    sendStateReqRef.current = sendStateReq;
    sendPingRef.current = sendPing;

    // Heartbeat
    heartbeatRef.current = setInterval(() => {
      if (Object.keys(room.getPeers()).length > 0) sendPing({ t: Date.now() });
    }, 15000);
    onPing(() => {});

    room.onPeerJoin((peerId) => {
      setPeerCount(Object.keys(room.getPeers()).length);
      setStatus('connected');
      if (reconnectRef.current) reconnectRef.current.delay = 1000;

      // Host sends current state to new peer
      if (host && stateRef.current) {
        sendState(stateRef.current, peerId);
      }
      // Viewer requests state if host hasn't sent yet
      if (!host) {
        setTimeout(() => {
          if (!stateRef.current && sendStateReqRef.current) {
            sendStateReqRef.current({});
          }
        }, 3000);
      }
    });

    room.onPeerLeave(() => {
      const count = Object.keys(room.getPeers()).length;
      setPeerCount(count);
      if (count === 0) {
        setStatus('connecting');
        scheduleReconnect();
      }
    });

    // Receive state from host
    onState((state) => {
      if (onRemoteStateRef.current) {
        onRemoteStateRef.current(state);
      }
    });

    // Host responds to state requests
    onStateReq((_data, peerId) => {
      if (host && stateRef.current) {
        sendState(stateRef.current, peerId);
      }
    });
  }, [clearReconnect]);

  function scheduleReconnect() {
    const info = reconnectRef.current;
    if (!info || info.timer) return;
    info.timer = setTimeout(() => {
      info.timer = null;
      info.delay = Math.min(info.delay * 1.5, 30000);
      connect(info.code, info.isHost);
    }, info.delay);
  }

  // Cleanup on unmount
  useEffect(() => cleanup, [cleanup]);

  // Auto-rejoin on mount
  useEffect(() => {
    const saved = loadRoomInfo();
    if (saved) connect(saved.code, saved.isHost);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reconnect on tab visibility
  useEffect(() => {
    function onVisible() {
      if (document.visibilityState !== 'visible') return;
      const info = reconnectRef.current;
      if (!info) return;
      if (info.timer) { clearTimeout(info.timer); info.timer = null; }
      info.delay = 1000;
      connect(info.code, info.isHost);
    }
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [connect]);

  const createRoom = useCallback(() => {
    const code = generateRoomCode();
    connect(code, true);
    return code;
  }, [connect]);

  const joinRoom = useCallback((code) => {
    connect(code.toUpperCase().trim(), false);
  }, [connect]);

  const leaveRoom = useCallback(() => {
    clearRoomInfo();
    cleanup();
  }, [cleanup]);

  // Host broadcasts state
  const broadcastState = useCallback((state) => {
    stateRef.current = state;
    if (sendStateRef.current && roomRef.current) {
      const peers = Object.keys(roomRef.current.getPeers());
      if (peers.length > 0) {
        sendStateRef.current(state);
      }
    }
  }, []);

  // Register callback for receiving remote state
  const onRemoteState = useCallback((callback) => {
    onRemoteStateRef.current = callback;
  }, []);

  return {
    roomId,
    isHost,
    peerCount,
    status,
    createRoom,
    joinRoom,
    leaveRoom,
    broadcastState,
    onRemoteState,
  };
}

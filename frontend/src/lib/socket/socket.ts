// lib/socket/socket.ts
import { io, Socket } from 'socket.io-client';
import { env } from '@/config/env';

/**
 * Single shared Socket.io client instance for the whole app.
 * Cookie-based auth flows through automatically since the handshake
 * carries the browser's HTTP-only cookies (must enable `withCredentials` server-side too).
 */
let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(env.socketUrl, {
      withCredentials: true,
      autoConnect: false,
      transports: ['websocket'],
    });
  }
  return socket;
}

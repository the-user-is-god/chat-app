// lib/socket/socket-provider.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSocket, disconnectSocket } from './socket';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';

interface SocketContextValue {
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextValue>({ isConnected: false });

export function useSocketConnection() {
  return useContext(SocketContext);
}

/**
 * Owns the socket's connection lifecycle at the app root, tied to auth state.
 * Connects once the user session is confirmed; disconnects on logout so
 * stale sockets don't linger after a user signs out.
 */
export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useCurrentUser();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    const socket = getSocket();

    if (isAuthenticated) {
      if (!socket.connected) socket.connect();
      const handleConnect = () => setIsConnected(true);
      const handleDisconnect = () => setIsConnected(false);
      socket.on('connect', handleConnect);
      socket.on('disconnect', handleDisconnect);
      return () => {
        socket.off('connect', handleConnect);
        socket.off('disconnect', handleDisconnect);
      };
    } else {
      disconnectSocket();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsConnected(false);
    }
  }, [isAuthenticated, isLoading]);

  return <SocketContext.Provider value={{ isConnected }}>{children}</SocketContext.Provider>;
}

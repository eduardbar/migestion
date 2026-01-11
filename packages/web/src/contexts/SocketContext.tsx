import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import * as socketService from '@/services/socket.service';
import { useAuthStore } from '@/stores';

/**
 * Socket.IO Context Provider.
 * Manages WebSocket connection lifecycle based on authentication state.
 */

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

interface SocketContextValue {
  status: ConnectionStatus;
  error: string | null;
  isConnected: boolean;
  reconnect: () => void;
}

// ─────────────────────────────────────────
// Context
// ─────────────────────────────────────────

const SocketContext = createContext<SocketContextValue | null>(null);

// ─────────────────────────────────────────
// Provider
// ─────────────────────────────────────────

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const { isAuthenticated } = useAuthStore();
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);

  // Handle connection status changes
  useEffect(() => {
    const unsubscribe = socketService.onStatusChange((newStatus, newError) => {
      setStatus(newStatus);
      setError(newError ?? null);
    });

    return unsubscribe;
  }, []);

  // Connect/disconnect based on auth state
  useEffect(() => {
    if (isAuthenticated) {
      socketService.connect();
    } else {
      socketService.disconnect();
    }

    return () => {
      socketService.disconnect();
    };
  }, [isAuthenticated]);

  const reconnect = useCallback(() => {
    socketService.reconnect();
  }, []);

  const value: SocketContextValue = {
    status,
    error,
    isConnected: status === 'connected',
    reconnect,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

// ─────────────────────────────────────────
// Hook
// ─────────────────────────────────────────

/**
 * Hook to access socket connection state.
 */
export function useSocket(): SocketContextValue {
  const context = useContext(SocketContext);
  
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  
  return context;
}

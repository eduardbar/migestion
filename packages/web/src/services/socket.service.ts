import { io, Socket } from 'socket.io-client';
import { API_URL, STORAGE_KEYS } from '@/lib/constants';

/**
 * Socket.IO client service.
 * Manages WebSocket connection for real-time features.
 */

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

/**
 * Notification payload from server.
 */
export interface NotificationPayload {
  id: string;
  type: string;
  title: string;
  message: string | null;
  data?: Record<string, unknown>;
  createdAt: string;
}

/**
 * Server to client events.
 */
interface ServerToClientEvents {
  notification: (payload: NotificationPayload) => void;
  notificationCount: (count: number) => void;
  error: (message: string) => void;
}

/**
 * Client to server events.
 */
interface ClientToServerEvents {
  subscribe: (callback: (success: boolean) => void) => void;
  unsubscribe: (callback: (success: boolean) => void) => void;
}

/**
 * Typed Socket.IO client.
 */
type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

// ─────────────────────────────────────────
// Connection State
// ─────────────────────────────────────────

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

interface ConnectionState {
  status: ConnectionStatus;
  error: string | null;
}

let socket: TypedSocket | null = null;
let connectionState: ConnectionState = {
  status: 'disconnected',
  error: null,
};

// Event listeners registry
type NotificationListener = (payload: NotificationPayload) => void;
type CountListener = (count: number) => void;
type StatusListener = (status: ConnectionStatus, error?: string) => void;

const notificationListeners = new Set<NotificationListener>();
const countListeners = new Set<CountListener>();
const statusListeners = new Set<StatusListener>();

// ─────────────────────────────────────────
// Internal Helpers
// ─────────────────────────────────────────

/**
 * Update connection state and notify listeners.
 */
function updateStatus(status: ConnectionStatus, error?: string): void {
  connectionState = { status, error: error ?? null };
  statusListeners.forEach((listener) => listener(status, error));
}

/**
 * Get stored access token.
 */
function getToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

// ─────────────────────────────────────────
// Connection Management
// ─────────────────────────────────────────

/**
 * Connect to the WebSocket server.
 * Authenticates using the stored JWT token.
 */
export function connect(): void {
  const token = getToken();

  if (!token) {
    updateStatus('error', 'No authentication token');
    return;
  }

  if (socket?.connected) {
    return;
  }

  // Disconnect existing socket if any
  if (socket) {
    socket.disconnect();
  }

  updateStatus('connecting');

  socket = io(API_URL, {
    auth: { token },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 10000,
  });

  // Connection events
  socket.on('connect', () => {
    updateStatus('connected');
    
    // Subscribe to receive notifications
    socket?.emit('subscribe', (success) => {
      if (!success) {
        console.warn('Failed to subscribe to notifications');
      }
    });
  });

  socket.on('disconnect', (reason) => {
    updateStatus('disconnected');
    
    // If server disconnected us, try to reconnect
    if (reason === 'io server disconnect') {
      socket?.connect();
    }
  });

  socket.on('connect_error', (error) => {
    updateStatus('error', error.message);
  });

  // Application events
  socket.on('notification', (payload) => {
    notificationListeners.forEach((listener) => listener(payload));
  });

  socket.on('notificationCount', (count) => {
    countListeners.forEach((listener) => listener(count));
  });

  socket.on('error', (message) => {
    console.error('Socket error:', message);
  });
}

/**
 * Disconnect from the WebSocket server.
 */
export function disconnect(): void {
  if (socket) {
    socket.emit('unsubscribe', () => {
      socket?.disconnect();
      socket = null;
      updateStatus('disconnected');
    });
  }
}

/**
 * Reconnect to the server (useful after token refresh).
 */
export function reconnect(): void {
  disconnect();
  setTimeout(connect, 100);
}

// ─────────────────────────────────────────
// Event Subscription
// ─────────────────────────────────────────

/**
 * Subscribe to new notifications.
 */
export function onNotification(listener: NotificationListener): () => void {
  notificationListeners.add(listener);
  return () => notificationListeners.delete(listener);
}

/**
 * Subscribe to notification count updates.
 */
export function onCountUpdate(listener: CountListener): () => void {
  countListeners.add(listener);
  return () => countListeners.delete(listener);
}

/**
 * Subscribe to connection status changes.
 */
export function onStatusChange(listener: StatusListener): () => void {
  statusListeners.add(listener);
  // Immediately call with current status
  listener(connectionState.status, connectionState.error ?? undefined);
  return () => statusListeners.delete(listener);
}

// ─────────────────────────────────────────
// Status Getters
// ─────────────────────────────────────────

/**
 * Get current connection status.
 */
export function getStatus(): ConnectionStatus {
  return connectionState.status;
}

/**
 * Check if connected.
 */
export function isConnected(): boolean {
  return connectionState.status === 'connected';
}

/**
 * Get the socket instance (for advanced use cases).
 */
export function getSocket(): TypedSocket | null {
  return socket;
}

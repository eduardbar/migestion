import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { env } from '../../config/index.js';
import { logger } from '../../shared/utils/logger.js';
import { verifyAccessToken, type AccessTokenPayload } from '../../shared/utils/jwt.js';

/**
 * Socket.IO server for real-time communications.
 *
 * @remarks
 * Features:
 * - JWT authentication for connections
 * - Room-based messaging (per user and per tenant)
 * - Typed events for notifications
 */

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

/**
 * Socket data attached after authentication.
 */
interface SocketData {
  userId: string;
  tenantId: string;
  role: string;
}

/**
 * Notification payload for real-time events.
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
 * Inter-server events (for horizontal scaling).
 */
interface InterServerEvents {
  ping: () => void;
}

/**
 * Typed Socket.IO server.
 */
type TypedServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

/**
 * Typed Socket.
 */
type TypedSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

// ─────────────────────────────────────────
// Singleton Instance
// ─────────────────────────────────────────

let io: TypedServer | null = null;

/**
 * Get the Socket.IO server instance.
 * Returns null if not initialized.
 */
export function getIO(): TypedServer | null {
  return io;
}

// ─────────────────────────────────────────
// Server Setup
// ─────────────────────────────────────────

/**
 * Initialize Socket.IO server with the HTTP server.
 */
export function initializeSocketIO(httpServer: HttpServer): TypedServer {
  if (io) {
    logger.warn('Socket.IO already initialized');
    return io;
  }

  io = new Server(httpServer, {
    cors: {
      origin: env.WEB_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // Authentication middleware
  io.use(async (socket: TypedSocket, next) => {
    try {
      const token =
        socket.handshake.auth.token ||
        socket.handshake.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return next(new Error('Authentication required'));
      }

      const payload = verifyAccessToken(token) as AccessTokenPayload;

      // Attach user data to socket
      socket.data.userId = payload.userId;
      socket.data.tenantId = payload.tenantId;
      socket.data.role = payload.role;

      next();
    } catch (error) {
      logger.warn('Socket authentication failed', {
        error: error instanceof Error ? error.message : 'Unknown',
      });
      next(new Error('Invalid token'));
    }
  });

  // Connection handler
  io.on('connection', (socket: TypedSocket) => {
    const { userId, tenantId } = socket.data;

    logger.debug('Socket connected', { socketId: socket.id, userId, tenantId });

    // Join user-specific room
    socket.join(`user:${userId}`);

    // Join tenant-wide room
    socket.join(`tenant:${tenantId}`);

    // Handle subscription request (explicit join)
    socket.on('subscribe', callback => {
      logger.debug('Socket subscribed', { socketId: socket.id, userId });
      callback(true);
    });

    // Handle unsubscription
    socket.on('unsubscribe', callback => {
      socket.leave(`user:${userId}`);
      socket.leave(`tenant:${tenantId}`);
      callback(true);
    });

    // Handle disconnection
    socket.on('disconnect', reason => {
      logger.debug('Socket disconnected', { socketId: socket.id, userId, reason });
    });

    // Handle errors
    socket.on('error', error => {
      logger.error('Socket error', { socketId: socket.id, userId, error });
    });
  });

  logger.info('Socket.IO server initialized');
  return io;
}

/**
 * Gracefully shutdown Socket.IO server.
 */
export async function shutdownSocketIO(): Promise<void> {
  if (io) {
    io.disconnectSockets(true);
    await new Promise<void>(resolve => {
      io!.close(() => {
        logger.info('Socket.IO server closed');
        io = null;
        resolve();
      });
    });
  }
}

// ─────────────────────────────────────────
// Event Emitters
// ─────────────────────────────────────────

/**
 * Send a notification to a specific user.
 */
export function emitToUser(
  userId: string,
  event: keyof ServerToClientEvents,
  payload: unknown
): void {
  if (!io) {
    logger.warn('Socket.IO not initialized, cannot emit event', { event, userId });
    return;
  }

  io.to(`user:${userId}`).emit(event as 'notification', payload as NotificationPayload);
  logger.debug('Emitted event to user', { event, userId });
}

/**
 * Send a notification to all users in a tenant.
 */
export function emitToTenant(
  tenantId: string,
  event: keyof ServerToClientEvents,
  payload: unknown
): void {
  if (!io) {
    logger.warn('Socket.IO not initialized, cannot emit event', { event, tenantId });
    return;
  }

  io.to(`tenant:${tenantId}`).emit(event as 'notification', payload as NotificationPayload);
  logger.debug('Emitted event to tenant', { event, tenantId });
}

/**
 * Send a notification event to a user.
 */
export function sendNotification(userId: string, notification: NotificationPayload): void {
  emitToUser(userId, 'notification', notification);
}

/**
 * Update notification count for a user.
 */
export function sendNotificationCount(userId: string, count: number): void {
  emitToUser(userId, 'notificationCount', count);
}

/**
 * Broadcast a notification to all users in a tenant.
 */
export function broadcastNotification(tenantId: string, notification: NotificationPayload): void {
  emitToTenant(tenantId, 'notification', notification);
}

// ─────────────────────────────────────────
// Connection Stats
// ─────────────────────────────────────────

/**
 * Get current connection statistics.
 */
export function getConnectionStats(): { connected: number; rooms: number } {
  if (!io) {
    return { connected: 0, rooms: 0 };
  }

  return {
    connected: io.engine.clientsCount,
    rooms: io.sockets.adapter.rooms.size,
  };
}

/**
 * Check if a user is currently connected.
 */
export async function isUserConnected(userId: string): Promise<boolean> {
  if (!io) return false;

  const sockets = await io.in(`user:${userId}`).fetchSockets();
  return sockets.length > 0;
}

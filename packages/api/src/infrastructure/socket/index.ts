/**
 * Socket.IO infrastructure exports.
 */
export {
  initializeSocketIO,
  shutdownSocketIO,
  getIO,
  emitToUser,
  emitToTenant,
  sendNotification,
  sendNotificationCount,
  broadcastNotification,
  getConnectionStats,
  isUserConnected,
  type NotificationPayload,
} from './server.js';

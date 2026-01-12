import { createServer } from 'http';
import { createApp } from './app.js';
import { env } from './config/index.js';
import { logger } from './shared/utils/logger.js';
import { disconnectDatabase } from './infrastructure/prisma/client.js';
import { connectRedis, disconnectRedis } from './infrastructure/redis/index.js';
import { initializeSocketIO, shutdownSocketIO } from './infrastructure/socket/index.js';
import {
  checkDatabaseConnection,
  ensureDatabaseSchema,
} from './infrastructure/prisma/schema-check.js';

/**
 * Server entry point.
 *
 * @remarks
 * Handles:
 * - Application startup with HTTP server
 * - Redis connection
 * - Socket.IO initialization
 * - Graceful shutdown
 * - Uncaught exception handling
 */

const app = createApp();

// Create HTTP server (needed for Socket.IO)
const httpServer = createServer(app);

// Initialize Socket.IO
initializeSocketIO(httpServer);

// Start server and connect to Redis
async function startServer(): Promise<void> {
  // Check database connection and schema
  const dbConnected = await checkDatabaseConnection();
  if (!dbConnected) {
    logger.error('Database connection failed, cannot start server');
    process.exit(1);
  }

  // Ensure tables exist (for Render Web Services without Console access)
  await ensureDatabaseSchema();

  // Connect to Redis (non-blocking, graceful degradation)
  await connectRedis();

  httpServer.listen(env.PORT, () => {
    logger.info(`Server started`, {
      port: env.PORT,
      environment: env.NODE_ENV,
      apiUrl: env.API_URL,
      features: {
        websocket: true,
        redis: true,
      },
    });
  });
}

startServer().catch(error => {
  logger.error('Failed to start server', { error });
  process.exit(1);
});

// ─────────────────────────────────────────
// Graceful Shutdown
// ─────────────────────────────────────────
async function gracefulShutdown(signal: string): Promise<void> {
  logger.info(`Received ${signal}, shutting down gracefully...`);

  httpServer.close(async () => {
    logger.info('HTTP server closed');

    try {
      // Shutdown in parallel
      await Promise.all([shutdownSocketIO(), disconnectRedis(), disconnectDatabase()]);

      logger.info('All connections closed');
      process.exit(0);
    } catch (error) {
      logger.error('Error during shutdown', { error });
      process.exit(1);
    }
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error('Forced shutdown due to timeout');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// ─────────────────────────────────────────
// Uncaught Exception Handling
// ─────────────────────────────────────────
process.on('uncaughtException', error => {
  logger.error('Uncaught exception', { error });
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  logger.error('Unhandled rejection', { reason });
  process.exit(1);
});

export default httpServer;

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/index.js';
import { API_PREFIX } from './config/constants.js';
import { swaggerSpec } from './config/swagger.js';
import { errorHandler, notFoundHandler, defaultRateLimiter } from './shared/middlewares/index.js';
import { logger } from './shared/utils/logger.js';

// Route imports
import { authRoutes } from './modules/auth/index.js';
import { clientsRoutes } from './modules/clients/index.js';
import { interactionsRoutes } from './modules/interactions/index.js';
import { usersRoutes } from './modules/users/index.js';
import { segmentsRoutes } from './modules/segments/index.js';
import { notificationsRoutes } from './modules/notifications/index.js';
import { reportsRoutes } from './modules/reports/index.js';
import { auditRoutes } from './modules/audit/index.js';

/**
 * Create and configure Express application.
 *
 * @remarks
 * Following Clean Code principles:
 * - Separation of concerns: app setup vs server startup
 * - Middleware order matters for security
 * - Centralized error handling
 */
export function createApp(): Application {
  const app = express();

  // ─────────────────────────────────────────
  // Security Middleware
  // ─────────────────────────────────────────
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          scriptSrc: ["'self'"],
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  );

  app.use(
    cors({
      origin: env.WEB_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // ─────────────────────────────────────────
  // Request Parsing
  // ─────────────────────────────────────────
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // ─────────────────────────────────────────
  // Rate Limiting
  // ─────────────────────────────────────────
  app.use(defaultRateLimiter);

  // ─────────────────────────────────────────
  // Request Logging
  // ─────────────────────────────────────────
  app.use((req, res, next) => {
    req.startTime = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - (req.startTime ?? Date.now());
      logger.info(`${req.method} ${req.path}`, {
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        userId: req.user?.userId,
      });
    });

    next();
  });

  // ─────────────────────────────────────────
  // Health Check
  // ─────────────────────────────────────────
  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // ─────────────────────────────────────────
  // API Documentation (Swagger)
  // ─────────────────────────────────────────
  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'MiGestion API Documentation',
    })
  );

  // Serve OpenAPI spec as JSON
  app.get('/api/docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // ─────────────────────────────────────────
  // API Routes
  // ─────────────────────────────────────────
  app.use(`${API_PREFIX}/auth`, authRoutes);
  app.use(`${API_PREFIX}/clients`, clientsRoutes);
  app.use(`${API_PREFIX}/interactions`, interactionsRoutes);
  app.use(`${API_PREFIX}/users`, usersRoutes);
  app.use(`${API_PREFIX}/segments`, segmentsRoutes);
  app.use(`${API_PREFIX}/notifications`, notificationsRoutes);
  app.use(`${API_PREFIX}/reports`, reportsRoutes);
  app.use(`${API_PREFIX}/audit`, auditRoutes);

  // Future routes will be added here:

  // ─────────────────────────────────────────
  // Error Handling
  // ─────────────────────────────────────────
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

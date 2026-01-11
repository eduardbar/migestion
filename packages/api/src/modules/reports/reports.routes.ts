/**
 * Reports Routes.
 * Defines all analytics and reporting API endpoints.
 */

import { Router } from 'express';
import * as reportsController from './reports.controller.js';
import {
  authenticate,
  validateQuery,
} from '../../shared/middlewares/index.js';
import {
  dashboardQuerySchema,
  clientStatsQuerySchema,
  interactionStatsQuerySchema,
  teamPerformanceQuerySchema,
  activityTimelineQuerySchema,
  dateRangeSchema,
} from './reports.validator.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// ─────────────────────────────────────────
// Report Endpoints
// ─────────────────────────────────────────

/**
 * @swagger
 * /reports/dashboard:
 *   get:
 *     summary: Get dashboard overview
 *     description: Returns comprehensive dashboard metrics including clients, interactions, and team stats
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [today, last7days, last30days, thisMonth, lastMonth, thisYear]
 *           default: last30days
 *         description: Time period for statistics
 *     responses:
 *       200:
 *         description: Dashboard overview
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/DashboardOverview'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get(
  '/dashboard',
  validateQuery(dashboardQuerySchema),
  reportsController.getDashboard
);

/**
 * @swagger
 * /reports/clients:
 *   get:
 *     summary: Get client statistics
 *     description: Returns detailed client statistics with grouping options
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: groupBy
 *         schema:
 *           type: string
 *           enum: [status, segment, assignedTo]
 *           default: status
 *         description: Grouping field
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [today, last7days, last30days, thisMonth, lastMonth, thisYear]
 *         description: Time period
 *     responses:
 *       200:
 *         description: Client statistics
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get(
  '/clients',
  validateQuery(clientStatsQuerySchema),
  reportsController.getClientStats
);

/**
 * @swagger
 * /reports/interactions:
 *   get:
 *     summary: Get interaction statistics
 *     description: Returns interaction statistics with grouping options
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: groupBy
 *         schema:
 *           type: string
 *           enum: [type, user, client, outcome]
 *           default: type
 *         description: Grouping field
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [today, last7days, last30days, thisMonth, lastMonth, thisYear]
 *         description: Time period
 *     responses:
 *       200:
 *         description: Interaction statistics
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get(
  '/interactions',
  validateQuery(interactionStatsQuerySchema),
  reportsController.getInteractionStats
);

/**
 * @swagger
 * /reports/team:
 *   get:
 *     summary: Get team performance
 *     description: Returns team performance metrics per user
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [today, last7days, last30days, thisMonth, lastMonth, thisYear]
 *           default: last30days
 *         description: Time period
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [interactions, clients, name]
 *           default: interactions
 *         description: Sort field
 *     responses:
 *       200:
 *         description: Team performance data
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get(
  '/team',
  validateQuery(teamPerformanceQuerySchema),
  reportsController.getTeamPerformance
);

/**
 * @swagger
 * /reports/activity:
 *   get:
 *     summary: Get activity timeline
 *     description: Returns daily activity data for charts (clients and interactions per day)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           default: 30
 *           minimum: 7
 *           maximum: 365
 *         description: Number of days to include
 *     responses:
 *       200:
 *         description: Activity timeline data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           date:
 *                             type: string
 *                             format: date
 *                           clients:
 *                             type: integer
 *                           interactions:
 *                             type: integer
 *                     period:
 *                       type: object
 *                       properties:
 *                         start:
 *                           type: string
 *                           format: date
 *                         end:
 *                           type: string
 *                           format: date
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get(
  '/activity',
  validateQuery(activityTimelineQuerySchema),
  reportsController.getActivityTimeline
);

/**
 * @swagger
 * /reports/top-clients:
 *   get:
 *     summary: Get top clients by activity
 *     description: Returns clients with the most interactions in the period
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [today, last7days, last30days, thisMonth, lastMonth, thisYear]
 *           default: last30days
 *         description: Time period
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *           minimum: 1
 *           maximum: 20
 *         description: Number of clients to return
 *     responses:
 *       200:
 *         description: Top clients list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     clients:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           companyName:
 *                             type: string
 *                           contactName:
 *                             type: string
 *                           interactionCount:
 *                             type: integer
 *                           status:
 *                             type: string
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get(
  '/top-clients',
  validateQuery(dateRangeSchema),
  reportsController.getTopClients
);

export { router as reportsRoutes };

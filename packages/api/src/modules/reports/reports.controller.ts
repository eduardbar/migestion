/**
 * Reports Controller.
 * Handles HTTP requests for analytics and report endpoints.
 */

import type { Request, Response, NextFunction } from 'express';
import * as reportsService from './reports.service.js';
import { success } from '../../shared/utils/response.js';
import type {
  DashboardQuery,
  ClientStatsQuery,
  InteractionStatsQuery,
  TeamPerformanceQuery,
  ActivityTimelineQuery,
  DateRangeQuery,
} from './reports.validator.js';

// ─────────────────────────────────────────
// Controller Functions
// ─────────────────────────────────────────

/**
 * Get dashboard overview stats.
 * GET /reports/dashboard
 */
export async function getDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { tenantId } = req.user!;
    const query = req.query as unknown as DashboardQuery;

    const overview = await reportsService.getDashboardOverview(tenantId, query);

    res.json(success(overview));
  } catch (error) {
    next(error);
  }
}

/**
 * Get client statistics.
 * GET /reports/clients
 */
export async function getClientStats(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { tenantId } = req.user!;
    const query = req.query as unknown as ClientStatsQuery;

    const stats = await reportsService.getClientStats(tenantId, query);

    res.json(success(stats));
  } catch (error) {
    next(error);
  }
}

/**
 * Get interaction statistics.
 * GET /reports/interactions
 */
export async function getInteractionStats(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { tenantId } = req.user!;
    const query = req.query as unknown as InteractionStatsQuery;

    const stats = await reportsService.getInteractionStats(tenantId, query);

    res.json(success(stats));
  } catch (error) {
    next(error);
  }
}

/**
 * Get team performance stats.
 * GET /reports/team
 */
export async function getTeamPerformance(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { tenantId } = req.user!;
    const query = req.query as unknown as TeamPerformanceQuery;

    const performance = await reportsService.getTeamPerformance(tenantId, query);

    res.json(success(performance));
  } catch (error) {
    next(error);
  }
}

/**
 * Get activity timeline for charts.
 * GET /reports/activity
 */
export async function getActivityTimeline(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { tenantId } = req.user!;
    const query = req.query as unknown as ActivityTimelineQuery;

    const timeline = await reportsService.getActivityTimeline(tenantId, query);

    res.json(success(timeline));
  } catch (error) {
    next(error);
  }
}

/**
 * Get top clients by activity.
 * GET /reports/top-clients
 */
export async function getTopClients(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { tenantId } = req.user!;
    const query = req.query as unknown as DateRangeQuery;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

    const topClients = await reportsService.getTopClients(tenantId, query, limit);

    res.json(success(topClients));
  } catch (error) {
    next(error);
  }
}

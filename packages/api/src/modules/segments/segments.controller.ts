/**
 * Segment controller - HTTP request handlers.
 */

import type { Request, Response, NextFunction } from 'express';
import * as segmentsService from './segments.service.js';
import { success } from '../../shared/utils/response.js';
import type {
  CreateSegmentInput,
  UpdateSegmentInput,
  ListSegmentsQuery,
} from './segments.validator.js';

// ─────────────────────────────────────────
// List Segments
// ─────────────────────────────────────────

export async function list(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await segmentsService.list(req.user!.tenantId, req.query as unknown as ListSegmentsQuery);
    res.json(success(result));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Get All Segments (Simple)
// ─────────────────────────────────────────

export async function getAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const segments = await segmentsService.getAll(req.user!.tenantId);
    res.json(success(segments));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Get Single Segment
// ─────────────────────────────────────────

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const segment = await segmentsService.getById(req.user!.tenantId, req.params.id!);
    res.json(success(segment));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Get Segment Stats
// ─────────────────────────────────────────

export async function getStats(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const stats = await segmentsService.getStats(req.user!.tenantId);
    res.json(success(stats));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Create Segment
// ─────────────────────────────────────────

export async function create(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const segment = await segmentsService.create(req.user!.tenantId, req.body as CreateSegmentInput);
    res.status(201).json(success(segment, 'Segment created successfully'));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Update Segment
// ─────────────────────────────────────────

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const segment = await segmentsService.update(
      req.user!.tenantId,
      req.params.id!,
      req.body as UpdateSegmentInput
    );
    res.json(success(segment, 'Segment updated successfully'));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Delete Segment
// ─────────────────────────────────────────

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await segmentsService.remove(req.user!.tenantId, req.params.id!);
    res.json(success(null, 'Segment deleted successfully'));
  } catch (error) {
    next(error);
  }
}

/**
 * Segment service - business logic layer.
 * Orchestrates segment operations with validation.
 */

import type { Prisma } from '@prisma/client';
import * as segmentsRepository from './segments.repository.js';
import {
  toSegmentDto,
  toSegmentListDto,
  type SegmentDto,
  type SegmentListDto,
} from './segments.dto.js';
import type {
  CreateSegmentInput,
  UpdateSegmentInput,
  ListSegmentsQuery,
} from './segments.validator.js';
import { NotFoundError, BadRequestError } from '../../shared/errors/app-error.js';

// ─────────────────────────────────────────
// Read Operations
// ─────────────────────────────────────────

/**
 * Get a single segment by ID.
 * @throws NotFoundError if segment doesn't exist
 */
export async function getById(tenantId: string, segmentId: string): Promise<SegmentDto> {
  const segment = await segmentsRepository.findById(tenantId, segmentId);

  if (!segment) {
    throw new NotFoundError('Segment');
  }

  return toSegmentDto(segment);
}

/**
 * List segments with filtering and pagination.
 */
export async function list(tenantId: string, query: ListSegmentsQuery): Promise<SegmentListDto> {
  const { segments, total } = await segmentsRepository.findMany({
    tenantId,
    page: query.page,
    limit: query.limit,
    search: query.search,
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
  });

  return toSegmentListDto(segments, query.page, query.limit, total);
}

/**
 * Get all segments (simple list for dropdowns).
 */
export async function getAll(tenantId: string) {
  return segmentsRepository.findAll(tenantId);
}

/**
 * Get segment statistics.
 */
export async function getStats(tenantId: string) {
  return segmentsRepository.getStats(tenantId);
}

// ─────────────────────────────────────────
// Write Operations
// ─────────────────────────────────────────

/**
 * Create a new segment.
 * @throws BadRequestError if name already exists
 */
export async function create(tenantId: string, input: CreateSegmentInput): Promise<SegmentDto> {
  // Check if name is already used
  const nameExists = await segmentsRepository.nameExists(tenantId, input.name);
  if (nameExists) {
    throw new BadRequestError('A segment with this name already exists', 'DUPLICATE_NAME');
  }

  const segment = await segmentsRepository.create({
    tenantId,
    name: input.name,
    color: input.color,
    criteria: input.criteria,
  });

  return toSegmentDto(segment);
}

/**
 * Update an existing segment.
 * @throws NotFoundError if segment doesn't exist
 * @throws BadRequestError if new name is already used
 */
export async function update(
  tenantId: string,
  segmentId: string,
  input: UpdateSegmentInput
): Promise<SegmentDto> {
  // Check if segment exists
  const exists = await segmentsRepository.exists(tenantId, segmentId);
  if (!exists) {
    throw new NotFoundError('Segment');
  }

  // Check if new name is already used by another segment
  if (input.name) {
    const nameExists = await segmentsRepository.nameExists(tenantId, input.name, segmentId);
    if (nameExists) {
      throw new BadRequestError('A segment with this name already exists', 'DUPLICATE_NAME');
    }
  }

  const data: { name?: string; color?: string | null; criteria?: Prisma.InputJsonValue } = {};

  if (input.name !== undefined) data.name = input.name;
  if (input.color !== undefined) data.color = input.color;
  if (input.criteria !== undefined) data.criteria = input.criteria as Prisma.InputJsonValue;

  const segment = await segmentsRepository.update(tenantId, segmentId, data);
  return toSegmentDto(segment);
}

/**
 * Delete a segment.
 * @throws NotFoundError if segment doesn't exist
 */
export async function remove(tenantId: string, segmentId: string): Promise<void> {
  const exists = await segmentsRepository.exists(tenantId, segmentId);
  if (!exists) {
    throw new NotFoundError('Segment');
  }

  await segmentsRepository.remove(tenantId, segmentId);
}

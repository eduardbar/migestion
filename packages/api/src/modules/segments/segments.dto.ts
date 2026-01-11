/**
 * Segment DTOs - Data Transfer Objects.
 * Transform database entities to API responses.
 */

import type { Segment } from '@prisma/client';

// ─────────────────────────────────────────
// Segment DTO
// ─────────────────────────────────────────
export interface SegmentDto {
  id: string;
  name: string;
  color: string | null;
  criteria: Record<string, unknown> | null;
  clientCount?: number;
  createdAt: string;
  updatedAt: string;
}

type SegmentWithCount = Segment & {
  _count?: {
    clients?: number;
  };
};

export function toSegmentDto(segment: SegmentWithCount): SegmentDto {
  return {
    id: segment.id,
    name: segment.name,
    color: segment.color,
    criteria: segment.criteria as Record<string, unknown> | null,
    clientCount: segment._count?.clients,
    createdAt: segment.createdAt.toISOString(),
    updatedAt: segment.updatedAt.toISOString(),
  };
}

// ─────────────────────────────────────────
// Segment List DTO
// ─────────────────────────────────────────
export interface SegmentListDto {
  segments: SegmentDto[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function toSegmentListDto(
  segments: SegmentWithCount[],
  page: number,
  limit: number,
  total: number
): SegmentListDto {
  return {
    segments: segments.map(toSegmentDto),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

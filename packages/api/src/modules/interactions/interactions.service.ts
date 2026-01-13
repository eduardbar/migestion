/**
 * Interaction service - business logic layer.
 * Orchestrates interaction operations with validation.
 *
 * @remarks
 * Service functions contain business rules and coordinate between
 * repository operations and DTO mappings.
 */

import { Prisma } from '@prisma/client';
import * as interactionsRepository from './interactions.repository.js';
import {
  toInteractionWithRelationsDto,
  toInteractionListDto,
  toClientTimelineDto,
  type InteractionWithRelationsDto,
  type InteractionListDto,
  type ClientTimelineDto,
  type InteractionStatsDto,
} from './interactions.dto.js';
import type {
  CreateInteractionInput,
  UpdateInteractionInput,
  ListInteractionsQuery,
  ClientTimelineQuery,
} from './interactions.validator.js';
import { NotFoundError, BadRequestError } from '../../shared/errors/app-error.js';

// ─────────────────────────────────────────
// Read Operations
// ─────────────────────────────────────────

/**
 * Get a single interaction by ID.
 * @throws NotFoundError if interaction doesn't exist
 */
export async function getById(
  tenantId: string,
  interactionId: string
): Promise<InteractionWithRelationsDto> {
  const interaction = await interactionsRepository.findById(tenantId, interactionId);

  if (!interaction) {
    throw new NotFoundError('Interaction');
  }

  return toInteractionWithRelationsDto(interaction);
}

/**
 * List interactions with filtering and pagination.
 */
export async function list(
  tenantId: string,
  query: ListInteractionsQuery
): Promise<InteractionListDto> {
  const { interactions, total } = await interactionsRepository.findMany({
    tenantId,
    page: query.page,
    limit: query.limit,
    clientId: query.clientId,
    userId: query.userId,
    type: query.type,
    startDate: query.startDate,
    endDate: query.endDate,
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
  });

  return toInteractionListDto(interactions, query.page, query.limit, total);
}

/**
 * Get interaction timeline for a specific client.
 * @throws NotFoundError if client doesn't exist
 */
export async function getClientTimeline(
  tenantId: string,
  clientId: string,
  query: ClientTimelineQuery
): Promise<ClientTimelineDto> {
  // Verify client exists
  const clientExists = await interactionsRepository.clientExists(tenantId, clientId);
  if (!clientExists) {
    throw new NotFoundError('Client');
  }

  const { interactions, total } = await interactionsRepository.findByClient({
    tenantId,
    clientId,
    page: query.page,
    limit: query.limit,
    type: query.type,
  });

  return toClientTimelineDto(clientId, interactions, query.page, query.limit, total);
}

/**
 * Get interaction statistics for a tenant.
 */
export async function getStats(tenantId: string): Promise<InteractionStatsDto> {
  // Get all stats in parallel
  const [byType, byUserCounts, total, lastWeekCount] = await Promise.all([
    interactionsRepository.countByType(tenantId),
    interactionsRepository.countByUser(tenantId),
    interactionsRepository.countTotal(tenantId),
    interactionsRepository.countSince(
      tenantId,
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    ),
  ]);

  // Get user names for the stats
  const userIds = byUserCounts.map(u => u.userId);
  const users =
    userIds.length > 0 ? await interactionsRepository.getUsersWithCounts(tenantId, userIds) : [];

  const userMap = new Map(users.map(u => [u.id, `${u.firstName} ${u.lastName}`]));

  const byUser = byUserCounts.map(u => ({
    userId: u.userId,
    userName: userMap.get(u.userId) || 'Unknown User',
    count: u.count,
  }));

  return {
    byType,
    byUser,
    total,
    lastWeek: lastWeekCount,
    recentCount: 0,
  };
}

// ─────────────────────────────────────────
// Write Operations
// ─────────────────────────────────────────

/**
 * Create a new interaction.
 * @throws BadRequestError if client doesn't exist
 */
export async function create(
  tenantId: string,
  userId: string,
  input: CreateInteractionInput
): Promise<InteractionWithRelationsDto> {
  // Validate client exists
  const clientExists = await interactionsRepository.clientExists(tenantId, input.clientId);
  if (!clientExists) {
    throw new BadRequestError('Client does not exist', 'INVALID_CLIENT');
  }

  const data: Prisma.InteractionUncheckedCreateInput = {
    tenantId,
    clientId: input.clientId,
    userId,
    type: input.type,
    notes: input.notes || null,
    metadata: input.metadata ? (input.metadata as Prisma.InputJsonValue) : Prisma.JsonNull,
  };

  const interaction = await interactionsRepository.create(data);
  return toInteractionWithRelationsDto(interaction);
}

/**
 * Update an existing interaction.
 * @throws NotFoundError if interaction doesn't exist
 */
export async function update(
  tenantId: string,
  interactionId: string,
  input: UpdateInteractionInput
): Promise<InteractionWithRelationsDto> {
  // Check if interaction exists
  const exists = await interactionsRepository.exists(tenantId, interactionId);
  if (!exists) {
    throw new NotFoundError('Interaction');
  }

  // Build update data
  const data: Prisma.InteractionUncheckedUpdateInput = {};

  if (input.type !== undefined) data.type = input.type;
  if (input.notes !== undefined) data.notes = input.notes || null;
  if (input.metadata !== undefined) {
    data.metadata = input.metadata ? (input.metadata as Prisma.InputJsonValue) : Prisma.JsonNull;
  }

  const interaction = await interactionsRepository.update(tenantId, interactionId, data);
  return toInteractionWithRelationsDto(interaction);
}

/**
 * Delete an interaction.
 * @throws NotFoundError if interaction doesn't exist
 */
export async function remove(tenantId: string, interactionId: string): Promise<void> {
  const exists = await interactionsRepository.exists(tenantId, interactionId);
  if (!exists) {
    throw new NotFoundError('Interaction');
  }

  await interactionsRepository.remove(tenantId, interactionId);
}

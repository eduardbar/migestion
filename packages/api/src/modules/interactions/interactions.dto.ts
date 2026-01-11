/**
 * Interaction Data Transfer Objects (DTOs).
 * Defines the shape of data exposed through the API.
 */

import type { Interaction, User, Client } from '@prisma/client';

// ─────────────────────────────────────────
// Interaction Metadata Type
// ─────────────────────────────────────────
export interface InteractionMetadata {
  duration?: number;
  outcome?: string;
  scheduledAt?: string;
  completedAt?: string;
  subject?: string;
  attendees?: string[];
  location?: string;
  priority?: 'low' | 'medium' | 'high';
  status?: 'pending' | 'completed' | 'cancelled';
  [key: string]: unknown;
}

// ─────────────────────────────────────────
// Base Interaction DTO
// ─────────────────────────────────────────
export interface InteractionDto {
  id: string;
  clientId: string;
  userId: string;
  type: string;
  notes: string | null;
  metadata: InteractionMetadata | null;
  createdAt: Date;
  updatedAt: Date;
}

// ─────────────────────────────────────────
// User Summary DTO (for relations)
// ─────────────────────────────────────────
export interface UserSummaryDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
}

// ─────────────────────────────────────────
// Client Summary DTO (for relations)
// ─────────────────────────────────────────
export interface ClientSummaryDto {
  id: string;
  companyName: string;
  contactName: string;
  email: string | null;
}

// ─────────────────────────────────────────
// Interaction with Relations DTO
// ─────────────────────────────────────────
export interface InteractionWithRelationsDto extends InteractionDto {
  user: UserSummaryDto;
  client: ClientSummaryDto;
}

// ─────────────────────────────────────────
// List Response DTO
// ─────────────────────────────────────────
export interface InteractionListDto {
  interactions: InteractionWithRelationsDto[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ─────────────────────────────────────────
// Timeline Response DTO (client-centric)
// ─────────────────────────────────────────
export interface TimelineItemDto {
  id: string;
  type: string;
  notes: string | null;
  metadata: InteractionMetadata | null;
  createdAt: Date;
  user: UserSummaryDto;
}

export interface ClientTimelineDto {
  clientId: string;
  interactions: TimelineItemDto[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ─────────────────────────────────────────
// Stats DTO
// ─────────────────────────────────────────
export interface InteractionStatsDto {
  byType: { type: string; count: number }[];
  byUser: { userId: string; userName: string; count: number }[];
  total: number;
  lastWeek: number;
}

// ─────────────────────────────────────────
// Mapper Functions
// ─────────────────────────────────────────

/**
 * Maps a Prisma Interaction entity to an InteractionDto.
 */
export function toInteractionDto(interaction: Interaction): InteractionDto {
  return {
    id: interaction.id,
    clientId: interaction.clientId,
    userId: interaction.userId,
    type: interaction.type,
    notes: interaction.notes,
    metadata: interaction.metadata as InteractionMetadata | null,
    createdAt: interaction.createdAt,
    updatedAt: interaction.updatedAt,
  };
}

/**
 * Maps a User entity to a UserSummaryDto.
 */
export function toUserSummaryDto(user: User): UserSummaryDto {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatarUrl: user.avatarUrl,
  };
}

/**
 * Maps a Client entity to a ClientSummaryDto.
 */
export function toClientSummaryDto(client: Client): ClientSummaryDto {
  return {
    id: client.id,
    companyName: client.companyName,
    contactName: client.contactName,
    email: client.email,
  };
}

/**
 * Maps an Interaction with relations to InteractionWithRelationsDto.
 */
export function toInteractionWithRelationsDto(
  interaction: Interaction & { user: User; client: Client }
): InteractionWithRelationsDto {
  return {
    ...toInteractionDto(interaction),
    user: toUserSummaryDto(interaction.user),
    client: toClientSummaryDto(interaction.client),
  };
}

/**
 * Maps an Interaction to a TimelineItemDto.
 */
export function toTimelineItemDto(
  interaction: Interaction & { user: User }
): TimelineItemDto {
  return {
    id: interaction.id,
    type: interaction.type,
    notes: interaction.notes,
    metadata: interaction.metadata as InteractionMetadata | null,
    createdAt: interaction.createdAt,
    user: toUserSummaryDto(interaction.user),
  };
}

/**
 * Builds a paginated interaction list response.
 */
export function toInteractionListDto(
  interactions: (Interaction & { user: User; client: Client })[],
  page: number,
  limit: number,
  total: number
): InteractionListDto {
  return {
    interactions: interactions.map(toInteractionWithRelationsDto),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Builds a client timeline response.
 */
export function toClientTimelineDto(
  clientId: string,
  interactions: (Interaction & { user: User })[],
  page: number,
  limit: number,
  total: number
): ClientTimelineDto {
  return {
    clientId,
    interactions: interactions.map(toTimelineItemDto),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

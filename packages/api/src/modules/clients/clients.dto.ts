/**
 * Client Data Transfer Objects (DTOs).
 * Defines the shape of data exposed through the API.
 *
 * @remarks
 * DTOs separate internal database models from API responses,
 * allowing us to control exactly what data is exposed.
 */

import type { Client, User } from '@prisma/client';

// ─────────────────────────────────────────
// Base Client DTO
// ─────────────────────────────────────────
export interface ClientDto {
  id: string;
  companyName: string;
  contactName: string;
  email: string | null;
  phone: string | null;
  status: string;
  segment: string | null;
  tags: string[] | null;
  customFields: Record<string, unknown> | null;
  address: string | null;
  notes: string | null;
  assignedToId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ─────────────────────────────────────────
// Client with Assigned User DTO
// ─────────────────────────────────────────
export interface AssignedUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
}

export interface ClientWithAssignedUserDto extends ClientDto {
  assignedTo: AssignedUserDto | null;
}

// ─────────────────────────────────────────
// List Response DTO
// ─────────────────────────────────────────
export interface ClientListDto {
  clients: ClientWithAssignedUserDto[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ─────────────────────────────────────────
// Mapper Functions
// ─────────────────────────────────────────

/**
 * Maps a Prisma Client entity to a ClientDto.
 * Excludes tenantId from the response.
 */
export function toClientDto(client: Client): ClientDto {
  return {
    id: client.id,
    companyName: client.companyName,
    contactName: client.contactName,
    email: client.email,
    phone: client.phone,
    status: client.status,
    segment: client.segment,
    tags: client.tags as string[] | null,
    customFields: client.customFields as Record<string, unknown> | null,
    address: client.address,
    notes: client.notes,
    assignedToId: client.assignedToId,
    createdAt: client.createdAt,
    updatedAt: client.updatedAt,
  };
}

/**
 * Maps a User entity to an AssignedUserDto.
 * Only includes essential info for display.
 */
export function toAssignedUserDto(user: User): AssignedUserDto {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatarUrl: user.avatarUrl,
  };
}

/**
 * Maps a Client with its assigned User to ClientWithAssignedUserDto.
 */
export function toClientWithAssignedUserDto(
  client: Client & { assignedTo?: User | null }
): ClientWithAssignedUserDto {
  return {
    ...toClientDto(client),
    assignedTo: client.assignedTo ? toAssignedUserDto(client.assignedTo) : null,
  };
}

/**
 * Builds a paginated client list response.
 */
export function toClientListDto(
  clients: (Client & { assignedTo?: User | null })[],
  page: number,
  limit: number,
  total: number
): ClientListDto {
  return {
    clients: clients.map(toClientWithAssignedUserDto),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

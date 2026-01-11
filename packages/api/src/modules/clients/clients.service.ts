/**
 * Client service - business logic layer.
 * Orchestrates client operations with validation and authorization.
 * 
 * @remarks
 * Service functions contain business rules and coordinate between
 * repository operations and DTO mappings.
 */

import { Prisma } from '@prisma/client';
import * as clientsRepository from './clients.repository.js';
import {
  toClientWithAssignedUserDto,
  toClientListDto,
  type ClientWithAssignedUserDto,
  type ClientListDto,
} from './clients.dto.js';
import type { CreateClientInput, UpdateClientInput, ListClientsQuery } from './clients.validator.js';
import { NotFoundError, BadRequestError } from '../../shared/errors/app-error.js';

// ─────────────────────────────────────────
// Read Operations
// ─────────────────────────────────────────

/**
 * Get a single client by ID.
 * @throws NotFoundError if client doesn't exist
 */
export async function getById(
  tenantId: string,
  clientId: string
): Promise<ClientWithAssignedUserDto> {
  const client = await clientsRepository.findById(tenantId, clientId);

  if (!client) {
    throw new NotFoundError('Client');
  }

  return toClientWithAssignedUserDto(client);
}

/**
 * List clients with filtering and pagination.
 */
export async function list(
  tenantId: string,
  query: ListClientsQuery
): Promise<ClientListDto> {
  const { clients, total } = await clientsRepository.findMany({
    tenantId,
    page: query.page,
    limit: query.limit,
    search: query.search,
    status: query.status,
    segment: query.segment,
    assignedToId: query.assignedToId,
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
  });

  return toClientListDto(clients, query.page, query.limit, total);
}

/**
 * Get all distinct segments used by clients in the tenant.
 */
export async function getSegments(tenantId: string): Promise<string[]> {
  return clientsRepository.findDistinctSegments(tenantId);
}

/**
 * Get client count statistics by status.
 */
export async function getStatsByStatus(
  tenantId: string
): Promise<{ status: string; count: number }[]> {
  return clientsRepository.countByStatus(tenantId);
}

// ─────────────────────────────────────────
// Write Operations
// ─────────────────────────────────────────

/**
 * Create a new client.
 * @throws BadRequestError if assignedToId is invalid
 */
export async function create(
  tenantId: string,
  input: CreateClientInput
): Promise<ClientWithAssignedUserDto> {
  // Validate assignedToId if provided
  if (input.assignedToId && input.assignedToId !== '') {
    const userExists = await clientsRepository.userExistsInTenant(tenantId, input.assignedToId);
    if (!userExists) {
      throw new BadRequestError('Assigned user does not exist', 'INVALID_ASSIGNED_USER');
    }
  }

  // Clean up empty string values and handle JSON null properly
  const data: Prisma.ClientUncheckedCreateInput = {
    tenantId,
    companyName: input.companyName,
    contactName: input.contactName,
    email: input.email || null,
    phone: input.phone || null,
    status: input.status,
    segment: input.segment || null,
    tags: input.tags ? (input.tags as Prisma.InputJsonValue) : Prisma.JsonNull,
    address: input.address || null,
    notes: input.notes || null,
    customFields: input.customFields ? (input.customFields as Prisma.InputJsonValue) : Prisma.JsonNull,
    assignedToId: input.assignedToId || null,
  };

  const client = await clientsRepository.create(data);
  return toClientWithAssignedUserDto(client);
}

/**
 * Update an existing client.
 * @throws NotFoundError if client doesn't exist
 * @throws BadRequestError if assignedToId is invalid
 */
export async function update(
  tenantId: string,
  clientId: string,
  input: UpdateClientInput
): Promise<ClientWithAssignedUserDto> {
  // Check if client exists
  const exists = await clientsRepository.exists(tenantId, clientId);
  if (!exists) {
    throw new NotFoundError('Client');
  }

  // Validate assignedToId if provided (and not explicitly set to null)
  if (input.assignedToId !== undefined && input.assignedToId !== null && input.assignedToId !== '') {
    const userExists = await clientsRepository.userExistsInTenant(tenantId, input.assignedToId);
    if (!userExists) {
      throw new BadRequestError('Assigned user does not exist', 'INVALID_ASSIGNED_USER');
    }
  }

  // Build update data, converting empty strings to null
  const data: Record<string, unknown> = {};
  
  if (input.companyName !== undefined) data.companyName = input.companyName;
  if (input.contactName !== undefined) data.contactName = input.contactName;
  if (input.email !== undefined) data.email = input.email || null;
  if (input.phone !== undefined) data.phone = input.phone || null;
  if (input.status !== undefined) data.status = input.status;
  if (input.segment !== undefined) data.segment = input.segment || null;
  if (input.tags !== undefined) data.tags = input.tags;
  if (input.address !== undefined) data.address = input.address || null;
  if (input.notes !== undefined) data.notes = input.notes || null;
  if (input.customFields !== undefined) data.customFields = input.customFields;
  if (input.assignedToId !== undefined) data.assignedToId = input.assignedToId || null;

  const client = await clientsRepository.update(tenantId, clientId, data);
  return toClientWithAssignedUserDto(client);
}

/**
 * Delete a client.
 * @throws NotFoundError if client doesn't exist
 */
export async function remove(tenantId: string, clientId: string): Promise<void> {
  const exists = await clientsRepository.exists(tenantId, clientId);
  if (!exists) {
    throw new NotFoundError('Client');
  }

  await clientsRepository.remove(tenantId, clientId);
}

/**
 * Bulk update status for multiple clients.
 * @returns Number of updated clients
 */
export async function bulkUpdateStatus(
  tenantId: string,
  clientIds: string[],
  status: string
): Promise<number> {
  if (clientIds.length === 0) {
    return 0;
  }

  return clientsRepository.updateManyStatus(tenantId, clientIds, status);
}

/**
 * Bulk assign clients to a user.
 * @throws BadRequestError if assignedToId is invalid
 * @returns Number of updated clients
 */
export async function bulkAssign(
  tenantId: string,
  clientIds: string[],
  assignedToId: string | null
): Promise<number> {
  if (clientIds.length === 0) {
    return 0;
  }

  // Validate assignedToId if not null
  if (assignedToId !== null) {
    const userExists = await clientsRepository.userExistsInTenant(tenantId, assignedToId);
    if (!userExists) {
      throw new BadRequestError('Assigned user does not exist', 'INVALID_ASSIGNED_USER');
    }
  }

  return clientsRepository.assignMany(tenantId, clientIds, assignedToId);
}

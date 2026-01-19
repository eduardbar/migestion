import { api } from './api';
import type {
  Client,
  ClientListParams,
  ClientListResponse,
  ClientStats,
  CreateClientInput,
  UpdateClientInput,
} from '@/types';

/**
 * Clients service.
 * Handles all client-related API calls.
 */

// ─────────────────────────────────────────
// Read Operations
// ─────────────────────────────────────────

/**
 * Get a list of clients with filtering and pagination.
 */
export async function getClients(params: ClientListParams = {}): Promise<ClientListResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set('page', String(params.page));
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.search) searchParams.set('search', params.search);
  if (params.status) searchParams.set('status', params.status);
  if (params.segment) searchParams.set('segment', params.segment);
  if (params.assignedToId) searchParams.set('assignedToId', params.assignedToId);
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);

  const query = searchParams.toString();
  const endpoint = `/clients${query ? `?${query}` : ''}`;

  return api.get<ClientListResponse>(endpoint);
}

/**
 * Get a single client by ID.
 */
export async function getClient(id: string): Promise<Client> {
  return api.get<Client>(`/clients/${id}`);
}

/**
 * Get all distinct segments.
 */
export async function getSegments(): Promise<string[]> {
  return api.get<string[]>('/clients/segments');
}

/**
 * Get client statistics by status.
 */
export async function getClientStats(): Promise<ClientStats[]> {
  return api.get<ClientStats[]>('/clients/stats');
}

// ─────────────────────────────────────────
// Write Operations
// ─────────────────────────────────────────

/**
 * Create a new client.
 */
export async function createClient(data: CreateClientInput): Promise<Client> {
  return api.post<Client>('/clients', data);
}

/**
 * Update an existing client.
 */
export async function updateClient(id: string, data: UpdateClientInput): Promise<Client> {
  return api.patch<Client>(`/clients/${id}`, data);
}

/**
 * Delete a client.
 */
export async function deleteClient(id: string): Promise<void> {
  await api.delete(`/clients/${id}`);
}

// ─────────────────────────────────────────
// Bulk Operations
// ─────────────────────────────────────────

/**
 * Bulk update status for multiple clients.
 */
export async function bulkUpdateStatus(
  clientIds: string[],
  status: string
): Promise<{ updatedCount: number }> {
  return api.post<{ updatedCount: number }>('/clients/bulk/status', {
    clientIds,
    status,
  });
}

/**
 * Bulk assign clients to a user.
 */
export async function bulkAssign(
  clientIds: string[],
  assignedToId: string | null
): Promise<{ updatedCount: number }> {
  return api.post<{ updatedCount: number }>('/clients/bulk/assign', {
    clientIds,
    assignedToId,
  });
}

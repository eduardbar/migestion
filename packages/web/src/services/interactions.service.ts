import { api } from './api';
import type { Interaction, InteractionType, PaginationMeta } from '@/types';

/**
 * Interactions service.
 * Handles all interaction-related API calls.
 */

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

export interface InteractionListParams {
  page?: number;
  limit?: number;
  clientId?: string;
  userId?: string;
  type?: InteractionType;
  startDate?: string;
  endDate?: string;
  sortBy?: 'createdAt' | 'type';
  sortOrder?: 'asc' | 'desc';
}

export interface InteractionListResponse {
  interactions: Interaction[];
  meta: PaginationMeta;
}

export interface CreateInteractionInput {
  clientId: string;
  type: InteractionType;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateInteractionInput {
  type?: InteractionType;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface InteractionStats {
  total: number;
  byType: Record<InteractionType, number>;
  recentCount: number;
}

// ─────────────────────────────────────────
// Read Operations
// ─────────────────────────────────────────

/**
 * Get a list of interactions with filtering and pagination.
 */
export async function getInteractions(
  params: InteractionListParams = {}
): Promise<InteractionListResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.set('page', String(params.page));
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.clientId) searchParams.set('clientId', params.clientId);
  if (params.userId) searchParams.set('userId', params.userId);
  if (params.type) searchParams.set('type', params.type);
  if (params.startDate) searchParams.set('startDate', params.startDate);
  if (params.endDate) searchParams.set('endDate', params.endDate);
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);

  const query = searchParams.toString();
  const endpoint = `/interactions${query ? `?${query}` : ''}`;
  
  return api.get<InteractionListResponse>(endpoint);
}

/**
 * Get a single interaction by ID.
 */
export async function getInteraction(id: string): Promise<Interaction> {
  return api.get<Interaction>(`/interactions/${id}`);
}

/**
 * Get interactions for a specific client (timeline).
 */
export async function getClientTimeline(
  clientId: string,
  params: { page?: number; limit?: number } = {}
): Promise<InteractionListResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.set('page', String(params.page));
  if (params.limit) searchParams.set('limit', String(params.limit));

  const query = searchParams.toString();
  const endpoint = `/clients/${clientId}/interactions${query ? `?${query}` : ''}`;
  
  return api.get<InteractionListResponse>(endpoint);
}

/**
 * Get interaction statistics.
 */
export async function getInteractionStats(): Promise<InteractionStats> {
  return api.get<InteractionStats>('/interactions/stats');
}

// ─────────────────────────────────────────
// Write Operations
// ─────────────────────────────────────────

/**
 * Create a new interaction.
 */
export async function createInteraction(data: CreateInteractionInput): Promise<Interaction> {
  return api.post<Interaction>('/interactions', data);
}

/**
 * Update an existing interaction.
 */
export async function updateInteraction(
  id: string,
  data: UpdateInteractionInput
): Promise<Interaction> {
  return api.patch<Interaction>(`/interactions/${id}`, data);
}

/**
 * Delete an interaction.
 */
export async function deleteInteraction(id: string): Promise<void> {
  return api.delete(`/interactions/${id}`);
}

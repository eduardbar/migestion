import { api } from './api';
import type { User, UserRole, PaginationMeta } from '@/types';

/**
 * Users/Team service.
 * Handles all user and team management API calls.
 */

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

export interface TeamMember extends User {
  lastLoginAt: string | null;
}

export interface TeamListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive' | 'pending';
  role?: UserRole;
  sortBy?: 'firstName' | 'lastName' | 'email' | 'role' | 'createdAt' | 'lastLoginAt';
  sortOrder?: 'asc' | 'desc';
}

export interface TeamListResponse {
  users: TeamMember[];
  meta: PaginationMeta;
}

export interface InviteUserInput {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  status?: 'active' | 'inactive';
}

export interface ChangeRoleInput {
  role: UserRole;
}

export interface TeamStats {
  total: number;
  active: number;
  pending: number;
  byRole: Record<UserRole, number>;
}

// ─────────────────────────────────────────
// Read Operations
// ─────────────────────────────────────────

/**
 * Get a list of team members with filtering and pagination.
 */
export async function getTeamMembers(params: TeamListParams = {}): Promise<TeamListResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set('page', String(params.page));
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.search) searchParams.set('search', params.search);
  if (params.status) searchParams.set('status', params.status);
  if (params.role) searchParams.set('role', params.role);
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);

  const query = searchParams.toString();
  const endpoint = `/users${query ? `?${query}` : ''}`;

  return api.get<TeamListResponse>(endpoint);
}

/**
 * Get a single team member by ID.
 */
export async function getTeamMember(id: string): Promise<TeamMember> {
  return api.get<TeamMember>(`/users/${id}`);
}

/**
 * Get team statistics.
 */
export async function getTeamStats(): Promise<TeamStats> {
  return api.get<TeamStats>('/users/stats');
}

/**
 * Get list of active team members for assignment dropdowns.
 */
export async function getActiveMembers(): Promise<TeamMember[]> {
  const response = await api.get<TeamListResponse>('/users?status=active&limit=100');
  return response.users;
}

// ─────────────────────────────────────────
// Write Operations
// ─────────────────────────────────────────

/**
 * Invite a new user to the team.
 */
export async function inviteUser(data: InviteUserInput): Promise<TeamMember> {
  return api.post<TeamMember>('/users/invite', data);
}

/**
 * Update a team member's information.
 */
export async function updateUser(id: string, data: UpdateUserInput): Promise<TeamMember> {
  return api.patch<TeamMember>(`/users/${id}`, data);
}

/**
 * Change a user's role.
 */
export async function changeUserRole(id: string, data: ChangeRoleInput): Promise<TeamMember> {
  return api.patch<TeamMember>(`/users/${id}/role`, data);
}

/**
 * Deactivate a user.
 */
export async function deactivateUser(id: string): Promise<TeamMember> {
  return api.patch<TeamMember>(`/users/${id}/status`, { status: 'inactive' });
}

/**
 * Reactivate a user.
 */
export async function reactivateUser(id: string): Promise<TeamMember> {
  return api.patch<TeamMember>(`/users/${id}/status`, { status: 'active' });
}

/**
 * Remove a user from the team.
 */
export async function removeUser(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}

/**
 * Resend invitation email to a pending user.
 */
export async function resendInvitation(id: string): Promise<{ message: string }> {
  return api.post<{ message: string }>(`/users/${id}/resend-invite`);
}

// ─────────────────────────────────────────
// Profile Operations
// ─────────────────────────────────────────

export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string | null;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

/**
 * Get current user's profile.
 */
export async function getProfile(): Promise<User> {
  return api.get<User>('/users/me');
}

/**
 * Update current user's profile.
 */
export async function updateProfile(data: UpdateProfileInput): Promise<User> {
  return api.patch<User>('/users/me', data);
}

/**
 * Change current user's password.
 */
export async function changePassword(data: ChangePasswordInput): Promise<{ message: string }> {
  return api.post<{ message: string }>('/users/me/password', data);
}

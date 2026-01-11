/**
 * Shared type definitions for the application.
 */

// ─────────────────────────────────────────
// API Response Types
// ─────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    errors?: Record<string, string[]>;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ─────────────────────────────────────────
// Auth Types
// ─────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: string;
  avatarUrl: string | null;
  createdAt: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  status: string;
  createdAt: string;
}

export type UserRole = 'owner' | 'admin' | 'manager' | 'user';

export interface AuthState {
  user: User | null;
  tenant: Tenant | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  companyName: string;
  slug: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  tenant: Tenant;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface TokenRefreshResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

// ─────────────────────────────────────────
// Client Types
// ─────────────────────────────────────────

export interface Client {
  id: string;
  companyName: string;
  contactName: string;
  email: string | null;
  phone: string | null;
  status: ClientStatus;
  segment: string | null;
  tags: string[];
  address: string | null;
  notes: string | null;
  assignedTo: AssignedUser | null;
  createdAt: string;
  updatedAt: string;
}

export interface AssignedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type ClientStatus = 'active' | 'inactive' | 'prospect' | 'churned';

export interface CreateClientInput {
  companyName: string;
  contactName: string;
  email?: string;
  phone?: string;
  status?: ClientStatus;
  segment?: string;
  tags?: string[];
  address?: string;
  notes?: string;
  assignedToId?: string;
}

export interface UpdateClientInput {
  companyName?: string;
  contactName?: string;
  email?: string | null;
  phone?: string | null;
  status?: ClientStatus;
  segment?: string | null;
  tags?: string[];
  address?: string | null;
  notes?: string | null;
  assignedToId?: string | null;
}

export interface ClientListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: ClientStatus;
  segment?: string;
  assignedToId?: string;
  sortBy?: 'companyName' | 'contactName' | 'createdAt' | 'updatedAt' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface ClientListResponse {
  clients: Client[];
  meta: PaginationMeta;
}

export interface ClientStats {
  status: string;
  count: number;
}

// ─────────────────────────────────────────
// Interaction Types
// ─────────────────────────────────────────

export interface Interaction {
  id: string;
  clientId: string;
  userId: string;
  type: InteractionType;
  notes: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  user: User;
}

export type InteractionType = 'call' | 'email' | 'meeting' | 'note' | 'task';

// ─────────────────────────────────────────
// Notification Types
// ─────────────────────────────────────────

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string | null;
  data: Record<string, unknown> | null;
  read: boolean;
  createdAt: string;
}

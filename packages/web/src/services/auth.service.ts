import { api } from './api';
import { STORAGE_KEYS } from '@/lib/constants';
import type { 
  AuthResponse, 
  TokenRefreshResponse, 
  LoginCredentials, 
  RegisterData,
  User,
  Tenant,
} from '@/types';

/**
 * Authentication service.
 * Handles all auth-related API calls.
 */

export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/register', data, { skipAuth: true });
  storeAuthData(response);
  return response;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/login', credentials, { skipAuth: true });
  storeAuthData(response);
  return response;
}

export async function refreshToken(token: string): Promise<TokenRefreshResponse> {
  const response = await api.post<TokenRefreshResponse>(
    '/auth/refresh',
    { refreshToken: token },
    { skipAuth: true }
  );
  
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
  
  return response;
}

export async function logout(refreshToken?: string): Promise<void> {
  try {
    if (refreshToken) {
      await api.post('/auth/logout', { refreshToken });
    }
  } finally {
    clearAuthData();
  }
}

export async function logoutAll(): Promise<void> {
  try {
    await api.post('/auth/logout-all');
  } finally {
    clearAuthData();
  }
}

export async function getCurrentUser(): Promise<{ user: User; tenant: Tenant }> {
  return api.get('/auth/me');
}

// ─────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────

function storeAuthData(response: AuthResponse): void {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
  localStorage.setItem(STORAGE_KEYS.TENANT, JSON.stringify(response.tenant));
}

function clearAuthData(): void {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.TENANT);
}

export function getStoredUser(): User | null {
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : null;
}

export function getStoredTenant(): Tenant | null {
  const data = localStorage.getItem(STORAGE_KEYS.TENANT);
  return data ? JSON.parse(data) : null;
}

export function getStoredAccessToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

export function isAuthenticated(): boolean {
  return !!getStoredAccessToken();
}

/**
 * Application constants.
 */

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const API_VERSION = 'v1';
export const API_BASE = `${API_URL}/api/${API_VERSION}`;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'migestion_access_token',
  REFRESH_TOKEN: 'migestion_refresh_token',
  USER: 'migestion_user',
  TENANT: 'migestion_tenant',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CLIENTS: '/clients',
  CLIENT_DETAIL: '/clients/:id',
  INTERACTIONS: '/interactions',
  REPORTS: '/reports',
  SETTINGS: '/settings',
  TEAM: '/team',
  NOTIFICATIONS: '/notifications',
  AUDIT: '/audit',
} as const;

export const CLIENT_STATUS_LABELS: Record<string, string> = {
  active: 'Activo',
  inactive: 'Inactivo',
  prospect: 'Prospecto',
  churned: 'Perdido',
};

export const CLIENT_STATUS_COLORS: Record<string, string> = {
  active: 'bg-success-50 text-success-700',
  inactive: 'bg-neutral-100 text-neutral-600',
  prospect: 'bg-primary-50 text-primary-700',
  churned: 'bg-error-50 text-error-700',
};

export const INTERACTION_TYPE_LABELS: Record<string, string> = {
  call: 'Llamada',
  email: 'Email',
  meeting: 'Reunión',
  note: 'Nota',
  task: 'Tarea',
};

export const ROLE_LABELS: Record<string, string> = {
  owner: 'Propietario',
  admin: 'Administrador',
  manager: 'Gerente',
  user: 'Usuario',
};

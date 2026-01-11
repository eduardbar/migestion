/**
 * User DTOs - Data Transfer Objects.
 * Transform database entities to API responses.
 * 
 * @remarks
 * DTOs decouple internal data structures from API contracts,
 * ensuring we never expose sensitive fields like passwordHash.
 */

import type { User, Client } from '@prisma/client';

// ─────────────────────────────────────────
// User DTO (standard response)
// ─────────────────────────────────────────
export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  status: string;
  avatarUrl: string | null;
  lastLoginAt: string | null;
  createdAt: string;
}

export function toUserDto(user: User): UserDto {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: `${user.firstName} ${user.lastName}`,
    role: user.role,
    status: user.status,
    avatarUrl: user.avatarUrl,
    lastLoginAt: user.lastLoginAt?.toISOString() ?? null,
    createdAt: user.createdAt.toISOString(),
  };
}

// ─────────────────────────────────────────
// User with Stats DTO (includes client count)
// ─────────────────────────────────────────
export interface UserWithStatsDto extends UserDto {
  assignedClientsCount: number;
}

type UserWithClients = User & {
  assignedClients: Client[];
};

type UserWithClientCount = User & {
  _count: {
    assignedClients: number;
  };
};

export function toUserWithStatsDto(user: UserWithClients | UserWithClientCount): UserWithStatsDto {
  const base = toUserDto(user);
  
  // Handle both relation include and count select patterns
  const clientCount = '_count' in user 
    ? user._count.assignedClients 
    : user.assignedClients?.length ?? 0;

  return {
    ...base,
    assignedClientsCount: clientCount,
  };
}

// ─────────────────────────────────────────
// User List DTO (paginated response)
// ─────────────────────────────────────────
export interface UserListDto {
  data: UserWithStatsDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export function toUserListDto(
  users: (UserWithClients | UserWithClientCount)[],
  page: number,
  limit: number,
  total: number
): UserListDto {
  const totalPages = Math.ceil(total / limit);
  
  return {
    data: users.map(toUserWithStatsDto),
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  };
}

// ─────────────────────────────────────────
// Team Stats DTO
// ─────────────────────────────────────────
export interface TeamStatsDto {
  totalUsers: number;
  byRole: { role: string; count: number }[];
  byStatus: { status: string; count: number }[];
  recentlyActive: number; // Users active in last 7 days
}

/**
 * User service - business logic layer.
 * Orchestrates team management operations with validation and authorization.
 * 
 * @remarks
 * Service functions contain business rules including:
 * - Role hierarchy enforcement (can't modify users with higher roles)
 * - Owner protection (can't delete/demote the owner)
 * - Self-modification restrictions
 */

import * as usersRepository from './users.repository.js';
import {
  toUserWithStatsDto,
  toUserListDto,
  type UserWithStatsDto,
  type UserListDto,
  type TeamStatsDto,
} from './users.dto.js';
import type {
  InviteUserInput,
  UpdateProfileInput,
  UpdateUserRoleInput,
  UpdateUserStatusInput,
  ChangePasswordInput,
  ListUsersQuery,
} from './users.validator.js';
import { NotFoundError, BadRequestError, ForbiddenError } from '../../shared/errors/app-error.js';
import { hashPassword, verifyPassword } from '../../shared/utils/password.js';
import { ROLES, ROLE_HIERARCHY, USER_STATUS, DEFAULTS, type Role } from '../../config/constants.js';
import { randomBytes } from 'crypto';

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

/**
 * Context for user management operations.
 * Groups actor-related parameters to reduce function parameter count.
 */
interface ActorContext {
  tenantId: string;
  actorId: string;
  actorRole: Role;
}

// ─────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────

/**
 * Check if the actor can manage the target user based on role hierarchy.
 */
function canManageUser(actorRole: Role, targetRole: Role): boolean {
  return ROLE_HIERARCHY[actorRole] > ROLE_HIERARCHY[targetRole];
}

/**
 * Generate a temporary password for invited users.
 */
function generateTempPassword(): string {
  return randomBytes(DEFAULTS.TEMP_PASSWORD_BYTES)
    .toString('base64')
    .slice(0, DEFAULTS.TEMP_PASSWORD_LENGTH);
}

/**
 * Validates that an actor can perform management operations on a target user.
 * Extracts common validation logic shared by updateRole, updateStatus, and remove.
 * 
 * @throws ForbiddenError if trying to modify self
 * @throws NotFoundError if target user doesn't exist
 * @throws ForbiddenError if trying to modify owner
 * @throws ForbiddenError if actor can't manage users with target's role
 */
async function validateUserManagementPermissions(
  context: ActorContext,
  targetUserId: string,
  action: 'modify' | 'delete'
): Promise<{ targetUser: Awaited<ReturnType<typeof usersRepository.findById>> }> {
  const { tenantId, actorId, actorRole } = context;
  
  // Can't perform action on self
  if (actorId === targetUserId) {
    const selfActionMessage = action === 'delete' 
      ? 'You cannot delete your own account'
      : 'You cannot change your own role or status';
    throw new ForbiddenError(selfActionMessage);
  }

  const targetUser = await usersRepository.findById(tenantId, targetUserId);
  if (!targetUser) {
    throw new NotFoundError('User');
  }

  // Can't modify/delete owner
  if (targetUser.role === ROLES.OWNER) {
    const ownerMessage = action === 'delete'
      ? 'Cannot delete the owner account'
      : 'Cannot change the owner\'s role or status';
    throw new ForbiddenError(ownerMessage);
  }

  // Can't modify/delete users with equal or higher role
  if (!canManageUser(actorRole, targetUser.role as Role)) {
    throw new ForbiddenError('You cannot modify users with a role equal to or higher than yours');
  }

  return { targetUser };
}

// ─────────────────────────────────────────
// Read Operations
// ─────────────────────────────────────────

/**
 * Get a single user by ID.
 * @throws NotFoundError if user doesn't exist
 */
export async function getById(
  tenantId: string,
  userId: string
): Promise<UserWithStatsDto> {
  const user = await usersRepository.findById(tenantId, userId);

  if (!user) {
    throw new NotFoundError('User');
  }

  return toUserWithStatsDto(user);
}

/**
 * List team members with filtering and pagination.
 */
export async function list(
  tenantId: string,
  query: ListUsersQuery
): Promise<UserListDto> {
  const { users, total } = await usersRepository.findMany({
    tenantId,
    page: query.page,
    limit: query.limit,
    search: query.search,
    status: query.status,
    role: query.role,
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
  });

  return toUserListDto(users, query.page, query.limit, total);
}

/**
 * Get team statistics.
 */
export async function getTeamStats(tenantId: string): Promise<TeamStatsDto> {
  return usersRepository.getTeamStats(tenantId);
}

// ─────────────────────────────────────────
// Write Operations
// ─────────────────────────────────────────

/**
 * Invite a new team member.
 * Creates user with temporary password and pending status.
 * 
 * @throws BadRequestError if email already exists
 * @throws ForbiddenError if actor can't create users with that role
 */
export async function invite(
  tenantId: string,
  actorId: string,
  actorRole: Role,
  input: InviteUserInput
): Promise<UserWithStatsDto> {
  // Check if actor can create users with the requested role
  if (!canManageUser(actorRole, input.role as Role)) {
    throw new ForbiddenError('You cannot invite users with a role equal to or higher than yours');
  }

  // Check if email is already taken
  const emailTaken = await usersRepository.emailExists(tenantId, input.email);
  if (emailTaken) {
    throw new BadRequestError('A user with this email already exists', 'EMAIL_EXISTS');
  }

  // Generate temporary password (in production, send via email)
  const tempPassword = generateTempPassword();
  const passwordHash = await hashPassword(tempPassword);

  const user = await usersRepository.create({
    tenantId,
    email: input.email,
    passwordHash,
    firstName: input.firstName,
    lastName: input.lastName,
    role: input.role,
    status: USER_STATUS.PENDING,
  });

  // TODO: Send invitation email with tempPassword
  // For now, we'll include it in the response (development only)
  const dto = toUserWithStatsDto(user);
  
  return {
    ...dto,
    // @ts-expect-error - temporary field for development
    _tempPassword: tempPassword,
  };
}

/**
 * Update own profile.
 */
export async function updateProfile(
  tenantId: string,
  userId: string,
  input: UpdateProfileInput
): Promise<UserWithStatsDto> {
  const data: Record<string, unknown> = {};

  if (input.firstName !== undefined) data.firstName = input.firstName;
  if (input.lastName !== undefined) data.lastName = input.lastName;
  if (input.avatarUrl !== undefined) data.avatarUrl = input.avatarUrl || null;

  if (Object.keys(data).length === 0) {
    // No changes, just return current user
    const user = await usersRepository.findById(tenantId, userId);
    if (!user) throw new NotFoundError('User');
    return toUserWithStatsDto(user);
  }

  const user = await usersRepository.updateProfile(tenantId, userId, data as { firstName?: string; lastName?: string; avatarUrl?: string | null });
  return toUserWithStatsDto(user);
}

/**
 * Change own password.
 * @throws BadRequestError if current password is incorrect
 */
export async function changePassword(
  tenantId: string,
  userId: string,
  input: ChangePasswordInput
): Promise<void> {
  const user = await usersRepository.findByIdWithPassword(tenantId, userId);
  if (!user) {
    throw new NotFoundError('User');
  }

  const isValid = await verifyPassword(input.currentPassword, user.passwordHash);
  if (!isValid) {
    throw new BadRequestError('Current password is incorrect', 'INVALID_PASSWORD');
  }

  const newHash = await hashPassword(input.newPassword);
  await usersRepository.updatePassword(userId, newHash);
}

/**
 * Update a team member's role.
 * 
 * @throws NotFoundError if user doesn't exist
 * @throws ForbiddenError if trying to modify own role, owner, or higher-ranked user
 */
export async function updateRole(
  tenantId: string,
  actorId: string,
  actorRole: Role,
  targetUserId: string,
  input: UpdateUserRoleInput
): Promise<UserWithStatsDto> {
  const context: ActorContext = { tenantId, actorId, actorRole };
  await validateUserManagementPermissions(context, targetUserId, 'modify');

  // Additional validation: Can't promote to a role equal to or higher than own
  if (!canManageUser(actorRole, input.role as Role)) {
    throw new ForbiddenError('You cannot assign a role equal to or higher than your own');
  }

  const user = await usersRepository.updateRole(tenantId, targetUserId, input.role);
  return toUserWithStatsDto(user);
}

/**
 * Update a team member's status (activate/deactivate).
 * 
 * @throws NotFoundError if user doesn't exist
 * @throws ForbiddenError if trying to deactivate self, owner, or higher-ranked user
 */
export async function updateStatus(
  tenantId: string,
  actorId: string,
  actorRole: Role,
  targetUserId: string,
  input: UpdateUserStatusInput
): Promise<UserWithStatsDto> {
  const context: ActorContext = { tenantId, actorId, actorRole };
  await validateUserManagementPermissions(context, targetUserId, 'modify');

  const user = await usersRepository.updateStatus(tenantId, targetUserId, input.status);
  return toUserWithStatsDto(user);
}

/**
 * Delete a team member.
 * Unassigns all their clients.
 * 
 * @throws NotFoundError if user doesn't exist
 * @throws ForbiddenError if trying to delete self, owner, or higher-ranked user
 */
export async function remove(
  tenantId: string,
  actorId: string,
  actorRole: Role,
  targetUserId: string
): Promise<void> {
  const context: ActorContext = { tenantId, actorId, actorRole };
  await validateUserManagementPermissions(context, targetUserId, 'delete');

  await usersRepository.remove(tenantId, targetUserId);
}

/**
 * Transfer all clients from one user to another.
 * 
 * @returns Number of clients transferred
 */
export async function transferClients(
  tenantId: string,
  fromUserId: string,
  toUserId: string | null
): Promise<number> {
  // Verify source user exists
  const sourceExists = await usersRepository.exists(tenantId, fromUserId);
  if (!sourceExists) {
    throw new NotFoundError('Source user');
  }

  // Verify target user exists (if specified)
  if (toUserId !== null) {
    const targetExists = await usersRepository.exists(tenantId, toUserId);
    if (!targetExists) {
      throw new NotFoundError('Target user');
    }
  }

  return usersRepository.transferClients(tenantId, fromUserId, toUserId);
}

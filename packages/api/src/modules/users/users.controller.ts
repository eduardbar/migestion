/**
 * User controller - HTTP request handlers.
 * Processes requests and delegates to service layer.
 * 
 * @remarks
 * Controllers are thin - they only:
 * 1. Extract data from request
 * 2. Call service methods
 * 3. Return formatted responses
 */

import type { Request, Response, NextFunction } from 'express';
import * as usersService from './users.service.js';
import * as auditService from '../audit/audit.service.js';
import { getAuditContext } from '../../shared/middlewares/audit.middleware.js';
import { success } from '../../shared/utils/response.js';
import type {
  InviteUserInput,
  UpdateProfileInput,
  UpdateUserRoleInput,
  UpdateUserStatusInput,
  ChangePasswordInput,
  ListUsersQuery,
} from './users.validator.js';
import type { Role } from '../../config/constants.js';

// ─────────────────────────────────────────
// List Team Members
// ─────────────────────────────────────────

export async function list(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await usersService.list(req.user!.tenantId, req.query as unknown as ListUsersQuery);
    res.json(success(result));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Get Single User
// ─────────────────────────────────────────

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await usersService.getById(req.user!.tenantId, req.params.id!);
    res.json(success(user));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Get Current User Profile
// ─────────────────────────────────────────

export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await usersService.getById(req.user!.tenantId, req.user!.userId);
    res.json(success(user));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Get Team Stats
// ─────────────────────────────────────────

export async function getStats(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const stats = await usersService.getTeamStats(req.user!.tenantId);
    res.json(success(stats));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Invite New Team Member
// ─────────────────────────────────────────

export async function invite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const input = req.body as InviteUserInput;
    const user = await usersService.invite(
      req.user!.tenantId,
      req.user!.userId,
      req.user!.role as Role,
      input
    );

    // Audit: new user invited
    auditService.logCreate(getAuditContext(req), 'user', user.id, {
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      invitedBy: req.user!.userId,
    });

    res.status(201).json(success(user, 'User invited successfully'));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Update Own Profile
// ─────────────────────────────────────────

export async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const input = req.body as UpdateProfileInput;
    const user = await usersService.updateProfile(
      req.user!.tenantId,
      req.user!.userId,
      input
    );

    // Audit: profile updated
    auditService.logUpdate(getAuditContext(req), 'user', req.user!.userId, {}, {
      firstName: input.firstName,
      lastName: input.lastName,
      avatarUrl: input.avatarUrl,
    });

    res.json(success(user, 'Profile updated successfully'));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Change Own Password
// ─────────────────────────────────────────

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await usersService.changePassword(
      req.user!.tenantId,
      req.user!.userId,
      req.body as ChangePasswordInput
    );

    // Audit: password changed (don't log actual passwords)
    auditService.log(getAuditContext(req), {
      action: 'update',
      entity: 'user',
      entityId: req.user!.userId,
      newValues: { passwordChanged: true },
    });

    res.json(success(null, 'Password changed successfully'));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Update User Role (Admin Action)
// ─────────────────────────────────────────

export async function updateRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const targetUserId = req.params.id!;
    const input = req.body as UpdateUserRoleInput;
    
    // Get old role for audit
    const oldUser = await usersService.getById(req.user!.tenantId, targetUserId);
    const oldRole = oldUser.role;

    const user = await usersService.updateRole(
      req.user!.tenantId,
      req.user!.userId,
      req.user!.role as Role,
      targetUserId,
      input
    );

    // Audit: role changed
    auditService.logUpdate(getAuditContext(req), 'user', targetUserId, 
      { role: oldRole },
      { role: input.role }
    );

    res.json(success(user, 'User role updated successfully'));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Update User Status (Admin Action)
// ─────────────────────────────────────────

export async function updateStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const targetUserId = req.params.id!;
    const input = req.body as UpdateUserStatusInput;

    // Get old status for audit
    const oldUser = await usersService.getById(req.user!.tenantId, targetUserId);
    const oldStatus = oldUser.status;

    const user = await usersService.updateStatus(
      req.user!.tenantId,
      req.user!.userId,
      req.user!.role as Role,
      targetUserId,
      input
    );

    // Audit: status changed
    auditService.logUpdate(getAuditContext(req), 'user', targetUserId,
      { status: oldStatus },
      { status: input.status }
    );

    res.json(success(user, 'User status updated successfully'));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Delete User (Admin Action)
// ─────────────────────────────────────────

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const targetUserId = req.params.id!;

    // Get user info for audit before deletion
    const userToDelete = await usersService.getById(req.user!.tenantId, targetUserId);

    await usersService.remove(
      req.user!.tenantId,
      req.user!.userId,
      req.user!.role as Role,
      targetUserId
    );

    // Audit: user deleted
    auditService.logDelete(getAuditContext(req), 'user', targetUserId, {
      email: userToDelete.email,
      fullName: userToDelete.fullName,
      role: userToDelete.role,
    });

    res.json(success(null, 'User deleted successfully'));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Transfer Clients
// ─────────────────────────────────────────

interface TransferClientsBody {
  fromUserId: string;
  toUserId: string | null;
}

export async function transferClients(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body as TransferClientsBody;
    const count = await usersService.transferClients(
      req.user!.tenantId,
      body.fromUserId,
      body.toUserId
    );

    // Audit: clients transferred
    auditService.log(getAuditContext(req), {
      action: 'update',
      entity: 'client',
      newValues: {
        operation: 'bulk_transfer',
        fromUserId: body.fromUserId,
        toUserId: body.toUserId,
        count,
      },
    });

    res.json(success({ transferredCount: count }, `${count} clients transferred successfully`));
  } catch (error) {
    next(error);
  }
}

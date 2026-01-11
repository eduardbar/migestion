// Mock Prisma client BEFORE importing user modules
jest.mock('@/infrastructure/prisma/client', () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      groupBy: jest.fn(),
    },
    client: {
      updateMany: jest.fn(),
    },
    refreshToken: {
      deleteMany: jest.fn(),
    },
    $transaction: jest.fn((fn: (tx: unknown) => Promise<unknown>) => fn({
      user: {
        delete: jest.fn(),
      },
      client: {
        updateMany: jest.fn(),
      },
      refreshToken: {
        deleteMany: jest.fn(),
      },
    })),
  },
}));

// Mock password utilities
jest.mock('@/shared/utils/password', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashed-password'),
  verifyPassword: jest.fn(),
  comparePassword: jest.fn(),
}));

import * as usersService from '@/modules/users/users.service';
import * as usersRepository from '@/modules/users/users.repository';
import { verifyPassword } from '@/shared/utils/password';
import { AppError } from '@/shared/errors';
import { ROLES } from '@/config/constants';

// Mock the repository
jest.mock('@/modules/users/users.repository');

const mockUsersRepository = usersRepository as jest.Mocked<typeof usersRepository>;
const mockVerifyPassword = verifyPassword as jest.MockedFunction<typeof verifyPassword>;

/**
 * Helper to verify AppError with specific code
 */
async function expectAppError(
  promise: Promise<unknown>,
  expectedCode: string
): Promise<void> {
  try {
    await promise;
    fail('Should have thrown an error');
  } catch (error) {
    expect(error).toBeInstanceOf(AppError);
    expect((error as AppError).code).toBe(expectedCode);
  }
}

/**
 * Unit tests for users service.
 */
describe('UsersService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const tenantId = 'tenant-123';
  const actorId = 'actor-user-id';

  const mockUser = {
    id: 'user-456',
    tenantId,
    email: 'user@company.com',
    passwordHash: 'hashed',
    firstName: 'John',
    lastName: 'Doe',
    role: ROLES.USER,
    status: 'active',
    avatarUrl: null,
    lastLoginAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUserWithCount = {
    ...mockUser,
    _count: {
      assignedClients: 5,
    },
  };

  describe('getById', () => {
    it('should return user with stats', async () => {
      mockUsersRepository.findById.mockResolvedValue(mockUserWithCount);

      const result = await usersService.getById(tenantId, 'user-456');

      expect(result).toBeDefined();
      expect(result.id).toBe('user-456');
      expect(result.email).toBe('user@company.com');
      expect(result.fullName).toBe('John Doe');
      expect(result.assignedClientsCount).toBe(5);
      expect(mockUsersRepository.findById).toHaveBeenCalledWith(tenantId, 'user-456');
    });

    it('should throw NOT_FOUND if user does not exist', async () => {
      mockUsersRepository.findById.mockResolvedValue(null);

      await expectAppError(
        usersService.getById(tenantId, 'non-existent'),
        'NOT_FOUND'
      );
    });
  });

  describe('list', () => {
    const query = {
      page: 1,
      limit: 20,
      sortBy: 'createdAt' as const,
      sortOrder: 'desc' as const,
    };

    it('should return paginated user list', async () => {
      mockUsersRepository.findMany.mockResolvedValue({
        users: [mockUserWithCount],
        total: 1,
      });

      const result = await usersService.list(tenantId, query);

      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
      expect(result.pagination.page).toBe(1);
    });

    it('should pass filters to repository', async () => {
      const filteredQuery = {
        ...query,
        search: 'john',
        status: 'active' as const,
        role: ROLES.USER,
      };

      mockUsersRepository.findMany.mockResolvedValue({
        users: [],
        total: 0,
      });

      await usersService.list(tenantId, filteredQuery);

      expect(mockUsersRepository.findMany).toHaveBeenCalledWith({
        tenantId,
        page: 1,
        limit: 20,
        search: 'john',
        status: 'active',
        role: ROLES.USER,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      });
    });
  });

  describe('getTeamStats', () => {
    it('should return team statistics', async () => {
      const mockStats = {
        totalUsers: 10,
        byRole: [
          { role: ROLES.ADMIN, count: 2 },
          { role: ROLES.USER, count: 8 },
        ],
        byStatus: [
          { status: 'active', count: 9 },
          { status: 'inactive', count: 1 },
        ],
        recentlyActive: 7,
      };

      mockUsersRepository.getTeamStats.mockResolvedValue(mockStats);

      const result = await usersService.getTeamStats(tenantId);

      expect(result).toEqual(mockStats);
    });
  });

  describe('invite', () => {
    const inviteInput = {
      email: 'new@company.com',
      firstName: 'New',
      lastName: 'User',
      role: ROLES.USER,
    };

    it('should create a new invited user', async () => {
      mockUsersRepository.emailExists.mockResolvedValue(false);
      mockUsersRepository.create.mockResolvedValue({
        ...mockUserWithCount,
        email: inviteInput.email,
        firstName: inviteInput.firstName,
        lastName: inviteInput.lastName,
        status: 'pending',
      });

      const result = await usersService.invite(
        tenantId,
        actorId,
        ROLES.ADMIN,
        inviteInput
      );

      expect(result.email).toBe('new@company.com');
      expect(mockUsersRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          tenantId,
          email: inviteInput.email,
          firstName: inviteInput.firstName,
          lastName: inviteInput.lastName,
          role: ROLES.USER,
          status: 'pending',
        })
      );
    });

    it('should throw EMAIL_EXISTS if email is taken', async () => {
      mockUsersRepository.emailExists.mockResolvedValue(true);

      await expectAppError(
        usersService.invite(tenantId, actorId, ROLES.ADMIN, inviteInput),
        'EMAIL_EXISTS'
      );
      expect(mockUsersRepository.create).not.toHaveBeenCalled();
    });

    it('should throw FORBIDDEN if actor tries to invite higher role', async () => {
      const adminInvite = { ...inviteInput, role: ROLES.ADMIN };

      // Manager cannot invite Admin
      await expectAppError(
        usersService.invite(tenantId, actorId, ROLES.MANAGER, adminInvite),
        'FORBIDDEN'
      );
    });

    it('should throw FORBIDDEN if actor tries to invite equal role', async () => {
      const managerInvite = { ...inviteInput, role: ROLES.MANAGER };

      // Manager cannot invite Manager
      await expectAppError(
        usersService.invite(tenantId, actorId, ROLES.MANAGER, managerInvite),
        'FORBIDDEN'
      );
    });
  });

  describe('updateProfile', () => {
    const profileInput = {
      firstName: 'Updated',
      lastName: 'Name',
    };

    it('should update user profile', async () => {
      mockUsersRepository.updateProfile.mockResolvedValue({
        ...mockUserWithCount,
        firstName: 'Updated',
        lastName: 'Name',
      });

      const result = await usersService.updateProfile(tenantId, actorId, profileInput);

      expect(result.firstName).toBe('Updated');
      expect(result.lastName).toBe('Name');
    });

    it('should return current user if no changes', async () => {
      mockUsersRepository.findById.mockResolvedValue(mockUserWithCount);

      const result = await usersService.updateProfile(tenantId, actorId, {});

      expect(result).toBeDefined();
      expect(mockUsersRepository.updateProfile).not.toHaveBeenCalled();
    });
  });

  describe('changePassword', () => {
    const passwordInput = {
      currentPassword: 'old-password',
      newPassword: 'NewPassword123',
    };

    it('should change password when current is correct', async () => {
      mockUsersRepository.findByIdWithPassword.mockResolvedValue({
        id: actorId,
        passwordHash: 'hashed-old',
      });
      mockVerifyPassword.mockResolvedValue(true);
      mockUsersRepository.updatePassword.mockResolvedValue(mockUser);

      await usersService.changePassword(tenantId, actorId, passwordInput);

      expect(mockUsersRepository.updatePassword).toHaveBeenCalledWith(
        actorId,
        'hashed-password'
      );
    });

    it('should throw INVALID_PASSWORD if current password is wrong', async () => {
      mockUsersRepository.findByIdWithPassword.mockResolvedValue({
        id: actorId,
        passwordHash: 'hashed-old',
      });
      mockVerifyPassword.mockResolvedValue(false);

      await expectAppError(
        usersService.changePassword(tenantId, actorId, passwordInput),
        'INVALID_PASSWORD'
      );
      expect(mockUsersRepository.updatePassword).not.toHaveBeenCalled();
    });

    it('should throw NOT_FOUND if user does not exist', async () => {
      mockUsersRepository.findByIdWithPassword.mockResolvedValue(null);

      await expectAppError(
        usersService.changePassword(tenantId, actorId, passwordInput),
        'NOT_FOUND'
      );
    });
  });

  describe('updateRole', () => {
    const roleInput = { role: ROLES.MANAGER };

    it('should update user role', async () => {
      mockUsersRepository.findById.mockResolvedValue(mockUserWithCount);
      mockUsersRepository.updateRole.mockResolvedValue({
        ...mockUserWithCount,
        role: ROLES.MANAGER,
      });

      const result = await usersService.updateRole(
        tenantId,
        actorId,
        ROLES.ADMIN,
        'user-456',
        roleInput
      );

      expect(result.role).toBe(ROLES.MANAGER);
    });

    it('should throw FORBIDDEN when trying to change own role', async () => {
      await expectAppError(
        usersService.updateRole(tenantId, actorId, ROLES.ADMIN, actorId, roleInput),
        'FORBIDDEN'
      );
    });

    it('should throw FORBIDDEN when trying to change owner role', async () => {
      mockUsersRepository.findById.mockResolvedValue({
        ...mockUserWithCount,
        role: ROLES.OWNER,
      });

      await expectAppError(
        usersService.updateRole(tenantId, actorId, ROLES.ADMIN, 'owner-id', roleInput),
        'FORBIDDEN'
      );
    });

    it('should throw FORBIDDEN when manager tries to modify admin', async () => {
      mockUsersRepository.findById.mockResolvedValue({
        ...mockUserWithCount,
        role: ROLES.ADMIN,
      });

      await expectAppError(
        usersService.updateRole(tenantId, actorId, ROLES.MANAGER, 'admin-id', roleInput),
        'FORBIDDEN'
      );
    });

    it('should throw FORBIDDEN when trying to promote to equal role', async () => {
      mockUsersRepository.findById.mockResolvedValue(mockUserWithCount);
      const adminRoleInput = { role: ROLES.ADMIN };

      // Admin cannot promote to Admin
      await expectAppError(
        usersService.updateRole(tenantId, actorId, ROLES.ADMIN, 'user-456', adminRoleInput),
        'FORBIDDEN'
      );
    });
  });

  describe('updateStatus', () => {
    const statusInput = { status: 'inactive' as const };

    it('should update user status', async () => {
      mockUsersRepository.findById.mockResolvedValue(mockUserWithCount);
      mockUsersRepository.updateStatus.mockResolvedValue({
        ...mockUserWithCount,
        status: 'inactive',
      });

      const result = await usersService.updateStatus(
        tenantId,
        actorId,
        ROLES.ADMIN,
        'user-456',
        statusInput
      );

      expect(result.status).toBe('inactive');
    });

    it('should throw FORBIDDEN when trying to change own status', async () => {
      await expectAppError(
        usersService.updateStatus(tenantId, actorId, ROLES.ADMIN, actorId, statusInput),
        'FORBIDDEN'
      );
    });

    it('should throw FORBIDDEN when trying to change owner status', async () => {
      mockUsersRepository.findById.mockResolvedValue({
        ...mockUserWithCount,
        role: ROLES.OWNER,
      });

      await expectAppError(
        usersService.updateStatus(tenantId, actorId, ROLES.ADMIN, 'owner-id', statusInput),
        'FORBIDDEN'
      );
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      mockUsersRepository.findById.mockResolvedValue(mockUserWithCount);
      mockUsersRepository.remove.mockResolvedValue(mockUser);

      await usersService.remove(tenantId, actorId, ROLES.ADMIN, 'user-456');

      expect(mockUsersRepository.remove).toHaveBeenCalledWith(tenantId, 'user-456');
    });

    it('should throw FORBIDDEN when trying to delete self', async () => {
      await expectAppError(
        usersService.remove(tenantId, actorId, ROLES.ADMIN, actorId),
        'FORBIDDEN'
      );
    });

    it('should throw FORBIDDEN when trying to delete owner', async () => {
      mockUsersRepository.findById.mockResolvedValue({
        ...mockUserWithCount,
        role: ROLES.OWNER,
      });

      await expectAppError(
        usersService.remove(tenantId, actorId, ROLES.ADMIN, 'owner-id'),
        'FORBIDDEN'
      );
    });

    it('should throw FORBIDDEN when manager tries to delete admin', async () => {
      mockUsersRepository.findById.mockResolvedValue({
        ...mockUserWithCount,
        role: ROLES.ADMIN,
      });

      await expectAppError(
        usersService.remove(tenantId, actorId, ROLES.MANAGER, 'admin-id'),
        'FORBIDDEN'
      );
    });

    it('should throw NOT_FOUND if user does not exist', async () => {
      mockUsersRepository.findById.mockResolvedValue(null);

      await expectAppError(
        usersService.remove(tenantId, actorId, ROLES.ADMIN, 'non-existent'),
        'NOT_FOUND'
      );
    });
  });

  describe('transferClients', () => {
    it('should transfer clients between users', async () => {
      mockUsersRepository.exists.mockResolvedValue(true);
      mockUsersRepository.transferClients.mockResolvedValue(5);

      const result = await usersService.transferClients(tenantId, 'user-1', 'user-2');

      expect(result).toBe(5);
      expect(mockUsersRepository.transferClients).toHaveBeenCalledWith(
        tenantId,
        'user-1',
        'user-2'
      );
    });

    it('should allow transferring to null (unassign)', async () => {
      mockUsersRepository.exists.mockResolvedValue(true);
      mockUsersRepository.transferClients.mockResolvedValue(3);

      const result = await usersService.transferClients(tenantId, 'user-1', null);

      expect(result).toBe(3);
    });

    it('should throw NOT_FOUND if source user does not exist', async () => {
      mockUsersRepository.exists.mockResolvedValueOnce(false);

      await expectAppError(
        usersService.transferClients(tenantId, 'non-existent', 'user-2'),
        'NOT_FOUND'
      );
    });

    it('should throw NOT_FOUND if target user does not exist', async () => {
      mockUsersRepository.exists
        .mockResolvedValueOnce(true)  // source exists
        .mockResolvedValueOnce(false); // target does not exist

      await expectAppError(
        usersService.transferClients(tenantId, 'user-1', 'non-existent'),
        'NOT_FOUND'
      );
    });
  });
});

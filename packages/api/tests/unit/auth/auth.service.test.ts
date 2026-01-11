// Mock Prisma client BEFORE importing auth modules
jest.mock('@/infrastructure/prisma/client', () => ({
  prisma: {
    tenant: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    refreshToken: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
    $transaction: jest.fn((fn: (tx: unknown) => Promise<unknown>) => fn({
      tenant: { create: jest.fn() },
      user: { create: jest.fn() },
    })),
  },
}));

import * as authService from '@/modules/auth/auth.service';
import * as authRepository from '@/modules/auth/auth.repository';
import * as passwordUtils from '@/shared/utils/password';
import * as jwtUtils from '@/shared/utils/jwt';
import { AppError } from '@/shared/errors';

// Mock the repository
jest.mock('@/modules/auth/auth.repository');
jest.mock('@/shared/utils/password');
jest.mock('@/shared/utils/jwt');

const mockAuthRepository = authRepository as jest.Mocked<typeof authRepository>;
const mockPasswordUtils = passwordUtils as jest.Mocked<typeof passwordUtils>;
const mockJwtUtils = jwtUtils as jest.Mocked<typeof jwtUtils>;

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
 * Unit tests for auth service.
 */
describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    const registerInput = {
      companyName: 'Test Company',
      slug: 'test-company',
      email: 'test@example.com',
      password: 'Password123',
      firstName: 'John',
      lastName: 'Doe',
    };

    const mockTenant = {
      id: 'tenant-123',
      name: 'Test Company',
      slug: 'test-company',
      status: 'active',
      settings: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockUser = {
      id: 'user-456',
      tenantId: 'tenant-123',
      email: 'test@example.com',
      passwordHash: 'hashed-password',
      firstName: 'John',
      lastName: 'Doe',
      role: 'owner',
      status: 'active',
      avatarUrl: null,
      lastLoginAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockTokenPair = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      accessTokenExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
      refreshTokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    it('should register a new tenant with owner', async () => {
      mockAuthRepository.findTenantBySlug.mockResolvedValue(null);
      mockAuthRepository.findUserByEmailAcrossTenants.mockResolvedValue(null);
      mockPasswordUtils.hashPassword.mockResolvedValue('hashed-password');
      mockAuthRepository.createTenantWithOwner.mockResolvedValue({
        tenant: mockTenant,
        user: mockUser,
      });
      mockJwtUtils.generateTokenPair.mockReturnValue(mockTokenPair);
      mockJwtUtils.hashToken.mockReturnValue('hashed-refresh-token');
      mockAuthRepository.createRefreshToken.mockResolvedValue({
        id: 'token-id',
        userId: mockUser.id,
        tokenHash: 'hashed-refresh-token',
        expiresAt: mockTokenPair.refreshTokenExpiresAt,
        createdAt: new Date(),
        revokedAt: null,
      });

      const result = await authService.register(registerInput);

      expect(result).toBeDefined();
      expect(result.user.email).toBe(registerInput.email);
      expect(result.tenant.slug).toBe(registerInput.slug);
      expect(result.accessToken).toBe('access-token');
      expect(result.refreshToken).toBe('refresh-token');
      expect(mockAuthRepository.createTenantWithOwner).toHaveBeenCalledWith({
        tenantName: registerInput.companyName,
        tenantSlug: registerInput.slug,
        email: registerInput.email,
        passwordHash: 'hashed-password',
        firstName: registerInput.firstName,
        lastName: registerInput.lastName,
      });
    });

    it('should throw DUPLICATE_SLUG error if slug exists', async () => {
      mockAuthRepository.findTenantBySlug.mockResolvedValue(mockTenant);

      await expectAppError(
        authService.register(registerInput),
        'DUPLICATE_SLUG'
      );
      expect(mockAuthRepository.createTenantWithOwner).not.toHaveBeenCalled();
    });

    it('should throw DUPLICATE_EMAIL error if email exists', async () => {
      mockAuthRepository.findTenantBySlug.mockResolvedValue(null);
      mockAuthRepository.findUserByEmailAcrossTenants.mockResolvedValue({
        ...mockUser,
        tenant: mockTenant,
      });

      await expectAppError(
        authService.register(registerInput),
        'DUPLICATE_EMAIL'
      );
      expect(mockAuthRepository.createTenantWithOwner).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    const loginInput = {
      email: 'test@example.com',
      password: 'Password123',
    };

    const mockTenant = {
      id: 'tenant-123',
      name: 'Test Company',
      slug: 'test-company',
      status: 'active',
      settings: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockUserWithTenant = {
      id: 'user-456',
      tenantId: 'tenant-123',
      email: 'test@example.com',
      passwordHash: 'hashed-password',
      firstName: 'John',
      lastName: 'Doe',
      role: 'owner',
      status: 'active',
      avatarUrl: null,
      lastLoginAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      tenant: mockTenant,
    };

    const mockTokenPair = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      accessTokenExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
      refreshTokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    it('should login with valid credentials', async () => {
      mockAuthRepository.findUserByEmailAcrossTenants.mockResolvedValue(mockUserWithTenant);
      mockPasswordUtils.comparePassword.mockResolvedValue(true);
      mockAuthRepository.updateUserLastLogin.mockResolvedValue(undefined);
      mockJwtUtils.generateTokenPair.mockReturnValue(mockTokenPair);
      mockJwtUtils.hashToken.mockReturnValue('hashed-refresh-token');
      mockAuthRepository.createRefreshToken.mockResolvedValue({
        id: 'token-id',
        userId: mockUserWithTenant.id,
        tokenHash: 'hashed-refresh-token',
        expiresAt: mockTokenPair.refreshTokenExpiresAt,
        createdAt: new Date(),
        revokedAt: null,
      });

      const result = await authService.login(loginInput);

      expect(result).toBeDefined();
      expect(result.user.email).toBe(loginInput.email);
      expect(result.accessToken).toBe('access-token');
      expect(mockAuthRepository.updateUserLastLogin).toHaveBeenCalledWith(mockUserWithTenant.id);
    });

    it('should throw INVALID_CREDENTIALS for non-existent user', async () => {
      mockAuthRepository.findUserByEmailAcrossTenants.mockResolvedValue(null);

      await expectAppError(
        authService.login(loginInput),
        'INVALID_CREDENTIALS'
      );
    });

    it('should throw INVALID_CREDENTIALS for wrong password', async () => {
      mockAuthRepository.findUserByEmailAcrossTenants.mockResolvedValue(mockUserWithTenant);
      mockPasswordUtils.comparePassword.mockResolvedValue(false);

      await expectAppError(
        authService.login(loginInput),
        'INVALID_CREDENTIALS'
      );
    });

    it('should throw INVALID_CREDENTIALS for inactive user', async () => {
      mockAuthRepository.findUserByEmailAcrossTenants.mockResolvedValue({
        ...mockUserWithTenant,
        status: 'inactive',
      });
      mockPasswordUtils.comparePassword.mockResolvedValue(true);

      await expectAppError(
        authService.login(loginInput),
        'INVALID_CREDENTIALS'
      );
    });

    it('should throw INVALID_CREDENTIALS for inactive tenant', async () => {
      mockAuthRepository.findUserByEmailAcrossTenants.mockResolvedValue({
        ...mockUserWithTenant,
        tenant: { ...mockTenant, status: 'suspended' },
      });
      mockPasswordUtils.comparePassword.mockResolvedValue(true);

      await expectAppError(
        authService.login(loginInput),
        'INVALID_CREDENTIALS'
      );
    });
  });

  describe('refreshTokens', () => {
    const mockRefreshToken = 'valid-refresh-token';
    const mockStoredToken = {
      id: 'token-id',
      userId: 'user-456',
      tokenHash: 'hashed-token',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      revokedAt: null,
    };

    const mockTenant = {
      id: 'tenant-123',
      name: 'Test Company',
      slug: 'test-company',
      status: 'active',
      settings: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockUserWithTenant = {
      id: 'user-456',
      tenantId: 'tenant-123',
      email: 'test@example.com',
      passwordHash: 'hashed-password',
      firstName: 'John',
      lastName: 'Doe',
      role: 'owner',
      status: 'active',
      avatarUrl: null,
      lastLoginAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      tenant: mockTenant,
    };

    const mockNewTokenPair = {
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
      accessTokenExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
      refreshTokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    it('should refresh tokens with valid refresh token', async () => {
      mockJwtUtils.verifyRefreshToken.mockReturnValue({
        userId: 'user-456',
        tokenId: 'token-id',
      });
      mockJwtUtils.hashToken.mockReturnValue('hashed-token');
      mockAuthRepository.findRefreshTokenByHash.mockResolvedValue(mockStoredToken);
      mockAuthRepository.findUserWithTenant.mockResolvedValue(mockUserWithTenant);
      mockAuthRepository.revokeRefreshToken.mockResolvedValue(undefined);
      mockJwtUtils.generateTokenPair.mockReturnValue(mockNewTokenPair);
      mockAuthRepository.createRefreshToken.mockResolvedValue({
        ...mockStoredToken,
        tokenHash: 'new-hashed-token',
      });

      const result = await authService.refreshTokens(mockRefreshToken);

      expect(result.accessToken).toBe('new-access-token');
      expect(result.refreshToken).toBe('new-refresh-token');
      expect(mockAuthRepository.revokeRefreshToken).toHaveBeenCalled();
    });

    it('should throw INVALID_TOKEN if token not found', async () => {
      mockJwtUtils.verifyRefreshToken.mockReturnValue({
        userId: 'user-456',
        tokenId: 'token-id',
      });
      mockJwtUtils.hashToken.mockReturnValue('hashed-token');
      mockAuthRepository.findRefreshTokenByHash.mockResolvedValue(null);

      await expectAppError(
        authService.refreshTokens(mockRefreshToken),
        'INVALID_TOKEN'
      );
    });

    it('should throw INVALID_TOKEN if token is revoked', async () => {
      mockJwtUtils.verifyRefreshToken.mockReturnValue({
        userId: 'user-456',
        tokenId: 'token-id',
      });
      mockJwtUtils.hashToken.mockReturnValue('hashed-token');
      mockAuthRepository.findRefreshTokenByHash.mockResolvedValue({
        ...mockStoredToken,
        revokedAt: new Date(),
      });

      await expectAppError(
        authService.refreshTokens(mockRefreshToken),
        'INVALID_TOKEN'
      );
    });

    it('should throw INVALID_TOKEN if token is expired', async () => {
      mockJwtUtils.verifyRefreshToken.mockReturnValue({
        userId: 'user-456',
        tokenId: 'token-id',
      });
      mockJwtUtils.hashToken.mockReturnValue('hashed-token');
      mockAuthRepository.findRefreshTokenByHash.mockResolvedValue({
        ...mockStoredToken,
        expiresAt: new Date(Date.now() - 1000), // expired
      });

      await expectAppError(
        authService.refreshTokens(mockRefreshToken),
        'INVALID_TOKEN'
      );
    });

    it('should throw NOT_FOUND if user not found', async () => {
      mockJwtUtils.verifyRefreshToken.mockReturnValue({
        userId: 'user-456',
        tokenId: 'token-id',
      });
      mockJwtUtils.hashToken.mockReturnValue('hashed-token');
      mockAuthRepository.findRefreshTokenByHash.mockResolvedValue(mockStoredToken);
      mockAuthRepository.findUserWithTenant.mockResolvedValue(null);

      await expectAppError(
        authService.refreshTokens(mockRefreshToken),
        'NOT_FOUND'
      );
    });
  });

  describe('logout', () => {
    it('should revoke refresh token on logout', async () => {
      const mockToken = 'refresh-token';
      mockJwtUtils.hashToken.mockReturnValue('hashed-token');
      mockAuthRepository.findRefreshTokenByHash.mockResolvedValue({
        id: 'token-id',
        userId: 'user-456',
        tokenHash: 'hashed-token',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        revokedAt: null,
      });
      mockAuthRepository.revokeRefreshToken.mockResolvedValue(undefined);

      await authService.logout(mockToken);

      expect(mockAuthRepository.revokeRefreshToken).toHaveBeenCalledWith('hashed-token');
    });

    it('should not throw if token not found', async () => {
      mockJwtUtils.hashToken.mockReturnValue('hashed-token');
      mockAuthRepository.findRefreshTokenByHash.mockResolvedValue(null);

      await expect(authService.logout('invalid-token')).resolves.not.toThrow();
      expect(mockAuthRepository.revokeRefreshToken).not.toHaveBeenCalled();
    });
  });

  describe('logoutAll', () => {
    it('should revoke all user refresh tokens', async () => {
      const userId = 'user-456';
      mockAuthRepository.revokeAllUserRefreshTokens.mockResolvedValue(undefined);

      await authService.logoutAll(userId);

      expect(mockAuthRepository.revokeAllUserRefreshTokens).toHaveBeenCalledWith(userId);
    });
  });

  describe('getCurrentUser', () => {
    const mockTenant = {
      id: 'tenant-123',
      name: 'Test Company',
      slug: 'test-company',
      status: 'active',
      settings: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockUserWithTenant = {
      id: 'user-456',
      tenantId: 'tenant-123',
      email: 'test@example.com',
      passwordHash: 'hashed-password',
      firstName: 'John',
      lastName: 'Doe',
      role: 'owner',
      status: 'active',
      avatarUrl: null,
      lastLoginAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      tenant: mockTenant,
    };

    it('should return user with tenant', async () => {
      mockAuthRepository.findUserWithTenant.mockResolvedValue(mockUserWithTenant);

      const result = await authService.getCurrentUser('user-456');

      expect(result.user.id).toBe('user-456');
      expect(result.tenant.id).toBe('tenant-123');
    });

    it('should throw NOT_FOUND if user not found', async () => {
      mockAuthRepository.findUserWithTenant.mockResolvedValue(null);

      await expectAppError(
        authService.getCurrentUser('non-existent'),
        'NOT_FOUND'
      );
    });
  });
});

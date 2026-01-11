import {
  generateTokenPair,
  verifyAccessToken,
  verifyRefreshToken,
  hashToken,
  extractBearerToken,
} from '@/shared/utils/jwt';
import { AppError } from '@/shared/errors';

/**
 * Unit tests for JWT utilities.
 */
describe('JWT Utils', () => {
  const mockPayload = {
    userId: 'user-123',
    tenantId: 'tenant-456',
    email: 'test@example.com',
    role: 'admin',
  };

  describe('generateTokenPair', () => {
    it('should generate access and refresh tokens', () => {
      const result = generateTokenPair(mockPayload);

      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(result.accessTokenExpiresAt).toBeInstanceOf(Date);
      expect(result.refreshTokenExpiresAt).toBeInstanceOf(Date);
    });

    it('should generate tokens with unique tokenId in refresh token', () => {
      const result1 = generateTokenPair(mockPayload);
      const result2 = generateTokenPair(mockPayload);

      // Access tokens may be same if generated in same second (due to iat)
      // But refresh tokens should contain different tokenIds
      const decoded1 = verifyRefreshToken(result1.refreshToken);
      const decoded2 = verifyRefreshToken(result2.refreshToken);
      
      expect(decoded1.tokenId).not.toBe(decoded2.tokenId);
    });

    it('should set expiration dates in the future', () => {
      const result = generateTokenPair(mockPayload);
      const now = new Date();

      expect(result.accessTokenExpiresAt.getTime()).toBeGreaterThan(now.getTime());
      expect(result.refreshTokenExpiresAt.getTime()).toBeGreaterThan(now.getTime());
    });

    it('should set refresh token expiry later than access token', () => {
      const result = generateTokenPair(mockPayload);

      expect(result.refreshTokenExpiresAt.getTime()).toBeGreaterThan(
        result.accessTokenExpiresAt.getTime()
      );
    });
  });

  describe('verifyAccessToken', () => {
    it('should verify valid access token', () => {
      const { accessToken } = generateTokenPair(mockPayload);

      const decoded = verifyAccessToken(accessToken);

      expect(decoded.userId).toBe(mockPayload.userId);
      expect(decoded.tenantId).toBe(mockPayload.tenantId);
      expect(decoded.email).toBe(mockPayload.email);
      expect(decoded.role).toBe(mockPayload.role);
    });

    it('should throw error with INVALID_TOKEN code for invalid token', () => {
      try {
        verifyAccessToken('invalid-token');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect((error as AppError).code).toBe('INVALID_TOKEN');
      }
    });

    it('should throw error for refresh token used as access token', () => {
      const { refreshToken } = generateTokenPair(mockPayload);

      try {
        verifyAccessToken(refreshToken);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect((error as AppError).code).toBe('INVALID_TOKEN');
      }
    });
  });

  describe('verifyRefreshToken', () => {
    it('should verify valid refresh token', () => {
      const { refreshToken } = generateTokenPair(mockPayload);

      const decoded = verifyRefreshToken(refreshToken);

      expect(decoded.userId).toBe(mockPayload.userId);
      expect(decoded.tokenId).toBeDefined();
    });

    it('should throw error with INVALID_TOKEN code for invalid token', () => {
      try {
        verifyRefreshToken('invalid-token');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect((error as AppError).code).toBe('INVALID_TOKEN');
      }
    });

    it('should throw error for access token used as refresh token', () => {
      const { accessToken } = generateTokenPair(mockPayload);

      try {
        verifyRefreshToken(accessToken);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect((error as AppError).code).toBe('INVALID_TOKEN');
      }
    });
  });

  describe('hashToken', () => {
    it('should hash a token', () => {
      const token = 'test-token-123';
      const hash = hashToken(token);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(token);
      expect(hash.length).toBe(64); // SHA-256 produces 64 hex characters
    });

    it('should produce same hash for same token', () => {
      const token = 'test-token-123';
      const hash1 = hashToken(token);
      const hash2 = hashToken(token);

      expect(hash1).toBe(hash2);
    });

    it('should produce different hashes for different tokens', () => {
      const hash1 = hashToken('token-1');
      const hash2 = hashToken('token-2');

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('extractBearerToken', () => {
    it('should extract token from valid Bearer header', () => {
      const token = 'my-access-token';
      const header = `Bearer ${token}`;

      const result = extractBearerToken(header);

      expect(result).toBe(token);
    });

    it('should return null for missing header', () => {
      expect(extractBearerToken(undefined)).toBeNull();
    });

    it('should return null for empty header', () => {
      expect(extractBearerToken('')).toBeNull();
    });

    it('should return null for non-Bearer header', () => {
      expect(extractBearerToken('Basic abc123')).toBeNull();
    });

    it('should return null for Bearer without token', () => {
      expect(extractBearerToken('Bearer')).toBeNull();
    });
  });
});

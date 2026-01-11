import { hashPassword, comparePassword, validatePasswordStrength } from '@/shared/utils/password';

/**
 * Unit tests for password utilities.
 */
describe('Password Utils', () => {
  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'TestPassword123';
      const hash = await hashPassword(password);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(0);
    });

    it('should generate different hashes for same password', async () => {
      const password = 'TestPassword123';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching password', async () => {
      const password = 'TestPassword123';
      const hash = await hashPassword(password);

      const result = await comparePassword(password, hash);

      expect(result).toBe(true);
    });

    it('should return false for non-matching password', async () => {
      const password = 'TestPassword123';
      const hash = await hashPassword(password);

      const result = await comparePassword('WrongPassword123', hash);

      expect(result).toBe(false);
    });

    it('should return false for empty password', async () => {
      const hash = await hashPassword('TestPassword123');

      const result = await comparePassword('', hash);

      expect(result).toBe(false);
    });
  });

  describe('validatePasswordStrength', () => {
    it('should return empty array for valid password', () => {
      const errors = validatePasswordStrength('ValidPass123');

      expect(errors).toHaveLength(0);
    });

    it('should detect password too short', () => {
      const errors = validatePasswordStrength('Pass1');

      expect(errors).toContain('Password must be at least 8 characters long');
    });

    it('should detect missing uppercase', () => {
      const errors = validatePasswordStrength('password123');

      expect(errors).toContain('Password must contain at least one uppercase letter');
    });

    it('should detect missing lowercase', () => {
      const errors = validatePasswordStrength('PASSWORD123');

      expect(errors).toContain('Password must contain at least one lowercase letter');
    });

    it('should detect missing number', () => {
      const errors = validatePasswordStrength('PasswordABC');

      expect(errors).toContain('Password must contain at least one number');
    });

    it('should return multiple errors for invalid password', () => {
      const errors = validatePasswordStrength('short');

      expect(errors.length).toBeGreaterThan(1);
    });
  });
});

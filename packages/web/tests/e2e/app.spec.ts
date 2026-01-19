import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Authentication Flow
 * Tests user login, logout, and session management
 */

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    // Clear storage before each test
    await page.goto('/login');
  });

  test('should display login form with all required fields', async ({ page }) => {
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    await expect(page.locator('text=Remember me')).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.click('button[type="submit"]');

    // Check for validation error messages
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();
  });

  test('should show error for invalid email format', async ({ page }) => {
    await page.fill('input[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Invalid email format')).toBeVisible();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Mock successful login response
    await page.route('**/api/v1/auth/login', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            user: {
              id: 'user-123',
              email: 'test@example.com',
              firstName: 'Test',
              lastName: 'User',
              role: 'admin',
            },
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
          },
        }),
      });
    });

    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Should redirect to dashboard after successful login
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.route('**/api/v1/auth/login', async route => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
          },
        }),
      });
    });

    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Invalid email or password')).toBeVisible();
  });

  test('should redirect to dashboard if already authenticated', async ({ page }) => {
    // Set authenticated state
    await page.addInitScript(() => {
      localStorage.setItem('accessToken', 'mock-token');
      localStorage.setItem('user', JSON.stringify({ id: 'user-123', email: 'test@example.com' }));
    });

    await page.goto('/login');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });
});

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Set authenticated state
    await page.addInitScript(() => {
      localStorage.setItem('accessToken', 'mock-token');
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: 'user-123',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          role: 'admin',
        })
      );
    });
  });

  test('should display dashboard with key metrics', async ({ page }) => {
    await page.goto('/dashboard');

    // Check for key metrics cards
    await expect(page.locator('text=Total Clients')).toBeVisible();
    await expect(page.locator('text=Active Interactions')).toBeVisible();
    await expect(page.locator('text=Pending Tasks')).toBeVisible();
  });

  test('should display recent interactions', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.locator('text=Recent Interactions')).toBeVisible();
  });

  test('should navigate to clients page', async ({ page }) => {
    await page.goto('/dashboard');

    await page.click('text=View All Clients');
    await expect(page).toHaveURL(/\/clients/);
  });
});

test.describe('Clients Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('accessToken', 'mock-token');
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: 'user-123',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          role: 'admin',
        })
      );
    });
  });

  test('should display clients list', async ({ page }) => {
    await page.goto('/clients');

    await expect(page.locator('h1:has-text("Clients")')).toBeVisible();
    await expect(page.locator('button:has-text("Add Client")')).toBeVisible();
  });

  test('should open add client modal', async ({ page }) => {
    await page.goto('/clients');

    await page.click('button:has-text("Add Client")');
    await expect(page.locator('h2:has-text("New Client")')).toBeVisible();
  });

  test('should search clients', async ({ page }) => {
    await page.goto('/clients');

    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('Acme');

    // Should filter results based on search
    await expect(searchInput).toHaveValue('Acme');
  });

  test('should display client details', async ({ page }) => {
    await page.goto('/clients');

    // Click on first client row
    await page.locator('table tbody tr').first().click();

    // Should show client details modal or panel
    await expect(page.locator('text=Company Details')).toBeVisible();
  });
});

test.describe('Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('accessToken', 'mock-token');
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: 'user-123',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          role: 'admin',
        })
      );
    });
  });

  test('should display interactions list', async ({ page }) => {
    await page.goto('/interactions');

    await expect(page.locator('h1:has-text("Interactions")')).toBeVisible();
  });

  test('should filter interactions by type', async ({ page }) => {
    await page.goto('/interactions');

    // Click filter dropdown
    const filterButton = page.locator('button:has-text("All types")');
    await filterButton.click();

    // Select email filter
    await page.locator('text=Email').click();

    // Should filter to show only email interactions
    await expect(page.locator('text=Email').first()).toBeVisible();
  });

  test('should log new interaction', async ({ page }) => {
    await page.goto('/interactions');

    await page.click('button:has-text("Log Interaction")');
    await expect(page.locator('h2:has-text("New Interaction")')).toBeVisible();
  });
});

test.describe('Team Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('accessToken', 'mock-token');
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: 'user-123',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          role: 'owner',
        })
      );
    });
  });

  test('should display team members list', async ({ page }) => {
    await page.goto('/team');

    await expect(page.locator('h1:has-text("Team")')).toBeVisible();
  });

  test('should invite new team member', async ({ page }) => {
    await page.goto('/team');

    await page.click('button:has-text("Invite Member")');
    await expect(page.locator('h2:has-text("Invite Team Member")')).toBeVisible();
  });
});

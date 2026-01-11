import { test, expect, type Page } from '@playwright/test';

/**
 * Authentication E2E Tests.
 * Tests login, register, and logout flows.
 */

// Test credentials
const TEST_USER = {
  email: 'test@example.com',
  password: 'Test123!',
  firstName: 'Test',
  lastName: 'User',
};

const TEST_TENANT = {
  name: 'Test Company',
  slug: 'test-company',
};

// Helper to generate unique test data
function generateUniqueData() {
  const timestamp = Date.now();
  return {
    email: `test-${timestamp}@example.com`,
    slug: `test-${timestamp}`,
    name: `Test Company ${timestamp}`,
  };
}

// ─────────────────────────────────────────
// Test Fixtures
// ─────────────────────────────────────────

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing auth state
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });

  // ─────────────────────────────────────────
  // Login Page Tests
  // ─────────────────────────────────────────

  test('should display login page correctly', async ({ page }) => {
    await page.goto('/login');

    // Check page title and form elements
    await expect(page.getByRole('heading', { name: /iniciar sesión/i })).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/contraseña/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /iniciar sesión/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /registrarse/i })).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/login');

    // Click login without filling form
    await page.getByRole('button', { name: /iniciar sesión/i }).click();

    // Should show validation errors
    await expect(page.getByText(/email.*requerido|invalid email/i)).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    // Fill form with invalid credentials
    await page.getByLabel(/email/i).fill('invalid@example.com');
    await page.getByLabel(/contraseña/i).fill('WrongPassword123');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();

    // Should show error message
    await expect(page.getByText(/credenciales inválidas|invalid credentials/i)).toBeVisible({ timeout: 10000 });
  });

  // ─────────────────────────────────────────
  // Register Page Tests
  // ─────────────────────────────────────────

  test('should display register page correctly', async ({ page }) => {
    await page.goto('/register');

    // Check page title and form elements
    await expect(page.getByRole('heading', { name: /crear cuenta|registrarse/i })).toBeVisible();
    await expect(page.getByLabel(/nombre de empresa/i)).toBeVisible();
    await expect(page.getByLabel(/slug/i)).toBeVisible();
    await expect(page.getByLabel(/nombre/i).first()).toBeVisible();
    await expect(page.getByLabel(/apellido/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/contraseña/i)).toBeVisible();
  });

  test('should show validation errors for invalid data', async ({ page }) => {
    await page.goto('/register');

    // Fill with invalid password (too short)
    await page.getByLabel(/nombre de empresa/i).fill('Test');
    await page.getByLabel(/slug/i).fill('test');
    await page.getByLabel(/nombre/i).first().fill('Test');
    await page.getByLabel(/apellido/i).fill('User');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/contraseña/i).fill('123');

    await page.getByRole('button', { name: /crear cuenta|registrarse/i }).click();

    // Should show password validation error
    await expect(page.getByText(/contraseña.*8|password.*8/i)).toBeVisible();
  });

  test('should successfully register a new tenant', async ({ page }) => {
    const uniqueData = generateUniqueData();

    await page.goto('/register');

    // Fill registration form
    await page.getByLabel(/nombre de empresa/i).fill(uniqueData.name);
    await page.getByLabel(/slug/i).fill(uniqueData.slug);
    await page.getByLabel(/nombre/i).first().fill(TEST_USER.firstName);
    await page.getByLabel(/apellido/i).fill(TEST_USER.lastName);
    await page.getByLabel(/email/i).fill(uniqueData.email);
    await page.getByLabel(/contraseña/i).fill(TEST_USER.password);

    // Submit form
    await page.getByRole('button', { name: /crear cuenta|registrarse/i }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });

    // Should show welcome message
    await expect(page.getByText(new RegExp(`bienvenido.*${TEST_USER.firstName}`, 'i'))).toBeVisible();
  });

  // ─────────────────────────────────────────
  // Logout Tests
  // ─────────────────────────────────────────

  test('should logout successfully', async ({ page }) => {
    // First, register a new user
    const uniqueData = generateUniqueData();

    await page.goto('/register');
    await page.getByLabel(/nombre de empresa/i).fill(uniqueData.name);
    await page.getByLabel(/slug/i).fill(uniqueData.slug);
    await page.getByLabel(/nombre/i).first().fill(TEST_USER.firstName);
    await page.getByLabel(/apellido/i).fill(TEST_USER.lastName);
    await page.getByLabel(/email/i).fill(uniqueData.email);
    await page.getByLabel(/contraseña/i).fill(TEST_USER.password);
    await page.getByRole('button', { name: /crear cuenta|registrarse/i }).click();

    // Wait for dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });

    // Click on user menu or logout button
    const logoutButton = page.getByRole('button', { name: /cerrar sesión|logout|salir/i });
    
    // If logout is in a dropdown, we may need to open it first
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
    } else {
      // Try to find and click user menu
      const userMenu = page.locator('[data-testid="user-menu"]');
      if (await userMenu.isVisible()) {
        await userMenu.click();
        await page.getByRole('menuitem', { name: /cerrar sesión|logout|salir/i }).click();
      }
    }

    // Should redirect to login page
    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
  });

  // ─────────────────────────────────────────
  // Protected Routes Tests
  // ─────────────────────────────────────────

  test('should redirect to login when accessing protected route', async ({ page }) => {
    // Try to access dashboard without authentication
    await page.goto('/dashboard');

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });

  test('should redirect authenticated user from login to dashboard', async ({ page }) => {
    // First, register
    const uniqueData = generateUniqueData();

    await page.goto('/register');
    await page.getByLabel(/nombre de empresa/i).fill(uniqueData.name);
    await page.getByLabel(/slug/i).fill(uniqueData.slug);
    await page.getByLabel(/nombre/i).first().fill(TEST_USER.firstName);
    await page.getByLabel(/apellido/i).fill(TEST_USER.lastName);
    await page.getByLabel(/email/i).fill(uniqueData.email);
    await page.getByLabel(/contraseña/i).fill(TEST_USER.password);
    await page.getByRole('button', { name: /crear cuenta|registrarse/i }).click();

    // Wait for dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });

    // Now try to access login page
    await page.goto('/login');

    // Should redirect back to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });
});

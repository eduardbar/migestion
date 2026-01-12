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
  });

  // ─────────────────────────────────────────
  // Login Page Tests
  // ─────────────────────────────────────────

  test('should display login page correctly', async ({ page }) => {
    await page.goto('/login');

    // Check page title and form elements
    await expect(page.getByRole('heading', { name: 'MiGestion' })).toBeVisible();
    await expect(page.getByText(/inicia sesión en tu cuenta/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/contraseña/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /iniciar sesión/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /regístrate gratis/i })).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/login');

    // Click login without filling form
    await page.getByRole('button', { name: /iniciar sesión/i }).click();

    // Should show validation errors
    await expect(page.getByText(/la contraseña es requerida|password is required/i)).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    // Fill form with invalid credentials
    await page.getByLabel(/email/i).fill('invalid@example.com');
    await page.getByLabel(/contraseña/i).fill('WrongPassword123');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();

    // Should show error message
    await expect(page.getByText(/credenciales inválidas|invalid credentials/i)).toBeVisible({
      timeout: 10000,
    });
  });

  // ─────────────────────────────────────────
  // Register Page Tests
  // ─────────────────────────────────────────

  test('should display register page correctly', async ({ page }) => {
    await page.goto('/register');

    // Check page title and form elements
    await expect(page.getByRole('heading', { name: 'MiGestion' })).toBeVisible();
    await expect(page.getByText(/crea tu cuenta empresarial/i)).toBeVisible();
    await expect(page.getByLabel('Nombre de la empresa')).toBeVisible();
    await expect(page.getByLabel('Identificador único')).toBeVisible();
    await expect(page.getByLabel('Nombre').first()).toBeVisible();
    await expect(page.getByLabel('Apellido')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Contraseña')).toBeVisible();
  });

  test('should show validation errors for invalid data', async ({ page }) => {
    await page.goto('/register');

    // Fill with invalid password (too short)
    await page.getByLabel('Nombre de la empresa').fill('Test');
    await page.getByLabel('Identificador único').fill('test');
    await page.getByLabel('Nombre').first().fill('Test');
    await page.getByLabel('Apellido').fill('User');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Contraseña').fill('123');

    await page.getByRole('button', { name: /crear cuenta/i }).click();

    // Should show password validation error
    await expect(page.getByText(/contraseña.*8|password.*8/i)).toBeVisible();
  });

  test('should successfully register a new tenant', async ({ page }) => {
    const uniqueData = generateUniqueData();

    await page.goto('/register');

    // Fill registration form
    await page.getByLabel('Nombre de la empresa').fill(uniqueData.name);
    await page.getByLabel('Identificador único').fill(uniqueData.slug);
    await page.getByLabel('Nombre').first().fill(TEST_USER.firstName);
    await page.getByLabel('Apellido').fill(TEST_USER.lastName);
    await page.getByLabel('Email').fill(uniqueData.email);
    await page.getByLabel('Contraseña').fill(TEST_USER.password);
    await page.getByRole('button', { name: /crear cuenta/i }).click();

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
    await page
      .getByLabel(/nombre/i)
      .first()
      .fill(TEST_USER.firstName);
    await page.getByLabel(/apellido/i).fill(TEST_USER.lastName);
    await page.getByLabel(/email/i).fill(uniqueData.email);
    await page.getByLabel(/contraseña/i).fill(TEST_USER.password);
    await page.getByRole('button', { name: /crear cuenta/i }).click();

    // Wait for dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });

    // Now try to access login page
    await page.goto('/login');

    // Should redirect back to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });
});

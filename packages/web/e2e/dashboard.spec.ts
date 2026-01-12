import { test, expect } from '@playwright/test';

/**
 * Dashboard E2E Tests.
 * Tests dashboard loading, KPI cards, and charts rendering.
 */

// Test user data
const TEST_USER = {
  password: 'Test123!',
  firstName: 'Test',
  lastName: 'User',
};

// ─────────────────────────────────────────
// Setup: Register and authenticate before tests
// ─────────────────────────────────────────

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Clear state
    await page.context().clearCookies();

    // Register a new tenant
    const timestamp = Date.now();
    const uniqueEmail = `e2e-dashboard-${timestamp}@example.com`;
    const uniqueSlug = `test-${timestamp}`;
    const uniqueName = `Test Company ${timestamp}`;

    await page.goto('/register');
    await page.getByLabel(/nombre de empresa/i).fill(uniqueName);
    await page.getByLabel(/slug/i).fill(uniqueSlug);
    await page
      .getByLabel(/nombre/i)
      .first()
      .fill(TEST_USER.firstName);
    await page.getByLabel(/apellido/i).fill(TEST_USER.lastName);
    await page.getByLabel(/email/i).fill(uniqueEmail);
    await page.getByLabel(/contraseña/i).fill(TEST_USER.password);
    await page.getByRole('button', { name: /crear cuenta|registrarse/i }).click();

    // Wait for dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });
  });

  // ─────────────────────────────────────────
  // Dashboard Layout Tests
  // ─────────────────────────────────────────

  test('should display dashboard with welcome message', async ({ page }) => {
    // Welcome message should include user's first name
    await expect(
      page.getByText(new RegExp(`Bienvenido.*${TEST_USER.firstName}`, 'i'))
    ).toBeVisible();
  });

  test('should display KPI cards', async ({ page }) => {
    // KPI cards should be visible
    await expect(page.getByText(/Total Clientes/i)).toBeVisible();
    await expect(page.getByText(/Clientes Activos/i)).toBeVisible();
    await expect(page.getByText(/Interacciones.*mes/i)).toBeVisible();
    await expect(page.getByText(/Prospectos/i)).toBeVisible();
  });

  test('should display chart sections', async ({ page }) => {
    // Chart section headers should be visible
    await expect(page.getByText(/Actividad.*30.*dias/i)).toBeVisible();
    await expect(page.getByText(/Distribucion de Clientes/i)).toBeVisible();
    await expect(page.getByText(/Top Clientes por Actividad/i)).toBeVisible();
    await expect(page.getByText(/Tipos de Interaccion/i)).toBeVisible();
  });

  test('should display team statistics', async ({ page }) => {
    // Team stats section should be visible
    await expect(page.getByText(/Equipo Total/i)).toBeVisible();
    await expect(page.getByText(/Usuarios Activos/i)).toBeVisible();
    await expect(page.getByText(/Total Interacciones/i)).toBeVisible();
  });

  // ─────────────────────────────────────────
  // Data Loading Tests
  // ─────────────────────────────────────────

  test('should load KPI data', async ({ page }) => {
    // Wait for data to load (spinners should disappear)
    // KPI values should be numbers (0 for new tenant)
    await expect(page.locator('.text-2xl').first()).toContainText(/\d+/);
  });

  test('should show empty state for charts when no data', async ({ page }) => {
    // For a new tenant, charts should show empty state
    await expect(page.getByText(/Sin datos disponibles/i).first()).toBeVisible({ timeout: 10000 });
  });

  // ─────────────────────────────────────────
  // Navigation Tests
  // ─────────────────────────────────────────

  test('should be the default authenticated route', async ({ page }) => {
    // Navigate to home
    await page.goto('/');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should stay on dashboard after refresh', async ({ page }) => {
    // Reload the page
    await page.reload();

    // Should still be on dashboard
    await expect(page).toHaveURL(/\/dashboard/);

    // Welcome message should still be visible
    await expect(
      page.getByText(new RegExp(`Bienvenido.*${TEST_USER.firstName}`, 'i'))
    ).toBeVisible();
  });

  // ─────────────────────────────────────────
  // Responsive Tests
  // ─────────────────────────────────────────

  test('should display correctly on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Core elements should still be visible
    await expect(
      page.getByText(new RegExp(`Bienvenido.*${TEST_USER.firstName}`, 'i'))
    ).toBeVisible();
    await expect(page.getByText(/Total Clientes/i)).toBeVisible();
  });

  test('should display correctly on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    // All sections should be visible
    await expect(page.getByText(/Total Clientes/i)).toBeVisible();
    await expect(page.getByText(/Actividad.*30.*dias/i)).toBeVisible();
    await expect(page.getByText(/Distribucion de Clientes/i)).toBeVisible();
  });

  // ─────────────────────────────────────────
  // Performance Tests
  // ─────────────────────────────────────────

  test('should load dashboard within acceptable time', async ({ page }) => {
    // Measure time to load dashboard
    const startTime = Date.now();

    await page.goto('/dashboard');

    // Wait for main content to be visible
    await expect(page.getByText(/Bienvenido/i)).toBeVisible();

    const loadTime = Date.now() - startTime;

    // Dashboard should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });
});

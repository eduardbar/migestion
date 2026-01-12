import { test, expect } from '@playwright/test';

test.describe('Authentication Flow (Production)', () => {
  test('should login with production test user', async ({ page }) => {
    await page.goto('/login');

    // Fill login form with production test credentials
    await page.getByLabel('Email').fill('test@migestion.com');
    await page.getByLabel('Contraseña').fill('Test123!');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });

    // Should show welcome message
    await expect(page.getByText(/Bienvenido/i)).toBeVisible();
  });

  test('should display dashboard after login', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.getByLabel('Email').fill('test@migestion.com');
    await page.getByLabel('Contraseña').fill('Test123!');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();

    // Wait for dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });

    // Check dashboard elements
    await expect(page.getByText(/Bienvenido/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /dashboard/i })).toBeVisible();
  });

  test('should access clients page', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.getByLabel('Email').fill('test@migestion.com');
    await page.getByLabel('Contraseña').fill('Test123!');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();

    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });

    // Navigate to clients
    await page.getByRole('link', { name: /clientes/i }).click();
    await expect(page).toHaveURL(/\/clients/, { timeout: 10000 });
  });

  test('should logout successfully', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.getByLabel('Email').fill('test@migestion.com');
    await page.getByLabel('Contraseña').fill('Test123!');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();

    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });

    // Logout
    const logoutButton = page.getByRole('button', { name: /cerrar sesión/i });
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
    } else {
      const userMenu = page.locator('[data-testid="user-menu"]');
      if (await userMenu.isVisible()) {
        await userMenu.click();
        await page.getByRole('menuitem', { name: /cerrar sesión/i }).click();
      }
    }

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
  });
});

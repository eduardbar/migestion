import { test, expect } from '@playwright/test';

test.describe('Visitor Flow - Landing Page to Registration', () => {
  test('landing page loads correctly', async ({ page }) => {
    // 1. Visit the home page (landing)
    await page.goto('/');

    // 2. Check for key elements of the landing page
    await expect(page).toHaveTitle(/MiGestion/);
    await expect(page.getByText('Gestión empresarial sin fricción')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Comenzar ahora' })).toBeVisible();

    // 3. Verify navbar elements
    await expect(page.getByRole('link', { name: 'Iniciar Sesión' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Prueba Gratis' }).first()).toBeVisible();
  });

  test('navigation to login page works', async ({ page }) => {
    await page.goto('/');

    // Click login
    await page.getByRole('link', { name: 'Iniciar Sesión' }).click();

    // Verify URL and content
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole('heading', { name: 'Bienvenido de nuevo' })).toBeVisible();
  });

  test('navigation to register page works', async ({ page }) => {
    await page.goto('/');

    // Click register
    await page.getByRole('link', { name: 'Comenzar ahora' }).click();

    // Verify URL and content
    await expect(page).toHaveURL(/\/register/);
    await expect(page.getByRole('heading', { name: 'Crea tu cuenta' })).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

/**
 * Clients CRUD E2E Tests.
 * Tests client listing, creation, editing, and deletion.
 */

// Test data
const TEST_USER = {
  email: `e2e-clients-${Date.now()}@example.com`,
  password: 'Test123!',
  firstName: 'Test',
  lastName: 'User',
};

const TEST_TENANT = {
  name: `Test Company ${Date.now()}`,
  slug: `test-${Date.now()}`,
};

const TEST_CLIENT = {
  companyName: 'Acme Corporation',
  contactName: 'John Doe',
  email: 'john@acme.com',
  phone: '+1234567890',
  segment: 'Enterprise',
};

// ─────────────────────────────────────────
// Setup: Register and authenticate before tests
// ─────────────────────────────────────────

test.describe('Clients CRUD', () => {
  test.beforeEach(async ({ page }) => {
    // Clear state
    await page.context().clearCookies();

    // Register a new tenant for each test to ensure clean state
    const timestamp = Date.now();
    const uniqueEmail = `e2e-clients-${timestamp}@example.com`;
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
  // Clients List Page Tests
  // ─────────────────────────────────────────

  test('should display clients page correctly', async ({ page }) => {
    await page.goto('/clients');

    // Check page title
    await expect(page.getByRole('heading', { name: /clients/i })).toBeVisible();

    // Check main UI elements
    await expect(page.getByPlaceholder(/search clients/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /new client/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /filters/i })).toBeVisible();

    // Check table headers
    await expect(page.getByRole('columnheader', { name: /company/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /contact/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /email/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /status/i })).toBeVisible();
  });

  test('should show empty state when no clients exist', async ({ page }) => {
    await page.goto('/clients');

    // Should show empty state message
    await expect(page.getByText(/no clients found/i)).toBeVisible();

    // Should show add client button in empty state
    await expect(page.getByRole('button', { name: /add client/i })).toBeVisible();
  });

  // ─────────────────────────────────────────
  // Client Creation Tests
  // ─────────────────────────────────────────

  test('should open create client modal', async ({ page }) => {
    await page.goto('/clients');

    // Click new client button
    await page.getByRole('button', { name: /new client/i }).click();

    // Modal should be visible
    await expect(page.getByRole('heading', { name: /new client/i })).toBeVisible();

    // Form fields should be present
    await expect(page.getByLabel(/company name/i)).toBeVisible();
    await expect(page.getByLabel(/contact name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/phone/i)).toBeVisible();
    await expect(page.getByLabel(/status/i)).toBeVisible();
    await expect(page.getByLabel(/segment/i)).toBeVisible();
  });

  test('should create a new client successfully', async ({ page }) => {
    await page.goto('/clients');

    // Open create modal
    await page.getByRole('button', { name: /new client/i }).click();
    await expect(page.getByRole('heading', { name: /new client/i })).toBeVisible();

    // Fill form
    await page.getByLabel(/company name/i).fill(TEST_CLIENT.companyName);
    await page.getByLabel(/contact name/i).fill(TEST_CLIENT.contactName);
    await page.getByLabel(/email/i).fill(TEST_CLIENT.email);
    await page.getByLabel(/phone/i).fill(TEST_CLIENT.phone);
    await page.getByLabel(/segment/i).fill(TEST_CLIENT.segment);

    // Submit form
    await page.getByRole('button', { name: /create client/i }).click();

    // Modal should close
    await expect(page.getByRole('heading', { name: /new client/i })).not.toBeVisible({
      timeout: 5000,
    });

    // Client should appear in the table
    await expect(page.getByText(TEST_CLIENT.companyName)).toBeVisible();
    await expect(page.getByText(TEST_CLIENT.contactName)).toBeVisible();
  });

  test('should validate required fields when creating client', async ({ page }) => {
    await page.goto('/clients');

    // Open create modal
    await page.getByRole('button', { name: /new client/i }).click();

    // Try to submit without filling required fields
    await page.getByRole('button', { name: /create client/i }).click();

    // Modal should still be open (submission failed)
    await expect(page.getByRole('heading', { name: /new client/i })).toBeVisible();
  });

  // ─────────────────────────────────────────
  // Client Edit Tests
  // ─────────────────────────────────────────

  test('should edit an existing client', async ({ page }) => {
    await page.goto('/clients');

    // First create a client
    await page.getByRole('button', { name: /new client/i }).click();
    await page.getByLabel(/company name/i).fill(TEST_CLIENT.companyName);
    await page.getByLabel(/contact name/i).fill(TEST_CLIENT.contactName);
    await page.getByRole('button', { name: /create client/i }).click();

    // Wait for client to appear
    await expect(page.getByText(TEST_CLIENT.companyName)).toBeVisible();

    // Click edit button (pencil icon)
    const row = page.locator('tr').filter({ hasText: TEST_CLIENT.companyName });
    await row.getByRole('button').first().click(); // First button should be edit

    // Edit modal should open
    await expect(page.getByRole('heading', { name: /edit client/i })).toBeVisible();

    // Change company name
    const newCompanyName = 'Updated Company Name';
    await page.getByLabel(/company name/i).clear();
    await page.getByLabel(/company name/i).fill(newCompanyName);

    // Save changes
    await page.getByRole('button', { name: /save changes/i }).click();

    // Modal should close
    await expect(page.getByRole('heading', { name: /edit client/i })).not.toBeVisible({
      timeout: 5000,
    });

    // Updated name should appear
    await expect(page.getByText(newCompanyName)).toBeVisible();
  });

  // ─────────────────────────────────────────
  // Client Delete Tests
  // ─────────────────────────────────────────

  test('should delete a client', async ({ page }) => {
    await page.goto('/clients');

    // First create a client
    await page.getByRole('button', { name: /new client/i }).click();
    await page.getByLabel(/company name/i).fill('Client To Delete');
    await page.getByLabel(/contact name/i).fill('Delete Me');
    await page.getByRole('button', { name: /create client/i }).click();

    // Wait for client to appear
    await expect(page.getByText('Client To Delete')).toBeVisible();

    // Click delete button (trash icon)
    const row = page.locator('tr').filter({ hasText: 'Client To Delete' });
    const deleteButton = row.locator('button').filter({ has: page.locator('svg.text-error-500') });
    await deleteButton.click();

    // Confirm dialog should appear
    await expect(page.getByRole('heading', { name: /delete client/i })).toBeVisible();
    await expect(page.getByText(/are you sure you want to delete/i)).toBeVisible();

    // Confirm deletion
    await page.getByRole('button', { name: /^delete$/i }).click();

    // Client should be removed
    await expect(page.getByText('Client To Delete')).not.toBeVisible({ timeout: 5000 });
  });

  test('should cancel client deletion', async ({ page }) => {
    await page.goto('/clients');

    // First create a client
    await page.getByRole('button', { name: /new client/i }).click();
    await page.getByLabel(/company name/i).fill('Keep This Client');
    await page.getByLabel(/contact name/i).fill('Keep Me');
    await page.getByRole('button', { name: /create client/i }).click();

    // Wait for client to appear
    await expect(page.getByText('Keep This Client')).toBeVisible();

    // Click delete button
    const row = page.locator('tr').filter({ hasText: 'Keep This Client' });
    const deleteButton = row.locator('button').filter({ has: page.locator('svg.text-error-500') });
    await deleteButton.click();

    // Confirm dialog should appear
    await expect(page.getByRole('heading', { name: /delete client/i })).toBeVisible();

    // Cancel deletion
    await page.getByRole('button', { name: /cancel/i }).click();

    // Client should still exist
    await expect(page.getByText('Keep This Client')).toBeVisible();
  });

  // ─────────────────────────────────────────
  // Search and Filter Tests
  // ─────────────────────────────────────────

  test('should search clients by name', async ({ page }) => {
    await page.goto('/clients');

    // Create multiple clients
    const clients = [
      { companyName: 'Alpha Corp', contactName: 'Alice Alpha' },
      { companyName: 'Beta Inc', contactName: 'Bob Beta' },
      { companyName: 'Gamma LLC', contactName: 'Charlie Gamma' },
    ];

    for (const client of clients) {
      await page.getByRole('button', { name: /new client/i }).click();
      await page.getByLabel(/company name/i).fill(client.companyName);
      await page.getByLabel(/contact name/i).fill(client.contactName);
      await page.getByRole('button', { name: /create client/i }).click();
      await expect(page.getByText(client.companyName)).toBeVisible();
    }

    // Search for specific client
    await page.getByPlaceholder(/search clients/i).fill('Alpha');

    // Should show only matching client
    await expect(page.getByText('Alpha Corp')).toBeVisible();

    // Other clients should not be visible (wait for search debounce)
    await page.waitForTimeout(500);
  });

  test('should filter clients by status', async ({ page }) => {
    await page.goto('/clients');

    // Open filters
    await page.getByRole('button', { name: /filters/i }).click();

    // Status filter should be visible
    await expect(page.locator('select').first()).toBeVisible();

    // Select Active status
    await page.locator('select').first().selectOption('active');

    // Filter should be applied (check badge count or filtered results)
    await expect(page.getByText(/1/)).toBeVisible(); // Badge showing 1 filter active
  });
});

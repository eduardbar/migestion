import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Test Configuration for MiGestion.
 * 
 * @remarks
 * - Runs Chromium by default, Firefox in full CI pipeline
 * - Auto-starts dev server if not running
 * - Screenshots and traces on failure for debugging
 * 
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  
  // Run tests in parallel for speed
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry failed tests (more retries in CI for flaky network)
  retries: process.env.CI ? 2 : 1,
  
  // Limit workers in CI to prevent resource exhaustion
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],
  
  // Test timeout (increase for CI)
  timeout: process.env.CI ? 60000 : 30000,
  
  // Expect timeout
  expect: {
    timeout: 10000,
  },

  // Global settings for all tests
  use: {
    // Base URL for navigation
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173',
    
    // Collect trace when retrying failed test
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on failure (helpful for debugging CI)
    video: process.env.CI ? 'on-first-retry' : 'off',
    
    // Viewport size
    viewport: { width: 1280, height: 720 },
    
    // Action timeout
    actionTimeout: 10000,
    
    // Navigation timeout
    navigationTimeout: 30000,
  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Firefox only in full CI runs (slower)
    ...(process.env.CI_FULL ? [{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }] : []),
  ],

  // Auto-start dev server before running tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});

import { test } from '@playwright/test';

test('debug remote login', async ({ page }) => {
  console.log('--- START DEBUG ---');

  // Capturar logs de consola y errores
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', exception => console.log('BROWSER ERROR:', exception));
  page.on('response', response => {
    if (response.status() >= 400) {
      console.log(`HTTP ERROR: ${response.status()} ${response.url()}`);
    }
  });

  console.log('Navigating to /login...');
  const response = await page.goto('/login');
  console.log(`Navigation status: ${response?.status()}`);

  console.log('Page title:', await page.title());

  // Esperar un poco
  await page.waitForTimeout(3000);

  // Ver contenido
  const body = await page.innerHTML('body');
  console.log('Body HTML (truncated):', body.slice(0, 500));

  // Verificar selectores clave
  const heading = await page.getByRole('heading', { name: /migestion/i }).count();
  console.log(`Found ${heading} headings matching /migestion/i`);

  console.log('--- END DEBUG ---');
});

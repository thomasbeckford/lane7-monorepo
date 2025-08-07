// tests/i18n-one.spec.ts
import { expect, test } from '@playwright/test';

test('middleware funciona - test básico', async ({ page }) => {
  const response = await page.goto('http://localhost:3000/');

  // Solo verificar que carga
  expect(response?.status()).toBe(200);

  console.log('✅ Status:', response?.status());
  console.log('✅ URL:', page.url());
  console.log('✅ Title:', await page.title());
});

test('middleware detecta locale correctamente', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Verificar HTML lang
  const htmlLang = await page.getAttribute('html', 'lang');
  console.log('✅ HTML Lang:', htmlLang);

  expect(htmlLang).toBe('en-GB');
});

test('debug Accept-Language headers', async ({ page }) => {
  // Interceptar request para ver headers
  page.on('request', request => {
    const headers = request.headers();
    console.log('🔍 Accept-Language header:', headers['accept-language']);
    console.log('🔍 All headers:', headers);
  });

  await page.setExtraHTTPHeaders({
    'Accept-Language': 'de-DE,de;q=0.9'
  });

  await page.goto('http://localhost:3000/');

  const htmlLang = await page.getAttribute('html', 'lang');
  console.log('✅ HTML Lang resultado:', htmlLang);

  // Por ahora solo log, no assertion
});

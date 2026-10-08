import { chromium, expect } from '@playwright/test';

const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader'] });
const page = await browser.newPage();
let payload;
let outcome = 'error';
await page.route('https://api.emailjs.com/api/v1.0/email/send', async route => {
  payload = route.request().postDataJSON();
  await route.fulfill({ status: outcome === 'success' ? 200 : 400,
    contentType: 'text/plain', body: outcome === 'success' ? 'OK' : 'The service ID not found' });
});
try {
  await page.goto(process.env.TEST_URL || 'http://127.0.0.1:3100');
  await expect(page.locator('.lamp-loader')).toBeHidden({ timeout: 90000 });
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.locator('#contact').getByLabel('Name', { exact: true }).fill('  Test Visitor  ');
  await page.locator('#contact').getByLabel('Email', { exact: true }).fill('visitor@example.com');
  await page.locator('#contact').getByLabel('Message', { exact: true }).fill('  A test project inquiry.  ');
  await page.getByRole('button', { name: 'Send Message', exact: true }).click();
  await expect(page.locator('#contact [role="alert"]')).toContainText('couldn’t send');
  await page.waitForTimeout(3500);
  await expect(page.locator('#contact [role="alert"]')).toBeVisible();
  await expect(page.locator('#contact').getByLabel('Message', { exact: true })).toHaveValue('  A test project inquiry.  ');
  expect(payload.template_params).toMatchObject({
    from_name: 'Test Visitor', name: 'Test Visitor', from_email: 'visitor@example.com',
    email: 'visitor@example.com', reply_to: 'visitor@example.com', message: 'A test project inquiry.',
    to_email: 'team@thecodelawyers.com',
    subject: 'Website enquiry from Test Visitor', title: 'Website enquiry from Test Visitor',
  });
  outcome = 'success';
  await page.getByRole('button', { name: /Try Again/ }).click();
  await expect(page.locator('#contact [role="status"]')).toContainText('Message sent');
  await expect(page.locator('#contact').getByLabel('Message', { exact: true })).toHaveValue('');
  console.log('PASS contact: template fields, persistent accessible failure, preserved input, successful retry and reset (provider mocked; no email sent)');
} finally { await browser.close(); }


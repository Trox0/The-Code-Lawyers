import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const base = process.env.TEST_URL || 'http://127.0.0.1:3100';
await mkdir('test-results', { recursive: true });
const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader'] });
const errors = [];
const observe = page => page.on('pageerror', error => errors.push(error.message));
const ready = async page => {
  await expect(page.locator('.lamp-sculpture')).toHaveAttribute('data-lamp-ready', 'true', { timeout: 60000 });
  await expect(page.locator('.lamp-loader')).toBeHidden({ timeout: 10000 });
};
const noOverflow = async page => expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  observe(page);
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await ready(page);
  await noOverflow(page);
  await expect(page.locator('h1')).toHaveText('Introducing Lamp.');
  await expect(page.locator('.lamp-sculpture')).toHaveAttribute('data-particle-tools', 'n8n,openai,claude,gemini,zapier,make,langchain,openclaw,hermes');
  await expect(page.locator('.lamp-sculpture canvas')).toHaveCount(1);
  await expect(page.locator('footer a[href="mailto:team@thecodelawyers.com"]').first()).toBeVisible();
  await page.mouse.move(720, 360);
  await page.screenshot({ path: 'test-results/lamp-desktop.png' });
  await page.evaluate(() => scrollTo({ top: innerHeight * .88, behavior: 'instant' }));
  await expect.poll(() => page.locator('.lamp-sculpture').getAttribute('data-camera-zoom')).toMatch(/^1\.[678]/);
  expect(Number(await page.locator('.lamp-sculpture').getAttribute('data-exposure'))).toBeGreaterThan(2);
  expect(await page.locator('.lamp-hero').evaluate(el => Math.abs(el.getBoundingClientRect().top) < 2)).toBe(true);
  expect(await page.locator('.lamp-site-header').evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgba(0, 0, 0, 0)');
  await page.screenshot({ path: 'test-results/lamp-zoom.png' });
  const runwayHeight = await page.locator('.lamp-runway').evaluate(el => el.offsetHeight);
  await page.getByRole('button', { name: 'Pause motion', exact: true }).click();
  expect(await page.locator('.lamp-runway').evaluate(el => el.offsetHeight)).toBe(runwayHeight);
  await page.getByRole('button', { name: 'Resume motion', exact: true }).click();
  await page.locator('#lamp-approach').scrollIntoViewIfNeeded();
  await page.getByRole('tab', { name: /Work that flows/ }).click();
  await expect(page.getByRole('tabpanel', { name: /Work that flows/ })).toBeVisible();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('tab', { name: /Software that fits/ })).toHaveAttribute('aria-selected', 'true');
  await page.screenshot({ path: 'test-results/lamp-approach.png' });
  console.log('PASS desktop: one complete mesh, nine tools, zoom/brightness, sticky transparent header, pause geometry, keyboard service tabs, brand/email');
  await page.close();

  const phone = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  observe(phone);
  await phone.goto(base, { waitUntil: 'domcontentloaded' });
  await ready(phone);
  await noOverflow(phone);
  await expect(phone.locator('.lamp-sculpture')).toHaveAttribute('data-layout', 'mobile-arcs');
  await phone.screenshot({ path: 'test-results/lamp-phone.png' });
  await phone.getByRole('button', { name: 'Pause motion', exact: true }).tap();
  const bounds = await phone.locator('.lamp-sculpture').boundingBox();
  const middle = bounds.y + bounds.height / 2;
  await phone.touchscreen.tap(25, middle);
  expect(Number(await phone.locator('.lamp-sculpture').getAttribute('data-look-yaw'))).toBeLessThan(-.3);
  await phone.touchscreen.tap(365, middle);
  expect(Number(await phone.locator('.lamp-sculpture').getAttribute('data-look-yaw'))).toBeGreaterThan(.3);
  await phone.getByRole('button', { name: 'Resume motion', exact: true }).tap();
  await phone.getByRole('button', { name: 'Open navigation menu' }).tap();
  const openBounds = await phone.locator('.lamp-sculpture').boundingBox();
  expect(Math.abs(openBounds.height - bounds.height)).toBeLessThan(2);
  await phone.keyboard.press('Escape');
  await expect(phone.getByRole('button', { name: 'Open navigation menu' })).toHaveAttribute('aria-expanded', 'false');
  for (const [width, height] of [[320, 640], [768, 1024], [1024, 768], [1920, 1080], [844, 390]]) {
    await phone.setViewportSize({ width, height });
    await noOverflow(phone);
    await expect(phone.locator('.lamp-sculpture canvas')).toBeVisible();
    const title = await phone.locator('h1').boundingBox();
    expect(title.x).toBeGreaterThanOrEqual(0);
    expect(title.x + title.width).toBeLessThanOrEqual(width);
  }
  await phone.setViewportSize({ width: 1024, height: 768 });
  await phone.addStyleTag({ content: 'html { scrollbar-gutter: stable; overflow-y: scroll }' });
  await expect(phone.locator('.lamp-sculpture')).toHaveAttribute('data-layout', 'desktop-arcs');
  await noOverflow(phone);
  await phone.locator('.lamp-sculpture canvas').evaluate(canvas => {
    canvas.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext();
  });
  await expect(phone.locator('.lamp-runway')).toHaveAttribute('data-lamp-status', 'fallback');
  await expect(phone.locator('.lamp-sculpture canvas')).toHaveCount(0);
  console.log('PASS phone: touch aim, menu clearance, 320/390/768/1024/1440/1920 and landscape widths, classic scrollbar breakpoint, graphics loss fallback');
  await phone.close();

  const delayed = await browser.newPage({ viewport: { width: 390, height: 844 } });
  observe(delayed);
  let release;
  const gate = new Promise(resolve => { release = resolve });
  await delayed.route('**/lamp/models/head.glb', async route => { await gate; await route.continue(); });
  await delayed.goto(base, { waitUntil: 'domcontentloaded' });
  await expect(delayed.locator('.lamp-loader')).toBeVisible();
  await expect.poll(() => delayed.locator('header').evaluate(el => el.inert)).toBe(true);
  const first = await delayed.locator('progress').evaluate(el => el.value);
  await delayed.waitForTimeout(1200);
  const second = await delayed.locator('progress').evaluate(el => el.value);
  expect(second).toBeGreaterThan(first);
  expect(second).toBeLessThan(100);
  expect(await delayed.locator('.lamp-progress-line').innerText()).toMatch(/\n\d+%$/);
  release();
  await ready(delayed);
  expect(await delayed.locator('header').evaluate(el => el.inert)).toBe(false);
  await delayed.reload({ waitUntil: 'domcontentloaded' });
  await ready(delayed);
  await expect(delayed.locator('.lamp-sculpture canvas')).toHaveCount(1);
  await delayed.close();
  console.log('PASS loader: blocks page until complete frame, integer advancing progress, releases focus, clean reload');

  const fallback = await browser.newPage();
  observe(fallback);
  let tries = 0;
  await fallback.route('**/lamp/models/head.glb', route => { tries++; return route.fulfill({ status: 503, body: 'test unavailable' }); });
  await fallback.goto(base, { waitUntil: 'domcontentloaded' });
  await expect(fallback.locator('.lamp-runway')).toHaveAttribute('data-lamp-status', 'fallback', { timeout: 20000 });
  await expect(fallback.locator('.lamp-loader')).toBeHidden();
  expect(tries).toBe(3);
  await expect(fallback.locator('.lamp-fallback')).toHaveAttribute('data-visible', 'true');
  await fallback.close();
  const reduced = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  observe(reduced);
  await reduced.goto(base, { waitUntil: 'domcontentloaded' });
  await ready(reduced);
  await expect(reduced.getByRole('button', { name: 'Resume motion', exact: true })).toHaveAttribute('aria-pressed', 'true');
  expect(await reduced.locator('.lamp-runway').evaluate(el => el.offsetHeight)).toBe(844);
  await reduced.close();
  const nojs = await browser.newPage({ javaScriptEnabled: false });
  await nojs.goto(base);
  await expect(nojs.locator('.lamp-loader')).toBeHidden();
  await expect(nojs.locator('h1')).toBeVisible();
  await nojs.close();
  expect(errors).toEqual([]);
  for (const route of ['/privacy', '/terms', '/disclaimer', '/services/ai-chatbots', '/projects/student-management', '/lamp/credits.html']) {
    expect((await fetch(new URL(route, base))).status).toBe(200);
  }
  console.log('PASS fallback retries, reduced motion, no-JS content, retained business/legal pages; no browser exceptions');
} finally {
  await browser.close();
}

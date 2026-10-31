import { chromium } from 'playwright';
import path from 'node:path';

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1200, height: 800 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'domcontentloaded' });

  // 1. Dashboard / Main view
  await page.screenshot({ path: 'evidence/stage-5-submission/gallery/01-audit-dashboard.png' });

  // 2. Preset loaded: Front brakes
  await page.getByText('Front Brake & Rotor Replacement Sticker Shock').first().click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'evidence/stage-5-submission/gallery/02-real-world-presets.png' });

  // 3. Upsell Radar view: Load Dealer 60k
  await page.getByText('The Dealership 60,000-Mile "Wallet Flush"').first().click();
  await page.waitForTimeout(400);
  await page.locator('text=Anti-Upsell Radar: 7 High-Risk Items Flagged').first().scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'evidence/stage-5-submission/gallery/03-anti-upsell-radar.png' });

  // 4. Negotiation & DIY view
  await page.locator('text=Mechanic Counter-Negotiation Scripts').first().scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'evidence/stage-5-submission/gallery/04-negotiation-scripts.png' });

  // 5. Competitor modal
  await page.locator('header').first().scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: /vs RepairPal \/ KBB/i }).first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'evidence/stage-5-submission/gallery/05-competitor-comparison.png' });

  console.log('Gallery images rendered successfully.');
  await browser.close();
}

main().catch(console.error);

import { chromium, firefox } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:4173';
const OUT = process.env.QA_OUT ?? 'evidence/stage-3-qa';
const BROWSER = process.env.BROWSER === 'chromium' ? 'chromium' : 'firefox';
const HEADED = process.env.HEADED === '1';

const SHOTS = path.join(OUT, 'screens');
fs.mkdirSync(SHOTS, { recursive: true });

const VIEWPORTS = [
  { name: 'desktop', viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  { name: 'mobile', viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 },
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function expectVisible(page, selector, timeout = 10000) {
  const locator = page.locator(selector).first();
  await locator.waitFor({ state: 'visible', timeout });
  return locator;
}

async function expectText(page, text, timeout = 10000) {
  const locator = page.getByText(text).first();
  await locator.waitFor({ state: 'visible', timeout });
  return locator;
}

function collectIssues(page) {
  const issues = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') issues.push({ kind: 'console', text: msg.text() });
  });
  page.on('pageerror', (err) => {
    issues.push({ kind: 'pageerror', text: err.message });
  });
  page.on('requestfailed', (req) => {
    const reason = req.failure()?.errorText ?? 'request failed';
    if (!reason.includes('ERR_ABORTED')) {
      issues.push({ kind: 'requestfailed', text: `${reason} ${req.url()}` });
    }
  });
  page.on('response', (res) => {
    const status = res.status();
    if (status >= 500) issues.push({ kind: 'http', text: `${status} ${res.url()}` });
    else if (status >= 400) {
      issues.push({ kind: 'http', level: 'warn', text: `${status} ${res.url()}` });
    }
  });
  return issues;
}

const scenarios = [
  {
    id: 'smoke-landing',
    title: 'Landing page renders with zero horizontal overflow and valid title',
    async run(page, ctx) {
      await page.goto('./', { waitUntil: 'domcontentloaded' });
      await ctx.expectVisible('body');
      const title = await page.title();
      ctx.assert(title.includes('AutoFair'), `Unexpected title: ${title}`);

      // Verify header and brand
      await ctx.expectText('AutoFair');
      await ctx.expectText('Quote Auditor');

      // Check for horizontal overflow
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      ctx.assert(overflow <= 1, `horizontal overflow: ${overflow}px`);

      await ctx.shot('landing');
    },
  },
  {
    id: 'preset-audit-switch',
    title: 'Switching Reddit benchmark quote presets dynamically updates audit metrics',
    async run(page, ctx) {
      await page.goto('./', { waitUntil: 'domcontentloaded' });

      // Default preset is loaded: Dealer 60k service
      await ctx.expectText('Step 2 — AutoFair Quote Audit Report');
      await ctx.expectText('Total Quoted Bill');

      // Click on "Front Brake & Rotor Replacement Sticker Shock" preset
      const brakePreset = page.getByText(/Front Brake & Rotor Replacement Sticker Shock/i).first();
      await brakePreset.click();

      // Check that vehicle updated to Toyota RAV4
      await ctx.expectText('Toyota');
      await ctx.expectText('RAV4 LE');

      // Check that the line items updated
      await ctx.expectText('Front Brake Pads & Rotors Replacement');

      await ctx.shot('brake-preset-loaded');

      // Now click on "Fair & Honest Independent Mechanic Baseline"
      const honestPreset = page.getByText(/Fair & Honest Independent Mechanic Baseline/i).first();
      await honestPreset.click();

      // Verify that status updates to "Fair & Competitive Quote"
      await ctx.expectText('Fair & Competitive Quote');
      await ctx.expectText('Subaru');

      await ctx.shot('honest-preset-loaded');
    },
  },
  {
    id: 'line-item-builder',
    title: 'User adds a new repair line item, edits pricing, and observes reactive recalculation',
    async run(page, ctx) {
      await page.goto('./', { waitUntil: 'domcontentloaded' });

      // Click "+ Custom unlisted service"
      const customToggle = page.getByText('+ Custom unlisted service').first();
      await customToggle.click();

      // Fill in custom service details
      const customInput = page.getByPlaceholder(/e\.g\. CV Axle Shaft Replacement/i).first();
      await customInput.fill('Alternator Voltage Regulator Test');

      // Click "Add Line"
      const addButton = page.getByRole('button', { name: /Add Line/i }).first();
      await addButton.click();

      // Verify that the custom line appeared in the table
      await ctx.expectText('Alternator Voltage Regulator Test');

      await ctx.shot('custom-item-added');
    },
  },
  {
    id: 'upsell-radar-negotiate',
    title: 'Anti-Upsell Radar flags predatory flushes and renders negotiation scripts',
    async run(page, ctx) {
      await page.goto('./', { waitUntil: 'domcontentloaded' });

      // Load dealer 60k preset
      const dealerPreset = page.getByText(/The Dealership 60,000-Mile "Wallet Flush"/i).first();
      await dealerPreset.click();

      // Check Anti-Upsell Radar card
      await ctx.expectText(/Anti-Upsell Radar:/i);
      await ctx.expectText(/Fuel Induction \/ Throttle Body/i);

      // Check Negotiation Assistant section
      await ctx.expectText('Mechanic Counter-Negotiation Scripts');
      await ctx.expectText(/Where in the official manufacturer Owners Manual/i);

      await ctx.shot('upsell-and-negotiation');
    },
  },
  {
    id: 'diy-alternatives',
    title: 'DIY Alternatives card displays savings, tools, and video tutorial link',
    async run(page, ctx) {
      await page.goto('./', { waitUntil: 'domcontentloaded' });

      // Check DIY section
      await ctx.expectText('DIY Feasibility & Money-Saving Alternatives');
      await ctx.expectText('Cabin Air Filter Replacement');
      await ctx.expectText('Easy (15-30m)');

      // Verify video guide link is present
      const videoLinks = page.locator('a[href*="youtube.com"]');
      const count = await videoLinks.count();
      ctx.assert(count > 0, 'No YouTube DIY video tutorial links found');

      await ctx.shot('diy-alternatives');
    },
  },
  {
    id: 'competitor-modal',
    title: 'Competitor comparison modal opens and closes properly',
    async run(page, ctx) {
      await page.goto('./', { waitUntil: 'domcontentloaded' });

      // Click "vs RepairPal / KBB" in header
      const compButton = page.getByRole('button', { name: /vs RepairPal \/ KBB/i }).first();
      await compButton.click();

      // Assert modal visible with comparison content
      await ctx.expectText('Why AutoFair vs. RepairPal & Kelley Blue Book?');
      await ctx.expectText('Multi-Line Quote / Invoice Auditing');

      await ctx.shot('competitor-modal-open');

      // Click "Close Comparison"
      const closeButton = page.getByRole('button', { name: /Close Comparison/i }).first();
      await closeButton.click();

      // Assert modal is dismissed
      await page.waitForTimeout(300);
      const modalHeader = page.getByText('Why AutoFair vs. RepairPal & Kelley Blue Book?');
      const isVisible = await modalHeader.isVisible().catch(() => false);
      ctx.assert(!isVisible, 'Modal did not close');

      await ctx.shot('competitor-modal-closed');
    },
  },
  {
    id: 'reset-empty-state',
    title: 'Clear button resets quote to empty state with helpful guidance',
    async run(page, ctx) {
      await page.goto('./', { waitUntil: 'domcontentloaded' });

      // Click Clear
      const clearBtn = page.getByRole('button', { name: /Clear/i }).first();
      await clearBtn.click();

      // Verify empty state message
      await ctx.expectText('No repair lines added yet');
      await ctx.expectText('Select a service below to add it');

      await ctx.shot('empty-state');
    },
  },
];

async function main() {
  const browserType = BROWSER === 'chromium' ? chromium : firefox;
  const browser = await browserType.launch({ headless: !HEADED });
  const startedAt = new Date().toISOString();
  const results = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      baseURL: BASE,
      viewport: vp.viewport,
      deviceScaleFactor: vp.deviceScaleFactor,
    });

    for (const scenario of scenarios) {
      const page = await context.newPage();
      const issues = collectIssues(page);
      const screenshots = [];
      const started = Date.now();
      let status = 'pass';
      let error = null;

      const ctx = {
        assert,
        expectVisible: (selector, timeout) => expectVisible(page, selector, timeout),
        expectText: (text, timeout) => expectText(page, text, timeout),
        shot: async (name, opts = {}) => {
          const file = path.join(SHOTS, `${scenario.id}-${name}-${vp.name}.png`);
          await page.screenshot({ path: file, fullPage: opts.fullPage ?? true });
          screenshots.push(file);
          return file;
        },
      };

      try {
        await scenario.run(page, ctx);
      } catch (err) {
        status = 'fail';
        error = err.message;
      } finally {
        await page.close().catch(() => {});
      }

      const errors = issues.filter((i) => (i.level ?? 'error') === 'error');
      const warnings = issues.filter((i) => i.level === 'warn');
      if (status === 'pass' && errors.length > 0) {
        status = 'fail';
        error = errors.map((i) => `${i.kind}: ${i.text}`).join(' | ');
      }

      results.push({
        viewport: vp.name,
        id: scenario.id,
        title: scenario.title,
        status,
        ms: Date.now() - started,
        error,
        errors,
        warnings,
        screenshots,
      });

      console.log(
        `${status === 'pass' ? '✓' : '✗'} [${vp.name}] ${scenario.id}` +
          (error ? ` — ${error}` : '')
      );
    }

    await context.close();
  }

  await browser.close();

  const summary = {
    total: results.length,
    pass: results.filter((r) => r.status === 'pass').length,
    fail: results.filter((r) => r.status === 'fail').length,
  };
  const finishedAt = new Date().toISOString();
  const report = {
    base: BASE,
    browser: BROWSER,
    headed: HEADED,
    startedAt,
    finishedAt,
    summary,
    results,
  };

  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(report, null, 2));

  const warnings = results.flatMap((r) =>
    r.warnings.map((w) => `- [${r.viewport}] ${r.id}: ${w.kind} — ${w.text}`)
  );
  const md = [
    `# QA Report — AutoFair`,
    '',
    `- Date: ${finishedAt}`,
    `- Base URL: ${BASE}`,
    `- Browser: ${BROWSER} (${HEADED ? 'headed' : 'headless'})`,
    `- Total Tests: ${summary.total}`,
    `- Passed: ${summary.pass}`,
    `- Failed: ${summary.fail}`,
    '',
    '## Test Execution Matrix',
    '',
    '| Viewport | Scenario ID | Status | Duration (ms) | Detail |',
    '|---|---|---|---|---|',
    ...results.map(
      (r) =>
        `| ${r.viewport} | ${r.id} | ${r.status.toUpperCase()} | ${r.ms} | ${(r.error ?? 'None').replace(/\|/g, '\\|')} |`
    ),
    '',
    ...(warnings.length ? ['## Warnings', '', ...warnings, ''] : []),
    '## Captured Screenshots',
    '',
    ...results.flatMap((r) => r.screenshots.map((s) => `- ${s}`)),
    '',
  ].join('\n');

  fs.writeFileSync(path.join(OUT, 'report.md'), md);

  if (summary.fail > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal runner error:', err);
  process.exit(1);
});

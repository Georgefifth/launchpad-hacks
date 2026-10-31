import { chromium } from 'playwright';
import path from 'node:path';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 800 },
    deviceScaleFactor: 2,
  });

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 800px;
    background: radial-gradient(circle at 20% 20%, #1e293b 0%, #0f172a 100%);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 80px;
    position: relative;
    overflow: hidden;
  }
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }
  .glow {
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%);
    top: -100px;
    right: -100px;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(59,130,246,0.15);
    border: 1px solid rgba(59,130,246,0.4);
    color: #60a5fa;
    padding: 8px 18px;
    border-radius: 9999px;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .title-group {
    margin-top: 40px;
  }
  h1 {
    font-size: 78px;
    font-weight: 900;
    letter-spacing: -0.03em;
    line-height: 1.05;
    background: linear-gradient(to bottom right, #ffffff, #cbd5e1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .tagline {
    font-size: 28px;
    color: #94a3b8;
    margin-top: 16px;
    font-weight: 400;
    max-width: 850px;
    line-height: 1.35;
  }
  .stats-row {
    display: flex;
    gap: 24px;
    margin-top: 40px;
  }
  .stat-pill {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 14px 22px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .stat-pill .num {
    font-size: 22px;
    font-weight: 800;
    color: #38bdf8;
  }
  .stat-pill .desc {
    font-size: 14px;
    color: #94a3b8;
  }
  .footer-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 30px;
  }
  .launch-text {
    font-size: 16px;
    font-weight: 600;
    color: #f59e0b;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .platform-tags {
    font-size: 14px;
    color: #64748b;
  }
</style>
</head>
<body>
  <div class="grid-pattern"></div>
  <div class="glow"></div>

  <div>
    <div class="badge">
      <span>🛡️ Anti-Upsell Radar</span>
      <span>•</span>
      <span>Wholesale Parts Transparency</span>
    </div>

    <div class="title-group">
      <h1>AutoFair</h1>
      <p class="tagline">The consumer-first quote auditor that stops mechanics from overcharging drivers on labor hours and unneeded flushes.</p>
    </div>

    <div class="stats-row">
      <div class="stat-pill">
        <span class="num">100%</span>
        <span class="desc">Predatory Upsell Recall</span>
      </div>
      <div class="stat-pill">
        <span class="num">$0</span>
        <span class="desc">Dealer Kickbacks / Ads</span>
      </div>
      <div class="stat-pill">
        <span class="num">&lt; 1ms</span>
        <span class="desc">Private Client Audit</span>
      </div>
    </div>
  </div>

  <div class="footer-row">
    <div class="launch-text">
      <span>⚡ Built for LaunchPad Hacks 2026</span>
    </div>
    <div class="platform-tags">
      React 19 • TypeScript • Tailwind CSS • Playwright Verified
    </div>
  </div>
</body>
</html>`;

  await page.setContent(html);
  const outPath = path.resolve('evidence/stage-5-submission/thumbnail.png');
  await page.screenshot({ path: outPath });
  console.log('Thumbnail rendered to:', outPath);
  await browser.close();
}

main().catch(console.error);

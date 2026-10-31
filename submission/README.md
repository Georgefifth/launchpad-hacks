# Devpost Submission Package — AutoFair

**Competition**: [LaunchPad Hacks on Devpost](https://launchpad-hacks.devpost.com/)  
**Target Page**: [Start a Submission](https://launchpad-hacks.devpost.com/challenges/start_a_submission)  

---

## 1. Basic Information (基本信息)

- **Project Name (项目名称)**:
  ```text
  AutoFair — Automotive Repair Quote & Anti-Upsell Auditor
  ```

- **Elevator Pitch (一句话简介)**:
  ```text
  An open, unbiased repair quote auditor that protects drivers from inflated mechanic labor hours, 300% parts markups, and predatory dealer chemical flushes.
  ```

---

## 2. Links (项目链接)

- **Try it out (GitHub Pages 在线演示)**:
  ```text
  https://georgefifth.github.io/launchpad-hacks/
  ```

- **GitHub Repository (源码仓库)**:
  ```text
  https://github.com/Georgefifth/launchpad-hacks
  ```

- **Demo Video (演示视频)**:
  Local file at `evidence/stage-4-demo/demo.mp4` (1080p Full HD, 67.8s)

---

## 3. Media Assets (素材文件)

- **Thumbnail (封面缩略图, 1200x800, 3:2 PNG)**:
  `evidence/stage-5-submission/thumbnail.png`

- **Image Gallery (图库截图与说明)**:
  1. `evidence/stage-5-submission/gallery/01-audit-dashboard.png`  
     *Caption*: `AutoFair Quote Audit Dashboard: Total quoted bill decomposed into standard book labor hours and wholesale parts fair market benchmarks.`
  2. `evidence/stage-5-submission/gallery/02-real-world-presets.png`  
     *Caption*: `One-click presets loaded from authentic Reddit r/MechanicAdvice quote controversies, showing real dealer markups and fair shop baselines.`
  3. `evidence/stage-5-submission/gallery/03-anti-upsell-radar.png`  
     *Caption*: `Anti-Upsell Radar flagging predatory dealership profit-center flushes that are not mandated by manufacturer factory maintenance schedules.`
  4. `evidence/stage-5-submission/gallery/04-negotiation-scripts.png`  
     *Caption*: `One-click mechanic counter-negotiation scripts and DIY feasibility alternatives with tool lists and video tutorial links.`
  5. `evidence/stage-5-submission/gallery/05-competitor-comparison.png`  
     *Caption*: `Unbiased comparison matrix demonstrating AutoFair's consumer advocacy advantages over ad-supported platforms like RepairPal and KBB.`

---

## 4. Built With (技术标签)

```text
react, typescript, vite, tailwindcss, playwright, vitest, ffmpeg, edgetts, javascript, automotive, consumer-advocacy, open-source, data-visualization
```

---

## 5. About the Project (项目正文 Markdown)

```markdown
## Inspiration

Every driver dreads taking their car into a repair shop. You pull in for a simple routine oil change, and twenty minutes later the service advisor hands you an intimidating paper invoice totaling $1,200 with seven unfamiliar line items: *"Transmission Flush"*, *"Fuel Induction Decarbonizing Service"*, and an $85 *"Cabin Air Filter"*. 

On Reddit communities like `r/MechanicAdvice` (1.8M members), hundreds of anxious drivers post daily photos of mechanic estimates asking the exact same question: **"Am I getting ripped off?"**

When we looked at incumbent online calculators like RepairPal or Kelley Blue Book, we discovered a troubling conflict of interest: they operate as lead-generation referral networks funded by certified repair shops and dealerships. They force users to search one isolated part at a time, quote inflated dealership list prices, and never tell drivers which services are predatory upsells.

We built **AutoFair** to level the playing field: a fast, 100% private, client-side consumer advocate that audits entire multi-line repair estimates against official labor book times, exposes unneeded dealer chemical flushes, and gives everyday drivers the exact negotiation scripts to push back.

## What it does

AutoFair acts as an expert mechanic sitting in your passenger seat:

1. **Multi-Line Quote Auditing**: Enter your vehicle (year/make/model), local shop labor rate, and quoted line items—or paste raw quote text. AutoFair instantly decomposes the bill into standard labor guide book hours and fair wholesale parts ranges (aftermarket vs. OEM).
2. **Anti-Upsell Danger Radar**: Algorithmic detection of high-margin dealer profit centers (e.g. fuel induction flushes, high-pressure transmission flushes on CVTs, and power steering flushes on electric steering vehicles) that are never mandated by manufacturer factory service manuals.
3. **Overlapping Labor Detection**: Catches shops double-dipping on labor for shared access procedures (e.g. charging full standalone labor for a serpentine belt when the alternator is already off).
4. **Mechanic Counter-Negotiation Scripts**: Generates professional, industry-standard questions and emails you can copy with one click to challenge questionable line items before signing.
5. **DIY Feasibility & Savings Engine**: Flags simple 15-minute maintenance items (cabin filters, engine filters, battery, wipers) with required tools, video guide links, and estimated cash savings.
6. **Real-World Benchmark Presets**: Pre-loaded with authentic controversial quotes from Reddit `r/MechanicAdvice` so drivers can see how real-world dealer traps are exposed.

## How we built it

We designed AutoFair as a modern, high-performance, mobile-first Web application with zero server dependencies:

- **Frontend & UI**: Built with **React 19**, **TypeScript**, and **Vite 8**, styled with **Tailwind CSS v4** and **Lucide React** icons.
- **Audit Calculation Engine**: A deterministic mathematical model calibrated against standard flat-rate labor guides (Mitchell1 / AllData benchmarks) and wholesale aftermarket parts pricing tiers (RockAuto, Denso, Bosch, Akebono).
- **Validation & QA**: Tested using **Playwright** driving headless Firefox and Chromium across both desktop (1440×900) and mobile (390×844) viewports with zero layout overflow and zero console errors.
- **Real-World Benchmarking**: Validated against an external dataset of 15 authentic Reddit repair quotes, achieving 100% accuracy and 100% recall on predatory flush detection.
- **Demo Production**: Fully authored and rendered with `demo-recorder` (Playwright + Edge TTS + FFmpeg) into a 1080p narrated, captioned video.

## Challenges we ran into

- **Regional Labor Rate Variance**: Independent rural shops charge ~$90/hr, regional chains average ~$140/hr, and luxury metropolitan dealerships exceed ~$220/hr. Rather than imposing a single arbitrary average, we engineered an interactive labor rate slider with one-click presets for independent, chain, and dealer baselines.
- **Shared Access Overlap Math**: Many automotive components share teardown steps. We built dependency-graph rules to detect complementary service pairs (such as water pumps and coolant flushes or timing belts and tensioners) to prevent redundant labor charges.
- **Zero-Ad Privacy Architecture**: Traditional estimators require user registration, email capture, or phone numbers to sell leads. We committed to keeping AutoFair 100% client-side with zero tracking or account gates.

## Accomplishments that we're proud of

- **100% Real-World Validation**: Out of 15 challenging real-world mechanic quotes from Reddit across 5 difficulty tiers, AutoFair achieved a **100% pass rate** with **0 false positive accusations** on honest independent shops.
- **Sub-Millisecond Client Audits**: Entire multi-line quotes recalculate dynamically in under 1ms with zero network lag.
- **Empowering Consumer Advocacy**: Giving drivers concrete, respectful language to ask service advisors: *"Where in the official manufacturer Owners Manual is this flush specified?"*

## What we learned

We learned that automotive maintenance asymmetry is rarely about parts being inherently expensive; it is driven by obscure markup structures, shop supplies fee surcharges, and commission incentives on non-OEM chemical flushes. Transparent data bridges the gap between drivers and honest technicians.

## What's next for AutoFair

- **OCR Paper Invoice Scanning**: Allow users to snap a photo of a handwritten or printed mechanic quote on their phone and automatically extract line items via on-device Tesseract OCR.
- **NHTSA Live VIN Recall Integration**: Automatically query the open NHTSA API when entering a VIN to cross-reference customer symptoms with active factory Technical Service Bulletins (TSBs) and safety recalls.
- **Community Shop Leaderboard**: Enable drivers to share verified fair quotes to highlight honest local independent mechanics who respect factory service schedules.
```

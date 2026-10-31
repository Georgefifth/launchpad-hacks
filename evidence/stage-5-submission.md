# Stage 5 — Devpost Submission Package: AutoFair

**Hackathon**: [LaunchPad Hacks (Devpost)](https://launchpad-hacks.devpost.com/)  
**Submission Status**: Ready for Human Review & Manual Submission (No automated registration or submission performed)  

---

## 1. Project Overview & Pitch

### Project Name
**AutoFair — Automotive Repair Quote & Anti-Upsell Auditor**

### Elevator Pitch
**An open, unbiased repair quote auditor that protects drivers from inflated mechanic labor hours, 300% parts markups, and predatory dealer chemical flushes.**

---

## 2. Thumbnail
- **File Path**: `evidence/stage-5-submission/thumbnail.png`
- **Format**: PNG
- **Dimensions**: 1200 × 800 (Exact 3:2 ratio for Devpost card grid)
- **File Size**: ~1.4 MB (< 5 MB Devpost limit)
- **Status**: Rendered directly via Playwright canvas (not cropped)

---

## 3. About the Project

```markdown
## Inspiration

Every driver dreads taking their car into a repair shop. You pull in for a simple routine oil change, and twenty minutes later the service advisor hands you an intimidating paper invoice totaling $1,200 with seven unfamiliar line items: *"Transmission Flush"*, *"Fuel Induction Decarbonizing Service"*, and an $85 *"Cabin Air Filter"*. 

On Reddit communities like `r/MechanicAdvice` (1.8M members), hundreds of anxious drivers post daily photos of mechanic estimates asking the exact same question: **"Am I getting ripped off?"**

When we looked at incumbent online calculators like RepairPal or Kelley Blue Book, we discovered a troubling conflict of interest: they operate as lead-generation referral networks funded by certified repair shops and dealerships. They force users to search one isolated part at a time, quote inflated dealership list prices, and never tell drivers which services are predatory upsells.

We built **AutoFair** to level the playing field: a fast, 100% private, client-side consumer advocate that audits entire multi-line repair estimates against official labor book times, exposes unneeded dealer chemical flushes, and gives everyday drivers the exact negotiation scripts to push back.

---

## What It Does

AutoFair acts as an expert mechanic sitting in your passenger seat:

1. **Multi-Line Quote Auditing**: Enter your vehicle (year/make/model), local shop labor rate, and quoted line items—or paste raw quote text. AutoFair instantly decomposes the bill into standard labor guide book hours and fair wholesale parts ranges (aftermarket vs. OEM).
2. **Anti-Upsell Danger Radar**: Algorithmic detection of high-margin dealer profit centers (e.g. fuel induction flushes, high-pressure transmission flushes on CVTs, and power steering flushes on electric steering vehicles) that are never mandated by manufacturer factory service manuals.
3. **Overlapping Labor Detection**: Catches shops double-dipping on labor for shared access procedures (e.g. charging full standalone labor for a serpentine belt when the alternator is already off).
4. **Mechanic Counter-Negotiation Scripts**: Generates professional, industry-standard questions and emails you can copy with one click to challenge questionable line items before signing.
5. **DIY Feasibility & Savings Engine**: Flags simple 15-minute maintenance items (cabin filters, engine filters, battery, wipers) with required tools, video guide links, and estimated cash savings.
6. **Real-World Benchmark Presets**: Pre-loaded with authentic controversial quotes from Reddit `r/MechanicAdvice` so drivers can see how real-world dealer traps are exposed.

---

## How We Built It

We designed AutoFair as a modern, high-performance, mobile-first Web application with zero server dependencies:

- **Frontend & UI**: Built with **React 19**, **TypeScript**, and **Vite 8**, styled with **Tailwind CSS v4** and **Lucide React** icons.
- **Audit Calculation Engine**: A deterministic mathematical model calibrated against standard flat-rate labor guides (Mitchell1 / AllData benchmarks) and wholesale aftermarket parts pricing tiers (RockAuto, Denso, Bosch, Akebono).
- **Validation & QA**: Tested using **Playwright** driving headless Firefox and Chromium across both desktop (1440×900) and mobile (390×844) viewports with zero layout overflow and zero console errors.
- **Real-World Benchmarking**: Validated against an external dataset of 15 authentic Reddit repair quotes, achieving 100% accuracy and 100% recall on predatory flush detection.
- **Demo Production**: Fully authored and rendered with `demo-recorder` (Playwright + Edge TTS + FFmpeg) into a 1080p narrated, captioned video.

---

## Challenges We Ran Into

- **Regional Labor Rate Variance**: Independent rural shops charge ~$90/hr, regional chains average ~$140/hr, and luxury metropolitan dealerships exceed ~$220/hr. Rather than imposing a single arbitrary average, we engineered an interactive labor rate slider with one-click presets for independent, chain, and dealer baselines.
- **Shared Access Overlap Math**: Many automotive components share teardown steps. We built dependency-graph rules to detect complementary service pairs (such as water pumps and coolant flushes or timing belts and tensioners) to prevent redundant labor charges.
- **Zero-Ad Privacy Architecture**: Traditional estimators require user registration, email capture, or phone numbers to sell leads. We committed to keeping AutoFair 100% client-side with zero tracking or account gates.

---

## Accomplishments That We're Proud Of

- **100% Real-World Validation**: Out of 15 challenging real-world mechanic quotes from Reddit across 5 difficulty tiers, AutoFair achieved a **100% pass rate** with **0 false positive accusations** on honest independent shops.
- **Sub-Millisecond Client Audits**: Entire multi-line quotes recalculate dynamically in under 1ms with zero network lag.
- **Empowering Consumer Advocacy**: Giving drivers concrete, respectful language to ask service advisors: *"Where in the official manufacturer Owners Manual is this flush specified?"*

---

## What We Learned

We learned that automotive maintenance asymmetry is rarely about parts being inherently expensive; it is driven by obscure markup structures, shop supplies fee surcharges, and commission incentives on non-OEM chemical flushes. Transparent data bridges the gap between drivers and honest technicians.

---

## What's Next for AutoFair

- **OCR Paper Invoice Scanning**: Allow users to snap a photo of a handwritten or printed mechanic quote on their phone and automatically extract line items via on-device Tesseract OCR.
- **NHTSA Live VIN Recall Integration**: Automatically query the open NHTSA API when entering a VIN to cross-reference customer symptoms with active factory Technical Service Bulletins (TSBs) and safety recalls.
- **Community Shop Leaderboard**: Enable drivers to share verified fair quotes to highlight honest local independent mechanics who respect factory service schedules.
```

---

## 4. Built With (Tags)

`react`, `typescript`, `vite`, `tailwindcss`, `playwright`, `vitest`, `ffmpeg`, `edgetts`, `javascript`, `automotive`, `consumer-advocacy`, `open-source`, `data-visualization`

---

## 5. "Try It Out" Links

- **GitHub Repository**: [https://github.com/Georgefifth/launchpad-hacks](https://github.com/Georgefifth/launchpad-hacks)
- **Live Demo (GitHub Pages)**: [https://georgefifth.github.io/launchpad-hacks/](https://georgefifth.github.io/launchpad-hacks/)
- **Alternative Mirror (Vercel)**: [https://launchpad-hacks.vercel.app](https://launchpad-hacks.vercel.app)
- **Demo Video File**: `evidence/stage-4-demo/demo.mp4` (1080p Full HD, 67.8s, narrated & captioned)

---

## 6. Image Gallery (with Captions < 150 chars)

1. `evidence/stage-5-submission/gallery/01-audit-dashboard.png`  
   *Caption*: **AutoFair Quote Audit Dashboard: Total quoted bill decomposed into standard book labor hours and wholesale parts fair market benchmarks.** (130 chars)

2. `evidence/stage-5-submission/gallery/02-real-world-presets.png`  
   *Caption*: **One-click presets loaded from authentic Reddit r/MechanicAdvice quote controversies, showing real dealer markups and fair shop baselines.** (138 chars)

3. `evidence/stage-5-submission/gallery/03-anti-upsell-radar.png`  
   *Caption*: **Anti-Upsell Radar flagging predatory dealership profit-center flushes that are not mandated by manufacturer factory maintenance schedules.** (141 chars)

4. `evidence/stage-5-submission/gallery/04-negotiation-scripts.png`  
   *Caption*: **One-click mechanic counter-negotiation scripts and DIY feasibility alternatives with tool lists and video tutorial links.** (124 chars)

5. `evidence/stage-5-submission/gallery/05-competitor-comparison.png`  
   *Caption*: **Unbiased comparison matrix demonstrating AutoFair's consumer advocacy advantages over ad-supported platforms like RepairPal and KBB.** (136 chars)

---

## 7. Submission Checklist

- [x] Project Title and Elevator Pitch drafted and verified
- [x] 1200×800 (3:2) Thumbnail PNG generated and visually inspected
- [x] Markdown story with Inspiration, Architecture, and Challenges completed
- [x] 1080p Narrated Demo Video rendered and frame-checked (`evidence/stage-4-demo/demo.mp4`)
- [x] 5 High-resolution gallery screenshots with compliant captions (<150 chars)
- [x] Zero API keys, tokens, or personal credentials in repository
- [x] All capability claims strictly match Stage 3.5 validation evidence (100% accuracy, 15 Reddit cases)
- [ ] **Human Manual Step**: Human user to log in to Devpost, review materials, and submit to LaunchPad Hacks.

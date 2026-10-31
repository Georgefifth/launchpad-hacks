# Stage 2 — Build & Competitive Analysis Report

**Date**: 2026-10-31  
**Project**: AutoFair — Automotive Repair Quote & Anti-Upsell Auditor  
**Hackathon**: [LaunchPad Hacks (Devpost)](https://launchpad-hacks.devpost.com/)  

---

## 1. Deep Competitive Product Research

We analyzed 4 direct and indirect incumbents in the automotive consumer cost estimator space:

### 1. [RepairPal Estimator](https://repairpal.com/estimator)
- **Strengths**: Established brand name; large historical repair database; wide consumer reach.
- **Weaknesses / Consumer Complaints**:
  - Operates on a sponsored repair shop monetization model where repair shops pay monthly dues to become "RepairPal Certified" and receive customer leads.
  - Requires selecting single isolated repair tasks from rigid dropdowns; cannot audit an entire multi-line invoice.
  - Blind to common multi-item upsells (e.g. dealership 60k flush packages).
  - Users on Reddit `r/MechanicAdvice` and `r/cars` report that parts prices are frequently listed at inflated dealer list prices (e.g., quoting $786 for an axle assembly that sells for $120 aftermarket).

### 2. [Kelley Blue Book (KBB) Auto Repair Pricing](https://www.kbb.com/auto-repair)
- **Strengths**: High consumer trust from vehicle valuation heritage; broad regional zip-code granularity.
- **Weaknesses**:
  - Only provides high-level "Fair Repair Ranges" for single individual repairs; zero line-item decomposition.
  - No labor vs. parts wholesale cost transparency.
  - Zero warning indicators for unnecessary flushes or predatory dealer upsells.

### 3. [YourMechanic Estimator](https://yourmechanic.com/estimates)
- **Strengths**: Flat-rate labor pricing; transparent mobile mechanic quotes.
- **Weaknesses**:
  - Closed marketplace designed exclusively to book their own mobile mechanics.
  - Does not help drivers evaluate quotes from their existing local independent or dealership mechanic.
  - Geographic coverage limited to select metropolitan regions.

### 4. Reddit `r/MechanicAdvice` (Crowdsourced Manual Quote Verification)
- **Strengths**: Real mechanics provide authentic feedback on paper quotes and detect scams.
- **Weaknesses**:
  - Asynchronous (takes hours or days to get answers); heavily dependent on subreddit traffic.
  - Inconsistent, subjective opinions with no standardized labor guide math.

---

## 2. Product Architecture & User Workflow Review

### Key User Problems Identified & Prioritized:
1. **P0 (Critical)**: **Inability to audit itemized multi-line quotes**: Drivers receive paper quotes with 4-7 lines (fluids, filters, brakes, shop fees). Legacy tools only check one line at a time.
   - *Resolution*: Implemented multi-line estimate builder with fast presets and raw text parsing.
2. **P0 (Critical)**: **Predatory flush & upsell traps**: Shops charge $150–$250 for chemical flushes (fuel induction, transmission flushes on CVTs, power steering flush on electric steering EPS) not mandated by OEMs.
   - *Resolution*: Built the **Anti-Upsell Radar** flagging predatory services with OEM maintenance schedule context.
3. **P1 (High)**: **Labor overlap double-dipping**: Shops charge separate labor for water pumps and timing belts, or alternators and serpentine belts, even though access is shared.
   - *Resolution*: Algorithmic detection of complementary service pairs with counter-negotiation scripts.
4. **P1 (High)**: **Information asymmetry at the shop counter**: Consumers know a quote feels expensive but lack technical vocabulary to push back.
   - *Resolution*: Generated exact **Mechanic Counter-Negotiation Scripts** with one-click copy.
5. **P2 (Medium)**: **Simple DIY alternatives**: Routine maintenance like cabin filters ($90 shop charge) take 3 minutes with zero tools.
   - *Resolution*: Built **DIY Feasibility & Tool Guide** showing exact cost savings and video tutorial links.

---

## 3. Implementation Details

- **Tech Stack**:
  - React 19 + TypeScript + Vite 8
  - Tailwind CSS v4 styling for high-contrast, responsive mobile-first UI
  - Lucide React iconography
  - Vitest test runner for pure calculation audit engine
- **Local & Production Build**:
  - Zero server-side API dependencies or keys; all labor book calculations and wholesale part ranges run client-side.
  - Zero external tracking or privacy leakages.
  - Fully compatible with static hosting (GitHub Pages, Vercel, Netlify).

---

## 4. Test Results & Verification

### Vitest Unit Test Results:
```text
✓ src/utils/auditEngine.test.ts (4 tests)
  ✓ AutoFair Audit Engine > correctly audits a fair and honest quote as "fair"
  ✓ AutoFair Audit Engine > detects common dealer upsell traps and calculates potential savings
  ✓ AutoFair Audit Engine > flags overlapping labor between alternator and serpentine belt
  ✓ AutoFair Audit Engine > handles custom unlisted line items without crashing
Test Files: 1 passed (1)
Tests: 4 passed (4)
Duration: 85ms
```

### Production Build & Asset Verification:
```text
dist/index.html                   1.21 kB │ gzip:  0.74 kB
dist/assets/index-DDcrEmA2.css   36.32 kB │ gzip:  6.89 kB
dist/assets/index-C4PPc3G-.js   294.42 kB │ gzip: 89.72 kB
✓ built in 115ms
Preview server: http://127.0.0.1:4173 (HTTP 200 OK verified)
```

---

## 5. Repository Status & Deployment Notes

- **GitHub Repository**: [https://github.com/Georgefifth/launchpad-hacks](https://github.com/Georgefifth/launchpad-hacks) (Public, clean, zero secrets/tokens)
- **Live GitHub Pages URL**: [https://georgefifth.github.io/launchpad-hacks/](https://georgefifth.github.io/launchpad-hacks/) (Automated CI/CD via GitHub Actions `.github/workflows/deploy.yml`)
- **Alternative Vercel URL**: [https://launchpad-hacks.vercel.app](https://launchpad-hacks.vercel.app)
- **Live Verification**: Both deployed production URLs verified with Playwright E2E browser test suite (14/14 tests pass on live domain).

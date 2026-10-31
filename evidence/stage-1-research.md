# Stage 1 — Research & Candidate Selection Report

**Date**: 2026-10-31  
**Hackathon**: [LaunchPad Hacks (Devpost)](https://launchpad-hacks.devpost.com/)  
**Theme Context**: Objective specified "完成 car" (Automotive / Vehicle domain priority, while evaluating high-impact utility prototypes).

---

## 1. Market Research & Problem Space Exploration

According to community feedback on Reddit (`r/MechanicAdvice` with 1.8M members, `r/cars` with 6.2M members), consumer complaints to the FTC, and student driver forums:
- Automotive repair and maintenance is one of the highest-asymmetry consumer markets. Consumers routinely receive opaque $1,000–$3,000 quotes and have zero objective baseline for labor hours vs. wholesale parts pricing.
- Used car pre-purchase inspections are either skipped due to cost ($150–$250) or seller refusal, leading budget buyers (especially students) to buy "lemons" with catastrophic hidden failures (e.g., CVT transmission failure, head gasket leaks).
- OBD-II check-engine codes are cryptic error symptoms (e.g. `P0420`), causing drivers to unnecessarily replace $1,200 catalytic converters when an $80 oxygen sensor or exhaust leak was at fault.
- Commuters and university students face high parking permit costs ($300–$600/year) and gas expenses, yet existing carpooling networks (e.g. Waze Carpool) have shut down.

---

## 2. Six Differentiated Candidate Directions

### Direction 1: AutoFair (RepairQuote Auditor & Anti-Upsell Assistant)
*Automotive Consumer Protection & Repair Transparency*

- **Target Users & Pain Points**: Everyday car owners and student drivers receiving mechanic repair estimates or invoices. They fear being ripped off, don't understand labor book hours vs. parts markup, and fall victim to dealer/chain upsells (e.g., unnecessary $180 fluid flushes, $90 cabin filter replacements).
- **Current Workarounds**: Posting photos of paper quotes to Reddit `r/MechanicAdvice` asking "Am I being ripped off?", searching vague forum threads, or calling multiple shops for verbal quotes.
- **Existing Products**:
  1. [RepairPal Estimator](https://repairpal.com/estimator) — Outdated, rigid form; requires knowing exact technical job names; heavily monetized toward certified partner repair shops; does not break down itemized quotes or detect upsells.
  2. [Kelley Blue Book Auto Repair Pricing](https://www.kbb.com/auto-repair) — High-level regional ballpark averages; cannot audit a multi-line invoice; no DIY vs. pro comparison or upsell warning indicators.
- **Flaws & Evidence in Existing Tools**: Reddit `r/MechanicAdvice` receives dozens of daily quote check requests because RepairPal and KBB only give generic single-service ranges and fail to explain *why* an invoice is high (e.g., overlapping labor charges or 400% parts markup).
- **Our Value Add**:
  - Interactive multi-item invoice/quote auditor: Enter make, model, year, zip code / region, and line items.
  - Decomposition into Standard Labor Book Hours × Regional Labor Rate + Fair Wholesale Parts Range (OEM vs. Aftermarket).
  - **Upsell & Scam Danger Index**: Algorithmic detection of common high-margin upsells (e.g., fuel induction service, power steering flush, early brake fluid change) not mandated by OEM factory service manuals.
  - **Shop Negotiation Script**: Specific questions to challenge the mechanic (e.g., "Are you charging overlapping labor for the water pump when you already removed the timing belt?").
  - **DIY Feasibility Rating**: Flags simple 10-minute repairs (cabin air filter, battery, wiper blades, bulb) with tool lists and cost savings.
- **Feasibility & Tech Stack**: Fully client-side / lightweight Node API with bundled database of top 60 automotive maintenance and repair jobs, OEM intervals, standard labor guide times, and parts pricing tiers.
- **Risks**: Labor rates vary significantly between rural independent shops ($90/hr) and metropolitan luxury dealerships ($220+/hr); must allow user-adjustable hourly labor baseline.

---

### Direction 2: LemonGuard (Used Car Pre-Purchase Inspection & Defect Radar)
*First-Time Car Buyer Roadside Due Diligence*

- **Target Users & Pain Points**: Budget car buyers, students, and first-time vehicle purchasers browsing Facebook Marketplace, Craigslist, or independent used car lots.
- **Current Workarounds**: Taking a mechanically inclined friend along, reading generic printable PDF checklists, or paying $200 for a Pre-Purchase Inspection (which sellers frequently decline).
- **Existing Products**:
  1. [Carfax](https://www.carfax.com) / [AutoCheck](https://www.autocheck.com) — Paid ($40+ per report), only lists reported police/insurance incidents; completely blind to unreported mechanical wear, failed transmissions, or deferred maintenance.
  2. [ChrisFix Used Car Checklist](https://www.youtube.com/watch?v=vC8LbvYk6es) — Popular static printable PDF; not model-specific, cannot decode VIN, lacks real-time calculation of repair liability.
- **Flaws in Existing Tools**: A Carfax report marked "Clean Title" can still have a blown head gasket, slipping Nissan CVT, or failing Honda VTC actuator.
- **Our Value Add**:
  - Model-specific roadside checklist loaded dynamically by Year/Make/Model or VIN (leveraging free NHTSA API for recalls/complaints).
  - Known failure radar: Highlights vehicle-specific vulnerabilities (e.g., Ford PowerShift DPS6 clutch shudder, Hyundai Theta II engine rod knock, Subaru EJ25 head gaskets).
  - 15-Minute guided walkaround & test drive audit with photographic/audio symptom check (cold start noise, transmission slip test, exhaust smoke color, tire tread wear pattern).
  - Generates a **Bargaining Leverage Card** with estimated immediate repair deductions and a walk-away risk score.
- **Feasibility & Tech Stack**: Web app using open NHTSA vPIC API for VIN decoding and recalls, alongside a curated database of known model-year failure modes.
- **Risks**: User must physically perform tests; software can only guide and interpret, not plug into vehicle sensors.

---

### Direction 3: OBD-Sense (Plain-English DTC Diagnostic & Action Plan)
*Demystifying Check Engine Lights for Non-Mechanics*

- **Target Users & Pain Points**: Drivers whose Check Engine Light (CEL) turns on and who pull diagnostic trouble codes (DTCs like `P0171`, `P0420`, `P0300`) using a cheap $15 Bluetooth scanner or free AutoZone scan.
- **Current Workarounds**: Googling codes and landing on technical forums, panicking that the car will explode, or blindly replacing expensive parts.
- **Existing Products**:
  1. [OBD-Codes.com](https://www.obd-codes.com) — Exhaustive technical encyclopedia written for mechanics; overwhelming wall of text with no interactive troubleshooting triage.
  2. [Car Scanner ELM / Torque Pro](https://www.carscanner.info) — Mobile apps that display raw sensor gauges and PID streams; excellent for technicians, useless for everyday drivers asking "Can I drive to work tomorrow?".
- **Flaws in Existing Tools**: Scanners identify symptoms, not causes. A `P0420` (Catalyst System Efficiency) causes people to waste $1,200 on a catalytic converter when a $20 exhaust gasket or $80 O2 sensor was the culprit.
- **Our Value Add**:
  - Plain-English code translation: "Safe to drive?" urgency tier (Green: Minor/Emissions; Yellow: Degraded performance; Flashing/Red: Stop immediately).
  - Interactive Symptom Triage Tree: Cross-references DTC codes with driver symptoms (rough idle, hesitation, smell, MPG drop) to rank most probable causes.
  - DIY Triage Guide: Simple checks with household tools (e.g., visual vacuum line inspection, MAF cleaner spray) before visiting a shop.
- **Feasibility & Tech Stack**: Complete SAE J1979 standard DTC library with symptom cross-indexing; clean responsive UI.
- **Risks**: High variety in manufacturer-specific enhanced codes (P1xxx / Uxxxx); needs clear disclaimer on safety.

---

### Direction 4: CommutePool (Campus & Student Route Carpool Matcher)
*Micro-Transit Cost-Splitting & Daily Commute Coordination*

- **Target Users & Pain Points**: Off-campus college students and daily commuters struggling with parking pass shortages ($300–$600/term), gas costs, and public transit deserts.
- **Current Workarounds**: Chaotic informal posts in campus Discord, Reddit, or WhatsApp groups; uncoordinated schedule matching and awkward gas money splitting.
- **Existing Products**:
  1. Waze Carpool — **Discontinued / Shut down globally in late 2022**.
  2. Uber / Lyft — Prohibitively expensive ($20–$40 per trip) for daily student commuting.
- **Flaws in Existing Tools**: With Waze Carpool dead and enterprise apps (Scoop) inaccessible to students, there is no zero-commission, campus-oriented commute coordinator.
- **Our Value Add**:
  - Interactive campus route & schedule matching (corridors between major student housing clusters and campus transit hubs).
  - Automated fair-cost reimbursement calculator (based on IRS standard mileage rate and seat occupancy, zero platform cut).
  - Recurring schedule calendar sync and verification via student email or campus badge.
- **Feasibility & Tech Stack**: Leaflet/OpenStreetMap routing, schedule match matrix, Web UI.
- **Risks**: Multi-sided network effect required for live adoption in production; for a hackathon, relies on simulated routes and student persona scenarios.

---

### Direction 5: TrueTCO (Used Car vs. EV Real-World Financial Simulator)
*Multi-Year Total Cost of Ownership Decision Engine*

- **Target Users & Pain Points**: Budget car buyers deciding between keeping an older car, buying a used economical ICE car (e.g. 2015 Honda Civic), or buying a used EV/hybrid (e.g. 2019 Chevy Bolt / Prius).
- **Current Workarounds**: Oversimplified online loan calculators that only show monthly finance payments and ignore depreciation, insurance premiums, battery degradation, and maintenance spikes.
- **Existing Products**:
  1. [Edmunds True Cost to Own (TCO)](https://www.edmunds.com/tco.html) — Restricted to new or late-model cars; national averages; cannot input personalized electricity rates (peak vs off-peak) or used car mileage brackets.
  2. [AFDC Vehicle Cost Calculator](https://afdc.energy.gov/calc/) — Government tool with clunky, dated interface and rigid assumptions.
- **Flaws in Existing Tools**: Neglects critical real-world factors: used EV battery health degradation curves, 30% faster tire wear on heavy EVs, and regional insurance premium surges.
- **Our Value Add**:
  - Side-by-side multi-year financial simulation comparing specific used gas, hybrid, and EV models.
  - Granular inputs: Home Level 1/2 charging vs. public DC fast charging ratio, winter range loss, expected annual mileage, and insurance tier estimate.
  - Interactive visual breakdown: Cumulative cost curves, payback breakeven month, and risk sensitivity analysis.
- **Feasibility & Tech Stack**: Financial simulation engine with Chart.js / SVG data visualization, pre-seeded vehicle parameter sets.
- **Risks**: Financial forecasting relies on inflation and fuel volatility assumptions; must provide adjustable sliders.

---

### Direction 6: DevLaunch (Student Hackathon & OSS Project Launch Linter)
*Productivity / Dev Tool Alternative for LaunchPad Hacks*

- **Target Users & Pain Points**: Student hackathon participants and indie developers preparing to launch projects on Devpost, GitHub, or Product Hunt.
- **Current Workarounds**: Manual checklists, asking teammates to click links, rushing before submission deadlines.
- **Existing Products**:
  1. Code Linters (ESLint, SonarQube) — Analyze code syntax/quality only; zero product launch validation.
  2. Standard GitHub Action / CI — Tests test-suites, but doesn't check live demo availability, README completeness, or judge demo credentials.
- **Flaws in Existing Tools**: Projects lose hackathons due to 404 live links, missing sample login credentials, unseeded databases, or lack of architecture diagrams.
- **Our Value Add**:
  - Live demo URL and repository scanner: Validates HTTPS status, mobile responsiveness, demo account availability, license presence, and README clarity score.
  - Generates a polished "Launch Readiness Scorecard" with one-click fix suggestions.
- **Feasibility & Tech Stack**: Node / Browser test runner inspecting DOM headers, lighthouse metrics, and markdown parsers.
- **Risks**: Less aligned if user's objective keyword "car" specifically demands an automotive domain project.

---

## 3. Evaluation & Comparison Matrix

Evaluation Criteria (1–10 Scale, strictly grounded):
- **Utility (实用价值)**: Solves an immediate, quantifiable financial or practical user pain point.
- **Innovation (创新程度)**: Distinctive approach compared to incumbent legacy platforms.
- **Competitive Edge (竞争优势)**: Transparent, unbiased, ad-free, instant actionable intelligence.
- **UX & Polish (用户体验)**: Intuitive, accessible for non-technical users, mobile-ready.
- **Feasibility (可行性)**: Can be built, tested with E2E Playwright QA, validated with real datasets, and presented with zero broken dependencies.

| Candidate Direction | Utility (实用) | Innovation (创新) | Edge (优势) | UX (体验) | Feasibility (可行) | Total / 50 | Rank |
|---|---|---|---|---|---|---|---|
| **1. AutoFair (Repair Quote Auditor)** | 9.5 | 8.5 | 9.0 | 9.0 | 9.5 | **45.5** | **1** |
| **2. LemonGuard (Used Car Inspector)** | 9.0 | 8.5 | 8.5 | 8.5 | 9.0 | **43.5** | **2** |
| **3. OBD-Sense (DTC Plain Diagnostic)** | 8.5 | 8.0 | 8.0 | 8.5 | 9.5 | **42.5** | **3** |
| **4. CommutePool (Campus Carpool)** | 8.0 | 7.5 | 7.5 | 8.0 | 7.5 | **38.5** | **5** |
| **5. TrueTCO (Used Car vs EV TCO)** | 8.5 | 8.0 | 8.0 | 8.5 | 9.0 | **42.0** | **4** |
| **6. DevLaunch (Hackathon Launch Linter)** | 7.5 | 7.5 | 7.0 | 8.0 | 8.5 | **38.5** | **5** |

---

## 4. Critical Critique & Elimination

1. **Why not CommutePool?**
   Carpool apps are inherently two-sided network marketplaces. A prototype without live local drivers is hard to demonstrate convincingly in an offline hackathon evaluation compared to a self-contained decision engine.
2. **Why not DevLaunch?**
   While practical for hackathon hackers, it does not address the explicit "car" prompt directive and competes in an already crowded developer tooling ecosystem.
3. **Why AutoFair is the strongest candidate?**
   - **Real, intense emotional and financial pain**: Every car owner dreads mechanic quotes. Hundreds of thousands of posts on Reddit (`r/MechanicAdvice`) ask the exact question: *"Is this fair? Am I being ripped off?"*.
   - **Zero reliable modern consumer tools**: RepairPal and KBB are ad-supported lead-generation engines for dealerships, not consumer advocates.
   - **Definitive testability**: Can be rigorously validated against real mechanic quotes from Reddit and public automotive labor guide benchmarks with precise mathematical ground truth.
   - **Perfect fit for LaunchPad Hacks**: Highly practical prototype with clear launch potential and viral consumer appeal.

---

## 5. Recommendation & Next Steps

**Top Recommendation**: **AutoFair — Automotive Repair Quote Auditor & Anti-Upsell Assistant**  
*(Alternative strong contender if pre-purchase inspection is preferred: LemonGuard)*

### Recommended Project Scope for AutoFair (MVP):
1. **Interactive Quote Auditor**: Add/paste repair line items with vehicle year/make/model and regional labor rate.
2. **Fair Price Decomposition**: Labor hours vs. parts fair wholesale range calculation against industry book times.
3. **Scam / Upsell Detector**: Highlights unnecessary high-margin dealership upsells (e.g. system flushes, fuel additives, excessive shop supplies fees).
4. **Negotiation Assistant & DIY Alternative**: Generates counter-questions for the shop and flags beginner-friendly DIY fixes with step-by-step guidance and tool lists.
5. **Real-world Quote Presets**: Pre-loaded with authentic Reddit `r/MechanicAdvice` controversial quotes (brake job markup, 60k service upsell bundle, alternator replacement) for instant testing and demonstration.

---

### Human Decision Required

Per `prompts/01-research.md` (Stage 1 exit condition) and `AGENTS.md`:
We now pause to await the human user's decision on the topic before proceeding to Stage 2 (Architecture & Build).

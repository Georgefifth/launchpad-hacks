# QA Scenarios — AutoFair (LaunchPad Hacks)

## Scope
Comprehensive browser-level verification of AutoFair, an automotive repair quote and anti-upsell auditor built for LaunchPad Hacks 2026.

## Priority Matrix

| Priority | ID | Scenario | User-Visible Outcome |
|---|---|---|---|
| **P0** | `smoke-landing` | Landing page smoke & layout integrity | Page loads with HTTP 200, title present, zero console errors, zero horizontal overflow on both 1440px and 390px viewports. |
| **P0** | `preset-audit-switch` | Benchmark scenario selection & audit engine | Switching between Reddit quote presets correctly loads vehicle, line items, and updates the fairness status badge, total quoted, and upsell danger flags. |
| **P0** | `line-item-builder` | Add custom line item & real-time recalculation | User adds a new repair line item, edits parts and labor costs, and observes immediate reactive audit updates in the summary dashboard. |
| **P1** | `upsell-radar-negotiate` | Anti-Upsell Radar & Negotiation scripts | High-risk flushes trigger alert cards with OEM context; negotiation script generates actionable counter-questions with functional copy buttons. |
| **P1** | `diy-alternatives` | DIY Alternatives & Savings guide | Easy maintenance items (cabin filter, battery, spark plugs) display tool requirements, cost savings, and working tutorial links. |
| **P1** | `competitor-modal` | Competitor comparison modal | Opening modal renders feature matrix against RepairPal and KBB, and can be dismissed cleanly via close button. |
| **P2** | `reset-empty-state` | Clear quote & empty state recovery | Clicking Clear resets items to empty state without JS errors, displaying clean empty state guidance. |

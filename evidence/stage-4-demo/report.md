# Stage 4 — Demo Video & Presentation Report: AutoFair

**Date**: 2026-10-31  
**Project**: AutoFair — Automotive Repair Quote & Anti-Upsell Auditor  
**Hackathon**: [LaunchPad Hacks (Devpost)](https://launchpad-hacks.devpost.com/)  
**Render Output**: `evidence/stage-4-demo/demo.mp4`  

---

## 1. Video Technical Specifications

- **Format**: MP4 (H.264 High Profile / AAC Audio)
- **Resolution**: 1920 × 1080 (1080p Full HD, 16:9)
- **Frame Rate**: 30.0 fps
- **Duration**: 67.88 seconds (~1 min 08 sec)
- **File Size**: 5.76 MB (optimized for instant streaming and Devpost embedding)
- **Voiceover**: Neural TTS (`en-US-ChristopherNeural` via `edge-tts`)
- **Captions**: Burned-in ASS subtitles (high-contrast DejaVu Sans bold with outline, positioned safely in bottom zone)
- **Visual Theme / Preset**: `dark-premium` (deep navy `#0f172a` backdrop with `#3b82f6` blue and `#10b981` emerald accents)

---

## 2. Storyboard & Scene Breakdown

| Scene # | Name | Type | Duration | Visual Content & Live Action | Voiceover Narration |
|---|---|---|---|---|---|
| 01 | `cover` | Card | 4.0s | Hero title, LaunchPad Hacks badge, value proposition | *"Meet AutoFair: the open quote auditor that stops mechanics from ripping you off."* |
| 02 | `problem` | Card | 6.0s | The $1,200 Dilemma, Reddit quote anxiety citation | *"Drivers face confusing estimates packed with unnecessary dealer flushes and markups, with no way to verify fair pricing."* |
| 03 | `live-preset-switch` | Live App | 8.7s | Live switching between authentic Reddit benchmark quotes | *"With AutoFair, drivers load real-world estimates or enter their line items to immediately see their car fair market range."* |
| 04 | `live-audit-detail` | Live App | 9.0s | Dealership 60k service audit, Anti-Upsell Radar inspection | *"Our Anti-Upsell Radar exposes predatory profit flushes that are never mandated by manufacturer factory service schedules."* |
| 05 | `live-negotiation-diy` | Live App | 9.8s | Counter-negotiation copy script, DIY alternatives & savings | *"Drivers get instant, professional negotiation scripts to challenge the shop, plus DIY alternatives for simple fifteen-minute fixes."* |
| 06 | `competitor-matrix` | Live App | 8.9s | Feature matrix popup vs RepairPal & Kelley Blue Book | *"Unlike RepairPal or Kelley Blue Book, AutoFair audits full multi-line invoices with zero dealer advertising kickbacks."* |
| 07 | `validation-proof` | Card | 9.1s | 100% Real-World Verified badge, 15 Reddit cases proof | *"Tested on fifteen authentic Reddit quote controversies, AutoFair achieved one hundred percent accuracy and perfect upsell recall."* |
| 08 | `cta` | Card | 6.9s | Closing launch card, open source & client privacy attribution | *"AutoFair: built for LaunchPad Hacks, protecting car owners one quote at a time."* |

---

## 3. Frame-Level Quality Assurance Log

Frames were extracted at $t = 2\text{s}, 8\text{s}, 18\text{s}, 28\text{s}, 38\text{s}, 48\text{s}, 58\text{s}, 64\text{s}$ using \`ffmpeg\` and inspected with multimodal vision tools:

1. **`frame-2.png` (Cover)**: Crisp typography, clean hierarchy, subtitles centered with no overflow.
2. **`frame-8.png` (Problem Statement)**: Red warning accent correctly signals consumer friction, title and footer legible.
3. **`frame-18.png` (Live Preset Switch)**: Live mouse pointer visibly selects "Front Brake & Rotor Replacement Sticker Shock", table items update reactively.
4. **`frame-28.png` (Live Audit Detail)**: Scroll transition exposes Anti-Upsell Radar cards with OEM context.
5. **`frame-38.png` (Live Negotiation Scripts)**: One-click copy interaction, DIY Feasibility card showing estimated savings and tool lists.
6. **`frame-48.png` (Competitor Matrix)**: Modal renders comparison table against RepairPal and KBB with zero clipping.
7. **`frame-58.png` (Validation Proof)**: Emerald accent highlights 100% accuracy on 15 Reddit quote controversies.
8. **`frame-64.png` (Call to Action)**: Polished closing card aligning with hackathon theme.

### Capture Log Integrity Check:
```text
node -e "const t=require('./evidence/stage-4-demo/demo.work/timestamps.json'); const bad=t.filter(x=>x.error); console.log(bad.length ? bad : 'no capture errors')"
>> no capture errors
```

---

## 4. Summary & Readiness

All demo assets, video, and QA frames are saved under `evidence/stage-4-demo/`. The video satisfies all hackathon time and resolution constraints and accurately reflects our Stage 3.5 validated product capabilities.

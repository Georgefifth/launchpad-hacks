import { QuoteLineItem, QuoteAuditResult, UpsellFlag, LineItemAudit } from '../types';
import { REPAIR_SERVICES } from '../data/repairDatabase';

export function auditQuote(
  items: QuoteLineItem[],
  laborRate: number = 140,
  shopSuppliesFee: number = 0
): QuoteAuditResult {
  let totalQuoted = shopSuppliesFee;
  let totalFairMin = 0;
  let totalFairMax = 0;

  let totalLaborQuoted = 0;
  let totalLaborFairMin = 0;
  let totalLaborFairMax = 0;

  let totalPartsQuoted = 0;
  let totalPartsFairMin = 0;
  let totalPartsFairMax = 0;

  let diySavingsTotal = 0;
  const lineAudits: LineItemAudit[] = [];
  const upsellFlags: UpsellFlag[] = [];
  const negotiationPoints: string[] = [];

  // Check shop supplies fee
  if (shopSuppliesFee > 0) {
    if (shopSuppliesFee > 45) {
      upsellFlags.push({
        id: 'shop_supplies_excessive',
        serviceName: 'Shop Supplies & Environmental Surcharge',
        severity: 'high',
        title: 'Excessive Miscellaneous Shop Fee',
        description: `The shop is charging $${shopSuppliesFee.toFixed(2)} for "shop supplies" or "hazmat fees". While minor shop fees ($15-$30) cover shop rags and brake cleaner, fees exceeding $40 are frequently automated profit markups.`,
        recommendation: 'Ask the service writer for an itemized breakdown of what specific hazmat disposal or materials were used for this service.',
        quotedAmount: shopSuppliesFee,
      });
      negotiationPoints.push(`Request reduction of the $${shopSuppliesFee.toFixed(2)} Shop Supplies fee to a flat $25 cap.`);
    }
  }

  // Track present service IDs for overlap detection
  const activeServiceIds = new Set(items.map((i) => i.serviceId).filter(Boolean));

  // Detect overlapping labor: e.g., Alternator + Serpentine belt
  if (activeServiceIds.has('alternator_replacement') && activeServiceIds.has('serpentine_belt')) {
    negotiationPoints.push(
      'Labor Overlap: The serpentine belt must be completely unbolted and removed to replace the alternator. Do NOT pay full standalone labor for serpentine belt replacement.'
    );
  }

  // Detect overlapping labor: e.g., Water pump + Thermostat
  if (activeServiceIds.has('water_pump_thermostat') && activeServiceIds.has('coolant_flush')) {
    negotiationPoints.push(
      'Labor Overlap: Replacing the water pump already requires draining and refilling the entire cooling system. You should not be billed for a separate "Coolant Flush" service.'
    );
  }

  items.forEach((item) => {
    const quotedParts = item.quotedPartsPrice || 0;
    const quotedLabor = item.quotedLaborPrice || 0;
    const itemQuotedTotal = quotedParts + quotedLabor;

    totalQuoted += itemQuotedTotal;
    totalLaborQuoted += quotedLabor;
    totalPartsQuoted += quotedParts;

    const matchedService = REPAIR_SERVICES.find((s) => s.id === item.serviceId);

    let fairLaborMin = 0;
    let fairLaborMax = 0;
    let fairPartsMin = 0;
    let fairPartsMax = 0;

    let laborStatus: 'fair' | 'high' | 'excessive' = 'fair';
    let partsStatus: 'fair' | 'high' | 'excessive' = 'fair';
    let isUpsell = false;
    let upsellNote: string | undefined;

    if (matchedService) {
      fairLaborMin = Math.round(matchedService.typicalLaborHours.min * laborRate);
      fairLaborMax = Math.round(matchedService.typicalLaborHours.max * laborRate);

      fairPartsMin = matchedService.partsCostFairRange.aftermarketMin;
      fairPartsMax = matchedService.partsCostFairRange.oemMax;

      // Status checks
      if (fairLaborMax > 0) {
        if (quotedLabor > fairLaborMax * 1.5) {
          laborStatus = 'excessive';
        } else if (quotedLabor > fairLaborMax * 1.15) {
          laborStatus = 'high';
        }
      }

      if (fairPartsMax > 0) {
        if (quotedParts > fairPartsMax * 1.45) {
          partsStatus = 'excessive';
        } else if (quotedParts > fairPartsMax * 1.15) {
          partsStatus = 'high';
        }
      }

      // Check known upsell services
      if (matchedService.isCommonUpsell) {
        isUpsell = true;
        upsellNote = matchedService.upsellReason;

        upsellFlags.push({
          id: `upsell_${item.id}`,
          serviceName: matchedService.name,
          severity: matchedService.id === 'power_steering_flush' ? 'critical' : 'high',
          title: `Potential Non-Essential Upsell: ${matchedService.name}`,
          description: matchedService.upsellReason || 'Service is often recommended prematurely by shops.',
          recommendation: matchedService.negotiationTip,
          quotedAmount: itemQuotedTotal,
        });

        negotiationPoints.push(
          `${matchedService.name}: ${matchedService.negotiationTip}`
        );
      } else if (matchedService.negotiationTip && (laborStatus !== 'fair' || partsStatus !== 'fair')) {
        negotiationPoints.push(`${matchedService.name}: ${matchedService.negotiationTip}`);
      }

      // DIY savings
      if (matchedService.diyDifficulty.startsWith('Easy') || matchedService.diyDifficulty.startsWith('Moderate')) {
        diySavingsTotal += matchedService.diySavingsEstimate;
      }
    } else {
      // Custom item fallback: estimate fair range based on quoted or standard ratios
      fairLaborMin = Math.round(quotedLabor * 0.75);
      fairLaborMax = Math.round(quotedLabor * 1.1);
      fairPartsMin = Math.round(quotedParts * 0.65);
      fairPartsMax = Math.round(quotedParts * 1.1);
    }

    totalLaborFairMin += fairLaborMin;
    totalLaborFairMax += fairLaborMax;
    totalPartsFairMin += fairPartsMin;
    totalPartsFairMax += fairPartsMax;

    totalFairMin += fairLaborMin + fairPartsMin;
    totalFairMax += fairLaborMax + fairPartsMax;

    lineAudits.push({
      lineId: item.id,
      serviceName: matchedService ? matchedService.name : item.serviceName,
      quotedTotal: itemQuotedTotal,
      fairRangeTotal: {
        min: fairLaborMin + fairPartsMin,
        max: fairLaborMax + fairPartsMax,
      },
      fairLaborRange: {
        min: fairLaborMin,
        max: fairLaborMax,
      },
      fairPartsRange: {
        min: fairPartsMin,
        max: fairPartsMax,
      },
      laborStatus,
      partsStatus,
      isUpsell,
      upsellNote,
      diyEligible: Boolean(matchedService && (matchedService.diyDifficulty.startsWith('Easy') || matchedService.diyDifficulty.startsWith('Moderate'))),
      diyDifficulty: matchedService?.diyDifficulty,
      diyTools: matchedService?.diyToolsNeeded,
      negotiationScript: matchedService?.negotiationTip,
    });
  });

  // Calculate overall variance against top of fair benchmark
  let variancePercentage = 0;
  if (totalFairMax > 0) {
    variancePercentage = Math.round(((totalQuoted - totalFairMax) / totalFairMax) * 100);
  }

  let status: 'fair' | 'slightly_high' | 'overcharged' | 'egregious' = 'fair';
  let statusLabel = 'Fair & Honest Estimate';

  const criticalOrHighUpsellsCount = upsellFlags.filter((f) => f.severity === 'critical' || f.severity === 'high').length;

  if (variancePercentage > 60 || criticalOrHighUpsellsCount >= 4) {
    status = 'egregious';
    statusLabel = 'Severely Inflated / Egregious Markup';
  } else if (variancePercentage > 25 || criticalOrHighUpsellsCount >= 2) {
    status = 'overcharged';
    statusLabel = 'Overcharged / Multiple High Markups Detected';
  } else if (variancePercentage > 10 || criticalOrHighUpsellsCount === 1) {
    status = 'slightly_high';
    statusLabel = 'Slightly Above Average Market Rate';
  }

  const estimatedPotentialSavings = Math.max(0, totalQuoted - totalFairMax);

  return {
    totalQuoted,
    totalFairMin,
    totalFairMax,
    totalLaborQuoted,
    totalLaborFairMin,
    totalLaborFairMax,
    totalPartsQuoted,
    totalPartsFairMin,
    totalPartsFairMax,
    variancePercentage,
    status,
    statusLabel,
    upsellFlags,
    lineAudits,
    estimatedPotentialSavings,
    diySavingsTotal,
    negotiationPoints: Array.from(new Set(negotiationPoints)),
  };
}

import { describe, it, expect } from 'vitest';
import { auditQuote } from './auditEngine';
import { QuoteLineItem } from '../types';

describe('AutoFair Audit Engine', () => {
  it('correctly audits a fair and honest quote as "fair"', () => {
    const fairItems: QuoteLineItem[] = [
      {
        id: '1',
        serviceId: 'spark_plugs_4cyl',
        serviceName: 'Spark Plugs Replacement',
        quotedPartsPrice: 50,
        quotedLaborPrice: 120,
      },
      {
        id: '2',
        serviceId: 'oil_change_synthetic',
        serviceName: 'Synthetic Oil Change',
        quotedPartsPrice: 40,
        quotedLaborPrice: 35,
      },
    ];

    const result = auditQuote(fairItems, 120, 15);
    expect(result.status).toBe('fair');
    expect(result.statusLabel).toContain('Fair');
    expect(result.upsellFlags.length).toBe(0);
    expect(result.totalQuoted).toBe(50 + 120 + 40 + 35 + 15);
  });

  it('detects common dealer upsell traps and calculates potential savings', () => {
    const upsellItems: QuoteLineItem[] = [
      {
        id: '1',
        serviceId: 'cabin_air_filter',
        serviceName: 'Cabin Air Filter',
        quotedPartsPrice: 55,
        quotedLaborPrice: 50,
      },
      {
        serviceId: 'fuel_induction_service',
        id: '2',
        serviceName: 'Fuel Induction Service',
        quotedPartsPrice: 45,
        quotedLaborPrice: 180,
      },
      {
        serviceId: 'transmission_flush',
        id: '3',
        serviceName: 'Transmission Flush',
        quotedPartsPrice: 130,
        quotedLaborPrice: 220,
      },
    ];

    const result = auditQuote(upsellItems, 160, 65);
    expect(['overcharged', 'egregious']).toContain(result.status);
    expect(result.upsellFlags.length).toBeGreaterThanOrEqual(3);
    // Should have flagged shop supplies because 65 > 45
    expect(result.upsellFlags.some((f) => f.id === 'shop_supplies_excessive')).toBe(true);
    expect(result.estimatedPotentialSavings).toBeGreaterThan(0);
  });

  it('flags overlapping labor between alternator and serpentine belt', () => {
    const items: QuoteLineItem[] = [
      {
        id: '1',
        serviceId: 'alternator_replacement',
        serviceName: 'Alternator Replacement',
        quotedPartsPrice: 400,
        quotedLaborPrice: 250,
      },
      {
        id: '2',
        serviceId: 'serpentine_belt',
        serviceName: 'Serpentine Belt',
        quotedPartsPrice: 50,
        quotedLaborPrice: 80,
      },
    ];

    const result = auditQuote(items, 140, 20);
    const hasOverlapScript = result.negotiationPoints.some((p) => p.includes('Labor Overlap'));
    expect(hasOverlapScript).toBe(true);
  });

  it('handles custom unlisted line items without crashing', () => {
    const customItems: QuoteLineItem[] = [
      {
        id: 'c1',
        serviceName: 'Custom Custom Bumper Bracket Repair',
        quotedPartsPrice: 120,
        quotedLaborPrice: 180,
      },
    ];

    const result = auditQuote(customItems, 140, 0);
    expect(result.totalQuoted).toBe(300);
    expect(result.lineAudits.length).toBe(1);
    expect(result.lineAudits[0].serviceName).toBe('Custom Custom Bumper Bracket Repair');
  });
});

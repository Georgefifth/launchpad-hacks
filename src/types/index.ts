export type VehicleType = 'sedan' | 'suv' | 'truck' | 'compact' | 'luxury';

export interface Vehicle {
  year: number;
  make: string;
  model: string;
  mileage: number;
  type?: VehicleType;
}

export type UpsellSeverity = 'safe' | 'low' | 'moderate' | 'high' | 'critical';

export interface ServiceDefinition {
  id: string;
  category: 'brakes' | 'engine' | 'fluids' | 'suspension' | 'electrical' | 'exhaust' | 'filters' | 'tires';
  name: string;
  description: string;
  typicalLaborHours: {
    min: number;
    max: number;
  };
  partsCostFairRange: {
    aftermarketMin: number;
    aftermarketMax: number;
    oemMin: number;
    oemMax: number;
  };
  isCommonUpsell: boolean;
  upsellReason?: string;
  oemMandatedIntervalMiles?: number;
  diyDifficulty: 'Easy (15-30m)' | 'Moderate (1-2h)' | 'Advanced (Special Tools)' | 'Professional Only';
  diySavingsEstimate: number;
  diyToolsNeeded?: string[];
  negotiationTip: string;
}

export interface QuoteLineItem {
  id: string;
  serviceId?: string;
  customName?: string;
  serviceName: string;
  category?: string;
  quotedPartsPrice: number;
  quotedLaborPrice: number;
  quotedHours?: number;
  isDeclined?: boolean;
}

export interface QuoteAuditResult {
  totalQuoted: number;
  totalFairMin: number;
  totalFairMax: number;
  totalLaborQuoted: number;
  totalLaborFairMin: number;
  totalLaborFairMax: number;
  totalPartsQuoted: number;
  totalPartsFairMin: number;
  totalPartsFairMax: number;
  variancePercentage: number;
  status: 'fair' | 'slightly_high' | 'overcharged' | 'egregious';
  statusLabel: string;
  upsellFlags: UpsellFlag[];
  lineAudits: LineItemAudit[];
  estimatedPotentialSavings: number;
  diySavingsTotal: number;
  negotiationPoints: string[];
}

export interface UpsellFlag {
  id: string;
  serviceName: string;
  severity: UpsellSeverity;
  title: string;
  description: string;
  recommendation: string;
  quotedAmount: number;
}

export interface LineItemAudit {
  lineId: string;
  serviceName: string;
  quotedTotal: number;
  fairRangeTotal: {
    min: number;
    max: number;
  };
  fairLaborRange: {
    min: number;
    max: number;
  };
  fairPartsRange: {
    min: number;
    max: number;
  };
  laborStatus: 'fair' | 'high' | 'excessive';
  partsStatus: 'fair' | 'high' | 'excessive';
  isUpsell: boolean;
  upsellNote?: string;
  diyEligible: boolean;
  diyDifficulty?: string;
  diyTools?: string[];
  negotiationScript?: string;
}

export interface QuotePreset {
  id: string;
  title: string;
  subtitle: string;
  sourceUrl?: string;
  sourceLabel: string;
  vehicle: Vehicle;
  laborRate: number;
  items: Array<{
    serviceId: string;
    quotedPartsPrice: number;
    quotedLaborPrice: number;
  }>;
  shopSuppliesFee?: number;
  redditQuoteStory: string;
}

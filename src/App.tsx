import { useState, useMemo } from 'react';
import { Vehicle, QuoteLineItem, QuotePreset } from './types';
import { REDDIT_PRESETS } from './data/redditPresets';
import { auditQuote } from './utils/auditEngine';
import { Header } from './components/Header';
import { VehicleSelector } from './components/VehicleSelector';
import { QuotePresets } from './components/QuotePresets';
import { QuoteItemBuilder } from './components/QuoteItemBuilder';
import { AuditSummary } from './components/AuditSummary';
import { UpsellRadar } from './components/UpsellRadar';
import { NegotiationAssistant } from './components/NegotiationAssistant';
import { DIYAlternatives } from './components/DIYAlternatives';
import { CompetitorComparisonModal } from './components/CompetitorComparisonModal';
import { REPAIR_SERVICES } from './data/repairDatabase';

export function App() {
  // Default vehicle setup
  const [vehicle, setVehicle] = useState<Vehicle>({
    year: 2018,
    make: 'Honda',
    model: 'Civic EX',
    mileage: 62000,
    type: 'sedan',
  });

  const [laborRate, setLaborRate] = useState<number>(150);
  const [shopSuppliesFee, setShopSuppliesFee] = useState<number>(55);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('dealer_60k_service');
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);

  // Initialize with Dealer 60k service preset items
  const [items, setItems] = useState<QuoteLineItem[]>(() => {
    const defaultPreset = REDDIT_PRESETS[0];
    return defaultPreset.items.map((it, idx) => {
      const s = REPAIR_SERVICES.find((srv) => srv.id === it.serviceId);
      return {
        id: `init_${idx}`,
        serviceId: it.serviceId,
        serviceName: s ? s.name : 'Unknown Service',
        quotedPartsPrice: it.quotedPartsPrice,
        quotedLaborPrice: it.quotedLaborPrice,
      };
    });
  });

  // Calculate audit results reactively
  const audit = useMemo(() => {
    return auditQuote(items, laborRate, shopSuppliesFee);
  }, [items, laborRate, shopSuppliesFee]);

  const handleSelectPreset = (preset: QuotePreset) => {
    setSelectedPresetId(preset.id);
    setVehicle(preset.vehicle);
    setLaborRate(preset.laborRate);
    setShopSuppliesFee(preset.shopSuppliesFee || 30);

    const newItems: QuoteLineItem[] = preset.items.map((it, idx) => {
      const s = REPAIR_SERVICES.find((srv) => srv.id === it.serviceId);
      return {
        id: `preset_${preset.id}_${idx}`,
        serviceId: it.serviceId,
        serviceName: s ? s.name : 'Repair Service',
        quotedPartsPrice: it.quotedPartsPrice,
        quotedLaborPrice: it.quotedLaborPrice,
      };
    });
    setItems(newItems);
  };

  const handleReset = () => {
    setSelectedPresetId('');
    setItems([]);
    setShopSuppliesFee(0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header onOpenComparison={() => setIsComparisonOpen(true)} onPrint={handlePrint} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Preset Selector Banner */}
        <QuotePresets
          onSelectPreset={handleSelectPreset}
          selectedPresetId={selectedPresetId}
        />

        {/* Vehicle & Hourly Rate Settings */}
        <VehicleSelector
          vehicle={vehicle}
          laborRate={laborRate}
          onVehicleChange={setVehicle}
          onLaborRateChange={setLaborRate}
        />

        {/* Quote Line Item Builder */}
        <QuoteItemBuilder
          items={items}
          shopSuppliesFee={shopSuppliesFee}
          onItemsChange={setItems}
          onShopSuppliesChange={setShopSuppliesFee}
          onReset={handleReset}
        />

        {/* Audit Results Dashboard */}
        <div className="space-y-6">
          <AuditSummary audit={audit} vehicle={vehicle} laborRate={laborRate} />

          {/* Upsell Danger Radar */}
          <UpsellRadar flags={audit.upsellFlags} />

          {/* Side by Side: Negotiation Assistant & DIY Alternatives */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NegotiationAssistant
              negotiationPoints={audit.negotiationPoints}
              shopSuppliesFee={shopSuppliesFee}
            />
            <DIYAlternatives lineAudits={audit.lineAudits} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-300">
              AutoFair — Automotive Repair Quote Auditor &amp; Anti-Upsell Assistant
            </p>
            <p className="mt-0.5 text-slate-500">
              Built for LaunchPad Hacks 2026. Empowering everyday drivers with wholesale parts &amp; labor transparency.
            </p>
          </div>
          <div className="text-right text-[11px] text-slate-500">
            <p>Labor hours based on standard Mitchell/AllData industry labor guides.</p>
            <p>100% open, unbiased, and privacy-first (runs entirely in your browser).</p>
          </div>
        </div>
      </footer>

      {/* Competitor Comparison Modal */}
      <CompetitorComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />
    </div>
  );
}

export default App;

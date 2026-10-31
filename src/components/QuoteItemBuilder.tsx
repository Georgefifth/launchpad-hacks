import React, { useState } from 'react';
import { QuoteLineItem } from '../types';
import { REPAIR_SERVICES } from '../data/repairDatabase';
import { Plus, Trash2, FileText, AlertCircle, RefreshCw } from 'lucide-react';

interface QuoteItemBuilderProps {
  items: QuoteLineItem[];
  shopSuppliesFee: number;
  onItemsChange: (items: QuoteLineItem[]) => void;
  onShopSuppliesChange: (fee: number) => void;
  onReset: () => void;
}

export const QuoteItemBuilder: React.FC<QuoteItemBuilderProps> = ({
  items,
  shopSuppliesFee,
  onItemsChange,
  onShopSuppliesChange,
  onReset,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('front_brake_pads_rotors');
  const [customName, setCustomName] = useState<string>('');
  const [inputParts, setInputParts] = useState<string>('180');
  const [inputLabor, setInputLabor] = useState<string>('160');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [showPasteModal, setShowPasteModal] = useState<boolean>(false);
  const [pasteText, setPasteText] = useState<string>('');

  const handleAddLine = () => {
    let serviceName = '';
    let serviceId: string | undefined = undefined;

    if (isCustom) {
      if (!customName.trim()) return;
      serviceName = customName.trim();
    } else {
      const s = REPAIR_SERVICES.find((srv) => srv.id === selectedServiceId);
      if (!s) return;
      serviceName = s.name;
      serviceId = s.id;
    }

    const newItem: QuoteLineItem = {
      id: `line_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      serviceId,
      serviceName,
      quotedPartsPrice: Number(inputParts) || 0,
      quotedLaborPrice: Number(inputLabor) || 0,
    };

    onItemsChange([...items, newItem]);
    setCustomName('');
    setInputParts('50');
    setInputLabor('100');
  };

  const handleRemoveLine = (id: string) => {
    onItemsChange(items.filter((it) => it.id !== id));
  };

  const handleUpdatePrice = (id: string, field: 'parts' | 'labor', val: number) => {
    onItemsChange(
      items.map((it) => {
        if (it.id !== id) return it;
        return {
          ...it,
          quotedPartsPrice: field === 'parts' ? val : it.quotedPartsPrice,
          quotedLaborPrice: field === 'labor' ? val : it.quotedLaborPrice,
        };
      })
    );
  };

  const handleParsePaste = () => {
    if (!pasteText.trim()) return;
    const lines = pasteText.split('\n').filter((l) => l.trim().length > 0);
    const parsed: QuoteLineItem[] = [];

    lines.forEach((line, idx) => {
      // Look for numbers representing currency
      const matches = line.match(/\$?([0-9]+(?:\.[0-9]{2})?)/g);
      let parts = 0;
      let labor = 0;

      if (matches && matches.length >= 2) {
        parts = parseFloat(matches[0].replace('$', '')) || 0;
        labor = parseFloat(matches[1].replace('$', '')) || 0;
      } else if (matches && matches.length === 1) {
        const total = parseFloat(matches[0].replace('$', '')) || 0;
        parts = Math.round(total * 0.45);
        labor = Math.round(total * 0.55);
      } else {
        parts = 50;
        labor = 100;
      }

      // Try matching service name
      let cleanName = line.replace(/\$?[0-9]+(?:\.[0-9]{2})?/g, '').replace(/[-–:|,]/g, ' ').trim();
      if (!cleanName) cleanName = `Service Item #${idx + 1}`;

      // Search match in REPAIR_SERVICES
      const matched = REPAIR_SERVICES.find((s) =>
        cleanName.toLowerCase().includes(s.name.toLowerCase().split(' ')[0])
      );

      parsed.push({
        id: `paste_${Date.now()}_${idx}`,
        serviceId: matched ? matched.id : undefined,
        serviceName: matched ? matched.name : cleanName,
        quotedPartsPrice: parts,
        quotedLaborPrice: labor,
      });
    });

    if (parsed.length > 0) {
      onItemsChange(parsed);
      setShowPasteModal(false);
      setPasteText('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5 border-b border-slate-100 pb-2.5">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            Repair Estimate Line Items ({items.length})
          </h2>
          <p className="text-xs text-slate-500">
            Enter parts & labor quoted by your mechanic, or paste quote text
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPasteModal(true)}
            className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition"
          >
            Paste Raw Quote
          </button>
          <button
            onClick={onReset}
            className="text-xs font-medium px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition flex items-center gap-1"
            title="Reset Quote"
          >
            <RefreshCw className="w-3 h-3" />
            Clear
          </button>
        </div>
      </div>

      {/* Item List Table */}
      {items.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 my-4">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-600">No repair lines added yet</p>
          <p className="text-xs text-slate-400 mt-1">
            Select a service below to add it, or click a Real-World Scenario above!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto mb-4 border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100/80 text-slate-600 uppercase text-[11px] font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Service / Repair Item</th>
                <th className="py-2.5 px-3 w-28">Parts Quoted ($)</th>
                <th className="py-2.5 px-3 w-28">Labor Quoted ($)</th>
                <th className="py-2.5 px-3 w-24 text-right">Line Total</th>
                <th className="py-2.5 px-2 w-10 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-slate-800">{item.serviceName}</span>
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center">
                      <span className="text-slate-400 text-xs mr-1">$</span>
                      <input
                        type="number"
                        min="0"
                        value={item.quotedPartsPrice}
                        onChange={(e) => handleUpdatePrice(item.id, 'parts', Number(e.target.value))}
                        className="w-20 text-xs sm:text-sm border border-slate-200 rounded px-2 py-1 bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center">
                      <span className="text-slate-400 text-xs mr-1">$</span>
                      <input
                        type="number"
                        min="0"
                        value={item.quotedLaborPrice}
                        onChange={(e) => handleUpdatePrice(item.id, 'labor', Number(e.target.value))}
                        className="w-20 text-xs sm:text-sm border border-slate-200 rounded px-2 py-1 bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right font-semibold text-slate-800">
                    ${(item.quotedPartsPrice + item.quotedLaborPrice).toFixed(2)}
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <button
                      onClick={() => handleRemoveLine(item.id)}
                      className="text-slate-400 hover:text-red-500 transition p-1"
                      title="Delete line"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Shop Supplies Fee Row */}
      <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="text-xs">
          <span className="font-semibold text-slate-700">Shop Supplies / Hazmat Fee:</span>
          <span className="text-slate-500 ml-1.5">
            (Rags, disposal, fluids — typical independent fee is $15–$30; &gt;$40 is often an inflated surcharge)
          </span>
        </div>
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span className="text-xs text-slate-500">$</span>
          <input
            type="number"
            min="0"
            value={shopSuppliesFee}
            onChange={(e) => onShopSuppliesChange(Number(e.target.value))}
            className="w-24 text-xs sm:text-sm border border-slate-300 rounded px-2 py-1 bg-white text-right font-medium"
          />
        </div>
      </div>

      {/* Add New Line Controls */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-700">Add Service to Quote:</span>
          <button
            onClick={() => setIsCustom(!isCustom)}
            className="text-xs text-blue-600 hover:underline"
          >
            {isCustom ? '← Pick from common services' : '+ Custom unlisted service'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end">
          <div className="sm:col-span-6">
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Service Description
            </label>
            {isCustom ? (
              <input
                type="text"
                placeholder="e.g. CV Axle Shaft Replacement"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded px-2.5 py-1.5 bg-white focus:ring-1 focus:ring-blue-500"
              />
            ) : (
              <select
                value={selectedServiceId}
                onChange={(e) => {
                  setSelectedServiceId(e.target.value);
                  const s = REPAIR_SERVICES.find((srv) => srv.id === e.target.value);
                  if (s) {
                    setInputParts(String(Math.round((s.partsCostFairRange.aftermarketMin + s.partsCostFairRange.oemMax) / 2)));
                    setInputLabor(String(Math.round(s.typicalLaborHours.max * 140)));
                  }
                }}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded px-2.5 py-1.5 bg-white focus:ring-1 focus:ring-blue-500"
              >
                {REPAIR_SERVICES.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.name} {srv.isCommonUpsell ? '⚠️ (Common Upsell)' : ''}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Parts ($)</label>
            <input
              type="number"
              min="0"
              value={inputParts}
              onChange={(e) => setInputParts(e.target.value)}
              className="w-full text-xs sm:text-sm border border-slate-300 rounded px-2 py-1.5 bg-white text-right"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Labor ($)</label>
            <input
              type="number"
              min="0"
              value={inputLabor}
              onChange={(e) => setInputLabor(e.target.value)}
              className="w-full text-xs sm:text-sm border border-slate-300 rounded px-2 py-1.5 bg-white text-right"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              onClick={handleAddLine}
              className="w-full text-xs sm:text-sm font-semibold py-1.5 px-3 rounded bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-1 shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              Add Line
            </button>
          </div>
        </div>
      </div>

      {/* Paste Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-lg w-full p-5">
            <h3 className="text-base font-bold text-slate-800 mb-1">Paste Quote Text</h3>
            <p className="text-xs text-slate-500 mb-3">
              Paste line items from your text message, email, or paper quote scan (e.g., "Front Brakes $450 $320"):
            </p>
            <textarea
              rows={6}
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder="Front Brake Pads and Rotors $280 $180&#10;Brake Fluid Flush $35 $120&#10;Cabin Air Filter $50 $40"
              className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg p-2.5 font-mono mb-4 focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPasteModal(false)}
                className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleParsePaste}
                className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
              >
                Parse &amp; Import Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

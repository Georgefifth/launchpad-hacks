import React from 'react';
import { X, Check, Minus, ShieldCheck } from 'lucide-react';

interface CompetitorComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompetitorComparisonModal: React.FC<CompetitorComparisonModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const comparisonData = [
    {
      feature: 'Multi-Line Quote / Invoice Auditing',
      autofair: true,
      repairpal: false,
      kbb: false,
      note: 'AutoFair audits entire multi-line repair estimates simultaneously, not just 1 isolated part.',
    },
    {
      feature: 'Anti-Upsell & Unneeded Flush Radar',
      autofair: true,
      repairpal: false,
      kbb: false,
      note: 'AutoFair flags non-OEM flushes and EPS power steering flush scams.',
    },
    {
      feature: 'Labor Overlap Detection (e.g. Alternator + Belt)',
      autofair: true,
      repairpal: false,
      kbb: false,
      note: 'Detects when shops double-dip on labor for shared access procedures.',
    },
    {
      feature: 'Wholesale Parts vs Labor Hours Decomposition',
      autofair: true,
      repairpal: 'Partial',
      kbb: false,
      note: 'Shows real wholesale aftermarket and OEM price tiers vs shop markup.',
    },
    {
      feature: 'Mechanic Counter-Negotiation Scripts',
      autofair: true,
      repairpal: false,
      kbb: false,
      note: 'AutoFair generates professional scripts with copy-to-clipboard ease.',
    },
    {
      feature: 'DIY Feasibility & Tool Guide',
      autofair: true,
      repairpal: false,
      kbb: false,
      note: 'Highlights simple 15-minute fixes with required tools and cost savings.',
    },
    {
      feature: 'Unbiased / Zero Dealer Advertising Kickbacks',
      autofair: true,
      repairpal: false,
      kbb: false,
      note: 'RepairPal charges repair shops monthly membership fees for leads; AutoFair has zero conflicts of interest.',
    },
    {
      feature: 'Instant Offline Client Execution / Zero Login Wall',
      autofair: true,
      repairpal: false,
      kbb: false,
      note: 'Works instantly on your phone with zero email gates or phone number capture.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-5 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Why AutoFair vs. RepairPal &amp; Kelley Blue Book?
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Traditional online car repair estimators like RepairPal and KBB operate as lead-generation networks for dealerships and sponsor repair shops. AutoFair was built from the ground up as a pure consumer advocate.
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-xl mb-4">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Capability</th>
                <th className="py-2.5 px-3 text-center bg-blue-50/80 text-blue-900">AutoFair</th>
                <th className="py-2.5 px-3 text-center text-slate-600">RepairPal</th>
                <th className="py-2.5 px-3 text-center text-slate-600">KBB Auto Repair</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3 font-medium text-slate-800">
                    <div>{row.feature}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{row.note}</div>
                  </td>
                  <td className="py-2.5 px-3 text-center bg-blue-50/40">
                    <span className="inline-flex items-center justify-center p-1 rounded-full bg-emerald-100 text-emerald-700">
                      <Check className="w-4 h-4" />
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-500">
                    {row.repairpal === true ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    ) : row.repairpal === 'Partial' ? (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1 rounded">
                        Partial
                      </span>
                    ) : (
                      <Minus className="w-4 h-4 text-slate-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-500">
                    {row.kbb === true ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    ) : (
                      <Minus className="w-4 h-4 text-slate-300 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};

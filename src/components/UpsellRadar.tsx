import React from 'react';
import { UpsellFlag } from '../types';
import { AlertOctagon, AlertTriangle, ShieldAlert } from 'lucide-react';

interface UpsellRadarProps {
  flags: UpsellFlag[];
}

export const UpsellRadar: React.FC<UpsellRadarProps> = ({ flags }) => {
  if (flags.length === 0) {
    return (
      <div className="bg-emerald-50/50 rounded-xl border border-emerald-200 p-4 sm:p-5">
        <div className="flex items-center gap-2.5 text-emerald-800">
          <div className="p-1.5 rounded-lg bg-emerald-100">
            <AlertOctagon className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold">Anti-Upsell Radar: Clean Bill of Health!</h3>
            <p className="text-xs text-emerald-700 mt-0.5">
              Zero predatory chemical flushes or phantom service packages detected on this quote.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-red-200 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3 border-b border-red-100 pb-2.5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-red-700 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-600" />
          Anti-Upsell Radar: {flags.length} High-Risk Item{flags.length > 1 ? 's' : ''} Flagged
        </h2>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
          Requires Action
        </span>
      </div>

      <p className="text-xs text-slate-600 mb-4">
        Automotive service advisors receive bonuses and commission points for selling high-margin
        fluid exchanges and quick flush services that are rarely mandated in manufacturer factory maintenance manuals.
      </p>

      <div className="space-y-3">
        {flags.map((flag) => (
          <div
            key={flag.id}
            className={`p-3.5 rounded-xl border transition ${
              flag.severity === 'critical'
                ? 'bg-red-50 border-red-300 text-red-950'
                : 'bg-amber-50/70 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
              <div className="flex items-center gap-2">
                <AlertTriangle
                  className={`w-4 h-4 shrink-0 ${
                    flag.severity === 'critical' ? 'text-red-600' : 'text-amber-600'
                  }`}
                />
                <h4 className="text-xs sm:text-sm font-bold">{flag.title}</h4>
              </div>
              <span className="text-xs font-bold text-red-700 bg-white/80 px-2 py-0.5 rounded border border-red-200 self-start sm:self-auto">
                Quoted: ${flag.quotedAmount.toFixed(2)}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-2">
              {flag.description}
            </p>

            <div className="bg-white/80 rounded-lg p-2.5 border border-slate-200/80 text-xs">
              <span className="font-semibold text-slate-800">Consumer Action / Counter-Question: </span>
              <span className="text-slate-700">{flag.recommendation}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

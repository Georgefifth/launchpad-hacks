import React from 'react';
import { LineItemAudit } from '../types';
import { Wrench, CheckCircle, ExternalLink } from 'lucide-react';

interface DIYAlternativesProps {
  lineAudits: LineItemAudit[];
}

export const DIYAlternatives: React.FC<DIYAlternativesProps> = ({ lineAudits }) => {
  const diyItems = lineAudits.filter((l) => l.diyEligible);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 border-b border-slate-100 pb-2.5">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-indigo-600" />
            DIY Feasibility &amp; Money-Saving Alternatives
          </h2>
          <p className="text-xs text-slate-500">
            Items quoted on your bill that require minimal or zero tools to do yourself
          </p>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 self-start sm:self-auto">
          {diyItems.length} Feasible DIY Item{diyItems.length === 1 ? '' : 's'}
        </span>
      </div>

      {diyItems.length === 0 ? (
        <p className="text-xs text-slate-500 italic py-2">
          The services on your current quote require heavy specialized tools or lift equipment and are best performed by a certified professional.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {diyItems.map((item) => (
            <div
              key={item.lineId}
              className="bg-indigo-50/40 border border-indigo-200 rounded-xl p-3.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {item.serviceName}
                  </h4>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                    {item.diyDifficulty}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1 mb-2">
                  <div className="flex items-center justify-between">
                    <span>Shop Quoted Bill:</span>
                    <span className="font-semibold text-slate-800">${item.quotedTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-700 font-semibold">
                    <span>Estimated DIY Cost:</span>
                    <span>~${(item.fairPartsRange.min * 0.85).toFixed(0)}</span>
                  </div>
                </div>

                {item.diyTools && item.diyTools.length > 0 && (
                  <div className="bg-white/80 rounded-lg p-2 border border-indigo-100 text-[11px] mb-2">
                    <span className="font-semibold text-slate-700">Tools Required: </span>
                    <span className="text-slate-600">{item.diyTools.join(', ')}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-indigo-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Save ~${Math.max(30, item.quotedTotal - item.fairPartsRange.min).toFixed(0)}
                </span>
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                    `how to replace ${item.serviceName}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1"
                >
                  <span>Video Guide</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { QuoteAuditResult, Vehicle } from '../types';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingDown,
  DollarSign,
  Wrench,
  Package,
} from 'lucide-react';

interface AuditSummaryProps {
  audit: QuoteAuditResult;
  vehicle: Vehicle;
  laborRate: number;
}

export const AuditSummary: React.FC<AuditSummaryProps> = ({
  audit,
  vehicle,
  laborRate,
}) => {
  const getStatusBadge = () => {
    switch (audit.status) {
      case 'fair':
        return {
          bg: 'bg-emerald-50 border-emerald-300 text-emerald-800',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
          title: 'Fair & Competitive Quote',
          description:
            'This quote aligns well with standard automotive book labor times and fair aftermarket parts pricing. The shop appears transparent.',
        };
      case 'slightly_high':
        return {
          bg: 'bg-amber-50 border-amber-300 text-amber-800',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
          title: 'Slightly Above Average',
          description:
            'This estimate is 10%–25% higher than independent market fair range. Review specific marked-up items below.',
        };
      case 'overcharged':
        return {
          bg: 'bg-orange-50 border-orange-300 text-orange-900',
          icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
          title: 'Overcharged / Questionable Markups',
          description:
            'Significant labor inflation, steep parts markup, or unnecessary flush upsells detected. Do not sign until negotiating.',
        };
      case 'egregious':
      default:
        return {
          bg: 'bg-red-50 border-red-300 text-red-900',
          icon: <XCircle className="w-5 h-5 text-red-600" />,
          title: 'Severely Inflated / Danger of Rip-Off',
          description:
            'This quote is more than 60% above fair market rates and/or packed with non-OEM dealer upsells. Strongly consider a second opinion.',
        };
    }
  };

  const badge = getStatusBadge();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
          Step 2 — AutoFair Quote Audit Report
        </h2>
        <span className="text-xs text-slate-500">
          Target: {vehicle.year} {vehicle.make} {vehicle.model} ({laborRate}/hr base)
        </span>
      </div>

      {/* Fairness Status Banner */}
      <div className={`rounded-xl border p-4 mb-5 flex items-start gap-3.5 ${badge.bg}`}>
        <div className="shrink-0 mt-0.5">{badge.icon}</div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold">{badge.title}</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/80 border border-current">
              {audit.variancePercentage > 0
                ? `+${audit.variancePercentage}% Markup`
                : audit.upsellFlags.length > 0
                ? `${audit.upsellFlags.length} Upsell Alerts`
                : 'On Benchmark'}
            </span>
          </div>
          <p className="text-xs sm:text-sm mt-1 opacity-90 leading-relaxed">
            {badge.description}
          </p>
        </div>
      </div>

      {/* 4 Metric Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {/* Quoted Total */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
          <div className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" />
            Total Quoted Bill
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            ${audit.totalQuoted.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Parts, labor &amp; shop fees</div>
        </div>

        {/* Fair Market Range */}
        <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3.5">
          <div className="text-xs font-medium text-blue-700 mb-1 flex items-center gap-1">
            <Wrench className="w-3.5 h-3.5" />
            Fair Market Range
          </div>
          <div className="text-lg sm:text-xl font-bold text-blue-900">
            ${audit.totalFairMin.toFixed(0)} – ${audit.totalFairMax.toFixed(0)}
          </div>
          <div className="text-[11px] text-blue-600 mt-1">Based on book hours &amp; wholesale parts</div>
        </div>

        {/* Estimated Overcharge Savings */}
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5">
          <div className="text-xs font-medium text-emerald-700 mb-1 flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            Negotiation Target Savings
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-700">
            ${audit.estimatedPotentialSavings.toFixed(0)}
          </div>
          <div className="text-[11px] text-emerald-600 mt-1">
            {audit.estimatedPotentialSavings > 0
              ? 'Potential savings from challenging quote'
              : 'Quote already within fair ceiling'}
          </div>
        </div>

        {/* DIY Savings */}
        <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-3.5">
          <div className="text-xs font-medium text-indigo-700 mb-1 flex items-center gap-1">
            <Package className="w-3.5 h-3.5" />
            DIY Alternative Savings
          </div>
          <div className="text-xl sm:text-2xl font-black text-indigo-700">
            ${audit.diySavingsTotal.toFixed(0)}
          </div>
          <div className="text-[11px] text-indigo-600 mt-1">By doing easy 15-30m items yourself</div>
        </div>
      </div>

      {/* Labor vs Parts Breakdown Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* Labor Audit */}
        <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-700 flex items-center gap-1">
              <Wrench className="w-3.5 h-3.5 text-blue-600" />
              Labor Cost Audit
            </span>
            <span className="text-slate-900 font-bold">
              Quoted: ${audit.totalLaborQuoted.toFixed(2)}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mb-2">
            Fair Market Benchmark: ${audit.totalLaborFairMin.toFixed(0)} – ${audit.totalLaborFairMax.toFixed(0)}
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full ${
                audit.totalLaborQuoted > audit.totalLaborFairMax * 1.25 ? 'bg-red-500' : 'bg-blue-600'
              }`}
              style={{
                width: `${Math.min(100, (audit.totalLaborQuoted / (audit.totalLaborFairMax || 1)) * 80)}%`,
              }}
            />
          </div>
        </div>

        {/* Parts Audit */}
        <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-700 flex items-center gap-1">
              <Package className="w-3.5 h-3.5 text-indigo-600" />
              Parts Markup Audit
            </span>
            <span className="text-slate-900 font-bold">
              Quoted: ${audit.totalPartsQuoted.toFixed(2)}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mb-2">
            Fair Wholesale Parts Range: ${audit.totalPartsFairMin.toFixed(0)} – ${audit.totalPartsFairMax.toFixed(0)}
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full ${
                audit.totalPartsQuoted > audit.totalPartsFairMax * 1.25 ? 'bg-red-500' : 'bg-indigo-600'
              }`}
              style={{
                width: `${Math.min(100, (audit.totalPartsQuoted / (audit.totalPartsFairMax || 1)) * 80)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Itemized Line-by-Line Breakdown Table */}
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
        Itemized Line-by-Line Audit
      </h3>
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-100 text-slate-600 uppercase text-[11px] font-semibold">
            <tr>
              <th className="py-2.5 px-3">Service</th>
              <th className="py-2.5 px-3 text-right">Quoted Total</th>
              <th className="py-2.5 px-3 text-right">Fair Market Range</th>
              <th className="py-2.5 px-3 text-center">Labor Status</th>
              <th className="py-2.5 px-3 text-center">Parts Status</th>
              <th className="py-2.5 px-3 text-center">Upsell Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {audit.lineAudits.map((line) => (
              <tr key={line.lineId} className="hover:bg-slate-50/80 transition">
                <td className="py-2.5 px-3">
                  <div className="font-semibold text-slate-800">{line.serviceName}</div>
                  {line.isUpsell && (
                    <span className="text-[10px] text-red-600 font-medium bg-red-50 px-1.5 py-0.5 rounded border border-red-200 inline-block mt-0.5">
                      ⚠️ Frequent Unneeded Upsell
                    </span>
                  )}
                </td>
                <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                  ${line.quotedTotal.toFixed(2)}
                </td>
                <td className="py-2.5 px-3 text-right text-slate-600 font-medium">
                  ${line.fairRangeTotal.min.toFixed(0)} – ${line.fairRangeTotal.max.toFixed(0)}
                </td>
                <td className="py-2.5 px-3 text-center">
                  <span
                    className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      line.laborStatus === 'excessive'
                        ? 'bg-red-100 text-red-700'
                        : line.laborStatus === 'high'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {line.laborStatus === 'excessive'
                      ? 'High Hours'
                      : line.laborStatus === 'high'
                      ? 'Slightly High'
                      : 'Fair'}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <span
                    className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      line.partsStatus === 'excessive'
                        ? 'bg-red-100 text-red-700'
                        : line.partsStatus === 'high'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {line.partsStatus === 'excessive'
                      ? 'Heavy Markup'
                      : line.partsStatus === 'high'
                      ? 'High'
                      : 'Fair'}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-center">
                  {line.isUpsell ? (
                    <span className="text-[11px] font-bold text-red-600">High Risk</span>
                  ) : (
                    <span className="text-[11px] text-slate-400">Normal</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

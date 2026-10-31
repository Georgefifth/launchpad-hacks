import React, { useState } from 'react';
import { MessageSquare, Copy, Check, ShieldCheck } from 'lucide-react';

interface NegotiationAssistantProps {
  negotiationPoints: string[];
  shopSuppliesFee: number;
}

export const NegotiationAssistant: React.FC<NegotiationAssistantProps> = ({
  negotiationPoints,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const masterScript = `Hi, I reviewed the estimate you prepared. Before authorizing the work, I would like to clarify a few specific items:\n\n${negotiationPoints
    .map((point, idx) => `${idx + 1}. ${point}`)
    .join('\n')}\n\nCould you please adjust the estimate to reflect standard labor guide times and omit the non-OEM mandated flush services? Thank you.`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 border-b border-slate-100 pb-2.5">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            Mechanic Counter-Negotiation Scripts
          </h2>
          <p className="text-xs text-slate-500">
            Professional industry-standard language to negotiate before signing
          </p>
        </div>

        {negotiationPoints.length > 0 && (
          <button
            onClick={() => handleCopy(masterScript, -1)}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            {copiedIndex === -1 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedIndex === -1 ? 'Copied Full Script!' : 'Copy Full Email / Text'}
          </button>
        )}
      </div>

      {negotiationPoints.length === 0 ? (
        <div className="p-4 bg-slate-50 rounded-lg text-xs text-slate-600 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            No severe discrepancies found on this quote. You can ask for a standard 5% AAA / student discount, but the core pricing appears fair!
          </span>
        </div>
      ) : (
        <div className="space-y-2.5">
          {negotiationPoints.map((point, idx) => (
            <div
              key={idx}
              className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg p-3 text-xs flex items-start justify-between gap-3 transition"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-slate-800 mr-1.5">Point #{idx + 1}:</span>
                <span className="text-slate-700 leading-relaxed font-mono text-[11px] sm:text-xs">
                  "{point}"
                </span>
              </div>
              <button
                onClick={() => handleCopy(point, idx)}
                className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition shrink-0"
                title="Copy talking point"
              >
                {copiedIndex === idx ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { REDDIT_PRESETS } from '../data/redditPresets';
import { QuotePreset } from '../types';
import { Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

interface QuotePresetsProps {
  onSelectPreset: (preset: QuotePreset) => void;
  selectedPresetId?: string;
}

export const QuotePresets: React.FC<QuotePresetsProps> = ({
  onSelectPreset,
  selectedPresetId,
}) => {
  return (
    <div className="bg-slate-900 text-white rounded-xl shadow-sm border border-slate-800 p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3.5 border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Real-World Quote Benchmark Scenarios
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          Load verified Reddit r/MechanicAdvice quote controversies in 1 click
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {REDDIT_PRESETS.map((preset) => {
          const isSelected = selectedPresetId === preset.id;
          return (
            <div
              key={preset.id}
              className={`rounded-lg p-3 text-left border transition flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-blue-950/60 border-blue-500 shadow-sm ring-1 ring-blue-500'
                  : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
              }`}
              onClick={() => onSelectPreset(preset)}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="font-semibold text-blue-400 flex items-center gap-1">
                    {preset.sourceLabel}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </div>
                <h3 className="text-xs font-bold text-slate-100 line-clamp-1 mb-1">
                  {preset.title}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-2 mb-2 leading-relaxed">
                  {preset.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">
                  {preset.vehicle.year} {preset.vehicle.make}
                </span>
                <span
                  className={`inline-flex items-center font-medium ${
                    isSelected ? 'text-blue-400' : 'text-slate-300'
                  }`}
                >
                  {isSelected ? 'Loaded' : 'Load Quote'}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

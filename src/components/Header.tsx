import React from 'react';
import { ShieldCheck, HelpCircle, Printer, Car, Zap } from 'lucide-react';

interface HeaderProps {
  onOpenComparison: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenComparison, onPrint }) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-inner text-white flex items-center justify-center">
              <Car className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  AutoFair
                  <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    Quote Auditor
                  </span>
                </h1>
                <span className="hidden md:inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  Anti-Upsell Radar
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Audit mechanic quotes against labor book time & wholesale parts costs. Never get ripped off again.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenComparison}
              className="inline-flex items-center text-xs sm:text-sm font-medium px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Compare AutoFair with RepairPal and KBB"
            >
              <HelpCircle className="w-4 h-4 mr-1.5 text-blue-400" />
              <span>vs RepairPal / KBB</span>
            </button>

            <button
              onClick={onPrint}
              className="inline-flex items-center text-xs sm:text-sm font-medium px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition"
              title="Print or Save Audit Report as PDF"
            >
              <Printer className="w-4 h-4 mr-1.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 border-t border-slate-800/80 px-4 py-1.5 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <Zap className="w-3.5 h-3.5 text-amber-400" />
        <span>
          <strong>LaunchPad Hacks Prototype:</strong> Zero dealer kickbacks, 100% unbiased consumer advocacy.
        </span>
      </div>
    </header>
  );
};

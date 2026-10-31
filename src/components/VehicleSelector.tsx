import React from 'react';
import { Vehicle } from '../types';
import { Wrench, Gauge, DollarSign } from 'lucide-react';

interface VehicleSelectorProps {
  vehicle: Vehicle;
  laborRate: number;
  onVehicleChange: (vehicle: Vehicle) => void;
  onLaborRateChange: (rate: number) => void;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  vehicle,
  laborRate,
  onVehicleChange,
  onLaborRateChange,
}) => {
  const currentYear = 2026;
  const years = Array.from({ length: 27 }, (_, i) => currentYear - i);

  const commonMakes = [
    'Honda',
    'Toyota',
    'Ford',
    'Chevrolet',
    'Nissan',
    'Subaru',
    'Hyundai',
    'Kia',
    'Mazda',
    'BMW',
    'Mercedes-Benz',
    'Volkswagen',
    'Jeep',
    'Other / Custom',
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-blue-600" />
          Vehicle & Shop Hourly Rate Baseline
        </h2>
        <span className="text-xs text-slate-500">Step 1</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Year */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Year</label>
          <select
            value={vehicle.year}
            onChange={(e) => onVehicleChange({ ...vehicle, year: Number(e.target.value) })}
            className="w-full text-sm border border-slate-300 rounded-lg px-2.5 py-1.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {years.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        {/* Make */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Make</label>
          <select
            value={vehicle.make}
            onChange={(e) => onVehicleChange({ ...vehicle, make: e.target.value })}
            className="w-full text-sm border border-slate-300 rounded-lg px-2.5 py-1.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {commonMakes.map((mk) => (
              <option key={mk} value={mk}>
                {mk}
              </option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Model / Trim</label>
          <input
            type="text"
            value={vehicle.model}
            onChange={(e) => onVehicleChange({ ...vehicle, model: e.target.value })}
            placeholder="e.g. Civic EX, RAV4, F-150"
            className="w-full text-sm border border-slate-300 rounded-lg px-2.5 py-1.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Mileage */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-slate-400" />
            Odometer (Miles)
          </label>
          <input
            type="number"
            step="1000"
            min="0"
            value={vehicle.mileage}
            onChange={(e) => onVehicleChange({ ...vehicle, mileage: Number(e.target.value) })}
            className="w-full text-sm border border-slate-300 rounded-lg px-2.5 py-1.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Labor Rate */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-medium text-slate-600 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-slate-400" />
              Labor Rate/Hr
            </label>
            <span className="text-xs font-bold text-blue-600">${laborRate}/hr</span>
          </div>
          <div className="flex items-center gap-1.5">
            <input
              type="range"
              min="90"
              max="240"
              step="5"
              value={laborRate}
              onChange={(e) => onLaborRateChange(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
            <button
              type="button"
              onClick={() => onLaborRateChange(120)}
              className={`hover:text-blue-600 ${laborRate === 120 ? 'text-blue-600 font-bold' : ''}`}
            >
              Indie ($120)
            </button>
            <button
              type="button"
              onClick={() => onLaborRateChange(140)}
              className={`hover:text-blue-600 ${laborRate === 140 ? 'text-blue-600 font-bold' : ''}`}
            >
              Chain ($140)
            </button>
            <button
              type="button"
              onClick={() => onLaborRateChange(175)}
              className={`hover:text-blue-600 ${laborRate === 175 ? 'text-blue-600 font-bold' : ''}`}
            >
              Dealer ($175)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { InsuranceCardData } from '../types';
import { generateRandomInsuranceData } from '../data/presets';
import { Calendar } from "lucide-react";

interface FormControlsProps {
  data: InsuranceCardData;
  onChange: (newData: InsuranceCardData) => void;
}

export const FormControls: React.FC<FormControlsProps> = ({
  data,
  onChange,
}) => {
  const handleFieldChange = (field: keyof InsuranceCardData, val: string) => {
    onChange({
      ...data,
      [field]: val,
    });
  };



  const setTermDuration = (months: number) => {
    // Attempt parsing current effective date DD MM YYYY
    const parts = data.effectiveDate.trim().split(/\s+/);
    if (parts.length === 3) {
      const d = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const y = parseInt(parts[2], 10);
      if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
        const date = new Date(y, m - 1, d);
        date.setMonth(date.getMonth() + months);
        const newD = String(date.getDate()).padStart(2, '0');
        const newM = String(date.getMonth() + 1).padStart(2, '0');
        const newY = date.getFullYear();
        onChange({
          ...data,
          expiryDate: `${newD} ${newM} ${newY}`,
        });
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-6">

      {/* Form Fields Accordion / Grid */}
      <div className="space-y-4">
        {/* Insured Driver */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center justify-between">
            <span>Insured Person / Driver</span>
            <span className="text-[10px] font-normal text-gray-500">Appears in Box 2</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs sm:text-[11px] font-medium text-gray-600 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={data.insuredName}
                onChange={(e) => handleFieldChange('insuredName', e.target.value.toUpperCase())}
                placeholder="e.g. PHILIP OROZUWA"
                className="w-full text-base sm:text-xs font-semibold px-3 py-2.5 sm:px-2.5 sm:py-1.5 rounded-md border border-gray-300 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-hidden uppercase"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-[11px] font-medium text-gray-600 mb-1">Street Address</label>
              <input
                type="text"
                value={data.insuredAddress}
                onChange={(e) => handleFieldChange('insuredAddress', e.target.value.toUpperCase())}
                placeholder="e.g. X 378 FRONT STREET"
                className="w-full text-xs font-medium px-2.5 py-1.5 rounded-md border border-gray-300 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-hidden uppercase"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs sm:text-[11px] font-medium text-gray-600 mb-1">City, Province, Postal Code</label>
              <input
                type="text"
                value={data.insuredCityProvPostal}
                onChange={(e) => handleFieldChange('insuredCityProvPostal', e.target.value.toUpperCase())}
                placeholder="e.g. BELLEVILLE, ON, K8N 2Z8"
                className="w-full text-xs font-medium px-2.5 py-1.5 rounded-md border border-gray-300 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-hidden uppercase"
              />
            </div>
          </div>
        </div>

        {/* Dates and Policy */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Policy &amp; Coverage Dates
            </h4>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-gray-500">Quick Term:</span>
              <button
                type="button"
                onClick={() => setTermDuration(6)}
                className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-2 py-0.5 rounded cursor-pointer transition-colors"
              >
                +6 Mos
              </button>
              <button
                type="button"
                onClick={() => setTermDuration(12)}
                className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-2 py-0.5 rounded cursor-pointer transition-colors"
              >
                +1 Year
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="block text-xs sm:text-[11px] font-medium text-gray-600 mb-1">
                Effective Date (D M Y)
              </label>
              <input
                type="text"
                value={data.effectiveDate}
                onChange={(e) => handleFieldChange('effectiveDate', e.target.value)}
                placeholder="26 10 2024"
                className="w-full text-xs font-mono font-semibold px-2.5 py-1.5 rounded-md border border-gray-300 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-hidden text-center"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-[11px] font-medium text-gray-600 mb-1">
                Expiry Date (D M Y)
              </label>
              <input
                type="text"
                value={data.expiryDate}
                onChange={(e) => handleFieldChange('expiryDate', e.target.value)}
                placeholder="05 04 2025"
                className="w-full text-xs font-mono font-semibold px-2.5 py-1.5 rounded-md border border-gray-300 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-hidden text-center"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-[11px] font-medium text-gray-600 mb-1">
                Policy Number
              </label>
              <input
                type="text"
                value={data.policyNumber}
                onChange={(e) => handleFieldChange('policyNumber', e.target.value)}
                placeholder="502011785"
                className="w-full text-xs font-mono font-bold px-2.5 py-1.5 rounded-md border border-gray-300 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-hidden text-center"
              />
            </div>
          </div>
        </div>

        {/* Vehicle & Broker */}
        <div className="pt-2 border-t border-gray-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Vehicle &amp; Broker
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="block text-xs sm:text-[11px] font-medium text-gray-600 mb-1">Year &amp; Make</label>
              <input
                type="text"
                value={data.vehicleYearMake}
                onChange={(e) => handleFieldChange('vehicleYearMake', e.target.value.toUpperCase())}
                placeholder="e.g. 2024 JAGUAR"
                className="w-full text-base sm:text-xs font-semibold px-3 py-2.5 sm:px-2.5 sm:py-1.5 rounded-md border border-gray-300 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-hidden uppercase"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-[11px] font-medium text-gray-600 mb-1">VIN / Serial Number</label>
              <input
                type="text"
                value={data.vehicleVin}
                onChange={(e) => handleFieldChange('vehicleVin', e.target.value.toUpperCase())}
                placeholder="e.g. SAJDL2FX7R8101820"
                className="w-full text-xs font-mono font-semibold px-2.5 py-1.5 rounded-md border border-gray-300 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-hidden uppercase"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-[11px] font-medium text-gray-600 mb-1">Broker / Courtier</label>
              <input
                type="text"
                value={data.broker}
                onChange={(e) => handleFieldChange('broker', e.target.value.toUpperCase())}
                placeholder="e.g. SUREXDIRECT COM LTD."
                className="w-full text-base sm:text-xs font-semibold px-3 py-2.5 sm:px-2.5 sm:py-1.5 rounded-md border border-gray-300 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-hidden uppercase"
              />
            </div>
          </div>
        </div>

        {/* Insurance Company Details */}
        <div className="pt-2 border-t border-gray-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Insurance Underwriter
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs sm:text-[11px] font-medium text-gray-600 mb-1">Company Name (EN)</label>
              <input
                type="text"
                value={data.companyName}
                onChange={(e) => handleFieldChange('companyName', e.target.value)}
                className="w-full text-xs font-medium px-2.5 py-1.5 rounded-md border border-gray-300 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-[11px] font-medium text-gray-600 mb-1">Company Name (FR)</label>
              <input
                type="text"
                value={data.companyNameFr}
                onChange={(e) => handleFieldChange('companyNameFr', e.target.value)}
                className="w-full text-xs font-medium px-2.5 py-1.5 rounded-md border border-gray-300 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-[11px] font-medium text-gray-600 mb-1">Street Address</label>
              <input
                type="text"
                value={data.companyAddress}
                onChange={(e) => handleFieldChange('companyAddress', e.target.value)}
                className="w-full text-xs font-medium px-2.5 py-1.5 rounded-md border border-gray-300 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-[11px] font-medium text-gray-600 mb-1">City, Prov, Postal Code</label>
              <input
                type="text"
                value={data.companyCityProvPostal}
                onChange={(e) => handleFieldChange('companyCityProvPostal', e.target.value)}
                className="w-full text-xs font-medium px-2.5 py-1.5 rounded-md border border-gray-300 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

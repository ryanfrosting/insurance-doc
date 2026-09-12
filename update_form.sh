#!/bin/bash
cat << 'INNER_EOF' > patch_form.txt
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-6">
      {/* Auto-Generation Button */}
      <button
        type="button"
        onClick={handleRandomize}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-sm font-bold transition-all border border-emerald-300 shadow-xs cursor-pointer active:scale-95"
      >
        <Dices className="w-5 h-5 text-[#008a00]" />
        Generate Random Identity & Vehicle
      </button>

      {/* Watermark Security Controls */}
INNER_EOF

# Replace lines 60 to 104 with patch_form.txt
sed -i -e '/return (/,/Watermark Security Controls/!b' -e '/Watermark Security Controls/!d' -e '/Watermark Security Controls/r patch_form.txt' -e '/Watermark Security Controls/d' src/components/FormControls.tsx
sed -i 's/import { PRESETS, generateRandomInsuranceData } from/import { generateRandomInsuranceData } from/g' src/components/FormControls.tsx

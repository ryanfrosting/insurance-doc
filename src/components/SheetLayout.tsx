import React from 'react';
import { InsuranceCardData, SheetViewMode, EightSquarePattern } from '../types';
import { InsuranceCardFront, InsuranceCardBack, UnifiedInsuranceCard } from './InsuranceCard';
import { InsuranceDocClone } from './InsuranceDocClone';

interface SheetLayoutProps {
  data: InsuranceCardData;
  viewMode: SheetViewMode;
  eightSquarePattern?: EightSquarePattern;
  watermarkOpacity: number;
  showWatermark: boolean;
  sheetRef: React.RefObject<HTMLDivElement | null>;
  customCardTypes?: ('front' | 'back')[];
  onToggleCardType?: (index: number) => void;
  tdPage?: 1 | 2;
}

export const SheetLayout: React.FC<SheetLayoutProps> = ({
  data,
  viewMode,
  eightSquarePattern = 'standard',
  watermarkOpacity,
  showWatermark,
  sheetRef,
  customCardTypes,
  onToggleCardType,
  tdPage = 1,
}) => {
  const formatExpiryDate = (dateString: string) => {
    // If it's a YYYY-MM-DD string, format it to Month D, YYYY
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    return dateString;
  };


  // Render TD Temporary Full Sheet
  if (viewMode === 'td-temporary') {
    return (
      <div ref={sheetRef}>
        <InsuranceDocClone 
          data={data} 
          watermarkOpacity={watermarkOpacity} 
          showWatermark={showWatermark} 
          page={tdPage}
        />
      </div>
    );
  }

  // Determine card type ('front' or 'back') for each of the 8 squares
  const getCardTypeForIndex = (index: number): 'front' | 'back' => {
    if (customCardTypes && customCardTypes[index]) {
      return customCardTypes[index];
    }
    switch (eightSquarePattern) {
      case 'all-front':
        return 'front';
      case 'all-back':
        return 'back';
      case 'alternating':
        return index % 2 === 0 ? 'front' : 'back';
      case 'standard':
      default:
        // Rows 1 & 3 are Front (indices 0, 1 and 4, 5)
        // Rows 2 & 4 are Back (indices 2, 3 and 6, 7)
        return (index === 0 || index === 1 || index === 4 || index === 5) ? 'front' : 'back';
    }
  };

  // Render Single Card View
  if (viewMode === 'single-card') {
    return (
      <div 
        ref={sheetRef} 
        id="print-sheet-container"
        className="w-full max-w-[420px] mx-auto bg-white p-5 rounded-xl shadow-lg border border-gray-200 relative"
      >
        <div className="relative z-10 text-[11px] font-semibold text-gray-500 mb-2 flex items-center justify-between">
          <span>WALLET PINK SLIP (1 SQUARE)</span>
          <span className="text-[10px] text-pink-700 bg-pink-50 border border-pink-200 px-2 py-0.5 rounded font-mono font-bold">
            CANADA PINK CARD
          </span>
        </div>
        <div className="w-full relative z-10">
          <UnifiedInsuranceCard 
            data={data} 
            watermarkOpacity={watermarkOpacity} 
            showWatermark={showWatermark} 
          />
        </div>
      </div>
    );
  }

  // Render 6-Square Full Sheet (the pixel-perfect clone of the official printed sheet in the image!)
  if (viewMode === 'six-squares') {
    const sixIndices = [0, 1, 2, 3, 4, 5];
    return (
      <div 
        ref={sheetRef}
        id="print-sheet-container"
        className="w-full max-w-[820px] mx-auto bg-white p-5 sm:p-7 shadow-2xl border border-gray-200 print:border-none print:shadow-none print:p-0 print:m-0 relative"
      >
        {/* 6 SQUARES GRID: 2 COLUMNS X 3 ROWS WITH FULLY IDENTICAL SIZE AND PLACEMENT */}
        <div className="grid grid-cols-2 gap-3 relative z-10">
          {/* Perforation / Cut Guidelines between the 6 squares */}
          {/* Horizontal cut lines separating the 3 rows */}
          <div className="absolute top-[33.33%] left-0 right-0 border-b border-dashed border-gray-300 pointer-events-none z-20"></div>
          <div className="absolute top-[66.66%] left-0 right-0 border-b border-dashed border-gray-300 pointer-events-none z-20"></div>
          {/* Vertical cut line separating the 2 columns */}
          <div className="absolute top-0 bottom-0 left-1/2 border-r border-dashed border-gray-300 -translate-x-1/2 pointer-events-none z-20"></div>

          {sixIndices.map((idx) => (
            <div key={idx} className="relative w-full">
              <UnifiedInsuranceCard 
                data={data} 
                watermarkOpacity={watermarkOpacity} 
                showWatermark={showWatermark} 
              />
            </div>
          ))}
        </div>

        {/* Official Form Identifiers at bottom left of the sheet margin */}
        <div className="mt-4 pt-1 flex justify-between items-end text-gray-500 font-mono text-[9.5px] relative z-10">
          <div>
            <div className="font-bold text-gray-700 tracking-tight">{data.formCode}</div>
            <div className="text-gray-500">{data.formDateCode}</div>
          </div>
          <div className="text-[8.5px] text-gray-400 uppercase tracking-widest hidden sm:block">
            Official 6-Card Canada Inter-Province Automobile Insurance Sheet
          </div>
        </div>
      </div>
    );
  }

  // Render Front & Back View
  if (viewMode === 'front-back') {
    return (
      <div 
        ref={sheetRef} 
        id="print-sheet-container"
        className="w-full max-w-[440px] mx-auto bg-white p-5 rounded-xl shadow-lg border border-gray-200 space-y-4 relative"
      >
        <div className="relative z-10">
          <div className="text-[11px] font-semibold text-gray-500 mb-1 flex items-center justify-between">
            <span>FRONT: CERTIFICATE (SQUARE 1)</span>
            <span className="text-[10px] text-pink-700 bg-pink-50 border border-pink-200 px-2 py-0.5 rounded font-mono font-bold">
              PINK CARD
            </span>
          </div>
          <div className="w-full">
            <InsuranceCardFront 
              data={data} 
              watermarkOpacity={watermarkOpacity} 
              showWatermark={showWatermark} 
            />
          </div>
        </div>

        <div className="relative z-10">
          <div className="text-[11px] font-semibold text-gray-500 mb-1 flex items-center justify-between">
            <span>BACK: CONDITIONS &amp; WARNING (SQUARE 2)</span>
            <span className="text-[10px] text-gray-500 font-mono font-semibold">INTER-PROVINCE</span>
          </div>
          <div className="w-full">
            <InsuranceCardBack 
              data={data} 
              watermarkOpacity={watermarkOpacity * 0.5} 
              showWatermark={showWatermark} 
            />
          </div>
        </div>
      </div>
    );
  }

  // Render 4-Square Half Sheet
  if (viewMode === 'four-squares') {
    return (
      <div 
        ref={sheetRef}
        id="print-sheet-container"
        className="w-full max-w-[780px] mx-auto bg-white p-6 sm:p-8 shadow-xl border border-gray-200 print:border-none print:shadow-none print:p-0 print:m-0 relative"
      >
        <div className="grid grid-cols-2 gap-3 sm:gap-4 relative z-10">
          <div className="absolute top-1/2 left-0 right-0 border-b border-dashed border-gray-300 -translate-y-1/2 pointer-events-none z-20"></div>
          <div className="absolute top-0 bottom-0 left-1/2 border-r border-dashed border-gray-300 -translate-x-1/2 pointer-events-none z-20"></div>

          {/* Row 1: 2 Fronts */}
          <div className="w-full">
            <InsuranceCardFront data={data} cardIndex={1} watermarkOpacity={watermarkOpacity} showWatermark={showWatermark} />
          </div>
          <div className="w-full">
            <InsuranceCardFront data={data} cardIndex={2} watermarkOpacity={watermarkOpacity} showWatermark={showWatermark} />
          </div>
          {/* Row 2: 2 Backs */}
          <div className="w-full">
            <InsuranceCardBack data={data} watermarkOpacity={watermarkOpacity * 0.4} showWatermark={showWatermark} />
          </div>
          <div className="w-full">
            <InsuranceCardBack data={data} watermarkOpacity={watermarkOpacity * 0.4} showWatermark={showWatermark} />
          </div>
        </div>

        <div className="mt-4 flex justify-between items-end text-gray-500 font-mono text-[9px] relative z-10">
          <div>
            <div className="font-bold text-gray-700">{data.formCode}</div>
            <div className="text-gray-500">{data.formDateCode}</div>
          </div>
          <div className="text-[8px] text-gray-400 uppercase tracking-widest hidden sm:block">
            Canada Inter-Province Automobile Insurance Card (4 Squares)
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT & PRIMARY VIEW: FULL PAGE WITH exactly 8 SQUARES FULLY IDENTICAL SIZE AND PLACEMENT!
  // White background for the sheet, with shields and pink background strictly inside the card squares
  const squareIndices = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div 
      ref={sheetRef}
      id="print-sheet-container"
      className="w-full max-w-[820px] mx-auto bg-white p-5 sm:p-7 shadow-2xl border border-gray-200 print:border-none print:shadow-none print:p-0 print:m-0 relative"
    >
      {/* 8 SQUARES GRID: 2 COLUMNS X 4 ROWS WITH FULLY IDENTICAL SIZE AND PLACEMENT */}
      <div className="grid grid-cols-2 gap-3 relative z-10">
        {/* Subtle Perforation / Cut Guidelines between the 8 squares */}
        {/* Horizontal cut lines separating the 4 rows */}
        <div className="absolute top-[25%] left-0 right-0 border-b border-dashed border-gray-300 pointer-events-none z-20"></div>
        <div className="absolute top-[50%] left-0 right-0 border-b border-dashed border-gray-300 pointer-events-none z-20"></div>
        <div className="absolute top-[75%] left-0 right-0 border-b border-dashed border-gray-300 pointer-events-none z-20"></div>
        {/* Vertical cut line separating the 2 columns */}
        <div className="absolute top-0 bottom-0 left-1/2 border-r border-dashed border-gray-300 -translate-x-1/2 pointer-events-none z-20"></div>

        {squareIndices.map((idx) => {
          const type = getCardTypeForIndex(idx);
          const rowNum = Math.floor(idx / 2) + 1;
          const colNum = (idx % 2) + 1;

          return (
            <div 
              key={idx} 
              className="relative group w-full"
              title={`Square #${idx + 1} (Row ${rowNum}, Col ${colNum}) - Click in custom mode to flip`}
            >
              {/* Optional Square Indicator overlay in preview (hidden in print) */}
              <div className="no-print absolute top-1 left-1 z-30 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[8px] font-mono px-1.5 py-0.5 rounded pointer-events-none">
                Square {idx + 1} ({type.toUpperCase()})
              </div>

              {type === 'front' ? (
                <InsuranceCardFront 
                  data={data} 
                  cardIndex={idx + 1}
                  watermarkOpacity={watermarkOpacity} 
                  showWatermark={showWatermark} 
                />
              ) : (
                <InsuranceCardBack 
                  data={data} 
                  watermarkOpacity={watermarkOpacity * 0.4} 
                  showWatermark={showWatermark} 
                />
              )}

              {/* Interactive Flip button on hover when in Custom mode */}
              {onToggleCardType && (
                <button
                  type="button"
                  onClick={() => onToggleCardType(idx)}
                  className="no-print absolute bottom-1 right-1 z-30 opacity-0 group-hover:opacity-90 hover:opacity-100 transition-opacity bg-white/95 border border-gray-400 text-gray-900 text-[8px] font-bold px-1.5 py-0.5 rounded shadow-xs cursor-pointer"
                >
                  Flip to {type === 'front' ? 'Terms' : 'Front'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Official Form Identifiers at bottom left */}
      <div className="mt-4 pt-1 flex justify-between items-end text-gray-500 font-mono text-[9.5px] relative z-10">
        <div>
          <div className="font-bold text-gray-700 tracking-tight">{data.formCode}</div>
          <div className="text-gray-500">{data.formDateCode}</div>
        </div>
        <div className="text-[8.5px] text-gray-400 uppercase tracking-widest hidden sm:block">
          Official 8-Card Canada Inter-Province Automobile Insurance Sheet
        </div>
      </div>
    </div>
  );
};

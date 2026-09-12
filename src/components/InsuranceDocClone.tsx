import React from 'react';
import { InsuranceCardData } from '../types';
import { ShieldWatermark } from './ShieldWatermark';

interface InsuranceDocCloneProps {
  data: InsuranceCardData;
  watermarkOpacity?: number;
  showWatermark?: boolean;
  page?: 1 | 2;
}

export const InsuranceDocClone: React.FC<InsuranceDocCloneProps> = ({
  data,
  watermarkOpacity = 0.25,
  showWatermark = false,
  page = 1,
}) => {
  // Format expiry date for the top banner: e.g. "February 6, 2026"
  const formatExpiryHeader = (dateStr: string) => {
    if (!dateStr) return 'February 6, 2026';
    try {
      if (dateStr.includes('-')) {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
          const [year, month, day] = parts;
          const dateObj = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
          return dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }
      } else {
        const parts = dateStr.trim().split(/\s+/);
        if (parts.length === 3) {
          const [day, month, year] = parts;
          const dateObj = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
          return dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }
      }
    } catch {
      // fallback
    }
    return dateStr;
  };

  const effDate = data.effectiveDate || '2025-10-06';
  const expDate = data.expiryDate || '2026-02-06';

  if (page === 2) {
    return (
      <div 
        id="print-sheet-container-p2"
        className="mx-auto bg-white p-8 sm:p-10 shadow-2xl border border-gray-200 print:border-none print:shadow-none print:p-0 print:m-0 relative font-sans text-black box-border flex flex-col justify-between select-text"
        style={{ width: '816px', minHeight: '1056px' }}
      >
        <div />
        {/* Footer */}
        <div className="text-center text-[10px] text-gray-400 font-sans pt-4 border-t border-gray-100">
          Page 2 of 2
        </div>
      </div>
    );
  }

  // Page 1: Exact 1-for-1 Pixel-Perfect Clone of the Official PDF Document (Stretched top-to-bottom)
  return (
    <div 
      id="print-sheet-container"
      className="mx-auto bg-white p-[42px_40px_32px] shadow-2xl border border-gray-200 print:border-none print:shadow-none print:p-0 print:m-0 relative font-sans text-black box-border flex flex-col justify-between select-text"
      style={{ width: '816px', minHeight: '1056px' }}
    >
      <div>
        {/* Top Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <img 
              alt="Toronto-Dominion Bank - Wikipedia" 
              id="dimg_LbmkasbnEtCj0PEPtvzn8Aw_27" 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcCuug9R4EhZdxrVE3Zd9khLazEVHCK6T8FFnQIYOYeg&s=10" 
              className="w-[48px] h-[48px] object-contain rounded-[2px]"
              crossOrigin="anonymous"
            />
            <div>
              <div className="font-bold text-[21px] text-[#008a00] leading-none tracking-tight">TD Insurance</div>
              <div className="text-[13.5px] font-normal text-black mt-[3px]">Meloche Monnex</div>
            </div>
          </div>
          <div className="text-right text-[11px] leading-[1.22] text-black font-sans">
            <div className="font-bold text-[11.5px]">TD Insurance</div>
            <div className="font-bold text-[11.5px] mb-0.5">Direct Agency Inc.</div>
            101 McNabb Street<br />
            2nd Floor<br />
            Markham, ON L3R 4H8<br />
            T: 1-800-268-8955<br />
            F: 1-888-662-8024<br />
            www.tdinsurance.com/affinity
          </div>
        </div>

        {/* Title in Center (Bold Serif) */}
        <div className="text-center mb-8 font-serif">
          <h1 className="font-bold text-[18px] leading-[1.2] text-black tracking-normal">
            Your Temporary Automobile Liability Insurance Card
          </h1>
          <h2 className="font-bold text-[18px] leading-[1.2] text-black mt-[1px] tracking-normal">
            Votre certificat temporaire d&apos;assurance responsabilité automobile
          </h2>
          <p className="font-bold text-[16px] text-black mt-[14px]">
            Valid until/valide jusqu&apos;au {formatExpiryHeader(data.expiryDate)}
          </p>
        </div>

        {/* Grid: 3 rows with exact layout matching PDF */}
        <div className="flex flex-col gap-[32px] relative z-10">
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid grid-cols-2 gap-[24px] items-start">
              {/* Left Column: Insurer / Card Front Box / Vehicle */}
              <div className="w-full font-serif">
                <div className="mb-[3px] text-[10px] leading-[1.2] text-black">
                  <strong>INSURER /ASSUREUR:</strong> {data.companyName || 'Security National Insurance Company'}<br />
                  <span className="pl-[112px]">{data.companyAddress || '50 Place Cremazie W.'} {data.companyCityProvPostal || 'Montreal, QC H2P 1B6'}</span>
                </div>

                {/* Card Front Box - Clean White Background */}
                <div 
                  style={{ width: '100%', height: '136px' }}
                  className="relative bg-white border-[1.5px] border-black text-black font-sans select-text overflow-hidden box-border flex flex-col justify-between"
                >
                  {showWatermark && <ShieldWatermark opacity={watermarkOpacity} />}
                  
                  {/* Agency Row */}
                  <div className="flex border-b-[1.5px] border-black h-[50px] relative z-10 bg-white">
                    <div className="w-[18px] shrink-0 border-r-[1.5px] border-black flex items-center justify-center bg-white">
                      <div className="flex flex-row items-center justify-center gap-[2px] select-none h-full py-0.5">
                        <span 
                          className="text-[6px] font-bold text-black tracking-tight leading-none whitespace-nowrap" 
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          AGENCY
                        </span>
                        <span 
                          className="text-[6px] font-bold text-black tracking-tight leading-none whitespace-nowrap" 
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          AGENCE
                        </span>
                      </div>
                    </div>
                    <div className="p-[4px_8px] flex-1 flex flex-col justify-center text-[9px] leading-[1.25] font-sans">
                      {data.broker ? (
                        data.broker.split('\n').map((line, idx) => (
                          <div key={idx} className="text-black font-normal leading-[1.2]">
                            {line}
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="text-black font-normal leading-[1.2]">TD Insurance Direct Agency Inc.</div>
                          <div className="text-black leading-[1.2]">101 McNabb Street, 2nd Floor</div>
                          <div className="text-black leading-[1.2]">Markham, ON L3R 4H8</div>
                          <div className="text-black leading-[1.2]">1-800-268-8955</div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Insured Row */}
                  <div className="flex border-b-[1.5px] border-black h-[48px] relative z-10 bg-white">
                    <div className="w-[18px] shrink-0 border-r-[1.5px] border-black flex items-center justify-center bg-white">
                      <div className="flex flex-row items-center justify-center gap-[2px] select-none h-full py-0.5">
                        <span 
                          className="text-[6px] font-bold text-black tracking-tight leading-none whitespace-nowrap" 
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          INSURED
                        </span>
                        <span 
                          className="text-[6px] font-bold text-black tracking-tight leading-none whitespace-nowrap" 
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          ASSURÉ-E
                        </span>
                      </div>
                    </div>
                    <div className="p-[4px_8px] flex-1 flex flex-col justify-center text-[9px] leading-[1.25] font-sans">
                      <div className="text-black font-normal leading-[1.25]">{data.insuredName || 'Michael Kaftan'}</div>
                      <div className="text-black leading-[1.25]">{data.insuredAddress || '314 Grandin Villge'}</div>
                      <div className="text-black leading-[1.25]">{data.insuredCityProvPostal || 'St. Albert AB T8N 2R6'}</div>
                    </div>
                  </div>

                  {/* Policy & Dates Row */}
                  <div className="flex h-[38px] relative z-10 bg-white">
                    {/* Left side: Policy No + Date */}
                    <div className="w-[50%] border-r-[1.5px] border-black flex flex-col justify-between">
                      <div className="grid grid-cols-[1fr_26px_18px_20px] h-[15px] border-b-[1.5px] border-black bg-white text-[5.2px] font-bold leading-none">
                        <span className="flex items-center pl-[3px] truncate">POLICY No -No DE POLICE</span>
                        <span className="flex items-center justify-center border-l-[1.5px] border-black">Y/A</span>
                        <span className="flex items-center justify-center border-l-[1.5px] border-black">M</span>
                        <span className="flex items-center justify-center border-l-[1.5px] border-black">D/J</span>
                      </div>
                      <div className="grid grid-cols-[1fr_64px] h-[23px] items-center text-[9.5px] font-sans">
                        <span className="pl-2 text-black font-normal">{data.policyNumber || '00157475039'}</span>
                        <span className="text-center font-normal text-[9px]">{effDate}</span>
                      </div>
                    </div>

                    {/* Right side: Effective / Expiry Dates */}
                    <div className="w-[50%] flex flex-col justify-between">
                      <div className="grid grid-cols-[1fr_26px_18px_20px] h-[15px] border-b-[1.5px] border-black bg-white text-[5.2px] font-bold leading-none">
                        <div className="flex flex-col justify-center px-[2px] leading-[0.9]">
                          <div className="flex justify-between text-[4.8px]">
                            <span>EFFECTIVE DATE</span>
                            <span>EXPIRY DATE</span>
                          </div>
                          <div className="flex justify-between text-[4.2px] font-normal">
                            <span>◄ PRISE D&apos;EFFET</span>
                            <span>EXPIRATION ►</span>
                          </div>
                        </div>
                        <span className="flex items-center justify-center border-l-[1.5px] border-black">Y/A</span>
                        <span className="flex items-center justify-center border-l-[1.5px] border-black">M</span>
                        <span className="flex items-center justify-center border-l-[1.5px] border-black">D/J</span>
                      </div>
                      <div className="flex justify-end pr-2 h-[23px] items-center text-[9px] font-sans">
                        <span className="text-center font-normal">{expDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle Description below card box */}
                <div className="mt-[3px] text-[10.5px] leading-[1.2] font-sans font-normal uppercase text-black">
                  <span>{data.vehicleYearMake || '2009 MITSUBISHI LANCER DE 4DR'}</span>
                  <span className="ml-[12px]">{data.vehicleVin || 'JA3AU16U79U606263'}.</span>
                </div>
              </div>

              {/* Right Column: Card Back Terms */}
              <div className="w-full pt-[2px] px-[1px] box-border font-sans">
                {/* Top Header Group */}
                <div className="text-center leading-[1.15]">
                  <div className="text-[7.8px] font-bold text-black uppercase">
                    MOTOR VEHICLE LIABILITY INSURANCE CARD
                  </div>
                  <div className="text-[7.2px] font-bold text-black uppercase">
                    CERTIFICAT D&apos;ASSURANCE-AUTOMOBILE RESPONSABILITÉ
                  </div>
                  <div className="my-[2px] text-[10.5px] font-extrabold tracking-[0.4px] text-black uppercase">
                    CANADA INTER-PROVINCE
                  </div>
                  <div className="text-[6.5px] font-bold text-black uppercase leading-tight">
                    APPLICABLE WITHIN CANADA AND THE UNITED STATES OF AMERICA
                  </div>
                  <div className="text-[6.5px] font-bold text-black uppercase leading-tight">
                    EN VIGUEUR AU CANADA ET AUX ÉTATS-UNIS D&apos;AMÉRIQUE
                  </div>
                </div>

                {/* Body Paragraphs */}
                <div className="mt-[6px] text-[6.5px] leading-[1.3] text-justify text-black space-y-[4.5px]">
                  <p>
                    <strong className="font-bold">This certificate is subject to the terms and conditions of the insurer&apos;s standard automobile policy.</strong> This certifies that the party named herein is insured against liability for bodily injury and property damage by reason of the operation of the motor vehicle described herein, in an amount not less than the statutory minimum requirements in any area of Canada.
                  </p>
                  <p>
                    <strong className="font-bold">WARNING – Any person who issues or produces a card to show that there is in force a policy of insurance as indicated herein that is in fact not in force is liable to a heavy fine and/or imprisonment and his license may be suspended.</strong><br />
                    This card should be carried in the insured vehicle for production as proof of insurance when demanded by police.
                  </p>
                  <p>
                    <strong className="font-bold">Le présent certificat est assujetti aux dispositions et conditions de la police d&apos;assurance automobile de l&apos;assureur.</strong><br />
                    Ce certificat atteste que la personne susnommée est assurée contre la responsabilité pour blessures et dommages aux biens découlant de l&apos;usage du véhicule ci-décrit, conformément aux limites minimales exigées par les lois d&apos;assurance en vigueur partout au Canada.
                  </p>
                  <p>
                    <strong className="font-bold">AVERTISSEMENT – Quiconque émet ou présente un tel certificat comme preuve d&apos;une police d&apos;assurance responsabilité qui effectivement n&apos;est pas en vigueur, est coupable d&apos;une infraction passible d&apos;une forte amende et/ou d&apos;emprisonnement et suspension de son permis.</strong><br />
                    Ce certificat doit être laissé dans le véhicule assuré afin d&apos;être présenté comme preuve d&apos;assurance lorsque la police l&apos;exige.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center font-sans text-[10px] text-black">
        Page 1 of 2
      </div>
    </div>
  );
};



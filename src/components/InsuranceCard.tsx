import React from 'react';
import { InsuranceCardData } from '../types';
import { ShieldWatermark } from './ShieldWatermark';

interface InsuranceCardProps {
  data: InsuranceCardData;
  cardIndex?: number;
  watermarkOpacity?: number;
  showWatermark?: boolean;
  isolated?: boolean; // If true, provides its own pink background (for single card preview)
  isBw?: boolean; // If true, uses white background instead of pink
}

export const InsuranceCardFront: React.FC<InsuranceCardProps> = ({
  data,
  watermarkOpacity = 0.18,
  showWatermark = true,
  isBw = false,
}) => {
  return (
    <div 
      style={{ width: '323px', minWidth: '323px', maxWidth: '323px', height: '214px', minHeight: '214px', maxHeight: '214px' }}
      className={`relative ${isBw ? 'bg-white' : 'bg-[#fcecee]'} border-[1.25px] border-black text-black font-sans text-xs select-text overflow-hidden box-border`}
    >
      {/* Local Shield Watermark Layer inside the card */}
      {showWatermark && <ShieldWatermark opacity={watermarkOpacity} />}

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Section 1: Insurance Company & Economical Logo */}
        <div className="border-b-[1.25px] border-black p-1.5 px-2 flex justify-between items-start gap-2 bg-transparent h-[52px] box-border">
          <div className="flex-1 overflow-hidden">
            <div className="text-[6.8px] font-bold tracking-tight uppercase leading-tight text-gray-900 truncate">
              NAME AND ADDRESS OF INSURANCE COMPANY / NOM ET ADRESSE DE LA COMPAGNIE D&apos;ASSURANCE
            </div>
            <div className="text-[9px] font-semibold leading-tight mt-0.5 text-black truncate">
              {data.companyName} / <span className="text-[8px] font-medium text-gray-800">{data.companyNameFr}</span>
            </div>
            <div className="text-[8px] text-gray-800 leading-tight truncate">
              {data.companyAddress}, {data.companyCityProvPostal}
            </div>
          </div>

          {/* Logo */}
          <div className="text-right flex flex-col items-end shrink-0 pl-1">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-black inline-block"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-black inline-block"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-black inline-block"></span>
            </div>
            <div className="text-[12.5px] font-black tracking-tighter text-black lowercase leading-none">
              economical<span className="text-[7.5px] font-normal align-top">®</span>
            </div>
          </div>
        </div>

        {/* Section 2: Insured Name and Address */}
        <div className="border-b-[1.25px] border-black p-1.5 px-2 bg-transparent h-[58px] box-border flex flex-col justify-between">
          <div className="text-[6.8px] font-bold tracking-tight uppercase leading-tight text-gray-900">
            NAME AND ADDRESS OF INSURED / NOM ET ADRESSE DE L&apos;ASSURÉ
          </div>
          <div className="font-bold text-[10.5px] tracking-wide uppercase text-black truncate leading-tight">
            {data.insuredName}
          </div>
          <div className="text-[9px] uppercase font-medium text-gray-900 leading-tight truncate">
            {data.insuredAddress}
          </div>
          <div className="text-[9px] uppercase font-medium text-gray-900 leading-tight truncate">
            {data.insuredCityProvPostal}
          </div>
        </div>

        {/* Section 3: Dates and Policy Number Grid */}
        <div className="border-b-[1.25px] border-black grid grid-cols-3 divide-x-[1.25px] divide-black bg-transparent h-[48px] box-border">
          {/* Effective Date */}
          <div className="p-1 flex flex-col justify-between overflow-hidden">
            <div className="text-[6.5px] font-bold uppercase tracking-tight leading-tight text-gray-900">
              EFFECTIVE DATE /<br />DATE D&apos;ENTRÉE EN VIGUEUR
            </div>
            <div className="text-center font-bold text-[10px] tracking-wider text-black">
              {data.effectiveDate}
            </div>
            <div className="text-[5.5px] text-center text-gray-600 font-mono tracking-widest uppercase">
              D/J M M Y/A
            </div>
          </div>

          {/* Expiry Date */}
          <div className="p-1 flex flex-col justify-between overflow-hidden">
            <div className="text-[6.5px] font-bold uppercase tracking-tight leading-tight text-gray-900">
              DATE OF EXPIRY /<br />DATE D&apos;EXPIRATION
            </div>
            <div className="text-center font-bold text-[10px] tracking-wider text-black">
              {data.expiryDate}
            </div>
            <div className="text-[5.5px] text-center text-gray-600 font-mono tracking-widest uppercase">
              D/J M M Y/A
            </div>
          </div>

          {/* Policy Number */}
          <div className="p-1 flex flex-col justify-between overflow-hidden">
            <div className="text-[6.5px] font-bold uppercase tracking-tight leading-tight text-gray-900">
              POLICY NUMBER /<br />POLICE NUMÉRO
            </div>
            <div className="text-center font-bold text-[10.5px] tracking-wider text-black">
              {data.policyNumber}
            </div>
            <div className="text-[5.5px] text-center text-transparent select-none">
              -
            </div>
          </div>
        </div>

        {/* Section 4: Vehicle & Broker Grid */}
        <div className="grid grid-cols-12 divide-x-[1.25px] divide-black bg-transparent h-[48px] box-border">
          {/* Insured Vehicle */}
          <div className="col-span-8 p-1.5 flex flex-col justify-between overflow-hidden">
            <div className="text-[6.5px] font-bold uppercase tracking-tight leading-tight text-gray-900">
              INSURED VEHICLE, YEAR, MAKE, SERIAL NO. /<br />
              VÉHICULE ASSURÉ, ANNÉE, MARQUE, SÉRIE
            </div>
            <div className="font-bold text-[9px] tracking-wide uppercase text-black truncate mt-0.5">
              {data.vehicleYearMake} {data.vehicleVin}
            </div>
          </div>

          {/* Broker */}
          <div className="col-span-4 p-1.5 flex flex-col justify-between overflow-hidden">
            <div className="text-[6.5px] font-bold uppercase tracking-tight leading-tight text-gray-900">
              BROKER / COURTIER
            </div>
            <div className="font-bold text-[8.5px] uppercase text-black truncate mt-0.5">
              {data.broker}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InsuranceCardBack: React.FC<InsuranceCardProps> = ({
  watermarkOpacity = 0.08,
  showWatermark = true,
  isBw = false,
}) => {
  return (
    <div 
      style={{ width: '323px', minWidth: '323px', maxWidth: '323px', height: '214px', minHeight: '214px', maxHeight: '214px' }}
      className={`relative ${isBw ? 'bg-white' : 'bg-[#fcecee]'} border-[1.25px] border-black text-black font-sans text-xs select-text overflow-hidden p-1.5 flex flex-col justify-between box-border`}
    >
      {/* Local Shield Watermark Layer on Legal section */}
      {showWatermark && <ShieldWatermark opacity={watermarkOpacity} />}

      <div className="relative z-10 flex flex-col justify-between h-full space-y-0.5">
        {/* Header Titles */}
        <div className="text-center border-b border-gray-400 pb-0.5">
          <div className="text-[6.5px] font-semibold tracking-wider uppercase text-gray-900 leading-tight">
            MOTOR VEHICLE LIABILITY INSURANCE CARD / CERTIFICAT D&apos;ASSURANCE - AUTOMOBILE RESPONSABILITÉ
          </div>
          <div className="text-[10px] font-black tracking-wider uppercase text-black my-0.5">
            CANADA INTER-PROVINCE
          </div>
          <div className="text-[5.8px] font-medium tracking-tight uppercase text-gray-700 leading-none">
            APPLICABLE WITHIN CANADA AND THE UNITED STATES OF AMERICA / EN VIGUEUR AU CANADA ET AUX ÉTATS-UNIS D&apos;AMÉRIQUE
          </div>
        </div>

        {/* English Terms */}
        <div className="space-y-0.5 text-[6.4px] leading-[1.16] text-gray-900">
          <p className="font-semibold">
            This certificate is subject to the terms and conditions of the insurer&apos;s standard automobile policy.
          </p>
          <p>
            This certifies that the party named herein is insured against liability for bodily injury and property damage by reason of the operation of the motor vehicle described herein, in an amount not less than the statutory minimum requirements in any area of Canada.
          </p>
          <p>
            <strong className="font-bold text-black">WARNING:</strong> Any person who issues or produces a card to show there is in force a policy of insurance as indicated herein that is in fact not in force is liable to a heavy fine and/or imprisonment and his/her licence may be suspended.
          </p>
          <p className="italic">
            This card should be carried in the insured vehicle for production as proof of insurance when demanded by police.
          </p>
        </div>

        {/* French Terms */}
        <div className="space-y-0.5 text-[6.1px] leading-[1.14] text-gray-800 border-t border-gray-400 pt-0.5">
          <p className="font-semibold">
            Le présent certificat est assujetti aux dispositions et conditions de la police d&apos;assurance automobile de l&apos;Assureur.
          </p>
          <p>
            Ce certificat atteste que la personne susnommée est assurée contre la responsabilité pour blessures et dommages aux biens découlant de l&apos;usage du véhicule ci-décrit, conformément aux limites minimales exigées par les lois d&apos;assurance en vigueur partout au Canada.
          </p>
          <p>
            <strong className="font-bold text-black">AVERTISSEMENT:</strong> Quiconque émet ou présente un tel certificat comme preuve d&apos;une police d&apos;assurance-responsabilité qui effectivement n&apos;est pas en vigueur, est coupable d&apos;une infraction passible d&apos;une forte amende et/ou d&apos;emprisonnement et suspension de son permis.
          </p>
          <p className="italic">
            Ce certificat doit être laissé dans le véhicule assuré afin d&apos;être présenté comme preuve d&apos;assurance lorsque la police l&apos;exige.
          </p>
        </div>
      </div>
    </div>
  );
};

export const UnifiedInsuranceCard: React.FC<InsuranceCardProps> = ({
  data,
  watermarkOpacity = 0.35,
  showWatermark = true,
}) => {
  return (
    <div 
      className="relative w-full h-[332px] bg-[#fcecee] border-[1.25px] border-black text-black font-sans text-xs select-text overflow-hidden box-border flex flex-col justify-between"
    >
      {/* Local Shield Watermark Layer inside the card */}
      {showWatermark && <ShieldWatermark opacity={watermarkOpacity} />}

      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Section 1: Insurance Company & Economical Logo */}
        <div className="border-b-[1.25px] border-black p-1 px-1.5 flex justify-between items-start gap-2 bg-transparent h-[45px] box-border">
          <div className="flex-1 overflow-hidden">
            <div className="text-[5.5px] font-bold tracking-tight uppercase leading-none text-gray-950">
              NAME AND ADDRESS OF INSURANCE COMPANY / NOM ET ADRESSE DE LA COMPAGNIE D&apos;ASSURANCE
            </div>
            <div className="text-[7.8px] font-semibold leading-tight mt-0.5 text-black truncate">
              {data.companyName} / <span className="text-[7.2px] font-medium text-gray-800">{data.companyNameFr}</span>
            </div>
            <div className="text-[7.2px] text-gray-900 leading-none truncate mt-0.5">
              {data.companyAddress}, {data.companyCityProvPostal}
            </div>
          </div>

          {/* Logo */}
          <div className="text-right flex flex-col items-end shrink-0 pl-1">
            <div className="flex items-center gap-[2px] mb-[1px]">
              <span className="w-1.2 h-1.2 rounded-full bg-black inline-block"></span>
              <span className="w-1.2 h-1.2 rounded-full bg-black inline-block"></span>
              <span className="w-1.2 h-1.2 rounded-full bg-black inline-block"></span>
            </div>
            <div className="text-[11.5px] font-black tracking-tighter text-black lowercase leading-none">
              economical<span className="text-[6.5px] font-normal align-top">®</span>
            </div>
          </div>
        </div>

        {/* Section 2: Insured Name and Address */}
        <div className="border-b-[1.25px] border-black p-1 px-1.5 bg-transparent h-[36px] box-border flex flex-col justify-center">
          <div className="text-[5.5px] font-bold tracking-tight uppercase leading-none text-gray-950 mb-[2px]">
            NAME AND ADDRESS OF INSURED / NOM ET ADRESSE DE L&apos;ASSURÉ
          </div>
          <div className="font-bold text-[8.5px] tracking-wide uppercase text-black truncate leading-tight">
            {data.insuredName}
          </div>
          <div className="text-[7.5px] uppercase font-medium text-gray-900 leading-none truncate">
            {data.insuredAddress} {data.insuredCityProvPostal}
          </div>
        </div>

        {/* Section 3: Dates and Policy Number Grid */}
        <div className="border-b-[1.25px] border-black grid grid-cols-3 divide-x-[1.25px] divide-black bg-transparent h-[32px] box-border">
          {/* Effective Date */}
          <div className="p-0.5 px-1 flex flex-col justify-between overflow-hidden">
            <div className="text-[5.2px] font-bold uppercase tracking-tight leading-none text-gray-950">
              EFFECTIVE DATE /<br />DATE D&apos;ENTRÉE EN VIGUEUR
            </div>
            <div className="text-center font-bold text-[8.2px] tracking-wider text-black">
              {data.effectiveDate}
            </div>
            <div className="text-[4.2px] text-center text-gray-600 font-mono tracking-widest uppercase">
              D/J M M Y/A
            </div>
          </div>

          {/* Expiry Date */}
          <div className="p-0.5 px-1 flex flex-col justify-between overflow-hidden">
            <div className="text-[5.2px] font-bold uppercase tracking-tight leading-none text-gray-950">
              DATE OF EXPIRY /<br />DATE D&apos;EXPIRATION
            </div>
            <div className="text-center font-bold text-[8.2px] tracking-wider text-black">
              {data.expiryDate}
            </div>
            <div className="text-[4.2px] text-center text-gray-600 font-mono tracking-widest uppercase">
              D/J M M Y/A
            </div>
          </div>

          {/* Policy Number */}
          <div className="p-0.5 px-1 flex flex-col justify-between overflow-hidden">
            <div className="text-[5.2px] font-bold uppercase tracking-tight leading-none text-gray-950">
              POLICY NUMBER / POLICE<br />NUMÉRO
            </div>
            <div className="text-center font-bold text-[8.5px] tracking-wider text-black">
              {data.policyNumber}
            </div>
            <div className="text-[4.2px] text-center text-transparent select-none leading-none">
              -
            </div>
          </div>
        </div>

        {/* Section 4: Vehicle & Broker Grid */}
        <div className="border-b-[1.25px] border-black grid grid-cols-12 divide-x-[1.25px] divide-black bg-transparent h-[32px] box-border">
          {/* Insured Vehicle */}
          <div className="col-span-8 p-1 px-1.5 flex flex-col justify-between overflow-hidden">
            <div className="text-[5.2px] font-bold uppercase tracking-tight leading-none text-gray-950">
              INSURED VEHICLE, YEAR, MAKE, SERIAL NO. / VÉHICULE ASSURÉ, ANNÉE, MARQUE, SÉRIE
            </div>
            <div className="font-bold text-[8px] tracking-wide uppercase text-black truncate mt-[1px]">
              {data.vehicleYearMake} {data.vehicleVin}
            </div>
          </div>

          {/* Broker */}
          <div className="col-span-4 p-1 px-1.5 flex flex-col justify-between overflow-hidden">
            <div className="text-[5.2px] font-bold uppercase tracking-tight leading-none text-gray-950">
              BROKER / COURTIER
            </div>
            <div className="font-bold text-[7.5px] uppercase text-black truncate mt-[1px]">
              {data.broker}
            </div>
          </div>
        </div>

        {/* Section 5: Legal Text and Header */}
        <div className="flex-1 p-1 px-1.5 flex flex-col justify-between overflow-hidden text-center">
          <div className="pt-0.5">
            <div className="text-[5.5px] font-bold tracking-tight uppercase text-gray-950 leading-none">
              MOTOR VEHICLE LIABILITY INSURANCE CARD / CERTIFICAT D&apos;ASSURANCE - AUTOMOBILE RESPONSABILITÉ
            </div>
            <div className="text-[8.5px] font-black tracking-wider uppercase text-black my-[1px] leading-none">
              CANADA INTER-PROVINCE
            </div>
            <div className="text-[5px] font-bold tracking-tight uppercase text-gray-800 leading-none">
              APPLICABLE WITHIN CANADA AND THE UNITED STATES OF AMERICA / EN VIGUEUR AU CANADA ET AUX ÉTATS-UNIS D&apos;AMÉRIQUE
            </div>
          </div>

          {/* English Terms */}
          <div className="text-[4.8px] leading-[1.08] text-gray-950 text-left space-y-[0.5px]">
            <p>
              This certificate is subject to the terms and conditions of the insurer&apos;s standard automobile policy.
            </p>
            <p>
              This certifies that the party named herein is insured against liability for bodily injury and property damage by reason of the operation of the motor vehicle described herein, in an amount not less than the statutory minimum requirements in any area of Canada.
            </p>
            <p>
              <strong>WARNING:</strong> Any person who issues or produces a card to show there is in force a policy of insurance as indicated herein that is in fact not in force is liable to a heavy fine and/or imprisonment and his/her licence may be suspended.
            </p>
            <p className="italic">
              This card should be carried in the insured vehicle for production as proof of insurance when demanded by police.
            </p>
          </div>

          {/* French Terms */}
          <div className="text-[4.6px] leading-[1.08] text-gray-900 text-left space-y-[0.5px] border-t border-black/25 pt-[1px] mt-0.5">
            <p>
              Le présent certificat est assujetti aux dispositions et conditions de la police d&apos;assurance automobile de l&apos;Assureur.
            </p>
            <p>
              Ce certificat atteste que la personne susnommée est assurée contre la responsabilité pour blessures et dommages aux biens découlant de l&apos;usage du véhicule ci-écrit, conformément aux limites minimales exigées par les lois d&apos;assurance en vigueur partout au Canada.
            </p>
            <p>
              <strong>AVERTISSEMENT:</strong> Quiconque émet ou présente un tel certificat comme preuve d&apos;une police d&apos;assurance-responsabilité qui effectivement n&apos;est pas en vigueur, est coupable d&apos;une infraction passible d&apos;une forte amende et/ou d&apos;emprisonnement et suspension de son permis.
            </p>
            <p className="italic">
              Ce certificat doit être laissé dans le véhicule assuré afin d&apos;être présenté comme preuve d&apos;assurance lorsque la police l&apos;exige.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};



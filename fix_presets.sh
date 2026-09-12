#!/bin/bash
cat << 'INNER_EOF' > src/data/presets.ts
import { InsuranceCardData } from '../types';

const RANDOM_NAMES = [
  'MICHAEL KAFTAN',
  'SARAH J. TREMBLAY',
  'JASPREET SINGH GILL',
  'MATTHEW R. GALLAGHER',
  'ELENA VASQUEZ',
  'NATHAN O\'CONNOR',
  'PRIYA PATEL',
  'JEAN-PHILIPPE GAUTHIER',
  'DAVID R. MILLER',
  'ALEXANDER G. WONG',
  'CLAYTON SMITH',
  'LIAM MACLEOD',
  'DAVID CHEN'
];

const RANDOM_STREETS = [
  '10423 101 STREET NW, APT 1804',
  '10150 100 STREET NW, SUITE 920',
  '8412 109 STREET NW, SUITE 302',
  '10320 102 AVENUE NW',
  '9920 108 STREET NW, APT 510',
  '11210 104 AVENUE NW',
  '10045 118 STREET NW, UNIT 204',
  '7804 WHYTE AVENUE NW',
  '6504 129 AVENUE NORTHWEST',
  '314 GRANDIN VILLAGE'
];

const RANDOM_POSTALS = [
  'EDMONTON AB T5H 0E7',
  'EDMONTON AB T5J 0N8',
  'EDMONTON AB T6G 1E2',
  'EDMONTON AB T5J 4A1',
  'EDMONTON AB T5K 2M5',
  'EDMONTON AB T5K 2S3',
  'EDMONTON AB T5K 1X7',
  'EDMONTON AB T6E 2B3',
  'EDMONTON AB T5A 0G3',
  'ST. ALBERT AB T8N 2R6'
];

const RANDOM_VEHICLES = [
  { yearMake: '2026 HYUNDAI ELANTRA PREFERRED', vinPrefix: 'KMHLM4DG3TU' },
  { yearMake: '2021 TOYOTA RAV4 XLE AWD', vinPrefix: '2T3P1RFV5MW' },
  { yearMake: '2024 FORD F-150 XLT 4X4', vinPrefix: '1FTFW1ED5RF' },
  { yearMake: '2023 HYUNDAI TUCSON ULTIMATE', vinPrefix: 'KM8J33A49PU' },
  { yearMake: '2024 HONDA CR-V SPORT AWD', vinPrefix: '2HKRW2H84RH' },
  { yearMake: '2025 SUBARU OUTBACK PREMIER', vinPrefix: '4S4BTANC3S3' },
  { yearMake: '2024 MAZDA CX-5 GS COMFORT', vinPrefix: 'JM3KFBCM5R0' },
  { yearMake: '2022 CHEVROLET SILVERADO 1500', vinPrefix: '1GCPYDEF6NZ' },
  { yearMake: '2009 MITSUBISHI LANCER DE 4DR', vinPrefix: 'JA3AU16U79U' },
];

export function generateRandomInsuranceData(): InsuranceCardData {
  const name = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
  const streetIndex = Math.floor(Math.random() * RANDOM_STREETS.length);
  const street = RANDOM_STREETS[streetIndex];
  const postal = RANDOM_POSTALS[streetIndex % RANDOM_POSTALS.length];
  const vehicle = RANDOM_VEHICLES[Math.floor(Math.random() * RANDOM_VEHICLES.length)];
  
  // Generate random 6-character VIN suffix
  const randomVinSuffix = Math.floor(100000 + Math.random() * 900000).toString();
  const randomPolicy = '001' + Math.floor(10000000 + Math.random() * 90000000).toString();
  
  // Dates: today to 4-12 months later
  const now = new Date();
  const startDay = String(now.getDate()).padStart(2, '0');
  const startMonth = String(now.getMonth() + 1).padStart(2, '0');
  const startYear = now.getFullYear();
  
  const expDate = new Date(now);
  expDate.setMonth(expDate.getMonth() + (Math.floor(Math.random() * 8) + 4)); // 4-12 month term
  const expDay = String(expDate.getDate()).padStart(2, '0');
  const expMonth = String(expDate.getMonth() + 1).padStart(2, '0');
  const expYear = expDate.getFullYear();

  return {
    companyName: 'Security National Insurance Company',
    companyNameFr: "Sécurité Nationale Compagnie d'Assurance",
    companyAddress: '50 Place Cremazie W.',
    companyCityProvPostal: 'Montreal, QC H2P 1B6',
    insuredName: name,
    insuredAddress: street,
    insuredCityProvPostal: postal,
    effectiveDate: `${startYear}-${startMonth}-${startDay}`,
    expiryDate: `${expYear}-${expMonth}-${expDay}`,
    policyNumber: randomPolicy,
    vehicleYearMake: vehicle.yearMake,
    vehicleVin: `${vehicle.vinPrefix}${randomVinSuffix}`,
    broker: 'TD Insurance Direct Agency Inc.\n101 McNabb Street, 2nd Floor\nMarkham, ON L3R 4H8\n1-800-268-8955',
    formCode: 'PA_AutomobileLiabilityCard_NA_BR',
    formDateCode: '20170101',
  };
}
INNER_EOF

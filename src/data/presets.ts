import { InsuranceCardData } from '../types';

export const PRESET_EXACT_CLONE: InsuranceCardData = {
  companyName: 'Security National Insurance Company',
  companyNameFr: "Sécurité Nationale Compagnie d'Assurance",
  companyAddress: '50 Place Cremazie W.',
  companyCityProvPostal: 'Montreal, QC H2P 1B6',
  insuredName: 'CLAYTON SMITH',
  insuredAddress: '6504 129 AVENUE NORTHWEST',
  insuredCityProvPostal: 'EDMONTON AB T5A 0G3',
  effectiveDate: '2026-08-27',
  expiryDate: '2026-12-27',
  policyNumber: '00157475039',
  vehicleYearMake: '2026 HYUNDAI ELANTRA PREFERRED',
  vehicleVin: 'KMHLM4DG3TU253385',
  broker: 'TD Insurance Direct Agency Inc.\n101 McNabb Street, 2nd Floor\nMarkham, ON L3R 4H8\n1-800-268-8955',
  formCode: 'PA_AutomobileLiabilityCard_NA_BR',
  formDateCode: '20170101',
};

export const PRESETS: { id: string; label: string; description: string; data: InsuranceCardData }[] = [
  {
    id: 'clayton-edmonton',
    label: 'Edmonton (Clayton Smith)',
    description: 'Clayton Smith (2026 Hyundai Elantra Preferred, Edmonton AB)',
    data: PRESET_EXACT_CLONE,
  },
  {
    id: 'edmonton',
    label: 'Edmonton (Michael Kaftan)',
    description: 'Michael Kaftan (2009 Mitsubishi Lancer, St. Albert AB)',
    data: {
      companyName: 'Security National Insurance Company',
      companyNameFr: "Sécurité Nationale Compagnie d'Assurance",
      companyAddress: '50 Place Cremazie W.',
      companyCityProvPostal: 'Montreal, QC H2P 1B6',
      insuredName: 'Michael Kaftan',
      insuredAddress: '314 Grandin Villge',
      insuredCityProvPostal: 'St. Albert AB T8N 2R6',
      effectiveDate: '2025-10-06',
      expiryDate: '2026-02-06',
      policyNumber: '00157475039',
      vehicleYearMake: '2009 MITSUBISHI LANCER DE 4DR',
      vehicleVin: 'JA3AU16U79U606263',
      broker: 'TD Insurance Direct Agency Inc.\n101 McNabb Street, 2nd Floor\nMarkham, ON L3R 4H8\n1-800-268-8955',
      formCode: 'PA_AutomobileLiabilityCard_NA_BR',
      formDateCode: '20170101',
    },
  },
  {
    id: 'edmonton-south',
    label: 'Edmonton (Whyte Ave)',
    description: 'Sarah J. Tremblay (2024 Honda CR-V, Edmonton AB)',
    data: {
      companyName: 'Security National Insurance Company',
      companyNameFr: "Sécurité Nationale Compagnie d'Assurance",
      companyAddress: '50 Place Cremazie W.',
      companyCityProvPostal: 'Montreal, QC H2P 1B6',
      insuredName: 'SARAH J. TREMBLAY',
      insuredAddress: '8412 109 STREET NW, SUITE 302',
      insuredCityProvPostal: 'EDMONTON AB T6G 1E2',
      effectiveDate: '2025-11-15',
      expiryDate: '2026-05-15',
      policyNumber: '00189341052',
      vehicleYearMake: '2024 HONDA CR-V SPORT AWD',
      vehicleVin: '2HKRW2H84RH512089',
      broker: 'TD Insurance Direct Agency Inc.\n101 McNabb Street, 2nd Floor\nMarkham, ON L3R 4H8\n1-800-268-8955',
      formCode: 'PA_AutomobileLiabilityCard_NA_BR',
      formDateCode: '20170101',
    },
  },
  {
    id: 'calgary',
    label: 'Calgary, AB (TD Insurance)',
    description: 'Liam MacLeod (2025 Ford F-150, Calgary AB)',
    data: {
      companyName: 'Security National Insurance Company',
      companyNameFr: "Sécurité Nationale Compagnie d'Assurance",
      companyAddress: '50 Place Cremazie W.',
      companyCityProvPostal: 'Montreal, QC H2P 1B6',
      insuredName: 'LIAM MACLEOD',
      insuredAddress: '1420 8TH AVENUE NW',
      insuredCityProvPostal: 'CALGARY AB T2N 1B9',
      effectiveDate: '2025-08-01',
      expiryDate: '2026-08-01',
      policyNumber: '67489201344',
      vehicleYearMake: '2025 FORD F-150 XLT 4X4',
      vehicleVin: '1FTFW1ED5PFA92841',
      broker: 'TD Insurance Direct Agency Inc.\n101 McNabb Street, 2nd Floor\nMarkham, ON L3R 4H8\n1-800-268-8955',
      formCode: 'PA_AutomobileLiabilityCard_NA_BR',
      formDateCode: '20170101',
    },
  },
  {
    id: 'ontario',
    label: 'Toronto, ON (Intact)',
    description: 'David Chen (2024 Tesla Model Y, Toronto ON)',
    data: {
      companyName: 'Intact Insurance Company',
      companyNameFr: "Compagnie d'Assurance Intact",
      companyAddress: '700 University Avenue, Suite 1500',
      companyCityProvPostal: 'Toronto, ON M5G 0A1',
      insuredName: 'DAVID CHEN',
      insuredAddress: '482 BAY STREET, APT 1402',
      insuredCityProvPostal: 'TORONTO ON M5G 1M7',
      effectiveDate: '2025-01-15',
      expiryDate: '2026-01-15',
      policyNumber: '83920194812',
      vehicleYearMake: '2024 TESLA MODEL Y LONG RANGE',
      vehicleVin: '7SAYGDEE8PF891024',
      broker: 'HUB INTERNATIONAL ONTARIO\n595 Bay Street, Suite 900\nToronto, ON M5G 2C2\n1-800-565-8777',
      formCode: 'PA_AutomobileLiabilityCard_NA_BR',
      formDateCode: '20170101',
    },
  },
];

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
];

const RANDOM_EDMONTON_STREETS = [
  '10423 101 STREET NW, APT 1804',
  '10150 100 STREET NW, SUITE 920',
  '8412 109 STREET NW, SUITE 302',
  '10320 102 AVENUE NW',
  '9920 108 STREET NW, APT 510',
  '11210 104 AVENUE NW',
  '10045 118 STREET NW, UNIT 204',
  '7804 WHYTE AVENUE NW',
];

const RANDOM_EDMONTON_POSTALS = [
  'EDMONTON AB T5H 0E7',
  'EDMONTON AB T5J 0N8',
  'EDMONTON AB T6G 1E2',
  'EDMONTON AB T5J 4A1',
  'EDMONTON AB T5K 2M5',
  'EDMONTON AB T5K 2S3',
  'EDMONTON AB T5K 1X7',
  'EDMONTON AB T6E 2B3',
];

const RANDOM_VEHICLES = [
  { yearMake: '2021 TOYOTA RAV4 XLE AWD', vinPrefix: '2T3P1RFV5MW' },
  { yearMake: '2024 FORD F-150 XLT 4X4', vinPrefix: '1FTFW1ED5RF' },
  { yearMake: '2023 HYUNDAI TUCSON ULTIMATE', vinPrefix: 'KM8J33A49PU' },
  { yearMake: '2024 HONDA CR-V SPORT AWD', vinPrefix: '2HKRW2H84RH' },
  { yearMake: '2025 SUBARU OUTBACK PREMIER', vinPrefix: '4S4BTANC3S3' },
  { yearMake: '2024 MAZDA CX-5 GS COMFORT', vinPrefix: 'JM3KFBCM5R0' },
  { yearMake: '2022 CHEVROLET SILVERADO 1500', vinPrefix: '1GCPYDEF6NZ' },
];

export function generateRandomInsuranceData(): InsuranceCardData {
  const name = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
  const streetIndex = Math.floor(Math.random() * RANDOM_EDMONTON_STREETS.length);
  const street = RANDOM_EDMONTON_STREETS[streetIndex];
  const postal = RANDOM_EDMONTON_POSTALS[streetIndex % RANDOM_EDMONTON_POSTALS.length];
  const vehicle = RANDOM_VEHICLES[Math.floor(Math.random() * RANDOM_VEHICLES.length)];

  // Generate random 6-character VIN suffix
  const randomVinSuffix = Math.floor(100000 + Math.random() * 900000).toString();
  const randomPolicy = '001' + Math.floor(10000000 + Math.random() * 90000000).toString();

  // Dates: today to 6 months later
  const now = new Date();
  const startDay = String(now.getDate()).padStart(2, '0');
  const startMonth = String(now.getMonth() + 1).padStart(2, '0');
  const startYear = now.getFullYear();

  const expDate = new Date(now);
  expDate.setMonth(expDate.getMonth() + 4); // 4-month temporary certificate
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

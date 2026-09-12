export interface InsuranceCardData {
  companyName: string;
  companyNameFr: string;
  companyAddress: string;
  companyCityProvPostal: string;
  insuredName: string;
  insuredAddress: string;
  insuredCityProvPostal: string;
  effectiveDate: string; // DD MM YYYY
  expiryDate: string;    // DD MM YYYY
  policyNumber: string;
  vehicleYearMake: string;
  vehicleVin: string;
  broker: string;
  formCode: string;
  formDateCode: string;
}

export type SheetViewMode = 'six-squares' | 'eight-squares' | 'four-squares' | 'single-card' | 'front-back' | 'td-temporary';

export type EightSquarePattern = 'standard' | 'all-front' | 'all-back' | 'alternating';
